export const Experience = () => {
  const expArray = [
    {
      company: "Neokred",
      joiningYr: "2025",
      endingYr: "Present",
      jobDesc:
        `- Developing and scaling backend systems powering high-throughput payment infrastructure and microservices-driven financial workflows.
         - Engineered core backend components for merchant onboarding and settlement services, supporting 100+ merchants and processing $50M+ in monthly transaction volume.
         - Improved observability across microservices by integrating structured logging and monitoring, reducing production issue resolution time by 60%
        `,
      designation: "SDE1",
    },
    {
      company: "Center for vernacular architecture",
      joiningYr: "2023",
      endingYr: "2024",
      jobDesc:
        "Planned construction timeline and designs for projects, managed client requirements and payments",
      designation: "Jr.Architect",
    },
    {
      company: "Midori architects",
      joiningYr: "2023",
      endingYr: "2023",
      jobDesc:
        "Computational designs with weather and other enviromental analysis.",
      designation: "Jr.Architect",
    },
  ];

  const renderDesc = (desc: string) => {
    const lines = desc
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const isBulletList = lines.every((l) => l.startsWith("-"));

    if (isBulletList) {
      return (
        <ul className="mt-2 space-y-1 text-left">
          {lines.map((line, i) => (
            <li key={i} className="text-sm text-(--text-secondary) leading-relaxed">
              {line}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className="text-sm text-(--text-secondary) mt-2">
        {desc}
      </p>
    );
  };

  return (
    <div className="w-full h-fit rounded-2xl bg-(--bg-card) border border-(--border-primary)">
      {/* Mobile: Vertical timeline */}
      <div className="md:hidden relative px-4 py-6">
        <div className="absolute left-7 top-6 bottom-6 w-0.5 bg-linear-to-b from-accent/20 via-accent/50 to-accent/20"></div>
        <div className="space-y-6">
          {expArray.map((exp, index) => (
            <div key={index} className="relative flex gap-4 items-start">
              <div className="w-3 h-3 bg-accent rounded-full z-10 ring-4 ring-(--bg-card) mt-1.5 shrink-0"></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-(--text-primary) font-heading">
                  {exp.designation}
                </h3>
                <p className="text-sm text-(--text-tertiary)">
                  {exp.company} • {exp.joiningYr} - {exp.endingYr}
                </p>
                {renderDesc(exp.jobDesc)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Horizontal alternating timeline */}
      <div className="hidden md:block overflow-x-auto">
        <div className="relative flex gap-16 min-w-max px-8 py-16">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-accent/20 via-accent/50 to-accent/20 -translate-y-1/2"></div>

          {expArray.map((exp, index) => {
            const isTop = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col items-center w-96"
              >
                {isTop ? (
                  <>
                    <div className="mb-[50%] max-h-48 overflow-y-auto text-center px-2">
                      <h3 className="text-lg font-semibold text-(--text-primary) font-heading">
                        {exp.designation}
                      </h3>
                      <p className="text-sm text-(--text-tertiary)">
                        {exp.company} • {exp.joiningYr} - {exp.endingYr}
                      </p>
                      {renderDesc(exp.jobDesc)}
                    </div>

                    <div className="w-3 h-3 bg-accent rounded-full z-10 ring-4 ring-(--bg-card)"></div>

                    <div className="mt-10"></div>
                  </>
                ) : (
                  <>
                    <div className="mb-10"></div>

                    <div className="w-3 h-3 bg-accent rounded-full z-10 ring-4 ring-(--bg-card)"></div>

                    <div className="mt-[50%] max-h-48 overflow-y-auto text-center px-2">
                      <h3 className="text-lg font-semibold text-(--text-primary) font-heading">
                        {exp.designation}
                      </h3>
                      <p className="text-sm text-(--text-tertiary)">
                        {exp.company} • {exp.joiningYr} - {exp.endingYr}
                      </p>
                      {renderDesc(exp.jobDesc)}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
