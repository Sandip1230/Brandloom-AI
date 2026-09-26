const cors = require('cors');
const express = require('express');
const brandRoutes = require('./routes/brand.routes');
const stageRoutes = require('./routes/stages.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api/stages', stageRoutes);
app.use('/api/brand', brandRoutes);
app.use(errorHandler);

module.exports = app;