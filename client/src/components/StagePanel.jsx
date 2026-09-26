import { useBrand } from "../context/BrandContext.jsx";
import { STAGES } from "../lib/stages.js";

export default function StagePanel({ stageKey, children }) {
  const { brand, runStageAndAdvance, pendingStage, stageErrors } = useBrand();
  const index = STAGES.findIndex((stage) => stage.key === stageKey);
  const meta = STAGES[index];
  const output = brand.stageOutputs[stageKey];
  const submitting = pendingStage === stageKey;
  const error = stageErrors[stageKey];

  async function handleRun() {
    try {
      await runStageAndAdvance(stageKey);
    } catch {
      // error is already captured in stageErrors — nothing else to do here
    }
  }

  return (
    <section>
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
        Step {index + 1} of {STAGES.length}
      </span>
      <h2 className="mt-2 text-2xl font-semibold text-[var(--text)]">{meta.label}</h2>
      <p className="mt-1 text-sm text-[var(--text-soft)]">{meta.short}</p>

      <div className="mt-6">{children(output)}</div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-rose-500">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleRun}
        disabled={submitting}
        className="mt-6 rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Working…" : output ? "Regenerate" : "Continue"}
      </button>
    </section>
  );
}