import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateOTP } from "../utils/otpgenerator.js";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";
import bcrypt from "bcrypt";
/**
 * POST /api/v1/otp/verify
 * Public route — no JWT required.
 * Accepts { userId, otp } in the body.
 */
export const verifyOtp = asyncHandler(async (req, res) => {
    const { userId, otp, type, } = req.body;
    if (!userId || !otp || !type) {
        throw new ApiError(400, "userId and otp are required");
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    // Find the latest non-expired, non-verified OTP for this user
    const otpRecord = await prisma.oTPVerification.findFirst({
        where: {
            userId,
            type,
            verified: false,
            expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
    });
    if (!otpRecord) {
        throw new ApiError(400, "No valid OTP found. Please request a new one.");
    }
    // Check max attempts
    if (otpRecord.attempts >= 5) {
        throw new ApiError(429, "Too many failed attempts. Please request a new OTP.");
    }
    // Compare hashed OTP using bcrypt
    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) {
        // Increment attempts counter
        await prisma.oTPVerification.update({
            where: { id: otpRecord.id },
            data: { attempts: otpRecord.attempts + 1 },
        });
        throw new ApiError(400, "Invalid OTP. Please try again.");
    }
    // OTP is correct — clean up
    if (type === "EMAIL_VERIFICATION") {
        // Mark user as verified
        await prisma.user.update({
            where: { id: userId },
            data: { verified: true },
        });
    }
    else if (type === "PASSWORD_RESET") {
        await prisma.oTPVerification.update({
            where: { id: otpRecord.id },
            data: { verified: true }
        });
        return res.status(200).json(new ApiResponse(200, {}, "OTP verified. You can now reset password."));
    }
    await prisma.oTPVerification.deleteMany({
        where: { userId, type },
    });
    // Generate tokens and log the user in
    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        name: user.name,
    });
    const refreshToken = generateRefreshToken({ id: user.id });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashedRefreshToken },
    });
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
        user: {
            name: user.name,
            email: user.email,
        },
        accessToken,
        refreshToken,
    }, "OTP verified successfully"));
});
/**
 * POST /api/v1/otp/resend
 * Public route — no JWT required.
 * Accepts { userId, email } in the body.
 */
export const resendOtp = asyncHandler(async (req, res) => {
    const { userId, email, type } = req.body;
    if (!userId || !email || !type) {
        throw new ApiError(400, "userId, email and type are required");
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    // Email verification check removed (no verified field on User)
    const otpResponse = await generateOTP({ id: userId, email, type });
    return res.status(200).json(new ApiResponse(200, otpResponse, "OTP resent successfully"));
});
//# sourceMappingURL=otpVerify.controller.js.map