import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] p-3 text-[var(--text)] sm:p-4">
      <div className="page-bg">
        <span className="streak" style={{ top: "22%", left: "-5%", transform: "rotate(-8deg)" }} />
        <span className="streak" style={{ top: "34%", left: "-2%", transform: "rotate(-4deg)" }} />
      </div>
      <div className="relative z-10 flex min-h-[calc(100vh-1.5rem)] gap-4 sm:min-h-[calc(100vh-2rem)]">
        <Sidebar />
        <div className="app-glow relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 shadow-sm backdrop-blur-sm">
          <Topbar />
          <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}