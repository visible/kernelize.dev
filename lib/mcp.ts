import { z } from 'zod'
import { createMcpHandler } from 'mcp-handler'
import { mcppage } from './html'

interface DocEntry {
  path: string
  title: string
  description: string
  section: string
  content: string
}

interface SearchResult {
  path: string
  title: string
  description: string
  section: string
  snippet: string
  relevance: 'high' | 'medium' | 'low'
}

interface DocResult {
  title: string
  path: string
  section: string
  content: string
  totalPages: number
  currentPage: number
  truncated: boolean
}

interface DocList {
  section: string
  count: number
  docs: { path: string; title: string; description: string }[]
}

interface McpConfig {
  name: string
  description: string
  basePath: string
  sections: string[]
  searchDocs: (query: string, limit: number) => Promise<SearchResult[]>
  getDoc: (path: string, page: number) => Promise<DocResult | null>
  listDocs: (section?: string) => Promise<DocList>
  tools: { name: string; description: string }[]
}

export function createmcp(config: McpConfig) {
  const handler = createMcpHandler(
    server => {
      server.tool(
        `search_${config.name.replace(/-/g, '_')}_docs`,
        `Search the ${config.description} by keyword or phrase. Returns matching documents with relevance scores and snippets.`,
        {
          query: z.string().describe('Search query'),
          limit: z.number().int().min(1).max(20).default(10).describe('Maximum results (default: 10, max: 20)'),
        },
        async args => {
          const results = await config.searchDocs(args.query, args.limit)
          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify({
                query: args.query,
                resultCount: results.length,
                results,
                hint: results.length > 0
                  ? `Use get_${config.name.replace(/-/g, '_')}_doc with a path from these results to get full content.`
                  : `Try different keywords or check list_${config.name.replace(/-/g, '_')}_docs for available topics.`,
              }, null, 2),
            }],
          }
        }
      )

      server.tool(
        `get_${config.name.replace(/-/g, '_')}_doc`,
        `Get the full content of a specific ${config.description} page. Large documents are paginated.`,
        {
          path: z.string().describe('Document path from search results'),
          page: z.number().int().min(1).default(1).describe('Page number for large documents (default: 1)'),
        },
        async args => {
          const result = await config.getDoc(args.path, args.page)
          if (!result) {
            return {
              content: [{
                type: 'text' as const,
                text: JSON.stringify({
                  error: `Document not found: ${args.path}`,
                  hint: `Use search_${config.name.replace(/-/g, '_')}_docs to find the correct path.`,
                }),
              }],
              isError: true,
            }
          }
          return { content: [{ type: 'text' as const, text: result.content }] }
        }
      )

      server.tool(
        `list_${config.name.replace(/-/g, '_')}_docs`,
        `List available ${config.description} pages.`,
        {
          section: z.enum(config.sections as [string, ...string[]]).optional().describe('Filter by section'),
        },
        async args => {
          const result = await config.listDocs(args.section)
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] }
        }
      )
    },
    {
      serverInfo: { name: config.name, version: '1.0.0' },
      capabilities: { tools: {} },
    },
    {
      basePath: config.basePath.replace('/mcp', ''),
      verboseLogs: process.env.NODE_ENV === 'development',
      maxDuration: 60,
    }
  )

  const page = mcppage({
    path: config.basePath,
    name: config.name,
    description: config.description,
    tools: config.tools,
  })

  return { handler, page }
}
