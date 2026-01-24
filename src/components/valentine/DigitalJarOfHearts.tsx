import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { createPortal } from 'react-dom';

interface HeartContent {
  type: 'compliment' | 'memory';
  text: string;
}

const heartContents: HeartContent[] = [
  // Compliments
  { type: 'compliment', text: 'Your smile is the first thing I think of every morning 💕' },
  { type: 'compliment', text: 'You have the most beautiful soul I\'ve ever encountered ✨' },
  { type: 'compliment', text: 'Your laugh is my favorite sound in the entire universe 🎵' },
  { type: 'compliment', text: 'You make everyone around you feel special just by being you 🌟' },
  { type: 'compliment', text: 'Your eyes hold galaxies I want to explore forever 👁️' },
  { type: 'compliment', text: 'You\'re the most beautiful person, inside and out 🌹' },
  { type: 'compliment', text: 'Your kindness could heal the world 💝' },
  { type: 'compliment', text: 'You\'re stronger than you know, braver than you believe 💪' },
  { type: 'compliment', text: 'Being loved by you is the greatest gift of my life 🎁' },
  { type: 'compliment', text: 'You make ordinary moments feel magical ✨' },
  { type: 'compliment', text: 'Your voice is the melody my heart beats to 💓' },
  { type: 'compliment', text: 'You\'re my favorite hello and my hardest goodbye 🥺' },
  { type: 'compliment', text: 'Every love song suddenly makes sense because of you 🎶' },
  { type: 'compliment', text: 'You\'re the reason I believe in forever 💍' },
  { type: 'compliment', text: 'Your hugs feel like coming home 🏠' },
  
  // Memories
  { type: 'memory', text: 'Remember our first call? My heart was racing the entire time 📞' },
  { type: 'memory', text: 'The way you laugh when I make silly jokes... I live for that moment 😂' },
  { type: 'memory', text: 'When you fell asleep on call and I just listened to you breathe 😴' },
  { type: 'memory', text: 'That time you got shy when I complimented you... so adorable! 🙈' },
  { type: 'memory', text: 'Staying up until 3 AM talking about everything and nothing 🌙' },
  { type: 'memory', text: 'When you sent me that voice note... I\'ve listened to it 100 times 🔁' },
  { type: 'memory', text: 'The first time you said "I love you" - my heart literally stopped 💓' },
  { type: 'memory', text: 'Our silly video calls where we just stare at each other and smile 📱' },
  { type: 'memory', text: 'When you got jealous... it was cute (don\'t be mad!) 😏' },
  { type: 'memory', text: 'The way you say my name makes everything feel right 🥰' },
  { type: 'memory', text: 'Our inside jokes that no one else understands 😆' },
  { type: 'memory', text: 'When you trusted me with your fears... I felt so honored 🤝' },
  { type: 'memory', text: 'Planning our future together at 2 AM... I can\'t wait 🏡' },
  { type: 'memory', text: 'That song that now belongs only to us 🎵' },
  { type: 'memory', text: 'Every goodnight message that makes me sleep with a smile 😊' },
];

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const heartColors = [
  'text-pink-400',
  'text-rose-400', 
  'text-red-400',
  'text-fuchsia-400',
  'text-pink-300'
];

const ContentModal = ({ content, onClose }: { content: HeartContent; onClose: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      {/* Burst of hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl pointer-events-none"
          initial={{ 
            x: '50%', 
            y: '50%',
            scale: 0
          }}
          animate={{ 
            x: `${50 + (Math.random() - 0.5) * 100}%`,
            y: `${50 + (Math.random() - 0.5) * 100}%`,
            scale: [0, 1.5, 0],
            rotate: Math.random() * 360
          }}
          transition={{ duration: 1.5, delay: i * 0.05 }}
        >
          💕
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 10 }}
        className="relative max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="rounded-3xl p-8 text-center"
          style={{
            background: content.type === 'compliment' 
              ? 'linear-gradient(145deg, #ff6b9d, #ff8fab)' 
              : 'linear-gradient(145deg, #a855f7, #c084fc)',
            boxShadow: '0 25px 80px rgba(255,100,150,0.5)'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-5xl mb-4"
          >
            {content.type === 'compliment' ? '💝' : '📸'}
          </motion.div>

          <p className="text-sm text-white/60 uppercase tracking-wider mb-2">
            {content.type === 'compliment' ? 'A Compliment For You' : 'A Memory Snack'}
          </p>

          <p className="text-white text-lg font-medium leading-relaxed">
            {content.text}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-white/60 text-sm"
          >
            Tap anywhere to close 💕
          </motion.div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const DigitalJarOfHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [selectedContent, setSelectedContent] = useState<HeartContent | null>(null);
  const [clickedCount, setClickedCount] = useState(0);

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = [];
      for (let i = 0; i < 20; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 20 + Math.random() * 30,
          duration: 5 + Math.random() * 5,
          delay: Math.random() * 5,
          color: heartColors[Math.floor(Math.random() * heartColors.length)]
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  const handleHeartClick = useCallback((heartId: number) => {
    const randomContent = heartContents[Math.floor(Math.random() * heartContents.length)];
    setSelectedContent(randomContent);
    setClickedCount(prev => prev + 1);
    
    // Vibrate on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          💖 Jar of Hearts
        </motion.h2>
        <p className="text-white/70 text-sm mb-2">
          Catch a floating heart for a dose of love
        </p>
        <p className="text-pink-300 text-xs">
          Hearts caught: {clickedCount} 💕
        </p>
      </div>

      {/* Jar Container */}
      <div 
        className="relative h-96 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,100,150,0.1) 0%, rgba(255,150,180,0.2) 100%)',
          border: '3px solid rgba(255,255,255,0.2)',
          boxShadow: 'inset 0 0 60px rgba(255,100,150,0.2)'
        }}
      >
        {/* Jar lid effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-6 rounded-t-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent)'
          }}
        />

        {/* Floating hearts */}
        {hearts.map((heart) => (
          <motion.button
            key={heart.id}
            className={`absolute cursor-pointer ${heart.color} hover:scale-125 transition-transform`}
            style={{ left: `${heart.x}%`, fontSize: heart.size }}
            animate={{
              y: [0, -30, 0, 30, 0],
              x: [0, 15, 0, -15, 0],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => handleHeartClick(heart.id)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          >
            <Heart className="fill-current" style={{ width: heart.size, height: heart.size }} />
          </motion.button>
        ))}

        {/* Sparkle effects */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity
            }}
          />
        ))}

        {/* Instructions */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-white/60 text-sm">
            👆 Tap any heart
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 flex justify-center gap-4 text-sm"
      >
        <div className="bg-white/10 px-4 py-2 rounded-full">
          <span className="text-white/60">Compliments: </span>
          <span className="text-pink-300">{heartContents.filter(h => h.type === 'compliment').length}</span>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-full">
          <span className="text-white/60">Memories: </span>
          <span className="text-purple-300">{heartContents.filter(h => h.type === 'memory').length}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedContent && (
          <ContentModal
            content={selectedContent}
            onClose={() => setSelectedContent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
