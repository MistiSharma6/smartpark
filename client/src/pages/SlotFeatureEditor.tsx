import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lotApi } from '../api';
import { API_BASE_URL } from '../config';
import {
  DoorOpen, ArrowRight, Sun, Shield, CheckCircle, Save,
  AlertCircle, ParkingSquare, Layers, ArrowLeft,
} from 'lucide-react';
import './SlotFeatureEditor.css';
import PageLoader from '../components/PageLoader';

const FEATURES = [
  { value: 'near_exit', label: 'Near Exit', icon: DoorOpen, color: '#10b981' },
  { value: 'near_elevator', label: 'Near Elevator', icon: ArrowRight, color: '#0fb9b1' },
  { value: 'shaded', label: 'Shaded Area', icon: Sun, color: '#f59e0b' },
  { value: 'security_camera', label: 'CCTV Covered', icon: Shield, color: '#8b5cf6' },
];

async function apiRequest(endpoint: string, options: any = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export default function SlotFeatureEditor() {
  const { lotId } = useParams<{ lotId: string }>();
  const navigate = useNavigate();
  const [lot, setLot] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [changes, setChanges] = useState<Map<string, string[]>>(new Map());
  const [bulkFeature, setBulkFeature] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!lotId) return;
    Promise.all([
      lotApi.getOne(lotId).then(r => setLot(r.data)),
      apiRequest(`/slots/lot/${lotId}`).then(r => {
        // Safely extract the array regardless of the API wrapper structure
        const fetchedSlots = r.data?.slots || r.data || r.slots || [];
        setSlots(Array.isArray(fetchedSlots) ? fetchedSlots : []);
      }),
    ]).catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [lotId]);

  const getSlotFeatures = (slotId: string): string[] => {
    if (changes.has(slotId)) return changes.get(slotId)!;
    const slot = slots.find(s => s.id === slotId);
    return slot?.features || [];
  };

  const toggleFeature = (slotId: string, feature: string) => {
    const current = getSlotFeatures(slotId);
    const updated = current.includes(feature)
      ? current.filter(f => f !== feature)
      : [...current, feature];
    setChanges(prev => new Map(prev).set(slotId, updated));
  };

  const toggleSlotSelection = (slotId: string) => {
    setSelectedSlots(prev => {
      const next = new Set(prev);
      if (next.has(slotId)) next.delete(slotId);
      else next.add(slotId);
      return next;
    });
  };

  const selectAllOnFloor = () => {
    const floorSlots = slots.filter(s => s.floor === selectedFloor);
    const allSelected = floorSlots.every(s => selectedSlots.has(s.id));
    if (allSelected) {
      setSelectedSlots(prev => {
        const next = new Set(prev);
        floorSlots.forEach(s => next.delete(s.id));
        return next;
      });
    } else {
      setSelectedSlots(prev => {
        const next = new Set(prev);
        floorSlots.forEach(s => next.add(s.id));
        return next;
      });
    }
  };

  const applyBulkFeature = () => {
    if (!bulkFeature || selectedSlots.size === 0) return;
    setChanges(prev => {
      const next = new Map(prev);
      for (const slotId of selectedSlots) {
        const current = getSlotFeatures(slotId);
        if (!current.includes(bulkFeature)) {
          next.set(slotId, [...current, bulkFeature]);
        }
      }
      return next;
    });
    setSuccess(`Added "${FEATURES.find(f => f.value === bulkFeature)?.label}" to ${selectedSlots.size} slots`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const removeBulkFeature = () => {
    if (!bulkFeature || selectedSlots.size === 0) return;
    setChanges(prev => {
      const next = new Map(prev);
      for (const slotId of selectedSlots) {
        const current = getSlotFeatures(slotId);
        next.set(slotId, current.filter(f => f !== bulkFeature));
      }
      return next;
    });
    setSuccess(`Removed "${FEATURES.find(f => f.value === bulkFeature)?.label}" from ${selectedSlots.size} slots`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSave = async () => {
    if (changes.size === 0) {
      setError('No changes to save');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const promises = Array.from(changes.entries()).map(([slotId, features]) =>
        apiRequest(`/slots/${slotId}`, { method: 'PATCH', body: { features } })
      );
      await Promise.all(promises);
      
      // Refresh slots using safe extraction
      const res = await apiRequest(`/slots/lot/${lotId}`);
      const fetchedSlots = res.data?.slots || res.data || res.slots || [];
      setSlots(Array.isArray(fetchedSlots) ? fetchedSlots : []);
      
      setChanges(new Map());
      setSuccess(`✅ Updated features for ${promises.length} slot(s)!`);
      setTimeout(() => setSuccess(''), 4000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const floors = lot ? Array.from({ length: lot.floors || 1 }, (_, i) => i + 1) : [1];
  const floorSlots = slots.filter(s => s.floor === selectedFloor)
    .sort((a, b) => a.block.localeCompare(b.block) || a.number - b.number);

  if (loading) return (
    <div className="slot-feature-editor animate-in">
      <div className="page-header">
        <h1>🏷️ Slot Feature Editor</h1>
        <p>Assign preferences to parking slots</p>
      </div>
      <PageLoader />
    </div>
  );

  return (
    <div className="slot-feature-editor animate-in">
      <div className="page-header">
        <h1>🏷️ Slot Feature Editor</h1>
        <p>{lot ? `Managing features for: ${lot.name}` : 'Assign preferences to parking slots'}</p>
      </div>

      {error && <div className="toast toast-error"><AlertCircle size={16} /> {error}</div>}
      {success && <div className="toast toast-success"><CheckCircle size={16} /> {success}</div>}

      {/* Floor Selector */}
      {floors.length > 1 && (
        <div className="sfe-floor-selector glass-card">
          <Layers size={16} />
          <span>Floor:</span>
          {floors.map(f => (
            <button key={f}
              className={`floor-btn ${selectedFloor === f ? 'active' : ''}`}
              onClick={() => setSelectedFloor(f)}>
              F{f} <span className="floor-count">({slots.filter(s => s.floor === f).length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Bulk Actions */}
      <div className="sfe-bulk glass-card">
        <div className="sfe-bulk-header">
          <h3>Bulk Assign Features</h3>
          <button className="btn btn-secondary btn-sm" onClick={selectAllOnFloor}>
            {floorSlots.every(s => selectedSlots.has(s.id)) ? 'Deselect All' : 'Select All'} on F{selectedFloor}
          </button>
        </div>
        <div className="sfe-bulk-controls">
          <select value={bulkFeature} onChange={e => setBulkFeature(e.target.value)}
            className="sfe-select">
            <option value="">Select feature...</option>
            {FEATURES.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <button className="btn btn-primary btn-sm" onClick={applyBulkFeature}
            disabled={!bulkFeature || selectedSlots.size === 0}>
            + Add to {selectedSlots.size} slot(s)
          </button>
          <button className="btn btn-secondary btn-sm" onClick={removeBulkFeature}
            disabled={!bulkFeature || selectedSlots.size === 0}>
            − Remove
          </button>
        </div>
        {selectedSlots.size > 0 && (
          <p className="sfe-selection-info">{selectedSlots.size} slot(s) selected</p>
        )}
      </div>

      {/* Slots Grid */}
      <div className="sfe-slots-grid">
        {floorSlots.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: 48 }}>
            <ParkingSquare size={48} color="var(--text-muted)" />
            <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>No slots on Floor {selectedFloor}</p>
          </div>
        ) : (
          floorSlots.map(slot => {
            const features = getSlotFeatures(slot.id);
            const isSelected = selectedSlots.has(slot.id);
            const hasChanges = changes.has(slot.id);

            return (
              <div key={slot.id} className={`sfe-slot-card glass-card ${isSelected ? 'selected' : ''} ${hasChanges ? 'modified' : ''}`}>
                <div className="sfe-slot-header" onClick={() => toggleSlotSelection(slot.id)}>
                  <input type="checkbox" checked={isSelected} readOnly className="sfe-checkbox" />
                  <div className="sfe-slot-label">
                    <strong>{slot.block}-{slot.number}</strong>
                    <span className="sfe-slot-type">{slot.type.replace('_', ' ')}</span>
                  </div>
                  {hasChanges && <span className="sfe-changed-badge">Modified</span>}
                </div>
                <div className="sfe-features">
                  {FEATURES.map(f => {
                    const active = features.includes(f.value);
                    return (
                      <button
                        key={f.value}
                        className={`sfe-feature-btn ${active ? 'active' : ''}`}
                        onClick={() => toggleFeature(slot.id, f.value)}
                        style={{ '--feat-color': f.color } as any}
                      >
                        <f.icon size={12} />
                        {f.label}
                        {active && <CheckCircle size={10} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Action Bar */}
      <div className="sfe-actions glass-card">
        <button className="btn btn-secondary" onClick={() => navigate('/lot-manager')}>
          <ArrowLeft size={16} /> Back to Lot Manager
        </button>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {changes.size > 0 && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {changes.size} slot(s) modified
            </span>
          )}
          <button className="btn btn-primary" onClick={handleSave} disabled={saving || changes.size === 0}>
            {saving ? <div className="spinner" /> : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}