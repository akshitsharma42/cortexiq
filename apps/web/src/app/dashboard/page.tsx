"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { WorkspaceCard } from "@/components/workspace/WorkspaceCard";
import { CreateWorkspaceModal } from "@/components/workspace/CreateWorkspaceModal";
import { EditWorkspaceModal } from "@/components/workspace/EditWorkspaceModal";
import { Workspace } from "@/types/workspace";

export default function DashboardPage() {
  const { user } = useAuth();
  const { workspaces, isLoading, loadWorkspaces, deleteWorkspace } = useWorkspaces();
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteWorkspace(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-8 md:p-16 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to CortexIQ</h1>
          <p className="text-muted-foreground mt-1">
            Hello, {user?.name || user?.email || "User"}. Here are your workspaces.
          </p>
        </div>
        <CreateWorkspaceModal onCreated={loadWorkspaces} />
      </div>

      {isLoading && workspaces.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-muted-foreground">Loading workspaces...</p>
        </div>
      ) : workspaces.length === 0 ? (
        <div className="text-center py-20 border rounded-xl border-dashed">
          <h3 className="text-lg font-medium mb-2">No workspaces found</h3>
          <p className="text-muted-foreground mb-4">Create your first workspace to get started.</p>
          <CreateWorkspaceModal onCreated={loadWorkspaces} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws._id}
              workspace={ws}
              onEdit={setEditingWorkspace}
              onDelete={handleDelete}
              isDeleting={deletingId === ws._id}
            />
          ))}
        </div>
      )}

      <EditWorkspaceModal
        workspace={editingWorkspace}
        open={!!editingWorkspace}
        onOpenChange={(open) => !open && setEditingWorkspace(null)}
        onUpdated={loadWorkspaces}
      />
    </div>
  );
}
