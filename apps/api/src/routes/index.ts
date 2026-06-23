import { Router, type IRouter, Request, Response } from "express";
import authRoutes from "../modules/auth/auth.route";

const router: IRouter = Router();

// ── Health Check ────────────────────────────
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "api",
  });
});

// ── API v1 Routes ───────────────────────────
router.use("/api/v1/auth", authRoutes);

export default router;
