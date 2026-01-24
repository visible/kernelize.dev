import { createmcp } from '@/lib/mcp'
import { createcontent } from '@/lib/content'

const content = createcontent('ai')

const { handler, page } = createmcp({
  name: 'ai',
  title: 'ai sdk',
  description: 'AI SDK documentation',
  basePath: '/ai/mcp',
  sections: ['docs', 'cookbook', 'providers'],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    { name: 'search_ai_sdk_docs', description: 'search documentation by keyword' },
    { name: 'get_ai_sdk_doc', description: 'get full content of a page' },
    { name: 'list_ai_sdk_docs', description: 'list available pages' },
  ],
})

export async function GET(request: Request) {
  const accept = request.headers.get('accept') || ''
  if (accept.includes('text/html')) {
    return new Response(page, { headers: { 'Content-Type': 'text/html' } })
  }
  return handler(request)
}

export { handler as POST, handler as DELETE }
