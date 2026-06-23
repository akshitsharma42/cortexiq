"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center max-w-md w-full p-8 border rounded-xl shadow-sm bg-card">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to CortexIQ</h1>
        <p className="text-muted-foreground">
          You are authenticated as <span className="font-medium text-foreground">{user?.name || user?.email || "User"}</span>.
        </p>
        <div className="pt-4">
          <Button onClick={logout} variant="destructive" className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
