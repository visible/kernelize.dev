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
]
