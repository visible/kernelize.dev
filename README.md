```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   / kernelize.dev                                            │
│   mcp servers for ai development                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

```bash
> what is this?

  hosted mcp servers for ai tools
  plug into cursor, claude code, or any mcp client
  no setup, no api keys, just works

> servers?

  /ai/mcp       ai sdk documentation

> cursor setup?

  {
    "mcpServers": {
      "ai-sdk-docs": {
        "url": "https://kernelize.dev/ai/mcp"
      }
    }
  }

> claude code setup?

  claude mcp add ai-sdk-docs https://kernelize.dev/ai/mcp

> ai sdk tools?

  search_ai_sdk_docs    search documentation
  get_ai_sdk_doc        get page content
  list_ai_sdk_docs      list available pages

> development?

  pnpm install
  pnpm prebuild
  pnpm dev

> adding a server?

  1. create app/[name]/mcp/route.ts
  2. use createMcpHandler from mcp-handler
  3. add to homepage

> structure?

  app/
  ├── ai/mcp/route.ts     ai sdk docs server
  ├── layout.tsx
  └── page.tsx
  lib/
  └── content.ts          doc loading
  content/                cloned docs (gitignored)

> license?

  mit
```
