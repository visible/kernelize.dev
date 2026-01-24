import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "kernelize.dev", template: "%s | kernelize.dev" },
  description:
    "hosted mcp servers for ai documentation - svelte, hono, effect, octokit, and more",
  metadataBase: new URL("https://kernelize.dev"),
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "mcp",
    "mcp server",
    "model context protocol",
    "ai",
    "ai sdk",
    "cursor",
    "claude",
    "claude code",
    "opencode",
    "vercel",
    "documentation",
    "svelte",
    "hono",
    "effect",
    "octokit",
    "github",
    "turborepo",
    "monorepo",
  ],
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
    description:
      "hosted mcp servers for ai documentation - svelte, hono, effect, octokit, and more",
    url: "https://kernelize.dev",
    siteName: "kernelize.dev",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og", width: 1200, height: 630, alt: "kernelize.dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "kernelize.dev",
    description:
      "hosted mcp servers for ai documentation - svelte, hono, effect, octokit, and more",
    images: ["/og"],
  },
  alternates: {
    canonical: "https://kernelize.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
