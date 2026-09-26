const Anthropic = require('@anthropic-ai/sdk');

function createAIClient() {
      if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is required for AI stages');
      return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

module.exports = { createAIClient };