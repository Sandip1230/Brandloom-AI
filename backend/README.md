# BrandForge AI — Backend (Stages 1–3)

Built by: Backend Lead
Covers: `/api/discover`, `/api/position`, `/api/shape`

## Setup

```bash
cd backend
npm install
cp .env.example .env
# then paste your real Claude API key into .env
npm run dev
```

Server runs at `http://localhost:4000`.

## Test each stage with curl (or Postman)

### 1. Health check
```bash
curl http://localhost:4000/api/health
```

### 2. Discover
```bash
curl -X POST http://localhost:4000/api/discover \
  -H "Content-Type: application/json" \
  -d '{"idea": "I want to create an app that helps students find teammates for hackathons."}'
```

### 3. Position (feed in the discover output)
```bash
curl -X POST http://localhost:4000/api/position \
  -H "Content-Type: application/json" \
  -d '{"discover": { ...paste the JSON you got back from /api/discover here... }}'
```

### 4. Shape (feed in discover + position output)
```bash
curl -X POST http://localhost:4000/api/shape \
  -H "Content-Type: application/json" \
  -d '{"discover": {...}, "position": {...}}'
```

## Handoff to AI/Prompt Engineer

Stages 4–6 (`challenge`, `visualize`, `deliver`) follow the exact same pattern:
1. Create `prompts/xPrompt.js` with a system prompt (see the three existing ones as templates).
2. Create `routes/x.js` that imports `callClaude` from `utils/claudeClient.js`.
3. Mount it in `server.js` (`app.use("/api/x", xRoute)`).

## Handoff to Frontend

Call stages in this exact order, always passing forward the accumulated JSON:

```
POST /api/discover   { idea }                          -> discoverJSON
POST /api/position    { discover: discoverJSON }         -> positionJSON
POST /api/shape       { discover, position }              -> shapeJSON
POST /api/challenge   { shape, position }                  -> challengeJSON   (once built)
POST /api/visualize   { discover, position, shape, ... }    -> visualizeJSON  (once built)
POST /api/deliver     { everything above }                   -> final brand kit (once built)
```

## Common errors

| Error | Fix |
|---|---|
| `CLAUDE_API_KEY is missing` | Check `.env` file exists and has the key |
| `400 idea is required` | Frontend must send `{ "idea": "..." }` in body |
| CORS error in browser | Confirm `cors()` middleware is active in `server.js` |
| JSON parse error from Claude | Wrapper auto-retries once with a stricter prompt; check server logs if it still fails |
