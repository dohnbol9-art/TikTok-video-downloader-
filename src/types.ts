export type ProcessingStatus =
  | 'IDLE'
  | 'VALIDATING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'ERROR'
  | 'PROVIDER_NOT_CONFIGURED'
  | 'RATE_LIMITED'
  | 'TIMEOUT';

export type DownloadProgressState =
  | 'idle'
  | 'preparing'
  | 'processing'
  | 'downloading'
  | 'completed'
  | 'failed';

export interface VideoFormatOption {
  id: string;
  type: 'video' | 'audio';
  format: string;
  quality: string;
  fileSize?: string;
  fileSizeBytes?: number;
  downloadUrl?: string;
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

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  author: string;
  timestamp: number;
  format: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
}

export interface ServerMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageProcessingTimeMs: number;
  rateLimitEvents: number;
  providerStatus: 'Configured' | 'Not configured';
  serverStatus: 'healthy' | 'degraded';
  uptimeSeconds: number;
  memoryUsageMb: number;
  timestamp: string;
}
