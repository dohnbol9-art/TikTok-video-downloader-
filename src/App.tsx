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
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModal } from './components/LegalModal';
import { Banner300x250Ad, Banner320x50Ad, SocialBarAd } from './components/ads';
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
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
        
        {/* 1. Main website/header */}
        <Header
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          historyCount={history.length}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* 2. Main content / primary functionality */}
          <Hero />
          
          <Downloader onSuccessDownload={handleDownloadSuccess} />

          {/* 3. 300x250 advertisement (Below primary functionality) */}
          <Banner300x250Ad />

          {/* 4. Secondary content */}
          <HowItWorks />

          <Features />

          <FaqSection />

          <SeoContentSection />

          <AboutSection />

          {/* 5. 320x50 banner advertisement (Before footer) */}
          <Banner320x50Ad />
        </main>

        {/* 6. Footer */}
        <Footer
          onOpenLegal={(type) => setLegalModalType(type)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 7. Fixed social-bar advertisement at bottom of viewport */}
        <SocialBarAd />

        {/* Modals & Overlays */}
        <DownloadHistory
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onDeleteItem={handleDeleteHistoryItem}
          onClearAll={handleClearHistory}
        />

        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </ThemeProvider>
  );
}
