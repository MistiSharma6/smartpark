/**
 * Parking Controller
 *
 * Handles RFID scan entry/exit, session management, and slot assignment.
 * This is the main controller that the ESP32 hardware communicates with.
 */

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../lib/prisma.js";
import { allocateBestSlot } from "../engines/slotAllocator.js";
import { findShortestPath, type ParkingGraph } from "../engines/dijkstra.js";
import { recordAnalyticsSnapshot } from "../engines/predictor.js";
import { rfidScanSchema, manualEntrySchema, manualExitSchema } from "../schemas/parking.schema.js";
import { getIO } from "../lib/websocket.js";

// ── RFID Scan (Entry or Exit) ────────────────────────────────

export const handleRfidScan = asyncHandler(async (req, res) => {
  const parsed = rfidScanSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid scan data", parsed.error.issues.map((i) => i.message));
  }

  const { rfidTag, lotId, action } = parsed.data;

  // Find the vehicle by RFID tag
  const vehicle = await prisma.vehicle.findUnique({
    where: { rfidTag },
    include: { owner: { select: { id: true, name: true, email: true } } },
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not registered. RFID tag not found in system.");
  }

  if (action === "ENTRY") {
    return await handleEntry(vehicle, lotId, res);
  } else {
    return await handleExit(vehicle, lotId, res);
  }
});

// ── Entry Logic ──────────────────────────────────────────────

async function handleEntry(vehicle: any, lotId: string, res: any) {
  // Check if vehicle already has an active session
  const activeSession = await prisma.parkingSession.findFirst({
    where: {
      vehicleId: vehicle.id,
      exitTime: null,
    },
  });

  if (activeSession) {
    throw new ApiError(409, "Vehicle already has an active parking session");
  }

  // Check if the vehicle's owner has a REGISTERED booking for this lot
  const existingBooking = await prisma.booking.findFirst({
    where: {
      vehicleId: vehicle.id,
      lotId,
      status: "REGISTERED",
    },
    include: {
      slot: true,
    },
  });

  if (existingBooking && existingBooking.slotId && existingBooking.slot) {
    // ── Confirm the pre-booked slot ────────────────────────
    const now = new Date();

    const session = await prisma.$transaction(async (tx) => {
      // Mark slot as occupied
      await tx.parkingSlot.update({
        where: { id: existingBooking.slotId! },
        data: { status: "OCCUPIED" },
      });

      // Confirm the booking
      await tx.booking.update({
        where: { id: existingBooking.id },
        data: {
          confirmed: true,
          confirmedAt: now,
          checkedInAt: now,
          status: "CHECKED_IN",
        },
      });

      // Create parking session linked to the booking
      const newSession = await tx.parkingSession.create({
        data: {
          vehicleId: vehicle.id,
          slotId: existingBooking.slotId!,
          bookingId: existingBooking.id,
        },
      });

      return newSession;
    });

    // Emit real-time update via WebSocket
    try {
      const io = getIO();
      io.to(`lot:${lotId}`).emit("slot:update", {
        slotId: existingBooking.slotId,
        status: "OCCUPIED",
        block: existingBooking.slot.block,
        number: existingBooking.slot.number,
        floor: existingBooking.slot.floor,
      });
      io.to(`lot:${lotId}`).emit("session:start", {
        sessionId: session.id,
        vehiclePlate: vehicle.plateNo,
        slot: `${existingBooking.slot.block}-${existingBooking.slot.number}`,
        entryTime: session.entryTime,
        bookingConfirmed: true,
      });
    } catch (_) {}

    // Record analytics snapshot
    recordAnalyticsSnapshot(lotId).catch(() => {});

    // Get path data
    let path = null;
    const lot = await prisma.parkingLot.findUnique({ where: { id: lotId } });
    const graphData = lot?.graphData as unknown as ParkingGraph | null;
    if (graphData && lot?.entryNodeId && existingBooking.slot.nodeId) {
      path = findShortestPath(graphData, lot.entryNodeId, existingBooking.slot.nodeId);
    }

    return res.status(201).json(
      new ApiResponse(201, {
        sessionId: session.id,
        assignedSlot: `${existingBooking.slot.block}-${existingBooking.slot.number} (Floor ${existingBooking.slot.floor})`,
        block: existingBooking.slot.block,
        number: existingBooking.slot.number,
        floor: existingBooking.slot.floor,
        slotType: existingBooking.slot.type,
        path,
        entryTime: session.entryTime,
        ownerName: vehicle.owner?.name,
        bookingConfirmed: true,
        bookingId: existingBooking.id,
      }, "Booking confirmed! Entry successful with pre-reserved slot.")
    );
  }

  // ── No booking — standard RFID entry ────────────────────
  const allocation = await allocateBestSlot(lotId);

  if (!allocation) {
    throw new ApiError(503, "No available parking slots. Lot is full.");
  }

  // Create session and mark slot as occupied (transaction)
  const session = await prisma.$transaction(async (tx) => {
    await tx.parkingSlot.update({
      where: { id: allocation.slotId },
      data: { status: "OCCUPIED" },
    });

    const newSession = await tx.parkingSession.create({
      data: {
        vehicleId: vehicle.id,
        slotId: allocation.slotId,
      },
    });

    return newSession;
  });

  // Emit real-time update via WebSocket
  try {
    const io = getIO();
    io.to(`lot:${lotId}`).emit("slot:update", {
      slotId: allocation.slotId,
      status: "OCCUPIED",
      block: allocation.block,
      number: allocation.number,
      floor: allocation.floor,
    });
    io.to(`lot:${lotId}`).emit("session:start", {
      sessionId: session.id,
      vehiclePlate: vehicle.plateNo,
      slot: allocation.label,
      entryTime: session.entryTime,
    });
  } catch (_) {
    // WebSocket not initialized — skip silently
  }

  // Record analytics snapshot
  recordAnalyticsSnapshot(lotId).catch(() => {});

  return res.status(201).json(
    new ApiResponse(201, {
      sessionId: session.id,
      assignedSlot: allocation.label,
      block: allocation.block,
      number: allocation.number,
      floor: allocation.floor,
      slotType: allocation.type,
      path: allocation.path,
      entryTime: session.entryTime,
      ownerName: vehicle.owner?.name,
    }, "Entry successful. Slot assigned.")
  );
}

