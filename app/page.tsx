import Link from "next/link"
import { servers } from "@/lib/servers"

const font = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e5e5e5", fontFamily: font }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <header style={{ marginBottom: "4rem" }}>
          <pre
            style={{ color: "#666", fontSize: "11px", lineHeight: 1.4, userSelect: "none", margin: 0 }}
            aria-hidden="true"
          >{`┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ◇  kernelize.dev                                           │
│   mcp servers for ai development                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘`}</pre>
        </header>

        <section style={{ marginBottom: "3rem" }}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "1rem" }}>
            <span style={{ color: "#888" }}>&gt;</span> what is this?
          </p>
          <div style={{ paddingLeft: "1rem", fontSize: "13px", color: "#999" }}>
            <p style={{ margin: "0.25rem 0" }}>hosted mcp servers for ai tools</p>
            <p style={{ margin: "0.25rem 0" }}>plug into cursor, claude code, or any mcp client</p>
            <p style={{ margin: "0.25rem 0" }}>no setup, no api keys, just works</p>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "1rem" }}>
            <span style={{ color: "#888" }}>&gt;</span> servers?
          </p>
          <div style={{ paddingLeft: "1rem" }}>
            {servers.map((server) => (
              <Link
                key={server.path}
                href={server.path}
                style={{
                  display: "block",
                  padding: "1rem",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: "inherit",
                  marginBottom: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <code style={{ color: "#e5e5e5", fontSize: "13px" }}>{server.path}</code>
                  <span style={{ color: "#444", fontSize: "11px" }}>·</span>
                  <span style={{ color: "#666", fontSize: "11px" }}>{server.name}</span>
                </div>
                <p style={{ color: "#555", fontSize: "11px", margin: "0 0 0.75rem 0" }}>{server.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {server.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontSize: "10px",
                        padding: "0.25rem 0.5rem",
                        background: "#1a1a1a",
                        color: "#666",
                        borderRadius: "4px",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "1rem" }}>
            <span style={{ color: "#888" }}>&gt;</span> setup?
          </p>
          <div style={{ paddingLeft: "1rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ color: "#555", fontSize: "11px", marginBottom: "0.5rem" }}>cursor</p>
              <pre
                style={{
                  fontSize: "11px",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "6px",
                  padding: "0.75rem",
                  color: "#888",
                  margin: 0,
                  overflowX: "auto",
                }}
              >{`{
  "mcpServers": {
    "ai-sdk-docs": {
      "url": "https://kernelize.dev/ai/mcp"
    }
  }
}`}</pre>
            </div>
            <div>
              <p style={{ color: "#555", fontSize: "11px", marginBottom: "0.5rem" }}>claude code</p>
              <pre
                style={{
                  fontSize: "11px",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: "6px",
                  padding: "0.75rem",
                  color: "#888",
                  margin: 0,
                  overflowX: "auto",
                }}
              >
                claude mcp add ai-sdk-docs https://kernelize.dev/ai/mcp
              </pre>
            </div>
          </div>
        </section>

        <footer style={{ paddingTop: "2rem", borderTop: "1px solid #1a1a1a" }}>
          <a
            href="https://github.com/visible"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#444", fontSize: "11px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            visible
          </a>
        </footer>
      </div>
    </main>
  )
}
