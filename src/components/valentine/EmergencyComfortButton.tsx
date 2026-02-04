import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, Mic, Video, Play, Pause, Volume2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const comfortMessages = [
  {
    title: "Breathe, My Love",
    message: "Hey sweetheart, it's okay. Whatever you're going through right now, I need you to take a deep breath with me. In... hold it... and out slowly. I'm right here with you, even if I'm not physically there. Close your eyes and imagine my arms wrapped around you. You're safe. You're loved. You're not alone - you never will be.",
    affirmation: "You are loved. You are enough. You are my everything. And nothing can change that.",
    emoji: "🌸",
    gradient: "from-pink-400 to-rose-400"
  },
  {
    title: "I Believe In You",
    message: "Listen to me carefully, babe - you are doing amazing. Even on the days when it doesn't feel like it, you're fighting battles that would break others. I've watched you overcome so much, and I'm so incredibly proud of the person you are. Whatever is weighing on you right now, I know you have the strength to get through it. And I'll be cheering for you every step of the way.",
    affirmation: "You are stronger than your doubts. You are braver than your fears. You can do this.",
    emoji: "💪",
    gradient: "from-amber-400 to-orange-400"
  },
  {
    title: "The Storm Will Pass",
    message: "I know the world feels heavy right now, my love. The pain you're feeling is real, and it's okay to not be okay sometimes. But remember - for every storm, there's a rainbow waiting. This darkness is temporary. The sun will shine again, and when it does, I'll be right there to watch the sunrise with you. Until then, let yourself feel what you need to feel. I'm holding space for you.",
    affirmation: "This moment will pass. Better days are coming. I promise you that.",
    emoji: "🌈",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    title: "My Heart Is With You",
    message: "Close your eyes right now, love. Feel my presence with you. Imagine my hands gently cupping your face, wiping away any tears. Feel my arms pulling you close, my heartbeat syncing with yours. I'm holding you tight, even across all this distance. You are so deeply, completely, unconditionally loved. Nothing you do or don't do can change how much I love you.",
    affirmation: "You are worthy of love. You are worthy of happiness. You deserve all good things.",
    emoji: "💕",
    gradient: "from-rose-400 to-pink-500"
  },
  {
    title: "You've Got This",
    message: "Remember all those times you thought you couldn't make it? All those moments that seemed impossible to survive? Look at you now - you made it through every single one. You have a 100% survival rate for your worst days. You're literally undefeated. This challenge in front of you? It's just another thing you're going to conquer. I have complete faith in you.",
    affirmation: "You can do hard things. You've proven it countless times. You'll prove it again.",
    emoji: "⭐",
    gradient: "from-yellow-400 to-amber-400"
  },
  {
    title: "You're My Home",
    message: "Hey beautiful, I just want you to know that you're the best thing that ever happened to me. On your worst days, you're still my favorite person. When you're feeling broken, I see gold in your cracks. When you think you're too much or not enough, I see perfection. You don't have to be strong right now. Just be you. That's all I ever need.",
    affirmation: "You are exactly who you're supposed to be. I love every version of you.",
    emoji: "🏠",
    gradient: "from-emerald-400 to-teal-400"
  },
  {
    title: "I'm Here For You",
    message: "Whatever happened, whatever you're going through, I want you to know something important: You don't have to face it alone. You don't have to pretend you're fine. You don't have to be strong. With me, you can fall apart - and I will help you put the pieces back together. That's what love is. I've got you, sweetheart. Always.",
    affirmation: "Lean on me. I'm strong enough to carry both of us when you need it.",
    emoji: "🫂",
    gradient: "from-purple-400 to-violet-400"
  },
  {
    title: "My Sweet Love",
    message: "I wish I could be there to hold you right now. To stroke your hair. To whisper in your ear that everything will be okay. Since I can't, I want you to do something for me: Put your hand on your heart. Feel it beating? That beat is proof of your strength. That rhythm is your reminder that you're alive, you're loved, and tomorrow is a new beginning.",
    affirmation: "Tomorrow will be better. And if it's not, I'll be here again. And again. Forever.",
    emoji: "💝",
    gradient: "from-red-400 to-rose-400"
  }
];

