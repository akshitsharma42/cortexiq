import { useState, useCallback } from "react";
import { workspaceService } from "../services/workspace.service";
import { Workspace, CreateWorkspaceInput, UpdateWorkspaceInput } from "../types/workspace";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWorkspaces = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await workspaceService.getWorkspaces();
      setWorkspaces(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadWorkspaceById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await workspaceService.getWorkspaceById(id);
      setCurrentWorkspace(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createWorkspace = async (input: CreateWorkspaceInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const newWorkspace = await workspaceService.createWorkspace(input);
      setWorkspaces((prev) => [newWorkspace, ...prev]);
      return newWorkspace;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateWorkspace = async (id: string, input: UpdateWorkspaceInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await workspaceService.updateWorkspace(id, input);
      setWorkspaces((prev) => prev.map((w) => (w._id === id ? updated : w)));
      if (currentWorkspace?._id === id) {
        setCurrentWorkspace(updated);
      }
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorkspace = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await workspaceService.deleteWorkspace(id);
      setWorkspaces((prev) => prev.filter((w) => w._id !== id));
      if (currentWorkspace?._id === id) {
        setCurrentWorkspace(null);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    workspaces,
    currentWorkspace,
    isLoading,
    error,
    loadWorkspaces,
    loadWorkspaceById,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
  };
}
