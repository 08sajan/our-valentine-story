import { motion } from "framer-motion";

export const ParallaxStars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.5)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Shooting stars */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: "0 0 10px 2px white, -20px 0 15px 1px rgba(255,255,255,0.5)",
          }}
          initial={{ x: "110%", y: "-10%" }}
          animate={{ x: "-10%", y: "110%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 8 + Math.random() * 4,
            repeatDelay: 15,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
