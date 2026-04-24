import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { registerUserSchema, loginUserSchema, updateUserSchema } from "../schemas/user.schema.js";
import { generateAccessToken, generateRefreshToken, hashPassword, comparePassword } from "../utils/auth.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { generateOTP } from "../utils/otpgenerator.js";
import bcrypt from "bcrypt";
const generateAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = generateAccessToken({ id: user.id, email: user.email, name: user.name });
        const refreshToken = generateRefreshToken({ id: user.id });
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRefreshToken }
        });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while generating refresh and access token");
    }
};
const registerUser = asyncHandler(async (req, res) => {
    if (!registerUserSchema.safeParse(req.body).success) {
        throw new ApiError(400, "All fields are required or Invalid Input");
    }
    const { name, email, password, phone } = req.body;
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await prisma.user.findFirst({
        where: { email }
    });
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            phone: phone || null,
            passwordHash: await hashPassword(password),
            verified: false,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    });
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    // Send OTP for email verification
    try {
        await generateOTP({ id: createdUser.id, email: createdUser.email, type: "EMAIL_VERIFICATION" });
    }
    catch (otpError) {
        // Don't fail registration if OTP send fails — user can resend later
        console.error("Failed to send verification OTP:", otpError?.message);
    }
    return res.status(201).json(new ApiResponse(201, {
        userId: createdUser.id,
        email: createdUser.email,
        requiresVerification: true,
    }, "Account created! Please verify your email with the OTP sent."));
});
const loginUser = asyncHandler(async (req, res) => {
    if (!loginUserSchema.safeParse(req.body).success) {
        throw new ApiError(400, "All fields are required or Invalid Input");
    }
    const { email, password } = req.body;
    if (!password || !email) {
        throw new ApiError(400, "Email and password are required");
    }
    const user = await prisma.user.findFirst({
        where: { email },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            passwordHash: true,
            verified: true
        }
    });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }
    // Check if user is verified
    if (!user.verified) {
        // Send a fresh OTP for verification
        try {
            await generateOTP({ id: user.id, email: user.email, type: "EMAIL_VERIFICATION" });
        }
        catch (otpError) {
            if (otpError instanceof ApiError && otpError.statusCode === 429) {
                return res.status(403).json(new ApiResponse(403, { requiresVerification: true, userId: user.id, email: user.email }, "Account not verified. Please check your email for the existing OTP or wait before requesting a new one."));
            }
            console.error("Failed to send verification OTP:", otpError?.message);
        }
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);
    const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const isProd = process.env.NODE_ENV === "production";
    const options = {
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? "none" : "lax")
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
        user: loggedInUser, accessToken, refreshToken
    }, "User logged In Successfully"));
});
const logoutUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized request");
    }
    await prisma.user.update({
        where: { id: req.user.id },
        data: { refreshToken: null }
    });
    const isProd = process.env.NODE_ENV === "production";
    const options = {
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? "none" : "lax")
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
        where: { id: decodedToken.id }
    });
    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }
    const isValid = await bcrypt.compare(incomingRefreshToken, user.refreshToken);
    if (!isValid)
        throw new ApiError(401, "Refresh token is expired or used");
    const isProd = process.env.NODE_ENV === "production";
    const options = {
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? "none" : "lax")
    };
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user);
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "All fields are required");
    }
    if (newPassword.length < 6) {
        throw new ApiError(400, "New password must be at least 6 characters long");
    }
    if (!req.user) {
        throw new ApiError(401, "Unauthorized request");
    }
    const user = await prisma.user.findUnique({
        where: { id: req.user.id }
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordCorrect = await comparePassword(oldPassword, user.passwordHash);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }
    const newHashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
        where: { id: req.user.id },
        data: {
            passwordHash: newHashedPassword,
            refreshToken: null
        }
    });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
});
const updateAccountDetails = asyncHandler(async (req, res) => {
    if (!updateUserSchema.safeParse(req.body).success) {
        throw new ApiError(400, "Invalid Input");
    }
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
        throw new ApiError(400, "At least one field is required to update");
    }
    if (!req.user) {
        throw new ApiError(401, "Unauthorized request");
    }
    try {
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(phone !== undefined && { phone }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
            }
        });
        return res
            .status(200)
            .json(new ApiResponse(200, user, "Account details updated successfully"));
    }
    catch (error) {
        if (error.code === "P2002") {
            throw new ApiError(409, "Email already exists");
        }
        throw new ApiError(500, error?.message || "Something went wrong while updating account details");
    }
});
export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails };
//# sourceMappingURL=user.controller.js.map