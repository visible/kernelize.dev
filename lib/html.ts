interface Tool {
  name: string;
  description: string;
}

interface PageConfig {
  path: string;
  name: string;
  title?: string;
  description: string;
  tools: Tool[];
}

const copyIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;

const checkIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>`;

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  background: #fafafa;
  color: #1a1a1a;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
}
::selection { background: #3B5BDB; color: white; }
main { min-height: 100vh; padding: 5rem 2rem; }
.container { max-width: 896px; margin: 0 auto; }
header { margin-bottom: 4rem; }
h1 { font-size: 1.5rem; font-weight: 400; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 1rem; }
.meta { display: flex; align-items: center; gap: 1rem; font-size: 12px; color: #737373; }
.meta .dot { color: #d4d4d4; }
.divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.divider span { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #a3a3a3; }
.divider .line { flex: 1; height: 1px; border-bottom: 1px dotted #d4d4d4; }
section { margin-bottom: 4rem; }
.codeblock { position: relative; margin-bottom: 1rem; }
.codeblock pre { background: white; padding: 0.75rem; font-size: 11px; line-height: 1.6; overflow: auto; border: 1px solid #e5e5e5; color: #525252; margin: 0; }
.codeblock button { position: absolute; top: 0.5rem; right: 0.5rem; background: transparent; border: none; color: #d4d4d4; cursor: pointer; padding: 0.25rem; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.15s; }
.codeblock:hover button { opacity: 1; }
.codeblock button:hover { color: #3B5BDB; }
.label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #a3a3a3; margin-bottom: 0.5rem; }
.tools { display: flex; flex-direction: column; gap: 0.25rem; }
.tool { display: flex; align-items: center; gap: 0.5rem; font-size: 12px; padding: 0.5rem 0; }
.tool code { color: #525252; }
.tool .line { flex: 1; border-bottom: 1px dotted #e5e5e5; }
.tool span { color: #a3a3a3; }
footer { padding-top: 2rem; border-top: 1px dotted #d4d4d4; }
footer a { color: #a3a3a3; font-size: 12px; text-decoration: none; }
footer a:hover { color: #3B5BDB; }
`;

const script = `
function copy(btn) {
  const pre = btn.parentElement.querySelector('pre');
  navigator.clipboard.writeText(pre.textContent);
  btn.innerHTML = '${checkIcon.replace(/'/g, "\\'")}';
  setTimeout(() => btn.innerHTML = '${copyIcon.replace(/'/g, "\\'")}', 1500);
}
`;

function codeblock(content: string): string {
  return `<div class="codeblock"><pre>${content}</pre><button type="button" onclick="copy(this)" aria-label="copy to clipboard">${copyIcon}</button></div>`;
}

export function mcppage(config: PageConfig): string {
  const toolsHtml = config.tools
    .map(
      (tool) => `
    <div class="tool">
      <code>${tool.name}</code>
      <div class="line"></div>
      <span>${tool.description}</span>
    </div>
  `,
    )
    .join("");

  const server = config.path.split("/")[1];
  const ogUrl = `https://kernelize.dev/og?server=${server}`;

  const cursorConfig = `{
  "mcpServers": {
    "${config.name}": {
      "url": "https://kernelize.dev${config.path}"
    }
  }
}`;

  const claudeCommand = `claude mcp add -t http ${config.name} https://kernelize.dev${config.path}`;

  const codexCommand = `codex mcp add ${config.name} --url https://kernelize.dev${config.path}`;

  const opencodeConfig = `{
  "mcpServers": {
    "${config.name}": {
      "type": "sse",
      "url": "https://kernelize.dev${config.path}"
    }
  }
}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title || config.name}</title>
  <meta name="description" content="${config.description}">
  <meta property="og:title" content="${config.title || config.name}">
  <meta property="og:description" content="${config.description}">
  <meta property="og:image" content="${ogUrl}">
  <meta property="og:url" content="https://kernelize.dev${config.path}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${config.title || config.name}">
  <meta name="twitter:description" content="${config.description}">
  <meta name="twitter:image" content="${ogUrl}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <style>${styles}</style>
</head>
<body>
  <main>
  <div class="container">
    <header>
      <h1>${config.name}</h1>
      <div class="meta">
        <span>${config.description}</span>
        <span class="dot">·</span>
        <span>[ ${config.tools.length} tools ]</span>
      </div>
    </header>

    <div class="divider">
      <span>Setup</span>
      <div class="line"></div>
    </div>

    <section>
      <p class="label">Cursor</p>
      ${codeblock(cursorConfig)}

      <p class="label">Claude Code</p>
      ${codeblock(claudeCommand)}

      <p class="label">Codex</p>
      ${codeblock(codexCommand)}

      <p class="label">Opencode</p>
      ${codeblock(opencodeConfig)}
    </section>

    <div class="divider">
      <span>Tools</span>
      <div class="line"></div>
    </div>

    <section>
      <div class="tools">${toolsHtml}</div>
    </section>

    <footer>
      <a href="/">kernelize.dev</a>
    </footer>
  </div>
  </main>
  <script>${script}</script>
</body>
</html>`;
}
