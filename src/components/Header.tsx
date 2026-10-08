import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, History } from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, historyCount }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Zone 1: Single text element wordmark with custom emblem */}
        <a href="/" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 shadow-sm shadow-rose-500/20 transition-transform group-hover:scale-105">
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
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => scrollTo('downloader')}
            className="text-xs font-semibold text-slate-600 transition-colors hover:text-rose-500 dark:text-[#b8bec9] dark:hover:text-rose-400"
          >
            Downloader
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="text-xs font-semibold text-slate-600 transition-colors hover:text-rose-500 dark:text-[#b8bec9] dark:hover:text-rose-400"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="text-xs font-semibold text-slate-600 transition-colors hover:text-rose-500 dark:text-[#b8bec9] dark:hover:text-rose-400"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="text-xs font-semibold text-slate-600 transition-colors hover:text-rose-500 dark:text-[#b8bec9] dark:hover:text-rose-400"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="text-xs font-semibold text-slate-600 transition-colors hover:text-rose-500 dark:text-[#b8bec9] dark:hover:text-rose-400"
          >
            About
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-1.5">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            title="Download History"
            aria-label="View local download history"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-[#252a33] dark:text-[#b8bec9] dark:hover:bg-[#15181d] dark:hover:text-white"
          >
            <History className="h-4 w-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-all hover:bg-slate-100 dark:border-[#252a33] dark:text-[#b8bec9] dark:hover:bg-[#15181d]"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden dark:border-[#252a33] dark:text-[#b8bec9]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden dark:border-[#252a33] dark:bg-[#0b0d10]">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => scrollTo('downloader')}
              className="text-left text-sm font-medium text-slate-700 dark:text-white"
            >
              Downloader
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-left text-sm font-medium text-slate-700 dark:text-white"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="text-left text-sm font-medium text-slate-700 dark:text-white"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-left text-sm font-medium text-slate-700 dark:text-white"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left text-sm font-medium text-slate-700 dark:text-white"
            >
              About QuickTok
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
