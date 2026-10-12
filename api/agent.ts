// REST API under /agent/* (see vercel.json rewrites, which pass the sub-path as ?path=).
import { llmsTxt, manifest, openapi } from './_lib/docs.js'
import { error, json, originOf, preflight, text } from './_lib/http.js'
import { TOOLS, ToolError } from './_lib/tools.js'

export function GET(req: Request) {
  const url = new URL(req.url)
  const origin = originOf(req)
  const path = (url.searchParams.get('path') ?? '').replace(/^\/+|\/+$/g, '')
  const query = Object.fromEntries(url.searchParams.entries())
  delete query.path

  if (path === '' || path === 'manifest') return json(manifest(origin))
  if (path === 'openapi.json') return json(openapi(origin))
  if (path === 'llms.txt') return text(llmsTxt(origin), 'text/markdown; charset=utf-8')

  // /agent/projects/:id -> get_project
  const [first, second, ...rest] = path.split('/')
  if (rest.length === 0) {
    const tool =
      first === 'projects' && second
        ? TOOLS.find((t) => t.name === 'get_project')
        : second === undefined
          ? TOOLS.find((t) => t.rest.path === `/agent/${first}`)
          : undefined
    if (tool) {
      try {
        const args = tool.name === 'get_project' ? { project_id: decodeURIComponent(second) } : query
        return json(tool.run(args))
      } catch (e) {
        if (e instanceof ToolError) return error(e.status, e.status === 404 ? 'not_found' : 'bad_request', e.message)
        throw e
      }
    }
  }
  return error(404, 'not_found', `Unknown endpoint /agent/${path}. See ${origin}/agent for the full list.`)
}

export const OPTIONS = preflight
