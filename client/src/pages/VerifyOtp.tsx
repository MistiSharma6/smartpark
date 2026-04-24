import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import smartParkLogo from '../assets/image.png';
import './Auth.css';

export default function VerifyOtp() {
  const { pendingVerification, verifyOtp, resendOtp, user } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  // Redirect if no pending verification
  useEffect(() => {
    if (!pendingVerification) {
      // Small delay to allow state to settle after registration
      const timer = setTimeout(() => {
        if (!pendingVerification) navigate('/login');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pendingVerification, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    // Focus last filled input
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await verifyOtp(otpString);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      await resendOtp();
      setResendCooldown(60);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  if (!pendingVerification) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card glass-card">
            <div className="spinner" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card glass-card animate-slide-up">
          <div className="auth-header">
            <img src={smartParkLogo} alt="SmartPark" className="auth-logo" />
            <h1>Verify Your Email</h1>
            <p>
              We've sent a 6-digit code to<br />
              <strong style={{ color: '#0fb9b1' }}>{pendingVerification.email}</strong>
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          {success && (
            <div className="auth-error" style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}>
              <CheckCircle size={16} /> Email verified! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="otp-input"
                  autoFocus={i === 0}
                  disabled={loading || success}
                />
              ))}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '1.5rem' }}
              disabled={loading || success || otp.join('').length !== 6}
            >
              {loading ? <div className="spinner" /> : 'Verify Email'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="btn-link"
              style={{
                background: 'none',
                border: 'none',
                color: resendCooldown > 0 ? '#999' : '#0fb9b1',
                cursor: resendCooldown > 0 ? 'default' : 'pointer',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <RefreshCw size={14} />
              {resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
