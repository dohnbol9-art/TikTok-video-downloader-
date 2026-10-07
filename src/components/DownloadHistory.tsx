import React from 'react';
import { HistoryItem } from '../types';
import { X, Trash2, ExternalLink, Video, Clock } from 'lucide-react';

interface DownloadHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const DownloadHistory: React.FC<DownloadHistoryProps> = ({
  isOpen,
  onClose,
  history,
  onDeleteItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const getProxyUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('/') || url.startsWith('blob:')) return url;
    return `/api/video/proxy-image?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:p-5 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Download History
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({history.length} {history.length === 1 ? 'item' : 'items'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 dark:text-slate-400">
              <Clock className="h-10 w-10 stroke-1 text-slate-400" />
              <p className="mt-3 text-sm font-medium">No download history yet</p>
              <p className="mt-1 text-xs text-slate-400">
                Downloaded items are stored locally in your browser only.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700"
                >
                  {/* Thumbnail / Icon */}
                  <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                    {item.thumbnailUrl ? (
                      <img
                        src={getProxyUrl(item.thumbnailUrl)}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <Video className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* Title and metadata */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{item.author}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{item.format}</span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open original video"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      title="Delete from history"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/60 dark:hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-center text-[11px] text-slate-500 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
          History is stored locally in your browser storage and never uploaded to our servers.
        </div>
      </div>
    </div>
  );
};
