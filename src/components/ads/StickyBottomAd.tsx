import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Banner320x50Ad } from './Banner320x50Ad';

export interface StickyBottomAdProps {
  className?: string;
}

export const StickyBottomAd: React.FC<StickyBottomAdProps> = ({
  className = '',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Floating Advertisement Bar"
      className={`fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-end pointer-events-none pb-1 px-2 ${className}`}
    >
      <div className="pointer-events-auto relative flex flex-col items-center max-w-full rounded-t-xl border border-b-0 border-slate-200/90 bg-white/95 px-2 pt-1 shadow-lg backdrop-blur-md dark:border-[#252a33] dark:bg-[#15181d]/95">
        <div className="flex items-center justify-between gap-3 w-full px-1">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[#8b93a1] select-none">
            Advertisement
          </span>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Close Advertisement"
            title="Dismiss ad"
            className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-900 dark:bg-[#252a33] dark:text-[#b8bec9] dark:hover:bg-slate-700 transition-colors"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </div>

        <div className="py-0.5">
          <Banner320x50Ad showLabel={false} className="my-0 px-0" />
        </div>
      </div>
    </aside>
  );
};
