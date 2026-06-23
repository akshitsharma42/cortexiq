import { Router, type IRouter } from "express";
import * as workspaceController from "./workspace.controller";
import { authenticate } from "../../middleware/auth.middleware";
import {
  loadWorkspaceAndVerifyMember,
  verifyWorkspaceOwner,
} from "../../middleware/workspace.middleware";

const router: IRouter = Router();

// All workspace routes require authentication
router.use(authenticate);

// ── Workspace Collection ────────────────────
router.post("/", workspaceController.createWorkspace);
router.get("/", workspaceController.getWorkspaces);

// ── Single Workspace ────────────────────────
// Use middleware to load workspace and verify the user is a member
router.get(
  "/:workspaceId",
  loadWorkspaceAndVerifyMember,
  workspaceController.getWorkspaceById
);

// Only owner can update for now (or admins, but we verify owner strictly for now based on spec)
router.patch(
  "/:workspaceId",
  loadWorkspaceAndVerifyMember,
  verifyWorkspaceOwner,
  workspaceController.updateWorkspace
);

// Only owner can delete
router.delete(
  "/:workspaceId",
  loadWorkspaceAndVerifyMember,
  verifyWorkspaceOwner,
  workspaceController.deleteWorkspace
);

export default router;
