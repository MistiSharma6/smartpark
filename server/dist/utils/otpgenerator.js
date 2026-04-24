import { prisma } from "../lib/prisma.js";
import { ApiError } from "./ApiError.js";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import crypto from "crypto";
const resend = new Resend(process.env.RESEND_API_KEY);
export const generateOTP = async ({ id, email, type }) => {
    try {
        const now = new Date();
        // 1. Check last OTP (cooldown: 60 sec)
        const lastOTP = await prisma.oTPVerification.findFirst({
            where: { userId: id, type: type },
            orderBy: { createdAt: "desc" }
        });
        if (lastOTP) {
            const diff = now.getTime() - new Date(lastOTP.createdAt).getTime();
            if (diff < 60 * 1000) {
                throw new ApiError(429, "Please wait 60 seconds before requesting another OTP.");
            }
        }
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const otpCount = await prisma.oTPVerification.count({
            where: {
                userId: id,
                type,
                createdAt: {
                    gte: tenMinutesAgo
                }
            }
        });
        if (otpCount >= 5) {
            throw new ApiError(429, "Too many OTP requests. Try again after 10 minutes.");
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        await prisma.oTPVerification.deleteMany({
            where: {
                userId: id,
                type
            }
        });
        const subject = (type === "EMAIL_VERIFICATION") ? "Verify your email" : "Reset your password";
        const title = type === "EMAIL_VERIFICATION" ? "Verify your email" : "Reset your password";
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const otpRecord = await prisma.oTPVerification.create({
            data: {
                userId: id,
                otp: hashedOTP,
                type,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            }
        });
        try {
            const { error } = await resend.emails.send({
                from: "SmartPark <noreply@adixdevs.xyz>",
                to: email,
                subject: subject,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2>${title}</h2>
                        <p>Your OTP is: <strong style="font-size: 24px; color: #4A90E2;">${otp}</strong></p>
                        <p>This code will expire in <strong>10 minutes</strong>.</p>
                    </div>
                `
            });
            if (error)
                throw new Error(error.message);
        }
        catch (err) {
            // rollback
            console.error(err);
            await prisma.oTPVerification.delete({
                where: { id: otpRecord.id }
            });
            throw new ApiError(500, "Failed to send email");
        }
        return {
            status: "Pending",
            message: "OTP sent successfully",
            data: {
                userId: id,
                email
            }
        };
    }
    catch (error) {
        console.error("OTP Generation Error:", error);
        if (error instanceof ApiError) {
            throw error; // preserve original error
        }
        throw new ApiError(500, "Failed to send verification code. Please try again.");
    }
};
//# sourceMappingURL=otpgenerator.js.map