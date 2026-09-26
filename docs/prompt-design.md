# Prompt design

Prompts live in `server/src/ai/prompts` as stage-specific templates. They should keep each reasoning step narrow, carry forward only the accumulated brand context needed by that stage, and require structured JSON output. Stage response schemas belong in `server/src/ai/schemas` and should be applied before outputs are persisted or passed downstream.

## Contracts

- **Understand:** `problem`, `audience`, `constraints`, `openQuestions`
- **Position:** `category`, `differentiator`, `valueProposition`
- **Shape:** `traits`, `namingDirections`, `voice`, `tagline`
- **Visualize:** `typography`, `colorMood`, `imageryDirection`
- **Challenge:** `findings`, `alternatives`
- **Deliver:** `brandKit`, `consistencyNotes`

Prompts must distinguish user-provided facts from generated proposals, avoid inventing evidence, and retain uncertainty rather than presenting assumptions as facts. The stage handlers and schema validation are scaffolding and must be completed before enabling model calls in production.