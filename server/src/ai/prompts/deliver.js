// deliver.js
module.exports = `Assemble the brand context below into a final, exportable brand kit. Preserve the source facts; do not invent anything not present in the context.

Context: {{context}}

Return a JSON object with exactly these keys:
{
  "summary": string - one paragraph overview of the brand,
  "position": object - carried over from the context,
  "personality": object - traits, voice and tagline carried over,
  "visual": object - visual direction carried over,
  "openGaps": string[] - anything still unresolved
}`;