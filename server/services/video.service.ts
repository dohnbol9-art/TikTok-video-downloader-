import { validateTikTokUrl } from '../validation/url.validator';
import { ProviderFactory } from '../providers/provider.factory';
import { metricsService } from './metrics.service';
import { logger } from '../utils/logger';
import { VideoMetadata } from '../providers/tiktok.provider.interface';

export interface ProcessVideoResult {
  success: boolean;
  data?: VideoMetadata;
  error?: {
    code: string;
    message: string;
  };
}

export class VideoService {
  public async processUrl(rawUrl: string, allowPreview = false): Promise<ProcessVideoResult> {
    const startTime = Date.now();
    metricsService.recordRequest();

    // 1. URL validation
    const validation = validateTikTokUrl(rawUrl);
    if (!validation.isValid || !validation.normalizedUrl) {
      metricsService.recordFailure(Date.now() - startTime);
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: validation.error || 'Please enter a valid supported TikTok video URL.',
        },
      };
    }

    // 2. Provider resolution
    const provider = ProviderFactory.getProvider(allowPreview);
    if (!provider) {
      metricsService.recordFailure(Date.now() - startTime);
      return {
        success: false,
        error: {
          code: 'PROVIDER_NOT_CONFIGURED',
          message: 'Video processing is currently unavailable.',
        },
      };
    }

    // 3. Provider processing
    try {
      const metadata = await provider.getMetadata(validation.normalizedUrl);
      const durationMs = Date.now() - startTime;
      metricsService.recordSuccess(durationMs);

      return {
        success: true,
        data: metadata,
      };
    } catch (err: unknown) {
      const durationMs = Date.now() - startTime;
      metricsService.recordFailure(durationMs);

      const errorMessage = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
      logger.error('VideoService error processing URL:', rawUrl, errorMessage);

      if (errorMessage === 'PROVIDER_NOT_CONFIGURED') {
        return {
          success: false,
          error: {
            code: 'PROVIDER_NOT_CONFIGURED',
            message: 'Video processing is currently unavailable.',
          },
        };
      }

      if (errorMessage === 'RATE_LIMITED') {
        return {
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests. Please wait a moment and try again.',
          },
        };
      }

      if (errorMessage === 'TIMEOUT') {
        return {
          success: false,
          error: {
            code: 'TIMEOUT',
            message: 'Request timed out while contacting video provider. Please try again.',
          },
        };
      }

      if (errorMessage === 'VIDEO_NOT_FOUND') {
        return {
          success: false,
          error: {
            code: 'VIDEO_NOT_FOUND',
            message: 'This video is unavailable or cannot be processed.',
          },
        };
      }

      if (errorMessage === 'PROVIDER_AUTH_FAILED' || errorMessage === 'PROVIDER_ERROR') {
        return {
          success: false,
          error: {
            code: 'PROVIDER_UNAVAILABLE',
            message: 'Video processing is temporarily unavailable. Please try again later.',
          },
        };
      }

      return {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Something went wrong. Please try again.',
        },
      };
    }
  }
}

export const videoService = new VideoService();
