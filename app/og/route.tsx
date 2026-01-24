import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const titles: Record<string, string> = {
  ai: "mcp server for ai sdk docs",
  hono: "mcp server for hono docs",
  svelte: "mcp server for svelte docs",
  effect: "mcp server for effect docs",
  workflow: "mcp server for workflow docs",
  octokit: "mcp server for octokit docs",
};

export async function GET(request: NextRequest) {
  const server = request.nextUrl.searchParams.get("server");
  const subtitle = server ? titles[server] : "mcp servers for documentation";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        fontFamily: "monospace",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#1a1a1a",
            fontSize: "48px",
            marginBottom: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Kernelize
        </span>
        <span style={{ color: "#737373", fontSize: "24px" }}>{subtitle}</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
