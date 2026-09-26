// challenge.js
module.exports = `Review the brand context below for cliches, contradictions, and generic startup patterns.

Context: {{context}}

Return a JSON object with exactly these keys:
{
  "findings": string[] - each one naming the issue and a stronger alternative, in one sentence,
  "consistent": boolean - true only if no meaningful issues were found
}

Rules:
- Be genuinely critical — a report with no real findings is a failure of this stage.
- Every alternative must be more specific than what it replaces, never vaguer.
- Respond with ONLY the JSON object — no markdown fences, no preamble, no explanation.`;