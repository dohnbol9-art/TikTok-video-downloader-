import { Router } from 'express';
import { videoController } from '../controllers/video.controller';
import { standardRateLimiter, downloadRateLimiter } from '../middleware/rateLimiter';
import { validateProcessRequest } from '../middleware/validation';

export const videoRouter = Router();

videoRouter.post(
  '/process',
  standardRateLimiter,
  validateProcessRequest,
  (req, res) => videoController.process(req, res)
);

videoRouter.get(
  '/download',
  downloadRateLimiter,
  (req, res) => videoController.download(req, res)
);

videoRouter.get(
  '/proxy-image',
  standardRateLimiter,
  (req, res) => videoController.proxyImage(req, res)
);

videoRouter.get(
  '/provider-status',
  (req, res) => videoController.getProviderStatus(req, res)
);
