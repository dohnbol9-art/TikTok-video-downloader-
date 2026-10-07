import { URL } from 'url';

// Allowed TikTok domains and CDNs
const ALLOWED_TIKTOK_DOMAINS = [
  'tiktok.com',
  'www.tiktok.com',
  'm.tiktok.com',
  'vm.tiktok.com',
  'vt.tiktok.com',
  'v16-webapp-prime.tiktok.com',
  'v16-webapp.tiktok.com',
  'v-h-prime.tiktokcdn.com',
  'v-h.tiktokcdn.com',
  'p16-sign.tiktokcdn-us.com',
  'p16-sign.tiktokcdn.com',
  'p19-sign.tiktokcdn-us.com',
  'p77-sign.tiktokcdn.com',
  's16-sign.tiktokcdn-us.com',
  'tiktokcdn.com',
  'tiktokcdn-us.com',
  'byteoversea.com',
  'ibytedtos.com',
  'tikwm.com',
  'www.tikwm.com',
  'tikwm.net',
  'cobalt.tools',
  'api.cobalt.tools',
];

// Private / restricted IP prefixes for SSRF protection
const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./, // Link-local
  /^0\./,
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
];

export function isSafeUrl(rawUrl: string, allowlistDomains?: string[]): boolean {
  try {
    const parsed = new URL(rawUrl);

    // Only allow HTTP/HTTPS
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Check for blocked hosts / IPs
    for (const pattern of BLOCKED_HOST_PATTERNS) {
      if (pattern.test(hostname)) {
        return false;
      }
    }

    // If explicit allowlist is given, verify domain or subdomain matches
    const domainsToCheck = allowlistDomains || ALLOWED_TIKTOK_DOMAINS;
    const isDomainAllowed = domainsToCheck.some(allowed => 
      hostname === allowed || hostname.endsWith('.' + allowed)
    );

    return isDomainAllowed;
  } catch {
    return false;
  }
}
