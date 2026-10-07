import { Request, Response, NextFunction } from 'express';

export function validateProcessRequest(req: Request, res: Response, next: NextFunction): void {
  const { url } = req.body || {};

  if (!url || typeof url !== 'string') {
    res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_URL',
        message: 'Please enter a valid supported TikTok video URL.',
      },
    });
    return;
  }

  // Prevent giant payload strings
  if (url.length > 2048) {
    res.status(400).json({
      success: false,
      error: {
        code: 'PAYLOAD_TOO_LARGE',
        message: 'URL length exceeds maximum permitted limit.',
      },
    });
    return;
  }

  next();
}
