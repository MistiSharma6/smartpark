import { z } from "zod";

// ── RFID Scan (from ESP32) ───────────────────────────────────

export const rfidScanSchema = z.object({
  rfidTag: z.string().min(1, "RFID tag is required"),
  lotId: z.string().min(1, "Lot ID is required"),
  action: z.enum(["ENTRY", "EXIT"]),
});

// ── Vehicle ──────────────────────────────────────────────────

export const registerVehicleSchema = z.object({
  rfidTag: z.string().min(1, "RFID tag is required"),
  plateNo: z.string().min(1, "Plate number is required"),
});

export const updateVehicleSchema = z.object({
  rfidTag: z.string().min(1).optional(),
  plateNo: z.string().min(1).optional(),
});

// ── Parking Lot ──────────────────────────────────────────────

export const createLotSchema = z.object({
  name: z.string().min(1, "Lot name is required"),
  address: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  floors: z.number().int().min(1).default(1),
  ratePerHour: z.number().min(0).default(20.0),
});

export const updateLotSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  floors: z.number().int().min(1).optional(),
  ratePerHour: z.number().min(0).optional(),
});

// ── Graph Setup ──────────────────────────────────────────────

const graphNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  x: z.number(),
  y: z.number(),
  floor: z.number().optional(),
});

const graphEdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  weight: z.number().min(0),
  directed: z.boolean().optional(),
});

export const graphSetupSchema = z.object({
  entryNodeId: z.string().min(1),
  nodes: z.array(graphNodeSchema).min(1),
  edges: z.array(graphEdgeSchema).min(1),
  layoutData: z.record(z.string(), z.array(z.array(z.number()))).optional(),
  layoutMeta: z.record(z.string(), z.any()).optional(),
});

// ── Parking Slots ────────────────────────────────────────────

export const createSlotsSchema = z.object({
  lotId: z.string().min(1),
  slots: z.array(
    z.object({
      block: z.string().min(1),
      number: z.number().int().min(1),
      floor: z.number().int().min(0),
      type: z.enum(["REGULAR", "EV_CHARGING", "HANDICAPPED", "PREMIUM"]).default("REGULAR"),
      nodeId: z.string().optional(),
      xCoord: z.number().optional(),
      yCoord: z.number().optional(),
      features: z.array(z.string()).default([]),
    })
  ).min(1),
});

export const updateSlotSchema = z.object({
  type: z.enum(["REGULAR", "EV_CHARGING", "HANDICAPPED", "PREMIUM"]).optional(),
  status: z.enum(["FREE", "OCCUPIED", "RESERVED"]).optional(),
  features: z.array(z.string()).optional(),
  nodeId: z.string().optional(),
  xCoord: z.number().optional(),
  yCoord: z.number().optional(),
});

// ── Manual Entry/Exit ────────────────────────────────────────

export const manualEntrySchema = z.object({
  vehicleId: z.string().uuid().optional(),
  rfidTag: z.string().optional(),
  plateNo: z.string().optional(),
  lotId: z.string().min(1),
}).refine(
  (data) => data.vehicleId || data.rfidTag || data.plateNo,
  { message: "At least one of vehicleId, rfidTag, or plateNo is required" }
);

export const manualExitSchema = z.object({
  sessionId: z.string().uuid().optional(),
  rfidTag: z.string().optional(),
  plateNo: z.string().optional(),
}).refine(
  (data) => data.sessionId || data.rfidTag || data.plateNo,
  { message: "At least one of sessionId, rfidTag, or plateNo is required" }
);