// ── Exit Logic ───────────────────────────────────────────────

async function handleExit(vehicle: any, _lotId: string, res: any) {
  const session = await prisma.parkingSession.findFirst({
    where: {
      vehicleId: vehicle.id,
      exitTime: null,
    },
    include: {
      slot: {
        include: { lot: true },
      },
      booking: true,
    },
  });

  if (!session) {
    throw new ApiError(404, "No active parking session found for this vehicle");
  }

  const lotId = session.slot.lot.id;

  const exitTime = new Date();
  const chargeStartTime = session.booking?.confirmedAt ?? session.entryTime;
  const durationMs = exitTime.getTime() - chargeStartTime.getTime();
  const durationMinutes = Math.ceil(durationMs / (1000 * 60));
  const durationHours = durationMinutes / 60;
  const ratePerHour = session.slot.lot.ratePerHour;
  const cost = Math.round(durationHours * ratePerHour * 100) / 100;

  const updatedSession = await prisma.$transaction(async (tx) => {
    await tx.parkingSlot.update({
      where: { id: session.slotId },
      data: { status: "FREE" },
    });

    const closed = await tx.parkingSession.update({
      where: { id: session.id },
      data: {
        exitTime,
        duration: durationMinutes,
        cost,
        paymentStatus: "PENDING",
      },
    });

    if (session.bookingId) {
      await tx.booking.update({
        where: { id: session.bookingId },
        data: { status: "COMPLETED" },
      });
    }

    return closed;
  });

  // Emit real-time update
  try {
    const io = getIO();
    io.to(`lot:${lotId}`).emit("slot:update", {
      slotId: session.slotId,
      status: "FREE",
      block: session.slot.block,
      number: session.slot.number,
      floor: session.slot.floor,
    });
    io.to(`lot:${lotId}`).emit("session:end", {
      sessionId: session.id,
      vehiclePlate: vehicle.plateNo,
      slot: `${session.slot.block}-${session.slot.number}`,
      duration: durationMinutes,
      cost,
      exitTime,
    });
  } catch (_) {}

  recordAnalyticsSnapshot(lotId).catch(() => {});

  return res.status(200).json(
    new ApiResponse(200, {
      sessionId: updatedSession.id,
      slot: `${session.slot.block}-${session.slot.number} (Floor ${session.slot.floor})`,
      entryTime: session.entryTime,
      chargeStartTime,
      exitTime,
      durationMinutes,
      cost,
      ratePerHour,
      paymentStatus: "PENDING",
      bookingId: session.bookingId ?? null,
    }, "Exit successful. Bill generated.")
  );
}

// ── Get Slot Map ─────────────────────────────────────────────

