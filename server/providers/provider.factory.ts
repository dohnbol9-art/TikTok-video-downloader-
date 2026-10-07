import { config } from '../config/env';
import { TikTokProvider } from './tiktok.provider.interface';
import { ConfiguredApiProvider } from './configured.provider';
import { OEmbedTikTokProvider } from './oembed.provider';

export class ProviderFactory {
  private static configuredProvider = new ConfiguredApiProvider();
  private static oembedProvider = new OEmbedTikTokProvider();

  public static isProviderConfigured(): boolean {
    return this.configuredProvider.isConfigured();
  }

  public static getProvider(allowOEmbedFallback = false): TikTokProvider | null {
    if (this.configuredProvider.isConfigured()) {
      return this.configuredProvider;
    }

    if (allowOEmbedFallback) {
      return this.oembedProvider;
    }

    // When no provider is configured and fallback is not explicitly requested
    return null;
  }

  public static getConfiguredProvider(): ConfiguredApiProvider {
    return this.configuredProvider;
  }

  public static getOEmbedProvider(): OEmbedTikTokProvider {
    return this.oembedProvider;
  }
}
