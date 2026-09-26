const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function stripCodeFences(text) {
  return text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

async function generateStageOutput({ systemPrompt, userPayload, maxTokens = 1500 }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is missing. Add it to server/.env');
  }
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';

  async function attempt(strict) {
    const finalSystem = strict
      ? `${systemPrompt}\n\nCRITICAL: Reply with ONLY valid JSON. No markdown fences, no preamble, no explanation.`
      : systemPrompt;

    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: finalSystem },
          { role: 'user', content: JSON.stringify(userPayload) },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenRouter error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const rawText = data?.choices?.[0]?.message?.content ?? '';
    return JSON.parse(stripCodeFences(rawText));
  }

  try {
    return await attempt(false);
  } catch (firstError) {
    console.warn('Stage output was not valid JSON, retrying strict:', firstError.message);
    return await attempt(true);
  }
}

module.exports = { generateStageOutput };