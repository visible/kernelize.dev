import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "kernelize.dev",
  description: "mcp servers for ai development",
  openGraph: {
    title: "kernelize.dev",
    description: "mcp servers for ai development",
    type: "website",
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "kernelize.dev",
    description: "mcp servers for ai development",
    images: ["/og"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0a0a" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
