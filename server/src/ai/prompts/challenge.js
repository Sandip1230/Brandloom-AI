// challenge.js
module.exports = `Review the brand context below for cliches, contradictions, and generic startup patterns.

Context: {{context}}

Return a JSON object with exactly these keys:
{
  "findings": [
    {
      "issue": string - name the specific cliche, contradiction or weak pattern found,
      "before": string - quote or closely paraphrase the exact weak element as it currently stands,
      "after": string - a stronger, more specific replacement for that exact element,
      "rationale": string - one sentence on why "after" is stronger for this audience
    }
  ],
  "consistent": boolean - true only if no meaningful issues were found
}

Rules:
- Be genuinely critical — a report with no real findings is a failure of this stage.
- Each "after" must be more specific than its "before", never vaguer.
- If "consistent" is true, return an empty "findings" array.
- Respond with ONLY the JSON object — no markdown fences, no preamble, no explanation.`;