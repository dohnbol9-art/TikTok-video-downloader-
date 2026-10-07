import React, { useState, useRef, useEffect, createRef } from 'react';
import { Clipboard, X, ArrowRight, Loader2, AlertCircle, List, Sparkles, CheckSquare, Square, DownloadCloud } from 'lucide-react';
import { ProcessingStatus, VideoMetadata } from '../types';
import { validateClientTikTokUrl } from '../utils/url';
import { VideoResultCard, VideoResultCardRef } from './VideoResultCard';
import { getApiEndpoint } from '../config';

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
  isSelected: boolean;
}

// Universal fetcher: Tries configured server endpoint first; falls back to direct client parser on static hosts
async function fetchTikTokVideoMetadata(targetUrl: string): Promise<{ success: boolean; data?: VideoMetadata; error?: string }> {
  // 1. Try server endpoint
  try {
    const response = await fetch(getApiEndpoint('/api/video/process'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url: targetUrl,
        preview: true,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        return { success: true, data: data.data };
      }
    }
  } catch {
    // Server endpoint not reachable (static host), proceed to client fallback
  }

  // 2. Client-side fallback for static hosting
  try {
    const directRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}&hd=1`);
    if (directRes.ok) {
      const json = await directRes.json();
      if (json.code === 0 && json.data) {
        const d = json.data;
        const formats = [];
        if (d.hdplay || d.play) {
          formats.push({
            id: 'mp4_hd',
            format: 'MP4',
            quality: '1080p HD (No Watermark)',
            type: 'video' as const,
            downloadUrl: d.hdplay || d.play,
            fileSize: d.size ? `${(d.size / 1024 / 1024).toFixed(1)} MB` : undefined,
            isDirectDownloadAvailable: true,
          });
          formats.push({
            id: 'mp4_sd',
            format: 'MP4',
            quality: 'Standard Quality (Fast)',
            type: 'video' as const,
            downloadUrl: d.play,
            fileSize: d.size ? `${(d.size / 1024 / 1024).toFixed(1)} MB` : undefined,
            isDirectDownloadAvailable: true,
          });
        }
        if (d.music) {
          formats.push({
            id: 'mp3',
            format: 'MP3',
            quality: 'Original Audio (HQ)',
            type: 'audio' as const,
            downloadUrl: d.music,
            isDirectDownloadAvailable: true,
          });
        }

        const metadata: VideoMetadata = {
          id: d.id || `${Date.now()}`,
          url: targetUrl,
          title: d.title || 'TikTok Video',
          author: {
            username: d.author?.unique_id || 'user',
            nickname: d.author?.nickname || d.author?.unique_id || 'TikTok Creator',
            avatarUrl: d.author?.avatar,
          },
          thumbnailUrl: d.cover || d.origin_cover,
          durationFormatted: d.duration ? `${Math.floor(d.duration / 60)}:${(d.duration % 60).toString().padStart(2, '0')}` : undefined,
          formats,
          isDownloadReady: true,
          providerType: 'configured',
        };

        return { success: true, data: metadata };
      }
    }
  } catch {
    // Both failed
  }

  return { success: false, error: 'Service temporarily unavailable. Please try again.' };
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
  const batchCardRefs = useRef<Record<string, React.RefObject<VideoResultCardRef | null>>>({});

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
      batchCardRefs.current = {};
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

    const result = await fetchTikTokVideoMetadata(clientValidation.cleanUrl);

    if (!result.success || !result.data) {
      setStatus('ERROR');
      setErrorMessage(result.error || 'Service temporarily unavailable. Please try again.');
      return;
    }

    setMetadata(result.data);
    setStatus('SUCCESS');
    
    setTimeout(() => {
      const resultEl = document.getElementById('video-download-result');
      if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
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
      isSelected: true,
    }));
    setBatchItems(initialItems);

    // Process in smaller chunks to avoid overwhelming the client/server and keep it "fast"
    const CHUNK_SIZE = 3;
    for (let i = 0; i < initialItems.length; i += CHUNK_SIZE) {
      const chunk = initialItems.slice(i, i + CHUNK_SIZE);
      
      await Promise.all(chunk.map(async (item) => {
        setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'PROCESSING' } : it));

        const validation = validateClientTikTokUrl(item.url);
        if (!validation.isValid) {
          setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'ERROR', error: validation.error } : it));
          return;
        }

        const result = await fetchTikTokVideoMetadata(validation.cleanUrl);
        if (result.success && result.data) {
          batchCardRefs.current[item.id] = createRef<VideoResultCardRef>();
          setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'SUCCESS', metadata: result.data! } : it));
        } else {
          setBatchItems(prev => prev.map(it => it.id === item.id ? { ...it, status: 'ERROR', error: result.error || 'Failed' } : it));
        }
      }));

      // Small delay between chunks
      if (i + CHUNK_SIZE < initialItems.length) {
        await new Promise(r => setTimeout(r, 300));
      }
    }
    setIsBatchProcessing(false);
  };

  const toggleItemSelection = (id: string) => {
    setBatchItems(prev => prev.map(item => item.id === id ? { ...item, isSelected: !item.isSelected } : item));
  };

  const toggleSelectAll = () => {
    const allSelected = batchItems.every(item => item.isSelected);
    setBatchItems(prev => prev.map(item => ({ ...item, isSelected: !allSelected })));
  };

  const handleDownloadAll = async () => {
    const selectedItems = batchItems.filter(item => item.isSelected && item.status === 'SUCCESS' && item.metadata);
    for (const item of selectedItems) {
      const ref = batchCardRefs.current[item.id]?.current;
      if (ref) {
        ref.triggerDownload();
        // Pause briefly between triggering downloads to avoid browser spam protection
        await new Promise(r => setTimeout(r, 800));
      }
    }
  };

  const successfulItems = batchItems.filter(i => i.status === 'SUCCESS').length;

  return (
    <section id="downloader" className="mx-auto max-w-4xl px-4 py-2 sm:px-6">
      {/* Mode Switcher */}
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setIsBatchMode(false)}
          className={`flex-1 rounded-lg py-1.5 text-[10px] sm:text-xs font-bold transition-all ${!isBatchMode ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 dark:bg-[#15181d] dark:border-[#252a33] dark:text-[#b8bec9]'}`}
        >
          Single Link
        </button>
        <button
          onClick={() => setIsBatchMode(true)}
          className={`flex-1 rounded-lg py-1.5 text-[10px] sm:text-xs font-bold transition-all ${isBatchMode ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 dark:bg-[#15181d] dark:border-[#252a33] dark:text-[#b8bec9]'}`}
        >
          Batch Mode (Multi)
        </button>
      </div>

      {/* Main Downloader Card */}
      <div className="relative rounded-xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/30 sm:p-5 dark:border-slate-800 dark:bg-[#15181d] dark:shadow-none">
        
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">
            {isBatchMode ? 'Enter TikTok URLs (one per line):' : 'Paste TikTok Video URL:'}
          </span>
          <span className="text-[9px] sm:text-[10px] text-rose-500 font-bold flex items-center gap-1 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
            <Sparkles className="h-2.5 w-2.5" />
            1080p HD Ready
          </span>
        </div>

        {/* Input Area */}
        <div className="relative flex flex-col gap-2">
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
                className="w-full rounded-lg border-2 border-slate-100 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm font-medium text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/5 dark:border-[#252a33] dark:bg-[#0b0d10] dark:text-white dark:focus:border-rose-500"
              />
              <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
                {url && (
                  <button onClick={handleClear} className="p-1 text-slate-400 hover:text-slate-600"><X className="h-3.5 w-3.5" /></button>
                )}
                <button onClick={handlePaste} className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800">
                  <Clipboard className="h-3 w-3" />
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
                rows={3}
                disabled={isProcessingBatch}
                className="w-full rounded-lg border-2 border-slate-100 bg-slate-50/50 px-3 py-2 text-[11px] sm:text-xs font-medium text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/5 dark:border-[#252a33] dark:bg-[#0b0d10] dark:text-white dark:focus:border-rose-500"
              />
              <div className="mt-1 flex justify-end gap-2">
                <button onClick={handleClear} className="text-[9px] sm:text-[10px] font-bold text-slate-500 hover:text-rose-500">Clear All</button>
                <button onClick={handlePaste} className="text-[9px] sm:text-[10px] font-bold text-rose-500 flex items-center gap-1"><Clipboard className="h-2.5 w-2.5" /> Paste</button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={isBatchMode ? handleStartBatch : () => validateAndProcess(url)}
            disabled={isProcessingBatch || (status === 'PROCESSING') || (!isBatchMode && !url.trim()) || (isBatchMode && !batchUrls.trim())}
            className="flex h-10 sm:h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-rose-600 to-rose-500 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-rose-500/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isProcessingBatch || status === 'PROCESSING' || status === 'VALIDATING' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isBatchMode ? 'Processing...' : 'Searching...'}</span>
              </>
            ) : (
              <>
                <span>{isBatchMode ? 'Process Links' : 'Download Now'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Feedback / Error */}
        {!isBatchMode && status === 'ERROR' && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-[11px] sm:text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Batch Results List */}
      {isBatchMode && batchItems.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <List className="h-3.5 w-3.5 text-rose-500" />
              Queue ({successfulItems}/{batchItems.length})
            </h3>
            
            {!isProcessingBatch && successfulItems > 0 && (
              <div className="flex flex-wrap gap-2 justify-end">
                <button 
                  onClick={toggleSelectAll}
                  className="rounded-md px-2 py-1 text-[9px] sm:text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {batchItems.every(i => i.isSelected) ? 'Deselect' : 'Select All'}
                </button>
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1 text-[10px] sm:text-xs font-bold text-white shadow-md shadow-rose-500/20 hover:bg-rose-700 transition-all"
                >
                  <DownloadCloud className="h-3 w-3" />
                  One-Click Download
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {batchItems.map((item) => (
              <div key={item.id} className="relative">
                {item.status === 'SUCCESS' && item.metadata ? (
                  <div className="flex flex-col gap-1.5">
                    <div className="absolute left-1.5 top-3 z-10">
                      <button 
                        onClick={() => toggleItemSelection(item.id)}
                        className="p-1 rounded bg-white/90 dark:bg-slate-900/90 shadow-sm border border-slate-200 dark:border-slate-800"
                      >
                        {item.isSelected ? <CheckSquare className="h-4 w-4 text-rose-600" /> : <Square className="h-4 w-4 text-slate-400" />}
                      </button>
                    </div>
                    <div className={item.isSelected ? '' : 'opacity-60 grayscale-[30%]'}>
                      <VideoResultCard
                        ref={batchCardRefs.current[item.id]}
                        metadata={item.metadata}
                        onDownloadComplete={(f) => onSuccessDownload({ url: item.url, title: item.metadata!.title, author: item.metadata!.author.username, format: f, thumbnailUrl: item.metadata!.thumbnailUrl })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-200 bg-white p-2 sm:p-3 dark:border-[#252a33] dark:bg-[#15181d]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {item.status === 'PROCESSING' ? (
                          <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                        ) : item.status === 'ERROR' ? (
                          <AlertCircle className="h-4 w-4 text-rose-500" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        )}
                        <span className="truncate text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {item.url}
                        </span>
                      </div>
                      {item.status === 'ERROR' && (
                        <span className="text-[8px] sm:text-[9px] font-bold text-rose-500 uppercase">{item.error || 'Failed'}</span>
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
        <div id="video-download-result" className="mt-6">
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
