import Link from "next/link";
import { FaMicrophone, FaPhone, FaBolt } from "react-icons/fa6";

export default function PlatformPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Platform Overview</div>
          <h1 className="page-title">
            The rails behind<br />production <em>voice applications.</em>
          </h1>
          <p className="page-subtitle">
            VoiceRails combines the hard layers teams usually stitch together manually:
            orchestration, telephony, workflow runtime, visual design, extraction,
            and memory — unified behind one platform surface.
          </p>
        </div>
      </div>

      {/* CORE MODULES */}
      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-label">Core Modules</div>
          <h2 className="section-title">Six modules. One production platform.</h2>
          <p className="section-desc">
            Each module handles a distinct infrastructure concern so your team
            can focus on the voice experience, not the plumbing.
          </p>

          <div className="modules-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="module-card">
              <div className="module-icon"><FaMicrophone /></div>
              <h3>Voice Model Orchestration</h3>
              <p>
                Route and normalize sessions across multiple real-time voice
                providers. One runtime contract, multiple models, zero lock-in.
              </p>
              <div className="module-features">
                <span className="module-tag">provider fallback</span>
                <span className="module-tag">tool calling</span>
                <span className="module-tag">hot swap</span>
                <span className="module-tag">audio normalisation</span>
              </div>
            </div>

            <div className="module-card">
              <div className="module-icon"><FaPhone /></div>
              <h3>Telephony Infrastructure</h3>
              <p>
                Inbound and outbound call infrastructure with number provisioning,
                DTMF handling, and real-time audio bridging to any voice provider.
              </p>
              <div className="module-features">
                <span className="module-tag">number provisioning</span>
                <span className="module-tag">inbound / outbound</span>
                <span className="module-tag">DTMF</span>
                <span className="module-tag">call transfer</span>
              </div>
            </div>

            <div className="module-card">
              <div className="module-icon"><FaBolt /></div>
              <h3>Conversation Workflows</h3>
              <p>
                Define live conversation logic as JSON workflows. Custom stages,
                tool execution, prompt orchestration, and transition logic — all
                versioned and A/B testable.
              </p>
              <div className="module-features">
                <span className="module-tag">JSON workflow DSL</span>
                <span className="module-tag">versioning</span>
                <span className="module-tag">custom hooks</span>
                <span className="module-tag">A/B deploy</span>
              </div>
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: 16 }}>
            <div className="card">
              <h3>Visual Flow Designer</h3>
              <p>
                Non-technical builders can design voice logic visually, while
                engineers keep deterministic JSON definitions under version control.
              </p>
            </div>
            <div className="card">
              <h3>Intelligent Extraction Engine</h3>
              <p>
                Define structured outcomes to gather from natural conversation and
                return usable data instead of raw transcript dumps.
              </p>
            </div>
            <div className="card">
              <h3>Memory + Analysis Engine</h3>
              <p>
                Persist session context, run post-call analysis, and power continuity
                across conversations with durable memory primitives.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* ARCHITECTURE */}
      <div className="container">
        <section className="section">
          <div className="section-label">Architecture</div>
          <h2 className="section-title">Why it works.</h2>
          <p className="section-desc">
            Designed for product teams that need speed now and control later.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>One Runtime Model</h3>
              <p>
                Use one event shape across browser voice, phone channels, and
                tool-calling flows. No per-channel rewrites.
              </p>
            </div>
            <div className="card">
              <h3>Extensible by Design</h3>
              <p>
                Add providers and connectors without rewriting the core session
                lifecycle. Clean adapter boundaries for provider churn.
              </p>
            </div>
            <div className="card">
              <h3>Visual + Code Workflows</h3>
              <p>
                Visual builder for operators, JSON DSL for engineers. Both export
                the same deterministic definition.
              </p>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 16 }}>
            <div className="card">
              <h3>Deployment Flexibility</h3>
              <p>
                Hosted fast-start mode for rapid onboarding with a path to
                dedicated customer runtime when you need it.
              </p>
            </div>
            <div className="card">
              <h3>Built-in Billing Lifecycle</h3>
              <p>
                Stripe-backed subscription lifecycle sync with operational
                visibility for reliability and cost tracking.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* ORIGIN STORY */}
      <div className="container">
        <section className="section">
          <div className="section-label">Origin Story</div>
          <h2 className="section-title">Built from hard-earned implementation lessons.</h2>
          <p className="section-desc">
            We built VoiceRails after seeing how quickly voice complexity explodes
            in production. The platform is our way of making those lessons reusable
            for every team that ships voice.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>Provider drift is real</h3>
              <p>
                API behavior changes. Event formats move. Session semantics vary.
                We normalize this so your app code stays stable.
              </p>
            </div>
            <div className="card">
              <h3>Conversation quality is operational</h3>
              <p>
                Turn-taking, interruptions, and handoffs are infrastructure concerns,
                not just prompt concerns.
              </p>
            </div>
            <div className="card">
              <h3>Telephony changes everything</h3>
              <p>
                App voice and phone voice fail differently. The platform treats both
                channels as first-class from the start.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <Link href="/why-voicerails" className="btn-secondary">Read Why We Built This</Link>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* PROVIDERS */}
      <div className="container">
        <section className="section">
          <div className="section-label">Providers</div>
          <h2 className="section-title">Swap providers. Keep your code.</h2>
          <p className="section-desc">
            Switch voice models with a config change — no rewrite, no downtime.
          </p>

          <div className="providers-row">
            <div className="provider-chip">
              <span className="provider-dot" style={{ background: "var(--accent)" }} />
              <span>OpenAI Realtime</span>
              <span className="status">GA</span>
            </div>
            <div className="provider-chip">
              <span className="provider-dot" style={{ background: "var(--blue)" }} />
              <span>Gemini Live</span>
              <span className="status">GA</span>
            </div>
            <div className="provider-chip">
              <span className="provider-dot" style={{ background: "var(--pink)" }} />
              <span>ElevenLabs</span>
              <span className="status">GA</span>
            </div>
            <div className="provider-chip">
              <span className="provider-dot" style={{ background: "var(--orange)" }} />
              <span>Grok Voice</span>
              <span className="status">Preview</span>
            </div>
            <div className="provider-chip">
              <span className="provider-dot" style={{ background: "var(--text-muted)" }} />
              <span>Twilio</span>
              <span className="status">Telephony</span>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="container">
        <div className="final-cta">
          <h2>Ready to build?</h2>
          <p>Explore the founder story, then dive into docs or the visual builder.</p>
          <div className="hero-actions">
            <Link href="/why-voicerails" className="btn-primary">Why VoiceRails →</Link>
            <Link href="/developers" className="btn-secondary">Developer Hub</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
