import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VoiceRails",
    short_name: "VoiceRails",
    description: "One API layer for real-time voice models, telephony, and conversation workflows.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#3ECDA0",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
