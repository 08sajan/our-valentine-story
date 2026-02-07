import { useMemo } from "react";

export const ParallaxStars = () => {
  const stars = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: 0.4,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.2)`,
          }}
        />
      ))}
    </div>
  );
};
