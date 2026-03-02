# VoiceRails Website (Next.js + Firebase)

Production-ready website scaffold for **VoiceRails.ai** based on the PRDs in [`plans/voice-infrastructure-prd.md`](/Users/glennsmith/coding/voicerails-website/plans/voice-infrastructure-prd.md) and [`plans/voice-platform-technical-spec.md`](/Users/glennsmith/coding/voicerails-website/plans/voice-platform-technical-spec.md).

## What is included

- Next.js App Router website with the requested brand palette:
  - Matte Black `#111111`
  - Alert Orange `#FF5722`
- Multi-page marketing website (`/`, `/platform`, `/developers`, `/pricing`, `/workflow-builder`, `/docs`)
- Typography pairing:
  - Headings/brand: Space Grotesk
  - Body: Inter
  - Code/CLI: JetBrains Mono
- Icon-led UI using React Icons (`react-icons`)
- Dedicated docs hub with route-based developer documentation pages
- Interactive drag-and-drop workflow builder demo page
- Firebase Hosting configuration for static Next export
- Firebase Functions TypeScript backend for Stripe webhook ingestion
- Idempotent Stripe event storage and tenant billing state mirroring in Firestore

## Project structure

- `/app` - Next.js pages and styles
- `/app/docs/*` - developer documentation sections
- `/app/workflow-builder` - drag-and-drop builder demo page
- `/functions` - Firebase Functions backend (Stripe webhook)
- `/plans` - source PRDs

## Local setup

1. Install dependencies:

```bash
npm install
cd functions && npm install && cd ..
```

2. Set Firebase project ID in `.firebaserc`:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

3. Set Stripe secrets in Firebase Functions:

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```

4. Run website locally:

```bash
npm run dev
```

## Build and deploy

```bash
npm run build
firebase deploy --only hosting,functions
```

## Stripe webhook endpoint

Configured endpoint:

- `POST /api/stripe/webhook`

Health endpoint:

- `GET /api/stripe/health`

Handled lifecycle events:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.trial_will_end`

## Suggested next implementation steps

1. Add real Stripe Checkout + Billing Portal session creation endpoints tied to authenticated org/app users.
2. Add a docs content pipeline (MDX + search + versioned changelog) for full-scale developer documentation.
3. Replace builder demo state with persistent workflow entities and publish/review workflow versioning.
4. Connect website CTA forms to CRM/ops pipeline (HubSpot, Notion, or internal API).
