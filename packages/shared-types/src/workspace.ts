/**
 * Workspace entity types.
 * Placeholder — schemas will be defined in the workspace phase.
 */

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  joinedAt: string;
}

export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";
