/**
 * Slot Controller
 *
 * CRUD operations for parking slots:
 *   - createSlots   — bulk-create slots for a lot
 *   - updateSlot    — update an individual slot
 *   - getSlotsByLot — list all slots in a lot
 *   - getOccupancyStats — occupancy statistics for a lot
 */
export declare const createSlots: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const updateSlot: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const getSlotsByLot: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
export declare const getOccupancyStats: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=slot.controller.d.ts.map