declare class ApiError extends Error {
    statusCode: number;
    success: boolean;
    errors: any[];
    data: any;
    constructor(statusCode: number, message?: string, errors?: any[], stack?: string);
}
export { ApiError };
//# sourceMappingURL=ApiError.d.ts.map