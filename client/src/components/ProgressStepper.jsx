import { STAGES } from "../lib/stages.js";

export default function ProgressStepper({ currentStage, completedStages = [], onSelect }) {
  const activeIndex = STAGES.findIndex((stage) => stage.key === currentStage);

  return (
    <nav aria-label="Brand pipeline progress" className="overflow-x-auto">
      <ol className="flex min-w-max items-center px-6 py-6 md:px-10">
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
                    "flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] transition-colors " +
                    (isActive
                      ? "border-gold bg-gold text-paper"
                      : isDone
                      ? "border-ink bg-ink text-paper"
                      : "border-ink-soft/40 text-ink-soft")
                  }
                >
                  {isDone && !isActive ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={
                    "whitespace-nowrap text-sm " +
                    (isActive ? "text-ink" : isDone ? "text-ink-soft" : "text-ink-soft/60")
                  }
                >
                  {stage.label}
                </span>
              </button>
              {index < STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className={"mx-3 h-px w-10 " + (isDone ? "bg-gold" : "bg-ink-soft/20")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}