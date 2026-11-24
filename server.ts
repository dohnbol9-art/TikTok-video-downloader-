import path from 'path';
import express from 'express';
import { app } from './server/app.ts';
import { config } from './server/config/env.ts';
import { logger } from './server/utils/logger.ts';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port || 3000;
const distPath = path.resolve(process.cwd(), 'dist');

// Explicit SEO Crawler routes for robots.txt and sitemap.xml with guaranteed 200 OK and correct headers
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  const filePath = path.join(distPath, 'robots.txt');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(200).send(`User-agent: *\nAllow: /\n\nSitemap: https://www.quicktok.online/sitemap.xml\n`);
    }
  });
});

app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  const filePath = path.join(distPath, 'sitemap.xml');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.quicktok.online/</loc>
    <lastmod>2026-11-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
    }
  });
});

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
