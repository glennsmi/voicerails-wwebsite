export default function TelephonyDocsPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Telephony</div>
          <h1 className="page-title">
            Manage phone numbers<br />without <em>provider console sprawl.</em>
          </h1>
          <p className="page-subtitle">
            Search, reserve, provision, assign, and release numbers through
            platform APIs with compliance-aware flows.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="grid-2">
            <div className="card">
              <h3>Number APIs</h3>
              <ul>
                <li><code>POST /telephony/numbers/search</code></li>
                <li><code>POST /telephony/numbers/reserve</code></li>
                <li><code>POST /telephony/numbers/provision</code></li>
                <li><code>POST /telephony/numbers/{"{numberId}"}/assign</code></li>
              </ul>
            </div>
            <div className="card">
              <h3>Lifecycle</h3>
              <ul>
                <li>Discover numbers by country, type, and capabilities.</li>
                <li>Reserve before purchase where supported.</li>
                <li>Provision + route to workflow endpoints.</li>
                <li>Monitor health and release when no longer needed.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Call Flow</div>
          <h2 className="section-title">Inbound and outbound.</h2>
          <p className="section-desc">
            Route calls to workflows with real-time audio bridging to any voice provider.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>Inbound</h3>
              <p>
                Assign numbers to workflow endpoints. Incoming calls are
                automatically routed and a voice session is created.
              </p>
            </div>
            <div className="card">
              <h3>Outbound</h3>
              <p>
                Initiate calls programmatically via the API. Specify the
                target number, workflow, and voice provider.
              </p>
            </div>
            <div className="card">
              <h3>Transfer</h3>
              <p>
                Warm and cold transfer support. Hand calls to human agents
                or other systems mid-conversation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
