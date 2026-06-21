/**
 * @cortexiq/shared-types
 *
 * Shared TypeScript type definitions used across all CortexIQ services.
 * Add entity interfaces, API contracts, and common types here.
 */

// ── API Response ────────────────────────────
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

// ── Health Check ────────────────────────────
export interface HealthCheckResponse {
  status: "ok" | "degraded" | "down";
  service: string;
  timestamp: string;
}
