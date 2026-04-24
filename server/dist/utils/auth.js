import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const getAccessTokenSecret = () => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret)
        throw new Error("ACCESS_TOKEN_SECRET is not configured");
    return secret;
};
const getRefreshTokenSecret = () => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret)
        throw new Error("REFRESH_TOKEN_SECRET is not configured");
    return secret;
};
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
export const comparePassword = async (password, hashed) => {
    return await bcrypt.compare(password, hashed);
};
export const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
    }, getAccessTokenSecret(), {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "1h"),
    });
};
export const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
    }, getRefreshTokenSecret(), {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d"),
    });
};
//# sourceMappingURL=auth.js.map