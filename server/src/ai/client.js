const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function createAIClient() {
      const apiKey = process.env.OPENROUTER_API_KEY;
      const model = process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3.5-lightning:free';

      if (!apiKey) throw new Error('OPENROUTER_API_KEY is required for AI stages');

      async function complete({ system, prompt, maxTokens = 1024 }) {
            const response = await fetch(OPENROUTER_URL, {
                  method: 'POST',
                  headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        // OpenRouter uses these to attribute/rank apps on their leaderboard — optional but recommended
                        'HTTP-Referer': process.env.CLIENT_ORIGIN || 'http://localhost:5173',
                        'X-Title': 'Brandloom',
                  },
                  body: JSON.stringify({
                        model,
                        max_tokens: maxTokens,
                        messages: [
                              ...(system ? [{ role: 'system', content: system }] : []),
                              { role: 'user', content: prompt },
                        ],
                  }),
            });

            if (!response.ok) {
                  const errorBody = await response.text();
                  throw new Error(`OpenRouter request failed (${response.status}): ${errorBody}`);
            }

            const data = await response.json();
            return data.choices?.[0]?.message?.content ?? '';
      }

      return { complete };
}

module.exports = { createAIClient };