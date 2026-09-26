import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "grid" },
  { label: "Projects", icon: "folder" },
  { label: "Brand Kits", icon: "sparkle" },
  { label: "Templates", icon: "layout" },
  { label: "Community", icon: "users" },
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
  const isWorkflowActive = location.pathname.startsWith("/workflow");

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--sidebar-bg)] px-4 py-6">
      <div className="flex items-center gap-2 px-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-sm font-bold text-white">
          B
        </span>
        <span className="text-lg font-semibold text-[var(--text)]">Brandloom</span>
      </div>

      <Link
        to="/workflow"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        + New Project
      </Link>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.label === "Dashboard" && isWorkflowActive;
          return (
            <button
              key={item.label}
              type="button"
              disabled
              title="Coming soon"
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm cursor-not-allowed " +
                (isActive
                  ? "bg-[var(--surface-2)] text-[var(--text)]"
                  : "text-[var(--text-soft)] opacity-70")
              }
            >
              <NavIcon name={item.icon} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-2)] text-xs font-semibold text-[var(--text)]">
            G
          </span>
          <div>
            <p className="text-sm font-medium leading-tight text-[var(--text)]">Guest</p>
            <p className="text-xs leading-tight text-[var(--text-soft)]">Free Plan</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}