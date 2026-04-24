/**
 * Global Error Handler Middleware
 *
 * Catches all errors (including ApiError) and returns a uniform JSON response.
 * Must be registered AFTER all routes in app.ts.
 */

import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Handle our custom ApiError
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  // Handle Prisma errors
  if ((err as any).code === "P2002") {
    res.status(409).json({
      success: false,
      statusCode: 409,
      message: "A record with this value already exists",
      errors: [],
    });
    return;
  }

  if ((err as any).code === "P2025") {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Record not found",
      errors: [],
    });
    return;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid token",
      errors: [],
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Token expired",
      errors: [],
    });
    return;
  }

  // Default server error
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error",
    errors: [],
  });
}
