/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Downloader } from './components/Downloader';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { SeoContentSection } from './components/SeoContentSection';
import { Footer } from './components/Footer';
import { DownloadHistory } from './components/DownloadHistory';
import { LegalModal } from './components/LegalModal';
import {
  Banner728x90Ad,
  Banner320x50Ad,
  Banner160x300Ad,
  NativeBannerAd,
  StickyBottomAd,
} from './components/ads';
import { HistoryItem } from './types';
import {
  getDownloadHistory,
  saveDownloadToHistory,
  deleteHistoryItem,
  clearDownloadHistory,
} from './utils/history';

export default function App() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Initialize history on mount
  useEffect(() => {
    setHistory(getDownloadHistory());

    // Listen for hash changes for direct SEO links like #terms or #privacy
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#terms') {
        setLegalModalType('terms');
      } else if (hash === '#privacy') {
        setLegalModalType('privacy');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleDownloadSuccess = (item: {
    url: string;
    title: string;
    author: string;
    format: string;
    thumbnailUrl?: string;
  }) => {
    saveDownloadToHistory(item);
    setHistory(getDownloadHistory());
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleClearHistory = () => {
    clearDownloadHistory();
    setHistory([]);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0d10] dark:text-white flex flex-col font-sans relative pb-16 sm:pb-20">
        
        {/* Desktop Skyscraper Banners (160x300) - Only visible on wide viewports (2xl: >= 1536px) */}
        <aside
          aria-label="Side Advertisement Left"
          className="hidden 2xl:block fixed left-4 top-28 z-20 pointer-events-auto"
        >
          <div className="rounded-xl border border-slate-200/80 bg-white/95 p-1.5 shadow-sm backdrop-blur-sm dark:border-[#252a33] dark:bg-[#15181d]/95">
            <Banner160x300Ad showLabel={true} />
          </div>
        </aside>

        <aside
          aria-label="Side Advertisement Right"
          className="hidden 2xl:block fixed right-4 top-28 z-20 pointer-events-auto"
        >
          <div className="rounded-xl border border-slate-200/80 bg-white/95 p-1.5 shadow-sm backdrop-blur-sm dark:border-[#252a33] dark:bg-[#15181d]/95">
            <Banner160x300Ad showLabel={true} />
          </div>
        </aside>

        {/* 1. Header Navigation */}
        <Header
          onOpenHistory={() => setIsHistoryOpen(true)}
          historyCount={history.length}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* 2. Hero & Primary Downloader Functionality */}
          <Hero />
          
          <Downloader onSuccessDownload={handleDownloadSuccess} />

          {/* 3. Primary Post-Download Ad (Highest visibility below the tool) */}
          <div className="my-6">
            {/* Desktop / Tablet: 728x90 Leaderboard */}
            <Banner728x90Ad className="hidden md:flex" />
            {/* Mobile: 320x50 Banner */}
            <Banner320x50Ad className="flex md:hidden" />
          </div>

          {/* 4. Secondary content: How It Works */}
          <HowItWorks />

          {/* 5. Native Banner Recommendations (High CTR viral content cards) */}
          <NativeBannerAd />

          {/* 6. Features Grid */}
          <Features />

          {/* 7. Mid-Page Responsive Banner */}
          <div className="my-8">
            <Banner728x90Ad className="hidden md:flex" />
            <Banner320x50Ad className="flex md:hidden" />
          </div>

          {/* 8. Frequently Asked Questions */}
          <FaqSection />

          {/* 9. SEO Keyword Rich Guide Content */}
          <SeoContentSection />

          {/* 10. About Section */}
          <AboutSection />

          {/* 11. Pre-Footer Responsive Ad */}
          <div className="my-6">
            <Banner728x90Ad className="hidden md:flex" />
            <Banner320x50Ad className="flex md:hidden" />
          </div>
        </main>

        {/* 12. Footer */}
        <Footer
          onOpenLegal={(type) => setLegalModalType(type)}
        />

        {/* 13. Mobile Floating Sticky Ad Bar (320x50, dismissible) */}
        <StickyBottomAd className="md:hidden" />

        {/* Modals & Overlays */}
        <DownloadHistory
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onDeleteItem={handleDeleteHistoryItem}
          onClearAll={handleClearHistory}
        />

        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </ThemeProvider>
  );
}
