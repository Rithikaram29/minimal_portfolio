// Injects the server-rendered app into dist/index.html so crawlers get real content.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle in dist-ssr).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'dist/index.html')
const placeholder = '<!--app-html-->'
const jsonLdPlaceholder = '<!--jsonld-->'

const { render, renderJsonLd, renderAgentFiles } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const template = fs.readFileSync(htmlPath, 'utf-8')
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`)
}

// React hoists resource hints (e.g. the hero image preload) to the start of the output.
// They belong in <head>; left inside #root they would break hydration.
let appHtml = render()
const hoisted = appHtml.match(/^(?:<link [^>]*>)*/)[0]
appHtml = appHtml.slice(hoisted.length)

if (!template.includes(jsonLdPlaceholder)) {
  throw new Error(`prerender: ${jsonLdPlaceholder} not found in dist/index.html`)
}

const html = template
  .replace('</head>', () => `${hoisted}</head>`)
  .replace(jsonLdPlaceholder, () => renderJsonLd())
  .replace(placeholder, () => appHtml)

fs.writeFileSync(htmlPath, html)
for (const [name, content] of Object.entries(renderAgentFiles())) {
  fs.writeFileSync(path.join(root, 'dist', name), content)
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('prerender: wrote dist/index.html, llms.txt, llms-full.txt')
