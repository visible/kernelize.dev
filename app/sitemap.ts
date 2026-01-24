import type { MetadataRoute } from "next";
import { servers } from "@/lib/servers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kernelize.dev";

  const serverPages = servers.map((server) => ({
    url: `${base}${server.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/mcp`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serverPages,
  ];
}
