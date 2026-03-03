import Image from "next/image";
import Link from "next/link";

const brandPillars = [
  {
    title: "Technical credibility",
    body: "VoiceRails presents as infrastructure, not a toy. Every visual choice favors precision, clarity, and operational confidence."
  },
  {
    title: "Fast by design",
    body: "Typography, spacing, and interaction states emphasize momentum and responsiveness. The experience should always feel production-ready."
  },
  {
    title: "Dark-native premium",
    body: "The primary experience lives in matte near-black with restrained accents. Surfaces layer softly while preserving strong readability."
  }
];

const logoAssets = [
  {
    titleLine1: "Primary symbol",
    titleLine2: "on dark",
    src: "/VoiceRails%201000x1000.png",
    note: "Use for dark-background placements, social cards, and splash surfaces.",
    frame: "brand-logo-frame-dark"
  },
  {
    titleLine1: "Transparent symbol",
    titleLine2: null,
    src: "/VoiceRails%201000x1000%20no%20background.png",
    note: "Use where background color is controlled by the host product.",
    frame: "brand-logo-frame-light"
  },
  {
    titleLine1: "UI compact icon",
    titleLine2: null,
    src: "/icon.png",
    note: "Use in navigation, utility bars, and compact UI moments.",
    frame: "brand-logo-frame-dark"
  }
];

const colorTokens = [
  { name: "--bg", role: "Canvas", dark: "#07080A", light: "#F7F9FC" },
  { name: "--bg-elevated", role: "Elevated surface", dark: "#0D0F12", light: "#FFFFFF" },
  { name: "--bg-card", role: "Component surface", dark: "#111318", light: "#FFFFFF" },
  { name: "--border", role: "Structural border", dark: "#1E2028", light: "#D9E1EC" },
  { name: "--text-primary", role: "Primary text", dark: "#E8E9ED", light: "#0F172A" },
  { name: "--text-secondary", role: "Body/supporting text", dark: "#8B8D98", light: "#334155" },
  { name: "--accent", role: "Brand action color", dark: "#22D3A7", light: "#0F9F7A" },
  { name: "--blue", role: "Provider/system support", dark: "#3B82F6", light: "#3B82F6" },
  { name: "--pink", role: "Provider/system support", dark: "#EC4899", light: "#EC4899" },
  { name: "--orange", role: "Provider/system support", dark: "#F59E0B", light: "#F59E0B" }
];

const tokenSnippet = `:root {
  --bg: #07080A;
  --bg-elevated: #0D0F12;
  --bg-card: #111318;
  --border: #1E2028;
  --text-primary: #E8E9ED;
  --text-secondary: #8B8D98;
  --accent: #22D3A7;
  --blue: #3B82F6;
  --pink: #EC4899;
  --orange: #F59E0B;
} /* dark default */`;

const lightThemeSnippet = `html[data-theme="light"] {
  --bg: #F7F9FC;
  --bg-elevated: #FFFFFF;
  --bg-card: #FFFFFF;
  --border: #D9E1EC;
  --text-primary: #0F172A;
  --text-secondary: #334155;
  --accent: #0F9F7A;
}`;

const spacingSnippet = `Core rhythm
- Section: 120px vertical
- Container max-width: 1200px
- Card padding: 36px
- Control padding: 14px / 28px
- Border radius: 8px, 10px, 12px`;

const logoUsageSnippet = `Logo usage standards
x = total symbol height

- Clear space: 0.5x on all sides
- Minimum size (symbol): 16px digital, 24px if gradient detail must remain visible
- Preferred nav symbol size: 28px to 36px
- Minimum horizontal lockup width: 120px
- Keep symbol orientation horizontal; never rotate, skew, or crop
- Keep gradients intact; do not recolor the mark outside approved tokens`;

