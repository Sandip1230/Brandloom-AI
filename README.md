# Brandloom

Turn a rough idea into a coherent, launch-ready brand system — through a staged AI reasoning pipeline, not a single giant prompt.

Built for the Inkloom x We Code Coders Hackathon.

## The Problem

Founders start with a single rough sentence. That's not a brand. Brandloom interviews the idea, positions it, shapes its personality, visualizes it, challenges its own output for clichés, and delivers a usable brand kit — with each stage building on structured context from the last.

## Pipeline

1. **Understand** — extract problem, audience, constraints, open questions
2. **Position** — category, differentiator, value proposition
3. **Shape** — personality traits, naming directions, voice, tagline
4. **Visualize** — typography, color mood, imagery direction
5. **Challenge** — detect clichés/generic patterns, propose stronger alternatives
6. **Deliver** — consistency-checked, exportable brand kit

Each stage's structured JSON output is stored and passed forward as context — nothing restarts from zero.

## Tech Stack

- **MongoDB** — persistence for brand sessions & stage outputs
- **Express.js** — REST API, stage orchestration
- **React** (Vite) — frontend, pipeline UI
- **Node.js** — server runtime
- **Anthropic API** — staged prompt chain, structured JSON outputs
- Tailwind CSS — styling

## Getting Started

\`\`\`bash
# clone
git clone https://github.com/<org>/brandloom-ai.git
cd brandloom-ai

# backend
cd server
npm install
cp .env.example .env    # add MONGO_URI + ANTHROPIC_API_KEY
npm run dev

# frontend (new terminal)
cd client
npm install
npm run dev
\`\`\`

## Project Structure

See `/docs/architecture.md`.

## Team

- [Name] — [role]
- [Name] — [role]
- [Name] — [role]
- [Name] — [role]

## License

MIT
