import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const SparkleTrail = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  
  useEffect(() => {
    let sparkleId = 0;
    const colors = [
      "rgba(255, 215, 0, 0.9)",
      "rgba(255, 105, 180, 0.9)",
      "rgba(255, 255, 255, 0.9)",
      "rgba(255, 182, 193, 0.9)",
      "rgba(255, 20, 147, 0.9)",
    ];

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.6) {
        const newSparkle: Sparkle = {
          id: sparkleId++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: 4 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setSparkles(prev => [...prev.slice(-20), newSparkle]);

        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 800);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [1, 0.8, 0],
              y: [0, -30],
              rotate: [0, 180],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                d="M12 0L14.59 8.41L24 12L14.59 15.59L12 24L9.41 15.59L0 12L9.41 8.41Z"
                fill={sparkle.color}
                style={{
                  filter: `drop-shadow(0 0 4px ${sparkle.color})`,
                }}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
