import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
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
            border: "1px dashed #333",
            padding: "48px 56px",
            width: "100%",
            maxWidth: "900px",
            height: "280px",
          }}
        >
          <span style={{ color: "#888", fontSize: "28px", marginBottom: "8px" }}>
            kernelize.dev
          </span>
          <span style={{ color: "#555", fontSize: "24px" }}>
            mcp servers for ai development
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
