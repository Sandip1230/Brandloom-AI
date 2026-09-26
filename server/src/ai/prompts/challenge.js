// challenge.js
module.exports = `Review the brand context below for cliches, contradictions, and generic startup patterns.

Context: {{context}}

Return a JSON object with exactly these keys:
{
  "findings": string[] - each one naming the issue and a stronger alternative, in one sentence,
  "consistent": boolean - true only if no meaningful issues were found
}`;