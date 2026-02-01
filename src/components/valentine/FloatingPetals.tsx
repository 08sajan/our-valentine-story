import { motion } from "framer-motion";

export const FloatingPetals = () => {
  const petals = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 20 + 15,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 8,
    rotation: Math.random() * 360,
    swayAmount: 30 + Math.random() * 50,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: "-5%",
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.swayAmount, -petal.swayAmount, petal.swayAmount / 2, 0],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 0.9, 0.9, 0.7, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(255, 100, 150, 0.4))",
            }}
          >
            <ellipse
              cx="50"
              cy="50"
              rx="45"
              ry="25"
              fill="url(#petalGradient)"
              transform="rotate(-30 50 50)"
            />
            <defs>
              <radialGradient id="petalGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffc0cb" />
                <stop offset="50%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#ff1493" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
