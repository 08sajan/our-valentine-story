import { useMemo } from "react";
import { motion } from "framer-motion";

export const FloatingPetals = () => {
  const petals = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      delay: Math.random() * 8,
      duration: 14 + Math.random() * 6,
      sway: 20 + Math.random() * 30,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-pink-300/60"
          style={{
            left: `${petal.x}%`,
            top: "-5%",
            fontSize: petal.size,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, petal.sway, -petal.sway, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
};
