import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Mail, Cloud, Smile, Moon, Sparkles, Coffee, Sun, Star, Mic, Video, Play, Pause, Trash2, Square, Camera } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useMediaRecorder, saveRecordingToDB, getRecordingsFromDB, deleteRecordingFromDB, RecordedMedia } from '@/hooks/useMediaRecorder';

interface Letter {
  id: string;
  mood: string;
  emoji: string;
  icon: React.ReactNode;
  gradient: string;
  title: string;
  content: string;
}

const letters: Letter[] = [
  {
    id: 'bad-day',
    mood: 'Having a Bad Day',
    emoji: '🌧️',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-blue-400 to-indigo-500',
    title: 'When the World Feels Heavy...',
    content: `My dearest Puntuu,

I know today feels impossible. I know the weight on your shoulders seems unbearable right now. But I need you to know something...

You are the strongest person I know. Not because you don't cry, but because you get up every single time.

Right now, close your eyes. Take a deep breath. Imagine my arms around you, holding you tight.

This moment will pass. The storm will clear. And when it does, I'll be right here, loving you through every single second.

Forever yours,
Your love 💕`
  },
  {
    id: 'miss-me',
    mood: 'You Miss Me',
    emoji: '💕',
    icon: <Heart className="w-6 h-6" />,
    gradient: 'from-pink-400 to-rose-500',
    title: 'When Your Heart Aches for Me...',
    content: `My beautiful Puntuu,

If you're reading this, it means you're missing me. That makes my heart so full because I miss you too, every single moment we're apart.

Close your eyes right now. Can you feel it? That warmth spreading through your chest? That's my love reaching across whatever distance separates us.

Look at our photos. Remember my laugh. Think of my arms around you. I'm coming back to you. I always will.

Missing you is just loving you from far away.

Counting every second,
Your forever love 💗`
  },
  {
    id: 'need-laugh',
    mood: 'You Need a Laugh',
    emoji: '😂',
    icon: <Smile className="w-6 h-6" />,
    gradient: 'from-yellow-400 to-orange-500',
    title: 'Emergency Smile Delivery! 📦',
    content: `ATTENTION PUNTUU! 🚨

This is an OFFICIAL notification that you are TOO CUTE and it's becoming a public safety hazard!

Scientists are baffled. They're calling it the "Puntuu Effect" and there's no known cure except unlimited cuddles.

Fun fact: Every time you smile, a grumpy cat somewhere becomes slightly less grumpy.

I bet I can make you smile in 3 seconds:
1... 2... 3... 
I LOVE YOU! 💕

(If you didn't smile, read again. Those are the rules.)

Your personal comedian,
The one who will always make you laugh 🎭`
  },
  {
    id: 'cant-sleep',
    mood: "You Can't Sleep",
    emoji: '🌙',
    icon: <Moon className="w-6 h-6" />,
    gradient: 'from-indigo-400 to-purple-500',
    title: 'For Those Restless Nights...',
    content: `My sleepy Puntuu,

The night is quiet, but your mind won't stop, will it? I wish I was there to stroke your hair until your eyes grew heavy.

Imagine this: You're in our cozy bed. My arms are wrapped around you, your head on my chest. You can hear my heartbeat - slow and steady.

I'm humming that song you love. My fingers trace gentle patterns on your back.

You are loved. You are safe. You are home.

Sweet dreams, my angel.

Holding you in my heart,
Your peaceful place 🌟`
  },
  {
    id: 'feeling-insecure',
    mood: 'Feeling Insecure',
    emoji: '🦋',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-purple-400 to-pink-500',
    title: 'A Reminder of Your Magic...',
    content: `My precious Puntuu,

Those voices in your head? They're lying. Every single word.

Let me tell you what I see when I look at you:

I see the most beautiful soul. I see kindness that could heal the world. I see strength disguised as softness.

Your laugh? My favorite sound in the universe.
Your eyes? Galaxies I want to explore forever.
Your heart? The safest home I've ever known.

You are not "too much." You are EVERYTHING.

Never forget who you are,
The one who loves every bit of you 💖`
  },
  {
    id: 'morning-motivation',
    mood: 'Starting Your Day',
    emoji: '☀️',
    icon: <Sun className="w-6 h-6" />,
    gradient: 'from-amber-400 to-yellow-500',
    title: 'Good Morning, My Sunshine!',
    content: `Rise and shine, beautiful! ☀️

A new day has begun - new opportunities to be amazing!

Here's your morning checklist:
✨ Wake up (you did it!)
✨ Be adorable (can't help it)
✨ Remember you're loved (by me, always)
✨ Conquer the world (you'll probably do it anyway)

You've survived 100% of your worst days so far. That's a perfect track record!

Go out there and shine, my love.

Your biggest supporter,
The one who loves you more each day 🌻`
  },
  {
    id: 'need-motivation',
    mood: 'Need Motivation',
    emoji: '⭐',
    icon: <Star className="w-6 h-6" />,
    gradient: 'from-emerald-400 to-teal-500',
    title: 'Your Personal Cheerleader!',
    content: `HEY YOU! Yes, YOU, Puntuu!

That thing you're worried about? You're going to crush it.
That goal that seems too big? You're going to reach it.
That dream that feels impossible? You're going to live it.

How do I know? Because I've seen what you're capable of. You have a fire that could light up the darkest night.

Take that first step. Then another. Then another.

I believe in you with every fiber of my being.

GO GET 'EM, TIGER! 🐯

Your eternal believer,
The one who knows you're unstoppable 💪`
  },
  {
    id: 'feeling-loved',
    mood: 'Want to Feel Loved',
    emoji: '🥰',
    icon: <Coffee className="w-6 h-6" />,
    gradient: 'from-rose-400 to-red-500',
    title: 'A Dose of Pure Love...',
    content: `My dearest Puntuu,

You came here because you needed to feel loved. So let me give you exactly that.

I love you.

I love you in the morning when your hair is messy.
I love you when you're tired but still make time for us.
I love you when you're laughing so hard you can't breathe.
I love you when you're crying and the world feels heavy.

I love your quirks. I love your flaws. Those are my favorites.

You are loved. You are cherished. You are adored.

With all my heart,
Yours completely and forever 💕`
  }
];

