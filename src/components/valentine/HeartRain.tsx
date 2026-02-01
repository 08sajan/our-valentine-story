import { motion } from "framer-motion";

export const HeartRain = () => {
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 6,
    size: 12 + Math.random() * 16,
    emoji: ['💕', '💖', '💗', '❤️', '💘', '💝', '🩷', '🤍'][Math.floor(Math.random() * 8)],
    rotation: Math.random() * 60 - 30,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: "-10%",
            fontSize: heart.size,
            filter: "drop-shadow(0 0 8px rgba(255, 105, 180, 0.5))",
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, Math.sin(heart.id) * 30, Math.cos(heart.id) * 20, 0],
            rotate: [heart.rotation, heart.rotation + 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
};
