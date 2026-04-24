/**
 * Smart Slot Allocation Engine
 *
 * Uses a greedy approach with a min-heap priority queue to find
 * the best available parking slot based on:
 *   1. Distance from entry (via Dijkstra)
 *   2. Floor preference (lower floors get priority)
 *   3. Slot type match (user preferences)
 *   4. Feature matching (shade, EV charging, near exit, etc.)
 */
import { prisma } from "../lib/prisma.js";
import { findShortestPath, computeAllDistancesFromEntry, } from "./dijkstra.js";
// ── Min-Heap for slot scoring ────────────────────────────────
class SlotHeap {
    heap = [];
    push(slotId, score, data) {
        this.heap.push({ slotId, score, data });
        this._bubbleUp(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0)
            return undefined;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._sinkDown(0);
        }
        return min;
    }
    get size() {
        return this.heap.length;
    }
    _bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.heap[parent].score <= this.heap[idx].score)
                break;
            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }
    _sinkDown(idx) {
        const len = this.heap.length;
        while (true) {
            let smallest = idx;
            const l = 2 * idx + 1;
            const r = 2 * idx + 2;
            if (l < len && this.heap[l].score < this.heap[smallest].score)
                smallest = l;
            if (r < len && this.heap[r].score < this.heap[smallest].score)
                smallest = r;
            if (smallest === idx)
                break;
            [this.heap[smallest], this.heap[idx]] = [this.heap[idx], this.heap[smallest]];
            idx = smallest;
        }
    }
}
// ── Scoring weights ──────────────────────────────────────────
const WEIGHTS = {
    DISTANCE: 1.0, // Lower distance → lower score → better
    FLOOR: 5.0, // Each floor adds penalty (prefer lower floors)
    TYPE_MISMATCH: 50.0, // Penalty for non-matching slot type
    FEATURE_BONUS: -3.0, // Bonus (negative = better) for each matching feature
};
// ── Main allocation function ─────────────────────────────────
export async function allocateBestSlot(lotId, preferences) {
    // 1. Get the lot with its graph data
    const lot = await prisma.parkingLot.findUnique({
        where: { id: lotId },
    });
    if (!lot)
        return null;
    // 2. Get all FREE slots for this lot
    const freeSlots = await prisma.parkingSlot.findMany({
        where: { lotId, status: "FREE" },
    });
    if (freeSlots.length === 0)
        return null;
    // 2b. Type-first filtering: if user requested a specific type, prefer
    //     exact matches. Only fall back to all free slots if zero match.
    let candidates = freeSlots;
    let typeFiltered = false;
    if (preferences?.type) {
        const typeMatches = freeSlots.filter(s => s.type === preferences.type);
        if (typeMatches.length > 0) {
            candidates = typeMatches;
            typeFiltered = true;
        }
        // If no exact match, fall back to all free slots (soft behavior)
    }
    // 3. Compute distances from entry for all nodes
    const graph = lot.graphData;
    const entryNodeId = lot.entryNodeId;
    let distanceMap = new Map();
    if (graph && entryNodeId) {
        distanceMap = computeAllDistancesFromEntry(graph, entryNodeId);
    }
    // 4. Score each slot and push into priority queue
    const heap = new SlotHeap();
    for (const slot of candidates) {
        let score = 0;
        // Distance score
        const nodeId = slot.nodeId;
        if (nodeId && distanceMap.has(nodeId)) {
            score += (distanceMap.get(nodeId) ?? 0) * WEIGHTS.DISTANCE;
        }
        else {
            // No graph data — use floor + block ordering as fallback
            score += slot.floor * 10 + slot.number * 0.1;
        }
        // Floor penalty (higher floors = worse)
        score += slot.floor * WEIGHTS.FLOOR;
        // Type matching — only apply penalty when we couldn't pre-filter
        if (!typeFiltered && preferences?.type && slot.type !== preferences.type) {
            score += WEIGHTS.TYPE_MISMATCH;
        }
        // Feature matching bonuses
        if (preferences?.features) {
            for (const feature of preferences.features) {
                if (slot.features.includes(feature)) {
                    score += WEIGHTS.FEATURE_BONUS;
                }
            }
        }
        heap.push(slot.id, score, slot);
    }
    // 5. Pop the best slot
    const best = heap.pop();
    if (!best)
        return null;
    const bestSlot = best.data;
    // 6. Compute the shortest path to this slot
    let pathResult = null;
    if (graph && entryNodeId && bestSlot.nodeId) {
        pathResult = findShortestPath(graph, entryNodeId, bestSlot.nodeId);
    }
    return {
        slotId: bestSlot.id,
        block: bestSlot.block,
        number: bestSlot.number,
        floor: bestSlot.floor,
        type: bestSlot.type,
        label: `${bestSlot.block}-${bestSlot.number} (Floor ${bestSlot.floor})`,
        path: pathResult,
    };
}
//# sourceMappingURL=slotAllocator.js.map