import React from 'react';
import { Copy, ClipboardCheck, ArrowDownToLine } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Copy a supported TikTok URL',
      description: 'Open TikTok on mobile or web, find the video you have permission to download, and copy its link to your clipboard.',
      icon: Copy,
    },
    {
      num: '02',
      title: 'Paste it into the downloader',
      description: 'Click the QuickTok paste button or press Ctrl+V to insert the link. Our system immediately verifies format validity.',
      icon: ClipboardCheck,
    },
    {
      num: '03',
      title: 'Choose an available download option',
      description: 'Select your preferred media format (HD MP4 or MP3 audio if available) and start your direct stream instantly.',
      icon: ArrowDownToLine,
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-wider text-rose-500 uppercase dark:text-rose-400">
          Simple 3-Step Process
        </span>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
          How It Works
        </h2>
        <p className="mx-auto mt-1 max-w-xl text-[11px] text-slate-600 sm:text-xs dark:text-slate-400">
          Get your permitted video content saved in seconds without complex watermarks.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-[#15181d]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold text-slate-300 dark:text-slate-700">
                    {step.num}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs font-medium text-rose-500 dark:text-rose-400">
                  Step {step.num} of 03
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
