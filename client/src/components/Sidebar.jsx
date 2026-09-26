import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "grid", to: "/workflow" },
  { label: "Projects", icon: "folder", to: "/projects" },
  { label: "Brand Kits", icon: "sparkle", to: "/brand-kits" },
  { label: "Templates", icon: "layout", to: "/templates" },
  { label: "Community", icon: "users", to: "/community" },
];

function NavIcon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case "layout":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
          <circle cx="17" cy="8" r="2.5" />
          <path d="M22 20c0-2.6-2-4.8-5-5.6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col overflow-y-auto rounded-2xl border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] px-4 py-4 text-[var(--sidebar-text)] shadow-sm">
      <div className="flex items-center gap-2 px-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-sm font-bold text-white">
          B
        </span>
        <span className="text-lg font-semibold text-white">Brandloom</span>
      </div>

      <Link
        to="/workflow"
        style={{ backgroundImage: "var(--btn-gradient)" }}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_18px_-6px_rgba(124,58,237,0.6)] transition-opacity hover:opacity-90"
      >
        + New Project
      </Link>

      <nav className="mt-5 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.to === "/workflow"
              ? location.pathname.startsWith("/workflow")
              : location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors " +
                (isActive
                  ? "bg-white/10 text-white"
                  : "text-[var(--sidebar-text-soft)] hover:bg-white/5 hover:text-white")
              }
            >
              <NavIcon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="rounded-2xl border border-[var(--sidebar-border)] bg-white/5 p-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-sm">
          👑
        </span>
        <p className="mt-3 text-sm font-semibold leading-snug text-white">
          Turn ideas into powerful brands.
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--sidebar-text-soft)]">
          AI-powered branding for founders, creators and communities.
        </p>
        <Link
          to="/templates"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-amber-400/50 px-3 py-2 text-xs font-medium text-white transition-colors hover:border-amber-300"
        >
          Explore Templates
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-3 flex shrink-0 items-center justify-between border-t border-[var(--sidebar-border)] pt-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
            G
          </span>
          <div>
            <p className="text-sm font-medium leading-tight text-white">Guest</p>
            <p className="text-xs leading-tight text-[var(--sidebar-text-soft)]">Free Plan</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}