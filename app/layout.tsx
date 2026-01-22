import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "kernelize.dev",
  description: "mcp servers for ai development",
  metadataBase: new URL("https://kernelize.dev"),
  keywords: ["mcp", "model context protocol", "ai", "ai sdk", "cursor", "claude", "claude code", "vercel"],
  authors: [{ name: "visible", url: "https://github.com/visible" }],
  creator: "visible",
  publisher: "visible",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "kernelize.dev",
    description: "mcp servers for ai development",
    url: "https://kernelize.dev",
    siteName: "kernelize.dev",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og", width: 1200, height: 630, alt: "kernelize.dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "kernelize.dev",
    description: "mcp servers for ai development",
    images: ["/og"],
  },
  alternates: {
    canonical: "https://kernelize.dev",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
