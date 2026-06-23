"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { Workspace } from "@/types/workspace";

export function EditWorkspaceModal({
  workspace,
  open,
  onOpenChange,
  onUpdated,
}: {
  workspace: Workspace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: () => void;
}) {
  const { updateWorkspace, isLoading, error } = useWorkspaces();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (workspace && open) {
      setName(workspace.name);
      setDescription(workspace.description || "");
    }
  }, [workspace, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace) return;
    try {
      await updateWorkspace(workspace._id, { name, description });
      onOpenChange(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Workspace</DialogTitle>
            <DialogDescription>Update the details of your workspace.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {error && <div className="text-sm font-medium text-destructive">{error}</div>}
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Workspace Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Engineering Team"
                required
                minLength={3}
                maxLength={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description (Optional)</Label>
              <Input
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this workspace for?"
                maxLength={500}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || name.length < 3}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
