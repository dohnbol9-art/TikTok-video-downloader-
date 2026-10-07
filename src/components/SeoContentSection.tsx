import React from 'react';
import { CheckCircle2, Download, ShieldCheck, Zap, Smartphone, Monitor, Music, Film } from 'lucide-react';

export const SeoContentSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        
        {/* Main SEO Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase dark:text-rose-400">
            Free Online Media Utility
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Best TikTok Video Downloader Without Watermark
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>QuickTok</strong> is a fast, reliable, and completely free online <strong>TikTok video downloader</strong> that enables you to save any public TikTok video in crystal-clear Full HD 1080p resolution without the TikTok watermark logo. Works seamlessly on iPhone, Android, PC, Mac, and tablets without requiring any software or app installation.
          </p>
        </div>

        {/* Feature Grid with Semantic Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Download TikTok Video Without Watermark
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Remove the bouncing TikTok watermark and creator username from your downloaded videos. Get clean, studio-grade MP4 files ready for offline viewing, archiving, or video editing.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ultra-Fast 1080p Full HD Downloads
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Enjoy line-speed streaming without artificial throttle limits or download queues. QuickTok extracts original bitrates up to Full HD 1080p directly from source media servers.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
              <Music className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                TikTok to MP3 Audio Converter
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Love a viral song or sound? QuickTok isolates and converts the original background audio track so you can save high-bitrate MP3 music files directly to your device with one tap.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                100% Free & Unlimited Usage
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No credit cards, no login, and no subscriptions required. QuickTok is completely free with no daily download caps, intrusive software requirements, or account restrictions.
              </p>
            </div>
          </div>

        </div>

        {/* Device Compatibility Guide (Targeting long-tail search intent) */}
        <div className="border-t border-slate-100 pt-10 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Supported Devices & Operating Systems
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">iPhone & iPad (iOS)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Works on Safari with iOS 13+. Paste any TikTok URL and download videos straight into your Apple Files app or camera roll Photos gallery without installing third-party apps.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Android Phones</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compatible with Google Chrome, Samsung Internet, Firefox, and Opera. Saved videos appear automatically in your phone Gallery and Downloads folder.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-center gap-3 mb-3">
                <Monitor className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">PC, Mac & Linux</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Works in all desktop web browsers (Chrome, Edge, Safari, Brave). Supports fast batch links processing and immediate direct MP4 downloads to your computer.
              </p>
            </div>

          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="mt-10 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 p-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Why Creators Choose QuickTok Video Downloader:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>No watermark on Full HD 1080p MP4 videos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Instant TikTok to MP3 audio conversion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Unlimited downloads with 0 subscription fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Privacy protected: No data or files kept on servers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Works directly in browser without installing apps</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Supports vm.tiktok.com, vt.tiktok.com and desktop links</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
