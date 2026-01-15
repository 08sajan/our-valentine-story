import { motion } from "framer-motion";

export const Fireflies = () => {
  const fireflies = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {fireflies.map(fly => (
        <motion.div
          key={fly.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${fly.initialX}%`,
            top: `${fly.initialY}%`,
            background: "radial-gradient(circle, #fef08a 0%, #facc15 50%, transparent 70%)",
            boxShadow: "0 0 10px 5px rgba(250, 204, 21, 0.4), 0 0 20px 10px rgba(250, 204, 21, 0.2)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 1, 0.5, 1, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
