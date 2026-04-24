declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
            };
        }
    }
}
declare const registerUser: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
declare const loginUser: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
declare const logoutUser: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
declare const refreshAccessToken: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
declare const changeCurrentPassword: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
declare const getCurrentUser: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
declare const updateAccountDetails: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails };
//# sourceMappingURL=user.controller.d.ts.map