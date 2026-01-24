import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Play, Pause, Trash2, Music, Heart, 
  Star, Clock, Lock, X, Volume2, ChevronRight
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { useMediaRecorder, RecordedMedia } from '@/hooks/useMediaRecorder';
import { openDB } from '@/hooks/media/db';

const SECRET_PASSWORD = 'Anjalisajan';
const DB_STORE = 'recordings';

interface Song {
  id: string;
  title: string;
  artist: string;
  emoji: string;
  genre: string;
  lyrics: string[];
  duration: string;
}

const songs: Song[] = [
  {
    id: 'tum-hi-ho',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    emoji: '💕',
    genre: 'Romantic',
    duration: '4:22',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Sing along with your heart ♪",
      "💕 This song is about eternal love 💕",
      "",
      "🎤 Record your beautiful voice! 🎤",
    ]
  },
  {
    id: 'raabta',
    title: 'Raabta',
    artist: 'Arijit Singh',
    emoji: '🌙',
    genre: 'Romantic',
    duration: '4:45',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ A song about destined connections ♪",
      "🌙 Let the melody guide you 🌙",
      "",
      "🎤 Record your version! 🎤",
    ]
  },
  {
    id: 'kal-ho-naa-ho',
    title: 'Kal Ho Naa Ho',
    artist: 'Sonu Nigam',
    emoji: '⭐',
    genre: 'Emotional',
    duration: '5:20',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Live every moment fully ♪",
      "⭐ An iconic emotional ballad ⭐",
      "",
      "🎤 Sing from the heart! 🎤",
    ]
  },
  {
    id: 'tujhe-dekha',
    title: 'Tujhe Dekha To',
    artist: 'Kumar Sanu & Lata',
    emoji: '🎬',
    genre: 'Classic',
    duration: '5:45',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ A classic Bollywood romance ♪",
      "🎬 From DDLJ - timeless love 🎬",
      "",
      "🎤 Create your duet! 🎤",
    ]
  },
  {
    id: 'pehla-nasha',
    title: 'Pehla Nasha',
    artist: 'Udit Narayan',
    emoji: '🦋',
    genre: 'Classic',
    duration: '5:10',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ First love feelings ♪",
      "🦋 A timeless classic 🦋",
      "",
      "🎤 Record your rendition! 🎤",
    ]
  },
  {
    id: 'channa-mereya',
    title: 'Channa Mereya',
    artist: 'Arijit Singh',
    emoji: '💔',
    genre: 'Emotional',
    duration: '4:49',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ A heart-touching farewell song ♪",
      "💔 Feel every emotion 💔",
      "",
      "🎤 Pour your heart out! 🎤",
    ]
  },
  {
    id: 'mere-haath-mein',
    title: 'Mere Haath Mein',
    artist: 'Sonu Nigam',
    emoji: '🤝',
    genre: 'Romantic',
    duration: '5:15',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Hand in hand forever ♪",
      "🤝 A beautiful promise song 🤝",
      "",
      "🎤 Sing it for your love! 🎤",
    ]
  },
  {
    id: 'kabira',
    title: 'Kabira',
    artist: 'Arijit Singh & Harshdeep',
    emoji: '🎭',
    genre: 'Soulful',
    duration: '3:42',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ A soulful masterpiece ♪",
      "🎭 Deep and meaningful 🎭",
      "",
      "🎤 Express your soul! 🎤",
    ]
  },
  {
    id: 'tera-ban-jaunga',
    title: 'Tera Ban Jaunga',
    artist: 'Akhil & Tulsi Kumar',
    emoji: '💑',
    genre: 'Romantic',
    duration: '3:56',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ I'll become yours ♪",
      "💑 Pure romantic devotion 💑",
      "",
      "🎤 Dedicate this to someone! 🎤",
    ]
  },
  {
    id: 'tere-sang-yaara',
    title: 'Tere Sang Yaara',
    artist: 'Atif Aslam',
    emoji: '🌅',
    genre: 'Romantic',
    duration: '4:31',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ With you, my friend ♪",
      "🌅 A beautiful journey together 🌅",
      "",
      "🎤 Record your version! 🎤",
    ]
  },
  {
    id: 'kuch-kuch',
    title: 'Kuch Kuch Hota Hai',
    artist: 'Udit & Alka',
    emoji: '💝',
    genre: 'Classic',
    duration: '5:24',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Something happens in the heart ♪",
      "💝 Iconic 90s romance 💝",
      "",
      "🎤 Relive the magic! 🎤",
    ]
  },
  {
    id: 'ae-dil-hai-mushkil',
    title: 'Ae Dil Hai Mushkil',
    artist: 'Arijit Singh',
    emoji: '💫',
    genre: 'Emotional',
    duration: '4:29',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Oh heart, it's difficult ♪",
      "💫 Love and longing 💫",
      "",
      "🎤 Sing with passion! 🎤",
    ]
  },
  {
    id: 'gerua',
    title: 'Gerua',
    artist: 'Arijit Singh & Antara',
    emoji: '🧡',
    genre: 'Romantic',
    duration: '5:48',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Color me in your love ♪",
      "🧡 Vibrant and passionate 🧡",
      "",
      "🎤 Feel the colors! 🎤",
    ]
  },
  {
    id: 'hawayein',
    title: 'Hawayein',
    artist: 'Arijit Singh',
    emoji: '🌊',
    genre: 'Romantic',
    duration: '4:50',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ The winds bring your memories ♪",
      "🌊 Gentle and soothing 🌊",
      "",
      "🎤 Let it flow! 🎤",
    ]
  },
  {
    id: 'bekhayali',
    title: 'Bekhayali',
    artist: 'Sachet Tandon',
    emoji: '🔥',
    genre: 'Intense',
    duration: '3:55',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Lost in thoughts of you ♪",
      "🔥 Intense and powerful 🔥",
      "",
      "🎤 Feel the intensity! 🎤",
    ]
  },
  {
    id: 'kesariya',
    title: 'Kesariya',
    artist: 'Arijit Singh',
    emoji: '🌸',
    genre: 'Romantic',
    duration: '4:28',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Your love colors me saffron ♪",
      "🌸 Modern romantic classic 🌸",
      "",
      "🎤 Sing with love! 🎤",
    ]
  },
  {
    id: 'dil-diyan-gallan',
    title: 'Dil Diyan Gallan',
    artist: 'Atif Aslam',
    emoji: '💗',
    genre: 'Romantic',
    duration: '4:40',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Words from the heart ♪",
      "💗 Sweet and melodious 💗",
      "",
      "🎤 Express your feelings! 🎤",
    ]
  },
  {
    id: 'janam-janam',
    title: 'Janam Janam',
    artist: 'Arijit Singh & Antara',
    emoji: '♾️',
    genre: 'Romantic',
    duration: '5:16',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Lifetime after lifetime ♪",
      "♾️ Eternal love promise ♾️",
      "",
      "🎤 A timeless dedication! 🎤",
    ]
  },
  {
    id: 'lag-ja-gale',
    title: 'Lag Ja Gale',
    artist: 'Lata Mangeshkar',
    emoji: '🌹',
    genre: 'Classic',
    duration: '4:05',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ Hold me close tonight ♪",
      "🌹 Timeless classic 🌹",
      "",
      "🎤 A legendary song! 🎤",
    ]
  },
  {
    id: 'tera-hone-laga',
    title: 'Tera Hone Laga Hoon',
    artist: 'Atif Aslam & Alisha',
    emoji: '🌟',
    genre: 'Romantic',
    duration: '4:27',
    lyrics: [
      "🎵 Search for lyrics online 🎵",
      "♪ I'm becoming yours ♪",
      "🌟 Sweet surrender 🌟",
      "",
      "🎤 Sing with joy! 🎤",
    ]
  },
];

