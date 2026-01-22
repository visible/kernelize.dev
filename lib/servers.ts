export interface Server {
  path: string
  name: string
  description: string
  tools: string[]
}

export const servers: Server[] = [
  {
    path: '/ai/mcp',
    name: 'ai-sdk-docs',
    description: 'search and read ai sdk documentation',
    tools: ['search_ai_sdk_docs', 'get_ai_sdk_doc', 'list_ai_sdk_docs'],
  },
  {
    path: '/hono/mcp',
    name: 'hono-docs',
    description: 'search and read hono framework documentation',
    tools: ['search_hono_docs', 'get_hono_doc', 'list_hono_docs'],
  },
  {
    path: '/svelte/mcp',
    name: 'svelte-docs',
    description: 'search and read svelte and sveltekit documentation',
    tools: ['search_svelte_docs', 'get_svelte_doc', 'list_svelte_docs'],
  },
  {
    path: '/effect/mcp',
    name: 'effect-docs',
    description: 'search and read effect-ts documentation',
    tools: ['search_effect_docs', 'get_effect_doc', 'list_effect_docs'],
  },
]
