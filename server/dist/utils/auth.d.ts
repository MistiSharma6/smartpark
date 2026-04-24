export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashed: string) => Promise<boolean>;
export declare const generateAccessToken: (user: {
    id: string;
    email: string;
    name: string;
}) => string;
export declare const generateRefreshToken: (user: {
    id: string;
}) => string;
//# sourceMappingURL=auth.d.ts.map