import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analyticsApi } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Clock } from 'lucide-react';
import './Analytics.css';
import PageLoader from '../components/PageLoader';

export default function Analytics() {
  const { lotId } = useParams<{ lotId: string }>();
  const [peakHours, setPeakHours] = useState<any>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [, setOccupancy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lotId) return;
    Promise.all([
      analyticsApi.getPeakHours(lotId).then(r => setPeakHours(r.data)),
      analyticsApi.getPredictions(lotId).then(r => setPredictions(r.data)),
      analyticsApi.getOccupancy(lotId, 7).then(r => setOccupancy(r.data)),
    ]).catch(() => { }).finally(() => setLoading(false));
  }, [lotId]);

  if (loading) return (
    <div className="analytics-page animate-in">
      <div className="page-header">
        <h1><BarChart3 size={24} /> Analytics & Predictions</h1>
        <p>Parking usage patterns and predictions</p>
      </div>
      <PageLoader />
    </div>
  );

  const formatHour = (h: number) => {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };

  const predictionData = predictions.map((p: any) => ({
    hour: formatHour(p.hour),
    occupancy: p.predictedPercentage,
    confidence: Math.round(p.confidence * 100),
  }));

  return (
    <div className="analytics-page animate-in">
      <div className="page-header">
        <h1><BarChart3 size={24} /> Analytics & Predictions</h1>
        <p>Parking usage patterns and predictions</p>
      </div>

      {/* Peak Hours Highlight */}
      {peakHours && (
        <div className="glass-card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}><Clock size={18} /> Peak Hour Insights</h3>
          <div className="grid-2">
            <div>
              <span className="detail-label">Busiest Hour</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>
                {formatHour(peakHours.busiestHour)}
              </div>
            </div>
            <div>
              <span className="detail-label">Quietest Hour</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>
                {formatHour(peakHours.quietestHour)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prediction Chart */}
      <div className="glass-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}><TrendingUp size={18} /> 24-Hour Occupancy Prediction</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0fb9b1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0fb9b1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
            <Area type="monotone" dataKey="occupancy" stroke="#0fb9b1" fillOpacity={1} fill="url(#colorOcc)" strokeWidth={2} name="Predicted %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Peak Hours Chart */}
      {peakHours && (
        <div className="glass-card">
          <h3 style={{ marginBottom: 16 }}>Top 5 Peak Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={peakHours.peakHours.map((p: any) => ({ hour: formatHour(p.hour), occupancy: p.avgPercentage }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
              <Bar dataKey="occupancy" fill="#0fb9b1" radius={[6, 6, 0, 0]} name="Avg Occupancy %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
