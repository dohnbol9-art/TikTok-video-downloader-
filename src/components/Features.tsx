import React from 'react';
import { Zap, Sparkles, Smartphone, ShieldCheck, HeartHandshake } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Lightning Fast',
      description: 'Engineered with high-throughput stream piping and zero server disk caching, delivering direct media chunks to your browser at line speed.',
      icon: Zap,
    },
    {
      title: 'Simple & Streamlined',
      description: 'No complicated configurations or bloated toolbars. Simply paste any supported TikTok link and click download.',
      icon: Sparkles,
    },
    {
      title: 'Mobile Ready',
      description: 'Fully responsive UI optimized for Android and iPhone touch screens with 44px+ touch targets and native clipboard support.',
      icon: Smartphone,
    },
    {
      title: 'Privacy Focused',
      description: 'We do not permanently store videos, user credentials, or personally identifiable data on our servers. Downloads stream directly in real-time.',
      icon: ShieldCheck,
    },
    {
      title: 'Free to Start',
      description: 'Accessible tool designed for content creators, researchers, and personal archival without forced memberships or surprise subscriptions.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-wider text-rose-500 uppercase dark:text-rose-400">
          Engineered for Speed
        </span>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
          Why Choose QuickTok
        </h2>
        <p className="mx-auto mt-1 max-w-xl text-[11px] text-slate-600 sm:text-xs dark:text-slate-400">
          A modern downloader focused on performance, privacy, and genuine technical execution.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          const isMarquee = idx === 0;
          return (
            <div
              key={feature.title}
              className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-[#15181d] dark:hover:border-slate-700 ${
                isMarquee ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
