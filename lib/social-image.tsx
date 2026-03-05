/* eslint-disable @next/next/no-img-element */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const wordmarkFile = readFileSync(join(process.cwd(), "public/Logo + Wordmark 845x256.png"));
const wordmarkDataUri = `data:image/png;base64,${wordmarkFile.toString("base64")}`;

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function buildSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #05070d 0%, #0a1322 100%)",
          color: "#f6f8ff",
          padding: "64px 72px",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        {/* Horizontal logo + wordmark lockup */}
        <img
          src={wordmarkDataUri}
          alt="VoiceRails"
          width={380}
          height={115}
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "58px", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.05 }}>
            Rails for Voice AI
          </div>
          <div style={{ fontSize: "28px", color: "#c1cde0", maxWidth: "960px", lineHeight: 1.45 }}>
            One platform for real-time orchestration, telephony, workflows, visual flow design,
            extraction, and memory.
          </div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
