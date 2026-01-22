import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const MAX_CONTENT_LENGTH = 12000;
const PAGE_SIZE = 8000;
const CONTENT_DIR = join(process.cwd(), 'content');

interface DocEntry {
  path: string;
  title: string;
  description: string;
  section: string;
  content: string;
}

let docs: DocEntry[] | null = null;

function extractTitle(content: string, filePath: string): string {
  const titleMatch = content.match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
  if (titleMatch) {
    return titleMatch[1];
  }
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1];
  }
  const basename = filePath.split('/').pop() || filePath;
  return basename.replace(/\.mdx?$/, '');
}

function extractDescription(content: string): string {
  const descMatch = content.match(/^description:\s*['"]?(.+?)['"]?\s*$/m);
  if (descMatch) {
    return descMatch[1];
  }
  const stripped = stripFrontmatter(content);
  const firstParagraph = stripped
    .split('\n\n')
    .find(p => p.trim() && !p.startsWith('#') && !p.startsWith('<'));
  if (firstParagraph) {
    return firstParagraph.slice(0, 200).trim();
  }
  return '';
}

function extractSection(filePath: string): string {
  const parts = filePath.split('/');
  return parts[0] || 'docs';
}

function stripFrontmatter(content: string): string {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (frontmatterMatch) {
    return content.slice(frontmatterMatch[0].length);
  }
  return content;
}

function walkDir(dir: string, baseDir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath, baseDir));
    } else if (entry.endsWith('.mdx') || entry.endsWith('.md')) {
      const relativePath = fullPath.slice(baseDir.length + 1);
      files.push(relativePath);
    }
  }

  return files;
}

function loadDocs(): DocEntry[] {
  if (docs !== null) {
    return docs;
  }

  const files = walkDir(CONTENT_DIR, CONTENT_DIR);
  const entries: DocEntry[] = [];

  for (const filePath of files) {
    try {
      const fullPath = join(CONTENT_DIR, filePath);
      const rawContent = readFileSync(fullPath, 'utf-8');
      const docPath = filePath.replace(/\.mdx?$/, '');

      entries.push({
        path: docPath,
        title: extractTitle(rawContent, filePath),
        description: extractDescription(rawContent),
        section: extractSection(docPath),
        content: stripFrontmatter(rawContent),
      });
    } catch {
      continue;
    }
  }

  docs = entries;
  return docs;
}

export interface SearchResult {
  path: string;
  title: string;
  description: string;
  section: string;
  snippet: string;
  relevance: 'high' | 'medium' | 'low';
}

function countOccurrences(text: string, search: string): number {
  if (!search) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = text.indexOf(search, pos)) !== -1) {
    count++;
    pos += search.length;
  }
  return count;
}

const MAX_QUERY_LENGTH = 500;

export async function searchDocs(
  query: string,
  limit = 10
): Promise<SearchResult[]> {
  const allDocs = loadDocs();

  if (!query || query.trim().length === 0) {
    return [];
  }

  const effectiveLimit = Math.max(0, Math.min(limit, 20));
  if (effectiveLimit === 0) {
    return [];
  }

  const trimmedQuery = query.slice(0, MAX_QUERY_LENGTH).trim();
  const queryLower = trimmedQuery.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);

  const results: Array<SearchResult & { score: number }> = [];

  for (const doc of allDocs) {
    const contentLower = doc.content.toLowerCase();
    const titleLower = doc.title.toLowerCase();
    const pathLower = doc.path.toLowerCase();

    let score = 0;

    if (titleLower === queryLower) {
      score += 100;
    } else if (titleLower.includes(queryLower)) {
      score += 50;
    }

    if (pathLower.includes(queryLower.replace(/\s+/g, '-'))) {
      score += 30;
    }

    for (const word of queryWords) {
      const titleMatches = countOccurrences(titleLower, word);
      const contentMatches = countOccurrences(contentLower, word);

      score += titleMatches * 20;
      score += Math.min(contentMatches, 10) * 2;
    }

    const exactMatches = countOccurrences(contentLower, queryLower);
    score += Math.min(exactMatches, 5) * 10;

    if (score > 0) {
      const index = contentLower.indexOf(queryLower);
      let snippet = '';
      if (index !== -1) {
        const start = Math.max(0, index - 80);
        const end = Math.min(doc.content.length, index + query.length + 120);
        snippet = doc.content.slice(start, end).replace(/\n+/g, ' ').trim();
        if (start > 0) snippet = '...' + snippet;
        if (end < doc.content.length) snippet = snippet + '...';
      } else if (queryWords.length > 0) {
        for (const word of queryWords) {
          const wordIndex = contentLower.indexOf(word);
          if (wordIndex !== -1) {
            const start = Math.max(0, wordIndex - 60);
            const end = Math.min(doc.content.length, wordIndex + 140);
            snippet = doc.content.slice(start, end).replace(/\n+/g, ' ').trim();
            if (start > 0) snippet = '...' + snippet;
            if (end < doc.content.length) snippet = snippet + '...';
            break;
          }
        }
      }

      const relevance: 'high' | 'medium' | 'low' =
        score >= 50 ? 'high' : score >= 20 ? 'medium' : 'low';

      results.push({
        path: doc.path,
        title: doc.title,
        description: doc.description,
        section: doc.section,
        snippet,
        relevance,
        score,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);

  return results
    .slice(0, effectiveLimit)
    .map(({ score: _score, ...rest }) => rest);
}

export interface DocResult {
  title: string;
  path: string;
  section: string;
  content: string;
  totalPages: number;
  currentPage: number;
  truncated: boolean;
}

export async function getDoc(
  docPath: string,
  page = 1
): Promise<DocResult | null> {
  const allDocs = loadDocs();

  if (!docPath || docPath.trim().length === 0) {
    return null;
  }

  let normalizedPath = docPath.replace(/\.mdx?$/, '');
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.slice(1);
  }

  if (!normalizedPath) {
    return null;
  }

  const doc = allDocs.find(
    d => d.path === normalizedPath || d.path.endsWith('/' + normalizedPath)
  );

  if (!doc) {
    return null;
  }

  const fullContent = doc.content;
  const totalPages = Math.ceil(fullContent.length / PAGE_SIZE);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, fullContent.length);
  let content = fullContent.slice(start, end);

  if (content.length > MAX_CONTENT_LENGTH) {
    content = content.slice(0, MAX_CONTENT_LENGTH);
  }

  const truncated =
    end < fullContent.length || content.length > MAX_CONTENT_LENGTH;

  if (currentPage === 1) {
    content = `# ${doc.title}\n\n${content}`;
  }

  if (truncated && currentPage < totalPages) {
    content += `\n\n---\n[Page ${currentPage} of ${totalPages}. Use page=${currentPage + 1} for more.]`;
  }

  return {
    title: doc.title,
    path: doc.path,
    section: doc.section,
    content,
    totalPages,
    currentPage,
    truncated,
  };
}

export interface DocListItem {
  path: string;
  title: string;
  description: string;
}

export interface DocList {
  section: string;
  count: number;
  docs: DocListItem[];
}

export async function listDocs(section?: string): Promise<DocList> {
  const allDocs = loadDocs();
  let filtered = allDocs;

  if (section) {
    filtered = allDocs.filter(
      d => d.section === section || d.path.startsWith(section)
    );
  }

  return {
    section: section || 'all',
    count: filtered.length,
    docs: filtered.map(({ path, title, description }) => ({
      path,
      title,
      description,
    })),
  };
}
