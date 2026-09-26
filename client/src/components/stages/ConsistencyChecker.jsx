export default function ConsistencyChecker({ score = 0, checks = [], findings = [] }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#EFEAE01A" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#B8863B"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <p className="-mt-20 font-display text-3xl text-paper">{score}</p>
        <p className="mt-[3.25rem] font-mono text-xs text-paper/45">/ 100</p>
        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-paper/40">Brand Score</p>
      </div>

      <div className="space-y-3">
        {checks.map((check, index) => (
          <div key={`${check.label}-${index}`} className="flex items-start gap-3 border border-paper/15 bg-ink px-4 py-3">
            <span className={"mt-0.5 text-lg " + (check.passed ? "text-gold" : "text-paper/40")}>
              {check.passed ? "✓" : "○"}
            </span>
            <div>
              <p className="text-sm text-paper">{check.label}</p>
              <p className="mt-0.5 text-xs text-paper/55">{check.note}</p>
            </div>
          </div>
        ))}

        {findings.length > 0 && (
          <div className="border border-paper/15 bg-ink px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">
              Improvement Suggestions
            </span>
            <ul className="mt-2 space-y-1">
              {findings.map((finding, index) => (
                <li key={`${finding}-${index}`} className="text-sm text-paper/75">
                  • {finding}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}