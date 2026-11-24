import fs from 'fs';
import path from 'path';
import express from 'express';
import { app } from './server/app.ts';
import { config } from './server/config/env.ts';
import { logger } from './server/utils/logger.ts';
import { LANDING_PAGES, findLandingPageByPath } from './src/seo/landingPages.ts';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port || 3000;
const distPath = path.resolve(process.cwd(), 'dist');
const publicPath = path.resolve(process.cwd(), 'public');

// Explicit SEO Crawler routes for robots.txt and sitemap.xml with guaranteed 200 OK and correct headers
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  const distFile = path.join(distPath, 'robots.txt');
  const publicFile = path.join(publicPath, 'robots.txt');
  const filePath = fs.existsSync(distFile) ? distFile : publicFile;
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(200).send(`User-agent: *\nAllow: /\n\nSitemap: https://www.quicktok.online/sitemap.xml\n`);
    }
  });
});

app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  const distFile = path.join(distPath, 'sitemap.xml');
  const publicFile = path.join(publicPath, 'sitemap.xml');
  const filePath = fs.existsSync(distFile) ? distFile : publicFile;
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Sitemap not found');
    }
  });
});

// Explicit HTTP 200 handlers for all dedicated English and International SEO landing pages
for (const page of LANDING_PAGES) {
  const routes = page.slug.endsWith('/')
    ? [page.slug, page.slug.slice(0, -1)]
    : [page.slug, `${page.slug}/`];

  app.get(routes, (req, res) => {
    const filePath = path.join(distPath, page.outputPath);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(filePath, (err) => {
      if (err) {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  });
}

// Serve static frontend files in production
app.use(express.static(distPath, { maxAge: '1d', index: false }));

// Fallback to index.html or matching SEO landing page for SPA client navigation
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const matchedPage = findLandingPageByPath(req.path);
  const targetHtml = matchedPage
    ? path.join(distPath, matchedPage.outputPath)
    : path.join(distPath, 'index.html');

  res.sendFile(targetHtml, (err) => {
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
