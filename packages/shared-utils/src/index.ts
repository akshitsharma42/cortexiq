/**
 * @cortexiq/shared-utils
 *
 * Common utility functions shared across CortexIQ services.
 * Add formatters, validators, and helpers here.
 */

/**
 * Format a Date object to ISO 8601 string in UTC.
 */
export function toISOString(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Sleep for a given number of milliseconds.
 * Useful for retry logic and rate limiting.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a simple correlation ID for request tracing.
 * Will be replaced with a proper UUID library later.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
