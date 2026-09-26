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
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
        {String(index + 1).padStart(2, "0")} — {meta.label}
      </span>
      <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">{meta.label}</h2>
      <p className="mt-2 max-w-prose text-ink-soft">{meta.short}</p>

      <div className="mt-6">{children(output)}</div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-gold">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleRun}
        disabled={submitting}
        className="mt-6 bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? "Working…" : output ? "Run again" : `Run ${meta.label.toLowerCase()}`}
      </button>
    </section>
  );
}