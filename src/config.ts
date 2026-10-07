/**
 * QuickTok API Configuration
 *
 * Configures the backend API endpoint URL:
 * - When VITE_API_URL is set (e.g. Vercel/Netlify frontend connecting to a standalone backend):
 *   Uses `VITE_API_URL` (e.g. https://api.quicktok.online or https://quicktok-api.onrender.com).
 * - When VITE_API_URL is not set:
 *   Falls back to relative paths ('/api/...') for unified full-stack hosting or local development.
 */

const rawApiUrl = (import.meta.env.VITE_API_URL as string | undefined) || '';

export const API_URL = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : '';

export function getApiEndpoint(endpoint: string): string {
  const cleanPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_URL ? `${API_URL}${cleanPath}` : cleanPath;
}

export default API_URL;
