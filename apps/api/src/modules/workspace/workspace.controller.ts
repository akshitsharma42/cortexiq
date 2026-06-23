import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { WorkspaceRequest } from "../../middleware/workspace.middleware";
import * as workspaceService from "./workspace.service";
import { createWorkspaceSchema, updateWorkspaceSchema } from "./workspace.validation";
import { AppError } from "../../middleware/error.middleware";

export const createWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?._id?.toString();
    if (!userId) {
      throw new AppError(401, "Not authenticated");
    }

    const parsed = createWorkspaceSchema.safeParse(req);
    if (!parsed.success) {
      throw new AppError(400, "Validation Error", parsed.error.issues);
    }

    const workspace = await workspaceService.createWorkspace(parsed.data.body, userId);
    
    console.log("createWorkspace -> userId:", userId);
    console.log("createWorkspace -> workspace:", workspace);

    res.status(201).json({
      success: true,
      data: {
        workspace,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?._id?.toString();
    if (!userId) {
      throw new AppError(401, "Not authenticated");
    }

    const workspaces = await workspaceService.getUserWorkspaces(userId);

    console.log("getWorkspaces -> userId:", userId);
    console.log("getWorkspaces -> workspaces:", workspaces);

    res.status(200).json({
      success: true,
      data: {
        workspaces,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceReq = req as WorkspaceRequest;
    const workspace = workspaceReq.workspace;

    res.status(200).json({
      success: true,
      data: {
        workspace,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceId = req.params.workspaceId as string;

    const parsed = updateWorkspaceSchema.safeParse(req);
    if (!parsed.success) {
      throw new AppError(400, "Validation Error", parsed.error.issues);
    }

    const workspace = await workspaceService.updateWorkspace(workspaceId, parsed.data.body);

    res.status(200).json({
      success: true,
      data: {
        workspace,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceId = req.params.workspaceId as string;

    await workspaceService.deleteWorkspace(workspaceId);

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
