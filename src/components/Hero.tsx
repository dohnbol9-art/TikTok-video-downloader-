import React from 'react';
import heroImage from '../assets/images/hero_media_flow_1791143950568.jpg';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-10 pb-6 sm:pt-14 sm:pb-8">
      {/* Subtle atmospheric glow behind hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 dark:opacity-25">
        <div className="h-72 w-96 rounded-full bg-gradient-to-tr from-rose-500/30 to-amber-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Editorial kicker */}
        <div className="mb-3 text-xs font-semibold tracking-wider text-rose-500 uppercase dark:text-rose-400">
          Online Video Downloader & Converter
        </div>

        {/* Primary Headline with target keywords */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white" style={{ textWrap: 'balance' }}>
          TikTok Video Downloader Without Watermark
        </h1>

        {/* Subtitle with high-conversion keywords */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300" style={{ textWrap: 'balance' }}>
          Download TikTok videos in Full HD 1080p MP4 or high quality MP3 audio fast, free, and without watermark on any device.
        </p>

        {/* Visual asset with measured scrim and resilient fallback */}
        <div className="relative mx-auto mt-6 h-14 max-w-md overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-inner sm:h-16 dark:border-slate-800/80 dark:bg-slate-900">
          <img
            src={heroImage}
            alt="Dynamic digital stream visualization"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-70 filter contrast-125 dark:opacity-60"
            onError={(e) => {
              // Resilient fallback container if image fails
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-slate-950 dark:via-transparent dark:to-slate-950" />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
            <span>Clean Stream Architecture · Direct Buffering · No Permanent Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
