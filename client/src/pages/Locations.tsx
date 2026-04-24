import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { lotApi } from '../api';
import { MapPin, Search, ParkingSquare, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './Locations.css';
import PageLoader from '../components/PageLoader';

export default function Locations() {
  const navigate = useNavigate();
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLot, setSelectedLot] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    lotApi.getAll().then(r => {
      setLots(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Initialize map
  useEffect(() => {
    if (loading || mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (!mapContainerRef.current) return;

      // Default center — Delhi, India
      const defaultCenter: [number, number] = [28.6139, 77.209];
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
      }).setView(defaultCenter, 12);

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Add markers for lots with coordinates
      addMarkers(L, map, lots);

      // If lots have coordinates, fit bounds
      const lotsWithCoords = lots.filter(l => l.latitude && l.longitude);
      if (lotsWithCoords.length > 0) {
        const bounds = L.latLngBounds(
          lotsWithCoords.map(l => [l.latitude, l.longitude] as [number, number])
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [loading, lots]);

  const addMarkers = async (L: any, map: any, lotsList: any[]) => {
    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const parkingIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-pin"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 12h3a2 2 0 0 0 0-4H9v8"/></svg></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    for (const lot of lotsList) {
      if (!lot.latitude || !lot.longitude) continue;

      const occupancyPct = lot.totalSlots > 0
        ? Math.round((lot.occupiedSlots / lot.totalSlots) * 100) : 0;
      const statusColor = occupancyPct > 80 ? '#ef4444' : occupancyPct > 50 ? '#f59e0b' : '#10b981';

      const marker = L.marker([lot.latitude, lot.longitude], { icon: parkingIcon })
        .addTo(map)
        .bindPopup(`
          <div class="map-popup">
            <h3>${lot.name}</h3>
            <p class="popup-address">${lot.address || 'No address'}</p>
            <div class="popup-stats">
              <span style="color: ${statusColor}; font-weight: 700">${lot.freeSlots} Free</span>
              <span>/ ${lot.totalSlots} Total</span>
              <span>₹${lot.ratePerHour}/hr</span>
            </div>
            <div class="popup-bar">
              <div class="popup-bar-fill" style="width: ${occupancyPct}%; background: ${statusColor}"></div>
            </div>
          </div>
        `, { className: 'dark-popup' });

      marker.on('click', () => setSelectedLot(lot));
      markersRef.current.push(marker);
    }
  };

  const filteredLots = lots.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    (l.address || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleLotClick = async (lot: any) => {
    setSelectedLot(lot);
    if (lot.latitude && lot.longitude && mapRef.current) {
      mapRef.current.flyTo([lot.latitude, lot.longitude], 16, { duration: 1.5 });
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="locations-page animate-in">
      <div className="locations-layout">
        {/* Sidebar list */}
        <div className="locations-sidebar">
          <div className="locations-header">
            <h2><MapPin size={20} /> Locations</h2>
            <div className="locations-search">
              <Search size={16} />
              <input
                placeholder="Search parking lots..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="locations-list">
            {filteredLots.length === 0 && (
              <div className="locations-empty">
                <ParkingSquare size={32} color="var(--text-muted)" />
                <p>No parking lots found</p>
              </div>
            )}
            {filteredLots.map(lot => {
              const occ = lot.totalSlots > 0 ? Math.round((lot.occupiedSlots / lot.totalSlots) * 100) : 0;
              const statusColor = occ > 80 ? '#ef4444' : occ > 50 ? '#f59e0b' : '#10b981';
              return (
                <div
                  key={lot.id}
                  className={`location-card glass-card ${selectedLot?.id === lot.id ? 'selected' : ''}`}
                  onClick={() => handleLotClick(lot)}
                >
                  <div className="location-card-top">
                    <ParkingSquare size={18} color="#0fb9b1" />
                    <div className="location-info">
                      <h3>{lot.name}</h3>
                      <p>{lot.address || 'No address set'}</p>
                    </div>
                  </div>
                  <div className="location-card-stats">
                    <span className="badge badge-free">{lot.freeSlots} Free</span>
                    <span className="badge badge-occupied">{lot.occupiedSlots} Occupied</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ₹{lot.ratePerHour}/hr
                    </span>
                  </div>
                  <div className="location-occ-bar">
                    <div className="location-occ-fill" style={{ width: `${occ}%`, background: statusColor }} />
                  </div>
                  <div className="location-card-actions">
                    <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); navigate(`/map/${lot.id}`); }}>
                      <Navigation size={12} /> View Map
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={(e) => { e.stopPropagation(); navigate(`/book?lot=${lot.id}`); }}>
                      Book Now
                    </button>
                  </div>
                  {!lot.latitude && (
                    <span className="no-coords-badge">📍 No coordinates</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div className="locations-map-container">
          <div ref={mapContainerRef} className="locations-map" />
          {lots.filter(l => l.latitude).length === 0 && (
            <div className="map-no-data">
              <MapPin size={48} color="var(--text-muted)" />
              <p>No parking lots have GPS coordinates set yet.</p>
              <p style={{ fontSize: '0.8rem' }}>Admin can add coordinates when creating lots.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
