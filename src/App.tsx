import { useState } from 'react'
import './App.css'
import { BodyComponent } from './components/bodyComponent'
import { useTheme } from './hooks/useTheme'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <div className="relative min-h-svh bg-(--bg-primary) transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-(--border-primary) bg-(--bg-card)/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-left cursor-pointer"
            aria-label="Go to top"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Portfolio</span>
            <span className="block text-sm font-semibold text-(--text-primary)">Rithika Ramasamy</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-(--text-secondary) transition-colors hover:bg-(--surface-hover) hover:text-(--text-primary) cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/src/assets/RITHIKA_RAMASAMY_RESUME.pdf"
              download
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong md:inline-flex"
            >
              Download CV
            </a>
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border-primary) bg-(--bg-card) text-(--text-secondary) shadow-[var(--shadow-card)] backdrop-blur-md transition-all duration-200 hover:border-accent/40 hover:text-accent cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border-primary) bg-(--bg-card) text-(--text-secondary) shadow-[var(--shadow-card)] backdrop-blur-md transition-all duration-200 hover:border-accent/40 hover:text-accent cursor-pointer md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-(--border-primary) bg-(--bg-card) px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-xl px-3 py-2 text-left text-sm font-medium text-(--text-secondary) transition-colors hover:bg-(--surface-hover) hover:text-(--text-primary) cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/Rithika-Ramasamy-CV.txt"
                download
                className="mt-2 inline-flex justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                Download CV
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 right-0 top-0 h-px bg-(--border-primary)" />
      </div>
      <BodyComponent />
    </div>
  )
}

export default App
