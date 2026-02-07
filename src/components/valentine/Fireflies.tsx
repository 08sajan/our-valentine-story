import { useMemo } from "react";

export const Fireflies = () => {
  const fireflies = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {fireflies.map(fly => (
        <div
          key={fly.id}
          className="absolute w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            background: "radial-gradient(circle, #fef08a 0%, #facc15 50%, transparent 70%)",
            boxShadow: "0 0 6px 3px rgba(250, 204, 21, 0.3)",
            animationDuration: `${fly.duration}s`,
            animationDelay: `${fly.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
