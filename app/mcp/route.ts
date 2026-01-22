import { z } from 'zod'
import { createMcpHandler } from 'mcp-handler'
import { createcontent } from '@/lib/content'
import { mcppage } from '@/lib/html'
import { readdirSync } from 'fs'
import { join } from 'path'

function getsources() {
  const contentdir = join(process.cwd(), 'content')
  const dirs = readdirSync(contentdir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  return dirs.map(dir => {
    const content = createcontent(dir)
    const sections = content.getSections()
    return { key: dir, name: dir, content, sections }
  })
}

const sources = getsources()

const handler = createMcpHandler(
  server => {
    for (const src of sources) {
      server.tool(
        `search_${src.key}_docs`,
        `Search the ${src.name} documentation by keyword or phrase. Returns matching documents with relevance scores and snippets.`,
        {
          query: z.string().describe('Search query'),
          limit: z.number().int().min(1).max(20).default(10).describe('Maximum results (default: 10, max: 20)'),
        },
        async args => {
          const results = await src.content.searchDocs(args.query, args.limit)
          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify({
                query: args.query,
                resultCount: results.length,
                results,
                hint: `Use get_${src.key}_doc with a path from these results to get full content.`,
              }, null, 2),
            }],
          }
        }
      )

      server.tool(
        `get_${src.key}_doc`,
        `Get the full content of a specific ${src.name} documentation page. Large documents are paginated.`,
        {
          path: z.string().describe('Document path from search results'),
          page: z.number().int().min(1).default(1).describe('Page number for large documents (default: 1)'),
        },
        async args => {
          const result = await src.content.getDoc(args.path, args.page)
          if (!result) {
            return {
              content: [{ type: 'text' as const, text: JSON.stringify({ error: `Document not found: ${args.path}` }) }],
              isError: true,
            }
          }
          return { content: [{ type: 'text' as const, text: result.content }] }
        }
      )

      server.tool(
        `list_${src.key}_docs`,
        `List available ${src.name} documentation pages.`,
        {
          section: z.enum(src.sections as [string, ...string[]]).optional().describe('Filter by section'),
        },
        async args => {
          const result = await src.content.listDocs(args.section)
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] }
        }
      )
    }
  },
  {
    serverInfo: { name: 'kernelize', version: '1.0.0' },
    capabilities: { tools: {} },
  },
  {
    basePath: '',
    verboseLogs: process.env.NODE_ENV === 'development',
    maxDuration: 60,
  }
)

const tools = sources.flatMap(src => [
  { name: `search_${src.key}_docs`, description: `search ${src.name} docs` },
  { name: `get_${src.key}_doc`, description: `get page content` },
  { name: `list_${src.key}_docs`, description: `list pages` },
])

const page = mcppage({
  path: '/mcp',
  name: 'kernelize',
  title: 'kernelize',
  description: 'all documentation servers combined',
  tools,
})

export async function GET(request: Request) {
  const accept = request.headers.get('accept') || ''
  if (accept.includes('text/html')) {
    return new Response(page, { headers: { 'Content-Type': 'text/html' } })
  }
  return handler(request)
}

export { handler as POST, handler as DELETE }
