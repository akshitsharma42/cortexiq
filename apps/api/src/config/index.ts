/**
 * API application configuration.
 * Loads environment variables and exports typed config object.
 */

const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",
} as const;

export default config;
