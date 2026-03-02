import Link from "next/link";

const quickstart = `curl -X POST https://api.voicerails.ai/v1/sessions \\
  -H "Authorization: Bearer <ENV_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workflowId": "wf_customer_support",
    "channel": "voice_web",
    "provider": "openai"
  }'`;

export default function GettingStartedPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Getting Started</div>
          <h1 className="page-title">
            Your first live voice<br />session in <em>minutes.</em>
          </h1>
          <p className="page-subtitle">
            Create org/app/env, add provider credentials, then start runtime sessions.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="steps-grid steps-grid-4">
            <div className="step-card">
              <h3>Create App</h3>
              <p>Create an app and environment in the control plane.</p>
            </div>
            <div className="step-card">
              <h3>Add Providers</h3>
              <p>Add provider keys and optional telephony configuration.</p>
            </div>
            <div className="step-card">
              <h3>Start Session</h3>
              <p>Start a session with your workflow and preferred channel.</p>
            </div>
            <div className="step-card">
              <h3>Iterate</h3>
              <p>Finalize session, inspect events, and iterate on workflow logic.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">API Example</div>
          <h2 className="section-title">Quickstart request.</h2>
          <p className="section-desc">Create your first voice session with a single API call.</p>

          <div className="code-block">
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">Create session</span>
            </div>
            <div className="code-body">
              <pre style={{ color: "var(--text-primary)" }}>{quickstart}</pre>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Link href="/docs/runtime-api" className="btn-primary">
              Full API Reference →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
