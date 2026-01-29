export interface Server {
  path: string;
  name: string;
  description: string;
  tools: string[];
}

export const servers: Server[] = [
  {
    path: "/ai/mcp",
    name: "ai",
    description: "search and read ai sdk documentation",
    tools: ["search_ai_docs", "get_ai_doc", "list_ai_docs"],
  },
  {
    path: "/hono/mcp",
    name: "hono",
    description: "search and read hono framework documentation",
    tools: ["search_hono_docs", "get_hono_doc", "list_hono_docs"],
  },
  {
    path: "/svelte/mcp",
    name: "svelte",
    description: "search and read svelte and sveltekit documentation",
    tools: ["search_svelte_docs", "get_svelte_doc", "list_svelte_docs"],
  },
  {
    path: "/effect/mcp",
    name: "effect",
    description: "search and read effect-ts documentation",
    tools: ["search_effect_docs", "get_effect_doc", "list_effect_docs"],
  },
  {
    path: "/workflow/mcp",
    name: "workflow",
    description: "search and read vercel workflow documentation",
    tools: ["search_workflow_docs", "get_workflow_doc", "list_workflow_docs"],
  },
  {
    path: "/octokit/mcp",
    name: "octokit",
    description: "search and read github sdk documentation",
    tools: ["search_octokit_docs", "get_octokit_doc", "list_octokit_docs"],
  },
  {
    path: "/turborepo/mcp",
    name: "turborepo",
    description: "search and read turborepo documentation",
    tools: ["search_turborepo_docs", "get_turborepo_doc", "list_turborepo_docs"],
  },
  {
    path: "/nextjs/mcp",
    name: "nextjs",
    description: "search and read next.js documentation",
    tools: ["search_nextjs_docs", "get_nextjs_doc", "list_nextjs_docs"],
  },
  {
    path: "/tauri/mcp",
    name: "tauri",
    description: "search and read tauri desktop app documentation",
    tools: ["search_tauri_docs", "get_tauri_doc", "list_tauri_docs"],
  },
  {
    path: "/reactnative/mcp",
    name: "reactnative",
    description: "search and read react native documentation",
    tools: ["search_reactnative_docs", "get_reactnative_doc", "list_reactnative_docs"],
  },
  {
    path: "/expo/mcp",
    name: "expo",
    description: "search and read expo framework documentation",
    tools: ["search_expo_docs", "get_expo_doc", "list_expo_docs"],
  },
];
