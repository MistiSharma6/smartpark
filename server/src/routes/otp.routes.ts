import { Router } from "express";
import { verifyOtp, resendOtp } from "../controllers/otpVerify.controller.js";

const router = Router();

// Public routes — no JWT required
router.route("/verify").post(verifyOtp);
router.route("/resend").post(resendOtp);

export default router;
