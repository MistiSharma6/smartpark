import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lotApi, slotApi, bookingApi } from '../api';
import {
  Layers, ParkingSquare, Route, Navigation, ArrowLeft,
  Zap, Crown, Accessibility, Eye
} from 'lucide-react';
import './ParkingAreaView.css';
import PageLoader from '../components/PageLoader';

/**
 * Live Parking Map — grid-based read-only view
 * Uses layoutData from saved lot for faithful grid reconstruction.
 * Shows real-time slot statuses with color coding.
 * No clicking, no pathfinding — purely visual.
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
  label: string;
  // Slot status
  slotStatus: 'FREE' | 'OCCUPIED' | 'RESERVED' | '';
  // Slot type
  slotType: 'REGULAR' | 'EV_CHARGING' | 'HANDICAPPED' | 'PREMIUM' | '';
  // Is this the user's booked slot?
  isMine: boolean;
}

export default function ParkingAreaView() {
  const { lotId } = useParams<{ lotId: string }>();
  const navigate = useNavigate();
  const [lot, setLot] = useState<any>(null);
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [cols, setCols] = useState(25);
  const [loading, setLoading] = useState(true);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [totalFloors, setTotalFloors] = useState(1);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [slotDataMap, setSlotDataMap] = useState<Map<string, { status: string; type: string; id: string }>>(new Map());

  // Stats
  const [floorStats, setFloorStats] = useState({ free: 0, occupied: 0, reserved: 0, total: 0 });

  useEffect(() => {
    if (!lotId) return;
    setLoading(true);

    Promise.all([
      lotApi.getOne(lotId),
      slotApi.getByLot(lotId).catch(() => ({ data: [] })),
      bookingApi.getActive().then(r => r.data).catch(() => null),
    ]).then(([lotRes, slotRes, booking]) => {
      const lotData = lotRes.data;
      setLot(lotData);
      setTotalFloors(lotData.floors || 1);
      setActiveBooking(booking);

      // Build slot data map keyed by "floor:row,col"
      const dataMap = new Map<string, { status: string; type: string; id: string }>();
      const slotArray = slotRes.data?.slots || slotRes.data || [];
      for (const slot of slotArray) {
        if (slot.xCoord != null && slot.yCoord != null) {
          const r = Math.round(slot.yCoord / 30);
          const c = Math.round(slot.xCoord / 30);
          const key = `${slot.floor}:${r},${c}`;
          dataMap.set(key, { status: slot.status, type: slot.type, id: slot.id });
        }
      }
      setSlotDataMap(dataMap);

      if (lotData.graphData?.layoutData) {
        buildGrid(lotData, 1, dataMap, booking);
      }
    }).finally(() => setLoading(false));
  }, [lotId]);

  const buildGrid = (
    lotData: any,
    floor: number,
    dataMap?: Map<string, { status: string; type: string; id: string }>,
    booking?: any
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

    const sMap = dataMap || slotDataMap;
    const mySlotId = booking?.slot?.id || activeBooking?.slot?.id;

    let slotNum = 1;
    let free = 0, occupied = 0, reserved = 0, totalSlots = 0;

    const g: GridNode[][] = [];
    for (let ri = 0; ri < r; ri++) {
      const row: GridNode[] = [];
      for (let ci = 0; ci < c; ci++) {
        const cellType = floorGrid[ri]![ci]!;
        const meta = floorMeta?.[ri]?.[ci];
        const node = createNode(ri, ci);

        if (cellType === 1) {
          node.isWall = true;
        } else if (cellType === 2) {
          node.isSlot = true;
          node.label = `P${slotNum++}`;
          const slotData = sMap.get(`${floor}:${ri},${ci}`);
          if (slotData) {
            node.slotStatus = slotData.status as any;
            node.slotType = slotData.type as any;
            if (mySlotId && slotData.id === mySlotId) {
              node.isMine = true;
            }
            totalSlots++;
            if (slotData.status === 'FREE') free++;
            else if (slotData.status === 'OCCUPIED') occupied++;
            else if (slotData.status === 'RESERVED') reserved++;
          } else {
            node.slotStatus = 'FREE';
            totalSlots++;
            free++;
          }
        } else if (cellType === 3) {
          node.isEntry = true;
          node.label = 'Entry Gate';
        } else if (cellType === 4) {
          node.isExit = true;
          node.label = 'Exit Gate';
        } else if (cellType === 5) {
          node.isStairs = true;
          node.label = 'Stairs';
        } else if (cellType === 6) {
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

    setGrid(g);
    setFloorStats({ free, occupied, reserved, total: totalSlots });
  };

  const createNode = (row: number, col: number): GridNode => ({
    row, col,
    isWall: false, isSlot: false, isEntry: false, isExit: false,
    isRamp: false, isStairs: false,
    label: '', slotStatus: '', slotType: '', isMine: false,
  });

  const switchFloor = (floor: number) => {
    if (!lot?.graphData?.layoutData) return;
    buildGrid(lot, floor, slotDataMap, activeBooking);
  };

  const getCellClass = (cell: GridNode): string => {
    const cls = ['lm-cell'];
    if (cell.isEntry) cls.push('lm-entry');
    else if (cell.isExit) cls.push('lm-exit');
    else if (cell.isSlot) {
      // Mine takes priority
      if (cell.isMine) {
        cls.push('lm-slot-mine');
      } else if (cell.slotStatus === 'OCCUPIED') {
        cls.push('lm-slot-occupied');
      } else if (cell.slotStatus === 'RESERVED') {
        cls.push('lm-slot-reserved');
      } else {
        cls.push('lm-slot-free');
      }
      // Slot type sub-class for border/icon overlay
      if (cell.slotType === 'EV_CHARGING') cls.push('lm-type-ev');
      else if (cell.slotType === 'HANDICAPPED') cls.push('lm-type-handicap');
      else if (cell.slotType === 'PREMIUM') cls.push('lm-type-premium');
    }
    else if (cell.isRamp) cls.push('lm-ramp');
    else if (cell.isStairs) cls.push('lm-stairs');
    else if (cell.isWall) cls.push('lm-wall');
    return cls.join(' ');
  };

  const getCellIcon = (cell: GridNode) => {
    if (!cell.isSlot) return null;
    if (cell.slotType === 'EV_CHARGING') return <Zap size={10} />;
    if (cell.slotType === 'PREMIUM') return <Crown size={10} />;
    if (cell.slotType === 'HANDICAPPED') return <Accessibility size={10} />;
    return null;
  };

  const occupancyPct = floorStats.total > 0 ? Math.round((floorStats.occupied / floorStats.total) * 100) : 0;

  if (loading) return <PageLoader />;

  return (
    <div className="parking-area-view animate-in">
      <div className="page-header">
        <h1><Eye size={24} /> Live Parking Map</h1>
        <p>{lot?.name || 'Real-time slot availability'}</p>
      </div>

      {/* Floor Selector */}
      {totalFloors > 1 && (
        <div className="lm-floor-selector glass-card">
          <Layers size={16} />
          <span>Floor:</span>
          {Array.from({ length: totalFloors }, (_, i) => i + 1).map(f => (
            <button key={f}
              className={`lm-floor-btn ${currentFloor === f ? 'active' : ''}`}
              onClick={() => switchFloor(f)}>
              F{f}
            </button>
          ))}
        </div>
      )}

      {/* Floor Stats Bar */}
      <div className="lm-stats-bar glass-card">
        <div className="lm-stat">
          <span className="lm-dot lm-dot-free" />
          <span>Free: <strong>{floorStats.free}</strong></span>
        </div>
        <div className="lm-stat">
          <span className="lm-dot lm-dot-occupied" />
          <span>Occupied: <strong>{floorStats.occupied}</strong></span>
        </div>
        <div className="lm-stat">
          <span className="lm-dot lm-dot-reserved" />
          <span>Reserved: <strong>{floorStats.reserved}</strong></span>
        </div>
        <div className="lm-stat">
          <span className="lm-dot lm-dot-total" />
          <span>Total: <strong>{floorStats.total}</strong></span>
        </div>
        <div className="lm-stat lm-occupancy">
          <span>{occupancyPct}% Full</span>
        </div>
      </div>

      {/* Legend */}
      <div className="lm-legend">
        <div className="lm-legend-group">
          <span className="lm-legend-title">Status</span>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-free" /> Free</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-occupied" /> Occupied</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-reserved" /> Reserved</div>
          {activeBooking && (
            <div className="lm-legend-item"><span className="lm-mini lm-mini-mine" /> Your Slot</div>
          )}
        </div>
        <div className="lm-legend-group">
          <span className="lm-legend-title">Type</span>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-ev" /><Zap size={10} /> EV Charging</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-handicap" /><Accessibility size={10} /> Handicapped</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-premium" /><Crown size={10} /> Premium</div>
        </div>
        <div className="lm-legend-group">
          <span className="lm-legend-title">Infrastructure</span>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-entry" /> Entry</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-exit" /> Exit</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-ramp" /> Ramp</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-stairs" /> Stairs</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-wall" /> Wall</div>
        </div>
      </div>

      {/* Grid */}
      {grid.length === 0 ? (
        <div className="lm-empty glass-card">
          <ParkingSquare size={48} color="var(--text-muted)" />
          <h3>No Layout Data</h3>
          <p>This lot doesn't have a grid layout configured yet. Ask an admin to design it in the Lot Designer.</p>
        </div>
      ) : (
        <div className="lm-grid-wrapper glass-card">
          {/* Column numbers */}
          <div className="lm-col-numbers" style={{ gridTemplateColumns: `32px repeat(${cols}, 28px)` }}>
            <div className="lm-grid-number corner" />
            {Array.from({ length: cols }, (_, i) => (
              <div key={i} className="lm-grid-number col-num">{i + 1}</div>
            ))}
          </div>

          <div className="lm-grid-body">
            {grid.map((row, r) => (
              <div key={r} className="lm-grid-row" style={{ gridTemplateColumns: `32px repeat(${cols}, 28px)` }}>
                <div className="lm-grid-number row-num">{r + 1}</div>
                {row.map((cell, c) => (
                  <div key={`${r}-${c}`}
                    className={getCellClass(cell)}
                    title={cell.label ? `${cell.label}${cell.slotType && cell.slotType !== 'REGULAR' ? ` (${cell.slotType.replace('_', ' ')})` : ''} — ${cell.slotStatus || cell.label}${cell.isMine ? ' ★ YOUR SLOT' : ''}` : `(${r},${c})`}
                  >
                    {getCellIcon(cell)}
                    {cell.isMine && <span className="lm-mine-badge">★</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="lm-actions">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        {activeBooking && activeBooking.lot?.id === lotId && (
          <>
            <button className="btn btn-primary" onClick={() => navigate(`/pathfinder/${lotId}`)}>
              <Route size={16} /> Find Path to Spot
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/my-booking')}>
              <Navigation size={16} /> My Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
}
