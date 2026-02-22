import { useState } from 'react'
const goBoardVideo = new URL('../../assets/go-board.mp4', import.meta.url).href
const sugarCosmeticsVideo = new URL('../../assets/sugar-cosmetics.mp4', import.meta.url).href
const eleven11Video = new URL('../../assets/grok-video-f050df5b-dafb-4b03-9e54-1672f83fd92a.mp4', import.meta.url).href
const grocerVideo = new URL('../../assets/grocer.mp4', import.meta.url).href

type Project = {
  name: string
  image: string
  description?: string
  problem?: string
  approach?: string
  stack?: string[]
  liveStatus?: boolean
  link?: string
  githubLink?: string,
  fullDetailHtml?:string
}

export const Projects = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const projectsArr: Project[] = [
    {
      name: 'Go Boarding',
      image: goBoardVideo,
      description: 'Dual-portal bus reservation system with operator controls and a smooth customer booking experience.',
      liveStatus: true,
      link: 'https://go-boarding-bus-app-yfk7.vercel.app/',
      githubLink: 'https://github.com/Rithikaram29/go-boarding-bus-app',
      fullDetailHtml:''
    },
    {
      name: 'Sugar Cosmetics - Replics',
      image: sugarCosmeticsVideo,
      description: 'Developed a React-based replica of the SUGAR Cosmetics landing page with dynamic product rendering, state-driven cart management, and add-to-cart functionality.',
      liveStatus: false,
      link: 'https://sugar-cosmetics-replica-8w5sh1xx6-rithikaram29s-projects.vercel.app/',
      githubLink: 'https://github.com/Rithikaram29/sugar-cosmetics-replica',
    },
    {
      name: 'Eleven11 App',
      image: eleven11Video,
      description: 'Short description',
      liveStatus: true,
      link: 'https://play.google.com/store/apps/details?id=com.eleven11studios.eleven11',
    },
    {
      name: 'Grocery Detection',
      image: grocerVideo,
      description: 'Built an MVP that detects groceries, learns from user-drawn corrections, and stores everything for retraining — YOLOv8 + Supabase + a little AI chaos',
      liveStatus: true,
      githubLink:"https://github.com/Rithikaram29/indian-grocery-detection",
      link: 'https://www.linkedin.com/posts/rithika-r-0b0526213_machinelearning-learninginpublic-yolov8-ugcPost-7364238199696576512-KSa3?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYBNwQB5gY6IASKuv1tr2bDwdC8DP3ap7E',
    },
  ]

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projectsArr.map((p, index) => {
          const hasLive = Boolean(p.link && p.link.trim().length > 0)
          const hasGithub = Boolean(p.githubLink && p.githubLink.trim().length > 0)
          const mediaSrc = p.image
          const isActive = activeCard === index

          return (
            <article
              key={`${p.name}-${index}`}
              className="group relative overflow-hidden rounded-2xl border border-(--border-primary) bg-(--bg-card) hover:shadow-lg hover:shadow-accent-blue/5 hover:-translate-y-1 transition-all duration-300"
              onClick={() => setActiveCard(isActive ? null : index)}
            >
              <div className="relative w-full aspect-[4/3]">
                <video
                  src={mediaSrc}
                  className={`h-full w-full object-cover transition duration-300 group-hover:blur-sm group-hover:scale-[1.02] ${isActive ? 'blur-sm scale-[1.02]' : ''}`}
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  onError={(e) => {
                    const el = e.currentTarget
                    console.error('Video failed to load:', {
                      src: mediaSrc,
                      currentSrc: el.currentSrc,
                      networkState: el.networkState,
                      readyState: el.readyState,
                      error: el.error,
                    })
                  }}
                  onMouseEnter={(e) => e.currentTarget.pause()}
                  onMouseLeave={(e) => e.currentTarget.play()}
                />

                {/* Overlay — hover on desktop, tap on mobile */}
                <div className={`absolute inset-0 flex items-end p-3 sm:p-5 transition duration-300 ${isActive ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}>
                  <div className="w-full rounded-xl bg-(--bg-primary)/85 backdrop-blur-md p-4 border border-(--border-primary)">
                    <h3 className="text-lg font-semibold text-(--text-primary) font-heading">{p.name}</h3>

                    {p.description ? (
                      <p className="mt-1 text-sm text-(--text-secondary) line-clamp-2">{p.description}</p>
                    ) : null}

                    {p.problem && (
                      <div className="mt-2">
                        <span className="text-[10px] font-semibold text-accent-coral uppercase tracking-wide">Problem</span>
                        <p className="text-xs text-(--text-secondary) mt-0.5">{p.problem}</p>
                      </div>
                    )}

                    {p.stack && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.stack.map(t => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent">{t}</span>
                        ))}
                      </div>
                    )}

                    {(hasLive || hasGithub) ? (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {hasLive ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-accent-coral/15 border border-accent-coral/30 px-3 py-1.5 text-sm font-medium text-accent-coral hover:bg-accent-coral/25 transition-colors"
                          >
                            Live
                          </a>
                        ) : null}

                        {hasGithub ? (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-accent-blue/15 border border-accent-blue/30 px-3 py-1.5 text-sm font-medium text-accent-blue hover:bg-accent-blue/25 transition-colors"
                          >
                            GitHub
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
