import Link from "next/link";

const dsl = `{
  "version": "1",
  "stages": [
    { "id": "stage_1", "kind": "prompt", "name": "Session Init" },
    { "id": "stage_2", "kind": "tool", "name": "CRM Lookup" },
    { "id": "stage_3", "kind": "branch", "name": "Escalation Gate" },
    { "id": "stage_4", "kind": "webhook", "name": "Finalize" }
  ]
}`;

export default function WorkflowDocsPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Workflows</div>
          <h1 className="page-title">
            Visual flow authoring with<br /><em>engineering-safe exports.</em>
          </h1>
          <p className="page-subtitle">
            Semi-technical builders can design flows visually; engineering teams
            still get deterministic JSON to review.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="grid-2">
            <div className="card">
              <h3>Builder Principles</h3>
              <ul>
                <li>Drag-and-drop prompt/tool/branch/wait/webhook blocks.</li>
                <li>Safe defaults for retries and timeout limits.</li>
                <li>Preview before publishing to environment.</li>
              </ul>
              <div style={{ marginTop: 20 }}>
                <Link href="/workflow-builder" className="btn-primary btn-small">
                  Try the Builder →
                </Link>
              </div>
            </div>
            <div className="card">
              <h3>JSON DSL Example</h3>
              <div className="code-block" style={{ marginTop: 0 }}>
                <div className="code-header">
                  <span className="code-dot" />
                  <span className="code-dot" />
                  <span className="code-dot" />
                  <span className="code-title">workflow.json</span>
                </div>
                <div className="code-body">
                  <pre style={{ color: "var(--accent)" }}>{dsl}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
