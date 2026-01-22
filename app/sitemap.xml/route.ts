export async function GET() {
  const urls = [
    "https://kernelize.dev",
    "https://kernelize.dev/ai/mcp",
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}
