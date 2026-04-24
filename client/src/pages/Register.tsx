import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { User, Mail, Lock, Phone, AlertCircle } from 'lucide-react';
import smartParkLogo from '../assets/image.png';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, phone || undefined);
      // Registration triggers OTP send — redirect to verification page
      navigate('/verify-otp');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
            <h1>Create Account</h1>
            <p>Join SmartPark and start parking smart</p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><User size={14} /> Full Name</label>
              <input type="text" placeholder="Enter your name" value={name}
                onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><Mail size={14} /> Email</label>
              <input type="email" placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><Lock size={14} /> Password</label>
              <input type="password" placeholder="Min 6 characters" value={password}
                onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <div className="form-group">
              <label><Phone size={14} /> Phone (optional)</label>
              <input type="tel" placeholder="Phone number" value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}
              disabled={loading}>
              {loading ? <div className="spinner" /> : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
