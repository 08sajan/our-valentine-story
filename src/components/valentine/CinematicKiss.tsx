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
      <div className="relative h-72 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-red-900/20 to-pink-900/20">
        
        {/* Romantic sunset background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,100,100,0.1) 0%, rgba(255,50,100,0.15) 50%, rgba(200,50,100,0.1) 100%)',
          }}
          animate={kissed ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Couple silhouette - Man leaning in */}
        <motion.div
          className="absolute z-10"
          style={{ left: 'calc(50% - 85px)' }}
          initial={{ x: -40, rotate: 0 }}
          animate={kissed ? { x: 10, rotate: 8 } : { x: -40, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 15 }}
        >
          <svg width="100" height="180" viewBox="0 0 100 180" fill="none">
            {/* Man silhouette */}
            <ellipse cx="50" cy="25" rx="20" ry="22" fill="url(#manKissGradient)" />
            <path d="M25 55 C20 70 15 100 20 140 L35 140 L40 90 L50 90 L60 90 L65 140 L80 140 C85 100 80 70 75 55 C70 45 60 42 50 42 C40 42 30 45 25 55Z" fill="url(#manKissGradient)" />
            {/* Arms reaching */}
            <motion.path
              d="M25 60 C15 70 10 85 20 100"
              stroke="url(#manKissGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              animate={kissed ? { d: "M25 60 C35 55 50 50 65 55" } : { d: "M25 60 C15 70 10 85 20 100" }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M75 60 C85 70 90 85 80 100"
              stroke="url(#manKissGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              animate={kissed ? { d: "M75 60 C85 55 95 60 100 70" } : { d: "M75 60 C85 70 90 85 80 100" }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="manKissGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3d2817" />
                <stop offset="100%" stopColor="#2d1f15" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Couple silhouette - Woman leaning in */}
        <motion.div
          className="absolute z-10"
          style={{ left: 'calc(50% - 15px)' }}
          initial={{ x: 40, rotate: 0 }}
          animate={kissed ? { x: -10, rotate: -8 } : { x: 40, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 15 }}
        >
          <svg width="100" height="180" viewBox="0 0 100 180" fill="none">
            {/* Woman silhouette with hair */}
            <ellipse cx="50" cy="22" rx="18" ry="20" fill="url(#womanKissGradient)" />
            {/* Long flowing hair */}
            <path d="M32 20 C22 28 18 45 22 65 C18 80 24 95 32 90 L32 55 C32 42 36 30 42 22 L32 20Z" fill="url(#womanKissGradient)" />
            <path d="M68 20 C78 28 82 45 78 65 C82 80 76 95 68 90 L68 55 C68 42 64 30 58 22 L68 20Z" fill="url(#womanKissGradient)" />
            {/* Dress body */}
            <path d="M35 45 C28 58 22 80 18 140 L82 140 C78 80 72 58 65 45 C60 38 55 36 50 36 C45 36 40 38 35 45Z" fill="url(#dressKissGradient)" />
            {/* Arms reaching */}
            <motion.path
              d="M35 50 C25 62 20 78 28 92"
              stroke="url(#womanKissGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              animate={kissed ? { d: "M35 50 C25 48 10 52 0 60" } : { d: "M35 50 C25 62 20 78 28 92" }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M65 50 C75 62 80 78 72 92"
              stroke="url(#womanKissGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              animate={kissed ? { d: "M65 50 C55 48 40 45 30 50" } : { d: "M65 50 C75 62 80 78 72 92" }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="womanKissGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a3020" />
                <stop offset="100%" stopColor="#2d1810" />
              </linearGradient>
              <linearGradient id="dressKissGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Kiss Effect */}
        <AnimatePresence>
          {kissed && (
            <>
              {/* Heart explosion */}
              {[...Array(20)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl z-20"
                  initial={{ scale: 0, opacity: 1, x: 0, y: -20 }}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 18 * Math.PI / 180) * 130,
                    y: Math.sin(i * 18 * Math.PI / 180) * 130 - 20,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.04 }}
                >
                  {i % 4 === 0 ? "💋" : i % 4 === 1 ? "❤️" : i % 4 === 2 ? "✨" : "💕"}
                </motion.span>
              ))}

              {/* Romantic glow */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-radial from-red-400/40 via-pink-400/20 to-transparent rounded-full blur-3xl z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />

              {/* Kiss emoji at contact point */}
              <motion.span
                className="absolute text-5xl z-30"
                style={{ top: '20%' }}
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
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={`sparkle-${i}`}
                  className="absolute text-xl z-25"
                  style={{ top: '15%' }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 45 * Math.PI / 180) * 50,
                    y: Math.sin(i * 45 * Math.PI / 180) * 50,
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.5 + i * 0.08,
                    repeat: 2,
                    repeatDelay: 0.5
                  }}
                >
                  ✨
                </motion.span>
              ))}

              {/* Romantic text */}
              <motion.p
                className="absolute bottom-4 text-white font-serif text-lg z-30"
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
