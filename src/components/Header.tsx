import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Shield, History } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenHistory, historyCount }) => {
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
    <header className="sticky top-0 z-50 w-full glass transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Zone 1: Single text element wordmark with custom emblem */}
        <a href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 shadow-sm shadow-rose-500/20 transition-transform group-hover:scale-105">
            <svg
              className="h-5 w-5 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 2L3 14h7v8l11-12h-8l0-8z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Quick<span className="text-rose-500">Tok</span>
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden items-center gap-7 md:flex">
          <button
            onClick={() => scrollTo('downloader')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400"
          >
            Downloader
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400"
          >
            About
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            title="Download History"
            aria-label="View local download history"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <History className="h-4 w-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

          {/* Admin Metrics Button */}
          <button
            onClick={onOpenAdmin}
            title="Admin Console"
            aria-label="Open server status and administration console"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:flex dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Shield className="h-4 w-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden dark:border-slate-800 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => scrollTo('downloader')}
              className="text-left text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Downloader
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-left text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="text-left text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-left text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              About QuickTok
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center gap-2 pt-2 text-left text-sm font-medium text-rose-500 dark:text-rose-400 border-t border-slate-100 dark:border-slate-800"
            >
              <Shield className="h-4 w-4" />
              Admin Status Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
