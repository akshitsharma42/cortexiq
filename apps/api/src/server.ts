import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import config from "./config";

app.listen(config.port, () => {
  console.log(`[api] Server running on http://localhost:${config.port}`);
  console.log(`[api] Environment: ${config.nodeEnv}`);
});
