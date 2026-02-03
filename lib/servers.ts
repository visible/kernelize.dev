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
    tools: [
      "search_turborepo_docs",
      "get_turborepo_doc",
      "list_turborepo_docs",
    ],
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
    tools: [
      "search_reactnative_docs",
      "get_reactnative_doc",
      "list_reactnative_docs",
    ],
  },
  {
    path: "/expo/mcp",
    name: "expo",
    description: "search and read expo framework documentation",
    tools: ["search_expo_docs", "get_expo_doc", "list_expo_docs"],
  },
  {
    path: "/betterauth/mcp",
    name: "betterauth",
    description: "search and read better auth documentation",
    tools: [
      "search_betterauth_docs",
      "get_betterauth_doc",
      "list_betterauth_docs",
    ],
  },
  {
    path: "/swift/mcp",
    name: "swift",
    description: "search and read swift programming language documentation",
    tools: ["search_swift_docs", "get_swift_doc", "list_swift_docs"],
  },
  {
    path: "/openai/mcp",
    name: "openai",
    description: "search and read openai api documentation",
    tools: ["search_openai_docs", "get_openai_doc", "list_openai_docs"],
  },
  {
    path: "/anthropic/mcp",
    name: "anthropic",
    description: "search and read anthropic api documentation",
    tools: [
      "search_anthropic_docs",
      "get_anthropic_doc",
      "list_anthropic_docs",
    ],
  },
  {
    path: "/together/mcp",
    name: "together",
    description: "search and read together.ai api documentation",
    tools: ["search_together_docs", "get_together_doc", "list_together_docs"],
  },
  {
    path: "/fireworks/mcp",
    name: "fireworks",
    description: "search and read fireworks.ai api documentation",
    tools: [
      "search_fireworks_docs",
      "get_fireworks_doc",
      "list_fireworks_docs",
    ],
  },
  {
    path: "/groq/mcp",
    name: "groq",
    description: "search and read groq api documentation",
    tools: ["search_groq_docs", "get_groq_doc", "list_groq_docs"],
  },
  {
    path: "/cerebras/mcp",
    name: "cerebras",
    description: "search and read cerebras api documentation",
    tools: ["search_cerebras_docs", "get_cerebras_doc", "list_cerebras_docs"],
  },
  {
    path: "/fal/mcp",
    name: "fal",
    description: "search and read fal.ai api documentation",
    tools: ["search_fal_docs", "get_fal_doc", "list_fal_docs"],
  },
  {
    path: "/replicate/mcp",
    name: "replicate",
    description: "search and read replicate api documentation",
    tools: [
      "search_replicate_docs",
      "get_replicate_doc",
      "list_replicate_docs",
    ],
  },
  {
    path: "/mistral/mcp",
    name: "mistral",
    description: "search and read mistral ai documentation",
    tools: ["search_mistral_docs", "get_mistral_doc", "list_mistral_docs"],
  },
  {
    path: "/cohere/mcp",
    name: "cohere",
    description: "search and read cohere api documentation",
    tools: ["search_cohere_docs", "get_cohere_doc", "list_cohere_docs"],
  },
  {
    path: "/elevenlabs/mcp",
    name: "elevenlabs",
    description: "search and read elevenlabs api documentation",
    tools: [
      "search_elevenlabs_docs",
      "get_elevenlabs_doc",
      "list_elevenlabs_docs",
    ],
  },
  {
    path: "/perplexity/mcp",
    name: "perplexity",
    description: "search and read perplexity api documentation",
    tools: [
      "search_perplexity_docs",
      "get_perplexity_doc",
      "list_perplexity_docs",
    ],
  },
];
