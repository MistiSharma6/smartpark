import { useNavigate } from 'react-router-dom';
import { ParkingSquare, Zap, Route, Shield, BarChart3, Cpu } from 'lucide-react';
import smartParkLogo from '../assets/image.png';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-content">
          <img src={smartParkLogo} alt="SmartPark" className="hero-logo" />
          <div className="hero-badge">
            <Cpu size={14} /> IoT + Web + DSA
          </div>
          <h1 className="hero-title">
            Smart <span className="gradient-text">RFID</span> Parking System
          </h1>
          <p className="hero-subtitle">
            Intelligent parking management with RFID-based entry/exit, Dijkstra's shortest path navigation,
            real-time slot monitoring, and predictive analytics.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
              Get Started
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features container">
        <h2 className="section-title">Powered by Intelligence</h2>
        <div className="features-grid">
          <div className="feature-card glass-card animate-in">
            <div className="feature-icon" style={{ background: 'rgba(15, 185, 177, 0.12)' }}>
              <ParkingSquare size={24} color="#0fb9b1" />
            </div>
            <h3>Smart Slot Allocation</h3>
            <p>Priority queue-based allocation finds the nearest free slot instantly using a custom min-heap.</p>
          </div>
          <div className="feature-card glass-card animate-in" style={{ animationDelay: '0.1s' }}>
            <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
              <Route size={24} color="#10b981" />
            </div>
            <h3>Shortest Path (Dijkstra)</h3>
            <p>Navigate to your assigned slot via the optimal route using Dijkstra's algorithm on a weighted graph.</p>
          </div>
          <div className="feature-card glass-card animate-in" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
              <Zap size={24} color="#f59e0b" />
            </div>
            <h3>Real-Time Updates</h3>
            <p>WebSocket-powered live dashboard shows slot status changes as they happen.</p>
          </div>
          <div className="feature-card glass-card animate-in" style={{ animationDelay: '0.3s' }}>
            <div className="feature-icon" style={{ background: 'rgba(15, 185, 177, 0.12)' }}>
              <BarChart3 size={24} color="#0fb9b1" />
            </div>
            <h3>Predictive Analytics</h3>
            <p>Simple Moving Average predicts peak hours and occupancy trends from historical data.</p>
          </div>
          <div className="feature-card glass-card animate-in" style={{ animationDelay: '0.4s' }}>
            <div className="feature-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
              <Cpu size={24} color="#06b6d4" />
            </div>
            <h3>ESP32 + RFID</h3>
            <p>Hardware integration with RC522 RFID scanner and ESP32 microcontroller for seamless entry/exit.</p>
          </div>
          <div className="feature-card glass-card animate-in" style={{ animationDelay: '0.5s' }}>
            <div className="feature-icon" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
              <Shield size={24} color="#ef4444" />
            </div>
            <h3>Role-Based Access</h3>
            <p>Three roles — Admin, Security Guard, and User — each with tailored dashboards and permissions.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-section container">
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-tags">
          {['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'React', 'TypeScript', 'Socket.IO',
            'Dijkstra\'s Algorithm', 'Priority Queue', 'ESP32', 'RC522 RFID', 'Vite', 'Recharts', 'Zod'].map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Cpu size={16} color="#0fb9b1" /> 
          Smart Parking System — ECE + Web Dev Project
        </p>
      </footer>
    </div>
  );
}