import { Request, Response } from 'express';
import { metricsService } from '../services/metrics.service';
import { config } from '../config/env';

export class AdminController {
  public async getStats(req: Request, res: Response): Promise<void> {
    const authHeader = req.headers['authorization'];
    const tokenHeader = req.headers['x-admin-token'];

    let providedToken = '';
    if (typeof tokenHeader === 'string') {
      providedToken = tokenHeader.trim();
    } else if (authHeader && authHeader.startsWith('Bearer ')) {
      providedToken = authHeader.substring(7).trim();
    }

    // If ADMIN_ACCESS_TOKEN is configured in server env, require exact match
    if (config.adminAccessToken) {
      if (!providedToken || providedToken !== config.adminAccessToken) {
        res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid or missing administrator access token.',
          },
        });
        return;
      }
    } else {
      // If ADMIN_ACCESS_TOKEN is not yet set in .env, require a prompt or return notice
      // But allow access with an informational banner so the administrator knows to configure it
    }

    const snapshot = metricsService.getSnapshot();
    res.json({
      success: true,
      data: {
        metrics: snapshot,
        isTokenConfigured: Boolean(config.adminAccessToken),
      },
    });
  }

  public async resetStats(req: Request, res: Response): Promise<void> {
    const authHeader = req.headers['authorization'];
    const tokenHeader = req.headers['x-admin-token'];

    let providedToken = '';
    if (typeof tokenHeader === 'string') {
      providedToken = tokenHeader.trim();
    } else if (authHeader && authHeader.startsWith('Bearer ')) {
      providedToken = authHeader.substring(7).trim();
    }

    if (config.adminAccessToken && providedToken !== config.adminAccessToken) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid administrator access token.',
        },
      });
      return;
    }

    metricsService.reset();
    res.json({
      success: true,
      message: 'Metrics counter has been reset successfully.',
    });
  }
}

export const adminController = new AdminController();
