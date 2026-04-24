import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lotApi, slotApi, analyticsApi } from '../api';
import { Shield, BarChart3, ArrowRight, Users, ParkingSquare, IndianRupee, Clock } from 'lucide-react';
import './AdminDashboard.css';
import PageLoader from '../components/PageLoader';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [, setLots] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [revenue, setRevenue] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      lotApi.getAll().then(r => setLots(r.data)),
      slotApi.getStats('demo-lot-1').then(r => setStats(r.data)).catch(() => { }),
      analyticsApi.getRevenue('demo-lot-1').then(r => setRevenue(r.data)).catch(() => { }),
      analyticsApi.getLogs('demo-lot-1', 10).then(r => setLogs(r.data)).catch(() => { }),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="admin-dashboard animate-in">
      <div className="page-header">
        <h1><Shield size={24} /> Admin Panel</h1>
        <p>System overview and management</p>
      </div>
      <PageLoader />
    </div>
  );

  return (
    <div className="admin-dashboard animate-in">
      <div className="page-header">
        <h1><Shield size={24} /> Admin Panel</h1>
        <p>System overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid-stats">
        <div className="glass-card stat-card">
          <ParkingSquare size={24} color="#0fb9b1" />
          <div className="stat-value">{stats?.total ?? 0}</div>
          <div className="stat-label">Total Slots</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: '#10b981', WebkitTextFillColor: '#10b981' }}>
            {stats?.free ?? 0}
          </div>
          <div className="stat-label">Free</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: '#ef4444', WebkitTextFillColor: '#ef4444' }}>
            {stats?.occupied ?? 0}
          </div>
          <div className="stat-label">Occupied</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">{stats?.occupancyPercentage ?? 0}%</div>
          <div className="stat-label">Occupancy</div>
        </div>
      </div>

      {/* Revenue Row */}
      {revenue && (
        <div className="grid-stats" style={{ marginTop: 16 }}>
          <div className="glass-card stat-card">
            <IndianRupee size={20} color="#f59e0b" />
            <div className="stat-value" style={{ color: '#f59e0b', WebkitTextFillColor: '#f59e0b' }}>
              ₹{revenue.totalRevenue}
            </div>
            <div className="stat-label">Total Revenue (30d)</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-value">₹{revenue.avgRevenuePerSession}</div>
            <div className="stat-label">Avg / Session</div>
          </div>
          <div className="glass-card stat-card">
            <Users size={20} color="#0fb9b1" />
            <div className="stat-value">{revenue.totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
          <div className="glass-card stat-card">
            <Clock size={20} color="#06b6d4" />
            <div className="stat-value">{revenue.avgDurationMinutes}m</div>
            <div className="stat-label">Avg Duration</div>
          </div>
        </div>
      )}

      {/* Analytics Link */}
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-primary" onClick={() => navigate('/analytics/demo-lot-1')}>
          <BarChart3 size={16} /> View Full Analytics <ArrowRight size={16} />
        </button>
      </div>

      {/* Recent Logs */}
      <h2 style={{ marginTop: 32, marginBottom: 16 }}>Recent Activity</h2>
      <div className="glass-card" style={{ overflow: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Vehicle</th>
              <th>Slot</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log: any) => (
              <tr key={log.id}>
                <td>
                  <span className={`badge ${log.type === 'ENTRY' ? 'badge-free' : 'badge-occupied'}`}>
                    {log.type}
                  </span>
                </td>
                <td>{log.vehicle}</td>
                <td>{log.slot}</td>
                <td>{new Date(log.entryTime).toLocaleString()}</td>
                <td>{log.duration ? `${log.duration}min` : '-'}</td>
                <td>{log.cost ? `₹${log.cost}` : '-'}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No recent activity</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Occupancy by Block/Type */}
      {stats && (
        <div className="grid-2" style={{ marginTop: 24 }}>
          <div className="glass-card">
            <h3 style={{ marginBottom: 16 }}>By Block</h3>
            {Object.entries(stats.byBlock || {}).map(([block, data]: [string, any]) => (
              <div key={block} className="breakdown-row">
                <span>Block {block}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(data.occupied / data.total) * 100}%` }} />
                </div>
                <span className="breakdown-count">{data.occupied}/{data.total}</span>
              </div>
            ))}
          </div>
          <div className="glass-card">
            <h3 style={{ marginBottom: 16 }}>By Floor</h3>
            {Object.entries(stats.byFloor || {}).map(([floor, data]: [string, any]) => (
              <div key={floor} className="breakdown-row">
                <span>Floor {floor}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(data.occupied / data.total) * 100}%` }} />
                </div>
                <span className="breakdown-count">{data.occupied}/{data.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
