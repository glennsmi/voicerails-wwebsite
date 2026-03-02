const eventSchema = `type NormalizedVoiceEvent =
  | { type: 'user_transcript_partial'; text: string }
  | { type: 'user_transcript_final'; text: string }
  | { type: 'assistant_transcript_partial'; text: string }
  | { type: 'assistant_transcript_final'; text: string }
  | { type: 'assistant_audio'; audioBase64: string; sampleRate: number }
  | { type: 'tool_call'; name: string; args: Record<string, unknown> }
  | { type: 'turn_complete' }
  | { type: 'error'; code: string; message: string; recoverable: boolean };`;

export default function RuntimeApiPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Runtime API</div>
          <h1 className="page-title">
            One event model across<br />providers and <em>channels.</em>
          </h1>
          <p className="page-subtitle">
            Keep client and backend logic stable while provider implementations evolve.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="grid-2">
            <div className="card">
              <h3>Core Endpoints</h3>
              <ul>
                <li><code>POST /v1/sessions</code></li>
                <li><code>POST /v1/sessions/{"{sessionId}"}/events</code></li>
                <li><code>POST /v1/sessions/{"{sessionId}"}/finalize</code></li>
                <li><code>POST /v1/calls/outbound</code></li>
              </ul>
            </div>
            <div className="card">
              <h3>Lifecycle Stages</h3>
              <ul>
                <li><code>SESSION_INIT</code></li>
                <li><code>PROMPT_RESOLVE</code></li>
                <li><code>LIVE_TURN_LOOP</code></li>
                <li><code>SESSION_FINALIZE</code></li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Event Schema</div>
          <h2 className="section-title">Normalized event model.</h2>
          <p className="section-desc">
            Every provider emits the same event shape. Write your logic once.
          </p>

          <div className="code-block">
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">types.ts</span>
            </div>
            <div className="code-body">
              <pre style={{ color: "var(--text-primary)" }}>{eventSchema}</pre>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
