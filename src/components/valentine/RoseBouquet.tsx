import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoseBouquetProps {
  targetCount?: number;
  duration?: number;
}

export const RoseBouquet = ({ targetCount = 10000, duration = 6000 }: RoseBouquetProps) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);

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
        setTimeout(() => setShowBouquet(true), 500);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetCount, duration]);

  // Generate bouquet roses in a circular pattern
  const bouquetRoses = [...Array(50)].map((_, i) => {
    const angle = (i / 50) * Math.PI * 2;
    const radius = 20 + Math.random() * 80;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const size = 0.5 + Math.random() * 1;
    const delay = i * 0.02;
    return { x, y, size, delay, angle };
  });

  return (
    <div className="relative min-h-[400px]">
      {/* Rose Rain Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
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
            <span className="text-2xl">🌹</span>
          </motion.div>
        ))}
      </div>

      {/* Counter Display */}
      <motion.div
        className="relative z-10 text-center py-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
          animate={isComplete ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {count.toLocaleString()}
        </motion.div>
        
        <motion.p
          className="text-2xl md:text-3xl text-rose-300 font-serif mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          roses for you, Puntuu 🌹
        </motion.p>
      </motion.div>

      {/* 3D Bouquet Reveal */}
      <AnimatePresence>
        {showBouquet && (
          <motion.div
            className="relative flex justify-center items-center py-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Bouquet wrapper */}
            <div className="relative w-64 h-64">
              {/* Wrapper/Ribbon */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-32 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-3xl"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Ribbon */}
                <motion.div
                  className="absolute top-8 left-1/2 -translate-x-1/2 text-3xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
                >
                  🎀
                </motion.div>
              </motion.div>

              {/* Roses in bouquet formation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                {bouquetRoses.map((rose, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      transform: `translate(${rose.x}px, ${rose.y}px) scale(${rose.size})`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: rose.size }}
                    transition={{ delay: rose.delay + 0.5 }}
                  >
                    <motion.span
                      className="text-2xl block"
                      animate={{ 
                        rotate: [-5, 5, -5],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2 + Math.random(), 
                        repeat: Infinity,
                        delay: rose.delay
                      }}
                    >
                      🌹
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Center flower */}
              <motion.div
                className="absolute top-8 left-1/2 -translate-x-1/2 text-5xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                🌹
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center mt-6"
        >
          <motion.p
            className="text-lg text-rose-300/90 italic font-serif max-w-md mx-auto px-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "Even 10,000 roses aren't enough to show what you mean to me, Puntuu"
          </motion.p>
        </motion.div>
      )}

      {/* Bloom Effect */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/3 text-3xl"
              initial={{ scale: 0, x: "-50%", y: "-50%" }}
              animate={{
                scale: [0, 1.5, 0],
                x: `calc(-50% + ${Math.cos(i * 22.5 * Math.PI / 180) * 180}px)`,
                y: `calc(-50% + ${Math.sin(i * 22.5 * Math.PI / 180) * 180}px)`,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.1 + 2,
                repeat: Infinity,
                repeatDelay: 4,
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
