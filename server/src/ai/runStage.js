const { createAIClient } = require('./client');
const SYSTEM_PROMPT = require('./systemPrompt');

// Fills {{key}} placeholders in a prompt template. Objects are pretty-printed
// so the model sees readable JSON context, not a giant single-line blob.
function fillTemplate(template, vars) {
      return template.replace(/{{\s*(\w+)\s*}}/g, (_match, key) => {
            const value = vars[key];
            if (value === undefined) return '';
            return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
      });
}

// Models sometimes wrap JSON in ```json fences or add a stray sentence
// around it even when told not to - this pulls the JSON object out either way.
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

async function runPromptStage(promptTemplate, vars) {
      const client = createAIClient();
      const prompt = fillTemplate(promptTemplate, vars);
      const raw = await client.complete({ system: SYSTEM_PROMPT, prompt, maxTokens: 1400 });
      return extractJson(raw);
}

// Shared error-to-response mapping so every stage controller behaves the same way.
function handleStageError(stageName, error, response, next) {
      if (error.message?.includes('OPENROUTER_API_KEY')) {
            return response.status(500).json({ stage: stageName, error: 'Server is missing an OpenRouter API key.' });
      }
      if (
            error.message?.startsWith('OpenRouter request failed') ||
            error.message?.includes('did not contain a JSON object') ||
            error instanceof SyntaxError
      ) {
            return response.status(502).json({ stage: stageName, error: 'The AI service returned an unusable response. Try again.' });
      }
      return next(error);
}

module.exports = { runPromptStage, fillTemplate, extractJson, handleStageError };