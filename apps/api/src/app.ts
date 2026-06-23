import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app: Express = express();

// ── Security Middleware ─────────────────────
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// ── Body Parsing ────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────
app.use(routes);

// ── Global Error Handler ────────────────────
// Must be AFTER routes — Express identifies error handlers by 4-arg signature
app.use(errorHandler);

export default app;
