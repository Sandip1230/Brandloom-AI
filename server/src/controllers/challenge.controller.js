// challenge.controller.js
const promptTemplate = require('../ai/prompts/challenge');
const { runPromptStage, handleStageError } = require('../ai/runStage');

module.exports = async function challengeController(request, response, next) {
  const { context = {} } = request.body || {};
  if (!context.visualize) {
    return response.status(400).json({ stage: 'challenge', error: 'Run the Visualize stage first.' });
  }

  try {
    const result = await runPromptStage(promptTemplate, { context });
    return response.json(result);
  } catch (error) {
    return handleStageError('challenge', error, response, next);
  }
};