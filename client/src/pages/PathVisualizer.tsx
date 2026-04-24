import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { lotApi, slotApi, vehicleApi, bookingApi } from '../api';
import { Play, RotateCcw, Route, MapPin, Timer, Ruler, Zap, Layers, Car, Navigation, Accessibility, Crown, AlertCircle, ArrowRight } from 'lucide-react';
import './PathVisualizer.css';
import PageLoader from '../components/PageLoader';

/**
 * Grid-based Dijkstra Visualizer
 * Uses layoutData from saved lot for faithful grid reconstruction.
 * Click blue slots to pick destination, press Find Nearest Path to see
 * the exploration wave + shortest path animation.
 *
 * Vehicle selector: Users with multiple vehicles can pick which one,
 * and the system auto-highlights the booked slot for that vehicle.
 */

interface GridNode {
  row: number;
  col: number;
  isWall: boolean;
  isSlot: boolean;
  isEntry: boolean;
  isExit: boolean;
  isRamp: boolean;
  isStairs: boolean;
  isVisited: boolean;
  isPath: boolean;
  isBooked: boolean;
  isOccupied: boolean;
  isMine: boolean;
  slotType: string;
  distance: number;
  previousNode: GridNode | null;
  label: string;
}

const SPEED_VISIT = 15;
const SPEED_PATH = 45;

// ── A realistic demo parking lot grid ────────────────────
// W = wall, . = road, S = slot, E = entry, X = exit
const DEMO_LAYOUT = [
  'WWWWWWWWWWWWWWWWWWWWWWWWW',
  'WS.S.S.S.....S.S.S.S.S.W',
  'W.......................W',
  'WS.S.S.S.....S.S.S.S.S.W',
  'WWWWW....WWWWW....WWWWWW',
  'W.......................W',
  'WS.S.S.S.....S.S.S.S.S.W',
  'W.......................W',
  'WS.S.S.S.....S.S.S.S.S.W',
  'WWWWW....WWWWW....WWWWWW',
  'W.......................W',
  'WS.S.S.S.....S.S.S.S.S.W',
  'W.......................W',
  'E............X..........W',
  'WWWWWWWWWWWWWWWWWWWWWWWWW',
];

/*
  CellType from LotDesigner:
    0 = road, 1 = wall, 2 = slot, 3 = entry, 4 = exit, 5 = stairs, 6 = car ramp
*/

interface VehicleData {
  id: string;
  rfidTag: string;
  plateNo: string;
  activeSession: any;
}

