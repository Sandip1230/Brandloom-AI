// routes/discover.js
// POST /api/discover
// Input:  { idea: "raw text from user" }
// Output: Discover-stage JSON

const express = require("express");
const router = express.Router();
const { callClaude } = require("../utils/claudeClient");
const { DISCOVER_SYSTEM_PROMPT } = require("../prompts/discoverPrompt");

router.post("/", async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return res.status(400).json({
        error: "Please provide a non-empty 'idea' string (at least 5 characters)."
      });
    }

    const result = await callClaude(DISCOVER_SYSTEM_PROMPT, { idea: idea.trim() });
    return res.json(result);
  } catch (err) {
    console.error("Error in /api/discover:", err.message);
    return res.status(500).json({ error: "Discover stage failed.", details: err.message });
  }
});

module.exports = router;
