// Main export file for media storage
export type { RecordedMedia } from './db';
export { openDB } from './db';
export { saveAudioToDB, getAudioFromDB, deleteAudioFromDB } from './audioStorage';
export { saveVideoToDB, getVideoFromDB, deleteVideoFromDB } from './videoStorage';

// Combined utilities for backward compatibility
import { saveAudioToDB } from './audioStorage';
import { saveVideoToDB } from './videoStorage';
import { getAudioFromDB } from './audioStorage';
import { getVideoFromDB } from './videoStorage';
import { deleteAudioFromDB } from './audioStorage';
import { deleteVideoFromDB } from './videoStorage';
import { RecordedMedia } from './db';

// Unified save function that routes to correct storage
export const saveRecordingToDB = async (letterId: string, media: RecordedMedia): Promise<void> => {
  if (media.type === 'audio') {
    return saveAudioToDB(letterId, media);
  } else {
    return saveVideoToDB(letterId, media);
  }
};

// Unified get function that fetches both types
export const getRecordingsFromDB = async (letterId: string): Promise<RecordedMedia[]> => {
  const [audio, video] = await Promise.all([
    getAudioFromDB(letterId),
    getVideoFromDB(letterId)
  ]);
  return [...audio, ...video];
};

// Unified delete function
export const deleteRecordingFromDB = async (recordId: string): Promise<void> => {
  // Since we don't know the type, we just delete by ID (works for both)
  return deleteAudioFromDB(recordId); // Same operation for both
};
