import { useEffect, useState } from "react";
import dp from "../assets/dp.jpg";

const navItems = [
  {
    id: "about",
    label: "About",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4V6z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
  },
];

type MainAboutProps = {
  mobileOpen?: boolean
  onClose?: () => void
}

export const MainAbout = ({ mobileOpen = false, onClose }: MainAboutProps) => {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;

    const handleScroll = () => {
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(navItems[i].id);
          break;
        }
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const scrollContainer = document.querySelector("main");
    if (el && scrollContainer) {
      const top = el.offsetTop - scrollContainer.offsetTop;
      scrollContainer.scrollTo({ top, behavior: "smooth" });
    }
  };

  const mainStack = [
    { name: "MERN" },
    { name: "TypeScript" },
    { name: "PostgreSQL" },
    { name: "Supabase" },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-[280px] sm:w-[320px] md:relative md:w-1/4 md:z-auto bg-(--bg-secondary) text-(--text-primary) border-r border-(--border-primary) h-svh overflow-y-auto overflow-x-hidden transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
      {/* Floating nav icons */}
      <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            title={item.label}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              active === item.id
                ? "bg-accent text-white shadow-md shadow-accent/25 scale-110"
                : "bg-(--bg-tertiary) text-(--text-tertiary) hover:bg-(--surface-hover) hover:text-(--text-primary)"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <div className="px-6 sm:px-8 md:px-12 lg:px-16 py-8 flex flex-col gap-6 text-center">
        {/* Profile image */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-accent/30 shadow-lg shadow-accent/10 transition-all duration-500 hover:border-accent/60 hover:shadow-accent/20"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            <img
              src={dp}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Accent glow line */}
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-accent to-transparent animate-glow-line" />

          <div className="leading-tight">
            <p className="text-2xl font-bold tracking-tight text-(--text-primary)">Rithika</p>
            <p className="text-2xl font-bold tracking-tight text-(--text-primary)">Ramasamy</p>
            <p className="text-sm font-medium text-accent mt-1">AI & Full Stack</p>
            <div className="mt-1 flex items-center justify-center gap-2 text-sm text-(--text-tertiary)">
              <span className="inline-flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-(--text-tertiary)"
                >
                  <path
                    d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Bengaluru | Remote</span>
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-accent">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-medium">Open to Work</span>
          </div>

          {/* Main stack widgets */}
          <div className="w-full">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wide text-(--text-tertiary) uppercase">
                Main Stack
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {mainStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col justify-between rounded-md border border-(--border-primary) bg-(--bg-card) py-1.5 text-xs text-(--text-secondary) shadow-sm hover:shadow-md hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="font-semibold text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile section navigation */}
        <nav className="md:hidden border-t border-(--border-primary) pt-3">
          <p className="text-xs font-semibold tracking-wide text-(--text-tertiary) uppercase mb-2">Sections</p>
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollTo(item.id); onClose?.(); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  active === item.id
                    ? "bg-accent text-white"
                    : "bg-(--bg-tertiary) text-(--text-secondary) hover:bg-(--surface-hover)"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Links */}
        <nav className="pt-1 border-t border-(--border-primary)">
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <a
                href="https://www.linkedin.com/in/rithika-r-0b0526213/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-(--surface-hover) transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-(--bg-tertiary) inline-flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-(--text-secondary)"
                  >
                    <path
                      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11a4 4 0 100-8 4 4 0 000 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-medium text-(--text-primary)">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Rithikaram29"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-(--surface-hover) transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-(--bg-card) border border-(--border-primary) inline-flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-(--text-primary)"
                  >
                    <path
                      d="M4 4h16v16H4V4z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 9h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-semibold text-(--text-primary)">Github</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Quick contact */}
        <div className=" border-t border-(--border-primary) flex flex-col gap-1 text-sm">
          <a
            href="mailto:rithikaramasamy29@gmail.com"
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-(--surface-hover) transition-colors text-(--text-secondary) hover:text-accent"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16v12H4V6z" />
              <path d="M4 7l8 6 8-6" />
            </svg>
            <span className="truncate">rithikaramasamy29@gmail.com</span>
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-(--surface-hover) transition-colors text-(--text-secondary) hover:text-accent"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span>+91 98765 43210</span>
          </a>
        </div>

      </div>
    </aside>
  )
}