const RecordingModal = ({ 
  letter, 
  onClose, 
  onSave 
}: { 
  letter: Letter; 
  onClose: () => void;
  onSave: (media: RecordedMedia) => void;
}) => {
  const { isRecording, recordingType, recordingTime, previewStream, startRecording, stopRecording, cancelRecording } = useMediaRecorder();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recordedMedia, setRecordedMedia] = useState<RecordedMedia | null>(null);

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  const handleStop = async () => {
    const media = await stopRecording();
    setRecordedMedia(media);
  };

  const handleSave = () => {
    if (recordedMedia) {
      onSave(recordedMedia);
      onClose();
    }
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            Record for "{letter.mood}"
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Preview Area */}
        <div className="aspect-video bg-black rounded-2xl mb-6 overflow-hidden relative">
          {previewStream && recordingType === 'video' ? (
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          ) : recordedMedia?.type === 'video' ? (
            <video 
              src={recordedMedia.url} 
              controls 
              className="w-full h-full object-cover"
            />
          ) : recordedMedia?.type === 'audio' ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎵
              </motion.div>
              <audio src={recordedMedia.url} controls className="w-full max-w-xs" />
            </div>
          ) : isRecording && recordingType === 'audio' ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-red-500 mb-4"
              />
              <p className="text-white text-2xl font-bold">{formatTime(recordingTime)}</p>
              <p className="text-white/60">Recording audio...</p>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40">
              <Camera className="w-16 h-16" />
            </div>
          )}

          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <span className="text-white text-sm font-medium">{formatTime(recordingTime)}</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isRecording && !recordedMedia && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => startRecording('audio')}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white"
              >
                <Mic className="w-7 h-7" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => startRecording('video')}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white"
              >
                <Video className="w-7 h-7" />
              </motion.button>
            </>
          )}

          {isRecording && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStop}
              className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white"
            >
              <Square className="w-8 h-8 fill-white" />
            </motion.button>
          )}

          {recordedMedia && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRecordedMedia(null)}
                className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center text-white"
              >
                <Trash2 className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold"
              >
                Save Recording 💕
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const LetterModal = ({ 
  letter, 
  recordings,
  onClose,
  onRecord,
  onDeleteRecording
}: { 
  letter: Letter; 
  recordings: RecordedMedia[];
  onClose: () => void;
  onRecord: () => void;
  onDeleteRecording: (id: string) => void;
}) => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (mediaId: string, mediaUrl: string, type: 'audio' | 'video') => {
    if (isPlaying === mediaId) {
      if (type === 'audio' && audioRef.current) {
        audioRef.current.pause();
      }
      if (type === 'video' && videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(null);
    } else {
      setIsPlaying(mediaId);
    }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50, opacity: 0.6 }}
          animate={{ y: -100, opacity: 0 }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        >
          💕
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-3xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,240,245,0.95))',
          boxShadow: '0 25px 80px rgba(255,100,150,0.4)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${letter.gradient} p-6 text-white relative overflow-hidden`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{letter.emoji}</span>
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">{letter.title}</h3>
        </div>

        {/* Personal Recordings */}
        {recordings.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
            <p className="text-sm font-medium text-pink-600 mb-3">💝 Personal Messages for You:</p>
            <div className="space-y-2">
              {recordings.map(rec => (
                <div key={rec.id} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                  {rec.type === 'video' ? (
                    <video 
                      ref={videoRef}
                      src={rec.url} 
                      className="w-16 h-16 rounded-lg object-cover"
                      onClick={() => togglePlay(rec.id, rec.url, 'video')}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      {rec.type === 'video' ? '🎬 Video Message' : '🎤 Voice Note'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(rec.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePlay(rec.id, rec.url, rec.type)}
                    className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center"
                  >
                    {isPlaying === rec.id ? <Pause className="w-4 h-4 text-pink-600" /> : <Play className="w-4 h-4 text-pink-600" />}
                  </button>
                  <button
                    onClick={() => onDeleteRecording(rec.id)}
                    className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            {/* Hidden audio player */}
            <audio 
              ref={audioRef} 
              src={recordings.find(r => r.type === 'audio' && isPlaying === r.id)?.url}
              autoPlay={!!isPlaying && recordings.find(r => r.id === isPlaying)?.type === 'audio'}
              onEnded={() => setIsPlaying(null)}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[40vh]">
          <div className="prose prose-pink">
            {letter.content.split('\n\n').map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-gray-700 leading-relaxed whitespace-pre-line mb-4 last:mb-0"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Footer with Record Button */}
        <div className="p-4 border-t border-pink-100 flex items-center justify-between">
          <motion.button
            onClick={onRecord}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium"
          >
            <Mic className="w-4 h-4" />
            <Video className="w-4 h-4" />
            Add Recording
          </motion.button>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl"
          >
            💝
          </motion.div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const OpenWhenLetters = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [letterRecordings, setLetterRecordings] = useState<Record<string, RecordedMedia[]>>({});

  // Load recordings on mount
  useEffect(() => {
    const loadRecordings = async () => {
      const allRecordings: Record<string, RecordedMedia[]> = {};
      for (const letter of letters) {
        const recs = await getRecordingsFromDB(letter.id);
        if (recs.length > 0) {
          allRecordings[letter.id] = recs;
        }
      }
      setLetterRecordings(allRecordings);
    };
    loadRecordings();
  }, []);

  const handleSaveRecording = async (media: RecordedMedia) => {
    if (!selectedLetter) return;
    
    await saveRecordingToDB(selectedLetter.id, media);
    
    setLetterRecordings(prev => ({
      ...prev,
      [selectedLetter.id]: [...(prev[selectedLetter.id] || []), media]
    }));
  };

  const handleDeleteRecording = async (recordId: string) => {
    if (!selectedLetter) return;
    
    await deleteRecordingFromDB(recordId);
    
    setLetterRecordings(prev => ({
      ...prev,
      [selectedLetter.id]: prev[selectedLetter.id]?.filter(r => r.id !== recordId) || []
    }));
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          📬 Open When... Letters
        </motion.h2>
        <p className="text-white/70 text-sm mb-2">
          Letters written for your different moments 💕
        </p>
        <p className="text-white/50 text-xs">
          🎤 Tap a letter to add your voice & video messages!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4">
        {letters.map((letter, index) => {
          const hasRecordings = (letterRecordings[letter.id]?.length || 0) > 0;
          return (
            <motion.button
              key={letter.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLetter(letter)}
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${letter.gradient} text-white overflow-hidden group`}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              {/* Has recordings indicator */}
              {hasRecordings && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                  <Video className="w-3 h-3" />
                </div>
              )}

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <div className="relative z-10">
                <span className="text-2xl mb-2 block">{letter.emoji}</span>
                <p className="text-xs font-medium leading-tight">
                  Open when {letter.mood.toLowerCase()}
                </p>
              </div>

              <motion.div
                className="absolute bottom-2 right-2 opacity-30"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Mail className="w-8 h-8" />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedLetter && !showRecordingModal && (
          <LetterModal
            letter={selectedLetter}
            recordings={letterRecordings[selectedLetter.id] || []}
            onClose={() => setSelectedLetter(null)}
            onRecord={() => setShowRecordingModal(true)}
            onDeleteRecording={handleDeleteRecording}
          />
        )}
        {selectedLetter && showRecordingModal && (
          <RecordingModal
            letter={selectedLetter}
            onClose={() => setShowRecordingModal(false)}
            onSave={handleSaveRecording}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
