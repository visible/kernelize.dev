import Link from "next/link";
import { servers } from "@/lib/servers";
import { Codeblock } from "@/components/codeblock";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-xl">
        <header className="mb-12">
          <h1 className="text-sm text-neutral-400">kernelize</h1>
          <p className="mt-1 text-xs text-neutral-600">
            mcp servers for documentation
          </p>
        </header>

        <section className="mb-12">
          <p className="mb-4 text-xs text-neutral-600">endpoints</p>
          <div className="space-y-1">
            <Link
              href="/mcp"
              className="flex items-center justify-between py-2 text-sm text-neutral-300 hover:text-neutral-100"
            >
              <span>/mcp</span>
              <span className="text-xs text-neutral-700">all docs</span>
            </Link>
            {servers.map((server) => (
              <Link
                key={server.path}
                href={server.path}
                className="flex items-center justify-between py-2 text-sm text-neutral-500 hover:text-neutral-300"
              >
                <span>{server.path}</span>
                <span className="text-xs text-neutral-700">
                  {server.description}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <p className="mb-4 text-xs text-neutral-600">setup</p>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs text-neutral-700">cursor</p>
              <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
            </div>
            <div>
              <p className="mb-2 text-xs text-neutral-700">claude code</p>
              <Codeblock>
                claude mcp add -t http kernelize https://kernelize.dev/mcp
              </Codeblock>
            </div>
            <div>
              <p className="mb-2 text-xs text-neutral-700">opencode</p>
              <Codeblock>{`{
  "mcpServers": {
    "kernelize": { "type": "sse", "url": "https://kernelize.dev/mcp" }
  }
}`}</Codeblock>
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-900 pt-6">
          <a
            href="https://github.com/visible"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-700 hover:text-neutral-500"
          >
            visible
          </a>
        </footer>
      </div>
    </main>
  );
}
