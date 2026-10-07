import React from 'react';
// heroImage and motion imports removed as they are no longer used in the compact hero

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-6 pb-4 sm:pt-8 sm:pb-6">
      {/* Subtle atmospheric glow behind hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 dark:opacity-20">
        <div className="h-64 w-80 rounded-full bg-gradient-to-tr from-rose-500/20 to-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Editorial kicker */}
        <div className="mb-2 text-[10px] font-bold tracking-wider text-rose-500 uppercase dark:text-rose-400">
          Fast & Reliable Online Tool
        </div>

        {/* Primary Headline with target keywords */}
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white" style={{ textWrap: 'balance' }}>
          TikTok Video Downloader Without Watermark
        </h1>

        {/* Subtitle with high-conversion keywords */}
        <p className="mx-auto mt-2 max-w-2xl text-[11px] text-slate-600 sm:text-sm lg:text-base dark:text-slate-300" style={{ textWrap: 'balance' }}>
          Download TikTok videos in Full HD 1080p MP4 or HQ MP3 audio fast, free, and without watermark on any device.
        </p>
      </div>
    </div>
  );
};
