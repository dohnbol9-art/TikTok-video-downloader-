import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

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

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
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
