import { useMemo, useState } from "react"

const DEFAULT_ABOUT =
`I'm a software engineer who genuinely loves learning and experimenting with technology. I thrive on trying new tools, breaking things, rebuilding them better, and figuring out how systems really work. My core stack is MERN, but I also work with Python — especially as I dive deeper into AI and machine learning. I enjoy "vibe coding" — rapid prototyping, testing ideas fast, and iterating quickly — while still respecting solid engineering principles. Currently, I work on payments and microservices, where precision, scalability, and reliability aren't optional. I'm drawn to challenges that push me beyond comfort, because that's where real growth happens.`

const FULL_ABOUT =
  `I'm a software engineer who genuinely loves learning and experimenting with technology 🚀. I thrive on trying new tools, breaking things, rebuilding them better, and figuring out how systems really work. My core stack is MERN, but I also work with Python 🐍 — especially as I dive deeper into AI and machine learning 🤖. I enjoy "vibe coding" — rapid prototyping, testing ideas fast, and iterating quickly — while still respecting solid engineering principles. Currently, I work on payments and microservices 💳⚙️, where precision, scalability, and reliability aren't optional. I'm drawn to challenges that push me beyond comfort, because that's where real growth happens.

Before tech, I trained as an architect 🏗️ — which means I learned to think in systems long before I wrote code. That background shapes how I approach engineering. I naturally think about structure, flow, scalability, and long-term evolution. Whether it's designing a database schema, defining access control layers, or structuring a backend service, I focus on clarity and sustainability — not just quick fixes.

I enjoy building end-to-end systems 🔄. From authentication flows and role-based access management to payment integrations and deployment pipelines, I like seeing how everything connects. I don't just want a feature to work — I want it to be predictable, extensible, and maintainable. Clean logic, thoughtful architecture, and real-world usability matter to me.

Currently, I'm strengthening my foundations in data structures 📊, system design 🧠, and AI deployment 🚀. My focus is moving beyond just writing code to understanding how scalable systems are built and operated. I'm especially interested in intelligent products — applications that learn, adapt, and automate in meaningful ways 🤝.

Long term, I'm working toward becoming a high-impact engineer who can build at scale while staying adaptable and forward-thinking. I value depth over hype, execution over noise, and continuous growth over comfort 📈. Every project is part of a larger journey — toward building systems that are not only functional, but powerful and future-ready ✨.`

export const HeroAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const paragraphs = useMemo(() => FULL_ABOUT.split("\n\n").filter(Boolean), [])
  const firstPara = paragraphs[0] ?? DEFAULT_ABOUT

  return (
    <section className="space-y-4">
      <div
        id="about-expand"
        className={[
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          isExpanded ? "max-h-[600px]" : "max-h-[160px]",
        ].join(" ")}
        aria-expanded={isExpanded}
      >
        <p className="text-base leading-relaxed text-(--text-primary)">
          {firstPara}
        </p>

        <div
          className={[
            "text-base mt-4 space-y-4 text-(--text-primary)",
            isExpanded ? "opacity-100" : "opacity-0",
            "transition-opacity duration-200",
          ].join(" ")}
        >
          {paragraphs.slice(1).map((para, idx) => (
            <p key={idx} className=" leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-(--border-primary) bg-(--bg-card) px-3 py-2 text-xs text-(--text-secondary) hover:bg-(--surface-hover) hover:text-accent transition cursor-pointer"
        aria-controls="about-expand"
        aria-label={isExpanded ? "Collapse about section" : "Expand about section"}
      >
        {isExpanded ? "Read less" : "Read more"}
        <span className="text-(--text-tertiary)">{isExpanded ? "▲" : "▼"}</span>
      </button>
    </section>
  )
}
