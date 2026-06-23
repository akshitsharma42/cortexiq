import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import config from "./config";
import { connectDatabase } from "./config/database";

async function startServer() {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`[api] Server running on http://localhost:${config.port}`);
    console.log(`[api] Environment: ${config.nodeEnv}`);
  });
}

startServer().catch((error) => {
  console.error("[api] Failed to start:", error);
  process.exit(1);
});
