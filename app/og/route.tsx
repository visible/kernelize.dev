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
  const subtitle = server ? titles[server] : "mcp servers for ai development";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
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
        <span style={{ color: "#888", fontSize: "28px", marginBottom: "8px" }}>
          kernelize.dev
        </span>
        <span style={{ color: "#555", fontSize: "24px" }}>{subtitle}</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
