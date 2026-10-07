import React, { useState, useRef, useEffect } from 'react';
import { Clipboard, X, ArrowRight, Loader2, AlertCircle, Info, CheckCircle2, List, Play, Check, Sparkles } from 'lucide-react';
import { ProcessingStatus, VideoMetadata } from '../types';
import { validateClientTikTokUrl } from '../utils/url';
import { VideoResultCard } from './VideoResultCard';

interface DownloaderProps {
  onSuccessDownload: (item: {
    url: string;
    title: string;
    author: string;
    format: string;
    thumbnailUrl?: string;
  }) => void;
}

interface BatchItem {
  id: string;
  url: string;
  status: ProcessingStatus;
  metadata: VideoMetadata | null;
  error?: string;
}

export const Downloader: React.FC<DownloaderProps> = ({ onSuccessDownload }) => {
  const [url, setUrl] = useState('');
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [batchUrls, setBatchUrls] = useState('');
  
  // Single mode states
  const [status, setStatus] = useState<ProcessingStatus>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  
  // Batch mode states
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [isProcessingBatch, setIsBatchProcessing] = useState(false);

  const [clipboardFeedback, setClipboardFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isBatchMode) {
      inputRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }
  }, [isBatchMode]);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          if (isBatchMode) {
            setBatchUrls(prev => (prev ? prev + '\n' + text : text));
          } else {
            setUrl(text);
            validateAndProcess(text);
          }
          setClipboardFeedback('Pasted from clipboard');
          setTimeout(() => setClipboardFeedback(null), 2000);
          return;
        }
      }
      setClipboardFeedback('Use Ctrl+V or long-press to paste');
      setTimeout(() => setClipboardFeedback(null), 3000);
    } catch {
      setClipboardFeedback('Use Ctrl+V or long-press to paste');
      setTimeout(() => setClipboardFeedback(null), 3000);
    }
  };

  const handleClear = () => {
    if (isBatchMode) {
      setBatchUrls('');
      setBatchItems([]);
    } else {
      setUrl('');
      setStatus('IDLE');
      setErrorMessage('');
      setMetadata(null);
    }
    inputRef.current?.focus();
  };

  const validateAndProcess = async (targetUrl: string) => {
    const trimmed = targetUrl.trim();
    if (!trimmed) {
      setStatus('ERROR');
      setErrorMessage('Please enter a valid supported TikTok video URL.');
      return;
    }

    setStatus('VALIDATING');
    setErrorMessage('');
    setMetadata(null);

    const clientValidation = validateClientTikTokUrl(trimmed);
    if (!clientValidation.isValid) {
      setStatus('ERROR');
      setErrorMessage(clientValidation.error || 'Please enter a valid supported TikTok video URL.');
      return;
    }

    setStatus('PROCESSING');

    try {
      const response = await fetch('/api/video/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          url: clientValidation.cleanUrl,
          preview: true,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorCode = data.error?.code || 'SERVER_ERROR';
        const msg = data.error?.message || 'Something went wrong.';
        setStatus(errorCode as ProcessingStatus);
        setErrorMessage(msg);
        return;
      }

      setMetadata(data.data);
      setStatus('SUCCESS');
      
      setTimeout(() => {
        const resultEl = document.getElementById('video-download-result');
        if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } catch {
      setStatus('ERROR');
      setErrorMessage('Unable to connect to server.');
    }
  };

  const handleStartBatch = async () => {
    const lines = batchUrls.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    setIsBatchProcessing(true);
    const initialItems: BatchItem[] = lines.map(u => ({
      id: Math.random().toString(36).substring(2, 9),
      url: u,
      status: 'IDLE',
      metadata: null,
    }));
    setBatchItems(initialItems);

    for (let i = 0; i < initialItems.length; i++) {
      const item = initialItems[i];
      
      setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'PROCESSING' } : it));

      const validation = validateClientTikTokUrl(item.url);
      if (!validation.isValid) {
        setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'ERROR', error: validation.error } : it));
        continue;
      }

      try {
        const response = await fetch('/api/video/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: validation.cleanUrl, preview: true }),
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'SUCCESS', metadata: data.data } : it));
        } else {
          setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'ERROR', error: data.error?.message || 'Failed' } : it));
        }
      } catch {
        setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'ERROR', error: 'Connection error' } : it));
      }
      
      // Small delay between requests to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    }
    setIsBatchProcessing(false);
  };

  return (
    <section id="downloader" className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
      {/* Mode Switcher */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setIsBatchMode(false)}
          className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${!isBatchMode ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'}`}
        >
          Single Download
        </button>
        <button
          onClick={() => setIsBatchMode(true)}
          className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${isBatchMode ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'}`}
        >
          Batch Download (Multi)
        </button>
      </div>

      {/* Main Downloader Card */}
      <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
        
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-tight dark:text-slate-200">
            {isBatchMode ? 'Enter Multiple TikTok URLs (one per line):' : 'Paste TikTok Video URL:'}
          </span>
          <span className="text-[11px] text-rose-500 font-bold flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            HD 1080p Enabled
          </span>
        </div>

        {/* Input Area */}
        <div className="relative flex flex-col gap-3">
          {!isBatchMode ? (
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && validateAndProcess(url)}
                placeholder="https://www.tiktok.com/@user/video/..."
                disabled={status === 'VALIDATING' || status === 'PROCESSING'}
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3.5 pr-20 text-base font-medium text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-rose-500"
              />
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                {url && (
                  <button onClick={handleClear} className="p-1.5 text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
                )}
                <button onClick={handlePaste} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800">
                  <Clipboard className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Paste</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={batchUrls}
                onChange={(e) => setBatchUrls(e.target.value)}
                placeholder="https://www.tiktok.com/@user/video/123...&#10;https://vm.tiktok.com/XYZ..."
                rows={4}
                disabled={isProcessingBatch}
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-rose-500"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button onClick={handleClear} className="text-xs font-bold text-slate-500 hover:text-rose-500">Clear All</button>
                <button onClick={handlePaste} className="text-xs font-bold text-rose-500 flex items-center gap-1"><Clipboard className="h-3 w-3" /> Paste</button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={isBatchMode ? handleStartBatch : () => validateAndProcess(url)}
            disabled={isProcessingBatch || (status === 'PROCESSING') || (!isBatchMode && !url.trim()) || (isBatchMode && !batchUrls.trim())}
            className="flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 px-8 font-bold text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.02] hover:from-rose-500 hover:to-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-500/30 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isProcessingBatch || status === 'PROCESSING' || status === 'VALIDATING' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{isBatchMode ? 'Processing Queue...' : 'Processing...'}</span>
              </>
            ) : (
              <>
                <span>{isBatchMode ? 'Start Batch Download' : 'Download Now'}</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Feedback / Error */}
        {!isBatchMode && status === 'ERROR' && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Batch Results List */}
      {isBatchMode && batchItems.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <List className="h-4 w-4 text-rose-500" />
              Download Queue ({batchItems.length} videos)
            </h3>
          </div>
          
          <div className="space-y-4">
            {batchItems.map((item) => (
              <div key={item.id}>
                {item.status === 'SUCCESS' && item.metadata ? (
                  <VideoResultCard
                    metadata={item.metadata}
                    onDownloadComplete={(f) => onSuccessDownload({ url: item.url, title: item.metadata!.title, author: item.metadata!.author.username, format: f, thumbnailUrl: item.metadata!.thumbnailUrl })}
                  />
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {item.status === 'PROCESSING' ? (
                          <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
                        ) : item.status === 'ERROR' ? (
                          <AlertCircle className="h-5 w-5 text-rose-500" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
                        )}
                        <span className="truncate text-xs font-mono text-slate-500 dark:text-slate-400">
                          {item.url}
                        </span>
                      </div>
                      {item.status === 'ERROR' && (
                        <span className="text-[10px] font-bold text-rose-500 uppercase">{item.error || 'Failed'}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Result */}
      {!isBatchMode && status === 'SUCCESS' && metadata && (
        <div id="video-download-result" className="mt-8">
          <VideoResultCard
            metadata={metadata}
            onDownloadComplete={(format) => {
              onSuccessDownload({
                url: metadata.url,
                title: metadata.title,
                author: metadata.author.nickname || metadata.author.username,
                format,
                thumbnailUrl: metadata.thumbnailUrl,
              });
            }}
          />
        </div>
      )}
    </section>
  );
};
