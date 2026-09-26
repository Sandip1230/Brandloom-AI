// server.js
// Entry point. Wires up CORS, JSON parsing, and all stage routes.

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const discoverRoute = require("./routes/discover");
const positionRoute = require("./routes/position");
const shapeRoute = require("./routes/shape");
// NOTE for teammate (AI/Prompt Engineer): add these once Stage 4-6 routes exist
// const challengeRoute = require("./routes/challenge");
// const visualizeRoute = require("./routes/visualize");
// const deliverRoute = require("./routes/deliver");

const app = express();

app.use(cors()); // allow frontend (different port/origin) to call this API
app.use(express.json({ limit: "1mb" }));

// Simple health check — useful for confirming deploy worked
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "BrandForge AI backend" });
});

// Stage routes (Backend Lead's ownership: Stages 1-3)
app.use("/api/discover", discoverRoute);
app.use("/api/position", positionRoute);
app.use("/api/shape", shapeRoute);

// Stage routes (AI/Prompt Engineer's ownership: Stages 4-6) — mount here once built
// app.use("/api/challenge", challengeRoute);
// app.use("/api/visualize", visualizeRoute);
// app.use("/api/deliver", deliverRoute);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`BrandForge AI backend running on http://localhost:${PORT}`);
});
