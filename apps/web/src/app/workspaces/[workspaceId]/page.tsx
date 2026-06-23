"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SingleWorkspacePage() {
  const { workspaceId } = useParams();
  const router = useRouter();
  const { currentWorkspace, isLoading, error, loadWorkspaceById } = useWorkspaces();

  useEffect(() => {
    if (typeof workspaceId === "string") {
      loadWorkspaceById(workspaceId);
    }
  }, [workspaceId, loadWorkspaceById]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading workspace...</p>
      </div>
    );
  }

  if (error || !currentWorkspace) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <p className="text-destructive font-medium">{error || "Workspace not found"}</p>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col p-8 md:p-16 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground" onClick={() => router.push("/dashboard")}>
            ← Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold tracking-tight">{currentWorkspace.name}</h1>
          {currentWorkspace.description && (
            <p className="text-xl text-muted-foreground mt-2">{currentWorkspace.description}</p>
          )}
          <div className="text-sm text-muted-foreground mt-4 space-x-4">
            <span>Members: {currentWorkspace.members.length}</span>
            <span>Created: {new Date(currentWorkspace.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="opacity-70">
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Upload and manage knowledge base documents (Coming soon)</CardDescription>
          </CardHeader>
        </Card>

        <Card className="opacity-70">
          <CardHeader>
            <CardTitle>Meetings</CardTitle>
            <CardDescription>Transcribe and analyze meeting intelligence (Coming soon)</CardDescription>
          </CardHeader>
        </Card>

        <Card className="opacity-70">
          <CardHeader>
            <CardTitle>Repositories</CardTitle>
            <CardDescription>Connect GitHub repositories for codebase search (Coming soon)</CardDescription>
          </CardHeader>
        </Card>

        <Card className="opacity-70">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Chat with your workspace knowledge (Coming soon)</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
