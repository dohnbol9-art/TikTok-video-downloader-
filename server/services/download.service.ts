import { Response } from 'express';
import { isSafeUrl } from '../utils/ssrf';
import { logger } from '../utils/logger';
import { Readable } from 'stream';

export interface StreamDownloadOptions {
  mediaUrl: string;
  filename: string;
  contentType?: string;
  res: Response;
  onCancel?: () => void;
}

export class DownloadService {
  public async streamDownload(options: StreamDownloadOptions): Promise<void> {
    const { mediaUrl, filename, contentType = 'video/mp4', res, onCancel } = options;

    // 1. SSRF check
    if (!isSafeUrl(mediaUrl)) {
      logger.warn('SSRF attempt blocked for media URL:', mediaUrl);
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN_ORIGIN',
          message: 'Target download media origin is not permitted.',
        },
      });
      return;
    }

    const abortController = new AbortController();
    let isClientDisconnected = false;

    // Handle client disconnect
    res.on('close', () => {
      if (!res.writableEnded) {
        isClientDisconnected = true;
        abortController.abort();
        if (onCancel) {
          onCancel();
        }
        logger.info('Client closed connection during media stream:', filename);
      }
    });

    try {
      const response = await fetch(mediaUrl, {
        signal: abortController.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        logger.error('Upstream media fetch failed with status:', response.status);
        if (!res.headersSent) {
          res.status(502).json({
            success: false,
            error: {
              code: 'UPSTREAM_ERROR',
              message: 'Failed to retrieve media file from provider.',
            },
          });
        }
        return;
      }

      // Headers
      const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFilename}"; filename*=UTF-8''${encodeURIComponent(sanitizedFilename)}`);
      res.setHeader('Content-Transfer-Encoding', 'binary');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      const contentLength = response.headers.get('content-length');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      // Streaming directly without loading entire buffer in memory
      if (!response.body) {
        res.status(502).json({
          success: false,
          error: {
            code: 'EMPTY_STREAM',
            message: 'No data stream received from media provider.',
          },
        });
        return;
      }

      // Convert web stream to Node readable stream
      // Node 18+ supports Readable.fromWeb
      const nodeStream = Readable.fromWeb(response.body as any);

      nodeStream.on('error', (err) => {
        if (!isClientDisconnected) {
          logger.error('Streaming pipe error:', err);
          if (!res.headersSent) {
            res.status(500).end();
          }
        }
      });

      nodeStream.pipe(res);
    } catch (err: unknown) {
      if (isClientDisconnected) {
        return;
      }
      logger.error('Download stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: {
            code: 'DOWNLOAD_STREAM_ERROR',
            message: 'Failed while streaming video media.',
          },
        });
      }
    }
  }
}

export const downloadService = new DownloadService();
