/**
 * Booking Controller
 *
 * Handles online parking slot reservations.
 * Users can book a slot in advance with preferences (EV, premium, near exit).
 */

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../lib/prisma.js";
import { createBookingSchema } from "../schemas/booking.schema.js";
import { allocateBestSlot } from "../engines/slotAllocator.js";
import {
  findShortestPath,
  type ParkingGraph,
} from "../engines/dijkstra.js";

const BOOKING_EXPIRY_MINUTES = 30;

// ── Create Booking ───────────────────────────────────────────

export const createBooking = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const parsed = createBookingSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(
      400,
      "Invalid booking data",
      parsed.error.issues.map((i) => i.message)
    );
  }

  const { lotId, vehicleId, slotType, preferences, scheduledFor } =
    parsed.data;

  // Verify lot exists
  const lot = await prisma.parkingLot.findUnique({ where: { id: lotId } });
  if (!lot) throw new ApiError(404, "Parking lot not found");

  // If vehicle specified, verify ownership
  if (vehicleId) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });
    if (!vehicle || vehicle.ownerId !== user.id) {
      throw new ApiError(403, "Vehicle not found or not owned by you");
    }
  }

  // Check for existing active booking
  const existingBooking = await prisma.booking.findFirst({
    where: {
      userId: user.id,
      status: { in: ["PENDING", "REGISTERED", "CONFIRMED"] },
    },
  });
  if (existingBooking) {
    throw new ApiError(
      409,
      "You already have an active booking. Cancel it before creating a new one."
    );
  }

  // Allocate best slot based on preferences
  const allocation = await allocateBestSlot(lotId, {
    type: slotType,
    features: preferences,
  });

  if (!allocation) {
    throw new ApiError(
      503,
      "No available slots matching your preferences. Try different preferences or another lot."
    );
  }

  // Create booking and reserve the slot
  const expiresAt = new Date(
    Date.now() + BOOKING_EXPIRY_MINUTES * 60 * 1000
  );

  const booking = await prisma.$transaction(async (tx) => {
    // Reserve the slot
    await tx.parkingSlot.update({
      where: { id: allocation.slotId },
      data: { status: "RESERVED" },
    });

    // Create booking
    const newBooking = await tx.booking.create({
      data: {
        userId: user.id,
        lotId,
        slotId: allocation.slotId,
        vehicleId: vehicleId ?? null,
        slotType,
        preferences,
        registered: true,
        confirmed: false,
        status: "REGISTERED",
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        expiresAt,
      },
      include: {
        lot: { select: { name: true, address: true, ratePerHour: true } },
        slot: {
          select: {
            block: true,
            number: true,
            floor: true,
            type: true,
            nodeId: true,
          },
        },
        vehicle: { select: { plateNo: true, rfidTag: true } },
      },
    });

    return newBooking;
  });

  // Get path data
  let path = null;
  const graphData = lot.graphData as unknown as ParkingGraph | null;
  if (graphData && lot.entryNodeId && booking.slot?.nodeId) {
    path = findShortestPath(graphData, lot.entryNodeId, booking.slot.nodeId);
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        bookingId: booking.id,
        status: booking.status,
        registered: booking.registered,
        confirmed: booking.confirmed,
        lot: booking.lot,
        slot: booking.slot
          ? {
              ...booking.slot,
              label: `${booking.slot.block}-${booking.slot.number} (Floor ${booking.slot.floor})`,
            }
          : null,
        vehicle: booking.vehicle,
        slotType: booking.slotType,
        preferences: booking.preferences,
        expiresAt: booking.expiresAt,
        path,
      },
      "Booking registered! Your slot is reserved. Please scan your RFID at entry to confirm."
    )
  );
});

// ── Get My Bookings ──────────────────────────────────────────

export const getMyBookings = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: {
      lot: { select: { name: true, address: true, ratePerHour: true } },
      slot: {
        select: {
          block: true,
          number: true,
          floor: true,
          type: true,
        },
      },
      vehicle: { select: { plateNo: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      bookings.map((b) => ({
        id: b.id,
        status: b.status,
        registered: b.registered,
        confirmed: b.confirmed,
        confirmedAt: b.confirmedAt,
        lotName: b.lot.name,
        lotAddress: b.lot.address,
        slot: b.slot
          ? `${b.slot.block}-${b.slot.number} (Floor ${b.slot.floor})`
          : null,
        slotType: b.slotType,
        preferences: b.preferences,
        vehicle: b.vehicle?.plateNo ?? null,
        bookingTime: b.bookingTime,
        scheduledFor: b.scheduledFor,
        expiresAt: b.expiresAt,
        createdAt: b.createdAt,
      })),
      "Bookings fetched"
    )
  );
});

// ── Get Active Booking ───────────────────────────────────────

