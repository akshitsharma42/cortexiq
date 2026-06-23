import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Zod validation errors → 400
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((e: any) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  // Mongoose duplicate key → 409
  if (err.code === 11000) {
    res.status(409).json({
      success: false,
      message: "Resource already exists",
    });
    return;
  }

  // Known errors with statusCode
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  // Log 500s for debugging
  if (statusCode === 500) {
    console.error("[error]", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}
