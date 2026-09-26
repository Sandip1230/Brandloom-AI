import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard" },
  { label: "Projects" },
  { label: "Brand Kits" },
  { label: "Templates" },
  { label: "Community" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-paper/10 bg-ink px-5 py-6 md:flex">
      <Link to="/" className="font-display text-lg tracking-tight text-paper">
        Brandloom
      </Link>

      <button
        type="button"
        className="mt-6 w-full border border-gold/40 px-4 py-2 text-left text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
      >
        + New Project
      </button>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <span
            key={item.label}
            className="cursor-default px-2 py-2 text-sm text-paper/45"
            title="Coming soon"
          >
            {item.label}
          </span>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 border-t border-paper/10 pt-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet/30 font-mono text-xs text-paper">
          BL
        </span>
        <div className="leading-tight">
          <p className="text-sm text-paper">Builder</p>
          <p className="font-mono text-[11px] text-paper/40">Local session</p>
        </div>
      </div>
    </aside>
  );
}