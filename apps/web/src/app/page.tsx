import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center px-4 md:px-6 border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold tracking-tight text-xl">CortexIQ</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/login"
          >
            Login
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="space-y-6 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            AI Operating System for Organizational Knowledge
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Centralize your documents, meetings, and repositories into a single
            intelligent workspace.
          </p>
          <div className="flex justify-center">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
