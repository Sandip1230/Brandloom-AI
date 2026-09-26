import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";

const NAV_LINKS = ["Features", "How it works", "Examples", "Pricing"];

const STEPS = [
  { n: "01", title: "Understand", body: "Extract the real problem, audience, constraints and open questions before anything gets named." },
  { n: "02", title: "Position", body: "Find the category, the differentiator, and the value proposition worth defending." },
  { n: "03", title: "Shape", body: "Personality traits, naming directions, voice and tagline — each with a reason." },
  { n: "04", title: "Visualize", body: "Translate the strategy into typography, color mood and imagery direction." },
  { n: "05", title: "Challenge", body: "Every output gets checked for clichés, contradictions and weak assumptions — and revised." },
  { n: "06", title: "Deliver", body: "A consistency-checked, exportable brand kit you can actually launch with." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-sm font-bold text-white">
            B
          </span>
          Brandloom
        </span>

        <nav className="hidden items-center gap-6 text-sm text-[var(--text-soft)] md:flex">
          {NAV_LINKS.map((link) => (
            <span key={link} className="cursor-not-allowed opacity-70">
              {link}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/workflow"
            className="rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get Started →
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--text-soft)]">
          AI-Powered Brand Intelligence
        </span>

        <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
          Turn your idea into a{" "}
          <span className="bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] bg-clip-text text-transparent">
            complete brand.
          </span>
        </h1>

        <p className="mt-4 text-[var(--text-soft)]">
          From a rough thought to a launch-ready brand system. Powered by AI, guided by strategy, designed for builders.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/workflow"
            className="rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get Started →
          </Link>
          <button
            type="button"
            disabled
            title="Coming soon"
            className="cursor-not-allowed rounded-lg border border-[var(--border)] px-6 py-2.5 text-sm font-medium text-[var(--text-soft)] opacity-70"
          >
            ▷ Watch Demo
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.n} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <span className="font-mono text-xs text-[var(--accent-solid)]">{step.n}</span>
            <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-soft)]">{step.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}