/**
 * API Key Middleware for Hardware (ESP32) Authentication
 *
 * Instead of JWT, the ESP32 sends an API key in the X-API-Key header.
 * The key is stored in the HARDWARE_API_KEY environment variable.
 */
import type { Request, Response, NextFunction } from "express";
export declare function verifyApiKey(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=apiKey.middleware.d.ts.map