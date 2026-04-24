import { useState, useEffect } from 'react';
import { vehicleApi } from '../api';
import { Car, Plus, Trash2, Tag, AlertCircle } from 'lucide-react';
import './Vehicles.css';
import PageLoader from '../components/PageLoader';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rfidTag, setRfidTag] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    vehicleApi.getMy().then(r => { setVehicles(r.data); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await vehicleApi.register(rfidTag, plateNo);
      setShowForm(false);
      setRfidTag('');
      setPlateNo('');
      load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vehicle?')) return;
    try {
      await vehicleApi.remove(id);
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="vehicles-page animate-in">
      <div className="page-header">
        <h1>My Vehicles</h1>
        <p>Manage your registered vehicles and RFID tags</p>
      </div>
      <PageLoader />
    </div>
  );

  return (
    <div className="vehicles-page animate-in">
      <div className="page-header">
        <h1>My Vehicles</h1>
        <p>Manage your registered vehicles and RFID tags</p>
      </div>

      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        <Plus size={16} /> Register Vehicle
      </button>

      {showForm && (
        <div className="glass-card register-form animate-slide-up" style={{ marginTop: 16 }}>
          {error && (
            <div className="auth-error" style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="form-row">
              <div className="form-group">
                <label><Tag size={14} /> RFID Tag</label>
                <input placeholder="e.g. RFID-001" value={rfidTag}
                  onChange={e => setRfidTag(e.target.value)} required />
              </div>
              <div className="form-group">
                <label><Car size={14} /> Plate Number</label>
                <input placeholder="e.g. MH-01-AB-1234" value={plateNo}
                  onChange={e => setPlateNo(e.target.value)} required />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <div className="spinner" /> : 'Register'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="vehicles-grid" style={{ marginTop: 24 }}>
        {vehicles.length === 0 && (
          <div className="glass-card" style={{ textAlign: 'center', padding: 40, gridColumn: '1 / -1' }}>
            <Car size={48} color="var(--text-muted)" />
            <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>No vehicles registered yet</p>
          </div>
        )}
        {vehicles.map((v: any) => (
          <div key={v.id} className="vehicle-card glass-card">
            <div className="vehicle-header">
              <Car size={20} color="#0fb9b1" />
              <h3>{v.plateNo}</h3>
              <button className="btn-icon-delete" onClick={() => handleDelete(v.id)}>
                <Trash2 size={14} />
              </button>
            </div>
            <div className="vehicle-detail">
              <span className="detail-label">RFID Tag</span>
              <span className="rfid-tag">{v.rfidTag}</span>
            </div>
            {v.activeSession && (
              <div className="active-badge">
                <span className="dot" style={{ background: '#f59e0b', width: 8, height: 8 }} />
                Parked at {v.activeSession.slot}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
