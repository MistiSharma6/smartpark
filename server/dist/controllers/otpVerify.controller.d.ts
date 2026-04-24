/**
 * POST /api/v1/otp/verify
 * Public route — no JWT required.
 * Accepts { userId, otp } in the body.
 */
export declare const verifyOtp: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
/**
 * POST /api/v1/otp/resend
 * Public route — no JWT required.
 * Accepts { userId, email } in the body.
 */
export declare const resendOtp: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=otpVerify.controller.d.ts.map