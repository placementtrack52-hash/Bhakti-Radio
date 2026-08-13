// Shared utility for localStorage with type safety
const PREFIX = 'bhakti_';

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {}
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {}
  },

  // Add song ID to a capped list
  pushToList(key: string, id: number, maxLength = 20): void {
    const current = this.get<number[]>(key, []);
    const filtered = current.filter((i) => i !== id);
    this.set(key, [id, ...filtered].slice(0, maxLength));
  },

  isBookmarked(id: number): boolean {
    const list = this.get<number[]>('bookmarks', []);
    return list.includes(id);
  },

  toggleBookmark(id: number): boolean {
    const list = this.get<number[]>('bookmarks', []);
    if (list.includes(id)) {
      this.set('bookmarks', list.filter((i) => i !== id));
      return false;
    } else {
      this.set('bookmarks', [id, ...list]);
      return true;
    }
  },
};
