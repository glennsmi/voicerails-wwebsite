import Link from "next/link";
import { FaMicrophone, FaPhone, FaBolt } from "react-icons/fa6";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <div className="container">
        <section className="hero-section">
          <div className="hero-badge animate-fade-up">
            <span className="dot" />
            Now in Early Access
          </div>
          <h1 className="hero-title animate-fade-up-1">
            Production voice platforms.<br /><em>In minutes.</em>
          </h1>
          <p className="hero-sub animate-fade-up-2">
            One platform for real-time orchestration, telephony, workflows, visual
            flow design, intelligent extraction, and memory. Built for developers
            and non-technical builders shipping serious voice products.
          </p>
          <div className="hero-actions animate-fade-up-3">
            <Link href="/developers" className="btn-primary">Start Building Free →</Link>
            <Link href="/why-voicerails" className="btn-secondary">Why VoiceRails</Link>
          </div>

          <div className="code-block animate-fade-up-4" style={{ marginTop: 64 }}>
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">terminal</span>
            </div>
            <div className="code-body">
              <span className="comment"># Install and initialise</span><br />
              <span className="keyword">$</span> <span className="func">npm</span> <span className="prop">install -g @voicerails/cli</span><br />
              <span className="keyword">$</span> <span className="func">voicerails</span> <span className="prop">init</span> <span className="string">--provider openai --telephony twilio</span><br /><br />
              <span className="comment"># Deploy your voice agent</span><br />
              <span className="keyword">$</span> <span className="func">voicerails</span> <span className="prop">deploy</span><br />
              <span className="string">✓</span> <span className="prop">Voice session API</span>  <span className="string">live</span><br />
              <span className="string">✓</span> <span className="prop">Telephony bridge</span>  <span className="string">live</span><br />
              <span className="string">✓</span> <span className="prop">Workflow engine</span>   <span className="string">live</span><br /><br />
              <span className="comment"># Verify everything works</span><br />
              <span className="keyword">$</span> <span className="func">voicerails</span> <span className="prop">verify</span><br />
              <span className="string">All systems healthy.</span> <span className="prop">First call ready in</span> <span className="number">4m 23s</span>
            </div>
          </div>
        </section>
      </div>

      {/* METRICS */}
      <div className="container metrics-bar">
        <div className="metrics-inner">
          <div className="metric-item">
            <div className="metric-value">&lt;30min</div>
            <div className="metric-label">Zero to first live call</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">2</div>
            <div className="metric-label">Ways to build (SDK + visual)</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">6</div>
            <div className="metric-label">Core platform modules</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">1</div>
            <div className="metric-label">Platform across app + telephony</div>
          </div>
        </div>
      </div>

      {/* PLATFORM MODULES */}
      <div className="container">
        <section className="section">
          <div className="section-label">Platform</div>
          <h2 className="section-title section-title-relaxed">Core runtime + builder + intelligence.</h2>
          <p className="section-desc">
            VoiceRails gives teams one platform to build, deploy, and operate
            production voice products without stitching six systems together.
          </p>

          <div className="modules-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="module-card">
              <div className="module-icon"><FaMicrophone /></div>
              <h3>Voice Model Orchestration</h3>
              <p>
                Unified session API across multiple real-time voice providers.
                Hot-swap models without code changes. Native tool-calling with a single schema.
              </p>
              <div className="module-features">
                <span className="module-tag">provider fallback</span>
                <span className="module-tag">tool calling</span>
                <span className="module-tag">hot swap</span>
              </div>
            </div>

            <div className="module-card">
              <div className="module-icon"><FaPhone /></div>
              <h3>Telephony Infrastructure</h3>
              <p>
                Production-grade phone calls with in-platform number provisioning.
                Inbound routing, outbound initiation, and real-time audio bridging.
              </p>
              <div className="module-features">
                <span className="module-tag">number provisioning</span>
                <span className="module-tag">inbound / outbound</span>
                <span className="module-tag">call transfer</span>
              </div>
            </div>

            <div className="module-card">
              <div className="module-icon"><FaBolt /></div>
              <h3>Conversation Workflows</h3>
              <p>
                Define conversation logic as JSON workflows. Custom stages,
                tool execution, prompt orchestration — all versioned and A/B testable.
              </p>
              <div className="module-features">
                <span className="module-tag">JSON workflow DSL</span>
                <span className="module-tag">versioning</span>
                <span className="module-tag">A/B deploy</span>
              </div>
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: 16 }}>
            <div className="card">
              <h3>Visual Flow Designer</h3>
              <p>
                Drag-and-drop canvas for non-technical builders that compiles to
                the same deterministic workflow JSON engineers deploy.
              </p>
            </div>
            <div className="card">
              <h3>Intelligent Extraction</h3>
              <p>
                Define outcomes to extract from natural conversation and receive
                structured outputs with confidence scoring.
              </p>
            </div>
            <div className="card">
              <h3>Memory + Post-Call Analysis</h3>
              <p>
                Persist cross-session context, finalize transcripts, and trigger
                downstream actions with structured conversation intelligence.
              </p>
            </div>
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
            Clean provider encapsulation means you can switch voice models with a
            config change — no rewrite, no downtime, no scramble when providers
            ship breaking changes.
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

      <div className="container"><hr className="section-divider" /></div>

      {/* WHY VOICERAILS */}
      <div className="container">
        <section className="section">
          <div className="section-label">Why VoiceRails</div>
          <h2 className="section-title">We built this after living the pain.</h2>
          <p className="section-desc">
            Voice infrastructure looks simple from the outside. In production,
            provider drift, turn-taking edge cases, and telephony complexity can
            consume entire engineering roadmaps.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>Skip hidden complexity</h3>
              <p>
                We abstract provider-specific behavior so your team can focus on
                product logic rather than protocol quirks.
              </p>
            </div>
            <div className="card">
              <h3>Ship with confidence</h3>
              <p>
                Build app and phone experiences on one runtime with observability,
                metering, and operational controls from day one.
              </p>
            </div>
            <div className="card">
              <h3>Move faster over time</h3>
              <p>
                As providers and requirements evolve, you stay on one platform
                instead of rebuilding your voice stack every quarter.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <Link href="/why-voicerails" className="btn-secondary">Read Our Founder Story</Link>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* HOW IT WORKS */}
      <div className="container">
        <section className="section">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Three commands to production.</h2>
          <p className="section-desc">
            From empty project to live voice agent — in-app or over the phone.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <h3>Initialise</h3>
              <p>Pick your voice provider, configure telephony, and set your region. The CLI scaffolds everything.</p>
              <code>$ voicerails init</code>
            </div>
            <div className="step-card">
              <h3>Deploy</h3>
              <p>One command provisions your runtime, telephony bridge, and workflow engine.</p>
              <code>$ voicerails deploy</code>
            </div>
            <div className="step-card">
              <h3>Ship</h3>
              <p>Define conversation workflows, attach your tools, and go live. Monitor everything from the dashboard.</p>
              <code>$ voicerails verify<br />✓ All systems healthy</code>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* USE CASES */}
      <div className="container">
        <section className="section">
          <div className="section-label">Use Cases</div>
          <h2 className="section-title">Built for builders.</h2>
          <p className="section-desc">
            Teams across every vertical are shipping voice-first products on VoiceRails.
          </p>

          <div className="verticals-grid">
            <div className="vertical-item">
              <h4>Health &amp; Wellness</h4>
              <p>AI coaches, therapy support, nutrition guidance, patient intake.</p>
            </div>
            <div className="vertical-item">
              <h4>Recruiting</h4>
              <p>Screening calls, structured interviews, candidate assessment at scale.</p>
            </div>
            <div className="vertical-item">
              <h4>Sales Enablement</h4>
              <p>AI SDRs, call scoring, real-time coaching nudges, QA automation.</p>
            </div>
            <div className="vertical-item">
              <h4>Learning &amp; Tutoring</h4>
              <p>Language practice, exam prep, interactive voice-first courses.</p>
            </div>
            <div className="vertical-item">
              <h4>Support Triage</h4>
              <p>First-line voice agents, appointment scheduling, intake flows.</p>
            </div>
            <div className="vertical-item">
              <h4>Internal Tools</h4>
              <p>Voice-driven data entry, field reporting, compliance checks.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* PRICING PREVIEW */}
      <div className="container">
        <section className="section">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Transparent. Predictable.</h2>
          <p className="section-desc">
            Platform fee + usage + provider pass-through at cost + 20%. No surprises, no hidden margins.
          </p>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-tier">Starter</div>
              <div className="price-amount"><span className="currency">$</span>9<span className="period">.99/mo</span></div>
              <div className="price-desc">Prototype and test with a single provider.</div>
              <ul className="price-features">
                <li>60 real-time minutes</li>
                <li>Single voice provider</li>
                <li>Basic dashboard</li>
                <li>Docs-only support</li>
              </ul>
              <Link href="/pricing" className="price-btn price-btn-outline">Start Free →</Link>
            </div>

            <div className="price-card featured">
              <div className="price-tier">Build</div>
              <div className="price-amount"><span className="currency">$</span>99<span className="period">/mo</span></div>
              <div className="price-desc">Multi-provider orchestration with telephony.</div>
              <ul className="price-features">
                <li>500 real-time minutes</li>
                <li>Multi-provider support</li>
                <li>Telephony bridge</li>
                <li>Full logs + dashboard</li>
                <li>Community support</li>
              </ul>
              <Link href="/pricing" className="price-btn price-btn-filled">Get Started →</Link>
            </div>

            <div className="price-card">
              <div className="price-tier">Launch</div>
              <div className="price-amount"><span className="currency">$</span>499<span className="period">/mo</span></div>
              <div className="price-desc">Workflows, analytics, and SLA-backed support.</div>
              <ul className="price-features">
                <li>3,000 real-time minutes</li>
                <li>Workflow engine</li>
                <li>Alerts, retries, analytics</li>
                <li>SLA-backed support</li>
              </ul>
              <Link href="/pricing" className="price-btn price-btn-outline">Contact Us →</Link>
            </div>

            <div className="price-card">
              <div className="price-tier">Scale</div>
              <div className="price-amount">Custom</div>
              <div className="price-desc">Enterprise controls, dedicated throughput, SSO.</div>
              <ul className="price-features">
                <li>Custom minutes</li>
                <li>Multi-environment deploys</li>
                <li>Dedicated throughput</li>
                <li>SSO + audit exports</li>
                <li>Dedicated support</li>
              </ul>
              <Link href="/pricing" className="price-btn price-btn-outline">Talk to Sales →</Link>
            </div>
          </div>

          <div className="pricing-note">
            <strong>Transparent pass-through pricing:</strong> Voice model and telephony
            provider costs are passed through at cost + 20% markup. You always see exactly
            what you&apos;re paying for.
          </div>
        </section>
      </div>

      {/* FINAL CTA */}
      <div className="container">
        <div className="final-cta">
          <h2>Stop building plumbing.<br />Start shipping voice.</h2>
          <p>Go from zero to a production-ready voice platform in under 30 minutes.</p>
          <div className="hero-actions">
            <Link href="/developers" className="btn-primary">Start Building Free →</Link>
            <Link href="/why-voicerails" className="btn-secondary">Why VoiceRails</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
