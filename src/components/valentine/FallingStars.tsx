import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Promise {
  text: string;
  caught: boolean;
}

const promisesList = [
  "I promise to never let go of your hand when things get scary",
  "I promise to listen to you, even when you aren't saying anything at all",
  "I promise to protect your smile like it's the most valuable thing in the world",
  "I promise that no matter how much time passes, I will never stop trying to win your heart",
  "I promise to be your biggest supporter in everything you do",
  "I promise to make you laugh even on your worst days",
  "I promise to always choose you, every single day",
  "I promise to be there, through thick and thin, no matter what",
  "I promise to love you more with each passing day",
  "I promise you'll never have to doubt where you stand with me",
];

export const FallingStars = () => {
  const [promises, setPromises] = useState<Promise[]>(
    promisesList.map(text => ({ text, caught: false }))
  );
  const [caughtCount, setCaughtCount] = useState(0);
  const [showPromise, setShowPromise] = useState<string | null>(null);

  const catchStar = (index: number) => {
    if (promises[index].caught) return;
    
    const newPromises = [...promises];
    newPromises[index].caught = true;
    setPromises(newPromises);
    setCaughtCount(prev => prev + 1);
    setShowPromise(promises[index].text);
    
    // Vibrate on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }

    // Hide promise after 4 seconds
    setTimeout(() => setShowPromise(null), 4000);
  };

  return (
    <div className="relative min-h-[400px]">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Progress */}
      <div className="text-center mb-6 relative z-10">
        <motion.p
          className="text-purple-300 text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨ Catch the falling stars to reveal my promises ✨
        </motion.p>
        <p className="text-purple-400 text-lg font-medium mt-2">
          {caughtCount}/{promises.length} promises caught
        </p>
      </div>

      {/* Falling Stars */}
      <div className="relative h-64">
        {promises.map((promise, index) => (
          !promise.caught && (
            <motion.button
              key={index}
              onClick={() => catchStar(index)}
              className="absolute cursor-pointer"
              style={{ left: `${10 + (index * 8) % 80}%` }}
              initial={{ y: -50, opacity: 0 }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 1, 1, 0],
                x: [0, Math.sin(index) * 30, 0],
              }}
              transition={{
                duration: 8 + index * 0.5,
                repeat: Infinity,
                delay: index * 1.2,
                ease: "linear",
              }}
              whileHover={{ scale: 1.5 }}
            >
              <motion.span
                className="text-3xl block"
                animate={{ 
                  rotate: 360,
                  textShadow: ["0 0 10px #fff", "0 0 20px #ffd700", "0 0 10px #fff"]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  textShadow: { duration: 1, repeat: Infinity }
                }}
              >
                ⭐
              </motion.span>
            </motion.button>
          )
        ))}
      </div>

      {/* Promise Reveal */}
      <AnimatePresence>
        {showPromise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute inset-x-4 bottom-0 bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3"
            >
              <span className="text-2xl">💜</span>
              <p className="text-white font-serif text-lg leading-relaxed">
                {showPromise}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Caught Celebration */}
      {caughtCount === promises.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-purple-900/50 backdrop-blur-sm rounded-2xl"
        >
          <div className="text-center p-6">
            <motion.span
              className="text-6xl block mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💫
            </motion.span>
            <p className="text-white text-xl font-serif">
              You've caught all my promises, Puntuu!
            </p>
            <p className="text-purple-200 text-sm mt-2">
              And I intend to keep every single one
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
