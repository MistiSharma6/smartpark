import { useState, useEffect } from 'react';
import { parkingApi } from '../api';
import { Clock, IndianRupee } from 'lucide-react';
import './History.css';
import PageLoader from '../components/PageLoader';

export default function History() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const load = (page: number) => {
    setLoading(true);
    parkingApi.getHistory(page).then(r => {
      setSessions(r.data.sessions);
      setPagination(r.data.pagination);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => load(1), []);

  return (
    <div className="history-page animate-in">
      <div className="page-header">
        <h1>Parking History</h1>
        <p>{pagination.total} total sessions</p>
      </div>

      {loading ? (
        <PageLoader />
      ) : sessions.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: 60 }}>
          <Clock size={48} color="var(--text-muted)" />
          <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>No parking history yet</p>
        </div>
      ) : (
        <>
          <div className="glass-card" style={{ overflow: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Lot</th>
                  <th>Slot</th>
                  <th>Entry</th>
                  <th>Exit</th>
                  <th>Duration</th>
                  <th>Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s: any) => (
                  <tr key={s.id}>
                    <td>{s.vehicle}</td>
                    <td>{s.lotName}</td>
                    <td>{s.slot}</td>
                    <td>{new Date(s.entryTime).toLocaleString()}</td>
                    <td>{s.exitTime ? new Date(s.exitTime).toLocaleString() : <span className="badge badge-reserved">Active</span>}</td>
                    <td>{s.duration ? `${s.duration} min` : '-'}</td>
                    <td>{s.cost ? <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><IndianRupee size={12} />{s.cost}</span> : '-'}</td>
                    <td>
                      <span className={`badge ${s.paymentStatus === 'PAID' ? 'badge-free' : s.paymentStatus === 'PENDING' ? 'badge-reserved' : 'badge-occupied'}`}>
                        {s.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button className="btn btn-secondary btn-sm" disabled={pagination.page <= 1}
                onClick={() => load(pagination.page - 1)}>Previous</button>
              <span>Page {pagination.page} of {pagination.pages}</span>
              <button className="btn btn-secondary btn-sm" disabled={pagination.page >= pagination.pages}
                onClick={() => load(pagination.page + 1)}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
