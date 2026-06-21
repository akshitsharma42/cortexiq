import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

// Minimal middleware
app.use(express.json());
app.use(cors());

// Health route
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "api",
  });
});

export default app;
