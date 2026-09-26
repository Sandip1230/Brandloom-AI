require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/db');

const port = process.env.PORT || 3001;

async function start() {
  if (process.env.MONGO_URI) await connectDatabase();
  app.listen(port, () => console.log(`Brandloom API listening on port ${port}`));
}

start().catch((error) => {
  console.error('Failed to start Brandloom API:', error.message);
  process.exit(1);
});