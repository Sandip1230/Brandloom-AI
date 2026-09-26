export default function Topbar() {
  return (
    <header className="flex items-center gap-4 px-6 pt-6 sm:px-10">
      <div className="relative flex-1 max-w-md">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-soft)]"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
        </svg>
        <input
          type="search"
          placeholder="Search projects, templates…"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2 pl-10 pr-14 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)] focus:border-[var(--accent-solid)] focus:outline-none"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-soft)]">
          Ctrl K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-soft)] transition-colors hover:border-[var(--accent-solid)] hover:text-[var(--text)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9a6 6 0 0 1 12 0c0 3.4.8 5.2 1.6 6.2H4.4C5.2 14.2 6 12.4 6 9Z" />
            <path d="M10 19a2 2 0 0 0 4 0" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)] bg-rose-500" />
        </button>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-sm font-semibold text-white">
          G
        </span>
      </div>
    </header>
  );
}