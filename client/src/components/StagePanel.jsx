import { useBrand } from "../context/BrandContext.jsx";
import { STAGES } from "../lib/stages.js";

export default function StagePanel({ stageKey, children }) {
  const { brand, runStage, pendingStage, stageErrors, advance, goBack } = useBrand();
  const index = STAGES.findIndex((stage) => stage.key === stageKey);
  const meta = STAGES[index];
  const output = brand.stageOutputs[stageKey];
  const submitting = pendingStage === stageKey;
  const error = stageErrors[stageKey];

  async function handleRun() {
    try {
      await runStage(stageKey);
    } catch {
      // error is already captured in stageErrors — nothing else to do here
    }
  }

  return (
    <section>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
            Step {index + 1} of {STAGES.length}
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text)]">{meta.label}</h2>
          <p className="mt-1 text-sm text-[var(--text-soft)]">{meta.short}</p>
        </div>
        {output && (
          <button
            type="button"
            onClick={handleRun}
            disabled={submitting}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-soft)] transition-colors hover:border-[var(--accent-solid)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Working…" : "Regenerate"}
          </button>
        )}
      </div>

      <div className="mt-6">
        {output ? (
          children(output)
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--border)] px-6 py-10 text-center">
            <p className="text-sm text-[var(--text-soft)]">Run this stage to see the result.</p>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-rose-500">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goBack(stageKey)}
          className="text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">
          {!output && (
            <button
              type="button"
              onClick={handleRun}
              disabled={submitting}
              className="rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Working…" : `Run ${meta.label.toLowerCase()}`}
            </button>
          )}
          {output && (
            <button
              type="button"
              onClick={() => advance(stageKey)}
              className="rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}