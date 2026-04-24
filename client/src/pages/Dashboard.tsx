import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { lotApi, vehicleApi } from '../api';
import { Car, Map, ParkingSquare, Clock, ChevronRight, Navigation, Building2, TrendingUp, CalendarPlus } from 'lucide-react';
import './Dashboard.css';
import PageLoader from '../components/PageLoader';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lots, setLots] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      lotApi.getAll().then(r => setLots(r.data)),
      vehicleApi.getMy().then(r => setVehicles(r.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  // Aggregate stats across ALL lots
  const totalSlots = lots.reduce((sum, l) => sum + (l.totalSlots || 0), 0);
  const freeSlots = lots.reduce((sum, l) => sum + (l.freeSlots || 0), 0);
  const occupiedSlots = lots.reduce((sum, l) => sum + (l.occupiedSlots || 0), 0);
  const occupancyPct = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

  return (
    <div className="dashboard animate-in">
      <div className="page-header">
        <h1>Welcome, {user?.name} 👋</h1>
        <p>Here's your parking overview across all lots</p>
      </div>

      {/* Aggregate Stats */}
      <div className="grid-stats">
        <div className="glass-card stat-card">
          <div className="stat-icon"><ParkingSquare size={20} /></div>
          <div className="stat-value">{totalSlots}</div>
          <div className="stat-label">Total Slots</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: '#10b981', WebkitTextFillColor: '#10b981' }}>
            {freeSlots}
          </div>
          <div className="stat-label">Free Slots</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: '#ef4444', WebkitTextFillColor: '#ef4444' }}>
            {occupiedSlots}
          </div>
          <div className="stat-label">Occupied</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">{occupancyPct}%</div>
          <div className="stat-label">Occupancy</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-title-row"><h2>Quick Actions</h2></div>
      <div className="quick-actions">
        <button className="action-card glass-card" onClick={() => navigate('/vehicles')}>
          <Car size={24} color="#10b981" />
          <div>
            <h3 style={{ color: '#10b981' }}>My Vehicles</h3>
            <p>{vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} registered</p>
          </div>
          <ChevronRight size={18} />
        </button>
        <button className="action-card glass-card" onClick={() => navigate('/history')}>
          <Clock size={24} color="#f59e0b" />
          <div>
            <h3 style={{ color: '#f59e0b' }}>Parking History</h3>
            <p>View past sessions and bills</p>
          </div>
          <ChevronRight size={18} />
        </button>
        <button className="action-card glass-card" onClick={() => navigate('/my-booking')}>
          <Navigation size={24} color="#0fb9b1" />
          <div>
            <h3 style={{ color: '#0fb9b1' }}>Your Booking</h3>
            <p>View your reservation & navigate</p>
          </div>
          <ChevronRight size={18} />
        </button>
        <button className="action-card glass-card" onClick={() => navigate('/book')}>
          <CalendarPlus size={24} color="#06b6d4" />
          <div>
            <h3 style={{ color: '#06b6d4' }}>Book Parking</h3>
            <p>Reserve a spot online</p>
          </div>
          <ChevronRight size={18} />
        </button>
        {user?.role === 'ADMIN' && (
          <button className="action-card glass-card" onClick={() => navigate('/lot-manager')}>
            <Building2 size={24} color="#0fb9b1" />
            <div>
              <h3 style={{ color: '#0fb9b1' }}>Manage Lots</h3>
              <p>Register & design parking areas</p>
            </div>
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {/* ALL Available Parking Lots */}
      <div className="section-title-row">
        <h2>Available Parking Lots</h2>
        <span className="section-count">{lots.length} lot{lots.length !== 1 ? 's' : ''}</span>
      </div>
      {lots.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: 48 }}>
          <ParkingSquare size={48} color="var(--text-muted)" />
          <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>No parking lots registered yet</p>
        </div>
      ) : (
        <div className="lots-list">
          {lots.map((lot: any) => {
            const lotOccPct = lot.totalSlots > 0 ? Math.round((lot.occupiedSlots / lot.totalSlots) * 100) : 0;
            return (
              <div key={lot.id} className="lot-card glass-card" onClick={() => navigate(`/map/${lot.id}`)}>
                <div className="lot-header">
                  <ParkingSquare size={20} color="#0fb9b1" />
                  <h3>{lot.name}</h3>
                  <div className="lot-occupancy-bar">
                    <div className="lot-occupancy-fill" style={{
                      width: `${lotOccPct}%`,
                      background: lotOccPct > 80 ? '#ef4444' : lotOccPct > 50 ? '#f59e0b' : '#10b981'
                    }} />
                  </div>
                  <span className="lot-occupancy-pct">{lotOccPct}%</span>
                </div>
                <p className="lot-address">{lot.address || 'No address set'}</p>
                <div className="lot-stats">
                  <span className="badge badge-free">{lot.freeSlots} Free</span>
                  <span className="badge badge-occupied">{lot.occupiedSlots} Occupied</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ₹{lot.ratePerHour}/hr · {lot.floors} floor{lot.floors !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="lot-actions" onClick={e => e.stopPropagation()}>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/map/${lot.id}`)}>
                    <Map size={14} /> Live Map
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/pathfinder/${lot.id}`)}>
                    <Navigation size={14} /> Find Path
                  </button>
                  {user?.role === 'ADMIN' && (
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/analytics/${lot.id}`)}>
                      <TrendingUp size={14} /> Analytics
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Sessions */}
      {vehicles.filter((v: any) => v.activeSession).length > 0 && (
        <>
          <div className="section-title-row"><h2>Active Sessions</h2></div>
          <div className="lots-list">
            {vehicles.filter((v: any) => v.activeSession).map((v: any) => (
              <div key={v.id} className="lot-card glass-card">
                <div className="lot-header">
                  <Car size={20} color="#f59e0b" />
                  <h3>{v.plateNo}</h3>
                </div>
                <p className="lot-address">Parked at {v.activeSession.slot} — {v.activeSession.lotName}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Since {new Date(v.activeSession.entryTime).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
