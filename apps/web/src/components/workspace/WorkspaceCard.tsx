"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workspace } from "@/types/workspace";

interface WorkspaceCardProps {
  workspace: Workspace;
  onEdit: (workspace: Workspace) => void;
  onDelete: (workspaceId: string) => void;
  isDeleting: boolean;
}

export function WorkspaceCard({ workspace, onEdit, onDelete, isDeleting }: WorkspaceCardProps) {
  const router = useRouter();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{workspace.name}</CardTitle>
        {workspace.description && (
          <CardDescription className="line-clamp-2">{workspace.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Members: {workspace.members.length}</p>
          <p>Created: {new Date(workspace.createdAt).toLocaleDateString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end border-t pt-4">
        {isConfirmingDelete ? (
          <>
            <Button variant="outline" size="sm" onClick={() => setIsConfirmingDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" disabled={isDeleting} onClick={() => onDelete(workspace._id)}>
              {isDeleting ? "Deleting..." : "Confirm"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => onEdit(workspace)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setIsConfirmingDelete(true)}>
              Delete
            </Button>
            <Button size="sm" onClick={() => router.push(`/workspaces/${workspace._id}`)}>
              Open
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
