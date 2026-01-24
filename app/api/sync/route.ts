const repos = [
  { repo: 'vercel/ai', path: 'content', key: 'ai' },
  { repo: 'honojs/website', path: 'docs', key: 'hono' },
  { repo: 'sveltejs/svelte.dev', path: 'apps/svelte.dev/content', key: 'svelte' },
  { repo: 'Effect-TS/website', path: 'content/src/content/docs', key: 'effect' },
]

async function getlatestcommit(repo: string, path: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/commits?path=${path}&per_page=1`,
    { headers: { 'User-Agent': 'kernelize' } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data[0]?.sha || null
}

async function gethashes(): Promise<Record<string, string>> {
  const res = await fetch('https://kernelize.dev/hashes.json')
  if (!res.ok) return {}
  return res.json()
}

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('unauthorized', { status: 401 })
  }

  const hashes = await gethashes()
  let changed = false

  for (const { repo, path, key } of repos) {
    const latest = await getlatestcommit(repo, path)
    if (latest && latest !== hashes[key]) {
      changed = true
      break
    }
  }

  if (!changed) {
    return Response.json({ redeployed: false })
  }

  const hook = process.env.DEPLOY_HOOK
  if (!hook) {
    return Response.json({ error: 'no deploy hook configured' }, { status: 500 })
  }

  await fetch(hook, { method: 'POST' })
  return Response.json({ redeployed: true })
}
