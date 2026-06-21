/**
 * @cortexiq/shared-types
 *
 * Shared TypeScript type definitions used across all CortexIQ services.
 * Each entity has its own file; this barrel re-exports everything.
 */

// ── Entities ────────────────────────────────
export * from "./user";
export * from "./workspace";
export * from "./document";

// ── API Contracts ───────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface HealthCheckResponse {
  status: "ok" | "degraded" | "down";
  service: string;
  timestamp?: string;
}
