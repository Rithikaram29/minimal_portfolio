import { site } from '../../src/data/portfolio.js'

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id',
  'Access-Control-Expose-Headers': 'Content-Type',
}

// Content is static between deploys, so let the edge cache it.
const CACHE = 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'

export function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body, null, 2) + '\n', {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': status === 200 ? CACHE : 'no-store',
      ...CORS,
      ...extra,
    },
  })
}

export function text(body: string, contentType = 'text/plain; charset=utf-8') {
  return new Response(body, { headers: { 'Content-Type': contentType, 'Cache-Control': CACHE, ...CORS } })
}

export function error(status: number, code: string, message: string, extra: Record<string, string> = {}) {
  return json({ error: { code, message } }, status, extra)
}

export const preflight = () => new Response(null, { status: 204, headers: { ...CORS, 'Access-Control-Max-Age': '86400' } })

/** Public origin of this deployment, so links stay correct on previews and custom domains. */
export function originOf(req: Request) {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (!host) return site.url
  const proto = req.headers.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}
