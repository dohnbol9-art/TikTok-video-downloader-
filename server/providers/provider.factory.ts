import { config } from '../config/env.ts';
import { TikTokProvider } from './tiktok.provider.interface.ts';
import { ConfiguredApiProvider } from './configured.provider.ts';
import { OEmbedTikTokProvider } from './oembed.provider.ts';

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
