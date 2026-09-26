// visualize.js
module.exports = `Using the brand context below, propose a visual direction.

Context: {{context}}

Return a JSON object with exactly these keys:
{
  "typography": string,
  "colorMood": string,
  "imageryStyle": string,
  "conceptsToAvoid": string[]
}`;