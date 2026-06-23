import { fetchWithAuth } from "./auth.service";
import { Workspace, CreateWorkspaceInput, UpdateWorkspaceInput } from "../types/workspace";

export const workspaceService = {
  async createWorkspace(input: CreateWorkspaceInput): Promise<Workspace> {
    const data = await fetchWithAuth("/workspaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return data.data.workspace;
  },

  async getWorkspaces(): Promise<Workspace[]> {
    const data = await fetchWithAuth("/workspaces", {
      method: "GET",
    });
    return data.data.workspaces;
  },

  async getWorkspaceById(workspaceId: string): Promise<Workspace> {
    const data = await fetchWithAuth(`/workspaces/${workspaceId}`, {
      method: "GET",
    });
    return data.data.workspace;
  },

  async updateWorkspace(workspaceId: string, input: UpdateWorkspaceInput): Promise<Workspace> {
    const data = await fetchWithAuth(`/workspaces/${workspaceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return data.data.workspace;
  },

  async deleteWorkspace(workspaceId: string): Promise<void> {
    await fetchWithAuth(`/workspaces/${workspaceId}`, {
      method: "DELETE",
    });
  },
};
