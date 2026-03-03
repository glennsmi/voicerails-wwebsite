import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

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
});

const siteTitle = "VoiceRails — Rails for Voice AI";
const siteDescription =
  "One platform for real-time orchestration, telephony, workflows, visual flow design, extraction, and memory. Built for teams shipping production voice.";
const defaultSiteUrl = "https://voicerails-website--voicerails8.us-central1.hosted.app";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL.trim()
    : defaultSiteUrl;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "VoiceRails",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VoiceRails — Rails for Voice AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VoiceRails",
  },
  other: {
    "msapplication-TileColor": "#000000",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable} ${mono.variable}`}>
        <Script id="vr-theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const stored = localStorage.getItem("vr-theme");
              const theme = stored === "light" ? "light" : "dark";
              document.documentElement.setAttribute("data-theme", theme);
            } catch {
              document.documentElement.setAttribute("data-theme", "dark");
            }
          })();`}
        </Script>
        <SiteHeader />
        <div className="page-wrap">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
