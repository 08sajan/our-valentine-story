import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Music, SkipForward, SkipBack, Volume2 } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  whyItRemindsMeOfYou: string;
  coverGradient: string;
  emoji: string;
}

const playlist: Song[] = [
  {
    id: '1',
    title: 'Lover',
    artist: 'Taylor Swift',
    whyItRemindsMeOfYou: 'Every word feels like our story, Puntuu. "Can I go where you go? Can we always be this close?" - I want to be your end game, your first string, your forever and always.',
    coverGradient: 'from-pink-400 via-rose-400 to-red-400',
    emoji: '💕'
  },
  {
    id: '2',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    whyItRemindsMeOfYou: 'Because you truly ARE perfect in my eyes, even when you don\'t believe it. "I found a love for me, darling just dive right in" - that\'s exactly what I did with you.',
    coverGradient: 'from-blue-400 via-indigo-400 to-purple-400',
    emoji: '✨'
  },
  {
    id: '3',
    title: 'All of Me',
    artist: 'John Legend',
    whyItRemindsMeOfYou: 'Because I love ALL of you - every curve, every edge, every mood, every laugh, every tear. Your imperfections are perfect to me.',
    coverGradient: 'from-amber-400 via-orange-400 to-red-400',
    emoji: '🌹'
  },
  {
    id: '4',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    whyItRemindsMeOfYou: 'Because I know I\'ll still love you when we\'re 70, sitting on the porch with wrinkled fingers still intertwined. Our love is timeless.',
    coverGradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    emoji: '💚'
  },
  {
    id: '5',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    whyItRemindsMeOfYou: 'Because my heart has been waiting lifetimes for you. "I have died every day waiting for you" - every moment before you was just waiting for my life to begin.',
    coverGradient: 'from-violet-400 via-purple-400 to-fuchsia-400',
    emoji: '💜'
  },
  {
    id: '6',
    title: 'Can\'t Help Falling in Love',
    artist: 'Elvis Presley',
    whyItRemindsMeOfYou: 'Because falling for you wasn\'t a choice - it was destiny. "Take my hand, take my whole life too" - that\'s exactly what I\'m offering you.',
    coverGradient: 'from-rose-400 via-pink-400 to-fuchsia-400',
    emoji: '🎵'
  },
  {
    id: '7',
    title: 'Die With A Smile',
    artist: 'Bruno Mars & Lady Gaga',
    whyItRemindsMeOfYou: 'Because no matter what happens in this crazy world, if I have you, I\'ll face anything with a smile. You make everything worth it.',
    coverGradient: 'from-yellow-400 via-amber-400 to-orange-400',
    emoji: '😊'
  },
  {
    id: '8',
    title: 'Tera Ban Jaunga',
    artist: 'Akhil Sachdeva',
    whyItRemindsMeOfYou: 'तेरा बन जाऊंगा - I want to become completely yours. Every word of this song is my promise to you, Puntuu.',
    coverGradient: 'from-red-400 via-rose-500 to-pink-500',
    emoji: '🇮🇳'
  },
  {
    id: '9',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    whyItRemindsMeOfYou: 'तुम ही हो - You are my EVERYTHING. मेरी अधूरी जिंदगी को पूरा करती हो तुम। Before you, I was incomplete.',
    coverGradient: 'from-indigo-400 via-blue-500 to-cyan-500',
    emoji: '💙'
  },
  {
    id: '10',
    title: 'Raataan Lambiyan',
    artist: 'Jubin Nautiyal & Asees Kaur',
    whyItRemindsMeOfYou: 'Every night without you feels endless. The nights are so long when I\'m not with you, thinking only of you, waiting only for you.',
    coverGradient: 'from-purple-400 via-violet-500 to-indigo-500',
    emoji: '🌙'
  },
  {
    id: '11',
    title: 'Pehle Bhi Main',
    artist: 'Vishal Mishra',
    whyItRemindsMeOfYou: 'Because I feel like I\'ve loved you in every lifetime before this one, and I\'ll love you in every lifetime after. You\'re my eternal love.',
    coverGradient: 'from-teal-400 via-emerald-500 to-green-500',
    emoji: '🔄'
  },
  {
    id: '12',
    title: 'Hawayein',
    artist: 'Arijit Singh',
    whyItRemindsMeOfYou: 'Because even the wind reminds me of you. Everything in nature conspires to make me think of you. You\'re everywhere.',
    coverGradient: 'from-sky-400 via-blue-400 to-indigo-500',
    emoji: '🌬️'
  }
];

export const CuratedSoundscapes = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedSong, setExpandedSong] = useState<string | null>(null);

  const currentSong = playlist[currentSongIndex];

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🎵 Songs That Remind Me of You
        </motion.h2>
        <p className="text-white/70 text-sm">
          Every song tells our story 💕
        </p>
      </div>

      {/* Now Playing Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl overflow-hidden mb-6"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
      >
        <div className={`bg-gradient-to-br ${currentSong.coverGradient} p-6`}>
          {/* Floating music notes */}
          {isPlaying && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl text-white/30"
                  initial={{ x: Math.random() * 100 + '%', y: '100%', opacity: 0 }}
                  animate={{ y: '-100%', opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                >
                  {['🎵', '🎶', '♪', '♫'][i % 4]}
                </motion.span>
              ))}
            </div>
          )}

          {/* Album Art */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            className="w-40 h-40 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30"
          >
            <span className="text-6xl">{currentSong.emoji}</span>
          </motion.div>

          {/* Song Info */}
          <div className="text-center text-white">
            <h3 className="text-xl font-bold mb-1">{currentSong.title}</h3>
            <p className="text-white/80 text-sm">{currentSong.artist}</p>
          </div>

          {/* Progress Bar (decorative) */}
          <div className="mt-4 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              animate={{ width: isPlaying ? '100%' : '0%' }}
              transition={{ duration: 180, ease: "linear" }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSong}
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-gray-800" />
              ) : (
                <Play className="w-7 h-7 text-gray-800 ml-1" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSong}
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Why This Song */}
        <div className="bg-black/40 p-4">
          <div className="flex items-start gap-2">
            <Heart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
            <p className="text-white/90 text-sm italic">
              "{currentSong.whyItRemindsMeOfYou}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Playlist */}
      <div className="space-y-2">
        <h4 className="text-white/60 text-sm font-medium mb-3 flex items-center gap-2">
          <Music className="w-4 h-4" /> Our Playlist
        </h4>
        
        {playlist.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.button
              onClick={() => {
                setCurrentSongIndex(index);
                setExpandedSong(expandedSong === song.id ? null : song.id);
              }}
              className={`w-full p-3 rounded-xl text-left transition-all ${
                index === currentSongIndex 
                  ? `bg-gradient-to-r ${song.coverGradient}` 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{song.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{song.title}</p>
                  <p className="text-white/60 text-xs truncate">{song.artist}</p>
                </div>
                {index === currentSongIndex && isPlaying && (
                  <div className="flex items-center gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-white rounded-full"
                        animate={{ height: [4, 16, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.button>

            <AnimatePresence>
              {expandedSong === song.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-white/5 rounded-xl mt-1 border-l-2 border-pink-400">
                    <p className="text-white/80 text-xs italic flex items-start gap-2">
                      <Heart className="w-3 h-3 text-pink-400 flex-shrink-0 mt-0.5" />
                      {song.whyItRemindsMeOfYou}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
