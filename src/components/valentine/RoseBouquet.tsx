import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoseBouquetProps {
  targetCount?: number;
  duration?: number;
}

export const RoseBouquet = ({ targetCount = 10000, duration = 5000 }: RoseBouquetProps) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smoother easing function
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeOutExpo * targetCount);
      
      setCount(currentCount);
      
      if (progress >= 1) {
        clearInterval(interval);
        setIsComplete(true);
        setTimeout(() => setShowBouquet(true), 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetCount, duration]);

  // Generate heart-shaped bouquet
  const generateHeartShape = (count: number) => {
    const roses = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      // Heart parametric equations
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
      const scale = 0.6 + Math.random() * 0.4;
      roses.push({ x: x * 4, y: y * 4, scale, delay: i * 0.02 });
    }
    return roses;
  };

  const heartRoses = generateHeartShape(35);

  return (
    <div className="relative min-h-[450px] flex flex-col items-center justify-center">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-rose-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 18}px`,
            }}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Counter Display */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl md:text-8xl font-bold"
          style={{
            background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 30px rgba(244, 63, 94, 0.3)",
          }}
          animate={isComplete ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          {count.toLocaleString()}
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-rose-300 font-serif mt-3 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          roses for you, my Puntuu 🌹
        </motion.p>
      </motion.div>

      {/* Heart-Shaped Bouquet Reveal */}
      <AnimatePresence>
        {showBouquet && (
          <motion.div
            className="relative flex justify-center items-center mt-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
          >
            {/* Heart shape of roses */}
            <div className="relative w-80 h-72">
              {heartRoses.map((rose, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: rose.scale,
                    x: rose.x,
                    y: rose.y,
                  }}
                  transition={{ 
                    delay: rose.delay,
                    type: "spring",
                    damping: 15,
                  }}
                >
                  <motion.span
                    className="text-3xl block"
                    animate={{ 
                      rotate: [-3, 3, -3],
                    }}
                    transition={{ 
                      duration: 2 + Math.random(), 
                      repeat: Infinity,
                      delay: rose.delay,
                    }}
                  >
                    🌹
                  </motion.span>
                </motion.div>
              ))}
              
              {/* Center heart */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring", damping: 10 }}
              >
                💖
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-4 z-10"
          >
            <motion.p
              className="text-lg text-rose-200/90 italic font-serif max-w-sm mx-auto px-4"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "Even 10,000 roses aren't enough to show what you mean to me"
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle effect around counter */}
      {isComplete && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute left-1/2 top-20 text-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
                x: Math.cos(i * 30 * Math.PI / 180) * 120 - 12,
                y: Math.sin(i * 30 * Math.PI / 180) * 80,
              }}
              transition={{
                duration: 2,
                delay: i * 0.15 + 1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
