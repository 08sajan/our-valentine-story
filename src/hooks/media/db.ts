// Shared IndexedDB utilities for media storage

export interface RecordedMedia {
  id: string;
  type: 'audio' | 'video';
  blob: Blob;
  url: string;
  timestamp: number;
  duration: number;
}

const DB_NAME = 'valentineMediaDB';
const STORE_NAME = 'recordings';

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const STORE_NAME_EXPORT = STORE_NAME;
