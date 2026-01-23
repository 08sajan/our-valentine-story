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

    setTimeout(() => setIsHugging(false), 4000);
  };

  return (
    <div className="relative text-center space-y-6">
      {/* Cinematic Hug Animation Container */}
      <div className="relative h-72 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-orange-900/20 to-rose-900/20">
        
        {/* Romantic background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-orange-500/10"
          animate={isHugging ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Couple Silhouette - Man */}
        <motion.div
          className="absolute z-10"
          style={{ left: 'calc(50% - 80px)' }}
          initial={{ x: -60 }}
          animate={isHugging ? { x: 0 } : { x: -60 }}
          transition={{ duration: 0.8, type: "spring", damping: 15 }}
        >
          <svg width="100" height="180" viewBox="0 0 100 180" fill="none">
            {/* Man silhouette */}
            <ellipse cx="50" cy="25" rx="20" ry="22" fill="url(#manGradient)" />
            <path d="M25 55 C20 70 15 100 20 140 L35 140 L40 90 L50 90 L60 90 L65 140 L80 140 C85 100 80 70 75 55 C70 45 60 42 50 42 C40 42 30 45 25 55Z" fill="url(#manGradient)" />
            {/* Arms */}
            <motion.path
              d="M25 60 C10 75 5 95 15 110"
              stroke="url(#manGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              animate={isHugging ? { d: "M25 60 C40 75 55 85 70 80" } : { d: "M25 60 C10 75 5 95 15 110" }}
              transition={{ duration: 0.6 }}
            />
            <motion.path
              d="M75 60 C90 75 95 95 85 110"
              stroke="url(#manGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              animate={isHugging ? { d: "M75 60 C90 65 100 75 95 90" } : { d: "M75 60 C90 75 95 95 85 110" }}
              transition={{ duration: 0.6 }}
            />
            <defs>
              <linearGradient id="manGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a3728" />
                <stop offset="100%" stopColor="#2d1f15" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Couple Silhouette - Woman */}
        <motion.div
          className="absolute z-10"
          style={{ left: 'calc(50% - 20px)' }}
          initial={{ x: 60 }}
          animate={isHugging ? { x: 0 } : { x: 60 }}
          transition={{ duration: 0.8, type: "spring", damping: 15 }}
        >
          <svg width="100" height="180" viewBox="0 0 100 180" fill="none">
            {/* Woman silhouette with hair */}
            <ellipse cx="50" cy="22" rx="18" ry="20" fill="url(#womanGradient)" />
            {/* Long hair */}
            <path d="M32 20 C25 25 22 40 25 55 C22 70 28 85 35 80 L35 50 C35 40 38 30 42 25 L32 20Z" fill="url(#womanGradient)" />
            <path d="M68 20 C75 25 78 40 75 55 C78 70 72 85 65 80 L65 50 C65 40 62 30 58 25 L68 20Z" fill="url(#womanGradient)" />
            {/* Dress body */}
            <path d="M35 45 C30 55 25 75 20 140 L80 140 C75 75 70 55 65 45 C60 40 55 38 50 38 C45 38 40 40 35 45Z" fill="url(#dressGradient)" />
            {/* Arms */}
            <motion.path
              d="M35 50 C20 65 15 85 25 100"
              stroke="url(#womanGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              animate={isHugging ? { d: "M35 50 C20 55 10 65 5 80" } : { d: "M35 50 C20 65 15 85 25 100" }}
              transition={{ duration: 0.6 }}
            />
            <motion.path
              d="M65 50 C80 65 85 85 75 100"
              stroke="url(#womanGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              animate={isHugging ? { d: "M65 50 C50 65 35 70 25 65" } : { d: "M65 50 C80 65 85 85 75 100" }}
              transition={{ duration: 0.6 }}
            />
            <defs>
              <linearGradient id="womanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5c4033" />
                <stop offset="100%" stopColor="#3d2817" />
              </linearGradient>
              <linearGradient id="dressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#be185d" />
                <stop offset="100%" stopColor="#9d174d" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Hug Effect */}
        <AnimatePresence>
          {isHugging && (
            <>
              {/* Heart burst */}
              {[...Array(16)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl z-20"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 22.5 * Math.PI / 180) * 120,
                    y: Math.sin(i * 22.5 * Math.PI / 180) * 120,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.05 }}
                >
                  {i % 3 === 0 ? "💕" : i % 3 === 1 ? "✨" : "💗"}
                </motion.span>
              ))}

              {/* Warm glow */}
              <motion.div
                className="absolute w-60 h-60 bg-gradient-radial from-pink-400/40 via-orange-300/20 to-transparent rounded-full blur-2xl z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />

              {/* Embraced heart */}
              <motion.span
                className="absolute text-6xl z-30"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: [0, 1.5, 1], opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                🫂
              </motion.span>

              {/* "Together" text */}
              <motion.p
                className="absolute bottom-4 text-white font-serif text-lg z-30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
              >
                In your arms, I'm home 💕
              </motion.p>
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
            : "bg-gradient-to-r from-orange-400 to-rose-500 text-white hover:shadow-2xl hover:shadow-rose-500/30"
        }`}
        whileHover={!isHugging ? { scale: 1.05 } : {}}
        whileTap={!isHugging ? { scale: 0.95 } : {}}
      >
        {isHugging ? "🤗 Feeling the warmth..." : "Send a Virtual Hug 🫂"}
      </motion.button>

      {/* Hug Counter */}
      <motion.p
        className="text-orange-400 font-medium"
        animate={{ scale: hugCount > 0 ? [1, 1.1, 1] : 1 }}
        key={hugCount}
      >
        {hugCount > 0 && `You've sent ${hugCount} warm hugs to Puntuu! 💕`}
      </motion.p>

      {/* Message */}
      <AnimatePresence>
        {isHugging && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-orange-300 font-serif italic text-lg"
          >
            "In your hug, I find my peace..."
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
