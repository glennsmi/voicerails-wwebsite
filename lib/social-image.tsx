/* eslint-disable @next/next/no-img-element */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const logoFile = readFileSync(join(process.cwd(), "public/logo-128.png"));
const logoDataUri = `data:image/png;base64,${logoFile.toString("base64")}`;

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
          padding: "60px",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <img
            src={logoDataUri}
            alt=""
            width={124}
            height={124}
            style={{ borderRadius: "26px" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "2px",
              fontSize: "94px",
              fontWeight: 700,
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            <span>voice</span>
            <span style={{ color: "#3ECDA0" }}>rails</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "56px", fontWeight: 600, letterSpacing: "-1.2px" }}>
            Rails for Voice AI
          </div>
          <div style={{ fontSize: "30px", color: "#c1cde0", maxWidth: "1040px" }}>
            One platform for real-time orchestration, telephony, workflows, visual flow design,
            extraction, and memory.
          </div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