interface KaraokeRecording {
  id: string;
  songId: string;
  blob: Blob;
  url: string;
  timestamp: number;
  duration: number;
}

// Save karaoke recording to IndexedDB
const saveKaraokeRecording = async (recording: KaraokeRecording): Promise<void> => {
  const buffer = await recording.blob.arrayBuffer();
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE, 'readwrite');
    const store = transaction.objectStore(DB_STORE);
    
    const record = {
      id: recording.id,
      letterId: `karaoke_${recording.songId}`,
      type: 'audio',
      data: buffer,
      mimeType: recording.blob.type,
      timestamp: recording.timestamp,
      duration: recording.duration
    };
    
    const request = store.put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Get karaoke recordings from IndexedDB
const getKaraokeRecordings = async (): Promise<KaraokeRecording[]> => {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE, 'readonly');
    const store = transaction.objectStore(DB_STORE);
    const results: KaraokeRecording[] = [];
    
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        if (cursor.value.letterId?.startsWith('karaoke_')) {
          const blob = new Blob([cursor.value.data], { type: cursor.value.mimeType });
          const songId = cursor.value.letterId.replace('karaoke_', '');
          results.push({
            id: cursor.value.id,
            songId,
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

// Delete karaoke recording
const deleteKaraokeRecording = async (recordId: string): Promise<void> => {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DB_STORE, 'readwrite');
    const store = transaction.objectStore(DB_STORE);
    const request = store.delete(recordId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Password Modal Component
const PasswordModal = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === SECRET_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: error ? [1, 1.02, 0.98, 1] : 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-purple-900 to-pink-900 rounded-2xl p-6 w-full max-w-sm border border-pink-400/30"
      >
        <div className="text-center mb-4">
          <Lock className="w-12 h-12 text-pink-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-pink-100">Enter Password</h3>
          <p className="text-pink-300/70 text-sm">Required to delete recordings</p>
        </div>
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter password..."
          className={`w-full bg-pink-500/20 border rounded-xl px-4 py-3 text-white placeholder-pink-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4 ${
            error ? 'border-red-500 animate-shake' : 'border-pink-400/30'
          }`}
          autoFocus
        />
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-white/10 text-white py-3 rounded-xl font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// Song Card Component
const SongCard = ({ 
  song, 
  recordings, 
  onSelect 
}: { 
  song: Song; 
  recordings: KaraokeRecording[];
  onSelect: () => void;
}) => {
  const hasRecording = recordings.some(r => r.songId === song.id);
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-pink-400/20 text-left relative overflow-hidden"
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{song.emoji}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-pink-100 font-semibold truncate">{song.title}</h4>
          <p className="text-pink-300/70 text-sm truncate">{song.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          {hasRecording && (
            <div className="bg-green-500/30 p-1.5 rounded-full">
              <Mic className="w-3 h-3 text-green-400" />
            </div>
          )}
          <div className="text-pink-300/50 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {song.duration}
          </div>
          <ChevronRight className="w-5 h-5 text-pink-300/50" />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-xs bg-pink-500/30 text-pink-200 px-2 py-0.5 rounded-full">
          {song.genre}
        </span>
      </div>
    </motion.button>
  );
};

// Karaoke Player Modal
const KaraokePlayer = ({ 
  song, 
  recordings,
  onClose,
  onSave,
  onDelete
}: { 
  song: Song;
  recordings: KaraokeRecording[];
  onClose: () => void;
  onSave: (recording: KaraokeRecording) => void;
  onDelete: (id: string) => void;
}) => {
  const { isRecording, recordingTime, startRecording, stopRecording, cancelRecording } = useMediaRecorder();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const songRecordings = recordings.filter(r => r.songId === song.id);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentLyricIndex(prev => (prev + 1) % song.lyrics.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, song.lyrics.length]);

  const handleStartRecording = async () => {
    try {
      await startRecording('audio');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const media = await stopRecording();
      const karaokeRecording: KaraokeRecording = {
        id: `karaoke_${song.id}_${Date.now()}`,
        songId: song.id,
        blob: media.blob,
        url: media.url,
        timestamp: Date.now(),
        duration: media.duration
      };
      onSave(karaokeRecording);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const requestDelete = (id: string) => {
    setPendingDeleteId(id);
    setShowPasswordModal(true);
  };

  const handleDeleteConfirmed = () => {
    if (pendingDeleteId) {
      onDelete(pendingDeleteId);
      setPendingDeleteId(null);
    }
    setShowPasswordModal(false);
  };

  const playRecording = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(url);
    audioRef.current.play();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-purple-950 via-pink-950 to-black z-[9998] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-black/50 backdrop-blur-lg p-4 flex items-center justify-between z-10">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
          <X className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-lg font-bold text-pink-100">🎤 Karaoke</h2>
        <div className="w-10" />
      </div>

      <div className="p-4 pb-32">
        {/* Song Info */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-3"
          >
            {song.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-1">{song.title}</h3>
          <p className="text-pink-300">{song.artist}</p>
        </div>

        {/* Lyrics Display */}
        <div className="bg-black/30 rounded-2xl p-6 mb-6 min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLyricIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {song.lyrics.slice(currentLyricIndex, currentLyricIndex + 3).map((line, idx) => (
                <p 
                  key={idx}
                  className={`text-lg mb-2 transition-all ${
                    idx === 0 
                      ? 'text-white font-bold text-xl' 
                      : idx === 1 
                        ? 'text-pink-200' 
                        : 'text-pink-300/50'
                  }`}
                >
                  {line || '♪ ♪ ♪'}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lyrics Control */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentLyricIndex(prev => Math.max(0, prev - 1))}
            className="bg-white/10 px-4 py-2 rounded-xl text-white text-sm"
          >
            ← Prev
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-6 py-2 rounded-xl font-medium ${
              isPlaying ? 'bg-pink-500 text-white' : 'bg-white/20 text-white'
            }`}
          >
            {isPlaying ? 'Pause Scroll' : 'Auto Scroll'}
          </button>
          <button
            onClick={() => setCurrentLyricIndex(prev => Math.min(song.lyrics.length - 1, prev + 1))}
            className="bg-white/10 px-4 py-2 rounded-xl text-white text-sm"
          >
            Next →
          </button>
        </div>

        {/* Recording Controls */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-6 border border-pink-400/30">
          <h4 className="text-pink-100 font-semibold mb-4 text-center">Record Your Performance</h4>
          
          {isRecording ? (
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                  <Mic className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <p className="text-white text-2xl font-mono mb-4">{formatTime(recordingTime)}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={cancelRecording}
                  className="bg-white/20 px-6 py-3 rounded-xl text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStopRecording}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-xl text-white font-semibold"
                >
                  Save Recording
                </button>
              </div>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartRecording}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Mic className="w-5 h-5" />
              Start Recording
            </motion.button>
          )}
        </div>

        {/* Saved Recordings */}
        {songRecordings.length > 0 && (
          <div className="bg-white/5 rounded-2xl p-4 border border-pink-400/20">
            <h4 className="text-pink-100 font-semibold mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Your Recordings ({songRecordings.length})
            </h4>
            <div className="space-y-2">
              {songRecordings.map((recording) => (
                <div
                  key={recording.id}
                  className="flex items-center justify-between bg-pink-500/10 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => playRecording(recording.url)}
                      className="bg-pink-500 p-2 rounded-full"
                    >
                      <Play className="w-4 h-4 text-white" />
                    </button>
                    <div>
                      <p className="text-pink-100 text-sm">
                        {new Date(recording.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-pink-300/70 text-xs">
                        {recording.duration}s
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => requestDelete(recording.id)}
                    className="p-2 hover:bg-red-500/20 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal
            onSuccess={handleDeleteConfirmed}
            onCancel={() => {
              setShowPasswordModal(false);
              setPendingDeleteId(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  );
};

export const KaraokeSection: React.FC = () => {
  const [recordings, setRecordings] = useState<KaraokeRecording[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const loaded = await getKaraokeRecordings();
      setRecordings(loaded);
    } catch (error) {
      console.error('Failed to load recordings:', error);
    }
  };

  const handleSave = async (recording: KaraokeRecording) => {
    try {
      await saveKaraokeRecording(recording);
      setRecordings(prev => [...prev, recording]);
    } catch (error) {
      console.error('Failed to save recording:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteKaraokeRecording(id);
      setRecordings(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Failed to delete recording:', error);
    }
  };

  const genres = [...new Set(songs.map(s => s.genre))];

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block text-4xl mb-2"
        >
          🎤
        </motion.div>
        <h3 className="text-xl font-serif text-pink-300">Karaoke Night</h3>
        <p className="text-pink-200/70 text-sm">Sing your heart out for me! 💕</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Music className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search songs..."
          className="w-full bg-pink-500/20 border border-pink-400/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-pink-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Genre Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSelectedGenre(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            !selectedGenre ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-200'
          }`}
        >
          All Songs
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedGenre === genre ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-200'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 py-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-pink-100">{songs.length}</p>
          <p className="text-pink-300/70 text-xs">Songs</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-pink-100">{recordings.length}</p>
          <p className="text-pink-300/70 text-xs">Recordings</p>
        </div>
      </div>

      {/* Song List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            recordings={recordings}
            onSelect={() => setSelectedSong(song)}
          />
        ))}
      </div>

      {/* Karaoke Player Modal */}
      <AnimatePresence>
        {selectedSong && (
          <KaraokePlayer
            song={selectedSong}
            recordings={recordings}
            onClose={() => setSelectedSong(null)}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
