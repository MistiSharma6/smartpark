import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi, otpApi, setAccessToken } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface PendingVerification {
  userId: string;
  email: string;
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  pendingVerification: PendingVerification | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  setPendingVerification: (data: PendingVerification | null) => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingVerification, setPendingVerification] = useState<PendingVerification | null>(null);

  useEffect(() => {
    authApi.getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => { setUser(null); setAccessToken(null); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    setUser(res.data.user);
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const res = await authApi.register(name, email, password, phone);
    // Registration now returns verification data
    if (res.data?.requiresVerification) {
      setPendingVerification({
        userId: res.data.userId,
        email: res.data.email,
      });
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setAccessToken(null);
  };

  const verifyOtp = async (otp: string) => {
    if (!pendingVerification) throw new Error('No pending verification');
    const res = await otpApi.verify(pendingVerification.userId, otp, 'EMAIL_VERIFICATION');
    // OTP verified — user is now logged in
    if (res.data?.user) {
      setUser(res.data.user);
    } else {
      // Fetch current user after verification
      const userRes = await authApi.getCurrentUser();
      setUser(userRes.data);
    }
    setPendingVerification(null);
  };

  const resendOtp = async () => {
    if (!pendingVerification) throw new Error('No pending verification');
    await otpApi.resend(pendingVerification.userId, pendingVerification.email, 'EMAIL_VERIFICATION');
  };

  return (
    <AuthContext.Provider value={{
      user, loading, pendingVerification,
      login, register, logout, verifyOtp, resendOtp, setPendingVerification,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
