import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why VoiceRails — Founder Story",
  description:
    "Why we built VoiceRails: hard-won lessons from shipping production voice across providers, telephony, and workflows.",
};

export default function WhyVoiceRailsPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Founder Story</div>
          <h1 className="page-title">
            Voice infrastructure looks easy.<br />
            It is not. <em>We learned it the hard way.</em>
          </h1>
          <p className="page-subtitle">
            We built production voice sessions across multiple providers, in-app and over the
            phone, and discovered how many hidden failure modes sit between a demo and a
            reliable product. VoiceRails exists so your team can skip those painful lessons and
            ship with confidence from day one.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-label">What We Learned</div>
          <h2 className="section-title">The hard part is everything around the model.</h2>
          <p className="section-desc">
            The model is only one layer. Production voice quality comes from how well every
            surrounding system behaves under real usage.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>Every provider behaves differently</h3>
              <p>
                Event models, session setup, and tool-calling differ in subtle ways. A product
                that works on one provider can break unexpectedly on another unless you build a
                strong abstraction layer.
              </p>
            </div>
            <div className="card">
              <h3>Natural turn-taking is deceptively hard</h3>
              <p>
                Real conversations involve pauses, interruptions, and background noise. Getting
                timing wrong creates awkward calls, cut-offs, and frustrating user experiences.
              </p>
            </div>
            <div className="card">
              <h3>Phone voice is not web voice</h3>
              <p>
                Telephony adds new constraints, compliance concerns, and operational complexity.
                It needs dedicated infrastructure, not a quick adaptation of in-app logic.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Why This Matters</div>
          <h2 className="section-title">Small mistakes become expensive at scale.</h2>
          <p className="section-desc">
            Most teams can launch a prototype. Fewer teams can run thousands of reliable,
            cost-controlled, high-quality voice conversations in production.
          </p>

          <div className="grid-3">
            <div className="card">
              <h3>Reliability risk</h3>
              <p>
                Session failures, dropped calls, and inconsistent behavior quickly erode trust in
                your product and in your brand.
              </p>
            </div>
            <div className="card">
              <h3>Speed risk</h3>
              <p>
                Engineering teams get pulled into infrastructure debugging instead of shipping user
                value, features, and domain-specific workflows.
              </p>
            </div>
            <div className="card">
              <h3>Cost risk</h3>
              <p>
                Without a strong platform layer, provider and telephony costs drift upward and are
                hard to attribute or optimize.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">What You Get</div>
          <h2 className="section-title">We turned painful lessons into platform primitives.</h2>
          <p className="section-desc">
            VoiceRails packages what we had to learn the hard way into one production-ready
            platform for both developers and non-technical builders.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <h3>Build fast</h3>
              <p>
                Use SDKs and APIs for engineering teams, or the visual flow designer for builders.
                Both paths compile to the same deployable workflow runtime.
              </p>
            </div>
            <div className="step-card">
              <h3>Operate reliably</h3>
              <p>
                Launch in-app and telephony experiences with provider abstraction, workflow control,
                extraction, memory, and operational observability built in.
              </p>
            </div>
            <div className="step-card">
              <h3>Scale confidently</h3>
              <p>
                Keep flexibility as models evolve, keep visibility as usage grows, and keep your
                team focused on product outcomes instead of voice plumbing.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        <div className="final-cta">
          <h2>Use the platform built from real lessons.</h2>
          <p>
            We made the hard parts repeatable so you can move from idea to production voice
            faster, with fewer surprises.
          </p>
          <div className="hero-actions">
            <Link href="/developers" className="btn-primary">Start Building Free →</Link>
            <Link href="/platform" className="btn-secondary">Explore the Platform</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
