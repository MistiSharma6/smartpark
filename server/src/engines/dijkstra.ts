/**
 * Dijkstra's Shortest Path Algorithm for Parking Lot Navigation
 *
 * The parking lot is modeled as a weighted undirected graph:
 *   - Nodes: entry gate, aisle intersections, row ends, individual slot positions
 *   - Edges: walkable paths with distance in metres
 *
 * The graph is stored as JSON in ParkingLot.graphData.
 */

// ── Types ────────────────────────────────────────────────────

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
  weight: number; // distance in metres
  directed?: boolean; // true for one-way edges (e.g. ramp transitions)
}

export interface ParkingGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  layoutData?: { [floor: number]: number[][] };
}

export interface PathResult {
  path: string[];           // ordered node IDs from start → end
  distance: number;         // total distance
  pathCoordinates: { id: string; x: number; y: number; label: string; floor?: number }[];
}

// ── Min-Heap Priority Queue ──────────────────────────────────

class MinHeap {
  private heap: { node: string; dist: number }[] = [];

  push(node: string, dist: number): void {
    this.heap.push({ node, dist });
    this._bubbleUp(this.heap.length - 1);
  }

  pop(): { node: string; dist: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0]!;
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return min;
  }

  get size(): number {
    return this.heap.length;
  }

  private _bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx]!.dist <= this.heap[idx]!.dist) break;
      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx]!, this.heap[parentIdx]!];
      idx = parentIdx;
    }
  }

  private _sinkDown(idx: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < length && this.heap[left]!.dist < this.heap[smallest]!.dist) {
        smallest = left;
      }
      if (right < length && this.heap[right]!.dist < this.heap[smallest]!.dist) {
        smallest = right;
      }
      if (smallest === idx) break;
      [this.heap[smallest], this.heap[idx]] = [this.heap[idx]!, this.heap[smallest]!];
      idx = smallest;
    }
  }
}

// ── Build Adjacency List ─────────────────────────────────────

function buildAdjacencyList(edges: GraphEdge[]): Map<string, { neighbor: string; weight: number }[]> {
  const adj = new Map<string, { neighbor: string; weight: number }[]>();

  for (const edge of edges) {
    if (!adj.has(edge.from)) adj.set(edge.from, []);
    if (!adj.has(edge.to)) adj.set(edge.to, []);
    adj.get(edge.from)!.push({ neighbor: edge.to, weight: edge.weight });
    if (!edge.directed) {
      adj.get(edge.to)!.push({ neighbor: edge.from, weight: edge.weight }); // undirected
    }
  }

  return adj;
}

// ── Dijkstra's Algorithm ─────────────────────────────────────

export function findShortestPath(
  graph: ParkingGraph,
  startNodeId: string,
  endNodeId: string
): PathResult | null {
  const nodeMap = new Map<string, GraphNode>();
  for (const node of graph.nodes) {
    nodeMap.set(node.id, node);
  }

  if (!nodeMap.has(startNodeId) || !nodeMap.has(endNodeId)) {
    return null;
  }

  const adj = buildAdjacencyList(graph.edges);
  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const visited = new Set<string>();
  const pq = new MinHeap();

  // Initialise distances
  for (const node of graph.nodes) {
    dist.set(node.id, Infinity);
    prev.set(node.id, null);
  }
  dist.set(startNodeId, 0);
  pq.push(startNodeId, 0);

  while (pq.size > 0) {
    const current = pq.pop()!;
    if (visited.has(current.node)) continue;
    visited.add(current.node);

    if (current.node === endNodeId) break;

    const neighbors = adj.get(current.node) ?? [];
    for (const { neighbor, weight } of neighbors) {
      if (visited.has(neighbor)) continue;
      const newDist = current.dist + weight;
      if (newDist < (dist.get(neighbor) ?? Infinity)) {
        dist.set(neighbor, newDist);
        prev.set(neighbor, current.node);
        pq.push(neighbor, newDist);
      }
    }
  }

  // Reconstruct path
  const totalDist = dist.get(endNodeId) ?? Infinity;
  if (totalDist === Infinity) return null;

  const path: string[] = [];
  let current: string | null | undefined = endNodeId;
  while (current != null) {
    path.unshift(current);
    current = prev.get(current) ?? null;
  }

  const pathCoordinates = path.map((nodeId) => {
    const node = nodeMap.get(nodeId)!;
    return { id: node.id, x: node.x, y: node.y, label: node.label, floor: node.floor };
  });

  return { path, distance: totalDist, pathCoordinates };
}

// ── Utility: compute distance from entry to every slot ───────

export function computeAllDistancesFromEntry(
  graph: ParkingGraph,
  entryNodeId: string
): Map<string, number> {
  const adj = buildAdjacencyList(graph.edges);
  const dist = new Map<string, number>();
  const visited = new Set<string>();
  const pq = new MinHeap();

  for (const node of graph.nodes) {
    dist.set(node.id, Infinity);
  }
  dist.set(entryNodeId, 0);
  pq.push(entryNodeId, 0);

  while (pq.size > 0) {
    const current = pq.pop()!;
    if (visited.has(current.node)) continue;
    visited.add(current.node);

    const neighbors = adj.get(current.node) ?? [];
    for (const { neighbor, weight } of neighbors) {
      if (visited.has(neighbor)) continue;
      const newDist = current.dist + weight;
      if (newDist < (dist.get(neighbor) ?? Infinity)) {
        dist.set(neighbor, newDist);
        pq.push(neighbor, newDist);
      }
    }
  }

  return dist;
}
