import { experience, profile, projects, site, skillCategories } from './portfolio.ts'

const personId = `${site.url}/#person`
const siteId = `${site.url}/#website`
const orgId = (name: string) => `${site.url}/#org-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

const current = experience.find((e) => e.end === null) ?? experience[0]
const past = experience.filter((e) => e !== current)

const organization = (name: string, url?: string) => ({
  '@type': 'Organization',
  '@id': orgId(name),
  name,
  ...(url && { url }),
})

const projectNode = (p: (typeof projects)[number]) => {
  const isMobileApp = p.urlKind === 'store'
  return {
    '@type': isMobileApp ? 'MobileApplication' : 'SoftwareSourceCode',
    '@id': `${site.url}/agent/projects/${p.id}`,
    name: p.name,
    description: p.description,
    abstract: p.highlights.join('. '),
    genre: p.type,
    author: { '@id': personId },
    ...(p.publisher && { publisher: organization(p.publisher) }),
    ...(p.url && { url: p.url }),
    ...(p.repoUrl && { codeRepository: p.repoUrl }),
    ...(p.stack.length > 0 && { keywords: p.stack.join(', '), programmingLanguage: p.stack }),
    ...(isMobileApp && { applicationCategory: 'MobileApplication', operatingSystem: 'Android' }),
    mainEntityOfPage: `${site.url}/#projects`,
  }
}

/** Schema.org graph for the home page. Embedded in <head> at build time by scripts/prerender.js. */
export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: site.url,
        name: `${profile.name} — Portfolio`,
        description: profile.headline,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profile`,
        url: site.url,
        name: `${profile.name} — ${profile.title}`,
        isPartOf: { '@id': siteId },
        mainEntity: { '@id': personId },
        dateModified: site.updated,
        // Machine-readable alternatives to scraping this page.
        significantLink: [`${site.url}/agent`, `${site.url}/mcp`, `${site.url}/llms.txt`],
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        givenName: profile.givenName,
        familyName: profile.familyName,
        jobTitle: profile.title,
        description: profile.summary,
        url: site.url,
        image: profile.image,
        email: `mailto:${profile.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.location.city,
          addressCountry: profile.location.country,
        },
        worksFor: { '@id': orgId(current.company) },
        alumniOf: past.map((e) => ({ '@id': orgId(e.company) })),
        sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode],
        knowsAbout: skillCategories.flatMap((c) => c.skills),
        subjectOf: { '@type': 'DigitalDocument', name: 'Résumé', url: profile.resume.url, encodingFormat: 'application/pdf' },
      },
      organization(current.company, profile.currentEmployer.url),
      ...past.map((e) => organization(e.company)),
      {
        '@type': 'ItemList',
        '@id': `${site.url}/#projects`,
        name: 'Projects',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: projectNode(p),
        })),
      },
    ],
  }
}
