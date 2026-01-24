import Link from "next/link";
import { servers } from "@/lib/servers";
import { Codeblock } from "@/components/codeblock";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-xl">
        <header className="mb-12">
          <h1 className="text-sm text-neutral-200">kernelize</h1>
          <p className="mt-1 text-xs text-neutral-500">
            mcp servers for documentation
          </p>
        </header>

        <section className="mb-12">
          <p className="mb-4 text-xs text-neutral-500">endpoints</p>
          <div className="space-y-1">
            <Link
              href="/mcp"
              className="flex items-center justify-between py-2 text-sm text-neutral-200 hover:text-white"
            >
              <span>/mcp</span>
              <span className="text-xs text-neutral-500">all docs</span>
            </Link>
            {servers.map((server) => (
              <Link
                key={server.path}
                href={server.path}
                className="flex items-center justify-between py-2 text-sm text-neutral-400 hover:text-neutral-200"
              >
                <span>{server.path}</span>
                <span className="text-xs text-neutral-500">
                  {server.description}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <p className="mb-4 text-xs text-neutral-500">setup</p>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs text-neutral-500">cursor</p>
              <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
            </div>
            <div>
              <p className="mb-2 text-xs text-neutral-500">claude code</p>
              <Codeblock>
                claude mcp add -t http kernelize https://kernelize.dev/mcp
              </Codeblock>
            </div>
            <div>
              <p className="mb-2 text-xs text-neutral-500">opencode</p>
              <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "type": "sse", "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-800 pt-6">
          <a
            href="https://github.com/visible"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-neutral-300"
          >
            visible
          </a>
        </footer>
      </div>
    </main>
  );
}
