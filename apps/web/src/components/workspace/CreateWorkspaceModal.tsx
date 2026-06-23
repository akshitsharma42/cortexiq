"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaces } from "@/hooks/useWorkspaces";

export function CreateWorkspaceModal({ onCreated }: { onCreated?: () => void }) {
  const { createWorkspace, isLoading, error } = useWorkspaces();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWorkspace({ name, description });
      setOpen(false);
      setName("");
      setDescription("");
      if (onCreated) onCreated();
    } catch (err) {
      // Error is handled in the hook and displayed below
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Workspace</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to organize your documents, repositories, and conversations.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {error && <div className="text-sm font-medium text-destructive">{error}</div>}
            <div className="grid gap-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Engineering Team"
                required
                minLength={3}
                maxLength={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this workspace for?"
                maxLength={500}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || name.length < 3}>
              {isLoading ? "Creating..." : "Create Workspace"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
