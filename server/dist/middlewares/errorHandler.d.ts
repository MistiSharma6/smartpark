/**
 * Global Error Handler Middleware
 *
 * Catches all errors (including ApiError) and returns a uniform JSON response.
 * Must be registered AFTER all routes in app.ts.
 */
import type { Request, Response, NextFunction } from "express";
export declare function globalErrorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=errorHandler.d.ts.map