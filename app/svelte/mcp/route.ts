import { createmcp } from '@/lib/mcp'
import { createcontent } from '@/lib/content'

const content = createcontent('svelte')

const { handler, page } = createmcp({
  name: 'svelte-docs',
  title: 'svelte',
  description: 'Svelte and SvelteKit documentation',
  basePath: '/svelte/mcp',
  sections: content.getSections(),
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    { name: 'search_svelte_docs', description: 'search documentation by keyword' },
    { name: 'get_svelte_doc', description: 'get full content of a page' },
    { name: 'list_svelte_docs', description: 'list available pages' },
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
