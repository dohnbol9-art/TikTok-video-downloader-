import { Request, Response } from 'express';
import { videoService } from '../services/video.service';
import { downloadService } from '../services/download.service';
import { ProviderFactory } from '../providers/provider.factory';
import { logger } from '../utils/logger';

export class VideoController {
  public async process(req: Request, res: Response): Promise<void> {
    const { url, preview } = req.body;
    try {
      const result = await videoService.processUrl(url, Boolean(preview));

      if (!result.success) {
        let statusCode = 400;
        if (result.error?.code === 'PROVIDER_NOT_CONFIGURED') {
          statusCode = 503;
        } else if (result.error?.code === 'PROVIDER_UNAVAILABLE') {
          statusCode = 503;
        } else if (result.error?.code === 'RATE_LIMITED') {
          statusCode = 429;
        } else if (result.error?.code === 'TIMEOUT') {
          statusCode = 504;
        } else if (result.error?.code === 'VIDEO_NOT_FOUND') {
          statusCode = 404;
        }
        res.status(statusCode).json(result);
        return;
      }

      res.status(200).json(result);
    } catch (err: unknown) {
      logger.error('Unexpected error in VideoController.process:', err);
      res.status(500).json({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Something went wrong. Please try again.',
        },
      });
    }
  }

  public async download(req: Request, res: Response): Promise<void> {
    const mediaUrl = req.query.url as string;
    const format = (req.query.format as string) || 'mp4';
    const videoId = (req.query.id as string) || 'video';
    const customFilename = req.query.filename as string;

    if (!mediaUrl) {
      res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_URL',
          message: 'Download media URL parameter is required.',
        },
      });
      return;
    }

    const contentType = format.toLowerCase() === 'mp3' ? 'audio/mpeg' : 'video/mp4';
    const extension = format.toLowerCase() === 'mp3' ? 'mp3' : 'mp4';
    const rawName = customFilename || `quicktok_${videoId}`;
    const cleanBase = rawName.replace(/\.(mp4|mp3|m4a|webm|html)$/i, '').replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${cleanBase}.${extension}`;

    await downloadService.streamDownload({
      mediaUrl,
      filename,
      contentType,
      res,
    });
  }

  public async proxyImage(req: Request, res: Response): Promise<void> {
    const imageUrl = req.query.url as string;
    if (!imageUrl) {
      res.status(400).end();
      return;
    }

    try {
      const response = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.tiktok.com/',
        },
      });

      if (!response.ok) {
        res.status(response.status).end();
        return;
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');

      if (response.body) {
        const nodeStream = import('stream').then(m => m.Readable.fromWeb(response.body as any));
        (await nodeStream).pipe(res);
      } else {
        res.status(502).end();
      }
    } catch (err) {
      logger.error('Proxy image error:', err);
      res.status(500).end();
    }
  }

  public async getProviderStatus(_req: Request, res: Response): Promise<void> {
    const isConfigured = ProviderFactory.isProviderConfigured();
    res.json({
      success: true,
      data: {
        configured: isConfigured,
        provider: isConfigured ? 'ConfiguredApiProvider' : 'None',
      },
    });
  }
}

export const videoController = new VideoController();
