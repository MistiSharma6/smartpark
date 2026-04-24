import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

const getAccessTokenSecret = (): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error("ACCESS_TOKEN_SECRET is not configured");
  return secret;
};

const getRefreshTokenSecret = (): string => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error("REFRESH_TOKEN_SECRET is not configured");
  return secret;
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async ( password: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashed);
};

export const generateAccessToken = (user: { id: string; email: string; name: string }): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    getAccessTokenSecret(),
    {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "1h") as StringValue,
    }
  );
};

export const generateRefreshToken = (user: { id: string }): string => {
  return jwt.sign(
    {
      id: user.id,
    },
    getRefreshTokenSecret(),
    {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d") as StringValue,
    }
  );
};