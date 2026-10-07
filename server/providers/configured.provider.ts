import { config } from '../config/env.ts';
import { logger } from '../utils/logger.ts';
import { TikTokProvider, VideoMetadata, VideoFormatOption, DownloadSession } from './tiktok.provider.interface.ts';

export class ConfiguredApiProvider implements TikTokProvider {
  public name = 'ConfiguredApiProvider';
  private activeSessions = new Map<string, DownloadSession>();

  public isConfigured(): boolean {
    const url = config.videoProviderBaseUrl || 'https://www.tikwm.com/api';
    return Boolean(url && url.trim().length > 0);
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
    const baseUrl = config.videoProviderBaseUrl || 'https://www.tikwm.com/api';
    const isTikWM = baseUrl.includes('tikwm.com');
    const isCobalt = baseUrl.includes('cobalt');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.maxRequestTimeoutMs);

    try {
      // 1. TikWM API handler
      if (isTikWM) {
        const endpoint = `${baseUrl.replace(/\/$/, '')}/?url=${encodeURIComponent(url)}&hd=1`;
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json',
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('PROVIDER_ERROR');
        }

        const resData = await response.json();
        if (resData.code !== 0 || !resData.data) {
          if (resData.msg && resData.msg.toLowerCase().includes('fail')) {
            throw new Error('VIDEO_NOT_FOUND');
          }
          throw new Error('PROVIDER_ERROR');
        }

        const item = resData.data;
        const videoId = item.id || `tiktok_${Date.now()}`;
        const title = item.title || 'TikTok Video';
        const authorUsername = item.author?.unique_id || 'creator';
        const authorNickname = item.author?.nickname || authorUsername;
        const thumbnailUrl = item.cover || item.origin_cover || '';
        const durationSeconds = typeof item.duration === 'number' ? item.duration : undefined;

        const formats: VideoFormatOption[] = [];

        // HD Video Option (No Watermark)
        const hdUrl = item.hdplay || item.play;
        if (hdUrl) {
          const directHdUrl = hdUrl.startsWith('http') ? hdUrl : `https://www.tikwm.com${hdUrl}`;
          const sizeBytes = item.hd_size || item.size;
          formats.push({
            id: 'mp4_hd',
            type: 'video',
            format: 'MP4',
            quality: '1080p HD (No Watermark)',
            fileSize: sizeBytes ? `${(sizeBytes / 1024 / 1024).toFixed(1)} MB` : undefined,
            fileSizeBytes: sizeBytes,
            downloadUrl: directHdUrl,
            isDirectDownloadAvailable: true,
          });
        }

        // Standard Clean MP4 (Fallback / Fast)
        if (item.play && item.hdplay && item.play !== item.hdplay) {
          const directPlayUrl = item.play.startsWith('http') ? item.play : `https://www.tikwm.com${item.play}`;
          formats.push({
            id: 'mp4_sd',
            type: 'video',
            format: 'MP4',
            quality: '720p Clean (Fast)',
            fileSize: item.size ? `${(item.size / 1024 / 1024).toFixed(1)} MB` : undefined,
            fileSizeBytes: item.size,
            downloadUrl: directPlayUrl,
            isDirectDownloadAvailable: true,
          });
        }

        // Original Audio MP3 Option
        if (item.music) {
          const directMusicUrl = item.music.startsWith('http') ? item.music : `https://www.tikwm.com${item.music}`;
          formats.push({
            id: 'mp3_audio',
            type: 'audio',
            format: 'MP3',
            quality: 'Original Audio (MP3)',
            downloadUrl: directMusicUrl,
            isDirectDownloadAvailable: true,
          });
        }

        return {
          id: videoId,
          url,
          title,
          author: {
            username: authorUsername,
            nickname: authorNickname,
            avatarUrl: item.author?.avatar,
          },
          thumbnailUrl,
          durationSeconds,
          durationFormatted: durationSeconds
            ? `${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, '0')}`
            : undefined,
          formats,
          isDownloadReady: formats.length > 0,
          providerType: 'configured',
        };
      }

      // 2. Cobalt API handler
      if (isCobalt) {
        const cobaltEndpoint = `${baseUrl.replace(/\/$/, '')}/`;
        const res = await fetch(cobaltEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ url, videoQuality: 'max' }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error('PROVIDER_ERROR');
        }

        const cobaltData = await res.json();
        const formats: VideoFormatOption[] = [];

