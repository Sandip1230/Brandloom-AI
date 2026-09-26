import { useState } from "react";
import { useBrand } from "../../context/BrandContext.jsx";

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
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">01 — Understand</span>
      <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
        Start with the idea
      </h2>
      <p className="mt-2 max-w-prose text-ink-soft">
        One rough sentence is enough. What are you building, and who is it for?
      </p>

      <textarea
        id="brand-brief"
        value={brief}
        onChange={(event) => setBrief(event.target.value)}
        required
        rows={5}
        placeholder="e.g. An app that helps students find teammates for hackathons and class projects."
        className="mt-6 w-full max-w-prose border border-ink/20 bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:border-gold"
      />

      {error && (
        <p role="alert" className="mt-3 text-sm text-gold">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !brief.trim()}
        className="mt-6 bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? "Working…" : "Understand my idea"}
      </button>
    </form>
  );
}