import { useEffect, useRef } from "react"
import { Experience } from "./subComponents/experience"
import { HeroAbout } from "./subComponents/heroabout"
import { Projects } from "./subComponents/projects"
import { Skills } from "./subComponents/skills"
import { Contact } from "./subComponents/contact"
import { Contributions } from "./subComponents/contributions"

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8">
    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{title}</p>
    {subtitle && <p className="mt-2 text-sm text-(--text-tertiary)">{subtitle}</p>}
    <div className="mt-4 h-px w-full bg-linear-to-r from-accent/30 via-(--border-primary) to-transparent" />
  </div>
)

export const BodyComponent = () => {
  const mainRef = useRef<HTMLElement>(null)

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
      { threshold: 0.08, root: main }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <main ref={mainRef} className="w-full bg-(--bg-body) text-(--text-primary) transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <div className="space-y-8 md:space-y-12">

            {/* Hero / About */}
            <section id="about" className="fade-in-section scroll-mt-28 rounded-[28px] border border-(--border-primary) bg-linear-to-br from-(--bg-secondary) via-(--bg-secondary) to-(--bg-tertiary) p-6 shadow-[var(--shadow-soft)] md:p-10">
              <HeroAbout />
            </section>

            {/* Projects — featured first */}
            <section id="projects" className="fade-in-section scroll-mt-28 rounded-[24px] border border-(--border-primary) bg-(--bg-secondary) p-6 shadow-[var(--shadow-card)] md:p-8">
              <SectionHeader title="Projects" subtitle="Selected engineering work" />
              <Projects />
            </section>

            {/* Experience */}
            <section id="experience" className="fade-in-section scroll-mt-28 rounded-[24px] border border-(--border-primary) bg-(--bg-secondary) p-6 shadow-[var(--shadow-card)] md:p-8">
              <SectionHeader title="Experience" />
              <Experience />
            </section>

            {/* Skills */}
            <section id="skills" className="fade-in-section scroll-mt-28 rounded-[24px] border border-(--border-primary) bg-(--bg-secondary) p-6 shadow-[var(--shadow-card)] md:p-8">
              <SectionHeader title="Technical Skills" />
              <Skills />
            </section>

            {/* Contributions */}
            <section id="contributions" className="fade-in-section scroll-mt-28 rounded-[24px] border border-(--border-primary) bg-(--bg-secondary) p-6 shadow-[var(--shadow-card)] md:p-8">
              <SectionHeader title="Contributions" subtitle="GitHub & LeetCode activity" />
              <Contributions />
            </section>

            {/* Contact */}
            <section id="contact" className="fade-in-section scroll-mt-28 rounded-[24px] border border-(--border-primary) bg-(--bg-secondary) p-6 shadow-[var(--shadow-card)] md:p-8">
              <SectionHeader title="Get in Touch" />
              <Contact />
            </section>
        </div>
      </div>
    </main>
  )
}
