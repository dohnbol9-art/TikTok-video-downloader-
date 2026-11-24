import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { LANDING_PAGES, findLandingPageByPath } from './src/seo/landingPages';
import { renderLandingPageHtml } from './src/seo/htmlGenerator';

function expressApiPlugin(): Plugin {
  return {
    name: 'express-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          try {
            const { app } = await import('./server/app.ts');
            return (app as any)(req, res, next);
          } catch (err) {
            console.error('Failed to handle /api request via Express:', err);
            return next(err);
          }
        }
        next();
      });
    },
  };
}

function seoStaticPagesPlugin(): Plugin {
  const rootDir = path.resolve(import.meta.dirname || '.');

  return {
    name: 'seo-static-pages-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'GET' || !req.url) return next();
        const urlPath = req.url.split('?')[0];
        if (
          urlPath === '/' ||
          urlPath.startsWith('/api') ||
          urlPath.startsWith('/src') ||
          urlPath.startsWith('/@') ||
          urlPath.startsWith('/node_modules') ||
          /\.(js|css|png|jpg|jpeg|svg|ico|xml|txt|webmanifest|json|map|woff2?)$/i.test(urlPath)
        ) {
          return next();
        }

        const matchedPage = findLandingPageByPath(urlPath);
        if (!matchedPage) return next();

        try {
          const baseHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
          const pageHtml = renderLandingPageHtml(baseHtml, matchedPage);
          const transformed = await server.transformIndexHtml(req.url, pageHtml);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(transformed);
          return;
        } catch (err) {
          console.error('Failed to render SEO dev page:', err);
          return next(err);
        }
      });
    },
    closeBundle() {
      const distDir = path.join(rootDir, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const builtBaseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      for (const page of LANDING_PAGES) {
        const outFile = path.join(distDir, page.outputPath);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        const pageHtml = renderLandingPageHtml(builtBaseHtml, page);
        fs.writeFileSync(outFile, pageHtml, 'utf-8');
      }
      console.log(`Generated ${LANDING_PAGES.length} static SEO landing pages in dist/`);
    },
  };
}

export default defineConfig(({ command }) => {
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      seoStaticPagesPlugin(),
      ...(command === 'serve' ? [expressApiPlugin()] : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index.js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            if (name.endsWith('.css')) {
              return 'assets/index.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
