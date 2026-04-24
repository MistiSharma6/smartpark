import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '../api';
import {
  Navigation, Clock, MapPin, Zap, Crown, Accessibility, Car,
  ArrowRight, XCircle, ChevronRight, CalendarPlus, Route, Layers, ParkingSquare,
  ShieldCheck, ShieldAlert, Receipt, Scan
} from 'lucide-react';
import './MyBooking.css';
import PageLoader from '../components/PageLoader';

export default function MyBooking() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [pastBookings, setPastBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    Promise.all([
      bookingApi.getActive().then(r => setBooking(r.data)).catch(() => { }),
      bookingApi.getMy().then(r => setPastBookings(r.data)).catch(() => { }),
    ]).finally(() => setLoading(false));
  }, []);

  const handleCancel = async () => {
    if (!booking || cancelling) return;
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(true);
    try {
      await bookingApi.cancel(booking.bookingId);
      setBooking(null);
      // Refresh bookings
      bookingApi.getMy().then(r => setPastBookings(r.data)).catch(() => { });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCancelling(false);
    }
  };

  const getTypeIcon = (type: string) => {
    if (type === 'EV_CHARGING') return <Zap size={16} color="#10b981" />;
    if (type === 'PREMIUM') return <Crown size={16} color="#f59e0b" />;
    if (type === 'HANDICAPPED') return <Accessibility size={16} color="#0fb9b1" />;
    return <Car size={16} color="var(--text-secondary)" />;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      REGISTERED: 'badge-reserved',
      CONFIRMED: 'badge-free',
      PENDING: 'badge-reserved',
      CHECKED_IN: 'badge-free',
      COMPLETED: 'badge-free',
      CANCELLED: 'badge-occupied',
      EXPIRED: 'badge-occupied',
    };
    return <span className={`badge ${styles[status] || ''}`}>{status.replace('_', ' ')}</span>;
  };

  if (loading) {
    return (
      <div className="my-booking-page animate-in">
        <div className="page-header">
          <h1><Navigation size={24} /> Your Booking on SmartPark</h1>
          <p>View your parking reservation and navigate to your spot</p>
        </div>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="my-booking-page animate-in">
      <div className="page-header">
        <h1><Navigation size={24} /> Your Booking on SmartPark</h1>
        <p>View your parking reservation and navigate to your spot</p>
      </div>

      {/* Active Booking */}
      {booking ? (
        <div className="active-booking-card glass-card animate-slide-up">
          <div className="booking-status-row">
            <div className="booking-status-badge confirmed">
              {booking.source === 'DIRECT_SCAN' ? <Scan size={18} /> : <Navigation size={18} />}
              {booking.source === 'DIRECT_SCAN' ? 'Direct Entry' : 'Active Booking'}
            </div>
            {getStatusBadge(booking.status)}
          </div>

          <div className="booking-details-grid">
            <div className="booking-detail">
              <span className="detail-icon"><MapPin size={16} /></span>
              <div>
                <span className="detail-label">Parking Lot</span>
                <span className="detail-value">{booking.lot.name}</span>
                {booking.lot.address && <span className="detail-sub">{booking.lot.address}</span>}
              </div>
            </div>

            <div className="booking-detail">
              <span className="detail-icon"><Car size={16} /></span>
              <div>
                <span className="detail-label">Assigned Spot</span>
                <span className="detail-value">{booking.slot?.label || 'Pending assignment'}</span>
              </div>
            </div>

            <div className="booking-detail">
              <span className="detail-icon"><Layers size={16} /></span>
              <div>
                <span className="detail-label">Floor</span>
                <span className="detail-value">Floor {booking.slot?.floor || '?'}</span>
              </div>
            </div>

            <div className="booking-detail">
              <span className="detail-icon">{getTypeIcon(booking.slotType)}</span>
              <div>
                <span className="detail-label">Slot Type</span>
                <span className="detail-value">{booking.slotType.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="booking-detail">
              <span className="detail-icon"><Clock size={16} /></span>
              <div>
                <span className="detail-label">{booking.source === 'DIRECT_SCAN' ? 'Entry Time' : 'Expires At'}</span>
                <span className="detail-value">
                  {booking.source === 'DIRECT_SCAN'
                    ? new Date(booking.entryTime).toLocaleTimeString()
                    : new Date(booking.expiresAt).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {booking.vehicle && (
              <div className="booking-detail">
                <span className="detail-icon"><Car size={16} /></span>
                <div>
                  <span className="detail-label">Vehicle</span>
                  <span className="detail-value">{booking.vehicle.plateNo}</span>
                </div>
              </div>
            )}

            <div className="booking-detail">
              <span className="detail-icon">
                {booking.confirmed ? <ShieldCheck size={16} color="#10b981" /> : <ShieldAlert size={16} color="#f59e0b" />}
              </span>
              <div>
                <span className="detail-label">{booking.source === 'DIRECT_SCAN' ? 'Entry Method' : 'RFID Confirmation'}</span>
                <span className="detail-value" style={{ color: booking.confirmed ? '#10b981' : '#f59e0b' }}>
                  {booking.source === 'DIRECT_SCAN'
                    ? `RFID scanned at ${new Date(booking.confirmedAt).toLocaleTimeString()}`
                    : booking.confirmed
                      ? `Confirmed at ${new Date(booking.confirmedAt).toLocaleTimeString()}`
                      : 'Awaiting RFID scan at entry gate'}
                </span>
              </div>
            </div>
          </div>

          {booking.preferences?.length > 0 && (
            <div className="booking-prefs">
              <span className="prefs-label">Preferences:</span>
              {booking.preferences.map((p: string) => (
                <span key={p} className="badge badge-free">{p.replace('_', ' ')}</span>
              ))}
            </div>
          )}

          {/* Path Preview */}
          {booking.path && (
            <div className="path-preview">
              <h3><Route size={16} /> Your Route</h3>
              <div className="path-steps">
                {booking.path.pathCoordinates.map((node: any, i: number) => {
                  const isRamp = node.id?.startsWith('ramp-');
                  const isFirst = i === 0;
                  const isLast = i === booking.path.pathCoordinates.length - 1;
                  const prevFloor = i > 0 ? booking.path.pathCoordinates[i - 1]?.floor : null;
                  const floorChanged = prevFloor && node.floor && node.floor !== prevFloor;
                  return (
                    <div key={i} className="path-step">
                      {floorChanged && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 700, margin: '0 4px' }}>⬆️ F{prevFloor}→F{node.floor}</div>
                      )}
                      <div className={`path-node ${isFirst ? 'start' : isLast ? 'end' : isRamp ? 'ramp' : ''}`}>
                        {isFirst ? '🟢' : isLast ? '🎯' : isRamp ? '🔀' : '→'}
                      </div>
                      <span className="path-label">{node.label || node.id}</span>
                      {!isLast && <ChevronRight size={12} className="path-arrow" />}
                    </div>
                  );
                })}
              </div>
              <p className="path-distance">
                Total distance: <strong>{booking.path.distance} units</strong>
              </p>
            </div>
          )}

          {/* Multi-floor guidance */}
          {booking.lot.floors > 1 && booking.slot?.floor > 1 && (
            <div className="floor-guide glass-card">
              <h3><Layers size={16} /> Multi-Floor Navigation</h3>
              <div className="floor-steps">
                {Array.from({ length: booking.slot.floor }, (_, i) => (
                  <div key={i} className="floor-step">
                    <div className={`floor-badge ${i + 1 === booking.slot.floor ? 'current' : 'transit'}`}>
                      F{i + 1}
                    </div>
                    {i + 1 < booking.slot.floor && (
                      <div className="ramp-indicator">
                        <ArrowRight size={14} />
                        <span>Up Ramp ⬆️ / Two-way ↕️</span>
                        <ArrowRight size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>
                Take the nearest Up Ramp ⬆️ or Two-way Ramp ↕️ to reach Floor {booking.slot.floor}, then follow the path to {booking.slot.label}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="booking-actions">
            <button className="btn btn-primary" onClick={() => navigate(`/pathfinder/${booking.lot.id}`)}>
              <Route size={16} /> Find Nearest Path
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/parking-area/${booking.lot.id}`)}>
              <ParkingSquare size={16} /> View Parking Area
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/map/${booking.lot.id}`)}>
              <MapPin size={16} /> View Full Map
            </button>
            {booking.status === 'REGISTERED' && !booking.source && (
              <button className="btn btn-danger" onClick={handleCancel} disabled={cancelling}>
                {cancelling ? <div className="spinner" /> : <><XCircle size={16} /> Cancel Booking</>}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="no-booking-card glass-card">
          <Navigation size={48} color="var(--text-muted)" />
          <h2>No Active Booking</h2>
          <p>You don't have any active parking reservation right now.</p>
          <button className="btn btn-primary" onClick={() => navigate('/book')}>
            <CalendarPlus size={16} /> Book Parking Now
          </button>
        </div>
      )}

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div className="past-bookings">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h2>Booking History</h2>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/bills')}>
              <Receipt size={14} /> View Bills
            </button>
          </div>
          <div className="glass-card" style={{ overflow: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Status</th><th>Confirmed</th><th>Lot</th><th>Slot</th><th>Type</th><th>Booked At</th><th>Expires</th>
                </tr>
              </thead>
              <tbody>
                {pastBookings.map((b: any) => (
                  <tr key={b.id}>
                    <td>{getStatusBadge(b.status)}</td>
                    <td>
                      {b.confirmed
                        ? <span style={{ color: '#10b981', fontWeight: 600 }}>✓ Yes</span>
                        : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>{b.lotName}</td>
                    <td>{b.slot || '—'}</td>
                    <td>{b.slotType.replace('_', ' ')}</td>
                    <td>{new Date(b.bookingTime).toLocaleString()}</td>
                    <td>{new Date(b.expiresAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
