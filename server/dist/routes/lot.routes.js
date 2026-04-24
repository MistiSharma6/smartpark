import { Router } from "express";
import { createLot, updateLot, getLots, getLot, setupGraph, } from "../controllers/lot.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/rbac.middleware.js";
const router = Router();
// Public — list lots
router.get("/", getLots);
router.get("/:id", getLot);
// Admin only
router.post("/create", verifyJWT, requireRole("ADMIN"), createLot);
router.patch("/:id", verifyJWT, requireRole("ADMIN"), updateLot);
router.post("/:id/graph", verifyJWT, requireRole("ADMIN"), setupGraph);
export default router;
//# sourceMappingURL=lot.routes.js.map