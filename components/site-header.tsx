"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/platform", label: "Platform" },
  { href: "/why-voicerails", label: "Why VoiceRails" },
  { href: "/developers", label: "Developers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" }
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link href="/" className="brandmark" aria-label="VoiceRails home">
          <Image
            src="/logo-64.png"
            alt=""
            width={28}
            height={28}
            className="brand-logo"
          />
          voice<span className="brand-accent">rails</span>.ai
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              {item.label}
            </Link>
          ))}
          <Link href="/workflow-builder" className="nav-cta">
            Try Builder →
          </Link>
        </nav>
      </div>
    </header>
  );
}
