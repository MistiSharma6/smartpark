/**
 * Slot Controller
 *
 * CRUD operations for parking slots:
 *   - createSlots   — bulk-create slots for a lot
 *   - updateSlot    — update an individual slot
 *   - getSlotsByLot — list all slots in a lot
 *   - getOccupancyStats — occupancy statistics for a lot
 */
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../lib/prisma.js";
// ── Bulk-create slots for a lot ──────────────────────────────
export const createSlots = asyncHandler(async (req, res) => {
    const { lotId, slots } = req.body;
    if (!lotId || !Array.isArray(slots) || slots.length === 0) {
        throw new ApiError(400, "lotId and a non-empty slots array are required");
    }
    const lot = await prisma.parkingLot.findUnique({ where: { id: lotId } });
    if (!lot)
        throw new ApiError(404, "Parking lot not found");
    const data = slots.map((s) => ({
        lotId,
        block: s.block,
        number: s.number,
        floor: s.floor ?? 0,
        type: s.type ?? "REGULAR",
        status: s.status ?? "FREE",
        xCoord: s.xCoord ?? null,
        yCoord: s.yCoord ?? null,
        nodeId: s.nodeId ?? null,
        features: s.features ?? [],
    }));
    const created = await prisma.parkingSlot.createMany({ data });
    // Update total slot count on the lot
    const totalSlots = await prisma.parkingSlot.count({ where: { lotId } });
    await prisma.parkingLot.update({
        where: { id: lotId },
        data: { totalSlots },
    });
    return res.status(201).json(new ApiResponse(201, { count: created.count, totalSlots }, "Slots created successfully"));
});
// ── Update a single slot ─────────────────────────────────────
export const updateSlot = asyncHandler(async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id)
        throw new ApiError(400, "Slot ID is required");
    const slot = await prisma.parkingSlot.findUnique({ where: { id } });
    if (!slot)
        throw new ApiError(404, "Slot not found");
    const { block, number, floor, type, status, xCoord, yCoord, nodeId, features } = req.body;
    const updated = await prisma.parkingSlot.update({
        where: { id },
        data: {
            ...(block !== undefined && { block }),
            ...(number !== undefined && { number }),
            ...(floor !== undefined && { floor }),
            ...(type !== undefined && { type }),
            ...(status !== undefined && { status }),
            ...(xCoord !== undefined && { xCoord }),
            ...(yCoord !== undefined && { yCoord }),
            ...(nodeId !== undefined && { nodeId }),
            ...(features !== undefined && { features }),
        },
    });
    return res.status(200).json(new ApiResponse(200, updated, "Slot updated successfully"));
});
// ── Get all slots for a lot ──────────────────────────────────
export const getSlotsByLot = asyncHandler(async (req, res) => {
    const lotId = Array.isArray(req.params.lotId) ? req.params.lotId[0] : req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const lot = await prisma.parkingLot.findUnique({ where: { id: lotId } });
    if (!lot)
        throw new ApiError(404, "Parking lot not found");
    const slots = await prisma.parkingSlot.findMany({
        where: { lotId },
        orderBy: [{ floor: "asc" }, { block: "asc" }, { number: "asc" }],
        include: {
            sessions: {
                where: { exitTime: null },
                select: {
                    id: true,
                    entryTime: true,
                    vehicle: { select: { plateNo: true } },
                },
            },
        },
    });
    return res.status(200).json(new ApiResponse(200, {
        lotId,
        lotName: lot.name,
        slots: slots.map((s) => ({
            id: s.id,
            block: s.block,
            number: s.number,
            floor: s.floor,
            type: s.type,
            status: s.status,
            features: s.features,
            nodeId: s.nodeId,
            xCoord: s.xCoord,
            yCoord: s.yCoord,
            activeSession: s.sessions[0] ?? null,
        })),
    }, "Slots fetched successfully"));
});
// ── Occupancy stats for a lot ────────────────────────────────
export const getOccupancyStats = asyncHandler(async (req, res) => {
    const lotId = Array.isArray(req.params.lotId) ? req.params.lotId[0] : req.params.lotId;
    if (!lotId)
        throw new ApiError(400, "Lot ID is required");
    const lot = await prisma.parkingLot.findUnique({ where: { id: lotId } });
    if (!lot)
        throw new ApiError(404, "Parking lot not found");
    const slots = await prisma.parkingSlot.findMany({
        where: { lotId },
        select: { type: true, status: true, floor: true },
    });
    const total = slots.length;
    const occupied = slots.filter((s) => s.status === "OCCUPIED").length;
    const reserved = slots.filter((s) => s.status === "RESERVED").length;
    const free = slots.filter((s) => s.status === "FREE").length;
    // Breakdown by type
    const byType = {};
    for (const s of slots) {
        if (!byType[s.type]) {
            byType[s.type] = { total: 0, occupied: 0, free: 0, reserved: 0 };
        }
        byType[s.type].total++;
        if (s.status === "OCCUPIED")
            byType[s.type].occupied++;
        else if (s.status === "RESERVED")
            byType[s.type].reserved++;
        else
            byType[s.type].free++;
    }
    // Breakdown by floor
    const byFloor = {};
    for (const s of slots) {
        if (!byFloor[s.floor]) {
            byFloor[s.floor] = { total: 0, occupied: 0, free: 0, reserved: 0 };
        }
        byFloor[s.floor].total++;
        if (s.status === "OCCUPIED")
            byFloor[s.floor].occupied++;
        else if (s.status === "RESERVED")
            byFloor[s.floor].reserved++;
        else
            byFloor[s.floor].free++;
    }
    const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;
    return res.status(200).json(new ApiResponse(200, {
        lotId,
        lotName: lot.name,
        total,
        occupied,
        reserved,
        free,
        occupancyRate,
        byType,
        byFloor,
    }, "Occupancy stats fetched"));
});
//# sourceMappingURL=slot.controller.js.map