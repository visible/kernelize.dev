import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'

const MAX_CONTENT_LENGTH = 12000
const PAGE_SIZE = 8000

interface DocEntry {
  path: string
  title: string
  description: string
  section: string
  content: string
}

export interface SearchResult {
  path: string
  title: string
  description: string
  section: string
  snippet: string
  relevance: 'high' | 'medium' | 'low'
}

export interface DocResult {
  title: string
  path: string
  section: string
  content: string
  totalPages: number
  currentPage: number
  truncated: boolean
}

export interface DocList {
  section: string
  count: number
  docs: { path: string; title: string; description: string }[]
}

function extractTitle(content: string, filePath: string): string {
  const titleMatch = content.match(/^title:\s*['"]?(.+?)['"]?\s*$/m)
  if (titleMatch) return titleMatch[1]
  const headingMatch = content.match(/^#\s+(.+)$/m)
  if (headingMatch) return headingMatch[1]
  const basename = filePath.split('/').pop() || filePath
  return basename.replace(/\.mdx?$/, '')
}

function extractDescription(content: string): string {
  const descMatch = content.match(/^description:\s*['"]?(.+?)['"]?\s*$/m)
  if (descMatch) return descMatch[1]
  const stripped = stripFrontmatter(content)
  const firstParagraph = stripped
    .split('\n\n')
    .find(p => p.trim() && !p.startsWith('#') && !p.startsWith('<'))
  if (firstParagraph) return firstParagraph.slice(0, 200).trim()
  return ''
}

function extractSection(filePath: string): string {
  const parts = filePath.split('/')
  return parts[0] || 'docs'
}

function stripFrontmatter(content: string): string {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/)
  return match ? content.slice(match[0].length) : content
}

function walkDir(dir: string, baseDir: string): string[] {
  if (!existsSync(dir)) return []
  const files: string[] = []
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath, baseDir))
    } else if (entry.endsWith('.mdx') || entry.endsWith('.md')) {
      files.push(fullPath.slice(baseDir.length + 1))
    }
  }
  return files
}

function countOccurrences(text: string, search: string): number {
  if (!search) return 0
  let count = 0
  let pos = 0
  while ((pos = text.indexOf(search, pos)) !== -1) {
    count++
    pos += search.length
  }
  return count
}

const cache = new Map<string, DocEntry[]>()

function loadDocs(contentDir: string): DocEntry[] {
  if (cache.has(contentDir)) return cache.get(contentDir)!
  const dir = join(process.cwd(), 'content', contentDir)
  if (!existsSync(dir)) return []
  const files = walkDir(dir, dir)
  const entries: DocEntry[] = []
  for (const filePath of files) {
    try {
      const fullPath = join(dir, filePath)
      const rawContent = readFileSync(fullPath, 'utf-8')
      const docPath = filePath.replace(/\.mdx?$/, '')
      entries.push({
        path: docPath,
        title: extractTitle(rawContent, filePath),
        description: extractDescription(rawContent),
        section: extractSection(docPath),
        content: stripFrontmatter(rawContent),
      })
    } catch {
      continue
    }
  }
  cache.set(contentDir, entries)
  return entries
}

export function createcontent(contentDir: string) {
  const searchDocs = async (query: string, limit = 10): Promise<SearchResult[]> => {
    const allDocs = loadDocs(contentDir)
    if (!query || query.trim().length === 0) return []
    const effectiveLimit = Math.max(0, Math.min(limit, 20))
    if (effectiveLimit === 0) return []
    const trimmedQuery = query.slice(0, 500).trim()
    const queryLower = trimmedQuery.toLowerCase()
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2)
    const results: Array<SearchResult & { score: number }> = []
    for (const doc of allDocs) {
      const contentLower = doc.content.toLowerCase()
      const titleLower = doc.title.toLowerCase()
      const pathLower = doc.path.toLowerCase()
      let score = 0
      if (titleLower === queryLower) score += 100
      else if (titleLower.includes(queryLower)) score += 50
      if (pathLower.includes(queryLower.replace(/\s+/g, '-'))) score += 30
      for (const word of queryWords) {
        score += countOccurrences(titleLower, word) * 20
        score += Math.min(countOccurrences(contentLower, word), 10) * 2
      }
      score += Math.min(countOccurrences(contentLower, queryLower), 5) * 10
      if (score > 0) {
        const index = contentLower.indexOf(queryLower)
        let snippet = ''
        if (index !== -1) {
          const start = Math.max(0, index - 80)
          const end = Math.min(doc.content.length, index + query.length + 120)
          snippet = doc.content.slice(start, end).replace(/\n+/g, ' ').trim()
          if (start > 0) snippet = '...' + snippet
          if (end < doc.content.length) snippet = snippet + '...'
        } else if (queryWords.length > 0) {
          for (const word of queryWords) {
            const wordIndex = contentLower.indexOf(word)
            if (wordIndex !== -1) {
              const start = Math.max(0, wordIndex - 60)
              const end = Math.min(doc.content.length, wordIndex + 140)
              snippet = doc.content.slice(start, end).replace(/\n+/g, ' ').trim()
              if (start > 0) snippet = '...' + snippet
              if (end < doc.content.length) snippet = snippet + '...'
              break
            }
          }
        }
        results.push({
          path: doc.path,
          title: doc.title,
          description: doc.description,
          section: doc.section,
          snippet,
          relevance: score >= 50 ? 'high' : score >= 20 ? 'medium' : 'low',
          score,
        })
      }
    }
    results.sort((a, b) => b.score - a.score)
    return results.slice(0, effectiveLimit).map(({ score: _score, ...rest }) => rest)
  }

  const getDoc = async (docPath: string, page = 1): Promise<DocResult | null> => {
    const allDocs = loadDocs(contentDir)
    if (!docPath || docPath.trim().length === 0) return null
    let normalizedPath = docPath.replace(/\.mdx?$/, '')
    if (normalizedPath.startsWith('/')) normalizedPath = normalizedPath.slice(1)
    if (!normalizedPath) return null
    const doc = allDocs.find(d => d.path === normalizedPath || d.path.endsWith('/' + normalizedPath))
    if (!doc) return null
    const fullContent = doc.content
    const totalPages = Math.ceil(fullContent.length / PAGE_SIZE)
    const currentPage = Math.max(1, Math.min(page, totalPages))
    const start = (currentPage - 1) * PAGE_SIZE
    const end = Math.min(start + PAGE_SIZE, fullContent.length)
    let content = fullContent.slice(start, end)
    if (content.length > MAX_CONTENT_LENGTH) content = content.slice(0, MAX_CONTENT_LENGTH)
    const truncated = end < fullContent.length || content.length > MAX_CONTENT_LENGTH
    if (currentPage === 1) content = `# ${doc.title}\n\n${content}`
    if (truncated && currentPage < totalPages) {
      content += `\n\n---\n[Page ${currentPage} of ${totalPages}. Use page=${currentPage + 1} for more.]`
    }
    return { title: doc.title, path: doc.path, section: doc.section, content, totalPages, currentPage, truncated }
  }

  const listDocs = async (section?: string): Promise<DocList> => {
    const allDocs = loadDocs(contentDir)
    let filtered = allDocs
    if (section) filtered = allDocs.filter(d => d.section === section || d.path.startsWith(section))
    return {
      section: section || 'all',
      count: filtered.length,
      docs: filtered.map(({ path, title, description }) => ({ path, title, description })),
    }
  }

  const getSections = (): string[] => {
    const allDocs = loadDocs(contentDir)
    return [...new Set(allDocs.map(d => d.section))]
  }

  return { searchDocs, getDoc, listDocs, getSections }
}