const ComfortModal = ({ onClose }: { onClose: () => void }) => {
  const [comfort] = useState(() => comfortMessages[Math.floor(Math.random() * comfortMessages.length)]);
  const [showAffirmation, setShowAffirmation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAffirmation(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(255,100,150,0.4) 0%, rgba(0,0,0,0.97) 70%)'
      }}
      onClick={onClose}
    >
      {/* Gentle floating hearts */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl pointer-events-none opacity-30"
          initial={{ x: `${Math.random() * 100}%`, y: '110%' }}
          animate={{ y: '-10%', x: `${Math.random() * 100}%` }}
          transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, delay: i * 0.3 }}
        >
          {['💕', '💗', '💖', '💓', '🤍', '💜'][i % 6]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative max-w-md w-full max-h-[85vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,245,250,0.98))',
            boxShadow: '0 30px 100px rgba(255,100,150,0.6)'
          }}
        >
          {/* Pulsing heart header */}
          <div className={`relative py-10 px-6 text-center bg-gradient-to-br ${comfort.gradient}`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {comfort.emoji}
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white">
              {comfort.title}
            </h3>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 leading-relaxed text-center text-base"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {comfort.message}
            </motion.p>

            <AnimatePresence>
              {showAffirmation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`mt-6 bg-gradient-to-r ${comfort.gradient} rounded-2xl p-5`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-white" />
                    <span className="text-sm text-white/90 uppercase tracking-wider font-medium">
                      Remember This
                    </span>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-center text-white font-semibold text-lg">
                    {comfort.affirmation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Virtual Hug Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-500 text-sm mb-4">
                Sending you the biggest virtual hug... 🫂
              </p>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${comfort.gradient} rounded-full text-white shadow-lg`}
              >
                <Heart className="w-6 h-6 fill-current" />
                <span className="font-bold text-lg">I Love You, My Love</span>
                <Heart className="w-6 h-6 fill-current" />
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
  const [pressCount, setPressCount] = useState(() => {
    const saved = localStorage.getItem('comfort-press-count');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('comfort-press-count', pressCount.toString());
  }, [pressCount]);

  const handleClick = () => {
    setShowComfort(true);
    setIsPulsing(false);
    setPressCount(prev => prev + 1);
    
    // Comfort vibration pattern - gentle pulses
    if (navigator.vibrate) {
      navigator.vibrate([100, 80, 100, 80, 200, 100, 300]);
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
          Press when you need me most 💕
        </p>
      </div>

      {/* The Button */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          {/* Outer glow rings */}
          {isPulsing && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-pink-400"
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: 'blur(25px)' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-rose-400"
                animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ filter: 'blur(20px)' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-red-400"
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                style={{ filter: 'blur(15px)' }}
              />
            </>
          )}

          {/* Main button */}
          <motion.div
            className="relative w-44 h-44 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #ff6b9d, #ff4081, #f50057)',
              boxShadow: '0 20px 60px rgba(255,100,150,0.6), inset 0 -5px 20px rgba(0,0,0,0.2), inset 0 5px 20px rgba(255,255,255,0.2)'
            }}
            animate={isPulsing ? {
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 20px 60px rgba(255,100,150,0.6)',
                '0 30px 100px rgba(255,100,150,0.8)',
                '0 20px 60px rgba(255,100,150,0.6)'
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: isPulsing ? Infinity : 0 }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-20 h-20 text-white fill-white drop-shadow-lg" />
            </motion.div>
          </motion.div>

          {/* Text below */}
          <motion.p
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 text-sm whitespace-nowrap font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap for comfort 💕
          </motion.p>
        </motion.button>
      </div>

      {/* Stats */}
      {pressCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className="text-white/50 text-sm">
            I've been here for you <span className="text-pink-300 font-bold">{pressCount}</span> times 💕
          </p>
          <p className="text-white/30 text-xs mt-1">
            And I'll always be here, no matter what.
          </p>
        </motion.div>
      )}

      {/* Floating decorative hearts */}
      <div className="relative h-16 mt-8">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ left: `${10 + i * 13}%` }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            {['💕', '💗', '💓', '💖', '💝', '🤍', '💜'][i]}
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
