import { motion } from "framer-motion";

export const GlowingOrbs = () => {
  const orbs = [
    { color: "rgba(255, 105, 180, 0.4)", size: 300, x: 10, y: 20 },
    { color: "rgba(255, 20, 147, 0.3)", size: 250, x: 70, y: 60 },
    { color: "rgba(219, 112, 147, 0.35)", size: 280, x: 40, y: 80 },
    { color: "rgba(186, 85, 211, 0.25)", size: 200, x: 80, y: 15 },
    { color: "rgba(255, 182, 193, 0.3)", size: 220, x: 25, y: 50 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.3, 0.8, 1.1, 1],
            opacity: [0.5, 0.8, 0.4, 0.7, 0.5],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Smaller accent orbs */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute rounded-full"
          style={{
            width: 20 + Math.random() * 40,
            height: 20 + Math.random() * 40,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, 
              rgba(255, 255, 255, 0.6) 0%, 
              rgba(255, 182, 193, 0.3) 50%, 
              transparent 100%
            )`,
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};
