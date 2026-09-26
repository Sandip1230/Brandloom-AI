// challenge.js — schema for the Challenge stage response
module.exports = {
  findings: 'object[]', // each: { issue, before, after, rationale }
  consistent: 'boolean',
};