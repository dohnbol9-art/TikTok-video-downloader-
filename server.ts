import path from 'path';
import express from 'express';
import { app } from './server/app';
import { config } from './server/config/env';
import { logger } from './server/utils/logger';

const PORT = config.port || 3000;
const distPath = path.resolve(process.cwd(), 'dist');

// Serve static frontend files in production
app.use(express.static(distPath, { maxAge: '1d', index: false }));

// Fallback to index.html for SPA client navigation
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('QuickTok server running. In development, use Vite dev server.');
    }
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`QuickTok production server listening on port ${PORT}`);
  logger.info(`Public URL: ${config.publicAppUrl}`);
  logger.info(`Video Provider configured: ${config.videoProviderBaseUrl ? 'YES' : 'NO'}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Closing QuickTok server...');
  server.close(() => {
    logger.info('Server closed cleanly.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Closing QuickTok server...');
  server.close(() => {
    process.exit(0);
  });
});
