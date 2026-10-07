export interface ClientValidation {
  isValid: boolean;
  cleanUrl: string;
  error?: string;
}

const SUPPORTED_HOSTS = ['tiktok.com', 'www.tiktok.com', 'm.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'];

export function validateClientTikTokUrl(rawUrl: string): ClientValidation {
  if (!rawUrl || !rawUrl.trim()) {
    return {
      isValid: false,
      cleanUrl: '',
      error: 'Please enter a valid supported TikTok video URL.'
    };
  }

  let formatted = rawUrl.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = `https://${formatted}`;
  }

  try {
    const url = new URL(formatted);
    const host = url.hostname.toLowerCase();

    const matchesHost = SUPPORTED_HOSTS.some(h => host === h || host.endsWith(`.${h}`));
    if (!matchesHost) {
      return {
        isValid: false,
        cleanUrl: formatted,
        error: 'This URL format isn\'t currently supported. Please provide a TikTok link.'
      };
    }

    if (url.pathname.startsWith('/@') && !url.pathname.includes('/video/')) {
      return {
        isValid: false,
        cleanUrl: formatted,
        error: 'This looks like a profile link. Please enter a link to a specific video.'
      };
    }

    return {
      isValid: true,
      cleanUrl: formatted
    };
  } catch {
    return {
      isValid: false,
      cleanUrl: formatted,
      error: 'Please enter a valid supported TikTok video URL.'
    };
  }
}
