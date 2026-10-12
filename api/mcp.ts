import { CORS, error, json, preflight } from './_lib/http.js'
import { handleBody } from './_lib/mcp.js'

const MAX_BODY = 64 * 1024

export async function POST(req: Request) {
  const raw = await req.text()
  if (raw.length > MAX_BODY) return error(413, 'payload_too_large', 'Request body too large.')
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, 400)
  }
  const result = handleBody(body)
  if (result === null) return new Response(null, { status: 202, headers: CORS })
  return json(result, 200, { 'Cache-Control': 'no-store' })
}

// Stateless server: no SSE stream to open and no session to terminate.
const notAllowed = () => error(405, 'method_not_allowed', 'This MCP endpoint accepts POST only (JSON-RPC over Streamable HTTP).', { Allow: 'POST, OPTIONS' })
export const GET = notAllowed
export const DELETE = notAllowed
export const OPTIONS = preflight
