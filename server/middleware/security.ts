import { Request, Response, NextFunction } from 'express';

export function securityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Permissions policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Disable cache on API responses
  if (req.path.startsWith('/api')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  }

  next();
}

export function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Admin-Token');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
}
