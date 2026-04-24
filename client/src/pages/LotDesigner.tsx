import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lotApi, slotAdminApi } from '../api';
import {
  Save, RotateCcw, ParkingSquare, DoorOpen, DoorClosed, Blocks, Eraser,
  CheckCircle, AlertCircle, Footprints, ArrowUpDown, Zap, Crown, Accessibility,
  ChevronRight, ChevronLeft, Layers,
  ChevronUp, ChevronDown
} from 'lucide-react';
import './LotDesigner.css';

/*
  Grid Cell Types:
    0 = empty (road/aisle)
    1 = wall (building/obstacle)
    2 = parking slot
    3 = entry gate
    4 = exit gate
    5 = stairs/ramp (for people / elevator)
    6 = car ramp (vehicle access between floors)
*/
type CellType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type SlotCategory = 'REGULAR' | 'EV_CHARGING' | 'PREMIUM' | 'HANDICAPPED';
type RampDirection = 'up' | 'down' | 'twoway';

const TOOLS: { type: CellType; icon: any; label: string; color: string; shortcut: string }[] = [
  { type: 0, icon: Eraser, label: 'Road', color: '#94a3b8', shortcut: '0' },
  { type: 1, icon: Blocks, label: 'Wall', color: '#475569', shortcut: '1' },
  { type: 2, icon: ParkingSquare, label: 'Slot', color: '#0fb9b1', shortcut: '2' },
  { type: 3, icon: DoorOpen, label: 'Entry', color: '#10b981', shortcut: '3' },
  { type: 4, icon: DoorClosed, label: 'Exit', color: '#ef4444', shortcut: '4' },
  { type: 5, icon: Footprints, label: 'Stairs', color: '#f59e0b', shortcut: '5' },
  { type: 6, icon: ArrowUpDown, label: 'Car Ramp', color: '#8b5cf6', shortcut: '6' },
];

const SLOT_CATEGORIES: { value: SlotCategory; label: string; icon: any; color: string }[] = [
  { value: 'REGULAR', label: 'Regular', icon: ParkingSquare, color: '#0fb9b1' },
  { value: 'EV_CHARGING', label: 'EV Charging', icon: Zap, color: '#10b981' },
  { value: 'PREMIUM', label: 'Premium', icon: Crown, color: '#f59e0b' },
  { value: 'HANDICAPPED', label: 'Accessible', icon: Accessibility, color: '#06b6d4' },
];

const RAMP_DIRECTIONS: { value: RampDirection; label: string; icon: any; emoji: string; color: string }[] = [
  { value: 'up', label: 'Up Ramp', icon: ChevronUp, emoji: '⬆️', color: '#22c55e' },
  { value: 'down', label: 'Down Ramp', icon: ChevronDown, emoji: '⬇️', color: '#ef4444' },
  { value: 'twoway', label: 'Two-way', icon: ArrowUpDown, emoji: '↕️', color: '#8b5cf6' },
];

const DEFAULT_ROWS = 15;
const DEFAULT_COLS = 20;

// Stored metadata per-cell for slots
interface CellMeta {
  category?: SlotCategory;
  rampDirection?: RampDirection;
}

