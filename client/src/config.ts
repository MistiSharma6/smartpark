const DEFAULT_API_ORIGIN = 'http://localhost:8000';

const rawApiOrigin = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_ORIGIN;
const normalizedOrigin = rawApiOrigin.replace(/\/+$/, '');

export const API_BASE_URL = normalizedOrigin.endsWith('/api/v1')
  ? normalizedOrigin
  : `${normalizedOrigin}/api/v1`;