export const getSlotMap = asyncHandler(async (req, res) => {
  const lotId = req.params.lotId as string;

  if (!lotId) throw new ApiError(400, "Lot ID is required");

  const lot = await prisma.parkingLot.findUnique({
    where: { id: lotId },
    include: {
      slots: {
        orderBy: [{ floor: "asc" }, { block: "asc" }, { number: "asc" }],
        include: {
          sessions: {
            where: { exitTime: null },
            select: {
              id: true,
              entryTime: true,
              vehicle: {
                select: { plateNo: true },
              },
            },
          },
        },
      },
    },
  });

  if (!lot) throw new ApiError(404, "Parking lot not found");

  const totalSlots = lot.slots.length;
  const occupiedSlots = lot.slots.filter((s) => s.status === "OCCUPIED").length;
  const freeSlots = totalSlots - occupiedSlots;

  return res.status(200).json(
    new ApiResponse(200, {
      lot: {
        id: lot.id,
        name: lot.name,
        floors: lot.floors,
        ratePerHour: lot.ratePerHour,
        graphData: lot.graphData,
        entryNodeId: lot.entryNodeId,
      },
      stats: { totalSlots, occupiedSlots, freeSlots },
      slots: lot.slots.map((s) => ({
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
    }, "Slot map fetched")
  );
});

// ── Get Active Session ───────────────────────────────────────

export const getActiveSession = asyncHandler(async (req, res) => {
  const vehicleId = req.params.vehicleId as string;

  const session = await prisma.parkingSession.findFirst({
    where: {
      vehicleId,
      exitTime: null,
    },
    include: {
      slot: {
        include: { lot: true },
      },
      vehicle: { select: { plateNo: true, rfidTag: true } },
    },
  });

  if (!session) {
    return res.status(200).json(
      new ApiResponse(200, null, "No active session")
    );
  }

  const now = new Date();
  const durationMs = now.getTime() - session.entryTime.getTime();
  const durationMinutes = Math.ceil(durationMs / (1000 * 60));
  const runningCost = Math.round(
    (durationMinutes / 60) * session.slot.lot.ratePerHour * 100
  ) / 100;

  let path = null;
  const graphData = session.slot.lot.graphData as unknown as ParkingGraph | null;
  const entryNodeId = session.slot.lot.entryNodeId;
  if (graphData && entryNodeId && session.slot.nodeId) {
    path = findShortestPath(graphData, entryNodeId, session.slot.nodeId);
  }

  return res.status(200).json(
    new ApiResponse(200, {
      sessionId: session.id,
      slot: `${session.slot.block}-${session.slot.number} (Floor ${session.slot.floor})`,
      block: session.slot.block,
      number: session.slot.number,
      floor: session.slot.floor,
      entryTime: session.entryTime,
      durationMinutes,
      runningCost,
      ratePerHour: session.slot.lot.ratePerHour,
      vehicle: session.vehicle,
      path,
    }, "Active session fetched")
  );
});

// ── Manual Entry (Security/Admin) ────────────────────────────

export const manualEntry = asyncHandler(async (req, res) => {
  const parsed = manualEntrySchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid data", parsed.error.issues.map((i) => i.message));
  }

  const { vehicleId, rfidTag, plateNo, lotId } = parsed.data;

  let vehicle;
  if (vehicleId) {
    vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  } else if (rfidTag) {
    vehicle = await prisma.vehicle.findUnique({ where: { rfidTag } });
  } else if (plateNo) {
    vehicle = await prisma.vehicle.findUnique({ where: { plateNo } });
  }

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return handleEntry(vehicle, lotId, res);
});

// ── Manual Exit (Security/Admin) ─────────────────────────────

export const manualExit = asyncHandler(async (req, res) => {
  const parsed = manualExitSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid data", parsed.error.issues.map((i) => i.message));
  }

  const { sessionId, rfidTag, plateNo } = parsed.data;

  let vehicle;
  if (sessionId) {
    const session = await prisma.parkingSession.findUnique({
      where: { id: sessionId },
      include: { vehicle: true, slot: true },
    });
    if (!session) throw new ApiError(404, "Session not found");
    vehicle = session.vehicle;
    return handleExit(vehicle, session.slot.lotId, res);
  } else if (rfidTag) {
    vehicle = await prisma.vehicle.findUnique({ where: { rfidTag } });
  } else if (plateNo) {
    vehicle = await prisma.vehicle.findUnique({ where: { plateNo } });
  }

  if (!vehicle) throw new ApiError(404, "Vehicle not found");

  const activeSession = await prisma.parkingSession.findFirst({
    where: { vehicleId: vehicle.id, exitTime: null },
    include: { slot: true },
  });

  if (!activeSession) {
    throw new ApiError(404, "No active session found for this vehicle");
  }

  return handleExit(vehicle, activeSession.slot.lotId, res);
});

// ── Get Session History ──────────────────────────────────────

export const getSessionHistory = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const sessions = await prisma.parkingSession.findMany({
    where: {
      vehicle: { ownerId: user.id },
    },
    include: {
      slot: {
        include: { lot: { select: { name: true } } },
      },
      vehicle: { select: { plateNo: true } },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  const total = await prisma.parkingSession.count({
    where: { vehicle: { ownerId: user.id } },
  });

  return res.status(200).json(
    new ApiResponse(200, {
      sessions: sessions.map((s) => ({
        id: s.id,
        slot: `${s.slot.block}-${s.slot.number} (Floor ${s.slot.floor})`,
        lotName: s.slot.lot.name,
        vehicle: s.vehicle.plateNo,
        entryTime: s.entryTime,
        exitTime: s.exitTime,
        duration: s.duration,
        cost: s.cost,
        paymentStatus: s.paymentStatus,
      })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    }, "Session history fetched")
  );
});