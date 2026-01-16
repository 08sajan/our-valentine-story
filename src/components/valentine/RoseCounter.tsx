import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RoseCounterProps {
  targetCount?: number;
  duration?: number;
}

export const RoseCounter = ({ targetCount = 10000, duration = 5000 }: RoseCounterProps) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetCount);
      
      setCount(currentCount);
      
      if (progress >= 1) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetCount, duration]);

  return (
    <div className="relative">
      {/* Rose Rain Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{
              x: `${Math.random() * 100}%`,
              y: -50,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: "120%",
              rotate: 360,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          >
            🌹
          </motion.div>
        ))}
      </div>

      {/* Counter Display */}
      <motion.div
        className="relative z-10 text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
          animate={isComplete ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {count.toLocaleString()}
        </motion.div>
        
        <motion.p
          className="text-2xl md:text-3xl text-rose-600 font-serif mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          roses for you, Puntuu 🌹
        </motion.p>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <motion.p
              className="text-lg text-rose-500/80 italic font-serif max-w-md mx-auto"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "Even 10,000 roses aren't enough to show what you mean to me"
            </motion.p>
          </motion.div>
        )}
      </motion.div>

      {/* Bloom Effect on Complete */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 text-4xl"
              initial={{ scale: 0, x: "-50%", y: "-50%" }}
              animate={{
                scale: [0, 1.5, 0],
                x: `calc(-50% + ${Math.cos(i * 30 * Math.PI / 180) * 150}px)`,
                y: `calc(-50% + ${Math.sin(i * 30 * Math.PI / 180) * 150}px)`,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              🌹
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
