import { CreateWorkspaceInput, UpdateWorkspaceInput } from "@cortexiq/shared-types";
import Workspace, { IWorkspaceDocument } from "../../models/workspace.model";
import { AppError } from "../../middleware/error.middleware";

export const createWorkspace = async (
  input: CreateWorkspaceInput,
  userId: string
): Promise<IWorkspaceDocument> => {
  const workspace = new Workspace({
    ...input,
    ownerId: userId,
    members: [
      {
        userId,
        role: "owner",
      },
    ],
  });

  await workspace.save();
  return workspace;
};

export const getUserWorkspaces = async (userId: string): Promise<IWorkspaceDocument[]> => {
  // Find workspaces where the user is in the members array
  return Workspace.find({ "members.userId": userId }).sort({ createdAt: -1 });
};

export const getWorkspaceById = async (workspaceId: string): Promise<IWorkspaceDocument> => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new AppError(404, "Workspace not found");
  }
  return workspace;
};

export const updateWorkspace = async (
  workspaceId: string,
  input: UpdateWorkspaceInput
): Promise<IWorkspaceDocument> => {
  const workspace = await Workspace.findByIdAndUpdate(
    workspaceId,
    { $set: input },
    { new: true, runValidators: true }
  );

  if (!workspace) {
    throw new AppError(404, "Workspace not found");
  }

  return workspace;
};

export const deleteWorkspace = async (workspaceId: string): Promise<void> => {
  const result = await Workspace.findByIdAndDelete(workspaceId);
  if (!result) {
    throw new AppError(404, "Workspace not found");
  }
};
