export interface UrlValidationResult {
  isValid: boolean;
  normalizedUrl?: string;
  videoId?: string;
  error?: string;
}

const SUPPORTED_HOSTNAMES = [
  'tiktok.com',
  'www.tiktok.com',
  'm.tiktok.com',
  'vm.tiktok.com',
  'vt.tiktok.com',
];

export function validateTikTokUrl(inputUrl: string): UrlValidationResult {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return {
      isValid: false,
      error: 'Please enter a valid supported TikTok video URL.'
    };
  }

  const trimmed = inputUrl.trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Please enter a valid supported TikTok video URL.'
    };
  }

  let parsed: URL;
  try {
    // Add protocol if missing
    const withProtocol = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;
    parsed = new URL(withProtocol);
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid supported TikTok video URL.'
    };
  }

  // Must be https or http
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return {
      isValid: false,
      error: 'Please enter a valid supported TikTok video URL.'
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isSupportedHost = SUPPORTED_HOSTNAMES.some(
    host => hostname === host || hostname.endsWith(`.${host}`)
  );

  if (!isSupportedHost) {
    return {
      isValid: false,
      error: 'This URL format isn\'t currently supported. Only TikTok URLs are accepted.'
    };
  }

  const pathname = parsed.pathname;

  // Pattern 1: Standard desktop/mobile /@user/video/1234567890123456789
  const videoMatch = pathname.match(/\/video\/(\d+)/i);
  if (videoMatch && videoMatch[1]) {
    return {
      isValid: true,
      normalizedUrl: `https://${parsed.hostname}${pathname}`,
      videoId: videoMatch[1]
    };
  }

  // Pattern 2: Short links: vm.tiktok.com/XYZ123, vt.tiktok.com/XYZ123, /t/XYZ123
  const isShortLink = (
    hostname.includes('vm.tiktok.com') ||
    hostname.includes('vt.tiktok.com') ||
    pathname.startsWith('/t/') ||
    pathname.startsWith('/v/')
  );

  if (isShortLink && pathname.length > 2) {
    return {
      isValid: true,
      normalizedUrl: `https://${parsed.hostname}${pathname}`,
      videoId: undefined // Will be resolved during processing if needed
    };
  }

  // Pattern 3: Mobile web format /v/1234567890.html
  const mobileMatch = pathname.match(/\/v\/(\d+)/i);
  if (mobileMatch && mobileMatch[1]) {
    return {
      isValid: true,
      normalizedUrl: `https://${parsed.hostname}${pathname}`,
      videoId: mobileMatch[1]
    };
  }

  // If path looks like /@username without a video ID
  if (pathname.startsWith('/@') && !pathname.includes('/video/')) {
    return {
      isValid: false,
      error: 'Please enter a direct TikTok video link, not a user profile link.'
    };
  }

  // Generic fallback if path is non-empty
  if (pathname.length > 3) {
    return {
      isValid: true,
      normalizedUrl: `https://${parsed.hostname}${pathname}`
    };
  }

  return {
    isValid: false,
    error: 'Please enter a valid supported TikTok video URL.'
  };
}
