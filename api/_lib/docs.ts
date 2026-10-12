// Machine-readable instructions for agents: the manifest (/agent), OpenAPI spec and llms.txt.
// Everything here is generated from TOOLS and the portfolio data, so it cannot go stale.
import { experience, profile, projects, site, skillCategories } from '../../src/data/portfolio.js'
import { INSTRUCTIONS, PROTOCOL_VERSIONS, SERVER_INFO } from './mcp.js'
import { TOOLS } from './tools.js'

export function manifest(origin: string) {
  return {
    name: SERVER_INFO.title,
    description: `Agent-ready interface to the public portfolio of ${profile.name}, ${profile.title} at ${profile.currentEmployer.name} (${profile.location.city}, ${profile.location.country}).`,
    version: SERVER_INFO.version,
    updated: site.updated,
    owner: { name: profile.name, website: site.url, email: profile.email },

    quickstart: [
      `GET ${origin}/agent/profile for a one-call overview.`,
      `GET ${origin}/agent/projects?q=<keywords> to find projects, then GET ${origin}/agent/projects/<id> for detail.`,
      `Or connect an MCP client to ${origin}/mcp and call get_profile.`,
    ],

    authentication: {
      required: false,
      note: 'Everything is public and read-only. No API key, token or login. Do not send credentials.',
    },

    permissions: {
      allowed: [
        'Read, summarise and quote any data returned by these endpoints and tools.',
        'Cache responses (they change only on deploy; see "updated").',
        'Cite this site and link to project URLs and the résumé when answering questions about Rithika.',
        'Use the data to help a user evaluate Rithika for a role or collaboration.',
      ],
      notAllowed: [
        'Presenting yourself as Rithika, or writing as her.',
        'Contacting Rithika (email, LinkedIn, etc.) on a user\'s behalf without that user\'s explicit approval in the current conversation.',
        'Inventing experience, skills or projects that are not in the returned data. If something is missing, say so.',
        'High-volume scraping. Roughly one request per second is plenty; there is no need to poll since data changes only on deploy.',
      ],
      writes: 'None. There are no write endpoints and no tool changes any state.',
    },

    data: [
      { topic: 'profile', about: 'Identity, title, employer, location, availability, summary, links', rest: '/agent/profile', mcpTool: 'get_profile' },
      { topic: 'experience', about: `${experience.length} roles with quantified achievements`, rest: '/agent/experience', mcpTool: 'get_experience' },
      { topic: 'skills', about: `${skillCategories.length} skill categories`, rest: '/agent/skills', mcpTool: 'get_skills' },
      { topic: 'projects', about: `${projects.length} projects with stack, highlights and links`, rest: '/agent/projects', mcpTool: 'search_projects / get_project' },
      { topic: 'contact', about: 'Public email, profile links and résumé PDF', rest: '/agent/contact', mcpTool: 'get_contact' },
    ],

    rest: {
      base: `${origin}/agent`,
      format: 'application/json',
      methods: ['GET'],
      cors: true,
      openapi: `${origin}/agent/openapi.json`,
      endpoints: [
        { method: 'GET', path: '/agent', description: 'This manifest.' },
        ...TOOLS.map((t) => ({
          method: 'GET',
          path: t.rest.path,
          ...(t.rest.query && { query: t.rest.query }),
          description: t.description,
          equivalentMcpTool: t.name,
        })),
        { method: 'GET', path: '/agent/openapi.json', description: 'OpenAPI 3.1 description of the REST API.' },
      ],
      errors: 'Non-2xx responses are {"error":{"code","message"}}. 404 messages list the valid ids.',
    },

    mcp: {
      url: `${origin}/mcp`,
      transport: 'Streamable HTTP, stateless: POST JSON-RPC 2.0 messages; GET/DELETE return 405. No sessions or SSE.',
      protocolVersions: PROTOCOL_VERSIONS,
      serverInfo: SERVER_INFO,
      instructions: INSTRUCTIONS,
      tools: TOOLS.map(({ name, title, description, inputSchema }) => ({ name, title, description, inputSchema, readOnly: true })),
      clientConfig: { mcpServers: { 'rithika-portfolio': { type: 'http', url: `${origin}/mcp` } } },
    },

    alsoAvailable: {
      llmsTxt: `${origin}/llms.txt`,
      structuredData: `${site.url}/ (Schema.org JSON-LD in the page <head>: WebSite, ProfilePage, Person, Organization, ItemList of projects)`,
      resumePdf: profile.resume.url,
      sitemap: `${site.url}/sitemap.xml`,
    },
  }
}

