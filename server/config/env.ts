import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  publicAppUrl: process.env.PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000',
  videoProviderBaseUrl: process.env.VIDEO_PROVIDER_BASE_URL || '',
  videoProviderApiKey: process.env.VIDEO_PROVIDER_API_KEY || '',
  adminAccessToken: process.env.ADMIN_ACCESS_TOKEN || '',
  isProduction: process.env.NODE_ENV === 'production',
  maxRequestTimeoutMs: 15000,
  rateLimitWindowMs: 60 * 1000, // 1 minute
  rateLimitMaxRequests: 30, // 30 requests per minute
};
