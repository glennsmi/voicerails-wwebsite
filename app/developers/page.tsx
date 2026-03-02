import Link from "next/link";

const snippet = `curl -X POST https://api.voicerails.ai/v1/sessions \\
  -H "Authorization: Bearer <ENV_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"workflowId":"wf_support","channel":"voice_web"}'`;

export default function DevelopersPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Developer Hub</div>
          <h1 className="page-title">
            Docs and tooling that<br />feel like <em>product engineering.</em>
          </h1>
          <p className="page-subtitle">
            Concise, runnable documentation centered on production outcomes.
            Less theory, more delivery.
          </p>
        </div>
      </div>

      {/* QUICKSTART */}
      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-label">Quickstart</div>
          <h2 className="section-title">First call in under five minutes.</h2>
          <p className="section-desc">
            Install the CLI, initialise your project, and deploy — then make
            your first API call.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <h3>Install</h3>
              <p>Install the VoiceRails CLI globally and authenticate with your API key.</p>
              <code>$ npm install -g @voicerails/cli</code>
            </div>
            <div className="step-card">
              <h3>Initialise</h3>
              <p>Scaffold your project with your preferred voice provider and telephony config.</p>
              <code>$ voicerails init --provider openai</code>
            </div>
            <div className="step-card">
              <h3>Deploy &amp; Verify</h3>
              <p>Deploy your voice agent and verify all systems are healthy.</p>
              <code>$ voicerails deploy && voicerails verify</code>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* API EXAMPLE */}
      <div className="container">
        <section className="section">
          <div className="section-label">API</div>
          <h2 className="section-title">Clean, predictable API surface.</h2>
          <p className="section-desc">
            RESTful endpoints with consistent event shapes across all providers and channels.
          </p>

          <div className="code-block">
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">Create a voice session</span>
            </div>
            <div className="code-body">
              <pre style={{ color: "var(--text-primary)" }}>{snippet}</pre>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* DOCUMENTATION */}
      <div className="container">
        <section className="section">
          <div className="section-label">Documentation</div>
          <h2 className="section-title">Learn the platform in the order teams ship it.</h2>
          <p className="section-desc">
            Each guide is short, practical, and built around real deployment patterns.
          </p>

          <div className="grid-3">
            <Link href="/docs/getting-started" className="card" style={{ textDecoration: "none" }}>
              <h3>Getting Started</h3>
              <p>Create your first app, environment, and live session with minimal setup.</p>
            </Link>
            <Link href="/docs/runtime-api" className="card" style={{ textDecoration: "none" }}>
              <h3>Runtime API Reference</h3>
              <p>Session contracts, normalized events, and finalize semantics.</p>
            </Link>
            <Link href="/docs/telephony" className="card" style={{ textDecoration: "none" }}>
              <h3>Telephony</h3>
              <p>Number provisioning, inbound/outbound routing, and audio bridging.</p>
            </Link>
            <Link href="/docs/workflows" className="card" style={{ textDecoration: "none" }}>
              <h3>Workflows</h3>
              <p>Map visual builder blocks into deterministic JSON definitions.</p>
            </Link>
            <Link href="/docs/stripe-billing" className="card" style={{ textDecoration: "none" }}>
              <h3>Stripe Billing</h3>
              <p>Checkout, billing portal, and webhook event handling patterns.</p>
            </Link>
            <Link href="/docs" className="card" style={{ textDecoration: "none" }}>
              <h3>All Docs →</h3>
              <p>Browse the full documentation hub.</p>
            </Link>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="container">
        <div className="final-cta">
          <h2>Ready to ship voice?</h2>
          <p>Start with the quickstart guide or explore the API reference.</p>
          <div className="hero-actions">
            <Link href="/docs/getting-started" className="btn-primary">Read Quickstart →</Link>
            <Link href="/docs/runtime-api" className="btn-secondary">API Reference</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
