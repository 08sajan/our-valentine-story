import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const promisesList = [
  "I promise to never let go of your hand when things get scary 🤝",
  "I promise to listen to you, even when you aren't saying anything at all 💭",
  "I promise to protect your smile like it's the most valuable thing in the world 😊",
  "I promise to never stop trying to win your heart, no matter how much time passes 💕",
  "I promise to be your shelter when the storms get too loud 🏠",
  "I promise to be your loudest cheer when the world goes quiet 📣",
  "I promise to never raise my voice at you 🤫",
  "I promise to buy you flowers for no reason at all 🌸",
  "I promise to always answer your call at 2:00 AM 📞",
  "I promise to never let a single tear fall because of me 💧",
  "I promise to mention you in every single one of my prayers 🙏",
  "I promise to make you feel safe enough to shine ✨",
  "I promise to choose the hard days with you over easy days with anyone else 💪",
  "I promise to love you exactly as you are - the soft parts and complicated thoughts 💖",
  "I promise to be the one who knows when your mind is too loud 🧠",
];

export const FallingStars = () => {
  const [revealedPromises, setRevealedPromises] = useState<Set<number>>(new Set());
  const [activePromise, setActivePromise] = useState<{ index: number; text: string } | null>(null);

  const stars = [...Array(15)].map((_, i) => ({
    id: i,
    x: 5 + (i % 5) * 18 + Math.random() * 5,
    y: 15 + Math.floor(i / 5) * 25 + Math.random() * 5,
    size: 1 + Math.random() * 0.5,
    delay: i * 0.1,
  }));

  const handleStarClick = (index: number) => {
    if (!revealedPromises.has(index)) {
      setRevealedPromises(prev => new Set([...prev, index]));
      setActivePromise({ index, text: promisesList[index % promisesList.length] });
      
      // Vibrate on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 30, 50]);
      }
      
      // Auto-hide after 4 seconds
      setTimeout(() => {
        setActivePromise(null);
      }, 4000);
    }
  };

  const dismissPromise = () => {
    setActivePromise(null);
  };

  return (
    <div className="relative min-h-[350px] rounded-2xl overflow-hidden">
      {/* Starry Night Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-pink-950">
        {/* Static background stars */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-16 h-0.5 bg-gradient-to-r from-white to-transparent"
          style={{
            left: `${10 + i * 30}%`,
            top: `${5 + i * 15}%`,
            rotate: 45,
          }}
          animate={{
            x: [0, 150],
            y: [0, 150],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 2 + i * 5,
            repeatDelay: 10,
          }}
        />
      ))}

      {/* Progress Header */}
      <div className="relative z-10 text-center pt-4 pb-2">
        <motion.p
          className="text-purple-300/80 text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨ Tap the stars to reveal my promises ✨
        </motion.p>
      </div>

      {/* Interactive Promise Stars */}
      <div className="relative h-[200px]">
        {stars.map((star) => (
          <motion.button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            className={`absolute cursor-pointer z-10 transition-transform ${
              revealedPromises.has(star.id) ? 'opacity-30 scale-75' : ''
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: star.size,
              opacity: 1,
            }}
            transition={{
              delay: star.delay,
              duration: 0.5,
            }}
            whileHover={{ scale: star.size * 1.4 }}
            whileTap={{ scale: star.size * 0.8 }}
          >
            <motion.span
              className="text-3xl block drop-shadow-lg"
              animate={!revealedPromises.has(star.id) ? {
                rotate: [0, 10, -10, 0],
                filter: [
                  "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                  "drop-shadow(0 0 16px rgba(255,215,0,0.8))",
                  "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {revealedPromises.has(star.id) ? '💫' : '⭐'}
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Promise Reveal Modal */}
      <AnimatePresence>
        {activePromise && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 p-4 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissPromise}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm border border-white/20 shadow-2xl"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-5xl text-center mb-4"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1.5, repeat: 2 }}
              >
                ⭐
              </motion.div>
              <p className="text-white font-serif text-center text-lg leading-relaxed">
                {activePromise.text}
              </p>
              <motion.p
                className="text-center mt-4 text-purple-300/50 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Tap to continue
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Progress */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-purple-300/80 text-sm font-medium">
          💫 {revealedPromises.size}/{stars.length} promises revealed
        </p>
        
        {/* All Promises Revealed */}
        {revealedPromises.size === stars.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2"
          >
            <motion.p
              className="text-pink-300 text-sm font-serif italic"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "Every promise is sealed with my love for you, Puntuu 💕"
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
