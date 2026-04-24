import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { parkingApi, lotApi } from '../api';
import {
  Search, Printer, IndianRupee, Clock, Car,
  MapPin, ParkingSquare, ChevronDown, X, Calendar
} from 'lucide-react';
import smartParkLogo from '../assets/image.png';
import './BillGenerator.css';
import PageLoader from '../components/PageLoader';

interface SessionData {
  id: string;
  vehicle: string;
  lotName: string;
  slot: string;
  entryTime: string;
  exitTime: string | null;
  duration: number | null;
  cost: number | null;
  paymentStatus: string;
}

interface BillData {
  session: SessionData;
  lotAddress?: string;
  ratePerHour?: number;
  generatedAt: string;
}

export default function BillGenerator() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<SessionData[]>([]);
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState('');
  const [selectedBill, setSelectedBill] = useState<BillData | null>(null);
  const [showBill, setShowBill] = useState(false);

  useEffect(() => {
    Promise.all([
      loadSessions(1),
      lotApi.getAll().then(r => setLots(r.data || [])).catch(() => {}),
    ]);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showBill) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showBill]);

  const loadSessions = async (page: number) => {
    setLoading(true);
    try {
      const r = await parkingApi.getHistory(page, 50);
      setSessions(r.data.sessions || []);
      setFilteredSessions(r.data.sessions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = sessions;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.vehicle?.toLowerCase().includes(q) ||
        s.slot?.toLowerCase().includes(q) ||
        s.id?.toLowerCase().includes(q)
      );
    }
    if (selectedLot) {
      filtered = filtered.filter(s => s.lotName === selectedLot);
    }
    setFilteredSessions(filtered);
  }, [searchQuery, selectedLot, sessions]);

  const openBill = (session: SessionData) => {
    const lot = lots.find(l => l.name === session.lotName);
    setSelectedBill({
      session,
      lotAddress: lot?.address || 'N/A',
      ratePerHour: lot?.ratePerHour || 20,
      generatedAt: new Date().toLocaleString(),
    });
    setShowBill(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const closeBill = () => {
    setShowBill(false);
    setSelectedBill(null);
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return '-';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs === 0 ? `${mins} min` : `${hrs}h ${mins}m`;
  };

  const completedSessions = filteredSessions.filter(s => s.exitTime !== null);
  const uniqueLots = [...new Set(sessions.map(s => s.lotName))];

  return (
    <div className="bill-generator animate-in">
      <div className="page-header">
        <h1><IndianRupee size={24} /> Parking Bills</h1>
        <p>Generate and print parking receipts for completed sessions</p>
      </div>

      <div className="bg-filters glass-card">
        <div className="bg-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by plate number, slot, or session ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-search-input"
          />
        </div>
        <div className="bg-lot-filter">
          <MapPin size={14} />
          <select
            value={selectedLot}
            onChange={(e) => setSelectedLot(e.target.value)}
            className="bg-lot-select"
          >
            <option value="">All Lots</option>
            {uniqueLots.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <ChevronDown size={14} className="bg-chevron" />
        </div>
      </div>

      {loading ? (
        <PageLoader />
      ) : completedSessions.length === 0 ? (
        <div className="glass-card bg-empty">
          <IndianRupee size={48} color="var(--text-muted)" />
          <h3>No Completed Sessions</h3>
          <p>Completed parking sessions with exit records will appear here.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Lot</th>
                <th>Slot</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Duration</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedSessions.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.vehicle}</strong></td>
                  <td>{s.lotName}</td>
                  <td>{s.slot}</td>
                  <td>{new Date(s.entryTime).toLocaleString()}</td>
                  <td>{s.exitTime ? new Date(s.exitTime).toLocaleString() : '-'}</td>
                  <td>{formatDuration(s.duration)}</td>
                  <td>
                    {s.cost != null ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IndianRupee size={12} />{s.cost.toFixed(2)}
                      </span>
                    ) : '-'}
                  </td>
                  <td>
                    <span className={`badge ${s.paymentStatus === 'PAID' ? 'badge-free' : 'badge-occupied'}`}>
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm bg-btn-bill" onClick={() => openBill(s)}>
                      <Printer size={14} /> Bill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RENDER MODAL VIA PORTAL TO COVER ENTIRE SCREEN */}
      {showBill && selectedBill && createPortal(
        <div className="bg-bill-overlay" onClick={closeBill}>
          <div className="bg-bill-modal no-print" onClick={(e) => e.stopPropagation()}>
            <button className="bg-close-btn" onClick={closeBill}>
              <X size={20} />
            </button>

            {/* SCREEN ONLY VIEW (Unchanged) */}
            <div className="bg-screen-receipt">
              <div className="bg-screen-header">
                <img src={smartParkLogo} alt="SmartPark" className="bg-screen-logo" />
                <div className="bg-screen-title-wrap">
                  <h3>PARKING RECEIPT</h3>
                  <p>#{selectedBill.session.id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>

              <div className="bg-screen-divider" />

              <div className="bg-screen-section">
                <div className="bg-screen-row">
                  <div className="bg-screen-field">
                    <label><Car size={14} /> Vehicle</label>
                    <span>{selectedBill.session.vehicle}</span>
                  </div>
                  <div className="bg-screen-field">
                    <label><MapPin size={14} /> Parking Lot</label>
                    <span>{selectedBill.session.lotName}</span>
                  </div>
                </div>
                <div className="bg-screen-row">
                  <div className="bg-screen-field">
                    <label><ParkingSquare size={14} /> Slot</label>
                    <span>{selectedBill.session.slot}</span>
                  </div>
                  <div className="bg-screen-field">
                    <label><MapPin size={14} /> Address</label>
                    <span>{selectedBill.lotAddress}</span>
                  </div>
                </div>
              </div>

              <div className="bg-screen-divider" />

              <div className="bg-screen-section">
                <h4 className="bg-screen-subtitle"><Clock size={16} /> Session Details</h4>
                <div className="bg-screen-row">
                  <div className="bg-screen-field">
                    <label>Entry Time</label>
                    <span>{new Date(selectedBill.session.entryTime).toLocaleString()}</span>
                  </div>
                  <div className="bg-screen-field">
                    <label>Exit Time</label>
                    <span>{selectedBill.session.exitTime ? new Date(selectedBill.session.exitTime).toLocaleString() : '-'}</span>
                  </div>
                </div>
                <div className="bg-screen-row">
                  <div className="bg-screen-field">
                    <label>Duration</label>
                    <span className="text-highlight">{formatDuration(selectedBill.session.duration)}</span>
                  </div>
                  <div className="bg-screen-field">
                    <label>Rate</label>
                    <span>₹{selectedBill.ratePerHour}/hr</span>
                  </div>
                </div>
              </div>

              <div className="bg-screen-divider" />

              <div className="bg-screen-section">
                <h4 className="bg-screen-subtitle"><IndianRupee size={16} /> Billing</h4>
                <div className="bg-screen-total">
                  <span>Total Amount</span>
                  <span className="bg-total-amount">₹{selectedBill.session.cost?.toFixed(2) ?? '0.00'}</span>
                </div>
              </div>
              
              <div className="bg-screen-actions">
                <button className="btn btn-primary bg-btn-full" onClick={handlePrint}>
                  <Printer size={16} /> Print Receipt
                </button>
              </div>
            </div>
          </div>

          {/* =========================================
              PRINT ONLY VIEW (Detailed Landscape Format)
              ========================================= */}
          <div className="print-only-receipt">
            <div className="pr-main-container">
              
              <div className="pr-header">
                <img src={smartParkLogo} alt="SmartPark" className="pr-logo" />
              </div>

              <div className="pr-top-bar">
                <div className="pr-info-box">
                  <span className="pr-label"><Car size={12}/> VEHICLE</span>
                  <span className="pr-val">{selectedBill.session.vehicle}</span>
                </div>
                <div className="pr-info-box">
                  <span className="pr-label"><ParkingSquare size={12}/> PARKING</span>
                  <span className="pr-val">{selectedBill.session.slot}</span>
                </div>
                <div className="pr-info-box">
                  <span className="pr-label"><MapPin size={12}/> PARKING LOT</span>
                  <span className="pr-val">{selectedBill.session.lotName}</span>
                </div>
                <div className="pr-info-box">
                  <span className="pr-label"><MapPin size={12}/> ADDRESS</span>
                  <span className="pr-val">{selectedBill.lotAddress}</span>
                </div>
              </div>

              <div className="pr-cards-container">
                {/* Left Card: Session Details */}
                <div className="pr-card">
                  <h3 className="pr-card-title">SESSION DETAILS</h3>
                  <div className="pr-card-grid">
                    <div className="pr-field">
                      <span className="pr-label">ENTRY TIME</span>
                      <span className="pr-val">{new Date(selectedBill.session.entryTime).toLocaleString()}</span>
                    </div>
                    <div className="pr-field">
                      <span className="pr-label">EXIT TIME</span>
                      <span className="pr-val">{selectedBill.session.exitTime ? new Date(selectedBill.session.exitTime).toLocaleString() : '-'}</span>
                    </div>
                    <div className="pr-field">
                      <span className="pr-label"><Clock size={12} style={{marginRight: 2}}/> DURATION</span>
                      <span className="pr-val-teal">{formatDuration(selectedBill.session.duration)}</span>
                    </div>
                    <div className="pr-field">
                      <span className="pr-label">RATE</span>
                      <span className="pr-val">₹{selectedBill.ratePerHour}/hr</span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Billing */}
                <div className="pr-card">
                  <h3 className="pr-card-title">BILLING</h3>
                  <div className="pr-billing-row">
                    <span className="pr-b-label">Parking Duration</span>
                    <span className="pr-b-val">{formatDuration(selectedBill.session.duration)}</span>
                  </div>
                  <div className="pr-billing-row">
                    <span className="pr-b-label">Rate</span>
                    <span className="pr-b-val">₹{selectedBill.ratePerHour}/hr</span>
                  </div>
                  <div className="pr-billing-total">
                    <span className="pr-b-label">Total Amount</span>
                    <span className="pr-total-teal">₹{selectedBill.session.cost?.toFixed(2) ?? '0.00'}</span>
                  </div>
                  <div className="pr-billing-row pr-no-border">
                    <span className="pr-b-label">Payment Status</span>
                    <span className={`pr-status ${selectedBill.session.paymentStatus === 'PAID' ? 'pr-paid' : 'pr-pending'}`}>
                      {selectedBill.session.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pr-footer-top">
                <div className="pr-f-left">
                  <span className="pr-label">SESSION ID</span>
                  <span className="pr-val">{selectedBill.session.id}</span>
                </div>
                <div className="pr-f-right">
                  <span className="pr-label"><Calendar size={12}/> GENERATED AT</span>
                  <span className="pr-val">{selectedBill.generatedAt}</span>
                </div>
              </div>
              
              <div className="pr-footer-bottom">
                Thank you for choosing <span className="pr-brand">SmartPark!</span>
              </div>

            </div>
          </div>

        </div>,
        document.body
      )}
    </div>
  );
}