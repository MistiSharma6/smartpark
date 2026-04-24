/**
 * Analytics Controller
 *
 * Provides occupancy history, peak hours, revenue stats, and predictions.
 */
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../lib/prisma.js";
import { analyzePeakHours, predictOccupancy, getRevenueStatistics, } from "../engines/predictor.js";
// ── Occupancy History ────────────────────────────────────────
export const getOccupancyHistory = asyncHandler(async (req, res) => {
    const lotId = req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const daysBack = parseInt(req.query.days) || 7;
    const since = new Date();
    since.setDate(since.getDate() - daysBack);
    const history = await prisma.parkingAnalytics.findMany({
        where: {
            lotId,
            timestamp: { gte: since },
        },
        orderBy: { timestamp: "asc" },
    });
    return res.status(200).json(new ApiResponse(200, {
        lotId,
        daysBack,
        dataPoints: history.length,
        history: history.map((h) => ({
            timestamp: h.timestamp,
            occupiedSlots: h.occupiedSlots,
            totalSlots: h.totalSlots,
            occupancyPercentage: h.totalSlots > 0
                ? Math.round((h.occupiedSlots / h.totalSlots) * 100)
                : 0,
            avgDuration: h.avgDuration,
        })),
    }, "Occupancy history fetched"));
});
// ── Peak Hours ───────────────────────────────────────────────
export const getPeakHours = asyncHandler(async (req, res) => {
    const lotId = req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const daysBack = parseInt(req.query.days) || 30;
    const result = await analyzePeakHours(lotId, daysBack);
    return res.status(200).json(new ApiResponse(200, result, "Peak hours analysis complete"));
});
// ── Revenue Statistics ───────────────────────────────────────
export const getRevenueStats = asyncHandler(async (req, res) => {
    const lotId = req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const daysBack = parseInt(req.query.days) || 30;
    const result = await getRevenueStatistics(lotId, daysBack);
    return res.status(200).json(new ApiResponse(200, result, "Revenue statistics fetched"));
});
// ── Predictions ──────────────────────────────────────────────
export const getPredictions = asyncHandler(async (req, res) => {
    const lotId = req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const targetHour = parseInt(req.query.hour);
    if (isNaN(targetHour) || targetHour < 0 || targetHour > 23) {
        throw new ApiError(400, "Valid hour (0-23) is required as query param");
    }
    const result = await predictOccupancy(lotId, targetHour);
    return res.status(200).json(new ApiResponse(200, result, "Prediction generated"));
});
// ── All Hours Prediction (for Chart) ─────────────────────────
export const getAllHoursPrediction = asyncHandler(async (req, res) => {
    const lotId = req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const predictions = [];
    for (let hour = 0; hour < 24; hour++) {
        const prediction = await predictOccupancy(lotId, hour);
        predictions.push({ hour, ...prediction });
    }
    return res.status(200).json(new ApiResponse(200, predictions, "24-hour prediction generated"));
});
// ── Recent Entry/Exit Logs ───────────────────────────────────
export const getRecentLogs = asyncHandler(async (req, res) => {
    const lotId = req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const limit = parseInt(req.query.limit) || 50;
    const sessions = await prisma.parkingSession.findMany({
        where: { slot: { lotId } },
        include: {
            vehicle: { select: { plateNo: true, rfidTag: true } },
            slot: { select: { block: true, number: true, floor: true } },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
    });
    return res.status(200).json(new ApiResponse(200, sessions.map((s) => ({
        id: s.id,
        vehicle: s.vehicle.plateNo,
        rfidTag: s.vehicle.rfidTag,
        slot: `${s.slot.block}-${s.slot.number} (Floor ${s.slot.floor})`,
        entryTime: s.entryTime,
        exitTime: s.exitTime,
        duration: s.duration,
        cost: s.cost,
        paymentStatus: s.paymentStatus,
        type: s.exitTime ? "EXIT" : "ENTRY",
    })), "Recent logs fetched"));
});
//# sourceMappingURL=analytics.controller.js.map