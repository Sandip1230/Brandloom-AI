export default function ConsistencyChecker({ findings = [], consistent = false }) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
        <span
          className={
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold " +
            (consistent ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500")
          }
        >
          {consistent ? "✓" : findings.length}
        </span>
        <div>
          <p className="text-sm font-medium text-[var(--text)]">
            {consistent ? "Looks consistent" : `${findings.length} issue${findings.length === 1 ? "" : "s"} found`}
          </p>
          <p className="text-xs text-[var(--text-soft)]">Clichés, contradictions and audience fit</p>
        </div>
      </div>

      {findings.length > 0 && (
        <ul className="mt-4 space-y-2">
          {findings.map((finding, index) => (
            <li
              key={index}
              className="flex gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)]"
            >
              <span className="text-[var(--accent-solid)]">—</span>
              {finding}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}