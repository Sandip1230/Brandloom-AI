const { generateStageOutput } = require('../ai/client');
const shapePrompt = require('../ai/prompts/shape');

module.exports = async function shapeController(request, response, next) {
  try {
    const { context } = request.body;
    if (!context || typeof context !== 'object') {
      return response.status(400).json({ error: "Provide 'context' — Understand + Position outputs." });
    }

    const result = await generateStageOutput({
      systemPrompt: shapePrompt,
      userPayload: context,
    });

    return response.json({ stage: 'shape', ...result });
  } catch (error) {
    return next(error);
  }
};