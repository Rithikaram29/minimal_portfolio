export const Contact = () => {
  const contactMethods = [
    {
      label: "Email",
      value: "rithikaram293@gmail.com",
      href: "mailto:rithikaram293@gmail.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16v12H4V6z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "+91 80564 48057",
      href: "tel:+918056448057",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rithika-r",
      href: "https://www.linkedin.com/in/rithika-r-0b0526213/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/Rithikaram29",
      href: "https://github.com/Rithikaram29",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4V4z" />
          <path d="M4 9h16" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-3 rounded-[18px] border border-(--border-primary) bg-(--bg-secondary) p-4 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 sm:gap-4 sm:p-5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--bg-tertiary) text-(--text-tertiary) transition-colors group-hover:bg-accent/10 group-hover:text-accent">
              {method.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-tertiary)">{method.label}</p>
              <p className="mt-1 truncate text-sm font-medium text-(--text-primary)">{method.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 border-t border-(--border-primary) pt-6 text-center">
        <p className="text-sm text-(--text-tertiary)">
          Available for product engineering roles, collaborative builds, and consulting conversations.
        </p>
      </div>
    </section>
  );
};
