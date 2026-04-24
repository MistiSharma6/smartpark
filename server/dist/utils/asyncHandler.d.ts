import express from 'express';
declare const asyncHandler: (requestHandler: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>) => (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export { asyncHandler };
//# sourceMappingURL=asyncHandler.d.ts.map