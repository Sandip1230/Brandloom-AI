const { generateStageOutput } = require('../ai/client');
const visualizePrompt = require('../ai/prompts/visualize');

module.exports = async function visualizeController(request, response, next) {
  try {
    const { context } = request.body;
    if (!context || typeof context !== 'object') {
      return response.status(400).json({ error: "Provide 'context' — Understand + Position + Shape outputs." });
    }

    const result = await generateStageOutput({
      systemPrompt: visualizePrompt,
      userPayload: context,
    });

    return response.json({ stage: 'visualize', ...result });
  } catch (error) {
    return next(error);
  }
};