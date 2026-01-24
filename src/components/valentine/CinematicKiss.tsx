import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicKiss = () => {
  const [kissed, setKissed] = useState(false);
  const [kissCount, setKissCount] = useState(0);

  const sendKiss = () => {
    setKissed(true);
    setKissCount(prev => prev + 1);

    // Vibrate
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }

    setTimeout(() => {
      setKissed(false);
    }, 4000);
  };

  return (
    <div className="relative text-center space-y-6">
      {/* Kiss Animation Container */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-red-900/30 to-pink-900/30">
        
        {/* Romantic sunset background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,100,100,0.15) 0%, rgba(255,50,100,0.2) 50%, rgba(200,50,100,0.15) 100%)',
          }}
          animate={kissed ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Real Romantic Couple Kiss Image */}
        <motion.div
          className="relative z-10 w-full h-full overflow-hidden"
          initial={{ scale: 1 }}
          animate={kissed ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800"
            alt="Romantic couple kissing"
            className="w-full h-full object-cover transition-all duration-700"
            style={{ 
              objectPosition: 'center 25%',
              filter: kissed ? 'brightness(1.1) saturate(1.2)' : 'brightness(1)'
            }}
          />
          
          {/* Pink glow overlay when kissing */}
          <motion.div 
            className="absolute inset-0 bg-gradient-radial from-pink-500/40 via-red-400/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: kissed ? 0.7 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Kiss Effect */}
        <AnimatePresence>
          {kissed && (
            <>
              {/* Heart explosion */}
              {[...Array(24)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl z-20"
                  initial={{ scale: 0, opacity: 1, x: 0, y: -20 }}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 15 * Math.PI / 180) * 140,
                    y: Math.sin(i * 15 * Math.PI / 180) * 140 - 20,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.03 }}
                >
                  {i % 5 === 0 ? "💋" : i % 5 === 1 ? "❤️" : i % 5 === 2 ? "✨" : i % 5 === 3 ? "💕" : "💗"}
                </motion.span>
              ))}

              {/* Romantic glow */}
              <motion.div
                className="absolute w-80 h-80 bg-gradient-radial from-red-400/50 via-pink-400/30 to-transparent rounded-full blur-3xl z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />

              {/* Kiss emoji at center */}
              <motion.span
                className="absolute text-6xl z-30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 1.5], 
                  opacity: 1,
                  rotate: [0, 15, -15, 0]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                💋
              </motion.span>

              {/* Sparkle ring */}
              {[...Array(10)].map((_, i) => (
                <motion.span
                  key={`sparkle-${i}`}
                  className="absolute text-xl z-25"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 36 * Math.PI / 180) * 60,
                    y: Math.sin(i * 36 * Math.PI / 180) * 60,
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.5 + i * 0.06,
                    repeat: 2,
                    repeatDelay: 0.5
                  }}
                >
                  ✨
                </motion.span>
              ))}

              {/* Romantic text */}
              <motion.p
                className="absolute bottom-6 text-white font-serif text-lg z-30 drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
              >
                Where magic happens 💋
              </motion.p>
            </>
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
            : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-pink-500/30"
        }`}
        whileHover={!kissed ? { scale: 1.05 } : {}}
        whileTap={!kissed ? { scale: 0.95 } : {}}
      >
        {kissed ? "💋 Sending love..." : "Send a Kiss 💋"}
      </motion.button>

      {/* Kiss Counter */}
      <motion.p
        className="text-pink-400 font-medium"
        animate={{ scale: kissCount > 0 ? [1, 1.1, 1] : 1 }}
        key={kissCount}
      >
        {kissCount > 0 && `You've sent ${kissCount} magical kisses! 💕`}
      </motion.p>

      {/* Romantic Message */}
      <AnimatePresence mode="wait">
        {kissed && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-red-400 font-serif italic text-lg"
          >
            "In your kiss, I taste forever..."
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
