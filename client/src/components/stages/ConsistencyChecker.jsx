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
        <ul className="mt-4 space-y-4">
          {findings.map((finding, index) => (
            <li
              key={index}
              className="rounded-xl border border-[var(--border)] p-4"
            >
              <p className="text-sm font-semibold text-[var(--text)]">{finding.issue}</p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-red-500/25 bg-red-500/5 p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-red-500">Before</span>
                  <p className="mt-1 text-sm text-[var(--text)]">{finding.before}</p>
                </div>
                <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-500">After</span>
                  <p className="mt-1 text-sm text-[var(--text)]">{finding.after}</p>
                </div>
              </div>

              {finding.rationale && (
                <p className="mt-2 text-xs italic text-[var(--text-soft)]">{finding.rationale}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}