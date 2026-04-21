import dp from "../../assets/dp.jpg"

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export const HeroAbout = () => {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_0.8fr_1.3fr] lg:items-center">
      <div className="order-2 space-y-3 lg:order-1">
        <div className="rounded-2xl bg-(--bg-secondary) px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-tertiary)">Open to </p>
          <div className="mt-3 space-y-1">
            <p className="text-2xl font-bold leading-tight tracking-tight text-(--text-primary) font-heading">Full-stack Developer</p>
            <p className="text-2xl font-bold leading-tight tracking-tight text-(--text-primary) font-heading">AI Roles</p>
          </div>
        </div>
        <div className="rounded-2xl bg-(--bg-secondary) px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-tertiary)">Focus</p>
          <p className="mt-2 text-sm font-medium leading-6 text-(--text-primary)">Full stack, microservices, applied AI</p>
        </div>
        <div className="rounded-2xl bg-(--bg-secondary) px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-tertiary)">Location</p>
          <p className="mt-2 text-sm font-medium leading-6 text-(--text-primary)">Bengaluru · Remote</p>
        </div>
        <div className="rounded-2xl bg-(--bg-secondary) px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-tertiary)">Current Role</p>
          <p className="mt-2 text-sm font-medium leading-6 text-(--text-primary)">SDE1, Software Engineer at Neokred</p>
        </div>
      </div>

      <div className="order-1 relative mx-auto w-full max-w-sm lg:order-2">
        <div className="absolute -inset-4 rounded-[32px] bg-linear-to-br from-accent/12 via-transparent to-accent-blue/10 blur-2xl" />
        <div className="relative overflow-hidden rounded-[28px] bg-(--bg-card) p-5 shadow-[var(--shadow-soft)]">
          <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-(--bg-tertiary)">
            <img src={dp} alt="Rithika Ramasamy" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="order-3 space-y-8">
        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Software Engineer</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-(--text-primary) font-heading sm:text-5xl md:text-[3.5rem]">
              Rithika Ramasamy
            </h1>
            <h2 className="mt-4 max-w-3xl text-xl font-semibold leading-8 text-(--text-secondary) sm:text-2xl">
              Building reliable backend systems and product-focused full-stack applications.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-(--text-secondary)">
            I build high-throughput backend systems and full-stack applications with MERN, TypeScript, and applied AI.
            Currently engineering payment infrastructure and microservices at Neokred, with a focus on reliability,
            clean architecture, and measurable product impact.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong cursor-pointer"
          >
            View Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 rounded-full border border-(--border-secondary) bg-(--bg-secondary) px-5 py-3 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--surface-hover) cursor-pointer"
          >
            Contact Me
          </button>
        </div>

        <div className="space-y-3 border-t border-(--border-primary) pt-6">
          <p className="text-sm leading-7 text-(--text-secondary)">
            Before moving fully into software, I trained as an architect. That background still shapes how I think:
            I naturally focus on structure, scale, and long-term maintainability, whether the task is backend service
            design, access control, or a data model.
          </p>
          <p className="text-sm leading-7 text-(--text-secondary)">
            I enjoy end-to-end ownership and care about systems that are predictable, extensible, and usable in the
            real world. Currently sharpening my depth in data structures, system design, and AI deployment.
          </p>
        </div>
      </div>
    </section>
  )
}
