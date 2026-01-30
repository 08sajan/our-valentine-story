import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchCardProps {
  children: React.ReactNode;
  coverText?: string;
  coverEmoji?: string;
  onReveal?: () => void;
}

export const ScratchCard = ({ 
  children, 
  coverText = "Scratch to reveal", 
  coverEmoji = "✨",
  onReveal 
}: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Create gradient cover - FULLY OPAQUE with shimmer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#f472b6");
    gradient.addColorStop(0.3, "#ec4899");
    gradient.addColorStop(0.6, "#db2777");
    gradient.addColorStop(1, "#be185d");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add sparkle pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 1 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text with better visibility
    ctx.fillStyle = "white";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw text shadow for better visibility
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 6;
    ctx.fillText(coverText, canvas.width / 2, canvas.height / 2 - 15);
    
    ctx.font = "40px sans-serif";
    ctx.fillText(coverEmoji, canvas.width / 2, canvas.height / 2 + 30);
    ctx.shadowBlur = 0;

    setIsInitialized(true);
  }, [coverText, coverEmoji, isRevealed]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const canvasX = x - rect.left;
    const canvasY = y - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 35, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percentage = (transparent / (imageData.data.length / 4)) * 100;

    if (percentage > 12 && !isRevealed) {
      setIsRevealed(true);
      setShowCelebration(true);
      onReveal?.();
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 30, 50, 30, 100]);
      }
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isScratching) return;
    scratch(clientX, clientY);
  };

  const celebrationEmojis = ['✨', '💕', '🌟', '💖', '⭐', '🎉', '💫', '🌹', '💝', '🎊'];

  return (
    <div ref={containerRef} className="relative rounded-2xl overflow-hidden min-h-[200px]">
      {/* Hidden content - COMPLETELY hidden until scratched */}
      <div className={`relative z-0 ${!isRevealed && isInitialized ? 'invisible' : 'visible'}`}>
        {children}
      </div>

      {/* Scratch overlay - FULLY COVERING */}
      {!isRevealed && (
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 cursor-pointer touch-none"
          style={{ 
            width: '100%', 
            height: '100%',
            backgroundColor: '#ec4899'
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
          }}
        />
      )}

      {/* Enhanced Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {/* Burst from center */}
            {[...Array(40)].map((_, i) => (
              <motion.span
                key={`burst-${i}`}
                className="absolute text-2xl pointer-events-none z-30"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  x: (Math.cos(i * (360 / 40) * Math.PI / 180)) * (100 + Math.random() * 100),
                  y: (Math.sin(i * (360 / 40) * Math.PI / 180)) * (100 + Math.random() * 100),
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1.5, delay: i * 0.02, ease: "easeOut" }}
              >
                {celebrationEmojis[i % celebrationEmojis.length]}
              </motion.span>
            ))}

            {/* Floating hearts rising */}
            {[...Array(20)].map((_, i) => (
              <motion.span
                key={`float-${i}`}
                className="absolute text-xl pointer-events-none z-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: 0,
                }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{ 
                  y: -300,
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1],
                  x: Math.sin(i) * 30,
                }}
                transition={{ duration: 2, delay: 0.5 + i * 0.05, ease: "easeOut" }}
              >
                {['💕', '💖', '💗', '❤️', '🌹'][i % 5]}
              </motion.span>
            ))}

            {/* Glowing ring effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl border-4 border-pink-400"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(244, 114, 182, 0.8)',
                    '0 0 30px 20px rgba(244, 114, 182, 0)',
                  ],
                }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
