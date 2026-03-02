import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">
            <Image
              src="/logo-64.png"
              alt=""
              width={24}
              height={24}
              className="footer-logo"
            />
            voice<span>rails</span>.ai
          </p>
          <p className="footer-tagline">
            The infrastructure layer for production voice AI. Built for developers and builders who ship.
          </p>
        </div>

        <div>
          <p className="footer-heading">Product</p>
          <ul className="footer-list">
            <li><Link href="/platform">Platform</Link></li>
            <li><Link href="/why-voicerails">Why VoiceRails</Link></li>
            <li><Link href="/workflow-builder">Workflow Builder</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-heading">Developers</p>
          <ul className="footer-list">
            <li><Link href="/developers">Developer Hub</Link></li>
            <li><Link href="/docs">Documentation</Link></li>
            <li><Link href="/docs/runtime-api">API Reference</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-heading">Company</p>
          <ul className="footer-list">
            <li><a href="mailto:founders@voicerails.ai">Contact</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 VoiceRails · Fueld AI Ltd</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
