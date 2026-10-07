import { config } from '../config/env';

interface MetricSnapshot {
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

class MetricsService {
  private totalRequests = 0;
  private successfulRequests = 0;
  private failedRequests = 0;
  private totalProcessingTimeMs = 0;
  private rateLimitEvents = 0;
  private startTime = Date.now();

  public recordRequest(): void {
    this.totalRequests++;
  }

  public recordSuccess(durationMs: number): void {
    this.successfulRequests++;
    this.totalProcessingTimeMs += durationMs;
  }

  public recordFailure(durationMs: number): void {
    this.failedRequests++;
    this.totalProcessingTimeMs += durationMs;
  }

  public recordRateLimit(): void {
    this.rateLimitEvents++;
  }

  public getSnapshot(): MetricSnapshot {
    const totalProcessed = this.successfulRequests + this.failedRequests;
    const avgDuration = totalProcessed > 0
      ? Math.round(this.totalProcessingTimeMs / totalProcessed)
      : 0;

    const memory = process.memoryUsage();
    const memoryMb = Math.round(memory.heapUsed / 1024 / 1024);

    return {
      totalRequests: this.totalRequests,
      successfulRequests: this.successfulRequests,
      failedRequests: this.failedRequests,
      averageProcessingTimeMs: avgDuration,
      rateLimitEvents: this.rateLimitEvents,
      providerStatus: config.videoProviderBaseUrl ? 'Configured' : 'Not configured',
      serverStatus: 'healthy',
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      memoryUsageMb: memoryMb,
      timestamp: new Date().toISOString()
    };
  }

  public reset(): void {
    this.totalRequests = 0;
    this.successfulRequests = 0;
    this.failedRequests = 0;
    this.totalProcessingTimeMs = 0;
    this.rateLimitEvents = 0;
  }
}

export const metricsService = new MetricsService();
