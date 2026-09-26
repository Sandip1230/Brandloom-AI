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

Each stage's structured JSON output is passed forward as context — nothing restarts from zero.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Anthropic API (staged prompt chain, structured JSON outputs)
- [DB choice — e.g. Supabase/SQLite via Prisma]

## Getting Started

\`\`\`bash
npm install
cp .env.example .env.local   # add your API key
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
