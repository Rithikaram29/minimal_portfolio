import { useState } from 'react'
import './App.css'
import { BodyComponent } from './components/bodyComponent'
import { MainAbout } from './components/mainAbout'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative flex flex-col md:flex-row w-svw h-svh overflow-hidden bg-(--bg-primary) transition-colors duration-300">
      {/* Top bar: hamburger + theme toggle (mobile only hamburger) */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden w-9 h-9 rounded-full bg-(--bg-card) border border-(--border-primary) shadow-md flex items-center justify-center text-(--text-secondary) hover:text-accent hover:border-accent/40 transition-all duration-200 cursor-pointer"
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

        {/* Theme toggle — always visible */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full bg-(--bg-card) border border-(--border-primary) shadow-md flex items-center justify-center text-(--text-secondary) hover:text-accent hover:border-accent/40 transition-all duration-200 cursor-pointer"
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
      </div>

      {/* Mobile overlay backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <MainAbout mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <BodyComponent />
    </div>
  )
}

export default App
