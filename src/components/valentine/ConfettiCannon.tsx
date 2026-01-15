import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  scale: number;
}

export const ConfettiCannon = ({ trigger }: { trigger: boolean }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  const colors = [
    "#ff69b4", "#ff1493", "#ff6b6b", "#ffd700", "#ff69b4", 
    "#ff85c1", "#ffb3d9", "#ff4081", "#e91e63", "#f06292"
  ];

  useEffect(() => {
    if (trigger) {
      const newConfetti: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      }));
      
      setConfetti(newConfetti);
      
      // Clean up after animation
      setTimeout(() => {
        setConfetti([]);
      }, 5000);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {confetti.map(piece => (
        <motion.div
          key={piece.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${piece.x}%`,
            top: -20,
          }}
          initial={{ 
            y: 0, 
            rotate: 0, 
            opacity: 1,
            scale: piece.scale,
          }}
          animate={{ 
            y: window.innerHeight + 100, 
            rotate: piece.rotation + 720,
            x: (Math.random() - 0.5) * 200,
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            ease: "easeIn",
          }}
        >
          <div 
            className="w-3 h-3 rounded-sm"
            style={{ 
              backgroundColor: piece.color,
              transform: Math.random() > 0.5 ? "rotate(45deg)" : "",
            }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
