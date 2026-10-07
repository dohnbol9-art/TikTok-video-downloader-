import { Request, Response, NextFunction } from 'express';
import { metricsService } from '../services/metrics.service';
import { config } from '../config/env';

interface RequestBucket {
  count: number;
  resetTime: number;
}

const clientBuckets = new Map<string, RequestBucket>();

// Clean up stale buckets every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of clientBuckets.entries()) {
    if (bucket.resetTime < now) {
      clientBuckets.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function createRateLimiter(options?: {
  windowMs?: number;
  max?: number;
  message?: string;
}) {
  const windowMs = options?.windowMs || config.rateLimitWindowMs;
  const max = options?.max || config.rateLimitMaxRequests;
  const message = options?.message || 'Too many requests. Please wait a moment and try again.';

  return (req: Request, res: Response, next: NextFunction): void => {
    // Determine client IP
    const forwarded = req.headers['x-forwarded-for'];
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '127.0.0.1';

    const now = Date.now();
    let bucket = clientBuckets.get(ip);

    if (!bucket || bucket.resetTime < now) {
      bucket = {
        count: 1,
        resetTime: now + windowMs,
      };
      clientBuckets.set(ip, bucket);
    } else {
      bucket.count++;
    }

    const remaining = Math.max(0, max - bucket.count);
    res.setHeader('X-RateLimit-Limit', max.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(bucket.resetTime / 1000).toString());

    if (bucket.count > max) {
      metricsService.recordRateLimit();
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message,
        },
      });
      return;
    }

    next();
  };
}

export const standardRateLimiter = createRateLimiter();
export const downloadRateLimiter = createRateLimiter({
  max: 20,
  windowMs: 60 * 1000,
});
