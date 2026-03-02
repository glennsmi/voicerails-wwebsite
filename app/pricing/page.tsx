import Link from "next/link";

export default function PricingPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Pricing</div>
          <h1 className="page-title">
            Transparent.<br /><em>Predictable.</em>
          </h1>
          <p className="page-subtitle">
            Platform fee + usage + provider pass-through at cost + 20%.
            No surprises, no hidden margins.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-tier">Starter</div>
              <div className="price-amount">
                <span className="currency">$</span>9<span className="period">.99/mo</span>
              </div>
              <div className="price-desc">Prototype and test with a single voice provider.</div>
              <ul className="price-features">
                <li>60 real-time minutes</li>
                <li>Single voice provider</li>
                <li>Basic dashboard</li>
                <li>Docs-only support</li>
              </ul>
              <a href="#" className="price-btn price-btn-outline">Start Free →</a>
            </div>

            <div className="price-card featured">
              <div className="price-tier">Build</div>
              <div className="price-amount">
                <span className="currency">$</span>99<span className="period">/mo</span>
              </div>
              <div className="price-desc">Multi-provider orchestration with telephony.</div>
              <ul className="price-features">
                <li>500 real-time minutes</li>
                <li>Multi-provider support</li>
                <li>Telephony bridge</li>
                <li>Full logs + dashboard</li>
                <li>Community support</li>
              </ul>
              <a href="#" className="price-btn price-btn-filled">Get Started →</a>
            </div>

            <div className="price-card">
              <div className="price-tier">Launch</div>
              <div className="price-amount">
                <span className="currency">$</span>499<span className="period">/mo</span>
              </div>
              <div className="price-desc">Workflows, analytics, and SLA-backed support.</div>
              <ul className="price-features">
                <li>3,000 real-time minutes</li>
                <li>Workflow engine</li>
                <li>Alerts, retries, analytics</li>
                <li>SLA-backed support</li>
              </ul>
              <a href="#" className="price-btn price-btn-outline">Contact Us →</a>
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
              <a href="#" className="price-btn price-btn-outline">Talk to Sales →</a>
            </div>
          </div>

          <div className="pricing-note">
            <strong>Transparent pass-through pricing:</strong> Voice model and telephony
            provider costs are passed through at cost + 20% markup. You always see
            exactly what you&apos;re paying for — provider costs, platform fees, and
            usage — with no hidden margins.
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* WHAT'S INCLUDED */}
      <div className="container">
        <section className="section">
          <div className="section-label">What&apos;s Included</div>
          <h2 className="section-title">Every plan includes the core platform.</h2>
          <p className="section-desc">
            Upgrade for more minutes, advanced features, and dedicated support.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>Voice Model Orchestration</h3>
              <p>Unified session API, provider fallback, hot-swap, and native tool-calling across all plans.</p>
            </div>
            <div className="card">
              <h3>Developer Tooling</h3>
              <p>CLI, API reference, webhook integration, and deployment controls from day one.</p>
            </div>
            <div className="card">
              <h3>Dashboard &amp; Logs</h3>
              <p>Real-time session monitoring, call logs, and usage analytics in every tier.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      {/* CTA */}
      <div className="container">
        <div className="final-cta">
          <h2>Start building today.</h2>
          <p>Begin with the Starter plan — upgrade as you scale.</p>
          <div className="hero-actions">
            <Link href="/developers" className="btn-primary">Start Building Free →</Link>
            <a href="mailto:founders@voicerails.ai?subject=VoiceRails%20Sales" className="btn-secondary">Talk to Sales</a>
          </div>
        </div>
      </div>
    </main>
  );
}
