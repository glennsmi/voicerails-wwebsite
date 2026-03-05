"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "@/components/theme-toggle";

const navItems = [
  { href: "/platform", label: "Platform" },
  { href: "/why-voicerails", label: "Why VoiceRails" },
  { href: "/developers", label: "Developers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" }
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link
          href="/"
          className={isHome ? "brandmark brandmark-home" : "brandmark"}
          aria-label="VoiceRails home"
        >
          <Image
            src="/icon.png"
            alt=""
            width={isHome ? 44 : 38}
            height={isHome ? 44 : 38}
            className="brand-logo"
          />
          <span>Voice<span className="brand-accent">Rails</span></span>
        </Link>

        <div className="nav-actions">
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
          <ThemeToggle />

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`hamburger ${mobileOpen ? "hamburger-open" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobile}>
          <nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "mobile-nav-link mobile-nav-link-active"
                    : "mobile-nav-link"
                }
                onClick={closeMobile}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/workflow-builder"
              className="mobile-nav-cta"
              onClick={closeMobile}
            >
              Try Builder →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
