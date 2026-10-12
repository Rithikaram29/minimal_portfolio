// Minimal stateless MCP server (Streamable HTTP transport, JSON responses only).
// Hand-rolled on purpose: it is read-only, needs no sessions or streaming, and avoids shipping an SDK.
import { profile } from '../../src/data/portfolio.js'
import { TOOLS, ToolError, toolByName } from './tools.js'

export const PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']

export const SERVER_INFO = { name: 'rithika-portfolio', title: `${profile.name} — Portfolio`, version: '1.0.0' }

export const INSTRUCTIONS =
  `Read-only access to the public portfolio of ${profile.name}, ${profile.title} (${profile.location.city}). ` +
  'No authentication. Start with get_profile; use search_projects then get_project for project detail. ' +
  'All data is public. Tools never send messages or change anything.'

type Json = Record<string, unknown>
type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Json }

const ok = (id: Rpc['id'], result: unknown) => ({ jsonrpc: '2.0', id: id ?? null, result })
const fail = (id: Rpc['id'], code: number, message: string) => ({ jsonrpc: '2.0', id: id ?? null, error: { code, message } })

function handle(msg: Rpc): Json | null {
  if (!msg || typeof msg !== 'object' || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') {
    return fail(msg?.id, -32600, 'Invalid Request')
  }
  const isNotification = msg.id === undefined
  const params = (msg.params ?? {}) as Json

  switch (msg.method) {
    case 'initialize': {
      const requested = typeof params.protocolVersion === 'string' ? params.protocolVersion : ''
      return ok(msg.id, {
        protocolVersion: PROTOCOL_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSIONS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      })
    }
    case 'ping':
      return ok(msg.id, {})
    case 'tools/list':
      return ok(msg.id, {
        tools: TOOLS.map(({ name, title, description, inputSchema }) => ({
          name,
          title,
          description,
          inputSchema,
          annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
        })),
      })
    case 'tools/call': {
      const tool = typeof params.name === 'string' ? toolByName(params.name) : undefined
      if (!tool) return fail(msg.id, -32602, `Unknown tool: ${String(params.name)}`)
      const args = params.arguments && typeof params.arguments === 'object' ? (params.arguments as Json) : {}
      try {
        const data = tool.run(args)
        return ok(msg.id, { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }], structuredContent: data })
      } catch (e) {
        if (!(e instanceof ToolError)) throw e
        // Tool-level failures are reported in the result so the model can read and recover from them.
        return ok(msg.id, { content: [{ type: 'text', text: e.message }], isError: true })
      }
    }
    default:
      // Notifications (e.g. notifications/initialized) get no response.
      return isNotification ? null : fail(msg.id, -32601, `Method not found: ${msg.method}`)
  }
}

/** Returns the JSON-RPC response body, or null when the input was only notifications/responses. */
export function handleBody(body: unknown): Json | Json[] | null {
  if (Array.isArray(body)) {
    if (body.length === 0 || body.length > 20) return fail(null, -32600, 'Invalid batch size')
    const out = body.map((m) => safe(m)).filter((r): r is Json => r !== null)
    return out.length ? out : null
  }
  return safe(body as Rpc)
}

function safe(msg: Rpc): Json | null {
  // A message with no method but an id is a client response to a server request; we never send any.
  if (msg && typeof msg === 'object' && msg.method === undefined && msg.id !== undefined) return null
  try {
    return handle(msg)
  } catch {
    return fail(msg?.id, -32603, 'Internal error')
  }
}
