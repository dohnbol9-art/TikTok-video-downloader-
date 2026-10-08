import React, { useEffect, useRef } from 'react';

export interface NativeBannerAdProps {
  className?: string;
  showLabel?: boolean;
}

export const NativeBannerAd: React.FC<NativeBannerAdProps> = ({
  className = '',
  showLabel = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous children on clean mount
    containerRef.current.innerHTML = '';

    // Create container element specified by Adsterra
    const containerDiv = document.createElement('div');
    containerDiv.id = 'container-86fcd8badeced8e09f66201ce1a65115';
    containerDiv.style.width = '100%';
    containerRef.current.appendChild(containerDiv);

    // Create Adsterra async native banner script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl31716332.profitableratecpmnetwork.com/86fcd8badeced8e09f66201ce1a65115/invoke.js';
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section
      aria-label="Sponsored Recommendations"
      className={`mx-auto my-8 w-full max-w-4xl px-4 ${className}`}
    >
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[#8b93a1]">
          <span>Sponsored Recommendations</span>
          <span>Advertisement</span>
        </div>
      )}
      <div
        ref={containerRef}
        className="min-h-[120px] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 sm:p-4 shadow-sm dark:border-[#252a33] dark:bg-[#15181d]"
      />
    </section>
  );
};
