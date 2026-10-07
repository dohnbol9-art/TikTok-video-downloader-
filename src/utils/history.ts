import { HistoryItem } from '../types';

const STORAGE_KEY = 'quicktok_download_history_v1';
const MAX_HISTORY_ITEMS = 30;

export function getDownloadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDownloadToHistory(item: {
  url: string;
  title: string;
  author: string;
  format: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
}): HistoryItem {
  const current = getDownloadHistory();
  const newItem: HistoryItem = {
    id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    ...item,
  };

  // Prepend and filter duplicates of the same URL & format
  const filtered = current.filter(i => !(i.url === item.url && i.format === item.format));
  const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }

  return newItem;
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  const current = getDownloadHistory();
  const updated = current.filter(i => i.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not update localStorage', e);
  }
  return updated;
}

export function clearDownloadHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear localStorage', e);
  }
}
