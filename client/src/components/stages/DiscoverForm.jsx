import { useState } from "react";
import { useBrand } from "../../context/BrandContext.jsx";

const EXAMPLES = [
  "Student teammate finder",
  "Local service marketplace",
  "Fitness tracking for students",
  "Sustainable fashion brand",
  "AI study planner",
  "College event hub",
];

export default function DiscoverForm() {
  const { brand, submitBrief, pendingStage, stageErrors, advance } = useBrand();
  const [brief, setBrief] = useState(brand.brief);
  const [showForm, setShowForm] = useState(!brand.stageOutputs.understand);
  const submitting = pendingStage === "understand";
  const error = stageErrors.understand;
  const output = brand.stageOutputs.understand;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await submitBrief(brief.trim());
      setShowForm(false);
    } catch {
      // error is already captured in stageErrors — nothing else to do here
    }
  }

  if (!showForm && output) {
    return (
      <section>
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper/45">
              01 — Discover
            </span>
            <h2 className="mt-2 font-display text-2xl text-paper sm:text-3xl">
              Understanding your idea
            </h2>
            <p className="mt-1 max-w-prose text-paper/60">
              Here's what we understood from your input. You can edit or refine it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="border border-paper/20 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-gold hover:text-gold"
          >
            Edit
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard label="Product Idea" body={output.productIdea} />
          <InfoCard label="Target Audience" body={output.audience} />
          <InfoCard label="Core Problem" body={output.coreProblem} />
          <InfoCard label="Primary Goals" list={output.primaryGoals} />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => advance("understand")}
            className="bg-gold px-6 py-3 text-sm text-ink transition-colors hover:bg-paper"
          >
            Looks good, Continue →
          </button>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper/45">01 — Discover</span>
      <h2 className="mt-2 font-display text-2xl text-paper sm:text-3xl">
        Let's start with your idea
      </h2>
      <p className="mt-1 max-w-prose text-paper/60">
        Tell us about your product, startup, community or creator idea. Don't worry if it's rough
        — we'll help you shape it.
      </p>

      <textarea
        id="brand-brief"
        value={brief}
        onChange={(event) => setBrief(event.target.value)}
        required
        rows={5}
        maxLength={500}
        placeholder="e.g. I want to create an app that helps students find teammates for college projects…"
        className="mt-6 w-full max-w-prose border border-paper/20 bg-ink px-4 py-3 text-paper placeholder:text-paper/35 focus:border-gold"
      />
      <p className="mt-1 font-mono text-xs text-paper/35">{brief.length}/500</p>

      <p className="mt-5 text-xs uppercase tracking-[0.1em] text-paper/40">Try an example</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setBrief(example)}
            className="border border-paper/20 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-gold hover:text-gold"
          >
            {example}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-gold">
          {error}
        </p>
      )}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={submitting || !brief.trim()}
          className="bg-gold px-6 py-3 text-sm text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Working…" : "Continue →"}
        </button>
      </div>
    </form>
  );
}

function InfoCard({ label, body, list }) {
  return (
    <div className="border border-paper/15 bg-ink px-5 py-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">{label}</span>
      {body && <p className="mt-2 text-sm text-paper/80">{body}</p>}
      {list && (
        <ul className="mt-2 space-y-1">
          {list.map((item, index) => (
            <li key={`${item}-${index}`} className="text-sm text-paper/80">
              • {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}