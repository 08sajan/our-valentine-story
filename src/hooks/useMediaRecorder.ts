import { useState, useRef, useCallback } from 'react';

export interface RecordedMedia {
  id: string;
  type: 'audio' | 'video';
  blob: Blob;
  url: string;
  timestamp: number;
  duration: number;
}

// IndexedDB for persistent storage
const DB_NAME = 'valentineMediaDB';
const STORE_NAME = 'recordings';

const openDB = (): Promise<IDBDatabase> => {
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

export const saveRecordingToDB = async (letterId: string, media: RecordedMedia): Promise<void> => {
  // Convert blob to array buffer BEFORE opening transaction
  const buffer = await media.blob.arrayBuffer();
  
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const record = {
      id: media.id || `${letterId}_${media.type}_${Date.now()}`,
      letterId,
      type: media.type,
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

export const getRecordingsFromDB = async (letterId: string): Promise<RecordedMedia[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const results: RecordedMedia[] = [];
    
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        if (cursor.value.letterId === letterId) {
          const blob = new Blob([cursor.value.data], { type: cursor.value.mimeType });
          results.push({
            id: cursor.value.id,
            type: cursor.value.type,
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

export const deleteRecordingFromDB = async (recordId: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(recordId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const useMediaRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video' | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const recordingTypeRef = useRef<'audio' | 'video' | null>(null); // Fix: use ref to track type

  const startRecording = useCallback(async (type: 'audio' | 'video'): Promise<void> => {
    try {
      const constraints: MediaStreamConstraints = type === 'video' 
        ? { audio: true, video: { facingMode: 'user', width: 640, height: 480 } }
        : { audio: true };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setPreviewStream(stream);
      
      const mimeType = type === 'video' 
        ? (MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4')
        : (MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4');
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.start(100);
      startTimeRef.current = Date.now();
      recordingTypeRef.current = type; // Fix: store in ref
      setIsRecording(true);
      setRecordingType(type);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }, []);

  const stopRecording = useCallback((): Promise<RecordedMedia> => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorderRef.current) {
        reject(new Error('No recording in progress'));
        return;
      }
      
      const mediaRecorder = mediaRecorderRef.current;
      const currentType = recordingTypeRef.current || 'audio'; // Fix: use ref value
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        const url = URL.createObjectURL(blob);
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        
        // Stop all tracks
        mediaRecorderRef.current = null;
        
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        
        setIsRecording(false);
        setRecordingType(null);
        setRecordingTime(0);
        recordingTypeRef.current = null;
        
        resolve({
          id: `recording_${Date.now()}`,
          type: currentType, // Fix: use captured ref value
          blob,
          url,
          timestamp: Date.now(),
          duration
        });
      };
      
      mediaRecorder.stop();
    });
  }, []);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (previewStream) {
      previewStream.getTracks().forEach(track => track.stop());
    }
    setPreviewStream(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    setRecordingType(null);
    setRecordingTime(0);
    chunksRef.current = [];
  }, [isRecording, previewStream]);

  return {
    isRecording,
    recordingType,
    recordingTime,
    previewStream,
    startRecording,
    stopRecording,
    cancelRecording
  };
};
