import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles } from 'lucide-react';
import { createPortal } from 'react-dom';

const comfortMessages = [
  {
    title: "Breathe, My Love",
    message: "Hey, it's okay. Whatever you're going through right now, I need you to take a deep breath. In... and out. I'm right here with you. You're not alone. You never will be.",
    affirmation: "You are loved. You are enough. You are my everything.",
    emoji: "🌸"
  },
  {
    title: "I Believe In You",
    message: "Listen to me carefully - you are doing amazing. Even on the days when it doesn't feel like it, you're fighting battles that would break others. I'm so proud of you.",
    affirmation: "You are stronger than your doubts. You are braver than your fears.",
    emoji: "💪"
  },
  {
    title: "You're My Safe Place",
    message: "I know the world feels heavy right now. But remember - for every storm, there's a rainbow waiting. And I'll be right there to watch it with you.",
    affirmation: "This moment will pass. Better days are coming. I promise.",
    emoji: "🌈"
  },
  {
    title: "My Heart Is With You",
    message: "Close your eyes. Feel my arms around you. Hear my heartbeat. I'm holding you tight, even from far away. You are so deeply, completely loved.",
    affirmation: "You are worthy of love. You are worthy of happiness. You are worthy of everything beautiful.",
    emoji: "💕"
  },
  {
    title: "You've Got This",
    message: "Remember all those times you thought you couldn't make it? You made it through every single one. You have a 100% survival rate. You're undefeated.",
    affirmation: "You can do hard things. You've proven it before. You'll prove it again.",
    emoji: "⭐"
  }
];

const ComfortModal = ({ onClose }: { onClose: () => void }) => {
  const comfort = comfortMessages[Math.floor(Math.random() * comfortMessages.length)];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(255,100,150,0.3) 0%, rgba(0,0,0,0.95) 70%)'
      }}
      onClick={onClose}
    >
      {/* Gentle floating hearts */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl pointer-events-none opacity-40"
          initial={{ 
            x: `${Math.random() * 100}%`,
            y: '110%'
          }}
          animate={{ 
            y: '-10%',
            x: `${Math.random() * 100}%`
          }}
          transition={{ 
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          {['💕', '💗', '💖', '💓', '🤍'][i % 5]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,240,245,0.95))',
            boxShadow: '0 30px 100px rgba(255,100,150,0.5)'
          }}
        >
          {/* Pulsing heart header */}
          <div className="relative py-8 px-6 text-center bg-gradient-to-br from-pink-400 via-rose-400 to-red-400">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl mb-3"
            >
              {comfort.emoji}
            </motion.div>
            
            <h3 className="text-xl font-bold text-white">
              {comfort.title}
            </h3>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 leading-relaxed text-center mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {comfort.message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-4"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-xs text-pink-600 uppercase tracking-wider font-medium">
                  Remember This
                </span>
                <Sparkles className="w-4 h-4 text-pink-500" />
              </div>
              <p className="text-center text-pink-700 font-medium">
                {comfort.affirmation}
              </p>
            </motion.div>

            {/* Virtual Hug Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-500 text-sm mb-3">
                Sending you a virtual hug...
              </p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full text-white"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-medium">I Love You</span>
                <Heart className="w-5 h-5 fill-current" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const EmergencyComfortButton = () => {
  const [showComfort, setShowComfort] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  const handleClick = () => {
    setShowComfort(true);
    setIsPulsing(false);
    
    // Vibrate pattern for comfort
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🆘 Emergency Comfort
        </motion.h2>
        <p className="text-white/70 text-sm">
          Press when you need me most
        </p>
      </div>

      {/* The Button */}
      <div className="flex justify-center">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Outer glow rings */}
          {isPulsing && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-pink-400"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: 'blur(20px)' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-rose-400"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ filter: 'blur(15px)' }}
              />
            </>
          )}

          {/* Main button */}
          <motion.div
            className="relative w-40 h-40 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #ff6b9d, #ff4081)',
              boxShadow: '0 20px 60px rgba(255,100,150,0.5), inset 0 -5px 20px rgba(0,0,0,0.2)'
            }}
            animate={isPulsing ? {
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 20px 60px rgba(255,100,150,0.5)',
                '0 25px 80px rgba(255,100,150,0.7)',
                '0 20px 60px rgba(255,100,150,0.5)'
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: isPulsing ? Infinity : 0 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-16 h-16 text-white fill-white" />
            </motion.div>
          </motion.div>

          {/* Text below */}
          <motion.p
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-sm whitespace-nowrap"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap for comfort 💕
          </motion.p>
        </motion.button>
      </div>

      {/* Floating decorative hearts */}
      <div className="relative h-20 mt-12">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ left: `${15 + i * 18}%` }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            {['💕', '💗', '💓', '💖', '💝'][i]}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showComfort && (
          <ComfortModal onClose={() => {
            setShowComfort(false);
            setIsPulsing(true);
          }} />
        )}
      </AnimatePresence>
    </div>
  );
};
