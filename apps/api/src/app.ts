import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";

const app: Express = express();

// ── Security Middleware ─────────────────────
app.use(helmet());
app.use(cors());

// ── Body Parsing ────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────
app.use(routes);

export default app;
