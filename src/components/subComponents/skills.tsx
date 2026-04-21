export const Skills = () => {
  const skillSections = [
    {
      title: "Backend & Infrastructure",
      subtitle: "Scalable Services",
      skills: ["Node.js", "TypeScript", "Express", "Microservices", "PostgreSQL", "MongoDB", "Redis", "Kafka", "GraphQL"],
    },
    {
      title: "Frontend Engineering",
      subtitle: "Interactive Systems",
      skills: ["React", "Next.js", "Tailwind CSS", "State Management", "Component Architecture", "Responsive Design"],
    },
    {
      title: "AI & Machine Learning",
      subtitle: "Applied Intelligence",
      skills: ["Python", "YOLOv8", "LLM Integrations", "RAG Workflows", "Prompt Engineering", "Agentic Flows"],
    },
    {
      title: "Tools & Practices",
      subtitle: "Engineering Craft",
      skills: ["System Design", "API Design", "Supabase", "Git", "Docker", "Vercel", "Structured Logging"],
    },
  ]

  return (
    <section className="w-full">
      <div className="grid gap-4 md:grid-cols-2">
        {skillSections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-(--border-primary) bg-(--bg-secondary) p-5 shadow-[var(--shadow-card)]"
          >
            <div className="mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {section.subtitle}
              </p>
              <h3 className="mt-1 text-base font-semibold text-(--text-primary) font-heading">
                {section.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {section.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-(--border-primary) bg-(--bg-card) px-2.5 py-1 text-xs font-medium text-(--text-secondary)"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