export function openapi(origin: string) {
  const idParam = { name: 'project_id', in: 'path', required: true, schema: { type: 'string', enum: projects.map((p) => p.id) } }
  const paths: Record<string, unknown> = {}
  for (const t of TOOLS) {
    const props = (t.inputSchema.properties ?? {}) as Record<string, Record<string, unknown>>
    const parameters = t.rest.path.includes('{')
      ? [idParam]
      : (t.rest.query ?? []).map((q) => {
          const src = props[q === 'q' ? 'query' : q] ?? { type: 'string' }
          return { name: q, in: 'query', required: false, schema: src }
        })
    paths[t.rest.path] = {
      get: {
        operationId: t.name,
        summary: t.title,
        description: t.description,
        parameters,
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { type: 'object' } } } },
          '404': { description: 'Unknown id or category' },
        },
      },
    }
  }
  return {
    openapi: '3.1.0',
    info: { title: SERVER_INFO.title, version: SERVER_INFO.version, description: INSTRUCTIONS },
    servers: [{ url: origin }],
    paths,
  }
}

export function llmsTxt(origin: string) {
  return `# ${profile.name}

> ${profile.title} at ${profile.currentEmployer.name}, ${profile.location.city}. ${profile.headline} Open to: ${profile.openTo.join(', ')}.

This is a personal portfolio. All data is public and read-only; no authentication is needed. Prefer the JSON API or the MCP server below over scraping the HTML. Updated ${site.updated}.

## Agent interfaces
- [Agent manifest](${origin}/agent): what is available, every endpoint and tool, and what agents may and may not do
- [MCP server](${origin}/mcp): Streamable HTTP, stateless, read-only tools: ${TOOLS.map((t) => t.name).join(', ')}
- [OpenAPI spec](${origin}/agent/openapi.json): REST API description

## Data (JSON)
${TOOLS.filter((t) => !t.rest.path.includes('{'))
  .map((t) => `- [${t.title}](${origin}${t.rest.path}): ${t.description.split('. ')[0].replace(/\.$/, '')}`)
  .join('\n')}
${projects.map((p) => `- [Project: ${p.name}](${origin}/agent/projects/${p.id}): ${p.description}`).join('\n')}

## Other
- [Everything in one file](${origin}/llms-full.txt): full text of the portfolio, for reading in a single request
- [Portfolio website](${site.url}/): human-facing page with Schema.org JSON-LD (Person, ProfilePage, Organization, projects)
- [Résumé (PDF)](${profile.resume.url})
- [GitHub](${profile.links.github})
- [LinkedIn](${profile.links.linkedin})
`
}

/** Everything in one plain-text file, for models that read a single URL and want the whole picture. */
export function llmsFullTxt(origin: string) {
  const role = (e: (typeof experience)[number]) =>
    `### ${e.title}, ${e.company} (${e.start}–${e.end ?? 'present'})\n${e.highlights.map((h) => `- ${h}`).join('\n')}`
  const project = (p: (typeof projects)[number]) =>
    [
      `### ${p.name} (${p.live ? 'live' : 'archived'}) — ${p.type}`,
      p.description,
      p.stack.length ? `Stack: ${p.stack.join(', ')}` : '',
      ...p.highlights.map((h) => `- ${h}`),
      p.url ? `Link: ${p.url}` : '',
      p.repoUrl ? `Source: ${p.repoUrl}` : '',
      `JSON: ${origin}/agent/projects/${p.id}`,
    ]
      .filter(Boolean)
      .join('\n')

  return `# ${profile.name} — full portfolio

> ${profile.title} at ${profile.currentEmployer.name}, ${profile.location.city}, ${profile.location.country}${profile.location.remote ? ' (open to remote)' : ''}. Updated ${site.updated}.

## About
${profile.summary}

${profile.background}

Open to: ${profile.openTo.join(', ')}. Focus: ${profile.focus.join(', ')}.

## Experience
${experience.map(role).join('\n\n')}

## Skills
${skillCategories.map((c) => `- ${c.name}: ${c.skills.join(', ')}`).join('\n')}

## Projects
${projects.map(project).join('\n\n')}

## Contact and links
- Email: ${profile.email}
- GitHub: ${profile.links.github}
- LinkedIn: ${profile.links.linkedin}
- LeetCode: ${profile.links.leetcode}
- Résumé (PDF): ${profile.resume.url}

## Machine-readable interfaces
- JSON API manifest: ${origin}/agent
- MCP server (read-only): ${origin}/mcp
- Short index: ${origin}/llms.txt
`
}
