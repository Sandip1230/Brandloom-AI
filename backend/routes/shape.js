// routes/shape.js
// POST /api/shape
// Input:  { discover: {...}, position: {...} }
// Output: Shape-stage JSON

const express = require("express");
const router = express.Router();
const { callClaude } = require("../utils/claudeClient");
const { SHAPE_SYSTEM_PROMPT } = require("../prompts/shapePrompt");

router.post("/", async (req, res) => {
  try {
    const { discover, position } = req.body;

    if (!discover || !position) {
      return res.status(400).json({
        error: "Please provide both 'discover' and 'position' JSON objects from previous stages."
      });
    }

    const combinedContext = { ...discover, ...position };
    const result = await callClaude(SHAPE_SYSTEM_PROMPT, combinedContext);
    return res.json(result);
  } catch (err) {
    console.error("Error in /api/shape:", err.message);
    return res.status(500).json({ error: "Shape stage failed.", details: err.message });
  }
});

module.exports = router;
