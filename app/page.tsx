import Link from "next/link";
import { servers } from "@/lib/servers";
import { Codeblock } from "@/components/codeblock";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-16">
          <p className="mb-4 text-xs tracking-widest text-white/40">
            MCP SERVERS
          </p>
          <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
            kernelize
          </h1>
          <p className="text-lg text-white/60">
            hosted documentation servers for ai tools
          </p>
        </header>

        <section className="mb-16">
          <h2 className="mb-6 text-xs tracking-widest text-white/40">
            ENDPOINTS
          </h2>
          <div className="space-y-3">
            <Link
              href="/mcp"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-accent hover:bg-accent/5"
            >
              <div>
                <code className="text-sm text-white">/mcp</code>
                <p className="mt-1 text-xs text-white/40">
                  all documentation in one endpoint
                </p>
              </div>
              <span className="text-white/20 transition-colors group-hover:text-accent">
                &rarr;
              </span>
            </Link>
            {servers.map((server) => (
              <Link
                key={server.path}
                href={server.path}
                className="group flex items-center justify-between rounded-xl border border-white/10 px-5 py-4 transition-colors hover:border-white/20"
              >
                <div>
                  <code className="text-sm text-white/80">{server.path}</code>
                  <p className="mt-1 text-xs text-white/40">
                    {server.description}
                  </p>
                </div>
                <span className="text-white/20 transition-colors group-hover:text-white/40">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-xs tracking-widest text-white/40">SETUP</h2>
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm text-white/60">cursor</p>
              <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
            </div>
            <div>
              <p className="mb-3 text-sm text-white/60">claude code</p>
              <Codeblock>
                claude mcp add -t http kernelize https://kernelize.dev/mcp
              </Codeblock>
            </div>
            <div>
              <p className="mb-3 text-sm text-white/60">opencode</p>
              <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "type": "sse", "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-8">
          <a
            href="https://github.com/visible"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-white/30 transition-colors hover:text-white/60"
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
    </main>
  );
}
