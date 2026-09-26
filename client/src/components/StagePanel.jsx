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
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper/45">
            {String(index + 1).padStart(2, "0")} — {meta.label}
          </span>
          <h2 className="mt-2 font-display text-2xl text-paper sm:text-3xl">{meta.label}</h2>
          <p className="mt-1 max-w-prose text-paper/60">{meta.short}</p>
        </div>
        {output && (
          <button
            type="button"
            onClick={handleRun}
            disabled={submitting}
            className="border border-paper/20 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Working…" : "Regenerate"}
          </button>
        )}
      </div>

      <div className="mt-6">
        {output ? (
          children(output)
        ) : (
          <div className="border border-dashed border-paper/20 px-6 py-10 text-center">
            <p className="text-sm text-paper/50">Run this stage to see the result.</p>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-gold">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goBack(stageKey)}
          className="text-sm text-paper/50 transition-colors hover:text-paper"
        >
          ← Back
        </button>

        <div className="flex items-center gap-3">
          {!output && (
            <button
              type="button"
              onClick={handleRun}
              disabled={submitting}
              className="bg-gold px-6 py-3 text-sm text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Working…" : `Run ${meta.label.toLowerCase()}`}
            </button>
          )}
          {output && (
            <button
              type="button"
              onClick={() => advance(stageKey)}
              className="bg-gold px-6 py-3 text-sm text-ink transition-colors hover:bg-paper"
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}