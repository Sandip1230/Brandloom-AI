import WeaveDiagram from "../components/WeaveDiagram";

const STEPS = [
  {
    n: "01",
    title: "Understand",
    body: "Extract the real problem, audience, constraints and open questions before anything gets named.",
  },
  {
    n: "02",
    title: "Position",
    body: "Find the category, the differentiator, and the value proposition worth defending.",
  },
  {
    n: "03",
    title: "Shape",
    body: "Personality traits, naming directions, voice and tagline — each with a reason.",
  },
  {
    n: "04",
    title: "Visualize",
    body: "Translate the strategy into typography, color mood and imagery direction.",
  },
  {
    n: "05",
    title: "Challenge",
    body: "Every output gets checked for clichés, contradictions and weak assumptions — and revised.",
  },
  {
    n: "06",
    title: "Deliver",
    body: "A consistency-checked, exportable brand kit you can actually launch with.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 md:px-10">
        <span className="font-display text-xl tracking-tight">Brandloom</span>
        <a
          href="#start"
          className="border-b border-ink pb-0.5 text-sm text-ink transition-colors hover:border-gold hover:text-gold"
        >
          Start your brand
        </a>
      </header>

      {/* Hero — asymmetric, left copy / right literal weave diagram */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-8 md:grid-cols-[1.05fr_1fr] md:px-10 md:pt-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
            An AI brand pipeline, not a prompt box
          </p>
          <h1 className="mt-5 font-display text-4xl italic leading-[1.08] text-ink sm:text-5xl md:text-6xl">
            Give it one rough
            <br />
            idea. Get a brand
            <br />
            that holds together.
          </h1>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink-soft">
            Brandloom runs your idea through six connected stages — each one
            reads what came before it, and the sixth checks the other five for
            contradictions before anything is handed to you.
          </p>
          <div className="mt-9 flex items-center gap-6">
            <a
              href="#start"
              id="start"
              className="bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-gold"
            >
              Start your brand
            </a>
            <a
              href="#pipeline"
              className="text-sm text-ink-soft underline decoration-ink-soft/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-gold"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <WeaveDiagram />
        </div>
      </section>

      <hr className="mx-auto max-w-6xl border-ink/10" />

      {/* Pipeline detail */}
      <section id="pipeline" className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Six stages. One thread of context.
        </h2>
        <p className="mt-4 max-w-prose text-ink-soft">
          Nothing restarts from zero. Every stage writes structured results
          that the next one reads before it says a word.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="border-t border-ink/15 pt-5">
              <span className="font-mono text-xs text-gold">{step.n}</span>
              <h3 className="mt-2 font-display text-xl text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="mx-auto max-w-6xl border-ink/10" />

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-ink-soft md:px-10">
        Brandloom — built for the Inkloom x We Code Coders Hackathon.
      </footer>
    </div>
  );
}