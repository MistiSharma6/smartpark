import { useNavigate } from 'react-router-dom';
import { MapPinOff, ArrowLeft, Home } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container animate-in">
      <div className="not-found-content glass-card">
        <div className="not-found-icon-wrapper">
          <MapPinOff size={64} className="not-found-icon" />
        </div>
        
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Spot Not Found</h2>
        
        <p className="not-found-text">
          Looks like you've driven off the map. The parking spot or page you're looking for doesn't exist, has been moved, or is currently under maintenance.
        </p>
        
        <div className="not-found-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Go Back
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            <Home size={16} /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}