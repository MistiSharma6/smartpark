/**
 * Lot Controller
 *
 * Admin operations for parking lot management and graph configuration.
 */

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../lib/prisma.js";
import { createLotSchema, updateLotSchema, graphSetupSchema } from "../schemas/parking.schema.js";

// ── Create Parking Lot ───────────────────────────────────────

export const createLot = asyncHandler(async (req, res) => {
  const parsed = createLotSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid data", parsed.error.issues.map((i) => i.message));
  }

  const lot = await prisma.parkingLot.create({
    data: parsed.data,
  });

  return res.status(201).json(
    new ApiResponse(201, lot, "Parking lot created")
  );
});

// ── Update Parking Lot ───────────────────────────────────────

export const updateLot = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!id) throw new ApiError(400, "Lot ID is required");

  const parsed = updateLotSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid data", parsed.error.issues.map((i) => i.message));
  }

  const updateData: Record<string, any> = {};
  if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
  if (parsed.data.address !== undefined) updateData.address = parsed.data.address;
  if (parsed.data.latitude !== undefined) updateData.latitude = parsed.data.latitude;
  if (parsed.data.longitude !== undefined) updateData.longitude = parsed.data.longitude;
  if (parsed.data.floors !== undefined) updateData.floors = parsed.data.floors;
  if (parsed.data.ratePerHour !== undefined) updateData.ratePerHour = parsed.data.ratePerHour;

  const lot = await prisma.parkingLot.update({
    where: { id },
    data: updateData,
  });

  return res.status(200).json(
    new ApiResponse(200, lot, "Lot updated")
  );
});

// ── Get All Lots ─────────────────────────────────────────────

export const getLots = asyncHandler(async (_req, res) => {
  const lots = await prisma.parkingLot.findMany({
    include: {
      slots: {
        select: { status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json(
    new ApiResponse(200, lots.map((lot) => {
      const total = lot.slots.length;
      const occupied = lot.slots.filter((s) => s.status === "OCCUPIED").length;
      return {
        id: lot.id,
        name: lot.name,
        address: lot.address,
        latitude: lot.latitude,
        longitude: lot.longitude,
        floors: lot.floors,
        totalSlots: total,
        occupiedSlots: occupied,
        freeSlots: total - occupied,
        ratePerHour: lot.ratePerHour,
        hasGraph: !!lot.graphData,
        createdAt: lot.createdAt,
      };
    }), "Lots fetched")
  );
});

// ── Get Single Lot ───────────────────────────────────────────

export const getLot = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!id) throw new ApiError(400, "Lot ID is required");

  const lot = await prisma.parkingLot.findUnique({
    where: { id },
    include: {
      slots: {
        orderBy: [{ floor: "asc" }, { block: "asc" }, { number: "asc" }],
      },
    },
  });

  if (!lot) throw new ApiError(404, "Lot not found");

  return res.status(200).json(
    new ApiResponse(200, lot, "Lot fetched")
  );
});

// ── Setup Graph (Dijkstra Pathfinding) ───────────────────────

export const setupGraph = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  if (!id) throw new ApiError(400, "Lot ID is required");

  const parsed = graphSetupSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid graph data", parsed.error.issues.map((i) => i.message));
  }

  const { entryNodeId, nodes, edges, layoutData, layoutMeta } = parsed.data;

  // Validate entryNodeId exists in nodes
  if (!nodes.find((n) => n.id === entryNodeId)) {
    throw new ApiError(400, "entryNodeId must reference a valid node ID");
  }

  // Validate all edge endpoints exist in nodes
  const nodeIds = new Set(nodes.map((n) => n.id));
  for (const edge of edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      throw new ApiError(400, `Edge references non-existent node: ${edge.from} -> ${edge.to}`);
    }
  }

  const lot = await prisma.parkingLot.update({
    where: { id },
    data: {
      graphData: {
        nodes,
        edges,
        ...(layoutData ? { layoutData } : {}),
        ...(layoutMeta ? { layoutMeta } : {}),
      },
      entryNodeId,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, {
      lotId: lot.id,
      nodeCount: nodes.length,
      edgeCount: edges.length,
      entryNodeId,
    }, "Graph configured successfully")
  );
});
