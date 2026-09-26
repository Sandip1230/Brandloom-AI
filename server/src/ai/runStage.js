const { createAIClient } = require('./client');
const SYSTEM_PROMPT = require('./systemPrompt');
const SCHEMAS = require('./schemas');
const { validateAgainstSchema } = require('./schemas/validate');

function fillTemplate(template, vars) {
      return template.replace(/{{\s*(\w+)\s*}}/g, (_match, key) => {
            const value = vars[key];
            if (value === undefined) return '';
            return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
      });
}

function extractJson(text) {
      const trimmed = (text || '').trim();
      const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      const candidate = fenced ? fenced[1] : trimmed;
      const start = candidate.indexOf('{');
      const end = candidate.lastIndexOf('}');
      if (start === -1 || end === -1 || end < start) {
            throw new Error('AI response did not contain a JSON object');
      }
      return JSON.parse(candidate.slice(start, end + 1));
}

async function runPromptStage(stageName, promptTemplate, vars, { retries = 1 } = {}) {
      const client = createAIClient();
      const prompt = fillTemplate(promptTemplate, vars);
      const schema = SCHEMAS[stageName];

      let lastError;
      for (let attempt = 0; attempt <= retries; attempt += 1) {
            const isRetry = attempt > 0;
            const attemptPrompt = isRetry
                  ? `${prompt}\n\nYour previous reply could not be used: ${lastError.message}\nRespond again with ONLY one valid JSON object matching the schema above - no markdown fences, no commentary, no text before or after it, and make sure every required field is present with the correct type.`
                  : prompt;

            try {
                  const raw = await client.complete({ system: SYSTEM_PROMPT, prompt: attemptPrompt, maxTokens: 3000 });
                  const parsed = extractJson(raw);

                  if (schema) {
                        const errors = validateAgainstSchema(stageName, schema, parsed);
                        if (errors.length > 0) {
                              throw new Error(`Schema validation failed for stage "${stageName}": ${errors.join(' ')}`);
                        }
                  }

                  return parsed;
            } catch (error) {
                  lastError = error;
                  const isRecoverable =
                        error.message?.includes('did not contain a JSON object') ||
                        error.message?.includes('Schema validation failed') ||
                        error instanceof SyntaxError;
                  if (!isRecoverable || attempt === retries) throw error;
                  console.warn(`[runStage] "${stageName}" attempt ${attempt + 1} failed, retrying:`, error.message);
            }
      }
      throw lastError;
}

function handleStageError(stageName, error, response, next) {
      console.error(`[stage: ${stageName}] failed:`, error.message);

      if (error.message?.includes('AI_API_KEY') || error.message?.includes('OPENROUTER_API_KEY')) {
            return response.status(500).json({ stage: stageName, error: 'Server is missing an AI provider API key.' });
      }
      if (
            error.message?.startsWith('AI provider request failed') ||
            error.message?.includes('AI provider request timed out') ||
            error.message?.includes('Could not reach AI provider') ||
            error.message?.startsWith('OpenRouter request failed') ||
            error.message?.includes('OpenRouter request timed out') ||
            error.message?.includes('Could not reach OpenRouter') ||
            error.message?.includes('did not contain a JSON object') ||
            error.message?.includes('Schema validation failed') ||
            error instanceof SyntaxError
      ) {
            return response.status(502).json({ stage: stageName, error: 'The AI service returned an unusable response. Try again.' });
      }
      return next(error);
}

module.exports = { runPromptStage, fillTemplate, extractJson, handleStageError };