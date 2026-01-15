import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorHeart {
  id: number;
  x: number;
  y: number;
}

export const HeartCursor = () => {
  const [hearts, setHearts] = useState<CursorHeart[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let heartId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Add trailing hearts occasionally
      if (Math.random() > 0.85) {
        const newHeart: CursorHeart = {
          id: heartId++,
          x: e.clientX,
          y: e.clientY,
        };
        
        setHearts(prev => [...prev.slice(-10), newHeart]);
        
        // Remove heart after animation
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: cursorPos.x - 10,
          top: cursorPos.y - 10,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <span className="text-xl">💕</span>
      </motion.div>

      {/* Trailing hearts */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-[9998]"
            initial={{ 
              x: heart.x - 8, 
              y: heart.y - 8, 
              scale: 1, 
              opacity: 1 
            }}
            animate={{ 
              y: heart.y - 50, 
              scale: 0, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-pink-400 text-sm">❤️</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
