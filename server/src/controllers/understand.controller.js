const { generateStageOutput } = require('../ai/client');
const understandPrompt = require('../ai/prompts/understand');

module.exports = async function understandController(request, response, next) {
  try {
    const { brief } = request.body;
    if (!brief || typeof brief !== 'string' || brief.trim().length < 5) {
      return response.status(400).json({ error: "Provide a 'brief' string of at least 5 characters." });
    }

    const result = await generateStageOutput({
      systemPrompt: understandPrompt,
      userPayload: { brief: brief.trim() },
    });

    return response.json({ stage: 'understand', ...result });
  } catch (error) {
    return next(error);
  }
};