import { STAGES } from "../lib/stages.js";

export default function ProgressStepper({ currentStage, completedStages = [], onSelect }) {
  const activeIndex = STAGES.findIndex((stage) => stage.key === currentStage);

  return (
    <nav aria-label="Brand pipeline progress" className="overflow-x-auto">
      <ol className="flex min-w-max items-center px-6 py-5 md:px-8">
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
                      ? "border-gold bg-gold text-ink"
                      : isDone
                      ? "border-violet bg-violet text-paper"
                      : "border-paper/25 text-paper/50")
                  }
                >
                  {isDone && !isActive ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={
                    "whitespace-nowrap text-sm " +
                    (isActive ? "text-paper" : isDone ? "text-paper/70" : "text-paper/35")
                  }
                >
                  {stage.label}
                </span>
              </button>
              {index < STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className={"mx-3 h-px w-8 " + (isDone ? "bg-violet" : "bg-paper/15")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}