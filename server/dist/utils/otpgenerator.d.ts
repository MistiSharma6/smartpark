export declare const generateOTP: ({ id, email, type }: {
    id: string;
    email: string;
    type: "EMAIL_VERIFICATION" | "PASSWORD_RESET";
}) => Promise<{
    status: string;
    message: string;
    data: {
        userId: string;
        email: string;
    };
}>;
//# sourceMappingURL=otpgenerator.d.ts.map