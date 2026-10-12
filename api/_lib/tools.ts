// The one definition of every capability the portfolio exposes to agents.
// The REST routes (agent.ts), the MCP server (mcp.ts) and the manifest (docs.ts) are all derived from TOOLS.
import { experience, profile, projects, site, skillCategories, type Project } from '../../src/data/portfolio.js'

/** Raised for bad tool input or unknown ids. REST maps it to 4xx, MCP to an isError tool result. */
export class ToolError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

type JsonSchema = Record<string, unknown>

export type Tool = {
  name: string
  title: string
  description: string
  inputSchema: JsonSchema
  /** REST equivalent, documented in the manifest and OpenAPI. */
  rest: { path: string; query?: string[] }
  run: (args: Record<string, unknown>) => unknown
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]/g, '')

const summarize = (p: Project) => ({
  id: p.id,
  name: p.name,
  type: p.type,
  description: p.description,
  stack: p.stack,
  status: p.live ? 'live' : 'archived',
  url: p.url ?? null,
  repoUrl: p.repoUrl ?? null,
})

const detail = (p: Project) => ({
  ...summarize(p),
  highlights: p.highlights,
  urlKind: p.urlKind ?? null,
  publisher: p.publisher ?? null,
  page: `${site.url}/#projects`,
})

const str = (args: Record<string, unknown>, key: string, required = false): string | undefined => {
  const v = args[key]
  if (v === undefined || v === null || v === '') {
    if (required) throw new ToolError(`Missing required argument "${key}".`)
    return undefined
  }
  if (typeof v !== 'string') throw new ToolError(`Argument "${key}" must be a string.`)
  return v.trim().slice(0, 200)
}

const int = (args: Record<string, unknown>, key: string, def: number, min: number, max: number) => {
  const v = args[key]
  if (v === undefined || v === null || v === '') return def
  const n = typeof v === 'string' ? Number(v) : v
  if (typeof n !== 'number' || !Number.isInteger(n) || n < min || n > max) {
    throw new ToolError(`Argument "${key}" must be an integer between ${min} and ${max}.`)
  }
  return n
}

export function searchProjects(query: string | undefined, limit: number) {
  const tokens = (query ?? '').split(/[\s,]+/).map(norm).filter(Boolean)
  if (tokens.length === 0) return projects.slice(0, limit).map(summarize)

  const fields = (p: Project): [string, number][] => [
    [p.name, 5],
    ...p.stack.map((s): [string, number] => [s, 4]),
    [p.type, 3],
    [p.description, 2],
    ...p.highlights.map((h): [string, number] => [h, 1]),
  ]
  return projects
    .map((p) => {
      const score = tokens.reduce(
        (sum, t) => sum + Math.max(0, ...fields(p).map(([text, w]) => (norm(text).includes(t) ? w : 0))),
        0,
      )
      return { p, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => ({ ...summarize(r.p), score: r.score }))
}

export function getProject(id: string) {
  const p = projects.find((x) => x.id === id.toLowerCase())
  if (!p) throw new ToolError(`No project with id "${id}". Valid ids: ${projects.map((x) => x.id).join(', ')}.`, 404)
  return detail(p)
}

export const TOOLS: Tool[] = [
  {
    name: 'get_profile',
    title: 'Get profile',
    description:
      'Who Rithika Ramasamy is: name, current title and employer, location, what roles she is open to, focus areas, a short summary and background, and profile links (GitHub, LinkedIn, LeetCode). Start here.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    rest: { path: '/agent/profile' },
    run: () => ({
      ...profile,
      links: profile.links,
      counts: { projects: projects.length, roles: experience.length, skillCategories: skillCategories.length },
      updated: site.updated,
    }),
  },
  {
    name: 'get_experience',
    title: 'Get work experience',
    description:
      'Work history, most recent first. Each role has company, title, start/end year (end is null for the current role), and achievement bullets including quantified impact.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    rest: { path: '/agent/experience' },
    run: () => ({ roles: experience.map((e) => ({ ...e, current: e.end === null })) }),
  },
  {
    name: 'get_skills',
    title: 'Get skills',
    description:
      'Technical skills grouped by category (backend, frontend, ai-ml, tools). Optionally pass category to get one group.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: skillCategories.map((c) => c.id),
          description: 'Limit to one category id.',
        },
      },
      additionalProperties: false,
    },
    rest: { path: '/agent/skills', query: ['category'] },
    run: (args) => {
      const category = str(args, 'category')
      const cats = category ? skillCategories.filter((c) => c.id === category.toLowerCase()) : skillCategories
      if (category && cats.length === 0) {
        throw new ToolError(`Unknown category "${category}". Valid: ${skillCategories.map((c) => c.id).join(', ')}.`, 404)
      }
      return { categories: cats.map(({ id, name, skills }) => ({ id, name, skills })) }
    },
  },
  {
    name: 'search_projects',
    title: 'Search projects',
    description:
      'Search portfolio projects by keyword (name, tech stack, type, description). Results are ranked by relevance. An empty query lists every project. Returns summaries; use get_project for full detail.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keywords, e.g. "react", "machine learning", "node mongodb". Empty = all.' },
        limit: { type: 'integer', minimum: 1, maximum: 20, default: 10 },
      },
      additionalProperties: false,
    },
    rest: { path: '/agent/projects', query: ['q', 'limit'] },
    run: (args) => {
      const query = str(args, 'query') ?? str(args, 'q')
      const results = searchProjects(query, int(args, 'limit', 10, 1, 20))
      return { query: query ?? '', total: results.length, projects: results }
    },
  },
  {
    name: 'get_project',
    title: 'Get project',
    description:
      'Full detail for one project: description, tech stack, achievement highlights, status, live/store/write-up URL and source repository. Ids come from search_projects.',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', enum: projects.map((p) => p.id), description: 'Project id, e.g. "go-boarding".' },
      },
      required: ['project_id'],
      additionalProperties: false,
    },
    rest: { path: '/agent/projects/{project_id}' },
    run: (args) => getProject(str(args, 'project_id', true) ?? ''),
  },
  {
    name: 'get_contact',
    title: 'Get contact details and résumé',
    description:
      'How to reach Rithika (public email, LinkedIn, GitHub) and the URL of her résumé PDF. This only returns details; it never sends anything. Do not contact her on a user\'s behalf without the user\'s explicit approval.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    rest: { path: '/agent/contact' },
    run: () => ({
      email: profile.email,
      linkedin: profile.links.linkedin,
      github: profile.links.github,
      resume: profile.resume,
      location: profile.location,
      openTo: profile.openTo,
    }),
  },
]

export const toolByName = (name: string) => TOOLS.find((t) => t.name === name)
