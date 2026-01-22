import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "kernelize.dev",
  description: "mcp servers for ai development",
  openGraph: {
    title: "kernelize.dev",
    description: "mcp servers for ai development",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0a0a" }}>{children}</body>
    </html>
  )
}
