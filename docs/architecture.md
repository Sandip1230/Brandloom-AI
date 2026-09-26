# Architecture

Brandloom is organized as a Vite/React client and an Express API. The client owns the staged workflow UI and calls the API through `client/src/api/brandApi.js`. The server validates and orchestrates stage requests, calls the AI client, and persists a brand session and its outputs in MongoDB.

## Pipeline

1. **Understand** extracts the problem, audience, constraints, and open questions.
2. **Position** develops the category, differentiator, and value proposition.
3. **Shape** defines personality, naming directions, voice, and tagline.
4. **Visualize** proposes typography, color mood, and imagery direction.
5. **Challenge** identifies generic patterns and suggests alternatives.
6. **Deliver** assembles and checks the exportable brand kit.

Each stage consumes the brief and relevant prior outputs. Controllers are currently scaffolded and return `501` until stage orchestration and schema validation are implemented.

## Local development

Install dependencies with `npm install` in the root, `client`, and `server` directories. Configure `server/.env` from `.env.example`, then run `npm run dev` in the root to start both applications. The client uses port `5173`; the API uses port `3001`.