export default function LotDesigner() {
  const { lotId } = useParams<{ lotId: string }>();
  const navigate = useNavigate();
  const [lot, setLot] = useState<any>(null);
  const [totalFloors, setTotalFloors] = useState(1);
  const [currentFloor, setCurrentFloor] = useState(1);

  // Per-floor grid storage
  const [floorGrids, setFloorGrids] = useState<Map<number, CellType[][]>>(new Map());
  const [floorMetas, setFloorMetas] = useState<Map<number, CellMeta[][]>>(new Map());
  const [completedFloors, setCompletedFloors] = useState<Set<number>>(new Set());

  const [grid, setGrid] = useState<CellType[][]>([]);
  const [cellMeta, setCellMeta] = useState<CellMeta[][]>([]);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [tool, setTool] = useState<CellType>(1);
  const [slotCategory, setSlotCategory] = useState<SlotCategory>('REGULAR');
  const [rampDirection, setRampDirection] = useState<RampDirection>('twoway');
  const [mouseDown, setMouseDown] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [brushSize, setBrushSize] = useState(1);

  const initGrid = useCallback((r: number, c: number) => {
    setGrid(Array.from({ length: r }, () => Array(c).fill(0) as CellType[]));
    setCellMeta(Array.from({ length: r }, () => Array(c).fill({}) as CellMeta[]));
  }, []);

  useEffect(() => {
    initGrid(rows, cols);
    if (lotId) {
      lotApi.getOne(lotId).then(r => {
        setLot(r.data);
        setTotalFloors(r.data.floors || 1);
      }).catch(() => {});
    }
  }, [lotId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 0 && num <= 6) setTool(num as CellType);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const paintCells = (r: number, c: number) => {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      const cells: [number, number][] = [];
      if (brushSize === 1) {
        cells.push([r, c]);
      } else if (brushSize === 2) {
        cells.push([r, c], [r, c + 1]);
      } else {
        cells.push([r, c], [r, c + 1], [r + 1, c], [r + 1, c + 1]);
      }

      // For entry/exit gates — allow only one of each
      if (tool === 3) {
        for (let i = 0; i < next.length; i++)
          for (let j = 0; j < next[i]!.length; j++)
            if (next[i]![j] === 3) next[i]![j] = 0;
      }
      if (tool === 4) {
        for (let i = 0; i < next.length; i++)
          for (let j = 0; j < next[i]!.length; j++)
            if (next[i]![j] === 4) next[i]![j] = 0;
      }

      for (const [cr, cc] of cells) {
        if (cr >= 0 && cr < next.length && cc >= 0 && cc < next[0]!.length) {
          next[cr]![cc] = tool;
        }
      }
      return next;
    });

    // Update cell metadata for slots and ramps
    if (tool === 2 || tool === 6) {
      setCellMeta(prev => {
        const next = prev.map(row => [...row]);
        const cells: [number, number][] = [];
        if (brushSize === 1) cells.push([r, c]);
        else if (brushSize === 2) cells.push([r, c], [r, c + 1]);
        else cells.push([r, c], [r, c + 1], [r + 1, c], [r + 1, c + 1]);
        for (const [cr, cc] of cells) {
          if (cr >= 0 && cr < next.length && cc >= 0 && cc < next[0]!.length) {
            if (tool === 2) {
              next[cr]![cc] = { ...next[cr]![cc], category: slotCategory };
            } else {
              next[cr]![cc] = { ...next[cr]![cc], rampDirection: rampDirection };
            }
          }
        }
        return next;
      });
    }
  };

  const handleReset = () => { initGrid(rows, cols); setError(''); setSuccess(''); };
  const handleResizeGrid = () => { initGrid(rows, cols); };

  // ── Save current floor's grid ───────────────────
  const saveCurrentFloor = () => {
    const hasEntry = grid.some(row => row.some(c => c === 3));
    const hasSlots = grid.some(row => row.some(c => c === 2));
    if (currentFloor === 1 && !hasEntry) {
      setError('Floor 1 must have an Entry Gate (green).');
      return false;
    }
    if (!hasSlots) {
      setError('Place at least one Parking Slot (blue) on this floor.');
      return false;
    }

    setFloorGrids(prev => new Map(prev).set(currentFloor, grid.map(r => [...r])));
    setFloorMetas(prev => new Map(prev).set(currentFloor, cellMeta.map(r => [...r])));
    setCompletedFloors(prev => new Set(prev).add(currentFloor));
    setError('');
    return true;
  };

  // ── Navigate to next floor ──────────────────────
  const handleNextFloor = () => {
    if (!saveCurrentFloor()) return;
    const nextFloor = currentFloor + 1;
    if (nextFloor > totalFloors) return;

    setCurrentFloor(nextFloor);
    // Load existing grid for this floor, or fresh grid
    const existing = floorGrids.get(nextFloor);
    if (existing) {
      setGrid(existing.map(r => [...r]));
      setCellMeta((floorMetas.get(nextFloor) || []).map(r => [...r]));
    } else {
      initGrid(rows, cols);
    }
    setSuccess(`Floor ${currentFloor} saved! Now designing Floor ${nextFloor}.`);
  };

  // ── Go back to previous floor ───────────────────
  const handlePrevFloor = () => {
    // Save current floor first
    setFloorGrids(prev => new Map(prev).set(currentFloor, grid.map(r => [...r])));
    setFloorMetas(prev => new Map(prev).set(currentFloor, cellMeta.map(r => [...r])));

    const prevFloor = currentFloor - 1;
    if (prevFloor < 1) return;

    setCurrentFloor(prevFloor);
    const existing = floorGrids.get(prevFloor);
    if (existing) {
      setGrid(existing.map(r => [...r]));
      setCellMeta((floorMetas.get(prevFloor) || []).map(r => [...r]));
    }
  };

  // ── OPTIMIZED GRAPH BUILDER ───────────────────────
  const buildGraphFromGrid = (floorGrid: CellType[][], floorMetaGrid: CellMeta[][], floor: number, slotBlockPrefix: string) => {
    const nodes: { id: string; label: string; x: number; y: number; floor: number }[] = [];
    const edges: { from: string; to: string; weight: number }[] = [];
    const slots: { block: string; number: number; floor: number; type: string; nodeId: string; xCoord: number; yCoord: number; features: string[] }[] = [];
    let entryNodeId = '';
    let slotCounter = 1;
    const rampNodes: { id: string; direction: RampDirection; row: number; col: number }[] = [];

    const isImportant = (r: number, c: number): boolean => {
      const v = floorGrid[r]?.[c];
      if (v === undefined || v === 1) return false;
      if (v === 2 || v === 3 || v === 4 || v === 5 || v === 6) return true;
      let neighbors = 0;
      if (r > 0 && floorGrid[r-1]![c] !== 1) neighbors++;
      if (r < floorGrid.length-1 && floorGrid[r+1]![c] !== 1) neighbors++;
      if (c > 0 && floorGrid[r]![c-1] !== 1) neighbors++;
      if (c < floorGrid[0]!.length-1 && floorGrid[r]![c+1] !== 1) neighbors++;
      // Intersection (3+), dead end (1), or isolated (0) — anything except straight corridor (2)
      return neighbors !== 2;
    };

    // Helper to get ramp direction label
    const getRampLabel = (dir: RampDirection, floor: number): string => {
      const floorName = (f: number) => f === 1 ? 'Ground' : `Floor ${f}`;
      if (dir === 'up') return `Up Ramp ⬆️ (${floorName(floor)} → ${floorName(floor + 1)})`;
      if (dir === 'down') return `Down Ramp ⬇️ (${floorName(floor)} → ${floorName(floor - 1)})`;
      return `Two-way Ramp ↕️ (${floorName(floor)} ↔ ${floorName(floor + 1)})`;
    };

    const nodeIdMap = new Map<string, string>();
    for (let r = 0; r < floorGrid.length; r++) {
      for (let c = 0; c < floorGrid[r]!.length; c++) {
        const v = floorGrid[r]![c]!;
        if (v === 1) continue;
        if (!isImportant(r, c)) continue;

        let nodeId: string;
        let label: string;
        if (v === 3) { nodeId = 'entry'; label = 'Entry Gate'; entryNodeId = 'entry'; }
        else if (v === 4) { nodeId = `exit-f${floor}`; label = `Exit Gate F${floor}`; }
        else if (v === 5) { nodeId = `stairs-f${floor}-${r}-${c}`; label = `Stairs F${floor}`; }
        else if (v === 6) {
          const meta = floorMetaGrid[r]?.[c];
          const dir = meta?.rampDirection || 'twoway';
          nodeId = `ramp-f${floor}-${r}-${c}`;
          label = getRampLabel(dir, floor);
          rampNodes.push({ id: nodeId, direction: dir, row: r, col: c });
        }
        else if (v === 2) {
          const meta = floorMetaGrid[r]?.[c];
          const cat = meta?.category || 'REGULAR';
          nodeId = `s-${slotBlockPrefix}-${100 + slotCounter}`;
          label = `${slotBlockPrefix}-${100 + slotCounter}`;
          slots.push({
            block: slotBlockPrefix, number: 100 + slotCounter, floor,
            type: cat, nodeId, xCoord: c * 30, yCoord: r * 30, features: [],
          });
          slotCounter++;
        } else {
          nodeId = `n-f${floor}-${r}-${c}`;
          label = `Junction F${floor}`;
        }

        nodes.push({ id: nodeId, label, x: c * 30, y: r * 30, floor });
        nodeIdMap.set(`${r},${c}`, nodeId);
      }
    }

    // BFS edges
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    const visitedEdges = new Set<string>();

    for (const [key, fromId] of nodeIdMap.entries()) {
      const [sr, sc] = key.split(',').map(Number);
      for (const [dr, dc] of dirs) {
        let cr = sr! + dr!, cc = sc! + dc!;
        let dist = 1;
        while (cr >= 0 && cr < floorGrid.length && cc >= 0 && cc < floorGrid[0]!.length) {
          const cv = floorGrid[cr]![cc];
          if (cv === 1 || cv === undefined) break;
          const mapKey = `${cr},${cc}`;
          if (nodeIdMap.has(mapKey)) {
            const toId = nodeIdMap.get(mapKey)!;
            const edgeKey = [fromId, toId].sort().join('--');
            if (!visitedEdges.has(edgeKey)) {
              visitedEdges.add(edgeKey);
              edges.push({ from: fromId, to: toId, weight: dist });
            }
            break;
          }
          cr += dr!; cc += dc!; dist++;
        }
      }
    }

    return { nodes, edges, entryNodeId, slots, rampNodes };
  };

  // ── Final save: combine all floors ──────────────
  const handleCompleteAll = async () => {
    // Save current floor first
    if (!saveCurrentFloor()) return;

    // Verify all floors completed
    for (let f = 1; f <= totalFloors; f++) {
      if (!completedFloors.has(f) && f !== currentFloor) {
        setError(`Floor ${f} has not been designed yet. Navigate to it and design the layout.`);
        return;
      }
    }

    setError(''); setSuccess('');
    setSaving(true);

    try {
      const allNodes: any[] = [];
      const allEdges: any[] = [];
      const allSlots: any[] = [];
      let entryNodeId = '';
      const allRampNodes: Map<number, { id: string; direction: RampDirection; row: number; col: number }[]> = new Map();
      const blockLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      // Build graphs for each floor
      for (let f = 1; f <= totalFloors; f++) {
        const fGrid = f === currentFloor ? grid : floorGrids.get(f);
        const fMeta = f === currentFloor ? cellMeta : floorMetas.get(f);
        if (!fGrid || !fMeta) continue;

        const blockPrefix = blockLetters[f - 1] || `F${f}`;
        const result = buildGraphFromGrid(fGrid, fMeta, f, blockPrefix!);
        allNodes.push(...result.nodes);
        allEdges.push(...result.edges);
        allSlots.push(...result.slots);
        if (result.entryNodeId) entryNodeId = result.entryNodeId;
        allRampNodes.set(f, result.rampNodes);
      }

      // Validate ramps between adjacent floors
      for (let f = 1; f < totalFloors; f++) {
        const rampsOnF = allRampNodes.get(f) || [];
        const rampsOnNext = allRampNodes.get(f + 1) || [];

        // Check if there is any valid ramp connection between floor f and f+1
        const hasUpOrTwowayOnF = rampsOnF.some(r => r.direction === 'up' || r.direction === 'twoway');
        const hasDownOrTwowayOnNext = rampsOnNext.some(r => r.direction === 'down' || r.direction === 'twoway');
        const hasDownOrTwowayOnF = rampsOnF.some(r => r.direction === 'down' || r.direction === 'twoway');

        // Valid connection exists if:
        //   - Floor F has an Up/Two-way ramp and Floor F+1 has any ramp (to connect to)
        //   - OR Floor F+1 has a Down/Two-way ramp and Floor F has any ramp
        const canGoUp = hasUpOrTwowayOnF && rampsOnNext.length > 0;
        const canGoDown = (hasDownOrTwowayOnNext || hasDownOrTwowayOnF) && rampsOnF.length > 0 && rampsOnNext.length > 0;

        if (!canGoUp && !canGoDown) {
          setError(
            `❌ No valid ramp connection between Floor ${f} and Floor ${f + 1}. ` +
            `Add an Up Ramp ⬆️ or Two-way Ramp ↕️ on Floor ${f}, ` +
            `or a Down Ramp ⬇️ / Two-way Ramp ↕️ on Floor ${f + 1}.`
          );
          setSaving(false);
          return;
        }
      }

      // Connect ramps between adjacent floors (directional based on ramp type)
      for (let f = 1; f < totalFloors; f++) {
        const rampsOnF = allRampNodes.get(f) || [];
        const rampsOnNext = allRampNodes.get(f + 1) || [];

        for (const rampF of rampsOnF) {
          // Find the closest ramp on the next floor (by grid position)
          let bestMatch = rampsOnNext[0];
          let bestDist = Infinity;
          for (const rampN of rampsOnNext) {
            const d = Math.abs(rampF.col - rampN.col) + Math.abs(rampF.row - rampN.row);
            if (d < bestDist) { bestDist = d; bestMatch = rampN; }
          }
          if (!bestMatch) continue;

          const FLOOR_TRANSITION_WEIGHT = 5;

          // Up ramp on F: directed edge F → F+1
          if (rampF.direction === 'up' || rampF.direction === 'twoway') {
            allEdges.push({ from: rampF.id, to: bestMatch.id, weight: FLOOR_TRANSITION_WEIGHT, directed: true });
          }
          // Down ramp on F: directed edge F+1 → F
          if (rampF.direction === 'down' || rampF.direction === 'twoway') {
            allEdges.push({ from: bestMatch.id, to: rampF.id, weight: FLOOR_TRANSITION_WEIGHT, directed: true });
          }
          // If the next-floor ramp is 'down' or 'twoway': directed edge F+1 → F
          if (bestMatch.direction === 'down' || bestMatch.direction === 'twoway') {
            allEdges.push({ from: bestMatch.id, to: rampF.id, weight: FLOOR_TRANSITION_WEIGHT, directed: true });
          }
          // If the next-floor ramp is 'up' or 'twoway': directed edge F → F+1
          if (bestMatch.direction === 'up' || bestMatch.direction === 'twoway') {
            allEdges.push({ from: rampF.id, to: bestMatch.id, weight: FLOOR_TRANSITION_WEIGHT, directed: true });
          }
        }
      }

      // Deduplicate edges (same from-to pair)
      const edgeSet = new Set<string>();
      const dedupedEdges = allEdges.filter(e => {
        const key = `${e.from}--${e.to}`;
        if (edgeSet.has(key)) return false;
        edgeSet.add(key);
        return true;
      });
      allEdges.length = 0;
      allEdges.push(...dedupedEdges);

      if (!entryNodeId) {
        setError('No entry gate found on any floor. Floor 1 must have an entry gate.');
        setSaving(false);
        return;
      }

      // Build layoutData (raw grid + cellMeta per floor for faithful reconstruction)
      const layoutData: Record<string, any> = {};
      const layoutMeta: Record<string, any> = {};
      for (let f = 1; f <= totalFloors; f++) {
        const fGrid = f === currentFloor ? grid : floorGrids.get(f);
        const fMeta = f === currentFloor ? cellMeta : floorMetas.get(f);
        if (fGrid) {
          layoutData[String(f)] = fGrid.map(r => [...r]);
        }
        if (fMeta) {
          layoutMeta[String(f)] = fMeta.map(r => r.map(m => ({ ...m })));
        }
      }

      // 1. Setup graph
      await lotApi.setupGraph(lotId!, { entryNodeId, nodes: allNodes, edges: allEdges, layoutData, layoutMeta });
      // 2. Bulk-create slots
      if (allSlots.length > 0) {
        await slotAdminApi.bulkCreate(lotId!, allSlots);
      }

      setSuccess(`✅ All ${totalFloors} floor(s) saved! ${allSlots.length} slots, ${allNodes.length} nodes, ${allEdges.length} edges.`);

      // Redirect to admin panel after a short delay
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getCellColor = (v: CellType) => {
    const colors: Record<CellType, string> = {
      0: 'var(--cell-road)', 1: 'var(--cell-wall)', 2: 'var(--cell-slot)',
      3: 'var(--cell-entry)', 4: 'var(--cell-exit)', 5: 'var(--cell-stairs)',
      6: 'var(--cell-ramp)',
    };
    return colors[v];
  };

  const getCellIcon = (r: number, c: number): string | null => {
    const v = grid[r]?.[c];
    if (v !== 2) return null;
    const meta = cellMeta[r]?.[c];
    if (!meta?.category || meta.category === 'REGULAR') return null;
    if (meta.category === 'EV_CHARGING') return '⚡';
    if (meta.category === 'PREMIUM') return '👑';
    if (meta.category === 'HANDICAPPED') return '♿';
    return null;
  };

  const cellCounts = grid.flat();

  return (
    <div className="lot-designer animate-in">
      <div className="page-header">
        <h1>🏗️ Parking Lot Designer</h1>
        <p>{lot ? `Designing: ${lot.name}` : 'Design your parking area layout'}</p>
      </div>

      {error && <div className="toast toast-error"><AlertCircle size={16} /> {error}</div>}
      {success && <div className="toast toast-success"><CheckCircle size={16} /> {success}</div>}

      {/* Floor Stepper */}
      {totalFloors > 1 && (
        <div className="floor-stepper glass-card">
          <div className="floor-stepper-header">
            <Layers size={18} />
            <span>Floor <strong>{currentFloor}</strong> of <strong>{totalFloors}</strong></span>
          </div>
          <div className="floor-steps-row">
            {Array.from({ length: totalFloors }, (_, i) => i + 1).map(f => (
              <div
                key={f}
                className={`floor-step-dot ${f === currentFloor ? 'current' : ''} ${completedFloors.has(f) ? 'done' : ''}`}
                title={`Floor ${f} ${completedFloors.has(f) ? '(saved)' : ''}`}
              >
                {completedFloors.has(f) ? '✓' : f}
              </div>
            ))}
          </div>
          <div className="floor-nav-btns">
            <button className="btn btn-secondary btn-sm" onClick={handlePrevFloor} disabled={currentFloor === 1}>
              <ChevronLeft size={14} /> Previous Floor
            </button>
            {currentFloor < totalFloors ? (
              <button className="btn btn-primary btn-sm" onClick={handleNextFloor}>
                Save Floor & Continue <ChevronRight size={14} />
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={handleCompleteAll} disabled={saving}>
                {saving ? <div className="spinner" /> : <><CheckCircle size={14} /> Complete All Floors</>}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="designer-toolbar glass-card">
        <div className="tool-section">
          <span className="tool-label">Draw Tool:</span>
          <div className="tool-buttons">
            {TOOLS.map(t => (
              <button key={t.type} className={`tool-btn ${tool === t.type ? 'active' : ''}`}
                onClick={() => setTool(t.type)} style={{ '--tool-color': t.color } as any}
                title={`Shortcut: ${t.shortcut}`}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Slot Category (only shown when Slot tool is active) */}
        {tool === 2 && (
          <div className="tool-section">
            <span className="tool-label">Slot Type:</span>
            <div className="tool-buttons">
              {SLOT_CATEGORIES.map(cat => (
                <button key={cat.value}
                  className={`tool-btn ${slotCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSlotCategory(cat.value)}
                  style={{ '--tool-color': cat.color } as any}>
                  <cat.icon size={14} /> {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ramp Direction (only shown when Car Ramp tool is active) */}
        {tool === 6 && (
          <div className="tool-section">
            <span className="tool-label">Ramp Direction:</span>
            <div className="tool-buttons">
              {RAMP_DIRECTIONS.map(rd => (
                <button key={rd.value}
                  className={`tool-btn ${rampDirection === rd.value ? 'active' : ''}`}
                  onClick={() => setRampDirection(rd.value)}
                  style={{ '--tool-color': rd.color } as any}>
                  {rd.emoji} {rd.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="tool-section">
          <span className="tool-label">Brush:</span>
          <div className="tool-buttons">
            {[{ s: 1, l: '1×1' }, { s: 2, l: '2×1' }, { s: 3, l: '2×2' }].map(b => (
              <button key={b.s} className={`tool-btn ${brushSize === b.s ? 'active' : ''}`}
                onClick={() => setBrushSize(b.s)} style={{ '--tool-color': '#8b5cf6' } as any}>
                {b.l}
              </button>
            ))}
          </div>
        </div>

        <div className="tool-section">
          <span className="tool-label">Grid:</span>
          <input type="number" min={5} max={30} value={rows} onChange={e => setRows(parseInt(e.target.value) || 15)} style={{ width: 50 }} />
          <span style={{ color: 'var(--text-muted)' }}>×</span>
          <input type="number" min={5} max={40} value={cols} onChange={e => setCols(parseInt(e.target.value) || 20)} style={{ width: 50 }} />
          <button className="btn btn-secondary btn-sm" onClick={handleResizeGrid}>Apply</button>
        </div>

        <div className="tool-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleReset}><RotateCcw size={14} /> Reset</button>
          {totalFloors === 1 && (
            <button className="btn btn-primary btn-sm" onClick={handleCompleteAll} disabled={saving}>
              {saving ? <div className="spinner" /> : <><Save size={14} /> Save</>}
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="designer-help">
        <span>Click & drag to draw. Keys 0-6 switch tools. Floor: <strong>{currentFloor}</strong></span>
        <span className="legend-dot" style={{ background: 'var(--cell-wall)' }} /> Wall
        <span className="legend-dot" style={{ background: 'var(--cell-slot)' }} /> Slot
        <span className="legend-dot" style={{ background: 'var(--cell-entry)' }} /> Entry
        <span className="legend-dot" style={{ background: 'var(--cell-exit)' }} /> Exit
        <span className="legend-dot" style={{ background: 'var(--cell-stairs)' }} /> Stairs
        <span className="legend-dot" style={{ background: 'var(--cell-ramp)' }} /> Car Ramp
        <span className="legend-dot" style={{ background: 'var(--cell-road)' }} /> Road
      </div>

      {/* Grid with row/col numbers */}
      <div className="grid-container glass-card" onMouseLeave={() => setMouseDown(false)}>
        {/* Column numbers */}
        <div className="grid-col-numbers" style={{ gridTemplateColumns: `32px repeat(${cols}, 28px)` }}>
          <div className="grid-number corner" />
          {Array.from({ length: cols }, (_, i) => (
            <div key={i} className="grid-number col-num">{i + 1}</div>
          ))}
        </div>

        <div className="grid-with-rows">
          {/* Row numbers + Grid cells */}
          {grid.map((row, r) => (
            <div key={r} className="grid-row-with-number" style={{ gridTemplateColumns: `32px repeat(${cols}, 28px)` }}>
              <div className="grid-number row-num">{r + 1}</div>
              {row.map((cell, c) => (
                <div key={`${r}-${c}`}
                  className={`grid-cell cell-${cell}`}
                  style={{ backgroundColor: getCellColor(cell) }}
                  onMouseDown={(e) => { e.preventDefault(); setMouseDown(true); paintCells(r, c); }}
                  onMouseEnter={() => { if (mouseDown) paintCells(r, c); }}
                  onMouseUp={() => setMouseDown(false)}
                >
                  {getCellIcon(r, c) && (
                    <span className="cell-category-icon">{getCellIcon(r, c)}</span>
                  )}
                  {cell === 6 && (
                    <span className="cell-category-icon">
                      {cellMeta[r]?.[c]?.rampDirection === 'up' ? '⬆️' :
                       cellMeta[r]?.[c]?.rampDirection === 'down' ? '⬇️' : '↕️'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="designer-stats">
        <span>🧱 Walls: {cellCounts.filter(c => c === 1).length}</span>
        <span>🅿️ Slots: {cellCounts.filter(c => c === 2).length}</span>
        <span>🟢 Entry: {cellCounts.filter(c => c === 3).length > 0 ? '✓' : '✗'}</span>
        <span>🔴 Exit: {cellCounts.filter(c => c === 4).length > 0 ? '✓' : '✗'}</span>
        <span>🔶 Stairs: {cellCounts.filter(c => c === 5).length}</span>
        <span>🟣 Ramps: {cellCounts.filter(c => c === 6).length}</span>
        <span>🛣️ Roads: {cellCounts.filter(c => c === 0).length}</span>
        <span>📐 Floor: {currentFloor}/{totalFloors}</span>
      </div>
    </div>
  );
}
