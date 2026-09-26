const { generateStageOutput } = require('../ai/client');
const positionPrompt = require('../ai/prompts/position');

module.exports = async function positionController(request, response, next) {
  try {
    const { context } = request.body;
    if (!context || typeof context !== 'object') {
      return response.status(400).json({ error: "Provide 'context' — the Understand stage's output." });
    }

    const result = await generateStageOutput({
      systemPrompt: positionPrompt,
      userPayload: context,
    });

    return response.json({ stage: 'position', ...result });
  } catch (error) {
    return next(error);
  }
};