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

const checkIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>`;

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  min-height: 100vh;
  background: #0a0a0a;
  color: #e5e5e5;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
}
.container { max-width: 576px; margin: 0 auto; padding: 4rem 1.5rem; }
header { margin-bottom: 3rem; }
h1 { font-size: 14px; font-weight: 400; color: #e5e5e5; margin-bottom: 0.25rem; }
.subtitle { color: #737373; font-size: 12px; }
section { margin-bottom: 3rem; }
.label { font-size: 12px; color: #737373; margin-bottom: 0.5rem; }
.codeblock { position: relative; }
.codeblock pre { background: #0a0a0a; padding: 0.75rem; border-radius: 0.25rem; font-size: 12px; line-height: 1.6; overflow: auto; border: 1px solid #262626; color: #a3a3a3; margin: 0; }
.codeblock button { position: absolute; top: 0.5rem; right: 0.5rem; background: transparent; border: none; color: #525252; cursor: pointer; padding: 0.25rem; display: flex; align-items: center; justify-content: center; border-radius: 4px; opacity: 0; transition: opacity 0.15s; }
.codeblock:hover button { opacity: 1; }
.codeblock button:hover { color: #a3a3a3; }
.tools { display: flex; flex-direction: column; gap: 0.5rem; }
.tool { display: flex; align-items: center; gap: 0.75rem; font-size: 12px; }
.tool code { color: #a3a3a3; }
.tool span { color: #525252; }
.tool p { color: #737373; margin: 0; }
footer { padding-top: 1.5rem; border-top: 1px solid #262626; }
footer a { color: #737373; font-size: 12px; text-decoration: none; }
footer a:hover { color: #d4d4d4; }
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
      <span>·</span>
      <p>${tool.description}</p>
    </div>
  `,
    )
    .join("");

  const server = config.path.split("/")[1];
  const ogUrl = `https://kernelize.dev/og?server=${server}`;

  const cursorConfig = `{
  "mcpServers": {
    "${config.name}": { "url": "https://kernelize.dev${config.path}" }
  }
}`;

  const claudeCommand = `claude mcp add -t http ${config.name} https://kernelize.dev${config.path}`;

  const opencodeConfig = `{
  "mcpServers": {
    "${config.name}": { "type": "sse", "url": "https://kernelize.dev${config.path}" }
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
  <div class="container">
    <header>
      <h1>${config.path}</h1>
      <p class="subtitle">${config.description}</p>
    </header>

    <section>
      <p class="label">cursor</p>
      ${codeblock(cursorConfig)}
    </section>

    <section>
      <p class="label">claude code</p>
      ${codeblock(claudeCommand)}
    </section>

    <section>
      <p class="label">opencode</p>
      ${codeblock(opencodeConfig)}
    </section>

    <section>
      <p class="label">manual</p>
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
      <p class="label">tools</p>
      <div class="tools">${toolsHtml}</div>
    </section>

    <footer>
      <a href="/" rel="noopener noreferrer">kernelize</a>
    </footer>
  </div>
  <script>${script}</script>
</body>
</html>`;
}
