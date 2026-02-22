export const Skills = () => {
  const skillSections = [
    {
      title: "Backend Architecture",
      subtitle: "Scalable Services",
      skills: [
        "Node.js",
        "TypeScript",
        "Microservices",
        "Kafka",
        "Redis",
        "GraphQL",
      ],
    },
    {
      title: "AI Engineering",
      subtitle: "Applied Intelligence",
      skills: [
        "LLM Integrations",
        "RAG Workflows",
        "Prompt Systems",
        "Agentic Flows",
        "Python",
      ],
    },
    {
      title: "Frontend Engineering",
      subtitle: "Interactive Systems",
      skills: [
        "React & Next.js",
        "State Management",
        "Component Architecture",
        "Responsive Design",
        "Performance Optimization",
      ],
    },
    {
      title: "Product Execution",
      subtitle: "End-to-End Build",
      skills: ["Next.js", "React", "PostgreSQL", "API Design", "System Design"],
    },
  ];

  return (
    <section className="w-full py-4">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {skillSections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-(--border-primary) bg-(--bg-card) p-6 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-200"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-(--text-primary) font-heading">
                {section.title}
              </h3>
              <p className="text-sm text-(--text-tertiary)">
                {section.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {section.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-(--bg-tertiary) text-(--text-secondary) hover:bg-accent/10 hover:text-accent transition-colors duration-150"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
