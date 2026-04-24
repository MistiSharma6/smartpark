/**
 * Vehicle Controller
 *
 * Manages user vehicles and RFID tag associations.
 */

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../lib/prisma.js";
import { registerVehicleSchema, updateVehicleSchema } from "../schemas/parking.schema.js";

// ── Register Vehicle ─────────────────────────────────────────

export const registerVehicle = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const parsed = registerVehicleSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid vehicle data", parsed.error.issues.map((i) => i.message));
  }

  const { rfidTag, plateNo } = parsed.data;

  // Check if RFID tag or plate already registered
  const existing = await prisma.vehicle.findFirst({
    where: {
      OR: [{ rfidTag }, { plateNo }],
    },
  });

  if (existing) {
    throw new ApiError(409, "A vehicle with this RFID tag or plate number already exists");
  }

  const vehicle = await prisma.vehicle.create({
    data: {
      rfidTag,
      plateNo,
      ownerId: user.id,
    },
  });

  return res.status(201).json(
    new ApiResponse(201, vehicle, "Vehicle registered successfully")
  );
});

// ── Get My Vehicles ──────────────────────────────────────────

export const getMyVehicles = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const vehicles = await prisma.vehicle.findMany({
    where: { ownerId: user.id },
    include: {
      sessions: {
        where: { exitTime: null },
        select: {
          id: true,
          entryTime: true,
          slot: {
            select: {
              block: true,
              number: true,
              floor: true,
              lot: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return res.status(200).json(
    new ApiResponse(200, vehicles.map((v) => ({
      id: v.id,
      rfidTag: v.rfidTag,
      plateNo: v.plateNo,
      activeSession: v.sessions[0]
        ? {
            sessionId: v.sessions[0].id,
            entryTime: v.sessions[0].entryTime,
            slot: `${v.sessions[0].slot.block}-${v.sessions[0].slot.number} (Floor ${v.sessions[0].slot.floor})`,
            lotName: v.sessions[0].slot.lot.name,
          }
        : null,
    })), "Vehicles fetched")
  );
});

// ── Update Vehicle ───────────────────────────────────────────

export const updateVehicle = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const id = req.params.id as string;
  if (!id) throw new ApiError(400, "Vehicle ID is required");

  const parsed = updateVehicleSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid data", parsed.error.issues.map((i) => i.message));
  }

  // Verify ownership
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) throw new ApiError(404, "Vehicle not found");
  if (vehicle.ownerId !== user.id && user.role !== "ADMIN") {
    throw new ApiError(403, "You can only update your own vehicles");
  }

  const updated = await prisma.vehicle.update({
    where: { id },
    data: parsed.data,
  });

  return res.status(200).json(
    new ApiResponse(200, updated, "Vehicle updated")
  );
});

// ── Delete Vehicle ───────────────────────────────────────────

export const deleteVehicle = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const id = req.params.id as string;
  if (!id) throw new ApiError(400, "Vehicle ID is required");

  // Verify ownership
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) throw new ApiError(404, "Vehicle not found");
  if (vehicle.ownerId !== user.id && user.role !== "ADMIN") {
    throw new ApiError(403, "You can only delete your own vehicles");
  }

  // Check for active sessions
  const activeSession = await prisma.parkingSession.findFirst({
    where: { vehicleId: id, exitTime: null },
  });
  if (activeSession) {
    throw new ApiError(409, "Cannot delete vehicle with an active parking session");
  }

  await prisma.vehicle.delete({ where: { id } });

  return res.status(200).json(
    new ApiResponse(200, null, "Vehicle deleted")
  );
});
