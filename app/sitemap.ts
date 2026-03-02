import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://voicerails.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/platform`, changeFrequency: "weekly", priority: 0.92 },
    { url: `${baseUrl}/developers`, changeFrequency: "weekly", priority: 0.92 },
    { url: `${baseUrl}/pricing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/docs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/docs/getting-started`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/docs/runtime-api`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/docs/telephony`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/docs/stripe-billing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/docs/workflows`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/workflow-builder`, changeFrequency: "monthly", priority: 0.7 }
  ];
}
