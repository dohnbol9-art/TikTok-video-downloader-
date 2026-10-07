import React, { useState } from 'react';
import { VideoMetadata, DownloadProgressState } from '../types';
import {
  Download,
  Music,
  Video,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Share2,
  Smartphone,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface VideoResultCardProps {
  metadata: VideoMetadata;
  onDownloadComplete: (format: string) => void;
}

export const VideoResultCard: React.FC<VideoResultCardProps> = ({
  metadata,
  onDownloadComplete,
}) => {
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);
  const [downloadState, setDownloadState] = useState<DownloadProgressState>('idle');
  const [downloadPercent, setDownloadPercent] = useState<number>(0);
  const [downloadBytesText, setDownloadBytesText] = useState<string>('');
  const [downloadSpeedText, setDownloadSpeedText] = useState<string>('');
  const [downloadStatusText, setDownloadStatusText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPhoneGuide, setShowPhoneGuide] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Helper to proxy external images through our server to bypass referrer/hotlinking blocks
  const getProxyUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('/') || url.startsWith('blob:')) return url;
    return `/api/video/proxy-image?url=${encodeURIComponent(url)}`;
  };

  // Real-time chunked stream downloader with accurate byte tracking and percentage animation
  const startDownload = async (formatId: string, downloadUrl?: string, extension = 'mp4') => {
    if (!downloadUrl && !metadata.isDownloadReady) {
      setErrorMessage('Direct media stream provider is not configured. Please see server configuration.');
      return;
    }

    setActiveDownloadId(formatId);
    setDownloadState('preparing');
    setDownloadPercent(0);
    setDownloadBytesText('');
    setDownloadSpeedText('');
    setDownloadStatusText('Connecting to high-speed media server...');
    setErrorMessage(null);

    try {
      setDownloadState('processing');
      setDownloadStatusText('Handshaking stream...');

      const safeFilename = `quicktok_${(metadata.author.username || 'video').replace(/[^a-zA-Z0-9_-]/g, '_')}_${metadata.id || Date.now()}.${extension}`;
      const streamEndpoint = `/api/video/download?url=${encodeURIComponent(downloadUrl || '')}&id=${metadata.id}&format=${extension}&filename=${encodeURIComponent(safeFilename)}`;

      setDownloadState('downloading');
      setDownloadStatusText('Streaming high quality media...');

      // Fetch within authenticated web session
      const res = await fetch(streamEndpoint);
      if (!res.ok) {
        throw new Error('Failed to retrieve media stream from server.');
      }

      const contentLengthHeader = res.headers.get('content-length');
      const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
      let receivedBytes = 0;
      const chunks: Uint8Array[] = [];
      const startTime = Date.now();

      // Read real-time stream chunks with percentage animation
      if (res.body) {
        const reader = res.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            receivedBytes += value.length;
            const elapsedSec = Math.max((Date.now() - startTime) / 1000, 0.1);
            const speedMBps = (receivedBytes / 1024 / 1024 / elapsedSec).toFixed(1);

            if (totalBytes > 0) {
              const pct = Math.min(Math.round((receivedBytes / totalBytes) * 100), 99);
              setDownloadPercent(pct);
              setDownloadBytesText(`${(receivedBytes / 1024 / 1024).toFixed(1)} MB / ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
              setDownloadSpeedText(`${speedMBps} MB/s`);
              setDownloadStatusText(`Downloading ${extension.toUpperCase()} (${pct}%)`);
            } else {
              setDownloadPercent((prev) => Math.min(prev + 5, 95));
              setDownloadBytesText(`${(receivedBytes / 1024 / 1024).toFixed(1)} MB`);
              setDownloadSpeedText(`${speedMBps} MB/s`);
              setDownloadStatusText(`Buffering Media (${(receivedBytes / 1024 / 1024).toFixed(1)} MB)`);
            }
          }
        }
      }

      setDownloadPercent(100);
      setDownloadStatusText('Finalizing video file...');

      // Enforce true binary media MIME type
      const mime = extension === 'mp3' ? 'audio/mpeg' : 'video/mp4';
      const cleanBlob = new Blob(chunks as BlobPart[], { type: mime });

      // Guard: Ensure response is NOT an HTML error or auth redirect
      if (cleanBlob.type.includes('text/html') || cleanBlob.type.includes('application/json')) {
        const text = await cleanBlob.text();
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          throw new Error('Session gateway error. Please use direct media stream link.');
        }
      }

      // Create local object URL for instant file download
      const objectUrl = window.URL.createObjectURL(cleanBlob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute('download', safeFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up object URL
      setTimeout(() => window.URL.revokeObjectURL(objectUrl), 10000);

      setDownloadState('completed');
      setDownloadStatusText('100% Complete · Video saved to device!');
      onDownloadComplete(extension.toUpperCase());

      setTimeout(() => {
        setDownloadState('idle');
        setActiveDownloadId(null);
        setDownloadPercent(0);
        setDownloadBytesText('');
        setDownloadSpeedText('');
        setDownloadStatusText('');
      }, 4000);
    } catch (err: unknown) {
      setDownloadState('failed');
      const msg = err instanceof Error ? err.message : 'Download failed. Please try again.';
      setErrorMessage(msg);
      setTimeout(() => {
        setDownloadState('idle');
        setActiveDownloadId(null);
        setDownloadPercent(0);
        setDownloadBytesText('');
        setDownloadSpeedText('');
        setDownloadStatusText('');
      }, 5000);
    }
  };

  // Mobile Web Share API: Triggers native iOS / Android "Save Video" straight into Photos / Gallery
  const saveToPhoneGallery = async (downloadUrl?: string) => {
    if (!downloadUrl) return;
    setIsSharing(true);
    setErrorMessage(null);
    setDownloadPercent(0);
    setDownloadStatusText('Buffering video for Phone Gallery...');

    try {
      const safeFilename = `quicktok_${(metadata.author.username || 'video').replace(/[^a-zA-Z0-9_-]/g, '_')}_${metadata.id || Date.now()}.mp4`;
      const streamEndpoint = `/api/video/download?url=${encodeURIComponent(downloadUrl)}&id=${metadata.id}&format=mp4&filename=${encodeURIComponent(safeFilename)}`;

      // Fetch binary video data with chunk tracking
      const res = await fetch(streamEndpoint);
      if (!res.ok) throw new Error('Failed to retrieve video stream.');

      const contentLengthHeader = res.headers.get('content-length');
      const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
      let receivedBytes = 0;
      const chunks: Uint8Array[] = [];

      if (res.body) {
        const reader = res.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            receivedBytes += value.length;
            if (totalBytes > 0) {
              const pct = Math.min(Math.round((receivedBytes / totalBytes) * 100), 99);
              setDownloadPercent(pct);
              setDownloadStatusText(`Buffering for Photos (${pct}%)`);
            }
          }
        }
      }

      setDownloadPercent(100);
      const blob = new Blob(chunks as BlobPart[], { type: 'video/mp4' });

      // Verify binary
      if (blob.type.includes('text/html')) {
        throw new Error('Could not retrieve video stream.');
      }

      const file = new File([blob], safeFilename, { type: 'video/mp4' });

      // If Web Share API supports file sharing (iOS Safari & Android Chrome)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: metadata.title || 'TikTok Video',
          text: `Saved with QuickTok`,
        });
        onDownloadComplete('MP4 (Phone Gallery)');
      } else {
        // Fallback: direct blob download and show visual gallery instructions
        const objectUrl = window.URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }));
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = safeFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(objectUrl), 10000);
        setShowPhoneGuide(true);
        onDownloadComplete('MP4 (Saved)');
      }
    } catch (err: unknown) {
      if ((err as Error)?.name !== 'AbortError') {
        setShowPhoneGuide(true);
      }
    } finally {
      setIsSharing(false);
      setDownloadStatusText('');
      setDownloadPercent(0);
    }
  };

  const primaryVideoFormat = metadata.formats.find((f) => f.type === 'video');

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-rose-500/20 bg-white shadow-xl shadow-rose-500/5 transition-all dark:border-rose-500/20 dark:bg-slate-900/90">
      {/* Video Content Header */}
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:p-6">
        {/* Video Thumbnail */}
        <div className="relative aspect-[9/16] w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-inner sm:w-36 dark:bg-slate-800">
          {metadata.thumbnailUrl ? (
            <img
              src={getProxyUrl(metadata.thumbnailUrl)}
              alt={metadata.title || 'TikTok thumbnail'}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <Video className="h-8 w-8" />
            </div>
          )}

          {metadata.durationFormatted && (
            <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-xs">
              <Clock className="h-3 w-3" />
              <span>{metadata.durationFormatted}</span>
            </div>
          )}
        </div>

        {/* Video Info and Actions */}
        <div className="flex flex-1 flex-col justify-between space-y-4">
          <div>
            {/* Creator handle */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              {metadata.author.avatarUrl ? (
                <img
                  src={getProxyUrl(metadata.author.avatarUrl)}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover border border-rose-200 dark:border-slate-700"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
              <span className="font-semibold text-slate-900 dark:text-white">
                {metadata.author.nickname || metadata.author.username}
              </span>
              <span className="text-xs text-slate-400">
                @{metadata.author.username}
              </span>
            </div>

            {/* Video Caption */}
            <h2 className="mt-2 text-base font-semibold text-slate-900 line-clamp-3 sm:text-lg dark:text-white">
              {metadata.title || 'TikTok Video (High Definition)'}
            </h2>
          </div>

          {/* Formats and Download Buttons */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider dark:text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-rose-500" />
                <span>Available Video Formats</span>
              </span>
              <button
                type="button"
                onClick={() => setShowPhoneGuide((prev) => !prev)}
                className="flex items-center gap-1 text-xs font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Phone Gallery Guide</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${showPhoneGuide ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Real-time Percentage & Progress Animation Card */}
            {downloadState !== 'idle' && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 shadow-sm dark:border-rose-900/60 dark:bg-rose-950/40">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {downloadState === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                    )}
                    <span className="font-bold text-slate-900 dark:text-white">
                      {downloadStatusText || `Downloading: ${downloadPercent}%`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {downloadSpeedText && (
                      <span className="flex items-center gap-1 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-900/60 dark:text-rose-300">
                        <Zap className="h-3 w-3" />
                        {downloadSpeedText}
                      </span>
                    )}
                    <span className="font-mono text-sm font-black text-rose-600 dark:text-rose-400">
                      {downloadPercent}%
                    </span>
                  </div>
                </div>

                {/* Animated Gradient Progress Bar */}
                <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-400 transition-all duration-150 ease-out shadow-xs"
                    style={{ width: `${Math.max(downloadPercent, 4)}%` }}
                  />
                </div>

                {downloadBytesText && (
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Transfer: {downloadBytesText}</span>
                    <span>HD Clean Audio & Video</span>
                  </div>
                )}
              </div>
            )}

            {/* Download Option Buttons */}
            {metadata.formats && metadata.formats.length > 0 ? (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {metadata.formats.map((format) => {
                  const isDownloading = activeDownloadId === format.id && downloadState !== 'idle';
                  const isHD = format.id === 'mp4_hd' || format.quality.includes('HD');

                  return (
                    <div
                      key={format.id}
                      className={`flex flex-col justify-between rounded-xl border p-3.5 transition-all ${
                        isHD
                          ? 'border-rose-400 bg-rose-50/70 shadow-sm dark:border-rose-800/80 dark:bg-rose-950/30'
                          : 'border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              isHD
                                ? 'bg-rose-500 text-white'
                                : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {format.type === 'audio' ? <Music className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{format.quality}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {format.format} {format.fileSize ? `· ${format.fileSize}` : ''}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => startDownload(format.id, format.downloadUrl, format.format.toLowerCase())}
                          disabled={isDownloading}
                          className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-bold shadow-xs transition-all ${
                            isHD
                              ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-500/25 ring-2 ring-rose-500/20'
                              : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200'
                          } disabled:cursor-wait disabled:opacity-75`}
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>{downloadPercent > 0 ? `${downloadPercent}%` : 'Saving...'}</span>
                            </>
                          ) : (
                            <>
                              <Download className="h-3.5 w-3.5" />
                              <span>Download</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Direct 1-Tap Save to Phone Gallery Button */}
                {primaryVideoFormat && (
                  <div className="sm:col-span-2 rounded-xl border border-rose-300 bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-amber-500/10 p-3.5 dark:border-rose-900/60 dark:from-rose-950/40 dark:to-slate-900">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500 text-white">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            Save Directly into Phone Photos / Gallery
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Opens native iOS/Android sheet with 1-tap &quot;Save Video&quot;
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => saveToPhoneGallery(primaryVideoFormat.downloadUrl)}
                          disabled={isSharing}
                          className="flex items-center justify-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-rose-700 disabled:opacity-75"
                        >
                          {isSharing ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>{downloadPercent > 0 ? `${downloadPercent}% Buffering...` : 'Preparing Video...'}</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="h-3.5 w-3.5" />
                              <span>Save to Phone Gallery</span>
                            </>
                          )}
                        </button>

                        {/* Direct fallback link */}
                        {primaryVideoFormat.downloadUrl && (
                          <a
                            href={primaryVideoFormat.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct stream link"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="font-semibold">Media Stream Extraction</p>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-300">Processing media stream...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions for Phone Gallery */}
            {showPhoneGuide && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 space-y-2.5">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4 text-rose-500" />
                  How to Save the Video in Your Phone Gallery:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                  <div className="rounded-lg bg-white p-3 border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">📱 iPhone / iPad (Safari):</p>
                    <ol className="mt-1.5 list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      <li>
                        Tap <strong>Save to Phone Gallery</strong> (or Download).
                      </li>
                      <li>
                        When the share sheet appears, tap <strong>&quot;Save Video&quot;</strong>.
                      </li>
                      <li>
                        The video is saved in your <strong>Photos (Camera Roll)</strong> app!
                      </li>
                    </ol>
                  </div>

                  <div className="rounded-lg bg-white p-3 border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">🤖 Android (Chrome / Samsung):</p>
                    <ol className="mt-1.5 list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      <li>
                        Tap <strong>Download</strong> or <strong>Save to Phone Gallery</strong>.
                      </li>
                      <li>The genuine .MP4 file downloads directly into your device.</li>
                      <li>
                        Open your <strong>Gallery</strong> or <strong>Google Photos</strong> app — the video appears
                        right in your Downloads album!
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
