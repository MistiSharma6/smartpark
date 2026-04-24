/**
 * Role-Based Access Control Middleware
 *
 * Usage:
 *   router.post("/admin-only", verifyJWT, requireRole("ADMIN"), handler)
 *   router.post("/staff", verifyJWT, requireRole("ADMIN", "SECURITY"), handler)
 */
import { ApiError } from "../utils/ApiError.js";
export function requireRole(...allowedRoles) {
    return (req, _res, next) => {
        const user = req.user;
        if (!user) {
            throw new ApiError(401, "Authentication required");
        }
        if (!allowedRoles.includes(user.role)) {
            throw new ApiError(403, `Access denied. Required role(s): ${allowedRoles.join(", ")}`);
        }
        next();
    };
}
//# sourceMappingURL=rbac.middleware.js.map