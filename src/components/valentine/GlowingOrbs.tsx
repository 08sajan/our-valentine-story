export const GlowingOrbs = () => {
  const orbs = [
    { color: "rgba(255, 105, 180, 0.15)", size: 250, x: 10, y: 20 },
    { color: "rgba(255, 20, 147, 0.1)", size: 200, x: 70, y: 60 },
    { color: "rgba(186, 85, 211, 0.1)", size: 180, x: 40, y: 80 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl animate-pulse"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animationDuration: `${6 + i * 2}s`,
            animationDelay: `${i}s`,
          }}
        />
      ))}
    </div>
  );
};
