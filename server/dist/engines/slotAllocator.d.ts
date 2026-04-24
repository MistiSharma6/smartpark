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
import { type PathResult } from "./dijkstra.js";
interface SlotPreferences {
    type?: string;
    features?: string[];
}
interface AllocationResult {
    slotId: string;
    block: string;
    number: number;
    floor: number;
    type: string;
    label: string;
    path: PathResult | null;
}
export declare function allocateBestSlot(lotId: string, preferences?: SlotPreferences): Promise<AllocationResult | null>;
export {};
//# sourceMappingURL=slotAllocator.d.ts.map