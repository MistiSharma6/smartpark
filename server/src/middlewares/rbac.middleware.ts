/**
 * Role-Based Access Control Middleware
 *
 * Usage:
 *   router.post("/admin-only", verifyJWT, requireRole("ADMIN"), handler)
 *   router.post("/staff", verifyJWT, requireRole("ADMIN", "SECURITY"), handler)
 */

import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!allowedRoles.includes(user.role)) {
      throw new ApiError(
        403,
        `Access denied. Required role(s): ${allowedRoles.join(", ")}`
      );
    }

    next();
  };
}
