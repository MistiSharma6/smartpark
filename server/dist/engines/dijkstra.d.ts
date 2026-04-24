/**
 * Dijkstra's Shortest Path Algorithm for Parking Lot Navigation
 *
 * The parking lot is modeled as a weighted undirected graph:
 *   - Nodes: entry gate, aisle intersections, row ends, individual slot positions
 *   - Edges: walkable paths with distance in metres
 *
 * The graph is stored as JSON in ParkingLot.graphData.
 */
export interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
    floor?: number;
}
export interface GraphEdge {
    from: string;
    to: string;
    weight: number;
    directed?: boolean;
}
export interface ParkingGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
    layoutData?: {
        [floor: number]: number[][];
    };
}
export interface PathResult {
    path: string[];
    distance: number;
    pathCoordinates: {
        id: string;
        x: number;
        y: number;
        label: string;
        floor?: number;
    }[];
}
export declare function findShortestPath(graph: ParkingGraph, startNodeId: string, endNodeId: string): PathResult | null;
export declare function computeAllDistancesFromEntry(graph: ParkingGraph, entryNodeId: string): Map<string, number>;
//# sourceMappingURL=dijkstra.d.ts.map