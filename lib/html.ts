interface Tool {
  name: string
  description: string
}

interface PageConfig {
  path: string
  name: string
  title?: string
  description: string
  tools: Tool[]
}

const github = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  background: #0a0a0a;
  color: #e5e5e5;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
}
.container { max-width: 640px; margin: 0 auto; padding: 4rem 1.5rem; }
.breadcrumb { color: #444; font-size: 11px; margin-bottom: 2rem; }
.breadcrumb a { color: #555; text-decoration: none; }
.breadcrumb a:hover { color: #888; }
h1 { font-size: 13px; font-weight: 400; margin-bottom: 0.25rem; }
h1 code { color: #e5e5e5; }
.subtitle { color: #555; font-size: 11px; margin-bottom: 3rem; }
section { margin-bottom: 2.5rem; }
.label { font-size: 13px; color: #666; margin-bottom: 0.75rem; }
.label span { color: #888; }
pre { background: #111; padding: 0.75rem; border-radius: 6px; font-size: 11px; line-height: 1.6; overflow: auto; border: 1px solid #222; color: #888; }
.tools { display: flex; flex-direction: column; gap: 0.5rem; padding-left: 1rem; }
.tool { display: flex; align-items: center; gap: 0.75rem; font-size: 11px; }
.tool code { color: #999; }
.tool span { color: #444; }
.tool p { color: #555; margin: 0; }
footer { padding-top: 2rem; border-top: 1px solid #1a1a1a; }
footer a { color: #444; font-size: 11px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; }
footer a:hover { color: #666; }
`

export function mcppage(config: PageConfig): string {
  const breadcrumb = config.path.split('/').filter(Boolean)
  const breadcrumbHtml = breadcrumb.map((part, i) =>
    i === breadcrumb.length - 1 ? part : `${part} <span style="color:#333">/</span>`
  ).join(' ')

  const toolsHtml = config.tools.map(tool => `
    <div class="tool">
      <code>${tool.name}</code>
      <span>·</span>
      <p>${tool.description}</p>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title || config.name}</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <style>${styles}</style>
</head>
<body>
  <div class="container">
    <p class="breadcrumb"><a href="/">kernelize.dev</a> <span style="color:#333">/</span> ${breadcrumbHtml}</p>
    <h1><code>${config.path}</code></h1>
    <p class="subtitle">${config.description}</p>

    <section>
      <p class="label"><span>&gt;</span> cursor?</p>
      <pre>{
  "mcpServers": {
    "${config.name}": {
      "url": "https://kernelize.dev${config.path}"
    }
  }
}</pre>
    </section>

    <section>
      <p class="label"><span>&gt;</span> claude code?</p>
      <pre>claude mcp add --transport http ${config.name} https://kernelize.dev${config.path}</pre>
    </section>

    <section>
      <p class="label"><span>&gt;</span> opencode?</p>
      <pre>{
  "mcpServers": {
    "${config.name}": {
      "type": "sse",
      "url": "https://kernelize.dev${config.path}"
    }
  }
}</pre>
    </section>

    <section>
      <p class="label"><span>&gt;</span> manual?</p>
      <div class="tools">
        <div class="tool">
          <code>url</code>
          <span>·</span>
          <p>https://kernelize.dev${config.path}</p>
        </div>
        <div class="tool">
          <code>transport</code>
          <span>·</span>
          <p>http</p>
        </div>
      </div>
    </section>

    <section>
      <p class="label"><span>&gt;</span> tools?</p>
      <div class="tools">${toolsHtml}</div>
    </section>

    <footer>
      <a href="https://github.com/visible" target="_blank" rel="noopener noreferrer">
        ${github}
        visible
      </a>
    </footer>
  </div>
</body>
</html>`
}
