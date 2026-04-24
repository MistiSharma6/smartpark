import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import smartParkLogo from '../assets/image.png';
import './Auth.css';

export default function Login() {
  const { login, setPendingVerification } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.requiresVerification) {
        // User needs to verify their email — redirect to OTP page
        setPendingVerification({
          userId: err.userId,
          email: err.email,
        });
        navigate('/verify-otp');
        return;
      }
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass-card animate-slide-up">
          <div className="auth-header">
            <img src={smartParkLogo} alt="SmartPark" className="auth-logo" />
            <h1>Welcome Back</h1>
            <p>Sign in to your SmartPark account</p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><Mail size={14} /> Email</label>
              <input type="email" placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><Lock size={14} /> Password</label>
              <input type="password" placeholder="Enter your password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}
              disabled={loading}>
              {loading ? <div className="spinner" /> : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials</p>
            <div className="demo-row" onClick={() => { setEmail('admin@smartpark.com'); setPassword('admin123'); }}>
              <span>Admin</span> admin@smartpark.com / admin123
            </div>
            <div className="demo-row" onClick={() => { setEmail('user@smartpark.com'); setPassword('user123'); }}>
              <span>User</span> user@smartpark.com / user123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
