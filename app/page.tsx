import Link from "next/link";
import { Codeblock } from "@/components/codeblock";
import { servers } from "@/lib/servers";

export default function Home() {
  return (
    <main className="min-h-screen px-8 py-20">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16">
          <h1 className="mb-4 text-2xl font-normal uppercase tracking-[0.3em]">
            Kernelize
          </h1>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>MCP servers for documentation</span>
            <span className="text-neutral-300">·</span>
            <span>[ {servers.length + 1} endpoints ]</span>
          </div>
        </header>

        <div className="mb-4 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Endpoints
          </span>
          <div className="h-px flex-1 border-b border-dotted border-neutral-300" />
        </div>

        <section className="mb-16">
          <div className="grid gap-1">
            <Link
              href="/mcp"
              className="group flex items-center gap-2 py-2 text-sm"
            >
              <span className="text-[#3B5BDB]">/mcp</span>
              <span className="flex-1 border-b border-dotted border-neutral-200" />
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600">
                all documentation
              </span>
            </Link>
            {servers.map((server, i) => (
              <Link
                key={server.path}
                href={server.path}
                className="group flex items-center gap-2 py-2 text-sm"
              >
                <span className="text-neutral-600 group-hover:text-[#3B5BDB]">
                  {server.path}
                </span>
                <span className="flex-1 border-b border-dotted border-neutral-200" />
                <span className="text-xs text-neutral-400 group-hover:text-neutral-600">
                  {server.description}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mb-4 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Setup
          </span>
          <div className="h-px flex-1 border-b border-dotted border-neutral-300" />
        </div>

        <section className="mb-16 space-y-6">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Cursor
            </p>
            <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Claude Code
            </p>
            <Codeblock>
              claude mcp add -t http kernelize https://kernelize.dev/mcp
            </Codeblock>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Codex
            </p>
            <Codeblock>
              codex mcp add kernelize --url https://kernelize.dev/mcp
            </Codeblock>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Codex
            </p>
            <Codeblock>codex mcp add kernelize --url https://kernelize.dev/mcp</Codeblock>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Opencode
            </p>
            <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "type": "sse", "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
          </div>
        </section>

        <footer className="flex items-center gap-4 border-t border-dotted border-neutral-300 pt-8">
          <a
            href="https://github.com/visible"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-[#3B5BDB]"
          >
            github.com/visible
          </a>
        </footer>
      </div>
    </main>
  );
}
