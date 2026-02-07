export const AuroraGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Single smooth gradient - CSS only, no JS animation */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255, 105, 180, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(186, 85, 211, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 80%, rgba(255, 20, 147, 0.06) 0%, transparent 50%)
          `,
          opacity: 0.7,
        }}
      />
    </div>
  );
};
