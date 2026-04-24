import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lotApi } from '../api';
import { Plus, ParkingSquare, MapPin, Layers, IndianRupee, ArrowRight, AlertCircle, CheckCircle, Tag } from 'lucide-react';
import './LotManager.css';
import PageLoader from '../components/PageLoader';

interface LotFormData {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  floors: number;
  ratePerHour: number;
}

export default function LotManager() {
  const navigate = useNavigate();
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<LotFormData>({ name: '', address: '', latitude: '', longitude: '', floors: 1, ratePerHour: 20 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    lotApi.getAll().then(r => { setLots(r.data); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSubmitting(true);
    try {
      const res = await lotApi.create({
        name: form.name,
        address: form.address || undefined,
        latitude: form.latitude ? parseFloat(form.latitude) : undefined,
        longitude: form.longitude ? parseFloat(form.longitude) : undefined,
        floors: form.floors,
        ratePerHour: form.ratePerHour,
      });
      setSuccess(`Lot "${res.data.name}" created! Now design its layout.`);
      setShowCreate(false);
      setForm({ name: '', address: '', latitude: '', longitude: '', floors: 1, ratePerHour: 20 });
      load();
      // Navigate to grid designer after a beat
      setTimeout(() => navigate(`/lot-designer/${res.data.id}`), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="lot-manager animate-in">
      <div className="page-header">
        <h1><ParkingSquare size={24} /> Parking Lot Manager</h1>
        <p>Register and design your parking areas</p>
      </div>
      <PageLoader />
    </div>
  );

  return (
    <div className="lot-manager animate-in">
      <div className="page-header">
        <h1><ParkingSquare size={24} /> Parking Lot Manager</h1>
        <p>Register and design your parking areas</p>
      </div>

      {error && <div className="toast toast-error"><AlertCircle size={16} /> {error}</div>}
      {success && <div className="toast toast-success"><CheckCircle size={16} /> {success}</div>}

      <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)}>
        <Plus size={16} /> Register New Parking Area
      </button>

      {/* Create Form */}
      {showCreate && (
        <div className="glass-card create-lot-form animate-slide-up">
          <h3>Register Your Parking Area</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 20 }}>
            Fill in the details below. After creation, you'll design the layout using an interactive grid.
          </p>
          <form onSubmit={handleCreate}>
            <div className="form-row">
              <div className="form-group">
                <label><ParkingSquare size={14} /> Parking Lot Name *</label>
                <input placeholder="e.g. Sunrise Mall Parking" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label><MapPin size={14} /> Address</label>
                <input placeholder="e.g. 123 Main Street, Delhi" value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label><MapPin size={14} /> Latitude</label>
                <input type="text" placeholder="e.g. 28.6139" value={form.latitude}
                  onChange={e => setForm({ ...form, latitude: e.target.value })} />
              </div>
              <div className="form-group">
                <label><MapPin size={14} /> Longitude</label>
                <input type="text" placeholder="e.g. 77.209" value={form.longitude}
                  onChange={e => setForm({ ...form, longitude: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label><Layers size={14} /> Number of Floors</label>
                <input type="number" min={1} max={10} value={form.floors}
                  onChange={e => setForm({ ...form, floors: parseInt(e.target.value) || 1 })} />
              </div>
              <div className="form-group">
                <label><IndianRupee size={14} /> Rate per Hour (₹)</label>
                <input type="number" min={0} step={5} value={form.ratePerHour}
                  onChange={e => setForm({ ...form, ratePerHour: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <div className="spinner" /> : <><Plus size={16} /> Create & Design Layout</>}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Lots */}
      <h2 style={{ marginTop: 32, marginBottom: 16 }}>Your Parking Areas</h2>
      <div className="lots-grid">
        {lots.length === 0 && (
          <div className="glass-card" style={{ textAlign: 'center', padding: 48, gridColumn: '1 / -1' }}>
            <ParkingSquare size={48} color="var(--text-muted)" />
            <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>No parking areas registered yet</p>
          </div>
        )}
        {lots.map((lot: any) => (
          <div key={lot.id} className="lot-mgr-card glass-card">
            <div className="lot-mgr-header">
              <ParkingSquare size={20} color="#0fb9b1" />
              <div>
                <h3>{lot.name}</h3>
                <p className="lot-mgr-address">{lot.address || 'No address set'}</p>
              </div>
            </div>
            <div className="lot-mgr-stats">
              <div className="lot-mgr-stat">
                <span className="stat-num">{lot.totalSlots}</span>
                <span>Slots</span>
              </div>
              <div className="lot-mgr-stat">
                <span className="stat-num">{lot.floors}</span>
                <span>Floors</span>
              </div>
              <div className="lot-mgr-stat">
                <span className="stat-num">₹{lot.ratePerHour}</span>
                <span>/hr</span>
              </div>
            </div>
            <div className="lot-mgr-tags">
              <span className={`badge ${lot.hasGraph ? 'badge-free' : 'badge-reserved'}`}>
                {lot.hasGraph ? '✓ Graph Configured' : '⚠ No Graph'}
              </span>
              <span className="badge badge-free">{lot.freeSlots} Free</span>
              <span className="badge badge-occupied">{lot.occupiedSlots} Occupied</span>
            </div>
            <div className="lot-mgr-actions">
              <button className="btn btn-primary btn-sm" onClick={() => navigate(`/lot-designer/${lot.id}`)}>
                Design Layout <ArrowRight size={14} />
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/slot-features/${lot.id}`)}>
                <Tag size={14} /> Manage Features
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/pathfinder/${lot.id}`)}>
                Find Path <ArrowRight size={14} />
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/map/${lot.id}`)}>
                View Map
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
