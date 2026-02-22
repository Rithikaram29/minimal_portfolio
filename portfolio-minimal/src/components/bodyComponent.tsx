import { useEffect, useRef } from "react"
import { Experience } from "./subComponents/experience"
import { HeroAbout } from "./subComponents/heroabout"
import { Projects } from "./subComponents/projects"
import { Skills } from "./subComponents/skills"
import { SmallGame } from "./subComponents/smallGame"
import { Contact } from "./subComponents/contact"

export const BodyComponent = () => {
  const mainRef = useRef<HTMLElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  // Fade-in on scroll observer
  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const sections = main.querySelectorAll('.fade-in-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, root: main }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Parallax effect on game section
  useEffect(() => {
    const main = mainRef.current
    const game = gameRef.current
    if (!main || !game) return

    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const offset = main.scrollTop * 0.3
        game.style.transform = `translateY(${offset}px)`
        ticking = false
      })
    }

    main.addEventListener('scroll', handleScroll, { passive: true })
    return () => main.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main ref={mainRef} className="w-full md:w-3/4 bg-(--bg-body) text-(--text-primary) h-svh overflow-y-auto transition-colors duration-300">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="rounded-xl overflow-hidden border border-(--border-primary)">
          {/* Game section with parallax */}
          <div className="h-40 sm:h-48 md:h-56 bg-(--bg-tertiary) flex items-center justify-center overflow-hidden relative">
            <div ref={gameRef} className="w-full h-full will-change-transform">
              <SmallGame />
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 space-y-12 md:space-y-16 bg-(--bg-card)">
            <div id="about" className="fade-in-section">
              <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary) font-heading">Hi, I am Rithika!</h2>
              <div className="mt-2 h-0.5 w-12 bg-accent-blue rounded-full" />
              <div className="mt-6">
                <HeroAbout />
              </div>
            </div>

            <div id="skills" className="fade-in-section">
              <h2 className="text-xl font-semibold tracking-tight uppercase text-(--text-primary) font-heading">Technical Expertise</h2>
              <div className="mt-2 h-0.5 w-12 bg-accent-blue rounded-full" />
              <div className="mt-6">
                <Skills />
              </div>
            </div>

            <div id="experience" className="fade-in-section">
              <h2 className="text-xl font-semibold tracking-tight uppercase text-(--text-primary) font-heading">Experience</h2>
              <div className="mt-2 h-0.5 w-12 bg-accent-blue rounded-full" />
              <div className="mt-6">
                <Experience />
              </div>
            </div>

            <div id="projects" className="fade-in-section">
              <h2 className="text-xl font-semibold tracking-tight uppercase text-(--text-primary) font-heading">Projects</h2>
              <div className="mt-2 h-0.5 w-12 bg-accent-blue rounded-full" />
              <div className="mt-6">
                <Projects />
              </div>
            </div>

            <div id="contact" className="fade-in-section">
              <h2 className="text-xl font-semibold tracking-tight uppercase text-(--text-primary) font-heading">Get in Touch</h2>
              <div className="mt-2 h-0.5 w-12 bg-accent-coral rounded-full" />
              <div className="mt-6">
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
