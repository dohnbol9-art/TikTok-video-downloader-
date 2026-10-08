import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  frontendUrl: process.env.FRONTEND_URL || 'https://quicktok.online',
  publicAppUrl: process.env.PUBLIC_APP_URL || process.env.APP_URL || 'https://quicktok.online',
  videoProviderBaseUrl: process.env.VIDEO_PROVIDER_BASE_URL || '',
  videoProviderApiKey: process.env.VIDEO_PROVIDER_API_KEY || '',
  isProduction: process.env.NODE_ENV === 'production',
  maxRequestTimeoutMs: 15000,
  rateLimitWindowMs: 60 * 1000, // 1 minute
  rateLimitMaxRequests: 30, // 30 requests per minute
};
