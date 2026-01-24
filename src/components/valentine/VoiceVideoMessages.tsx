import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Video, Play, Pause, Trash2, X, Square, Clock, Heart, Sparkles } from "lucide-react";
import ReactDOM from "react-dom";
import { useMediaRecorder, RecordedMedia, saveRecordingToDB, getRecordingsFromDB, deleteRecordingFromDB } from "@/hooks/useMediaRecorder";

interface StoredMessage {
  id: string;
  type: 'audio' | 'video';
  title: string;
  blob: Blob;
  url: string;
  timestamp: number;
  duration: number;
}

const STORAGE_KEY = 'voice-video-messages';

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Recording Modal
const RecordingModal = ({
  type,
  onClose,
  onSave
}: {
  type: 'audio' | 'video';
  onClose: () => void;
  onSave: (media: RecordedMedia, title: string) => void;
}) => {
  const { isRecording, recordingTime, previewStream, startRecording, stopRecording, cancelRecording } = useMediaRecorder();
  const [recordedMedia, setRecordedMedia] = useState<RecordedMedia | null>(null);
  const [title, setTitle] = useState('');
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const playbackRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  useEffect(() => {
    if (previewStream && videoPreviewRef.current && type === 'video') {
      videoPreviewRef.current.srcObject = previewStream;
    }
  }, [previewStream, type]);

  const handleStart = async () => {
    try {
      await startRecording(type);
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Could not access camera/microphone. Please grant permission.');
    }
  };

  const handleStop = async () => {
    try {
      const media = await stopRecording();
      // Stop preview stream tracks
      if (previewStream) {
        previewStream.getTracks().forEach(track => track.stop());
      }
      setRecordedMedia(media);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const handleSave = () => {
    if (recordedMedia && title.trim()) {
      onSave(recordedMedia, title.trim());
    }
  };

  const handleCancel = () => {
    cancelRecording();
    if (recordedMedia?.url) {
      URL.revokeObjectURL(recordedMedia.url);
    }
    onClose();
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
      onClick={handleCancel}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gradient-to-b from-pink-900/50 to-rose-900/50 rounded-3xl p-6 max-w-md w-full border border-pink-500/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-pink-300">
            {type === 'video' ? '🎬 Record Video' : '🎤 Record Audio'} Message
          </h3>
          <button onClick={handleCancel} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Preview Area */}
        <div className="relative aspect-video bg-black/50 rounded-2xl overflow-hidden mb-4">
          {type === 'video' && previewStream && (
            <video
              ref={videoPreviewRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          
          {type === 'audio' && isRecording && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Mic size={48} className="text-white" />
              </motion.div>
            </div>
          )}

          {recordedMedia && (
            type === 'video' ? (
              <video
                ref={playbackRef as React.RefObject<HTMLVideoElement>}
                src={recordedMedia.url}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                  <Mic size={40} className="text-white" />
                </div>
                <audio ref={playbackRef as React.RefObject<HTMLAudioElement>} src={recordedMedia.url} controls className="w-full max-w-xs" />
              </div>
            )
          )}

          {!isRecording && !recordedMedia && (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
              {type === 'video' ? 'Camera preview will appear here' : 'Ready to record'}
            </div>
          )}

          {/* Recording timer */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 px-3 py-1.5 rounded-full">
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <span className="text-white text-sm font-medium">{formatDuration(recordingTime)}</span>
            </div>
          )}
        </div>

        {/* Title input for recorded media */}
        {recordedMedia && (
          <input
            type="text"
            placeholder="Give your message a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/10 border border-pink-500/30 rounded-xl px-4 py-3 text-white placeholder:text-white/50 mb-4 focus:outline-none focus:border-pink-500"
          />
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isRecording && !recordedMedia && (
            <motion.button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type === 'video' ? <Video size={20} /> : <Mic size={20} />}
              Start Recording
            </motion.button>
          )}

          {isRecording && (
            <motion.button
              onClick={handleStop}
              className="px-8 py-4 bg-red-500 rounded-full text-white font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Square size={20} />
              Stop Recording
            </motion.button>
          )}

          {recordedMedia && (
            <>
              <motion.button
                onClick={() => setRecordedMedia(null)}
                className="px-6 py-3 bg-white/10 rounded-full text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Re-record
              </motion.button>
              <motion.button
                onClick={handleSave}
                disabled={!title.trim()}
                className={`px-6 py-3 rounded-full text-white font-medium flex items-center gap-2 ${
                  title.trim() ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-white/20 cursor-not-allowed'
                }`}
                whileHover={title.trim() ? { scale: 1.05 } : {}}
                whileTap={title.trim() ? { scale: 0.95 } : {}}
              >
                <Heart size={20} />
                Save Message
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// Message Player Modal
const PlayerModal = ({
  message,
  onClose,
  onDelete
}: {
  message: StoredMessage;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      {/* Floating hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['💕', '💖', '✨', '🎤', '🎬'][i % 5]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gradient-to-b from-pink-900/50 to-rose-900/50 rounded-3xl p-6 max-w-lg w-full border border-pink-500/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-serif text-pink-300">{message.title}</h3>
            <p className="text-white/50 text-sm flex items-center gap-2">
              <Clock size={14} />
              {formatDate(message.timestamp)} • {formatDuration(message.duration)}
            </p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Media Player */}
        <div className="relative aspect-video bg-black/50 rounded-2xl overflow-hidden mb-4">
          {message.type === 'video' ? (
            <video
              src={message.url}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                className="w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mic size={48} className="text-white" />
              </motion.div>
              <audio src={message.url} controls autoPlay className="w-full max-w-xs" />
            </div>
          )}
        </div>

        {/* Delete Button */}
        <motion.button
          onClick={onDelete}
          className="w-full py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-medium flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Trash2 size={18} />
          Delete Message
        </motion.button>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const VoiceVideoMessages = () => {
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [recordingType, setRecordingType] = useState<'audio' | 'video' | null>(null);
  const [viewingMessage, setViewingMessage] = useState<StoredMessage | null>(null);

  // Load messages from IndexedDB on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const stored = await getRecordingsFromDB('voicevideo');
        // Also load titles from localStorage
        const titlesJson = localStorage.getItem(`${STORAGE_KEY}-titles`);
        const titles: Record<string, string> = titlesJson ? JSON.parse(titlesJson) : {};
        
        const loadedMessages: StoredMessage[] = stored.map(m => ({
          ...m,
          title: titles[m.id] || `Message ${new Date(m.timestamp).toLocaleDateString()}`
        }));
        
        setMessages(loadedMessages.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };
    loadMessages();
  }, []);

  const handleSave = async (media: RecordedMedia, title: string) => {
    const newMessage: StoredMessage = {
      ...media,
      id: `voicevideo_${media.type}_${Date.now()}`,
      title
    };

    // Save to IndexedDB
    await saveRecordingToDB('voicevideo', { ...media, id: newMessage.id });
    
    // Save title to localStorage
    const titlesJson = localStorage.getItem(`${STORAGE_KEY}-titles`);
    const titles: Record<string, string> = titlesJson ? JSON.parse(titlesJson) : {};
    titles[newMessage.id] = title;
    localStorage.setItem(`${STORAGE_KEY}-titles`, JSON.stringify(titles));

    setMessages(prev => [newMessage, ...prev]);
    setRecordingType(null);
  };

  const handleDelete = async (id: string) => {
    await deleteRecordingFromDB(id);
    
    // Remove title from localStorage
    const titlesJson = localStorage.getItem(`${STORAGE_KEY}-titles`);
    const titles: Record<string, string> = titlesJson ? JSON.parse(titlesJson) : {};
    delete titles[id];
    localStorage.setItem(`${STORAGE_KEY}-titles`, JSON.stringify(titles));

    // Revoke URL
    const message = messages.find(m => m.id === id);
    if (message?.url) {
      URL.revokeObjectURL(message.url);
    }

    setMessages(prev => prev.filter(m => m.id !== id));
    setViewingMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          className="text-4xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎤💕🎬
        </motion.div>
        <h3 className="text-xl font-serif text-pink-300">Voice & Video Messages</h3>
        <p className="text-white/60 text-sm">
          Record unlimited messages for Puntuu - saved forever! 💝
        </p>
      </div>

      {/* Record Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={() => setRecordingType('audio')}
          className="px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl text-white font-medium flex flex-col items-center gap-2 shadow-lg shadow-violet-500/30"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic size={28} />
          <span className="text-sm">Record Voice</span>
        </motion.button>
        <motion.button
          onClick={() => setRecordingType('video')}
          className="px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white font-medium flex flex-col items-center gap-2 shadow-lg shadow-pink-500/30"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Video size={28} />
          <span className="text-sm">Record Video</span>
        </motion.button>
      </div>

      {/* Messages Count */}
      <div className="text-center">
        <span className="text-pink-400 text-sm">
          {messages.length > 0 
            ? `💕 ${messages.length} message${messages.length > 1 ? 's' : ''} saved forever` 
            : '✨ Start recording your first message!'}
        </span>
      </div>

      {/* Messages Grid */}
      {messages.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {messages.map((message, index) => {
            const recordedDate = new Date(message.timestamp);
            const dayName = recordedDate.toLocaleDateString('en-US', { weekday: 'short' });
            const dateStr = recordedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const timeStr = recordedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            
            return (
              <motion.button
                key={message.id}
                onClick={() => setViewingMessage(message)}
                className="relative bg-white/10 rounded-2xl overflow-hidden text-left border border-pink-500/20 hover:border-pink-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Recording date badge */}
                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full z-10">
                  <span className="text-white/80 text-[10px]">{dayName}</span>
                </div>
                
                <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-rose-500/20">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/50 to-rose-500/50 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {message.type === 'video' ? (
                      <Video size={28} className="text-white" />
                    ) : (
                      <Mic size={28} className="text-white" />
                    )}
                  </motion.div>
                </div>
                <div className="p-3">
                  <h4 className="text-white font-medium text-sm truncate">{message.title}</h4>
                  <p className="text-pink-300/80 text-[10px] mt-1">📅 {dateStr}</p>
                  <p className="text-white/50 text-xs flex items-center gap-1 mt-1">
                    <Clock size={10} /> {timeStr} • {formatDuration(message.duration)}
                  </p>
                </div>
                {/* Play indicator */}
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Play size={14} className="text-white ml-0.5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {messages.length === 0 && (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sparkles className="mx-auto text-pink-400/50 mb-3" size={40} />
          <p className="text-white/50 text-sm">
            Your recorded messages will appear here.
            <br />
            Record as many as you like - they're saved forever! 💕
          </p>
        </motion.div>
      )}

      {/* Recording Modal */}
      <AnimatePresence>
        {recordingType && (
          <RecordingModal
            type={recordingType}
            onClose={() => setRecordingType(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/* Player Modal */}
      <AnimatePresence>
        {viewingMessage && (
          <PlayerModal
            message={viewingMessage}
            onClose={() => setViewingMessage(null)}
            onDelete={() => handleDelete(viewingMessage.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
