import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import type { Request, Response, NextFunction } from "express";

type JwtPayloadType = {
  id: string;
  email: string;
};

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const verifyJWT = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token =
        (req as any).cookies?.accessToken ||
        req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }

      if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new ApiError(500, "Access token secret not configured");
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as JwtPayloadType;

      const user = await prisma.user.findUnique({
        where: { id: decodedToken?.id },
        select: { id: true, email: true, name: true, role: true },
      });

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      (req as any).user = user;
      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);