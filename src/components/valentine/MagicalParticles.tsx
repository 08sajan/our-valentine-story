import { motion } from "framer-motion";

export const MagicalParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
    type: Math.random() > 0.5 ? 'circle' : 'diamond',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.5, 1, 0.5],
            y: [0, -50, -100],
            x: [0, (Math.random() - 0.5) * 40],
            rotate: particle.type === 'diamond' ? [0, 180, 360] : [0, 0, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        >
          {particle.type === 'circle' ? (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, 
                  rgba(255, 215, 0, 0.9) 0%, 
                  rgba(255, 105, 180, 0.6) 50%, 
                  transparent 100%
                )`,
                boxShadow: `
                  0 0 ${particle.size * 2}px rgba(255, 215, 0, 0.5),
                  0 0 ${particle.size * 4}px rgba(255, 105, 180, 0.3)
                `,
              }}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(255, 182, 193, 0.7) 50%, 
                  rgba(255, 105, 180, 0.5) 100%
                )`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                boxShadow: `0 0 ${particle.size * 3}px rgba(255, 255, 255, 0.6)`,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Larger floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-400/30"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '-10%',
            fontSize: 20 + Math.random() * 20,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "linear",
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
};
