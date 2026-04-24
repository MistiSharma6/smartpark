/**
 * API Key Middleware for Hardware (ESP32) Authentication
 *
 * Instead of JWT, the ESP32 sends an API key in the X-API-Key header.
 * The key is stored in the HARDWARE_API_KEY environment variable.
 */
import { ApiError } from "../utils/ApiError.js";
export function verifyApiKey(req, _res, next) {
    const apiKey = req.header("X-API-Key");
    if (!apiKey) {
        throw new ApiError(401, "API key required. Pass it in X-API-Key header.");
    }
    const validKey = process.env.HARDWARE_API_KEY;
    if (!validKey) {
        throw new ApiError(500, "Server API key not configured");
    }
    if (apiKey !== validKey) {
        throw new ApiError(403, "Invalid API key");
    }
    next();
}
//# sourceMappingURL=apiKey.middleware.js.map