import { motion } from "framer-motion";

// Glowing pulse ring for buttons
export const GlowingPulse = ({ color = "pink" }: { color?: string }) => (
  <motion.div
    className={`absolute inset-0 rounded-full bg-${color}-500/30`}
    animate={{
      scale: [1, 1.4, 1],
      opacity: [0.6, 0, 0.6],
    }}
    transition={{ duration: 2, repeat: Infinity }}
  />
);

// Floating sparkles background
export const FloatingSparkles = ({ count = 20 }: { count?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          y: [0, -30, -60],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      >
        <span className="text-yellow-300 text-xs">✨</span>
      </motion.div>
    ))}
  </div>
);

// Heart burst animation
export const HeartBurst = ({ show }: { show: boolean }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: '50%', top: '50%' }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            x: (Math.cos(i * (360 / 40) * Math.PI / 180)) * (150 + Math.random() * 100),
            y: (Math.sin(i * (360 / 40) * Math.PI / 180)) * (150 + Math.random() * 100),
            opacity: [1, 1, 0],
            rotate: Math.random() * 720,
          }}
          transition={{ duration: 1.5, delay: i * 0.02 }}
        >
          {['💕', '💖', '💗', '❤️', '✨', '🌹', '💫'][i % 7]}
        </motion.div>
      ))}
    </div>
  );
};

// Romantic shimmer line
export const ShimmerLine = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
    animate={{ x: ['-200%', '200%'] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
  />
);

// Pulsing heart icon
export const PulsingHeart = ({ className = "" }: { className?: string }) => (
  <motion.span
    className={`inline-block ${className}`}
    animate={{ scale: [1, 1.3, 1] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    💕
  </motion.span>
);

// Rising hearts
export const RisingHearts = ({ count = 15 }: { count?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-lg"
        style={{
          left: `${Math.random() * 100}%`,
          bottom: '-5%',
        }}
        animate={{
          y: [0, -500],
          x: [0, (Math.random() - 0.5) * 80],
          opacity: [0, 0.8, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      >
        {['💕', '💖', '💗', '❤️', '🌹'][i % 5]}
      </motion.div>
    ))}
  </div>
);

// Glowing border animation
export const GlowingBorder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <motion.div
      className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 opacity-50 blur-sm"
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.02, 1],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <div className="relative">{children}</div>
  </div>
);

// Confetti celebration
export const ConfettiCelebration = ({ show }: { show: boolean }) => {
  if (!show) return null;

  const emojis = ['🎉', '🎊', '✨', '💕', '🌟', '💖', '⭐', '💫', '🎈', '🌹'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ 
            left: `${Math.random() * 100}%`,
            top: '-5%',
          }}
          animate={{
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotate: Math.random() * 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 1.5,
          }}
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
};