        if (cobaltData.url) {
          formats.push({
            id: 'mp4_hd',
            type: 'video',
            format: 'MP4',
            quality: 'Max HD Quality',
            downloadUrl: cobaltData.url,
            isDirectDownloadAvailable: true,
          });
        }

        return {
          id: `cobalt_${Date.now()}`,
          url,
          title: cobaltData.filename || 'TikTok Video',
          author: {
            username: 'TikTok Creator',
            nickname: 'TikTok Creator',
          },
          thumbnailUrl: '',
          formats,
          isDownloadReady: formats.length > 0,
          providerType: 'configured',
        };
      }

      // 3. Generic Custom Video Provider
      const providerUrl = `${baseUrl.replace(/\/$/, '')}/process`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (config.videoProviderApiKey) {
        headers['Authorization'] = `Bearer ${config.videoProviderApiKey}`;
        headers['X-API-Key'] = config.videoProviderApiKey;
      }

      const response = await fetch(providerUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error('RATE_LIMITED');
        if (response.status === 401 || response.status === 403) throw new Error('PROVIDER_AUTH_FAILED');
        if (response.status === 404) throw new Error('VIDEO_NOT_FOUND');
        throw new Error('PROVIDER_ERROR');
      }

      const data = await response.json();
      const videoId = data.id || data.videoId || 'tiktok_video';
      const title = data.title || data.description || 'TikTok Video';
      const authorUsername = data.author?.username || data.authorName || 'TikTok Creator';
      const authorNickname = data.author?.nickname || authorUsername;
      const thumbnailUrl = data.thumbnailUrl || data.cover || data.thumbnail || '';
      const durationSeconds = typeof data.duration === 'number' ? data.duration : undefined;

      const formats: VideoFormatOption[] = [];

      if (data.downloadUrl || data.videoUrl || data.playUrl) {
        formats.push({
          id: 'mp4_hd',
          type: 'video',
          format: 'MP4',
          quality: data.quality || 'HD (Clean)',
          fileSize: data.sizeFormatted || (data.size ? `${(data.size / 1024 / 1024).toFixed(1)} MB` : undefined),
          fileSizeBytes: data.size,
          downloadUrl: data.downloadUrl || data.videoUrl || data.playUrl,
          isDirectDownloadAvailable: true,
        });
      }

      if (data.audioUrl || data.musicUrl) {
        formats.push({
          id: 'mp3_audio',
          type: 'audio',
          format: 'MP3',
          quality: 'Original Audio',
          downloadUrl: data.audioUrl || data.musicUrl,
          isDirectDownloadAvailable: true,
        });
      }

      return {
        id: videoId,
        url,
        title,
        author: {
          username: authorUsername,
          nickname: authorNickname,
          avatarUrl: data.author?.avatar,
        },
        thumbnailUrl,
        durationSeconds,
        durationFormatted: durationSeconds
          ? `${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, '0')}`
          : undefined,
        formats,
        isDownloadReady: formats.length > 0,
        providerType: 'configured',
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          throw new Error('TIMEOUT');
        }
        throw err;
      }
      logger.error('Provider error:', err);
      throw new Error('PROVIDER_ERROR');
    } finally {
      clearTimeout(timeout);
    }
  }

  public async getAvailableFormats(videoId: string, rawMetadata?: unknown): Promise<VideoFormatOption[]> {
    if (rawMetadata && typeof rawMetadata === 'object' && 'formats' in rawMetadata) {
      return (rawMetadata as { formats: VideoFormatOption[] }).formats;
    }
    return [];
  }

  public async createDownload(videoId: string, formatId: string, downloadUrl?: string): Promise<DownloadSession> {
    const sessionId = `dl_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const session: DownloadSession = {
      sessionId,
      url: downloadUrl || '',
      formatId,
      status: 'downloading',
    };
    this.activeSessions.set(sessionId, session);
    return session;
  }

  public async getDownloadStatus(sessionId: string): Promise<DownloadSession> {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('SESSION_NOT_FOUND');
    return session;
  }

  public async cancelDownload(sessionId: string): Promise<boolean> {
    if (this.activeSessions.has(sessionId)) {
      const session = this.activeSessions.get(sessionId)!;
      session.status = 'cancelled';
      this.activeSessions.delete(sessionId);
      return true;
    }
    return false;
  }
}
