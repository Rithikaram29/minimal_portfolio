import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { buildJsonLd } from './data/jsonld.ts'
import { llmsFullTxt, llmsTxt } from '../api/_lib/docs.ts'
import { site } from './data/portfolio.ts'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export function renderJsonLd() {
  // "<" is escaped so no field value can ever close the script tag.
  const json = JSON.stringify(buildJsonLd(), null, 2).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">\n${json}\n</script>`
}

// Static agent files written into dist/ by scripts/prerender.js.
export function renderAgentFiles() {
  return { 'llms.txt': llmsTxt(site.url), 'llms-full.txt': llmsFullTxt(site.url) }
}
