/**
 * Parking Controller
 *
 * Handles RFID scan entry/exit, session management, and slot assignment.
 * This is the main controller that the ESP32 hardware communicates with.
 */
export declare const handleRfidScan: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const getSlotMap: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const getActiveSession: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const manualEntry: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const manualExit: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const getSessionHistory: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=parking.controller.d.ts.map