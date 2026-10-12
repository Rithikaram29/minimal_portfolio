import { experience } from "../../data/portfolio.ts"

export const Experience = () => {
  const expArray = experience.map((e) => ({
    company: e.company,
    joiningYr: e.start,
    endingYr: e.end ?? "Present",
    jobDesc: e.highlights,
    designation: e.title,
  }))

  return (
    <div className="relative w-full">
      <div className="absolute bottom-0 left-3 top-0 w-px bg-linear-to-b from-transparent via-accent/35 to-transparent sm:left-4" />
      <div className="space-y-5">
        {expArray.map((exp, index) => (
          <div key={index} className="relative pl-10 sm:pl-12">
            <div className="absolute left-0 top-6 h-3 w-3 rounded-full bg-accent ring-4 ring-(--bg-card) sm:left-[0.2rem]" />
            <article className="rounded-xl border border-(--border-primary) bg-(--bg-secondary) p-5 shadow-[var(--shadow-card)]">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{exp.company}</p>
                  <h3 className="mt-1 text-base font-semibold text-(--text-primary) font-heading">
                    {exp.designation}
                  </h3>
                </div>
                <span className="self-start rounded-md border border-(--border-primary) bg-(--bg-card) px-2.5 py-1 text-xs font-medium text-(--text-secondary) whitespace-nowrap">
                  {exp.joiningYr} – {exp.endingYr}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {exp.jobDesc.map((line, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-(--text-secondary) leading-6">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}