export default function PathVisualizer() {
  const { lotId } = useParams<{ lotId: string }>();
  const [lot, setLot] = useState<any>(null);
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [cols, setCols] = useState(25);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<{ row: number; col: number } | null>(null);
  const [stats, setStats] = useState({ visited: 0, pathLen: 0, distance: 0 });
  const [speed, setSpeed] = useState(1); // 1x, 2x, 3x
  const [currentFloor, setCurrentFloor] = useState(1);
  const [totalFloors, setTotalFloors] = useState(1);
  const [slotStatusMap, setSlotStatusMap] = useState<Map<string, string>>(new Map());
  const [slotIdMap, setSlotIdMap] = useState<Map<string, string>>(new Map());
  const [slotTypeMap, setSlotTypeMap] = useState<Map<string, string>>(new Map());
  const [slotLabelMap, setSlotLabelMap] = useState<Map<string, string>>(new Map());
  const timeoutsRef = useRef<number[]>([]);

  // Vehicle selector state
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [mySlotId, setMySlotId] = useState<string | null>(null);
  // Stores the grid row/col for the user's booked slot
  const [mySlotGridPos, setMySlotGridPos] = useState<{ row: number; col: number } | null>(null);
  const [mySlotFloor, setMySlotFloor] = useState<number>(1);
  const [noTargetError, setNoTargetError] = useState(false);
  const [multiFloorPhase, setMultiFloorPhase] = useState<string | null>(null);
  // Track which vehicle plates are actually present in this lot
  const [lotVehiclePlates, setLotVehiclePlates] = useState<Set<string>>(new Set());
  // Map plate numbers to their slot info in this lot (for multi-vehicle support)
  const [plateToSlotMap, setPlateToSlotMap] = useState<Map<string, { id: string; floor: number; xCoord: number; yCoord: number }>>(new Map());
  // Pending floor transition — stores the continuation function for Phase 2
  const pendingPhase2Ref = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Fetch vehicles and active booking in parallel
    Promise.all([
      vehicleApi.getMy().then(r => r.data || []).catch(() => []),
      bookingApi.getActive().then(r => r.data).catch(() => null),
    ]).then(([vehiclesData, bookingData]) => {
      setVehicles(vehiclesData);
      setActiveBooking(bookingData);

      if (bookingData?.slot?.id && bookingData?.lot?.id === lotId) {
        setMySlotId(bookingData.slot.id);
        setMySlotFloor(bookingData.slot.floor || 1);
        // Compute grid position from the booking slot's xCoord/yCoord
        if (bookingData.slot.xCoord != null && bookingData.slot.yCoord != null) {
          const r = Math.round(bookingData.slot.yCoord / 30);
          const c = Math.round(bookingData.slot.xCoord / 30);
          setMySlotGridPos({ row: r, col: c });
        }
      }

      // Auto-select the vehicle that has the active booking in this lot
      if (bookingData?.vehicle?.plateNo && bookingData?.lot?.id === lotId && vehiclesData.length > 0) {
        const match = vehiclesData.find((v: VehicleData) => v.plateNo === bookingData.vehicle.plateNo);
        if (match) {
          setSelectedVehicleId(match.id);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (lotId && lotId !== 'demo') {
      // Fetch lot data and slot statuses in parallel
      Promise.all([
        lotApi.getOne(lotId),
        slotApi.getByLot(lotId).catch(() => ({ data: [] })),
      ]).then(([lotRes, slotRes]) => {
        const lotData = lotRes.data;
        setLot(lotData);
        setTotalFloors(lotData.floors || 1);

        // Build slot status & id & type & label maps keyed by "floor:row,col" from xCoord/yCoord
        const statusMap = new Map<string, string>();
        const idMap = new Map<string, string>();
        const typeMap = new Map<string, string>();
        const labelMap = new Map<string, string>();
        const slotArray = slotRes.data?.slots || slotRes.data || [];
        for (const slot of slotArray) {
          if (slot.xCoord != null && slot.yCoord != null) {
            const r = Math.round(slot.yCoord / 30);
            const c = Math.round(slot.xCoord / 30);
            const key = `${slot.floor}:${r},${c}`;
            statusMap.set(key, slot.status);
            idMap.set(key, slot.id);
            typeMap.set(key, slot.type || 'REGULAR');
            labelMap.set(key, `${slot.number}`);
          }
        }
        setSlotStatusMap(statusMap);
        setSlotIdMap(idMap);
        setSlotTypeMap(typeMap);
        setSlotLabelMap(labelMap);

        // Extract vehicle plates that are actually in this lot (from active sessions)
        const platesInLot = new Set<string>();
        const plateSlotMap = new Map<string, { id: string; floor: number; xCoord: number; yCoord: number }>();
        for (const slot of slotArray) {
          if (slot.activeSession?.vehicle?.plateNo) {
            const plate = slot.activeSession.vehicle.plateNo;
            platesInLot.add(plate);
            plateSlotMap.set(plate, {
              id: slot.id,
              floor: slot.floor,
              xCoord: slot.xCoord,
              yCoord: slot.yCoord,
            });
          }
        }
        setLotVehiclePlates(platesInLot);
        setPlateToSlotMap(plateSlotMap);

        if (lotData.graphData?.layoutData) {
          buildGridFromLayoutData(lotData, 1, statusMap, idMap, typeMap, labelMap);
        } else if (lotData.graphData) {
          buildGridFromGraph(lotData);
        } else {
          loadDemoGrid();
        }
      })
      .catch(() => loadDemoGrid())
      .finally(() => setLoading(false)); 
    } else {
      loadDemoGrid();
      setLoading(false); // ENSURES LOADER IS HIDDEN FOR DEMO
    }
    return () => clearAnimations();
  }, [lotId, mySlotId]);

  const clearAnimations = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Build grid from stored layoutData (exact replica of admin design)
  const buildGridFromLayoutData = (
    lotData: any, floor: number,
    statusMap?: Map<string, string>,
    idMap?: Map<string, string>,
    typeMap?: Map<string, string>,
    labelMap?: Map<string, string>
  ) => {
    const layoutData = lotData.graphData?.layoutData;
    if (!layoutData) return;

    const floorGrid: number[][] = layoutData[String(floor)];
    if (!floorGrid || floorGrid.length === 0) return;

    const floorMeta = lotData.graphData?.layoutMeta?.[String(floor)];

    const r = floorGrid.length;
    const c = floorGrid[0]!.length;
    setCols(c);
    setCurrentFloor(floor);

    let slotNum = 1;
    let hasEntryGate = false;
    let firstRampCell: { row: number; col: number } | null = null;

    const sMap = statusMap || slotStatusMap;
    const iMap = idMap || slotIdMap;
    const tMap = typeMap || slotTypeMap;
    const lMap = labelMap || slotLabelMap;
    const g: GridNode[][] = [];
    for (let ri = 0; ri < r; ri++) {
      const row: GridNode[] = [];
      for (let ci = 0; ci < c; ci++) {
        const cellType = floorGrid[ri]![ci]!;
        const meta = floorMeta?.[ri]?.[ci];
        const node = createNode(ri, ci);
        if (cellType === 1) node.isWall = true;
        else if (cellType === 2) {
          node.isSlot = true;
          slotNum++;
          // Use real slot label from server data
          const key = `${floor}:${ri},${ci}`;
          const slotStatus = sMap.get(key);
          const slotId = iMap.get(key);
          const slotType = tMap.get(key);
          const slotLabel = lMap.get(key);
          node.label = slotLabel || `P${slotNum}`;
          node.slotType = slotType || 'REGULAR';
          if (slotStatus === 'RESERVED') node.isBooked = true;
          else if (slotStatus === 'OCCUPIED') node.isOccupied = true;
          // Check if this is the user's booked slot
          if (mySlotId && slotId === mySlotId) {
            node.isMine = true;
          }
        }
        else if (cellType === 3) { node.isEntry = true; node.label = 'Entry Gate'; hasEntryGate = true; }
        else if (cellType === 4) { node.isExit = true; node.label = 'Exit Gate'; }
        else if (cellType === 5) { node.isStairs = true; node.label = 'Stairs'; }
        else if (cellType === 6) {
          node.isRamp = true;
          const dir = meta?.rampDirection || 'twoway';
          if (dir === 'up') node.label = 'Up Ramp ⬆️';
          else if (dir === 'down') node.label = 'Down Ramp ⬇️';
          else node.label = 'Two-way Ramp ↕️';

          if (!firstRampCell) {
            if (floor > 1 && (dir === 'up' || dir === 'twoway' || dir === 'down')) {
              firstRampCell = { row: ri, col: ci };
            }
          }
        }
        row.push(node);
      }
      g.push(row);
    }

    // On upper floors with no entry gate, use ramp position as the entry point
    if (!hasEntryGate && firstRampCell && floor > 1) {
      const rampNode = g[firstRampCell.row]![firstRampCell.col]!;
      rampNode.isEntry = true;
      rampNode.isRamp = false;
      rampNode.label = `Ramp Entry (from F${floor - 1})`;
    }

    setGrid(g);
    setSelectedTarget(null);
    setFinished(false);
    setStats({ visited: 0, pathLen: 0, distance: 0 });
  };

  // Parse the ASCII art demo layout into a grid
  const loadDemoGrid = () => {
    const layout = DEMO_LAYOUT;
    const r = layout.length;
    const c = layout[0]!.length;
    setCols(c);
    let slotNum = 1;
    const g: GridNode[][] = [];
    for (let ri = 0; ri < r; ri++) {
      const row: GridNode[] = [];
      for (let ci = 0; ci < c; ci++) {
        const ch = layout[ri]![ci]!;
        const node = createNode(ri, ci);
        if (ch === 'W') node.isWall = true;
        else if (ch === 'S') { node.isSlot = true; node.label = `P${slotNum++}`; }
        else if (ch === 'E') { node.isEntry = true; node.label = 'Entry Gate'; }
        else if (ch === 'X') { node.isExit = true; node.label = 'Exit Gate'; }
        row.push(node);
      }
      g.push(row);
    }
    setGrid(g);
  };

  const buildGridFromGraph = (lotData: any) => {
    const nodes = lotData.graphData?.nodes || [];
    const maxX = Math.max(...nodes.map((n: any) => n.x), 300);
    const maxY = Math.max(...nodes.map((n: any) => n.y), 200);
    const cellSize = 30;
    const r = Math.ceil(maxY / cellSize) + 2;
    const c = Math.ceil(maxX / cellSize) + 2;
    setCols(c);

    const newGrid: GridNode[][] = [];
    for (let ri = 0; ri < r; ri++) {
      const row: GridNode[] = [];
      for (let ci = 0; ci < c; ci++) row.push(createNode(ri, ci));
      newGrid.push(row);
    }

    // Map graph nodes to grid positions
    const mappedCells = new Set<string>();
    for (const node of nodes) {
      const gr = Math.round(node.y / cellSize);
      const gc = Math.round(node.x / cellSize);
      if (gr >= 0 && gr < r && gc >= 0 && gc < c) {
        const cell = newGrid[gr]![gc]!;
        cell.label = node.label || '';
        mappedCells.add(`${gr},${gc}`);
        if (node.id === lotData.entryNodeId || node.id === 'entry') cell.isEntry = true;
        else if (node.id === 'exit') cell.isExit = true;
        else if (node.id.startsWith('s-')) { cell.isSlot = true; cell.label = node.label; }
        else if (node.id.startsWith('ramp-')) { cell.isRamp = true; cell.label = node.label; }
        else if (node.id.startsWith('stairs-')) { cell.isStairs = true; cell.label = node.label; }
      }
    }

    // Mark unmapped cells as walls
    for (let ri = 0; ri < r; ri++)
      for (let ci = 0; ci < c; ci++)
        if (!mappedCells.has(`${ri},${ci}`)) newGrid[ri]![ci]!.isWall = true;

    setGrid(newGrid);
  };

  const createNode = (row: number, col: number): GridNode => ({
    row, col,
    isWall: false, isSlot: false, isEntry: false, isExit: false,
    isRamp: false, isStairs: false,
    isVisited: false, isPath: false,
    isBooked: false, isOccupied: false, isMine: false,
    slotType: 'REGULAR',
    distance: Infinity, previousNode: null, label: '',
  });

  const handleCellClick = (row: number, col: number) => {
    if (running) return;
    const cell = grid[row]?.[col];
    if (!cell || cell.isWall || cell.isEntry) return;
    // Allow clicking only free slots (not booked/occupied), exits, or ramps
    if ((cell.isSlot && !cell.isBooked && !cell.isOccupied) || cell.isExit || cell.isRamp || cell.isMine) {
      setSelectedTarget({ row, col });
      resetVisualization();
    }
  };

  const resetVisualization = useCallback(() => {
    clearAnimations();
    setRunning(false); setFinished(false);
    setStats({ visited: 0, pathLen: 0, distance: 0 });
    // Reset classes via DOM for speed
    grid.forEach((row, r) => row.forEach((_, c) => {
      const el = document.getElementById(`pv-${r}-${c}`);
      if (el) {
        const cell = grid[r]![c]!;
        el.className = getCellClass(cell);
      }
    }));
    setGrid(prev => prev.map(row => row.map(cell => ({
      ...cell, isVisited: false, isPath: false, distance: Infinity, previousNode: null,
    }))));
  }, [grid]);

  // Floor switching
  const switchFloor = (floor: number) => {
    if (!lot?.graphData?.layoutData) return;
    clearAnimations();
    setRunning(false);
    setFinished(false);
    buildGridFromLayoutData(lot, floor, slotStatusMap, slotIdMap, slotTypeMap, slotLabelMap);
  };

  // When a vehicle is selected, check if it has an active booking/session with a slot in this lot
  const handleVehicleSelect = (vId: string) => {
    setSelectedVehicleId(vId);
    setNoTargetError(false);
    if (!vId) {
      setMySlotId(null);
      setMySlotGridPos(null);
      return;
    }

    const vehicle = vehicles.find(v => v.id === vId);
    if (!vehicle) return;

    // Check if the active booking's vehicle matches this one AND is in the current lot
    if (activeBooking?.vehicle?.plateNo === vehicle.plateNo && activeBooking?.slot && activeBooking?.lot?.id === lotId) {
      const slot = activeBooking.slot;
      setMySlotId(slot.id);
      setMySlotFloor(slot.floor || 1);

      // Compute grid row/col from slot's xCoord/yCoord
      if (slot.xCoord != null && slot.yCoord != null) {
        const gridRow = Math.round(slot.yCoord / 30);
        const gridCol = Math.round(slot.xCoord / 30);
        setMySlotGridPos({ row: gridRow, col: gridCol });

        // Switch floor if needed
        if (slot.floor && slot.floor !== currentFloor && lot?.graphData?.layoutData) {
          buildGridFromLayoutData(lot, slot.floor, slotStatusMap, slotIdMap, slotTypeMap, slotLabelMap);
        }

        // Auto-target this slot
        setSelectedTarget({ row: gridRow, col: gridCol });
      }
      return;
    }

    // Fallback: check if this vehicle is in this lot via slot session data
    const slotInfo = plateToSlotMap.get(vehicle.plateNo);
    if (slotInfo && slotInfo.xCoord != null && slotInfo.yCoord != null) {
      setMySlotId(slotInfo.id);
      setMySlotFloor(slotInfo.floor || 1);
      const gridRow = Math.round(slotInfo.yCoord / 30);
      const gridCol = Math.round(slotInfo.xCoord / 30);
      setMySlotGridPos({ row: gridRow, col: gridCol });

      // Switch floor if needed
      if (slotInfo.floor && slotInfo.floor !== currentFloor && lot?.graphData?.layoutData) {
        buildGridFromLayoutData(lot, slotInfo.floor, slotStatusMap, slotIdMap, slotTypeMap, slotLabelMap);
      }

      setSelectedTarget({ row: gridRow, col: gridCol });
      return;
    }

    // No booking or session for this vehicle in this lot
    setMySlotId(null);
    setMySlotGridPos(null);
    setMySlotFloor(1);
  };

  // Find all ramp cells on a given floor's grid
  const findRampCells = (g: GridNode[][], lotData: any, floor: number): { row: number; col: number; dir: string }[] => {
    const ramps: { row: number; col: number; dir: string }[] = [];
    const floorMeta = lotData?.graphData?.layoutMeta?.[String(floor)];
    for (let ri = 0; ri < g.length; ri++) {
      for (let ci = 0; ci < g[0]!.length; ci++) {
        const cell = g[ri]![ci]!;
        if (cell.isRamp) {
          const dir = floorMeta?.[ri]?.[ci]?.rampDirection || 'twoway';
          ramps.push({ row: ri, col: ci, dir });
        }
      }
    }
    return ramps;
  };

  const findPathToMySlot = () => {
    if (!mySlotGridPos) return;
    setNoTargetError(false);
    setMultiFloorPhase(null);

    const slotFloor = mySlotFloor;

    // Same floor as entry (floor 1) — simple path
    if (slotFloor <= 1 || !lot?.graphData?.layoutData) {
      // Make sure we're on floor 1
      if (currentFloor !== 1 && lot?.graphData?.layoutData) {
        buildGridFromLayoutData(lot, 1, slotStatusMap, slotIdMap, slotTypeMap, slotLabelMap);
      }
      setSelectedTarget({ row: mySlotGridPos.row, col: mySlotGridPos.col });
      setTimeout(() => {
        runDijkstraWithTarget(mySlotGridPos.row, mySlotGridPos.col);
      }, 50);
      return;
    }

    // Multi-floor path: slot is on a different floor
    runMultiFloorPath(slotFloor);
  };

  // Multi-floor pathfinding: Entry → Ramp (floor 1) → switch floor → Ramp → Slot (target floor)
  const runMultiFloorPath = (targetFloor: number) => {
    if (running || !lot?.graphData?.layoutData || !mySlotGridPos) return;

    // Phase 1: Build floor 1 grid and find path to nearest up/twoway ramp
    setMultiFloorPhase('Phase 1: Finding path to ramp on Floor 1...');
    buildGridFromLayoutData(lot, 1, slotStatusMap, slotIdMap, slotTypeMap, slotLabelMap);

    // We need to wait for the grid state to update
    setTimeout(() => {
      // Build a fresh floor 1 grid locally (can't rely on async state)
      const layoutData = lot.graphData.layoutData;
      const floorGrid: number[][] = layoutData[String(1)];
      const floorMeta = lot.graphData?.layoutMeta?.[String(1)];
      if (!floorGrid) return;

      const r = floorGrid.length;
      const c = floorGrid[0]!.length;

      // Build the grid
      let slotNum = 1;
      const sMap = slotStatusMap;
      const iMap = slotIdMap;
      const tMap = slotTypeMap;
      const lMap = slotLabelMap;
      const g: GridNode[][] = [];
      for (let ri = 0; ri < r; ri++) {
        const row: GridNode[] = [];
        for (let ci = 0; ci < c; ci++) {
          const cellType = floorGrid[ri]![ci]!;
          const meta = floorMeta?.[ri]?.[ci];
          const node = createNode(ri, ci);
          if (cellType === 1) node.isWall = true;
          else if (cellType === 2) {
            node.isSlot = true;
            slotNum++;
            const key = `1:${ri},${ci}`;
            const slotStatus = sMap.get(key);
            const slotId = iMap.get(key);
            const slotType = tMap.get(key);
            const slotLabel = lMap.get(key);
            node.label = slotLabel || `P${slotNum}`;
            node.slotType = slotType || 'REGULAR';
            if (slotStatus === 'RESERVED') node.isBooked = true;
            else if (slotStatus === 'OCCUPIED') node.isOccupied = true;
            if (mySlotId && slotId === mySlotId) node.isMine = true;
          }
          else if (cellType === 3) { node.isEntry = true; node.label = 'Entry Gate'; }
          else if (cellType === 4) { node.isExit = true; node.label = 'Exit Gate'; }
          else if (cellType === 5) { node.isStairs = true; node.label = 'Stairs'; }
          else if (cellType === 6) {
            node.isRamp = true;
            const dir = meta?.rampDirection || 'twoway';
            if (dir === 'up') node.label = 'Up Ramp ⬆️';
            else if (dir === 'down') node.label = 'Down Ramp ⬇️';
            else node.label = 'Two-way Ramp ↕️';
          }
          row.push(node);
        }
        g.push(row);
      }

      setCols(c);
      setCurrentFloor(1);
      setGrid(g);

      // Find all up/twoway ramps on floor 1
      const ramps = findRampCells(g, lot, 1).filter(rp => rp.dir === 'up' || rp.dir === 'twoway');
      if (ramps.length === 0) {
        setMultiFloorPhase('No ramp found on Floor 1!');
        setRunning(false);
        return;
      }

      // Find entry node
      let startNode: GridNode | null = null;
      for (const row of g) {
        for (const cell of row) {
          if (cell.isEntry) { startNode = cell; break; }
        }
        if (startNode) break;
      }
      if (!startNode) return;

      // Find nearest ramp by running Dijkstra to each ramp and picking shortest
      let bestRamp: { row: number; col: number } | null = null;
      let bestDist = Infinity;
      let bestVisited: GridNode[] = [];
      let bestPath: GridNode[] = [];

      for (const ramp of ramps) {
        const testGrid = g.map(row => row.map(cell => ({
          ...cell, isVisited: false, isPath: false, distance: Infinity, previousNode: null,
        })));
        const testStart = testGrid[startNode.row]![startNode.col]!;
        const testFinish = testGrid[ramp.row]![ramp.col]!;
        const visited = dijkstra(testGrid, testStart, testFinish);
        if (testFinish.distance < bestDist) {
          bestDist = testFinish.distance;
          bestRamp = { row: ramp.row, col: ramp.col };
          bestVisited = visited;
          bestPath = backtrackPath(testFinish);
        }
      }

      if (!bestRamp || bestDist === Infinity) {
        setMultiFloorPhase('No path to ramp found!');
        setRunning(false);
        return;
      }

      // Set the grid state to show the path
      const freshGrid = g.map(row => row.map(cell => ({
        ...cell, isVisited: false, isPath: false, distance: Infinity, previousNode: null,
      })));
      const actualStart = freshGrid[startNode.row]![startNode.col]!;
      const actualFinish = freshGrid[bestRamp.row]![bestRamp.col]!;
      const visitedPhase1 = dijkstra(freshGrid, actualStart, actualFinish);
      const pathPhase1 = backtrackPath(actualFinish);

      setGrid(freshGrid);
      setRunning(true);
      setSelectedTarget({ row: bestRamp.row, col: bestRamp.col });

      // Animate Phase 1, then pause for user confirmation before Phase 2
      const savedBestRamp = bestRamp;
      animateWithCallback(visitedPhase1, pathPhase1, () => {
        // Phase 1 complete — ask user for confirmation before transitioning
        setStats(p => ({ ...p, pathLen: pathPhase1.length, distance: pathPhase1.length - 1 }));
        setRunning(false);
        setMultiFloorPhase(`CONFIRM:${targetFloor}`);

        // Store the Phase 2 continuation
        pendingPhase2Ref.current = () => {
          setRunning(true);
          setMultiFloorPhase(`Phase 2: Finding path to slot on Floor ${targetFloor}...`);
          buildGridFromLayoutData(lot, targetFloor, slotStatusMap, slotIdMap, slotTypeMap, slotLabelMap);

          setTimeout(() => {
            // Build target floor grid locally
            const targetGridData: number[][] = layoutData[String(targetFloor)];
            const targetMeta = lot.graphData?.layoutMeta?.[String(targetFloor)];
            if (!targetGridData) return;

            const tr = targetGridData.length;
            const tc = targetGridData[0]!.length;
            let tSlotNum = 1;
            let rampEntryPos: { row: number; col: number } | null = null;
            const tg: GridNode[][] = [];
            for (let ri = 0; ri < tr; ri++) {
              const row: GridNode[] = [];
              for (let ci = 0; ci < tc; ci++) {
                const cellType = targetGridData[ri]![ci]!;
                const meta = targetMeta?.[ri]?.[ci];
                const node = createNode(ri, ci);
                if (cellType === 1) node.isWall = true;
                else if (cellType === 2) {
                  node.isSlot = true;
                  tSlotNum++;
                  const key = `${targetFloor}:${ri},${ci}`;
                  const slotStatus = sMap.get(key);
                  const slotId = iMap.get(key);
                  const slotType = tMap.get(key);
                  const slotLabel = lMap.get(key);
                  node.label = slotLabel || `P${tSlotNum}`;
                  node.slotType = slotType || 'REGULAR';
                  if (slotStatus === 'RESERVED') node.isBooked = true;
                  else if (slotStatus === 'OCCUPIED') node.isOccupied = true;
                  if (mySlotId && slotId === mySlotId) node.isMine = true;
                }
                else if (cellType === 3) { node.isEntry = true; node.label = 'Entry Gate'; }
                else if (cellType === 4) { node.isExit = true; node.label = 'Exit Gate'; }
                else if (cellType === 5) { node.isStairs = true; node.label = 'Stairs'; }
                else if (cellType === 6) {
                  node.isRamp = true;
                  const dir = meta?.rampDirection || 'twoway';
                  if (dir === 'up') node.label = 'Up Ramp ⬆️';
                  else if (dir === 'down') node.label = 'Down Ramp ⬇️';
                  else node.label = 'Two-way Ramp ↕️';
                  if (!rampEntryPos) {
                    if (ri === savedBestRamp.row && ci === savedBestRamp.col) {
                      rampEntryPos = { row: ri, col: ci };
                    } else if (dir === 'down' || dir === 'twoway') {
                      rampEntryPos = { row: ri, col: ci };
                    }
                  } else if (ri === savedBestRamp.row && ci === savedBestRamp.col) {
                    rampEntryPos = { row: ri, col: ci };
                  }
                }
                row.push(node);
              }
              tg.push(row);
            }

            // Fallback: find any ramp
            if (!rampEntryPos) {
              for (let ri = 0; ri < tr; ri++) {
                for (let ci = 0; ci < tc; ci++) {
                  if (tg[ri]![ci]!.isRamp) {
                    rampEntryPos = { row: ri, col: ci };
                    break;
                  }
                }
                if (rampEntryPos) break;
              }
            }

            if (!rampEntryPos) {
              setMultiFloorPhase(`No ramp found on Floor ${targetFloor}!`);
              setRunning(false);
              return;
            }

            // Mark the ramp as entry point for this floor
            const rampNode = tg[rampEntryPos.row]![rampEntryPos.col]!;
            rampNode.isEntry = true;
            rampNode.isRamp = false;
            rampNode.label = `Ramp Entry (from F${targetFloor - 1})`;

            setCols(tc);
            setCurrentFloor(targetFloor);
            setGrid(tg);

            const slotRow = mySlotGridPos!.row;
            const slotCol = mySlotGridPos!.col;
            setSelectedTarget({ row: slotRow, col: slotCol });

            setTimeout(() => {
              const freshTg = tg.map(row => row.map(cell => ({
                ...cell, isVisited: false, isPath: false, distance: Infinity, previousNode: null,
              })));

              let p2Start: GridNode | null = null;
              let p2Finish: GridNode | null = null;
              for (const row of freshTg) {
                for (const cell of row) {
                  if (cell.isEntry) p2Start = cell;
                  if (cell.row === slotRow && cell.col === slotCol) p2Finish = cell;
                }
              }

              if (!p2Start || !p2Finish) {
                setMultiFloorPhase('Could not find start/finish on target floor');
                setRunning(false);
                return;
              }

              setGrid(freshTg);
              const visitedPhase2 = dijkstra(freshTg, p2Start, p2Finish);
              const pathPhase2 = backtrackPath(p2Finish);

              animateWithCallback(visitedPhase2, pathPhase2, () => {
                const totalPath = pathPhase1.length + pathPhase2.length;
                const totalDist = (pathPhase1.length - 1) + (pathPhase2.length - 1);
                setRunning(false);
                setFinished(true);
                setMultiFloorPhase(null);
                setStats({ visited: visitedPhase1.length + visitedPhase2.length, pathLen: totalPath, distance: totalDist });
              });
            }, 100);
          }, 100);
        };
      });
    }, 100);
  };

  // User confirms floor transition
  const confirmFloorTransition = () => {
    if (pendingPhase2Ref.current) {
      const phase2 = pendingPhase2Ref.current;
      pendingPhase2Ref.current = null;
      phase2();
    }
  };

  // ── DIJKSTRA'S ALGORITHM ─────────────────────────
  // Main button handler — requires a target to be selected first
  const runDijkstra = () => {
    if (running) return;
    if (!selectedTarget) {
      setNoTargetError(true);
      return;
    }
    setNoTargetError(false);
    runDijkstraWithTarget(selectedTarget.row, selectedTarget.col);
  };

  // Core Dijkstra runner with explicit target coordinates
  const runDijkstraWithTarget = (targetRow: number, targetCol: number) => {
    if (running) return;
    let startNode: GridNode | null = null;
    let finishNode: GridNode | null = null;

    const freshGrid = grid.map(row => row.map(cell => ({
      ...cell, isVisited: false, isPath: false, distance: Infinity, previousNode: null,
    })));

    for (const row of freshGrid) {
      for (const cell of row) {
        if (cell.isEntry) startNode = cell;
        if (cell.row === targetRow && cell.col === targetCol) finishNode = cell;
      }
    }

    if (!startNode || !finishNode) return;

    setGrid(freshGrid);
    setRunning(true);
    setSelectedTarget({ row: finishNode.row, col: finishNode.col });

    // Run algorithm
    const visitedNodes = dijkstra(freshGrid, startNode, finishNode);
    const path = backtrackPath(finishNode);
    animate(visitedNodes, path);
  };

  const dijkstra = (g: GridNode[][], start: GridNode, finish: GridNode): GridNode[] => {
    const visited: GridNode[] = [];
    start.distance = 0;
    const unvisited = g.flat().slice();

    while (unvisited.length) {
      unvisited.sort((a, b) => a.distance - b.distance);
      const cur = unvisited.shift()!;
      if (cur.isWall) continue;
      if (cur.distance === Infinity) return visited;
      cur.isVisited = true;
      visited.push(cur);
      if (cur === finish) return visited;

      const { row, col } = cur;
      const neighbors: GridNode[] = [];
      if (row > 0) neighbors.push(g[row-1]![col]!);
      if (row < g.length-1) neighbors.push(g[row+1]![col]!);
      if (col > 0) neighbors.push(g[row]![col-1]!);
      if (col < g[0]!.length-1) neighbors.push(g[row]![col+1]!);

      for (const nb of neighbors) {
        // Only traverse roads — slots/ramps/stairs are blocked unless it's the destination
        const isPassable = !nb.isWall && (!nb.isSlot || nb === finish) && (!nb.isRamp || nb === finish) && (!nb.isStairs || nb === finish);
        if (!nb.isVisited && isPassable) {
          const d = cur.distance + 1;
          if (d < nb.distance) { nb.distance = d; nb.previousNode = cur; }
        }
      }
    }
    return visited;
  };

  const backtrackPath = (finish: GridNode): GridNode[] => {
    const path: GridNode[] = [];
    let cur: GridNode | null = finish;
    while (cur) { path.unshift(cur); cur = cur.previousNode; }
    return path;
  };

  const animate = (visited: GridNode[], path: GridNode[]) => {
    const vSpd = Math.max(3, SPEED_VISIT / speed);
    const pSpd = Math.max(10, SPEED_PATH / speed);

    for (let i = 0; i <= visited.length; i++) {
      if (i === visited.length) {
        const t = window.setTimeout(() => {
          setStats(p => ({ ...p, visited: visited.length }));
          animatePath(path, pSpd);
        }, vSpd * i);
        timeoutsRef.current.push(t);
        return;
      }
      const t = window.setTimeout(() => {
        const n = visited[i]!;
        const el = document.getElementById(`pv-${n.row}-${n.col}`);
        if (el && !n.isEntry && !n.isSlot && !n.isExit && !n.isRamp && !n.isStairs) el.className = 'pv-cell pv-visited';
      }, vSpd * i);
      timeoutsRef.current.push(t);
    }
  };

  const animatePath = (path: GridNode[], pSpd: number) => {
    for (let i = 0; i < path.length; i++) {
      const t = window.setTimeout(() => {
        const n = path[i]!;
        const el = document.getElementById(`pv-${n.row}-${n.col}`);
        if (el) el.className = 'pv-cell pv-shortest-path';
        if (i === path.length - 1) {
          setRunning(false); setFinished(true);
          setStats(p => ({ ...p, pathLen: path.length, distance: path.length - 1 }));
        }
      }, pSpd * i);
      timeoutsRef.current.push(t);
    }
  };

  // Animate with a callback when done (for multi-floor chaining)
  const animateWithCallback = (visited: GridNode[], path: GridNode[], onComplete: () => void) => {
    const vSpd = Math.max(3, SPEED_VISIT / speed);
    const pSpd = Math.max(10, SPEED_PATH / speed);

    for (let i = 0; i <= visited.length; i++) {
      if (i === visited.length) {
        const t = window.setTimeout(() => {
          setStats(p => ({ ...p, visited: p.visited + visited.length }));
          // Animate path then call onComplete
          for (let j = 0; j < path.length; j++) {
            const t2 = window.setTimeout(() => {
              const n = path[j]!;
              const el = document.getElementById(`pv-${n.row}-${n.col}`);
              if (el) el.className = 'pv-cell pv-shortest-path';
              if (j === path.length - 1) {
                onComplete();
              }
            }, pSpd * j);
            timeoutsRef.current.push(t2);
          }
        }, vSpd * i);
        timeoutsRef.current.push(t);
        return;
      }
      const t = window.setTimeout(() => {
        const n = visited[i]!;
        const el = document.getElementById(`pv-${n.row}-${n.col}`);
        if (el && !n.isEntry && !n.isSlot && !n.isExit && !n.isRamp && !n.isStairs) el.className = 'pv-cell pv-visited';
      }, vSpd * i);
      timeoutsRef.current.push(t);
    }
  };

  const getSlotTypeIcon = (cell: GridNode) => {
    if (!cell.isSlot) return null;
    if (cell.slotType === 'EV_CHARGING') return <Zap size={10} />;
    if (cell.slotType === 'PREMIUM') return <Crown size={10} />;
    if (cell.slotType === 'HANDICAPPED') return <Accessibility size={10} />;
    return null;
  };

  const getCellClass = (cell: GridNode): string => {
    const cls = ['pv-cell'];
    if (cell.isEntry) cls.push('pv-entry');
    else if (cell.isExit) cls.push('pv-exit');
    else if (cell.isSlot) {
      if (cell.isMine) cls.push('pv-slot-mine');
      else if (cell.isBooked) cls.push('pv-slot-booked');
      else if (cell.isOccupied) cls.push('pv-slot-occupied');
      else cls.push('pv-slot');
      // Slot type sub-class
      if (cell.slotType === 'EV_CHARGING') cls.push('pv-type-ev');
      else if (cell.slotType === 'HANDICAPPED') cls.push('pv-type-handicap');
      else if (cell.slotType === 'PREMIUM') cls.push('pv-type-premium');
    }
    else if (cell.isRamp) cls.push('pv-ramp');
    else if (cell.isStairs) cls.push('pv-stairs');
    else if (cell.isWall) cls.push('pv-wall');
    if (selectedTarget?.row === cell.row && selectedTarget?.col === cell.col) cls.push('pv-target');
    return cls.join(' ');
  };

  // --- LOADER RENDER BLOCK ADDED HERE ---
  if (loading) {
    return (
      <div className="path-visualizer animate-in">
        <div className="page-header">
          <h1><Route size={24} /> Navigate to Your Spot</h1>
          <p>Loading visualizer map...</p>
        </div>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="path-visualizer animate-in">
      <div className="page-header">
        <h1><Route size={24} /> Navigate to Your Spot</h1>
        <p>{lot ? lot.name : 'Interactive pathfinding visualizer'}</p>
      </div>

      {/* Vehicle Selector — only show vehicles in this lot */}
      {(() => {
        // Filter vehicles to only those present in this lot
        const vehiclesInLot = vehicles.filter(v =>
          lotVehiclePlates.has(v.plateNo) ||
          (activeBooking?.vehicle?.plateNo === v.plateNo && activeBooking?.lot?.id === lotId)
        );
        return vehiclesInLot.length > 0 ? (
          <div className="pv-vehicle-selector glass-card">
            <Car size={16} />
            <span className="pv-vs-label">Vehicle:</span>
            <select
              value={selectedVehicleId}
              onChange={(e) => handleVehicleSelect(e.target.value)}
              className="pv-vs-dropdown"
            >
              <option value="">— Select a vehicle —</option>
              {vehiclesInLot.map(v => (
                <option key={v.id} value={v.id}>
                  {v.plateNo} ({v.rfidTag})
                </option>
              ))}
            </select>
            {mySlotId && (
              <button className="btn btn-primary btn-sm pv-my-slot-btn" onClick={findPathToMySlot} disabled={running}>
                <Navigation size={14} /> Find Path to My Slot
              </button>
            )}
          </div>
        ) : null;
      })()}

      {/* Floor Selector */}
      {totalFloors > 1 && (
        <div className="pv-floor-selector glass-card">
          <Layers size={16} />
          <span>Floor:</span>
          {Array.from({ length: totalFloors }, (_, i) => i + 1).map(f => (
            <button key={f}
              className={`floor-btn ${currentFloor === f ? 'active' : ''}`}
              onClick={() => switchFloor(f)}>
              F{f}
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="pv-controls glass-card">
        <button className="btn btn-primary" onClick={runDijkstra} disabled={running}>
          <Play size={16} /> {running ? 'Finding Path...' : 'Find Path'}
        </button>
        <button className="btn btn-secondary" onClick={resetVisualization} disabled={running}>
          <RotateCcw size={16} /> Reset
        </button>
        <div className="speed-controls">
          <Zap size={14} />
          {[1,2,3].map(s => (
            <button key={s} className={`speed-btn ${speed === s ? 'active' : ''}`}
              onClick={() => setSpeed(s)}>{s}x</button>
          ))}
        </div>
        <div className="pv-stats">
          <span><Timer size={14} /> Visited: <strong>{stats.visited}</strong></span>
          <span><Route size={14} /> Path: <strong>{stats.pathLen}</strong></span>
          <span><Ruler size={14} /> Dist: <strong>{stats.distance}</strong></span>
        </div>
      </div>

      {/* No target warning */}
      {noTargetError && (
        <div className="pv-no-target glass-card">
          <AlertCircle size={16} color="#f59e0b" />
          <span>Please <strong>select a slot</strong> first by clicking a blue cell on the grid, or select your vehicle above to auto-target your booked slot.</span>
        </div>
      )}

      {/* Multi-floor phase indicator */}
      {multiFloorPhase && (
        <div className="pv-no-target glass-card" style={{ borderColor: '#0fb9b1', background: 'rgba(15,185,177,0.08)' }}>
          <Layers size={16} color="#0fb9b1" />
          {multiFloorPhase.startsWith('CONFIRM:') ? (
            <>
              <span style={{ color: '#0c8c8c', fontWeight: 600, flex: 1 }}>
                ⬆️ Path to ramp found! Proceed to Floor {multiFloorPhase.split(':')[1]}?
              </span>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginLeft: 12, whiteSpace: 'nowrap' }}
                onClick={confirmFloorTransition}
              >
                <ArrowRight size={14} /> Proceed to Floor {multiFloorPhase.split(':')[1]}
              </button>
            </>
          ) : (
            <span style={{ color: '#0c8c8c', fontWeight: 600 }}>{multiFloorPhase}</span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="pv-legend">
        <div className="legend-item"><span className="pv-cell-mini pv-entry-mini" /> Entry</div>
        <div className="legend-item"><span className="pv-cell-mini pv-exit-mini" /> Exit</div>
        <div className="legend-item"><span className="pv-cell-mini pv-slot-mini" /> Slot (Free)</div>
        <div className="legend-item"><span className="pv-cell-mini pv-booked-mini" /> Reserved</div>
        <div className="legend-item"><span className="pv-cell-mini pv-occupied-mini" /> Occupied</div>
        {mySlotId && <div className="legend-item"><span className="pv-cell-mini pv-mine-mini" /> Your Slot</div>}
        <div className="legend-item"><span className="pv-cell-mini pv-ramp-mini" /> Ramp</div>
        <div className="legend-item"><span className="pv-cell-mini pv-stairs-mini" /> Stairs</div>
        <div className="legend-item"><span className="pv-cell-mini pv-wall-mini" /> Wall</div>
        <div className="legend-item"><span className="pv-cell-mini pv-visited-mini" /> Explored</div>
        <div className="legend-item"><span className="pv-cell-mini pv-path-mini" /> Shortest Path</div>
        <div className="legend-item"><span className="pv-cell-mini pv-target-mini" /> Target</div>
      </div>

      {/* Slot type legend */}
      <div className="pv-legend pv-type-legend">
        <span className="pv-type-legend-label">Slot Types:</span>
        <div className="legend-item"><span className="pv-cell-mini pv-ev-type-mini" /><Zap size={10} /> EV Charging</div>
        <div className="legend-item"><span className="pv-cell-mini pv-handicap-type-mini" /><Accessibility size={10} /> Handicapped</div>
        <div className="legend-item"><span className="pv-cell-mini pv-premium-type-mini" /><Crown size={10} /> Premium</div>
      </div>

      <p className="pv-help">
        <MapPin size={14} /> Click a <strong>blue (free) slot</strong> to set destination → press <strong>Find Path</strong>. Orange = reserved, Red = occupied.
      </p>

      {/* Grid with row/col numbers */}
      <div className="pv-grid-wrapper glass-card">
        {/* Column numbers */}
        <div className="pv-col-numbers" style={{ gridTemplateColumns: `32px repeat(${cols}, 34px)` }}>
          <div className="pv-grid-number corner" />
          {Array.from({ length: cols }, (_, i) => (
            <div key={i} className="pv-grid-number col-num">{i + 1}</div>
          ))}
        </div>

        <div className="pv-grid-body">
          {grid.map((row, r) => (
            <div key={r} className="pv-grid-row" style={{ gridTemplateColumns: `32px repeat(${cols}, 34px)` }}>
              <div className="pv-grid-number row-num">{r + 1}</div>
              {row.map((cell, c) => (
                <div key={`${r}-${c}`}
                  id={`pv-${r}-${c}`}
                  className={getCellClass(cell)}
                  onClick={() => handleCellClick(r, c)}
                  title={cell.label ? `${cell.label}${cell.slotType && cell.slotType !== 'REGULAR' ? ` [${cell.slotType.replace('_', ' ')}]` : ''}${cell.isMine ? ' ★ YOUR SLOT' : ''}` : `(${r},${c})`}
                >
                  {cell.isSlot && <span className="pv-cell-label">{cell.label}</span>}
                  {cell.isEntry && <span className="pv-cell-label">E</span>}
                  {cell.isExit && <span className="pv-cell-label">X</span>}
                  {cell.isRamp && <span className="pv-cell-label">R</span>}
                  {cell.isStairs && <span className="pv-cell-label">S</span>}
                  {getSlotTypeIcon(cell)}
                  {cell.isMine && <span className="pv-mine-badge">★</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      {finished && selectedTarget && (
        <div className="pv-result glass-card animate-slide-up">
          <h3>🎯 Path Found!</h3>
          <p>
            <strong>Entry</strong> → <strong>{grid[selectedTarget.row]?.[selectedTarget.col]?.label || 'Target'}</strong>
            : <strong>{stats.distance} steps</strong> ({stats.visited} nodes explored)
          </p>
        </div>
      )}
    </div>
  );
}
