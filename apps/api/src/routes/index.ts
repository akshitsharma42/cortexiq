import { Router, type IRouter, Request, Response } from "express";
import authRoutes from "../modules/auth/auth.route";
import workspaceRoutes from "../modules/workspace/workspace.route";

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
router.use("/api/v1/workspaces", workspaceRoutes);

export default router;
