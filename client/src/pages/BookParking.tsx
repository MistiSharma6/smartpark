import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { lotApi, vehicleApi, bookingApi } from '../api';
import {
  CalendarPlus, ParkingSquare, Car, Zap, Crown, Accessibility,
  ArrowRight, ArrowLeft, CheckCircle, MapPin, DoorOpen,
  Shield, Sun, AlertCircle, Navigation
} from 'lucide-react';
import './BookParking.css';
import PageLoader from '../components/PageLoader';

const SLOT_TYPES = [
  { value: 'REGULAR', label: 'Regular', icon: Car, color: '#94a3b8', desc: 'Standard parking spot' },
  { value: 'EV_CHARGING', label: 'EV Charging', icon: Zap, color: '#10b981', desc: 'Electric vehicle charging port' },
  { value: 'PREMIUM', label: 'Premium', icon: Crown, color: '#f59e0b', desc: 'Premium location, wider space' },
  { value: 'HANDICAPPED', label: 'Handicapped', icon: Accessibility, color: '#0fb9b1', desc: 'Accessible parking space' },
];

const PREFERENCES = [
  { value: 'near_exit', label: 'Near Exit', icon: DoorOpen },
  { value: 'near_elevator', label: 'Near Elevator', icon: ArrowRight },
  { value: 'shaded', label: 'Shaded Area', icon: Sun },
  { value: 'security_camera', label: 'CCTV Covered', icon: Shield },
];

