import { motion } from "framer-motion";

export const AuroraGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary aurora wave */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255, 105, 180, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(186, 85, 211, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 80%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Flowing aurora ribbons */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[40vh] blur-3xl"
          style={{
            width: "120%",
            left: "-10%",
            top: `${20 + i * 25}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${i === 0 ? 'rgba(255, 105, 180, 0.08)' : i === 1 ? 'rgba(219, 112, 147, 0.06)' : 'rgba(255, 182, 193, 0.07)'} 25%,
              ${i === 0 ? 'rgba(255, 20, 147, 0.1)' : i === 1 ? 'rgba(186, 85, 211, 0.08)' : 'rgba(255, 105, 180, 0.09)'} 50%,
              ${i === 0 ? 'rgba(219, 112, 147, 0.08)' : i === 1 ? 'rgba(255, 105, 180, 0.06)' : 'rgba(186, 85, 211, 0.07)'} 75%,
              transparent 100%
            )`,
            transform: `rotate(${-5 + i * 5}deg)`,
          }}
          animate={{
            x: ["-20%", "20%", "-20%"],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Soft glow orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 30}%`,
            background: `radial-gradient(circle, 
              ${['rgba(255,105,180,0.2)', 'rgba(255,20,147,0.15)', 'rgba(219,112,147,0.18)', 'rgba(186,85,211,0.12)', 'rgba(255,182,193,0.2)'][i]} 0%, 
              transparent 70%
            )`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.6, 0.4, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
};
