import crypto from "crypto";
import { ApiError } from "./ApiError.js";
const IV_LENGTH = 16;
const getEncryptionKey = () => {
    const keyHex = process.env.PORTAL_ENCRYPTION_KEY;
    if (!keyHex) {
        throw new Error("PORTAL_ENCRYPTION_KEY not set");
    }
    const key = Buffer.from(keyHex, "hex"); // must be 32 bytes
    // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    if (key.length !== 32) {
        throw new Error("PORTAL_ENCRYPTION_KEY must be 32 bytes (64 hex chars)");
    }
    return key;
};
export const encryptPassword = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", getEncryptionKey(), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};
export const decryptPassword = (text) => {
    try {
        const parts = text.split(":");
        if (parts.length !== 2) {
            throw new ApiError(400, "Invalid encrypted text format");
        }
        const [ivHex, encryptedHex] = parts;
        if (!ivHex || !encryptedHex) {
            throw new ApiError(400, "Invalid encrypted text");
        }
        const iv = Buffer.from(ivHex, "hex");
        const encryptedBuffer = Buffer.from(encryptedHex, "hex");
        const decipher = crypto.createDecipheriv("aes-256-cbc", getEncryptionKey(), iv);
        const decrypted = Buffer.concat([
            decipher.update(encryptedBuffer),
            decipher.final()
        ]);
        return decrypted.toString("utf-8");
    }
    catch (error) {
        throw new ApiError(400, "Failed to decrypt password");
    }
};
//# sourceMappingURL=crypto.js.map