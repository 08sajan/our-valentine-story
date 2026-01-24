// Audio-specific storage operations
import { openDB, STORE_NAME_EXPORT, RecordedMedia } from './db';

export const saveAudioToDB = async (letterId: string, media: RecordedMedia): Promise<void> => {
  if (media.type !== 'audio') {
    throw new Error('This function only handles audio recordings');
  }
  
  const buffer = await media.blob.arrayBuffer();
  
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME_EXPORT, 'readwrite');
    const store = transaction.objectStore(STORE_NAME_EXPORT);
    
    const record = {
      id: media.id || `${letterId}_audio_${Date.now()}`,
      letterId,
      type: 'audio',
      data: buffer,
      mimeType: media.blob.type,
      timestamp: media.timestamp,
      duration: media.duration
    };
    
    const request = store.put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getAudioFromDB = async (letterId: string): Promise<RecordedMedia[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME_EXPORT, 'readonly');
    const store = transaction.objectStore(STORE_NAME_EXPORT);
    const results: RecordedMedia[] = [];
    
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        if (cursor.value.letterId === letterId && cursor.value.type === 'audio') {
          const blob = new Blob([cursor.value.data], { type: cursor.value.mimeType });
          results.push({
            id: cursor.value.id,
            type: 'audio',
            blob,
            url: URL.createObjectURL(blob),
            timestamp: cursor.value.timestamp,
            duration: cursor.value.duration
          });
        }
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

export const deleteAudioFromDB = async (recordId: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME_EXPORT, 'readwrite');
    const store = transaction.objectStore(STORE_NAME_EXPORT);
    const request = store.delete(recordId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
