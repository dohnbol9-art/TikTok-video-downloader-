import express from 'express';
import { securityHeaders, corsMiddleware } from './middleware/security.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { videoRouter } from './routes/video.routes.ts';
import { adminRouter } from './routes/admin.routes.ts';
import { healthRouter } from './routes/health.routes.ts';

export const app = express();

// Trust proxy for custom domain reverse proxies (Cloudflare, Cloud Run, Nginx)
app.set('trust proxy', 1);

// Disable x-powered-by
app.disable('x-powered-by');

// Parse JSON with strict size limit
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Apply security and CORS middleware
app.use(securityHeaders);
app.use(corsMiddleware);

// Mount API routes
app.use('/api/video', videoRouter);
app.use('/api/admin', adminRouter);
app.use('/api/health', healthRouter);

// Central error handler
app.use(errorHandler);
