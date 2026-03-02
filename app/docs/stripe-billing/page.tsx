const endpoint = `POST /api/stripe/webhook
Headers:
  stripe-signature: <signature>

Tracked events:
- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.paid
- invoice.payment_failed`;

export default function StripeBillingDocsPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Stripe Billing</div>
          <h1 className="page-title">
            Hosted billing pages.<br /><em>Synced lifecycle state.</em>
          </h1>
          <p className="page-subtitle">
            Checkout and billing management stay in Stripe UX. VoiceRails
            ingests webhooks for auditable subscription state.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="grid-2">
            <div className="card">
              <h3>Best Practices</h3>
              <ul>
                <li>Store org/app/env metadata in Stripe objects.</li>
                <li>Verify webhook signatures with raw request body.</li>
                <li>Use idempotency checks per event ID.</li>
                <li>Mirror subscription status into Firestore.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Webhook Contract</h3>
              <div className="code-block" style={{ marginTop: 0 }}>
                <div className="code-header">
                  <span className="code-dot" />
                  <span className="code-dot" />
                  <span className="code-dot" />
                  <span className="code-title">webhook endpoint</span>
                </div>
                <div className="code-body">
                  <pre style={{ color: "var(--text-primary)" }}>{endpoint}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
