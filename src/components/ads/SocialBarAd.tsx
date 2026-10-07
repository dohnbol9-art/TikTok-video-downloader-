import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface SocialBarAdProps {
  className?: string;
  showLabel?: boolean;
}

export const SocialBarAd: React.FC<SocialBarAdProps> = ({
  className = '',
  showLabel = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Social Advertisement Bar"
      className={`fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-end pointer-events-none pb-1.5 px-3 ${className}`}
    >
      <div className="pointer-events-auto relative flex flex-col items-center max-w-full">
        {/* Subtle close control around container without modifying script */}
        <div className="flex items-center justify-between gap-2 w-full px-2 mb-0.5">
          {showLabel && (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">
              Advertisement
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss Advertisement"
            title="Dismiss"
            className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 hover:bg-slate-300 hover:text-slate-900 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </div>

        {/* Script placeholder container */}
        <div className="flex items-center justify-center min-h-[1px] min-w-[1px] max-w-full overflow-hidden" />
      </div>
    </aside>
  );
};
