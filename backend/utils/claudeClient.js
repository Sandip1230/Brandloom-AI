// utils/claudeClient.js
// Central place that talks to the Claude API for every stage.
// Every stage route imports { callClaude } from here instead of
// calling fetch() directly — one place to fix bugs, add retries, etc.

const CLAUDE_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";

/**
 * Strips markdown code fences if the model wraps JSON in ```json ... ```
 * even though we tell it not to. Cheap safety net.
 */
function stripCodeFences(text) {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

/**
 * Calls Claude with a system prompt (stage-specific instructions)
 * and a user payload (JSON context from previous stages).
 * Returns a parsed JS object. Retries once with a stricter
 * instruction if the first response isn't valid JSON.
 */
async function callClaude(systemPrompt, userPayload, { maxTokens = 1500 } = {}) {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error("CLAUDE_API_KEY is missing. Check your .env file.");
  }

  const body = {
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [
      { role: "user", content: JSON.stringify(userPayload) }
    ]
  };

  const attempt = async (strict) => {
    const finalSystem = strict
      ? systemPrompt + "\n\nCRITICAL: Your entire reply must be ONLY valid JSON. No preamble, no markdown fences, no explanation text before or after."
      : systemPrompt;

    const res = await fetch(CLAUDE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({ ...body, system: finalSystem })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Claude API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const rawText = data?.content?.[0]?.text ?? "";
    const cleaned = stripCodeFences(rawText);
    return JSON.parse(cleaned); // throws if still not valid JSON
  };

  try {
    return await attempt(false);
  } catch (firstError) {
    console.warn("First Claude call failed to parse as JSON, retrying strict:", firstError.message);
    // Retry once, more strictly worded
    return await attempt(true);
  }
}

module.exports = { callClaude };
