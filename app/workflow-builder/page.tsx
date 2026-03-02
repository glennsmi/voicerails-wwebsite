import WorkflowBuilderDemo from "@/components/workflow-builder-demo";

export default function WorkflowBuilderPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Workflow Builder</div>
          <h1 className="page-title">
            Visual builder for<br /><em>conversation logic.</em>
          </h1>
          <p className="page-subtitle">
            Drag blocks, design flows, and export deterministic JSON that
            engineers can review and deploy. No ambiguity, no guesswork.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <WorkflowBuilderDemo />
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">From visual to deterministic.</h2>
          <p className="section-desc">
            Every visual block maps directly to a JSON stage definition.
            What you see is what gets executed.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <h3>Design</h3>
              <p>Drag blocks from the library to compose your conversation flow visually.</p>
            </div>
            <div className="step-card">
              <h3>Preview</h3>
              <p>See the JSON DSL update in real-time as you add, remove, and reorder stages.</p>
            </div>
            <div className="step-card">
              <h3>Deploy</h3>
              <p>Export the workflow definition and deploy it through the CLI or API.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
