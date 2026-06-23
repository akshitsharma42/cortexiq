import mongoose from "mongoose";
import { env } from "../lib/env";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("[db] Connected to MongoDB");
  } catch (error) {
    console.error("[db] Connection failed:", error);
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log("[db] Disconnected from MongoDB");
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDatabase();
  process.exit(0);
});
