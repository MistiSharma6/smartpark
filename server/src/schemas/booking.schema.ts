import { z } from "zod";

// ── Create Booking ──────────────────────────────────────────

export const createBookingSchema = z.object({
  lotId: z.string().min(1, "Lot ID is required"),
  vehicleId: z.string().uuid().optional(),
  slotType: z
    .enum(["REGULAR", "EV_CHARGING", "HANDICAPPED", "PREMIUM"])
    .default("REGULAR"),
  preferences: z.array(z.string()).default([]),
  scheduledFor: z.string().datetime().optional(),
});

// ── Cancel Booking ──────────────────────────────────────────

export const cancelBookingSchema = z.object({
  reason: z.string().optional(),
});
