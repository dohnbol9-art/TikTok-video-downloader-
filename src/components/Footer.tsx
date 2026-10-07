import React from 'react';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenAdmin }) => {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950">
      
      {/* Responsible Use Notice Banner */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-3 text-center text-xs text-slate-500 dark:border-slate-850 dark:bg-slate-900/40 dark:text-slate-400">
        <div className="mx-auto max-w-4xl px-4">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Responsible Use:</span> Only download content when you have the right or permission to do so. Respect copyright, platform terms, and applicable laws.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          {/* Brand mark */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 text-white">
                <svg
                  className="h-4 w-4 fill-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 2L3 14h7v8l11-12h-8l0-8z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Quick<span className="text-rose-500">Tok</span>
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Fast & Simple TikTok Video Downloads
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#downloader" className="hover:text-rose-500">Downloader</a>
            <a href="#how-it-works" className="hover:text-rose-500">How It Works</a>
            <a href="#features" className="hover:text-rose-500">Features</a>
            <a href="#faq" className="hover:text-rose-500">FAQ</a>
            <a href="#about" className="hover:text-rose-500">About</a>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-rose-500"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-rose-500"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-rose-500 hover:text-rose-600 dark:text-rose-400"
            >
              Admin Status
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} QuickTok. QuickTok is an independent web utility and is not affiliated, endorsed, or partnered with TikTok Inc. or ByteDance Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};
