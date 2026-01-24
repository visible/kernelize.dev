import Link from "next/link";
import { servers } from "@/lib/servers";

export default function Home() {
  return (
    <div className="container">
      <p className="breadcrumb">kernelize.dev</p>
      <p className="subtitle">mcp servers for ai development</p>

      <section>
        <p className="label">
          <span>&gt;</span> what is this?
        </p>
        <div className="tools">
          <p className="tool-desc">hosted mcp servers for ai tools</p>
          <p className="tool-desc">
            plug into cursor, claude code, or any mcp client
          </p>
          <p className="tool-desc">no setup, no api keys, just works</p>
        </div>
      </section>

      <section>
        <p className="label">
          <span>&gt;</span> servers?
        </p>
        <div className="tools">
          <Link href="/mcp" className="tool">
            <code>/mcp</code>
            <span>·</span>
            <p>all docs in one endpoint</p>
          </Link>
        </div>
      </section>

      <section>
        <p className="label">
          <span>&gt;</span> included?
        </p>
        <div className="tools">
          {servers.map((server) => (
            <Link key={server.path} href={server.path} className="tool">
              <code>{server.path}</code>
              <span>·</span>
              <p>{server.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <p className="label">
          <span>&gt;</span> cursor?
        </p>
        <pre>{`{
  "mcpServers": {
    "kernelize": { "url": "https://kernelize.dev/mcp" }
  }
}`}</pre>
      </section>

      <section>
        <p className="label">
          <span>&gt;</span> claude code?
        </p>
        <pre>claude mcp add -t http kernelize https://kernelize.dev/mcp</pre>
      </section>

      <section>
        <p className="label">
          <span>&gt;</span> opencode?
        </p>
        <pre>{`{
  "mcpServers": {
    "kernelize": { "type": "sse", "url": "https://kernelize.dev/mcp" }
  }
}`}</pre>
      </section>

      <footer>
        <a
          href="https://github.com/visible"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          visible
        </a>
      </footer>
    </div>
  );
}
