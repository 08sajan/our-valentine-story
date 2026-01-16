import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicKiss = () => {
  const [kissed, setKissed] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const sendKiss = () => {
    setKissed(true);
    
    // Create floating hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 100,
      y: 50 + (Math.random() - 0.5) * 50,
    }));
    setHearts(newHearts);

    // Vibrate
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }

    setTimeout(() => {
      setKissed(false);
      setHearts([]);
    }, 4000);
  };

  return (
    <div className="relative text-center space-y-6">
      {/* Kiss Animation Container */}
      <div className="relative h-64 flex items-center justify-center overflow-hidden">
        {/* Floating Hearts Background */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="absolute text-2xl pointer-events-none"
              initial={{ 
                x: `${heart.x}%`, 
                y: `${heart.y}%`,
                scale: 0,
                opacity: 1 
              }}
              animate={{
                y: "-100%",
                scale: [0, 1, 1],
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              {["❤️", "💕", "💗", "💖", "💘"][Math.floor(Math.random() * 5)]}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Main Kiss Display */}
        <motion.div
          className="relative z-10"
          animate={kissed ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-8xl block"
            animate={kissed ? { 
              scale: [1, 1.3, 1],
              textShadow: [
                "0 0 0px transparent",
                "0 0 30px rgba(255, 100, 150, 0.8)",
                "0 0 0px transparent"
              ]
            } : {}}
            transition={{ duration: 1, repeat: kissed ? Infinity : 0 }}
          >
            💋
          </motion.span>

          {/* Sparkle ring */}
          <AnimatePresence>
            {kissed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [1, 1, 0],
                      x: Math.cos(i * 45 * Math.PI / 180) * 60,
                      y: Math.sin(i * 45 * Math.PI / 180) * 60,
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    ✨
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Romantic Glow */}
        <AnimatePresence>
          {kissed && (
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-pink-200/30 via-transparent to-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Kiss Button */}
      <motion.button
        onClick={sendKiss}
        disabled={kissed}
        className={`px-8 py-4 rounded-full font-medium text-lg shadow-xl transition-all ${
          kissed 
            ? "bg-pink-300 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-2xl"
        }`}
        whileHover={!kissed ? { scale: 1.05 } : {}}
        whileTap={!kissed ? { scale: 0.95 } : {}}
      >
        {kissed ? "💋 Sending love..." : "Send a Kiss 💋"}
      </motion.button>

      {/* Romantic Message */}
      <AnimatePresence mode="wait">
        {kissed && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-red-500 font-serif italic text-lg"
          >
            "In your kiss, I taste forever..."
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
