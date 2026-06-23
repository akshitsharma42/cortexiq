export interface WorkspaceMember {
  userId: string;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
}

export interface Workspace {
  _id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: WorkspaceMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
}
