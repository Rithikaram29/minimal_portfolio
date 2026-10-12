# minimal_portfolio
minimal portfolio 

## Agent-ready

All content lives in `src/data/portfolio.ts`; edit it there and bump `site.updated`. The UI, JSON-LD, REST API, MCP server and manifest all read from it.

- `/agent` – manifest: what's available, endpoints, tools, permissions
- `/agent/{profile,experience,skills,projects,projects/:id,contact,openapi.json}` – JSON REST API
- `/mcp` – MCP server (Streamable HTTP, stateless, read-only)
- `/llms.txt` – llms.txt index
- Schema.org JSON-LD is generated into `index.html` by `scripts/prerender.js`

Tools are defined once in `api/_lib/tools.ts`; REST, MCP and the docs are derived from that list.
