import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /health
 * Health check endpoint — used by load balancers, Docker, and monitoring.
 */
router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "api",
  });
});

export default router;
