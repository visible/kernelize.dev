import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          borderRadius: "32px",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "100px",
            background: "#e5e5e5",
            borderRadius: "8px",
          }}
        />
      </div>
    ),
    { width: 180, height: 180 }
  )
}
