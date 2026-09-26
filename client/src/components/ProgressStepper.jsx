import { STAGES } from "../lib/stages.js";

export default function ProgressStepper({ currentStage, completedStages = [], onSelect }) {
  const activeIndex = STAGES.findIndex((stage) => stage.key === currentStage);

  return (
    <nav aria-label="Brand pipeline progress" className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-1">
        {STAGES.map((stage, index) => {
          const isDone = completedStages.includes(stage.key);
          const isActive = index === activeIndex;
          const isReachable = isDone || isActive || index === 0;

          return (
            <li key={stage.key} className="flex items-center">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => onSelect?.(stage.key)}
                aria-current={isActive ? "step" : undefined}
                className="flex items-center gap-2 disabled:cursor-not-allowed"
              >
                <span
                  className={
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors " +
                    (isActive
                      ? "bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-white"
                      : isDone
                      ? "bg-[var(--surface-2)] text-[var(--text)]"
                      : "border border-[var(--border)] text-[var(--text-soft)]")
                  }
                >
                  {isDone && !isActive ? "✓" : index + 1}
                </span>
                <span
                  className={
                    "hidden whitespace-nowrap text-sm sm:inline " +
                    (isActive ? "font-medium text-[var(--text)]" : "text-[var(--text-soft)]")
                  }
                >
                  {stage.label}
                </span>
              </button>
              {index < STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className={
                    "mx-3 h-px w-8 sm:w-12 " +
                    (isDone
                      ? "bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)]"
                      : "bg-[var(--border)]")
                  }
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}