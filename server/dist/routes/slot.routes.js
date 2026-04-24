import { Router } from "express";
import { createSlots, updateSlot, getSlotsByLot, getOccupancyStats, } from "../controllers/slot.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/rbac.middleware.js";
const router = Router();
// Admin only
router.post("/bulk-create", verifyJWT, requireRole("ADMIN"), createSlots);
router.patch("/:id", verifyJWT, requireRole("ADMIN"), updateSlot);
// Authenticated
router.get("/lot/:lotId", verifyJWT, getSlotsByLot);
router.get("/stats/:lotId", verifyJWT, getOccupancyStats);
export default router;
//# sourceMappingURL=slot.routes.js.map