export default function BrandReferencePage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Brand</div>
          <h1 className="page-title">
            VoiceRails brand system.<br />
            <em>Codified for reuse.</em>
          </h1>
          <p className="page-subtitle">
            This page is the implementation reference for teams extending VoiceRails into other apps, docs,
            dashboards, and product surfaces while preserving one consistent look and feel.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-label">Brand Foundation</div>
          <h2 className="section-title">One voice, one system, many surfaces.</h2>
          <p className="section-desc">
            The brand combines developer-native precision with premium dark-mode execution. If a new surface
            follows these rules, it should feel recognizably VoiceRails on first glance.
          </p>
          <div className="grid-3">
            {brandPillars.map((pillar) => (
              <div className="card" key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Logo System</div>
          <h2 className="section-title">Professional standards for mark usage.</h2>
          <p className="section-desc">
            The VoiceRails mark is a core brand asset. Use only approved files and follow spacing, sizing, and
            background rules to keep visual consistency across products, docs, and marketing surfaces.
          </p>

          <div className="grid-2">
            <div className="card">
              <h3>Approved assets</h3>
              <div className="brand-logo-grid">
                {logoAssets.map((asset) => (
                  <div className="brand-logo-item" key={asset.titleLine1}>
                    <div className={`brand-logo-frame ${asset.frame}`}>
                      <Image src={asset.src} alt={asset.titleLine1} width={112} height={112} className="brand-logo-preview" />
                    </div>
                    <p className="brand-token-name">
                      {asset.titleLine1}
                      {asset.titleLine2 && <><br />{asset.titleLine2}</>}
                    </p>
                    <p className="brand-type-caption">{asset.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3>Usage rules</h3>
              <ul>
                <li>Maintain clear space of at least 0.5x around the mark in all contexts.</li>
                <li>Use the dark-background asset on dark surfaces and transparent asset on controlled surfaces.</li>
                <li>Keep logo rendering crisp; export SVG or high-density PNG for production delivery.</li>
                <li>Do not apply shadows, strokes, alternate gradients, or unapproved color tints.</li>
                <li>Do not place logo over noisy/low-contrast imagery without an isolating background.</li>
              </ul>
            </div>
          </div>

          <div className="code-block" style={{ marginTop: 24 }}>
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">logo-standards.txt</span>
            </div>
            <div className="code-body">
              <pre style={{ color: "var(--text-primary)" }}>{logoUsageSnippet}</pre>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Color System</div>
          <h2 className="section-title">Tokenized color architecture.</h2>
          <p className="section-desc">
            Use semantic variables, not hardcoded values. `--accent` is reserved for meaningful interaction and
            emphasis; neutral tokens carry structure and hierarchy. Dark mode is the canonical default, with a
            governed light-mode override.
          </p>

          <div className="brand-token-grid">
            {colorTokens.map((token) => (
              <div className="brand-token-card" key={token.name}>
                <div className="brand-token-swatch-pair">
                  <div className="brand-token-swatch" style={{ background: token.dark }} title={`Dark ${token.dark}`} />
                  <div className="brand-token-swatch" style={{ background: token.light }} title={`Light ${token.light}`} />
                </div>
                <div>
                  <p className="brand-token-name">{token.name}</p>
                  <p className="brand-token-role">{token.role}</p>
                  <p className="brand-token-value">Dark {token.dark} · Light {token.light}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="code-block" style={{ marginTop: 24 }}>
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">core-design-tokens.css</span>
            </div>
            <div className="code-body">
              <pre style={{ color: "var(--text-primary)" }}>{tokenSnippet}</pre>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Theme Modes</div>
          <h2 className="section-title">Dark-first, light-available.</h2>
          <p className="section-desc">
            VoiceRails defaults to dark mode to preserve the core brand expression. A light mode variation is
            available via user preference toggle for accessibility and personal comfort.
          </p>

          <div className="grid-2">
            <div className="card">
              <h3>Default behavior</h3>
              <ul>
                <li>Theme defaults to dark for all first-time sessions.</li>
                <li>User-selected theme is saved locally and reused on return.</li>
                <li>Both themes share identical spacing, typography, and component rules.</li>
                <li>Theme switching is in-header and available on every page.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Light mode token override</h3>
              <pre style={{ color: "var(--text-secondary)", marginTop: 14 }}>{lightThemeSnippet}</pre>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Typography</div>
          <h2 className="section-title">Purpose-driven type pairing.</h2>
          <p className="section-desc">
            Three typefaces cover the full brand expression: a display serif for narrative weight,
            a geometric sans for readable body copy, and a monospace for technical credibility.
            Each serves a distinct role and should never be substituted.
          </p>

          <div className="grid-3">
            <div className="card">
              <p className="brand-type-meta">Display</p>
              <p className="brand-display-sample">Rails for Voice AI</p>
              <p className="brand-type-caption">Instrument Serif · headlines and key narrative moments</p>
            </div>
            <div className="card">
              <p className="brand-type-meta">Body</p>
              <p className="brand-body-sample">Production-ready interfaces with clean information hierarchy.</p>
              <p className="brand-type-caption">DM Sans · body, UI copy, product marketing text</p>
            </div>
            <div className="card">
              <p className="brand-type-meta">Monospace</p>
              <p className="brand-mono-sample">voicerails deploy --provider openai</p>
              <p className="brand-type-caption">JetBrains Mono · code, badges, diagnostics, system metadata</p>
            </div>
          </div>

          <h3 className="brand-subsection-title">Font specifications</h3>

          <div className="brand-font-spec-grid">
            <div className="brand-font-spec-card">
              <p className="brand-font-spec-name" style={{ fontFamily: "var(--font-display), Georgia, serif", fontStyle: "italic" }}>Instrument Serif</p>
              <p className="brand-font-spec-var"><code>--font-display</code></p>
              <table className="brand-font-spec-table">
                <tbody>
                  <tr><td>Source</td><td>Google Fonts</td></tr>
                  <tr><td>Weights</td><td>400 (Regular)</td></tr>
                  <tr><td>Styles</td><td>Normal, Italic</td></tr>
                  <tr><td>Fallback</td><td>Georgia, serif</td></tr>
                </tbody>
              </table>
              <p className="brand-font-spec-usage">Use for hero headlines, page titles, section titles, and key narrative moments where the brand needs to feel premium and editorial. Never use for dense UI controls, form labels, or small metadata.</p>
            </div>

            <div className="brand-font-spec-card">
              <p className="brand-font-spec-name" style={{ fontFamily: "var(--font-body), sans-serif" }}>DM Sans</p>
              <p className="brand-font-spec-var"><code>--font-body</code></p>
              <table className="brand-font-spec-table">
                <tbody>
                  <tr><td>Source</td><td>Google Fonts</td></tr>
                  <tr><td>Weights</td><td>300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)</td></tr>
                  <tr><td>Styles</td><td>Normal</td></tr>
                  <tr><td>Fallback</td><td>-apple-system, sans-serif</td></tr>
                </tbody>
              </table>
              <p className="brand-font-spec-usage">Primary interface typeface. Use for all body copy, navigation links, button labels, card descriptions, form inputs, and marketing prose. Weight 400 for body text, 500 for subtle emphasis, 600 for UI labels and nav items, 700 for strong emphasis.</p>
            </div>

            <div className="brand-font-spec-card">
              <p className="brand-font-spec-name" style={{ fontFamily: "var(--font-mono), monospace" }}>JetBrains Mono</p>
              <p className="brand-font-spec-var"><code>--font-mono</code></p>
              <table className="brand-font-spec-table">
                <tbody>
                  <tr><td>Source</td><td>Google Fonts</td></tr>
                  <tr><td>Weights</td><td>400 (Regular), 500 (Medium), 600 (SemiBold)</td></tr>
                  <tr><td>Styles</td><td>Normal</td></tr>
                  <tr><td>Fallback</td><td>monospace</td></tr>
                </tbody>
              </table>
              <p className="brand-font-spec-usage">Use for code blocks, inline code, terminal output, badges, status labels, metrics, CLI commands, and system metadata. Reinforces technical credibility wherever it appears. Weight 400 for code bodies, 500 for labels/badges, 600 for brandmark wordmark.</p>
            </div>
          </div>

          <h3 className="brand-subsection-title">Type scale</h3>

          <div className="brand-type-scale">
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Hero H1</span>
                <span className="brand-type-scale-detail">Display · clamp(52px, 7vw, 88px) · 1.05 · -0.025em</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>Voice infrastructure</p>
            </div>
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Page H1</span>
                <span className="brand-type-scale-detail">Display · clamp(40px, 5vw, 64px) · 1.08 · -0.02em</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>Platform overview</p>
            </div>
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Section H2</span>
                <span className="brand-type-scale-detail">Display · clamp(36px, 4vw, 52px) · 1.1 · -0.02em</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontStyle: "italic" }}>Codified for reuse.</p>
            </div>
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Card H3</span>
                <span className="brand-type-scale-detail">Body · 16px · 600 weight · 1.4</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>Technical credibility</p>
            </div>
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Body large</span>
                <span className="brand-type-scale-detail">Body · 17-18px · 400 weight · 1.7</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.7, color: "var(--text-secondary)" }}>Every visual choice favors precision, clarity, and operational confidence.</p>
            </div>
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Body</span>
                <span className="brand-type-scale-detail">Body · 14-16px · 400 weight · 1.65</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" }}>Ship production voice AI with confidence.</p>
            </div>
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Code / Mono</span>
                <span className="brand-type-scale-detail">Mono · 13-14px · 400 weight · 1.65</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 14, lineHeight: 1.65, color: "var(--accent)" }}>voicerails deploy --live</p>
            </div>
            <div className="brand-type-scale-row">
              <div className="brand-type-scale-meta">
                <span className="brand-type-scale-label">Label / Meta</span>
                <span className="brand-type-scale-detail">Mono · 11-12px · 500 weight · uppercase · 0.08em</span>
              </div>
              <p className="brand-type-scale-sample" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, fontWeight: 500, lineHeight: 1.4, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--accent)" }}>Platform</p>
            </div>
          </div>

          <h3 className="brand-subsection-title">Usage rules</h3>

          <div className="grid-2">
            <div className="card">
              <h3>Do</h3>
              <ul>
                <li>Use Instrument Serif exclusively for headlines and display-scale narrative text.</li>
                <li>Set display headlines with tight tracking (-0.02em to -0.03em) for a premium tone.</li>
                <li>Use DM Sans at weight 400 for all body text and weight 600 for UI emphasis.</li>
                <li>Use JetBrains Mono for any content that references code, commands, or system data.</li>
                <li>Load all three fonts via Google Fonts with <code>next/font</code> for automatic optimization.</li>
                <li>Apply <code>-webkit-font-smoothing: antialiased</code> globally for consistent rendering.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Don&apos;t</h3>
              <ul>
                <li>Never use Instrument Serif for body copy, form labels, or dense UI.</li>
                <li>Never substitute the brand fonts with system defaults in production surfaces.</li>
                <li>Never use DM Sans above weight 700 &mdash; the brand does not use Black/ExtraBold.</li>
                <li>Never use decorative or handwritten fonts anywhere in the brand system.</li>
                <li>Never mix font loading strategies that cause visible FOIT/FOUT flash in production.</li>
                <li>Never set body text below 14px for accessibility compliance.</li>
              </ul>
            </div>
          </div>

          <div className="code-block" style={{ marginTop: 24 }}>
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">font-loading.tsx</span>
            </div>
            <div className="code-body">
              <pre style={{ color: "var(--text-primary)" }}>{`import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono"
});`}</pre>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <section className="section">
          <div className="section-label">Layout + Components</div>
          <h2 className="section-title">Consistent rhythm across pages.</h2>
          <p className="section-desc">
            Layout decisions are deliberate: spacious sections, compact navigation, and elevated cards that hover
            with subtle motion. This creates an enterprise-quality interface that still feels fast.
          </p>

          <div className="grid-2">
            <div className="card">
              <h3>Spacing and rhythm</h3>
              <pre style={{ color: "var(--text-secondary)", marginTop: 14 }}>{spacingSnippet}</pre>
            </div>
            <div className="card">
              <h3>Interaction rules</h3>
              <ul>
                <li>Hover motion is subtle (typically -1px to -2px translateY).</li>
                <li>Primary CTAs use `--accent` with dark text for contrast.</li>
                <li>Card boundaries rely on low-contrast borders, not heavy shadows.</li>
                <li>Use 8/10/12px radii to keep components visually coherent.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="container"><hr className="section-divider" /></div>

      <div className="container">
        <div className="final-cta">
          <h2>Need the full implementation guide?</h2>
          <p>
            The complete enterprise brand design guide is available as a standalone document
            for design and engineering teams working across any VoiceRails surface.
          </p>
          <div className="hero-actions">
            <a href="/voicerails-brand-design-guide.md" download className="btn-primary">Download Brand Guide →</a>
            <Link href="/developers" className="btn-secondary">Open Developer Hub</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
