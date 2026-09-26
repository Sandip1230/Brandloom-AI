const { generateStageOutput } = require('../ai/client');
const challengePrompt = require('../ai/prompts/challenge');

module.exports = async function challengeController(request, response, next) {
  try {
    const { context } = request.body;
    if (!context || typeof context !== 'object') {
      return response.status(400).json({ error: "Provide 'context' — all prior stage outputs." });
    }

    const result = await generateStageOutput({
      systemPrompt: challengePrompt,
      userPayload: context,
      maxTokens: 2000,
    });

    return response.json({ stage: 'challenge', ...result });
  } catch (error) {
    return next(error);
  }
};