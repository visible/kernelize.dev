import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kernelize.dev",
      lastModified: new Date(),
    },
    {
      url: "https://kernelize.dev/ai/mcp",
      lastModified: new Date(),
    },
  ]
}
