import { useState, useRef, useCallback } from 'react';

// Re-export storage functions from the new modular structure
export type { RecordedMedia } from './media';
export { 
  saveRecordingToDB, 
  getRecordingsFromDB, 
  deleteRecordingFromDB,
  // Type-specific exports
  saveAudioToDB,
  getAudioFromDB,
  deleteAudioFromDB,
  saveVideoToDB,
  getVideoFromDB,
  deleteVideoFromDB
} from './media';

import { RecordedMedia } from './media';

export const useMediaRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video' | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const recordingTypeRef = useRef<'audio' | 'video' | null>(null);

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
      recordingTypeRef.current = type;
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
      const currentType = recordingTypeRef.current || 'audio';
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        const url = URL.createObjectURL(blob);
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        
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
          type: currentType,
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
