<<<<<<< Updated upstream
import WeaveDiagram from "../components/WeaveDiagram";
import { Link } from "react-router-dom";
=======
import "../styles/landing.css";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    <div className="min-h-screen bg-paper text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 md:px-10">
        <span className="font-display text-xl tracking-tight">Brandloom</span>
        <Link to="/workflow" className="border-b border-ink pb-0.5 text-sm text-ink transition-colors hover:border-gold hover:text-gold">
          Start your brand
        </Link>
      </header>
=======
    <div className="page">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <a href="#top" className="logo">
          <span className="logo-star">✦</span>
          <span>Brandloom</span>
        </a>
>>>>>>> Stashed changes

        <div className="nav-links">
          <a href="#pipeline">Pipeline</a>
          <a href="#pipeline">Stages</a>
        </div>

        <div className="nav-buttons">
          <a href="#pipeline" className="login-btn">
            See how it works
          </a>
          <a href="#start" className="start-btn">
            Get Started
          </a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <main className="hero">
        {/* LEFT SIDE */}
        <section className="hero-left">
          <div className="ai-badge">
            <span>✦</span>
            AI-Powered Brand Pipeline
          </div>

          <h1>
            Give it one rough idea.
            <br />
            Get a <span>brand</span>
            <br />
            that holds together.
            <i></i>
          </h1>

          <p className="hero-description">
            Brandloom runs your idea through six connected stages — each one
            reads what came before it, and the sixth checks the other five
            for contradictions before anything is handed to you.
          </p>
<<<<<<< Updated upstream
          
          <div className="mt-9 flex items-center gap-6">
            <Link to="/workflow" className="bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-gold">
              Start your brand
            </Link>
            
            <a
              href="#pipeline"
              className="text-sm text-ink-soft underline decoration-ink-soft/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-gold"
            >
=======

          <div className="hero-buttons">
            <a href="#start" id="start" className="primary-btn">
              Start your brand
              <span>→</span>
            </a>

            <a href="#pipeline" className="demo-btn">
              <span className="play">▶</span>
>>>>>>> Stashed changes
              See how it works
            </a>
          </div>

          {/* PEOPLE */}
          <div className="social-proof">
            <div className="avatars">
              <div className="avatar avatar1"></div>
              <div className="avatar avatar2"></div>
              <div className="avatar avatar3"></div>
              <div className="avatar avatar4"></div>
            </div>

            <p>
              Built for founders shaping
              <br />
              their first brand with AI.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="hero-right">
          {/* Glow */}
          <div className="blue-glow"></div>
          <div className="purple-glow"></div>

          {/* Decorative ribbon */}
          <div className="ribbon ribbon-one"></div>
          <div className="ribbon ribbon-two"></div>

          {/* PHONE */}
          <div className="phone">
            <div className="phone-screen">
              <div className="phone-logo">
                <span>✦</span>
              </div>

              <div className="phone-title">Brandloom</div>

              <div className="phone-subtitle">Ideas to launch-ready brands</div>
            </div>
          </div>

          {/* FLOATING CARDS */}
          <div className="workflow-card idea-card">
            <div className="card-icon">◇</div>
            <span>Understand</span>
          </div>

          <div className="workflow-card strategy-card">
            <div className="card-icon">♢</div>
            <span>Position</span>
          </div>

          <div className="workflow-card identity-card">
            <div className="card-icon">◉</div>
            <span>Visualize</span>
          </div>

          <div className="workflow-card launch-card">
            <div className="card-icon">♥</div>
            <span>Deliver</span>
          </div>
        </section>
      </main>

      {/* ================= BOTTOM FLOW ================= */}
      <div className="bottom-flow">
        <span>Understand</span>
        <b>→</b>
        <span>Position</span>
        <b>→</b>
        <span>Visualize</span>
        <b>→</b>
        <span>Deliver</span>
      </div>

      {/* ================= PIPELINE DETAIL ================= */}
      <section id="pipeline" className="pipeline-section">
        <h2>Six stages. One thread of context.</h2>
        <p>
          Nothing restarts from zero. Every stage writes structured results
          that the next one reads before it says a word.
        </p>

        <div className="stage-grid">
          {STEPS.map((step) => (
            <div key={step.n} className="stage-card">
              <span className="stage-number">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        Brandloom — built for the Inkloom × We Code Coders Hackathon.
      </footer>
    </div>
  );
}