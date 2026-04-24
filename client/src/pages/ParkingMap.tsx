import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lotApi, slotApi, bookingApi } from '../api';
import {
  Layers, Eye, Zap, Crown, Accessibility,
  Route, Navigation, ArrowLeft
} from 'lucide-react';
import './ParkingMap.css';
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
  slotStatus: 'FREE' | 'OCCUPIED' | 'RESERVED' | '';
  slotType: 'REGULAR' | 'EV_CHARGING' | 'HANDICAPPED' | 'PREMIUM' | '';
  isMine: boolean;
}

export default function ParkingMap() {
  const { lotId } = useParams<{ lotId: string }>();
  const navigate = useNavigate();
  const [lot, setLot] = useState<any>(null);
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [cols, setCols] = useState(25);
  const [loading, setLoading] = useState(true);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [totalFloors, setTotalFloors] = useState(1);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [slotDataMap, setSlotDataMap] = useState<Map<string, { status: string; type: string; id: string; block: string; number: number }>>(new Map());
  const [floorStats, setFloorStats] = useState({ free: 0, occupied: 0, reserved: 0, total: 0 });

  useEffect(() => {
    if (!lotId) return;
    setLoading(true);

    Promise.all([
      lotApi.getOne(lotId),
      slotApi.getByLot(lotId).catch(() => ({ data: { slots: [] } })),
      bookingApi.getActive().then(r => r.data).catch(() => null),
    ]).then(([lotRes, slotRes, booking]) => {
      const lotData = lotRes.data;
      setLot(lotData);
      setTotalFloors(lotData.floors || 1);
      setActiveBooking(booking);

      const slotArray = slotRes.data?.slots || slotRes.data || [];
      const dataMap = new Map<string, { status: string; type: string; id: string; block: string; number: number }>();
      for (const slot of slotArray) {
        if (slot.xCoord != null && slot.yCoord != null) {
          const r = Math.round(slot.yCoord / 30);
          const c = Math.round(slot.xCoord / 30);
          const key = `${slot.floor}:${r},${c}`;
          dataMap.set(key, { status: slot.status, type: slot.type, id: slot.id, block: slot.block, number: slot.number });
        }
      }
      setSlotDataMap(dataMap);

      if (lotData.graphData?.layoutData) {
        buildGrid(lotData, 1, dataMap, booking);
      }
    }).finally(() => setLoading(false));
  }, [lotId]);

  const buildGrid = (
    lotData: any, floor: number,
    dataMap?: Map<string, { status: string; type: string; id: string; block: string; number: number }>,
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
        const node: GridNode = {
          row: ri, col: ci, isWall: false, isSlot: false, isEntry: false,
          isExit: false, isRamp: false, isStairs: false,
          label: '', slotStatus: '', slotType: '', isMine: false,
        };

        if (cellType === 1) {
          node.isWall = true;
        } else if (cellType === 2) {
          node.isSlot = true;
          slotNum++;
          const slotData = sMap.get(`${floor}:${ri},${ci}`);
          if (slotData) {
            node.label = `${slotData.number}`;
            node.slotStatus = slotData.status as any;
            node.slotType = slotData.type as any;
            if (mySlotId && slotData.id === mySlotId) node.isMine = true;
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
          node.isEntry = true; node.label = 'Entry';
        } else if (cellType === 4) {
          node.isExit = true; node.label = 'Exit';
        } else if (cellType === 5) {
          node.isStairs = true; node.label = 'Stairs';
        } else if (cellType === 6) {
          node.isRamp = true;
          const dir = meta?.rampDirection || 'twoway';
          node.label = dir === 'up' ? 'Ramp ⬆️' : dir === 'down' ? 'Ramp ⬇️' : 'Ramp ↕️';
        }
        row.push(node);
      }
      g.push(row);
    }
    setGrid(g);
    setFloorStats({ free, occupied, reserved, total: totalSlots });
  };

  const switchFloor = (floor: number) => {
    if (!lot?.graphData?.layoutData) return;
    buildGrid(lot, floor, slotDataMap, activeBooking);
  };

  const getCellClass = (cell: GridNode): string => {
    const cls = ['lm-cell'];
    if (cell.isEntry) cls.push('lm-entry');
    else if (cell.isExit) cls.push('lm-exit');
    else if (cell.isSlot) {
      if (cell.isMine) cls.push('lm-slot-mine');
      else if (cell.slotStatus === 'OCCUPIED') cls.push('lm-slot-occupied');
      else if (cell.slotStatus === 'RESERVED') cls.push('lm-slot-reserved');
      else cls.push('lm-slot-free');
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

  if (loading) return (
    <div className="parking-map animate-in">
      <div className="page-header">
        <h1><Eye size={24} /> Live Parking Map</h1>
        <p>Loading map...</p>
      </div>
      <PageLoader />
    </div>
  );

  return (
    <div className="parking-map animate-in">
      <div className="page-header">
        <h1><Eye size={24} /> Live Parking Map</h1>
        <p>{lot?.name} — ₹{lot?.ratePerHour}/hr</p>
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

      {/* Stats Bar */}
      <div className="lm-stats-bar glass-card">
        <div className="lm-stat"><span className="lm-dot lm-dot-free" /><span>Free: <strong>{floorStats.free}</strong></span></div>
        <div className="lm-stat"><span className="lm-dot lm-dot-occupied" /><span>Occupied: <strong>{floorStats.occupied}</strong></span></div>
        <div className="lm-stat"><span className="lm-dot lm-dot-reserved" /><span>Reserved: <strong>{floorStats.reserved}</strong></span></div>
        <div className="lm-stat"><span className="lm-dot lm-dot-total" /><span>Total: <strong>{floorStats.total}</strong></span></div>
        <div className="lm-stat lm-occupancy"><span>{occupancyPct}% Full</span></div>
      </div>

      {/* Legend */}
      <div className="lm-legend">
        <div className="lm-legend-group">
          <span className="lm-legend-title">Status</span>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-free" /> Free</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-occupied" /> Occupied</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-reserved" /> Reserved</div>
          {activeBooking && <div className="lm-legend-item"><span className="lm-mini lm-mini-mine" /> Your Slot</div>}
        </div>
        <div className="lm-legend-group">
          <span className="lm-legend-title">Type</span>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-ev" /><Zap size={10} /> EV</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-handicap" /><Accessibility size={10} /> Handicap</div>
          <div className="lm-legend-item"><span className="lm-mini lm-mini-premium" /><Crown size={10} /> Premium</div>
        </div>
        <div className="lm-legend-group">
          <span className="lm-legend-title">Area</span>
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
          <Eye size={48} color="var(--text-muted)" />
          <h3>No Grid Layout</h3>
          <p>This lot doesn't have a grid layout configured. Ask an admin to design it.</p>
        </div>
      ) : (
        <div className="lm-grid-wrapper glass-card">
          <div className="lm-col-numbers" style={{ gridTemplateColumns: `32px repeat(${cols}, 34px)` }}>
            <div className="lm-grid-number corner" />
            {Array.from({ length: cols }, (_, i) => (
              <div key={i} className="lm-grid-number col-num">{i + 1}</div>
            ))}
          </div>
          <div className="lm-grid-body">
            {grid.map((row, r) => (
              <div key={r} className="lm-grid-row" style={{ gridTemplateColumns: `32px repeat(${cols}, 34px)` }}>
                <div className="lm-grid-number row-num">{r + 1}</div>
                {row.map((cell, c) => (
                  <div key={`${r}-${c}`}
                    className={getCellClass(cell)}
                    title={cell.label
                      ? `${cell.label}${cell.slotType && cell.slotType !== 'REGULAR' ? ` [${cell.slotType.replace('_', ' ')}]` : ''} — ${cell.slotStatus || cell.label}${cell.isMine ? ' ★ YOUR SLOT' : ''}`
                      : ''}
                  >
                    {cell.isSlot && <span className="lm-cell-label">{cell.label}</span>}
                    {cell.isEntry && <span className="lm-cell-label">E</span>}
                    {cell.isExit && <span className="lm-cell-label">X</span>}
                    {cell.isRamp && <span className="lm-cell-label">R</span>}
                    {cell.isStairs && <span className="lm-cell-label">S</span>}
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
