import { useState } from "react";
import { useBrand } from "../../context/BrandContext.jsx";

const EXAMPLES = [
  "An app that helps students find teammates for hackathons and class projects.",
  "A marketplace for local home-repair services.",
  "A fitness tracking app built for busy students.",
  "A sustainable, made-to-order fashion brand.",
];

export default function DiscoverForm() {
  const { brand, submitBrief, pendingStage, stageErrors } = useBrand();
  const [brief, setBrief] = useState(brand.brief);
  const submitting = pendingStage === "understand";
  const error = stageErrors.understand;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await submitBrief(brief.trim());
    } catch {
      // error is already captured in stageErrors — nothing else to do here
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
        Step 1 of 6
      </span>
      <h2 className="mt-2 text-2xl font-semibold text-[var(--text)]">Let's start with your idea</h2>
      <p className="mt-1 text-sm text-[var(--text-soft)]">
        Tell us about your product, startup, community or creator idea. Don't worry if it's rough — we'll help you shape it.
      </p>

      <textarea
        id="brand-brief"
        value={brief}
        onChange={(event) => setBrief(event.target.value.slice(0, 500))}
        required
        rows={5}
        maxLength={500}
        placeholder="e.g. I want to create an app that helps students find teammates for college projects…"
        className="mt-6 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-soft)] focus:border-[var(--accent-solid)] focus:outline-none"
      />
      <p className="mt-1 text-right text-xs text-[var(--text-soft)]">{brief.length}/500</p>

      <p className="mt-4 text-xs font-medium text-[var(--text-soft)]">Example ideas</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setBrief(example)}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-soft)] transition-colors hover:border-[var(--accent-solid)] hover:text-[var(--text)]"
          >
            {example.length > 34 ? example.slice(0, 34) + "…" : example}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-rose-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !brief.trim()}
        className="mt-6 rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Working…" : "Continue"}
      </button>
    </form>
  );
}