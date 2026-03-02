import express, { Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import Stripe from "stripe";

initializeApp();

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

const app = express();

type TenantContext = {
  orgId?: string;
  appId?: string;
  envId?: string;
  customerId?: string;
  subscriptionId?: string;
};

function getStripeClient(): Stripe {
  return new Stripe(stripeSecretKey.value(), {
    apiVersion: "2025-01-27.acacia"
  });
}

function extractTenantContext(event: Stripe.Event): TenantContext {
  const base: TenantContext = {};

  if (event.type === "checkout.session.completed") {
    const obj = event.data.object as Stripe.Checkout.Session;
    return {
      orgId: obj.metadata?.orgId,
      appId: obj.metadata?.appId,
      envId: obj.metadata?.envId,
      customerId: typeof obj.customer === "string" ? obj.customer : undefined,
      subscriptionId: typeof obj.subscription === "string" ? obj.subscription : undefined
    };
  }

  if (event.type.startsWith("customer.subscription.")) {
    const obj = event.data.object as Stripe.Subscription;
    return {
      orgId: obj.metadata?.orgId,
      appId: obj.metadata?.appId,
      envId: obj.metadata?.envId,
      customerId: typeof obj.customer === "string" ? obj.customer : undefined,
      subscriptionId: obj.id
    };
  }

  if (event.type.startsWith("invoice.")) {
    const obj = event.data.object as Stripe.Invoice;
    return {
      orgId: obj.metadata?.orgId,
      appId: obj.metadata?.appId,
      envId: obj.metadata?.envId,
      customerId: typeof obj.customer === "string" ? obj.customer : undefined,
      subscriptionId: typeof obj.subscription === "string" ? obj.subscription : undefined
    };
  }

  return base;
}

async function upsertTenantBillingState(event: Stripe.Event, context: TenantContext) {
  const db = getFirestore();

  const eventDoc = {
    stripeEventId: event.id,
    type: event.type,
    created: event.created,
    livemode: event.livemode,
    orgId: context.orgId ?? null,
    appId: context.appId ?? null,
    envId: context.envId ?? null,
    customerId: context.customerId ?? null,
    subscriptionId: context.subscriptionId ?? null,
    payload: event,
    receivedAt: new Date().toISOString()
  };

  const eventRef = db.collection("stripeEvents").doc(event.id);
  const existing = await eventRef.get();
  if (existing.exists) {
    return { duplicate: true };
  }

  await eventRef.create(eventDoc);

  if (!context.customerId) {
    return { duplicate: false };
  }

  const customerRef = db.collection("billingCustomers").doc(context.customerId);
  await customerRef.set(
    {
      customerId: context.customerId,
      orgId: context.orgId ?? null,
      appId: context.appId ?? null,
      envId: context.envId ?? null,
      subscriptionId: context.subscriptionId ?? null,
      lastStripeEventId: event.id,
      lastStripeEventType: event.type,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );

  if (context.orgId && context.subscriptionId) {
    const subscriptionRef = db
      .collection("organizations")
      .doc(context.orgId)
      .collection("billingSubscriptions")
      .doc(context.subscriptionId);

    await subscriptionRef.set(
      {
        orgId: context.orgId,
        appId: context.appId ?? null,
        envId: context.envId ?? null,
        customerId: context.customerId,
        subscriptionId: context.subscriptionId,
        status: getSubscriptionStatus(event),
        lastStripeEventId: event.id,
        lastStripeEventType: event.type,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  }

  return { duplicate: false };
}

function getSubscriptionStatus(event: Stripe.Event): string {
  if (event.type === "invoice.payment_failed") {
    return "past_due";
  }

  if (event.type === "invoice.paid") {
    return "active";
  }

  if (event.type === "customer.subscription.deleted") {
    return "canceled";
  }

  if (event.type === "customer.subscription.trial_will_end") {
    return "trial_will_end";
  }

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    return subscription.status;
  }

  if (event.type === "checkout.session.completed") {
    return "checkout_completed";
  }

  return "event_received";
}

app.get("/api/stripe/health", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true, service: "stripe-webhook" });
});

app.post("/api/stripe/webhook", async (req: Request, res: Response) => {
  const signature = req.header("stripe-signature");
  if (!signature) {
    res.status(400).json({ error: "Missing stripe-signature header" });
    return;
  }

  const rawBody = (req as Request & { rawBody?: Buffer }).rawBody;
  if (!rawBody) {
    res.status(400).json({ error: "Missing raw request body" });
    return;
  }

  let event: Stripe.Event;
  try {
    event = getStripeClient().webhooks.constructEvent(rawBody, signature, stripeWebhookSecret.value());
  } catch (error) {
    logger.error("Stripe webhook signature verification failed", error);
    res.status(400).json({ error: "Invalid webhook signature" });
    return;
  }

  const context = extractTenantContext(event);

  try {
    const result = await upsertTenantBillingState(event, context);
    if (result.duplicate) {
      res.status(200).json({ ok: true, duplicate: true });
      return;
    }

    logger.info("Stripe event processed", {
      eventId: event.id,
      type: event.type,
      customerId: context.customerId,
      subscriptionId: context.subscriptionId,
      orgId: context.orgId
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    logger.error("Stripe webhook processing failed", error);
    res.status(500).json({ error: "Failed to process Stripe event" });
  }
});

export const api = onRequest(
  {
    region: "europe-west2",
    timeoutSeconds: 60,
    maxInstances: 20,
    secrets: [stripeSecretKey, stripeWebhookSecret]
  },
  app
);
