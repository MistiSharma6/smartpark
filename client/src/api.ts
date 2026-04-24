import { API_BASE_URL } from './config';

// ── Token storage (in-memory + localStorage fallback) ─────
let accessToken: string | null = localStorage.getItem('sp_access_token');

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) localStorage.setItem('sp_access_token', token);
  else localStorage.removeItem('sp_access_token');
}

export function getAccessToken() {
  return accessToken;
}

// ── Core request helper ──────────────────────────────────
interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  // Always attach Bearer token if available (reliable cross-domain auth)
  const authHeaders: Record<string, string> = {};
  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// ── Auth ──────────────────────────────────────────
export const authApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status === 403 && data?.data?.requiresVerification) {
      const err: any = new Error(data.message || 'Account not verified');
      err.requiresVerification = true;
      err.userId = data.data.userId;
      err.email = data.data.email;
      throw err;
    }
    if (!res.ok) throw new Error(data.message || 'Login failed');

    // Store tokens for cross-domain Bearer auth
    if (data.data?.accessToken) {
      setAccessToken(data.data.accessToken);
    }

    return data;
  },

  register: (name: string, email: string, password: string, phone?: string) =>
    request<any>('/users/register', { method: 'POST', body: { name, email, password, phone } }),

  logout: async () => {
    const result = await request<any>('/users/logout', { method: 'POST' });
    setAccessToken(null);
    return result;
  },

  getCurrentUser: () =>
    request<any>('/users/current-user'),

  refreshToken: async () => {
    const result = await request<any>('/users/refresh-token', { method: 'POST' });
    // Store new tokens
    if (result.data?.accessToken) {
      setAccessToken(result.data.accessToken);
    }
    return result;
  },
};

// ── OTP ───────────────────────────────────────────
export const otpApi = {
  verify: async (userId: string, otp: string, type: string) => {
    const result = await request<any>('/otp/verify', { method: 'POST', body: { userId, otp, type } });
    // OTP verify may return tokens (auto-login after verification)
    if (result.data?.accessToken) {
      setAccessToken(result.data.accessToken);
    }
    return result;
  },

  resend: (userId: string, email: string, type: string) =>
    request<any>('/otp/resend', { method: 'POST', body: { userId, email, type } }),
};

// ── Lots ──────────────────────────────────────────
export const lotApi = {
  getAll: () => request<any>('/lots'),
  getOne: (id: string) => request<any>(`/lots/${id}`),
  create: (data: { name: string; address?: string; latitude?: number; longitude?: number; floors?: number; ratePerHour?: number }) =>
    request<any>('/lots/create', { method: 'POST', body: data }),
  update: (id: string, data: any) =>
    request<any>(`/lots/${id}`, { method: 'PATCH', body: data }),
  setupGraph: (id: string, graphData: any) =>
    request<any>(`/lots/${id}/graph`, { method: 'POST', body: graphData }),
};

// ── Slots (admin) ─────────────────────────────────
export const slotAdminApi = {
  bulkCreate: (lotId: string, slots: any[]) =>
    request<any>('/slots/bulk-create', { method: 'POST', body: { lotId, slots } }),
};

// ── Parking ───────────────────────────────────────
export const parkingApi = {
  getSlotMap: (lotId: string) =>
    request<any>(`/parking/slot-map/${lotId}`),

  getActiveSession: (vehicleId: string) =>
    request<any>(`/parking/session/${vehicleId}`),

  getHistory: (page = 1, limit = 20) =>
    request<any>(`/parking/history?page=${page}&limit=${limit}`),

  rfidScan: (rfidTag: string, lotId: string, action: 'ENTRY' | 'EXIT', apiKey: string) =>
    request<any>('/parking/rfid-scan', {
      method: 'POST',
      body: { rfidTag, lotId, action },
      headers: { 'X-API-Key': apiKey },
    }),
};

// ── Vehicles ──────────────────────────────────────
export const vehicleApi = {
  register: (rfidTag: string, plateNo: string) =>
    request<any>('/vehicles/register', { method: 'POST', body: { rfidTag, plateNo } }),

  getMy: () => request<any>('/vehicles/my'),

  update: (id: string, data: any) =>
    request<any>(`/vehicles/${id}`, { method: 'PATCH', body: data }),

  remove: (id: string) =>
    request<any>(`/vehicles/${id}`, { method: 'DELETE' }),
};

// ── Slots ─────────────────────────────────────────
export const slotApi = {
  getStats: (lotId: string) =>
    request<any>(`/slots/stats/${lotId}`),

  getByLot: (lotId: string) =>
    request<any>(`/slots/lot/${lotId}`),

  update: (id: string, data: { features?: string[]; type?: string; status?: string }) =>
    request<any>(`/slots/${id}`, { method: 'PATCH', body: data }),
};

// ── Analytics ─────────────────────────────────────
export const analyticsApi = {
  getOccupancy: (lotId: string, days = 7) =>
    request<any>(`/analytics/occupancy/${lotId}?days=${days}`),

  getPeakHours: (lotId: string) =>
    request<any>(`/analytics/peak-hours/${lotId}`),

  getRevenue: (lotId: string, days = 30) =>
    request<any>(`/analytics/revenue/${lotId}?days=${days}`),

  getPredictions: (lotId: string) =>
    request<any>(`/analytics/predictions-all/${lotId}`),

  getLogs: (lotId: string, limit = 50) =>
    request<any>(`/analytics/logs/${lotId}?limit=${limit}`),
};

// ── Bookings ──────────────────────────────────────
export const bookingApi = {
  create: (data: { lotId: string; vehicleId?: string; slotType?: string; preferences?: string[]; scheduledFor?: string }) =>
    request<any>('/bookings', { method: 'POST', body: data }),

  getMy: () => request<any>('/bookings/my'),

  getActive: () => request<any>('/bookings/active'),

  cancel: (id: string) =>
    request<any>(`/bookings/${id}/cancel`, { method: 'PATCH' }),
};
