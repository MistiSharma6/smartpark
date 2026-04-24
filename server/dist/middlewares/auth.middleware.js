import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
export const verifyJWT = asyncHandler(async (req, _res, next) => {
    try {
        const token = req.cookies?.accessToken ||
            req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new ApiError(500, "Access token secret not configured");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decodedToken?.id },
            select: { id: true, email: true, name: true, role: true },
        });
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
//# sourceMappingURL=auth.middleware.js.map