export default function BookParking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedLot = searchParams.get('lot');

  const [step, setStep] = useState(1);
  const [lots, setLots] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  // Form state
  const [selectedLot, setSelectedLot] = useState<string>(preselectedLot || '');
  const [selectedType, setSelectedType] = useState('REGULAR');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    Promise.all([
      lotApi.getAll().then(r => setLots(r.data)),
      vehicleApi.getMy().then(r => setVehicles(r.data)).catch(() => { }),
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (preselectedLot) setSelectedLot(preselectedLot);
  }, [preselectedLot]);

  const togglePref = (pref: string) => {
    setSelectedPrefs(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await bookingApi.create({
        lotId: selectedLot,
        vehicleId: selectedVehicle || undefined,
        slotType: selectedType,
        preferences: selectedPrefs,
      });
      setResult(res.data);
      setStep(5);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getSelectedLot = () => lots.find(l => l.id === selectedLot);

  if (loading) return (
    <div className="book-parking animate-in">
      <div className="page-header">
        <h1><CalendarPlus size={24} /> Book Parking Online</h1>
        <p>Reserve your parking spot in advance with your preferences</p>
      </div>
      <PageLoader />
    </div>
  );

  return (
    <div className="book-parking animate-in">
      <div className="page-header">
        <h1><CalendarPlus size={24} /> Book Parking Online</h1>
        <p>Reserve your parking spot in advance with your preferences</p>
      </div>

      {error && <div className="toast toast-error"><AlertCircle size={16} /> {error}</div>}

      {/* Progress Steps */}
      <div className="booking-progress glass-card">
        {[
          { n: 1, label: 'Select Lot' },
          { n: 2, label: 'Vehicle Type' },
          { n: 3, label: 'Preferences' },
          { n: 4, label: 'Confirm' },
          { n: 5, label: 'Done!' },
        ].map(s => (
          <div key={s.n} className={`progress-step ${step >= s.n ? 'active' : ''} ${step === s.n ? 'current' : ''}`}>
            <div className="step-circle">{step > s.n ? '✓' : s.n}</div>
            <span className="step-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Select Lot */}
      {step === 1 && (
        <div className="booking-step animate-slide-up">
          <h2>Choose a Parking Lot</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
            Select where you'd like to park
          </p>
          <div className="booking-lots-grid">
            {lots.map(lot => (
              <div
                key={lot.id}
                className={`booking-lot-card glass-card ${selectedLot === lot.id ? 'selected' : ''}`}
                onClick={() => setSelectedLot(lot.id)}
              >
                <div className="booking-lot-header">
                  <ParkingSquare size={20} color="#0fb9b1" />
                  <h3>{lot.name}</h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {lot.address || 'No address'}
                </p>
                <div className="booking-lot-info">
                  <span className="badge badge-free">{lot.freeSlots} Free</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    ₹{lot.ratePerHour}/hr · {lot.floors} floor{lot.floors > 1 ? 's' : ''}
                  </span>
                </div>
                {selectedLot === lot.id && (
                  <div className="lot-selected-check"><CheckCircle size={20} /></div>
                )}
              </div>
            ))}
          </div>
          <div className="step-nav">
            <div />
            <button className="btn btn-primary" disabled={!selectedLot}
              onClick={() => setStep(2)}>
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Vehicle / Slot Type */}
      {step === 2 && (
        <div className="booking-step animate-slide-up">
          <h2>What type of parking do you need?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
            Is it an EV? Need premium parking? Choose your spot type.
          </p>
          <div className="slot-type-grid">
            {SLOT_TYPES.map(st => (
              <div
                key={st.value}
                className={`slot-type-card glass-card ${selectedType === st.value ? 'selected' : ''}`}
                onClick={() => setSelectedType(st.value)}
                style={{ '--type-color': st.color } as any}
              >
                <st.icon size={28} color={st.color} />
                <h3>{st.label}</h3>
                <p>{st.desc}</p>
                {selectedType === st.value && (
                  <div className="type-check"><CheckCircle size={18} /></div>
                )}
              </div>
            ))}
          </div>

          {/* Vehicle selection */}
          {vehicles.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ marginBottom: 12 }}>Select Vehicle (optional)</h3>
              <div className="vehicle-select-grid">
                <div
                  className={`vehicle-opt glass-card ${!selectedVehicle ? 'selected' : ''}`}
                  onClick={() => setSelectedVehicle('')}
                >
                  <Car size={18} color="var(--text-muted)" />
                  <span>No vehicle linked</span>
                </div>
                {vehicles.map((v: any) => (
                  <div
                    key={v.id}
                    className={`vehicle-opt glass-card ${selectedVehicle === v.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVehicle(v.id)}
                  >
                    <Car size={18} color="#0fb9b1" />
                    <span>{v.plateNo}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>RFID: {v.rfidTag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="step-nav">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Back
            </button>
            <button className="btn btn-primary" onClick={() => setStep(3)}>
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preferences (Optional) */}
      {step === 3 && (
        <div className="booking-step animate-slide-up">
          <h2>Additional Preferences <span style={{ fontSize: '0.7em', color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
            Select what matters to you — we'll try our best to match them.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 20, fontStyle: 'italic' }}>
            💡 These preferences are optional and best-effort. If no exact match is available, we'll assign the best alternative slot for you.
          </p>
          <div className="prefs-grid">
            {PREFERENCES.map(pref => (
              <div
                key={pref.value}
                className={`pref-card glass-card ${selectedPrefs.includes(pref.value) ? 'selected' : ''}`}
                onClick={() => togglePref(pref.value)}
              >
                <pref.icon size={22} />
                <span>{pref.label}</span>
                {selectedPrefs.includes(pref.value) && <CheckCircle size={16} className="pref-check" />}
              </div>
            ))}
          </div>
          <div className="step-nav">
            <button className="btn btn-secondary" onClick={() => setStep(2)}>
              <ArrowLeft size={16} /> Back
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => { setSelectedPrefs([]); setStep(4); }}>
                Skip →
              </button>
              <button className="btn btn-primary" onClick={() => setStep(4)}>
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div className="booking-step animate-slide-up">
          <h2>Confirm Your Booking</h2>
          <div className="confirm-summary glass-card">
            <div className="confirm-row">
              <span><ParkingSquare size={16} /> Lot</span>
              <strong>{getSelectedLot()?.name || '—'}</strong>
            </div>
            <div className="confirm-row">
              <span><MapPin size={16} /> Address</span>
              <strong>{getSelectedLot()?.address || 'N/A'}</strong>
            </div>
            <div className="confirm-row">
              <span><Car size={16} /> Slot Type</span>
              <strong>{selectedType.replace('_', ' ')}</strong>
            </div>
            <div className="confirm-row">
              <span>₹ Rate</span>
              <strong>₹{getSelectedLot()?.ratePerHour}/hr</strong>
            </div>
            {selectedPrefs.length > 0 && (
              <div className="confirm-row">
                <span>Preferences</span>
                <strong>{selectedPrefs.map(p => p.replace('_', ' ')).join(', ')}</strong>
              </div>
            )}
            {selectedVehicle && (
              <div className="confirm-row">
                <span><Car size={16} /> Vehicle</span>
                <strong>{vehicles.find(v => v.id === selectedVehicle)?.plateNo}</strong>
              </div>
            )}
            <div className="confirm-row">
              <span><AlertCircle size={16} /> Reservation valid for</span>
              <strong>30 minutes</strong>
            </div>
          </div>
          <div className="step-nav">
            <button className="btn btn-secondary" onClick={() => setStep(3)}>
              <ArrowLeft size={16} /> Back
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <div className="spinner" /> : <><CheckCircle size={16} /> Confirm Booking</>}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 5 && result && (
        <div className="booking-step animate-slide-up">
          <div className="booking-success glass-card">
            <div className="success-icon">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p>Your parking spot has been reserved.</p>

            <div className="success-details">
              <div className="success-row">
                <span>Parking Lot</span>
                <strong>{result.lot?.name}</strong>
              </div>
              <div className="success-row">
                <span>Assigned Spot</span>
                <strong>{result.slot?.label || 'Pending'}</strong>
              </div>
              <div className="success-row">
                <span>Type</span>
                <strong>{result.slotType?.replace('_', ' ')}</strong>
              </div>
              <div className="success-row">
                <span>Expires At</span>
                <strong>{new Date(result.expiresAt).toLocaleTimeString()}</strong>
              </div>
            </div>

            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => navigate('/my-booking')}>
                <Navigation size={16} /> View My Booking
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
