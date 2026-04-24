import { Router } from "express";
import {
  handleRfidScan,
  getSlotMap,
  getActiveSession,
  manualEntry,
  manualExit,
  getSessionHistory,
} from "../controllers/parking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyApiKey } from "../middlewares/apiKey.middleware.js";
import { requireRole } from "../middlewares/rbac.middleware.js";

const router = Router();

// Hardware endpoint (API key auth)
router.post("/rfid-scan", verifyApiKey, handleRfidScan);

// Public slot map (for display boards)
router.get("/slot-map/:lotId", getSlotMap);

// Authenticated endpoints
router.get("/session/:vehicleId", verifyJWT, getActiveSession);
router.get("/history", verifyJWT, getSessionHistory);

// Security/Admin manual operations
router.post("/manual-entry", verifyJWT, requireRole("ADMIN", "SECURITY"), manualEntry);
router.post("/manual-exit", verifyJWT, requireRole("ADMIN", "SECURITY"), manualExit);

export default router;
