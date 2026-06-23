import { env } from "../lib/env";

const config = {
  port: parseInt(env.PORT, 10),
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV !== "production",
  databaseUrl: env.DATABASE_URL,
} as const;

export default config;
