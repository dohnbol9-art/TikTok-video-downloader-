import { logger } from '../utils/logger';
import { TikTokProvider, VideoMetadata, VideoFormatOption, DownloadSession } from './tiktok.provider.interface';

export class OEmbedTikTokProvider implements TikTokProvider {
  public name = 'OEmbedTikTokProvider';

  public isConfigured(): boolean {
    return true; // Uses official public TikTok oEmbed
  }

  public async validateUrl(url: string): Promise<boolean> {
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes('tiktok.com');
    } catch {
      return false;
    }
  }

  public async getMetadata(url: string): Promise<VideoMetadata> {
    const oembedEndpoint = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(oembedEndpoint, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'QuickTok/1.0 (Web Video Metadata Inspector)',
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('VIDEO_NOT_FOUND');
        }
        if (res.status === 400) {
          throw new Error('INVALID_URL');
        }
        throw new Error('PROVIDER_ERROR');
      }

      const data = await res.json();
      const title = data.title || 'TikTok Video';
      const authorName = data.author_name || 'TikTok Creator';
      const authorUrl = data.author_url || '';
      const thumbnailUrl = data.thumbnail_url || '';

      // Extract username from author_url
      let username = authorName;
      if (authorUrl) {
        const match = authorUrl.match(/@([^/?#]+)/);
        if (match && match[1]) {
          username = match[1];
        }
      }

      // No fake formats - if no direct download provider is configured, formats list is empty or explicitly flagged
      const formats: VideoFormatOption[] = [];

      return {
        id: `tiktok_${Date.now()}`,
        url,
        title,
        author: {
          username,
          nickname: authorName,
        },
        thumbnailUrl,
        formats,
        isDownloadReady: false,
        providerType: 'oembed'
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          throw new Error('TIMEOUT');
        }
        throw err;
      }
      logger.error('oEmbed fetch error:', err);
      throw new Error('PROVIDER_ERROR');
    } finally {
      clearTimeout(timeout);
    }
  }

  public async getAvailableFormats(): Promise<VideoFormatOption[]> {
    return [];
  }

  public async createDownload(): Promise<DownloadSession> {
    throw new Error('PROVIDER_NOT_CONFIGURED');
  }

  public async getDownloadStatus(): Promise<DownloadSession> {
    throw new Error('PROVIDER_NOT_CONFIGURED');
  }

  public async cancelDownload(): Promise<boolean> {
    return false;
  }
}