export const getActiveBooking = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  // Expire stale bookings first
  await prisma.booking.updateMany({
    where: {
      userId: user.id,
      status: { in: ["PENDING", "REGISTERED", "CONFIRMED"] },
      expiresAt: { lt: new Date() },
    },
    data: { status: "EXPIRED" },
  });

  // Free slots that belonged to expired bookings
  const expiredBookings = await prisma.booking.findMany({
    where: { userId: user.id, status: "EXPIRED", slotId: { not: null } },
  });
  for (const eb of expiredBookings) {
    if (eb.slotId) {
      await prisma.parkingSlot
        .update({
          where: { id: eb.slotId },
          data: { status: "FREE" },
        })
        .catch(() => {});
    }
  }

  const booking = await prisma.booking.findFirst({
    where: {
      userId: user.id,
      status: { in: ["PENDING", "REGISTERED", "CONFIRMED", "CHECKED_IN"] },
    },
    include: {
      lot: {
        select: {
          id: true,
          name: true,
          address: true,
          ratePerHour: true,
          graphData: true,
          entryNodeId: true,
          floors: true,
        },
      },
      slot: {
        select: {
          id: true,
          block: true,
          number: true,
          floor: true,
          type: true,
          nodeId: true,
          xCoord: true,
          yCoord: true,
        },
      },
      vehicle: { select: { plateNo: true, rfidTag: true } },
    },
  });

  if (!booking) {
    // Fallback: check for active parking session (direct RFID scan entry without booking)
    const activeSession = await prisma.parkingSession.findFirst({
      where: {
        vehicle: { ownerId: user.id },
        exitTime: null,
      },
      include: {
        slot: {
          include: {
            lot: {
              select: {
                id: true,
                name: true,
                address: true,
                ratePerHour: true,
                graphData: true,
                entryNodeId: true,
                floors: true,
              },
            },
          },
        },
        vehicle: { select: { plateNo: true, rfidTag: true } },
      },
    });

    if (!activeSession) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "No active booking"));
    }

    // Compute path for the direct-scan session
    let sessionPath = null;
    const sessionGraphData = activeSession.slot.lot
      .graphData as unknown as ParkingGraph | null;
    if (
      sessionGraphData &&
      activeSession.slot.lot.entryNodeId &&
      activeSession.slot.nodeId
    ) {
      sessionPath = findShortestPath(
        sessionGraphData,
        activeSession.slot.lot.entryNodeId,
        activeSession.slot.nodeId
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          bookingId: null,
          sessionId: activeSession.id,
          status: "CHECKED_IN",
          registered: false,
          confirmed: true,
          confirmedAt: activeSession.entryTime,
          source: "DIRECT_SCAN",
          lot: {
            id: activeSession.slot.lot.id,
            name: activeSession.slot.lot.name,
            address: activeSession.slot.lot.address,
            ratePerHour: activeSession.slot.lot.ratePerHour,
            floors: activeSession.slot.lot.floors,
          },
          slot: {
            id: activeSession.slot.id,
            block: activeSession.slot.block,
            number: activeSession.slot.number,
            floor: activeSession.slot.floor,
            type: activeSession.slot.type,
            nodeId: activeSession.slot.nodeId,
            xCoord: activeSession.slot.xCoord,
            yCoord: activeSession.slot.yCoord,
            label: `${activeSession.slot.block}-${activeSession.slot.number} (Floor ${activeSession.slot.floor})`,
          },
          vehicle: activeSession.vehicle,
          slotType: activeSession.slot.type,
          preferences: [],
          expiresAt: null,
          scheduledFor: null,
          entryTime: activeSession.entryTime,
          path: sessionPath,
        },
        "Active session fetched (direct scan entry)"
      )
    );
  }

  // Compute path
  let path = null;
  const graphData = booking.lot.graphData as unknown as ParkingGraph | null;
  if (graphData && booking.lot.entryNodeId && booking.slot?.nodeId) {
    path = findShortestPath(
      graphData,
      booking.lot.entryNodeId,
      booking.slot.nodeId
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        bookingId: booking.id,
        status: booking.status,
        registered: booking.registered,
        confirmed: booking.confirmed,
        confirmedAt: booking.confirmedAt,
        lot: {
          id: booking.lot.id,
          name: booking.lot.name,
          address: booking.lot.address,
          ratePerHour: booking.lot.ratePerHour,
          floors: booking.lot.floors,
        },
        slot: booking.slot
          ? {
              ...booking.slot,
              label: `${booking.slot.block}-${booking.slot.number} (Floor ${booking.slot.floor})`,
            }
          : null,
        vehicle: booking.vehicle,
        slotType: booking.slotType,
        preferences: booking.preferences,
        expiresAt: booking.expiresAt,
        scheduledFor: booking.scheduledFor,
        path,
      },
      "Active booking fetched"
    )
  );
});

// ── Cancel Booking ───────────────────────────────────────────

export const cancelBooking = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  if (!user) throw new ApiError(401, "Unauthorized");

  const bookingId = req.params.id as string;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) throw new ApiError(404, "Booking not found");
  if (booking.userId !== user.id)
    throw new ApiError(403, "Not your booking");
  if (booking.status === "CANCELLED")
    throw new ApiError(400, "Booking already cancelled");
  if (booking.status === "CHECKED_IN" || booking.status === "CONFIRMED")
    throw new ApiError(400, "Cannot cancel a checked-in or confirmed booking");

  await prisma.$transaction(async (tx) => {
    // Free the reserved slot
    if (booking.slotId) {
      await tx.parkingSlot.update({
        where: { id: booking.slotId },
        data: { status: "FREE" },
      });
    }

    // Cancel the booking
    await tx.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { bookingId }, "Booking cancelled successfully")
    );
});