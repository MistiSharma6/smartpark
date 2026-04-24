/**
 * Role-Based Access Control Middleware
 *
 * Usage:
 *   router.post("/admin-only", verifyJWT, requireRole("ADMIN"), handler)
 *   router.post("/staff", verifyJWT, requireRole("ADMIN", "SECURITY"), handler)
 */
import type { Request, Response, NextFunction } from "express";
export declare function requireRole(...allowedRoles: string[]): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=rbac.middleware.d.ts.map