import Link from "next/link";

const docs = [
  {
    href: "/docs/getting-started",
    title: "Getting Started",
    body: "Set up your first app and run a live session quickly."
  },
  {
    href: "/docs/runtime-api",
    title: "Runtime API",
    body: "Understand sessions, normalized events, and finalize contracts."
  },
  {
    href: "/docs/telephony",
    title: "Telephony",
    body: "Provision numbers and route inbound/outbound voice flows."
  },
  {
    href: "/docs/stripe-billing",
    title: "Stripe Billing",
    body: "Use Stripe hosted pages and process lifecycle webhooks safely."
  },
  {
    href: "/docs/workflows",
    title: "Workflows",
    body: "Map visual builder blocks into deterministic JSON definitions."
  }
];

export default function DocsPage() {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="page-badge">Documentation</div>
          <h1 className="page-title">
            Developer docs that<br />help teams <em>ship.</em>
          </h1>
          <p className="page-subtitle">
            Each section is short, practical, and centered on production outcomes.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="grid-3">
            {docs.map((doc) => (
              <Link href={doc.href} key={doc.href} className="card" style={{ textDecoration: "none" }}>
                <h3>{doc.title}</h3>
                <p>{doc.body}</p>
                <p style={{ marginTop: 16, fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>
                  Read guide →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
