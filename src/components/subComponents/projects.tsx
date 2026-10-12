import goBoardVideo from '../../assets/go-board.mp4'
import sugarCosmeticsVideo from '../../assets/sugar-cosmetics.mp4'
import eleven11Video from '../../assets/grok-video-f050df5b-dafb-4b03-9e54-1672f83fd92a.mp4'
import grocerVideo from '../../assets/grocer.mp4'

import { projects } from '../../data/portfolio.ts'

const videos: Record<string, string> = {
  'go-boarding': goBoardVideo,
  'sugar-cosmetics-replica': sugarCosmeticsVideo,
  'indian-grocery-detection': grocerVideo,
  'eleven11-app': eleven11Video,
}

const projectsArr = projects.map((p) => ({
  name: p.name,
  video: videos[p.id],
  description: p.description,
  stack: p.stack.length > 0 ? p.stack : undefined,
  bullets: p.highlights,
  liveStatus: p.live,
  link: p.url,
  githubLink: p.repoUrl,
}))

export const Projects = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projectsArr.map((p, index) => {
          const hasLive = Boolean(p.link?.trim())
          const hasGithub = Boolean(p.githubLink?.trim())

          return (
            <article
              key={`${p.name}-${index}`}
              className="flex flex-col overflow-hidden rounded-xl border border-(--border-primary) bg-(--bg-secondary) shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft)]"
            >
              {/* Video thumbnail */}
              <div className="relative w-full aspect-[16/8.5] overflow-hidden bg-(--bg-tertiary)">
                <video
                  src={p.video}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
                <span className={`absolute right-3 top-3 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                  p.liveStatus
                    ? 'border-accent/25 bg-accent/12 text-accent'
                    : 'border-(--border-primary) bg-(--bg-card)/80 text-(--text-tertiary)'
                }`}>
                  {p.liveStatus ? 'Live' : 'Archive'}
                </span>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col gap-3 p-4">
                {/* Name + description */}
                <div>
                  <h3 className="text-base font-bold leading-snug text-(--text-primary) font-heading">{p.name}</h3>
                  <p className="mt-1 text-sm leading-5.5 text-(--text-secondary)">{p.description}</p>
                </div>

                {/* Tech stack */}
                {p.stack && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map(t => (
                      <span
                        key={t}
                        className="rounded-md border border-(--border-primary) bg-(--bg-card) px-2 py-1 text-[11px] font-medium text-(--text-secondary)"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Impact bullets */}
                {p.bullets && (
                  <ul className="space-y-1.5">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-5.5 text-(--text-secondary)">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Links */}
                {(hasLive || hasGithub) && (
                  <div className="mt-auto flex flex-wrap gap-2 border-t border-(--border-primary) pt-2">
                    {hasLive && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/8 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/14"
                      >
                        View Live
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-(--border-primary) bg-(--bg-card) px-3 py-1.5 text-xs font-semibold text-(--text-primary) transition-colors hover:bg-(--surface-hover)"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
