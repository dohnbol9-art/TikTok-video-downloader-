import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.ts';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  logger.error('Unhandled server error:', err);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: 'Something went wrong. Please try again.',
    },
  });
}
