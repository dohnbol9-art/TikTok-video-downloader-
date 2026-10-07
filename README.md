# QuickTok – Fast & Simple TikTok Video Downloader

QuickTok is a modern, high-performance full-stack web application designed for fast, simple, and privacy-respecting TikTok video retrieval.

## Features

- **Blazing Fast Direct Streaming**: Uses Node.js readable streams to pipe media directly to client browsers without saving large files to disk or buffer overflow.
- **Client & Server Input Validation**: Immediate client-side format checks and server-side SSRF/IP filtering.
- **Replaceable Provider Architecture**: Implements `TikTokProvider` interface with a `ProviderFactory` allowing seamless provider swaps.
- **Local Download History**: Non-sensitive history stored strictly in browser `localStorage`.
- **Protected Admin Dashboard**: Live server telemetry (requests, failures, latency, rate limits, provider health).
- **Responsive Mobile First Design**: Built for touch interfaces (iOS Safari, Android Chrome) with 44px+ touch targets and native clipboard paste integration.
- **Full Dark & Light Themes**: Automatic system preference detection and persistent user theme toggling.
- **Security Hardened**: Helmet security headers, CORS protection, URL allowlisting, request body limits, and sliding window rate limiting.

---

## Architecture

```text
Browser (React 19 + Tailwind CSS)
  ↓
REST API (Express + TypeScript on port 3000)
  ↓
Middleware (Security headers, Rate Limiting, SSRF Allowlisting, Body Validation)
  ↓
Provider Pipeline (ConfiguredApiProvider / OEmbedProvider)
  ↓
Ephemeral Direct HTTP Stream
  ↓
User Local Device
```

---

## Environment Configuration

Copy `.env.example` to `.env`:

```env
# Optional during local development. Self-referential base URL:
PUBLIC_APP_URL="http://localhost:3000"

# Required only when a real processing provider is configured (e.g. Cobalt, TikWM, or custom media worker):
VIDEO_PROVIDER_BASE_URL=""

# Server-side secret key for the configured video provider (NEVER exposed to frontend):
VIDEO_PROVIDER_API_KEY=""

# Server-side secret token used to access the protected admin metrics dashboard:
ADMIN_ACCESS_TOKEN="your-secure-admin-token"

# Server Port
PORT=3000
```

*Note: The website is fully functional with zero environment variables configured. When `VIDEO_PROVIDER_BASE_URL` is empty, the system accurately reports `PROVIDER_NOT_CONFIGURED` without fabricating fake data or fake download links.*

---

## Development & Production Commands

- **Development**: `npm run dev` (starts Vite dev server with mounted Express API routes on port 3000)
- **Production Build**: `npm run build` (builds optimized client bundles into `dist/`)
- **Production Server**: `npm run start` (runs standalone Node/TS server serving API and static assets)
- **Type Checking**: `npm run lint` (`tsc --noEmit`)

---

## Responsible Use & Compliance

QuickTok strictly adheres to responsible data practices:
- Only public, permitted content is processed.
- No bypass of authentication, paywalls, DRM, or private accounts.
- Zero permanent retention of user video files on our servers.
