import { Request, Response, NextFunction } from "express";
import { AppError } from "./error.middleware";
import Workspace, { IWorkspaceDocument } from "../models/workspace.model";
import { AuthRequest } from "./auth.middleware";

// Extend AuthRequest to include the workspace
export interface WorkspaceRequest extends AuthRequest {
  workspace?: IWorkspaceDocument;
}

export const loadWorkspaceAndVerifyMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceReq = req as WorkspaceRequest;
    const workspaceId = workspaceReq.params.workspaceId;
    if (!workspaceId) {
      throw new AppError(400, "Workspace ID is required");
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new AppError(404, "Workspace not found");
    }

    // Verify membership
    const userId = workspaceReq.user?._id?.toString();
    if (!userId) {
      throw new AppError(401, "Not authenticated");
    }

    const isMember = workspace.members.some((member) => member.userId === userId);
    if (!isMember) {
      throw new AppError(403, "Not authorized to access this workspace");
    }

    // Attach workspace to request for downstream usage
    workspaceReq.workspace = workspace;
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyWorkspaceOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceReq = req as WorkspaceRequest;
    const workspace = workspaceReq.workspace;
    const userId = workspaceReq.user?._id?.toString();

    if (!workspace || !userId) {
      throw new AppError(500, "Workspace or User not loaded in request");
    }

    const isOwner = workspace.ownerId === userId;
    if (!isOwner) {
      throw new AppError(403, "Only the workspace owner can perform this action");
    }

    next();
  } catch (error) {
    next(error);
  }
};
