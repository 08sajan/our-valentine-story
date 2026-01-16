import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicHug = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const sendHug = () => {
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    
    // Vibrate pattern like a heartbeat
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 100, 100, 100, 200]);
    }

    setTimeout(() => setIsHugging(false), 3000);
  };

  return (
    <div className="relative text-center space-y-6">
      {/* Hug Animation Container */}
      <div className="relative h-64 flex items-center justify-center">
        {/* Left Person (Me) */}
        <motion.div
          className="absolute text-7xl"
          initial={{ x: -80 }}
          animate={isHugging ? { x: 0 } : { x: -80 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          🧍‍♂️
        </motion.div>

        {/* Right Person (You) */}
        <motion.div
          className="absolute text-7xl"
          initial={{ x: 80 }}
          animate={isHugging ? { x: 0 } : { x: 80 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={{ transform: "scaleX(-1)" }}
        >
          🧍‍♀️
        </motion.div>

        {/* Hug Effect */}
        <AnimatePresence>
          {isHugging && (
            <>
              {/* Heart burst */}
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 30 * Math.PI / 180) * 100,
                    y: Math.sin(i * 30 * Math.PI / 180) * 100,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                >
                  {i % 2 === 0 ? "💕" : "✨"}
                </motion.span>
              ))}

              {/* Warm glow */}
              <motion.div
                className="absolute w-40 h-40 bg-gradient-radial from-pink-300/50 to-transparent rounded-full blur-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />

              {/* Embraced heart */}
              <motion.span
                className="absolute text-5xl z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                🫂
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Hug Button */}
      <motion.button
        onClick={sendHug}
        disabled={isHugging}
        className={`px-8 py-4 rounded-full font-medium text-lg shadow-xl transition-all ${
          isHugging 
            ? "bg-pink-300 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-orange-400 to-rose-500 text-white hover:shadow-2xl"
        }`}
        whileHover={!isHugging ? { scale: 1.05 } : {}}
        whileTap={!isHugging ? { scale: 0.95 } : {}}
      >
        {isHugging ? "🤗 Hugging..." : "Send a Virtual Hug 🫂"}
      </motion.button>

      {/* Hug Counter */}
      <motion.p
        className="text-orange-500 font-medium"
        animate={{ scale: hugCount > 0 ? [1, 1.1, 1] : 1 }}
        key={hugCount}
      >
        {hugCount > 0 && `You've sent ${hugCount} hugs to Puntuu! 💕`}
      </motion.p>

      {/* Message */}
      <AnimatePresence>
        {isHugging && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-orange-600 font-serif italic text-lg"
          >
            "In your hug, I find my peace..."
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
