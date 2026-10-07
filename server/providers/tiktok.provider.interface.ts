export interface VideoFormatOption {
  id: string;
  type: 'video' | 'audio';
  format: string; // e.g. 'MP4', 'MP3'
  quality: string; // e.g. 'HD (No Watermark)', 'Original', '1080p', 'Audio Only'
  fileSize?: string; // e.g. '14.2 MB'
  fileSizeBytes?: number;
  downloadUrl?: string; // Direct download streaming endpoint
  isDirectDownloadAvailable: boolean;
}

export interface VideoMetadata {
  id: string;
  url: string;
  title: string;
  author: {
    username: string;
    nickname: string;
    avatarUrl?: string;
  };
  thumbnailUrl: string;
  durationSeconds?: number;
  durationFormatted?: string;
  formats: VideoFormatOption[];
  isDownloadReady: boolean;
  providerType: 'configured' | 'oembed';
}

export interface DownloadSession {
  sessionId: string;
  url: string;
  formatId: string;
  status: 'preparing' | 'processing' | 'downloading' | 'completed' | 'failed' | 'cancelled';
  bytesDownloaded?: number;
  totalBytes?: number;
  error?: string;
}

export interface TikTokProvider {
  name: string;
  isConfigured(): boolean;
  validateUrl(url: string): Promise<boolean>;
  getMetadata(url: string): Promise<VideoMetadata>;
  getAvailableFormats(videoId: string, rawMetadata?: unknown): Promise<VideoFormatOption[]>;
  createDownload(videoId: string, formatId: string, downloadUrl?: string): Promise<DownloadSession>;
  getDownloadStatus(sessionId: string): Promise<DownloadSession>;
  cancelDownload(sessionId: string): Promise<boolean>;
}
