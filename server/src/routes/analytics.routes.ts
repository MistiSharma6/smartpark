import { Router } from "express";
import {
  getOccupancyHistory,
  getPeakHours,
  getRevenueStats,
  getPredictions,
  getAllHoursPrediction,
  getRecentLogs,
} from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/rbac.middleware.js";

const router = Router();

// All analytics routes require ADMIN role
router.get("/occupancy/:lotId", verifyJWT, requireRole("ADMIN"), getOccupancyHistory);
router.get("/peak-hours/:lotId", verifyJWT, requireRole("ADMIN"), getPeakHours);
router.get("/revenue/:lotId", verifyJWT, requireRole("ADMIN"), getRevenueStats);
router.get("/predictions/:lotId", verifyJWT, requireRole("ADMIN"), getPredictions);
router.get("/predictions-all/:lotId", verifyJWT, requireRole("ADMIN"), getAllHoursPrediction);
router.get("/logs/:lotId", verifyJWT, requireRole("ADMIN"), getRecentLogs);

export default router;
