// routes/position.js
// POST /api/position
// Input:  { discover: { ...Discover-stage JSON... } }
// Output: Position-stage JSON

const express = require("express");
const router = express.Router();
const { callClaude } = require("../utils/claudeClient");
const { POSITION_SYSTEM_PROMPT } = require("../prompts/positionPrompt");

router.post("/", async (req, res) => {
  try {
    const { discover } = req.body;

    if (!discover || typeof discover !== "object") {
      return res.status(400).json({
        error: "Please provide the previous stage's 'discover' JSON object in the request body."
      });
    }

    const result = await callClaude(POSITION_SYSTEM_PROMPT, discover);
    return res.json(result);
  } catch (err) {
    console.error("Error in /api/position:", err.message);
    return res.status(500).json({ error: "Position stage failed.", details: err.message });
  }
});

module.exports = router;
