const { generateStageOutput } = require('../ai/client');
const deliverPrompt = require('../ai/prompts/deliver');

module.exports = async function deliverController(request, response, next) {
  try {
    const { context } = request.body;
    if (!context || typeof context !== 'object') {
      return response.status(400).json({ error: "Provide 'context' — all prior stage outputs including Challenge." });
    }

    const result = await generateStageOutput({
      systemPrompt: deliverPrompt,
      userPayload: context,
      maxTokens: 2000,
    });

    return response.json({ stage: 'deliver', ...result });
  } catch (error) {
    return next(error);
  }
};