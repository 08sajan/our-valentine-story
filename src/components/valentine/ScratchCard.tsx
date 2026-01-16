import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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

    // Create gradient cover - FULLY OPAQUE
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#f472b6");
    gradient.addColorStop(0.5, "#ec4899");
    gradient.addColorStop(1, "#db2777");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add sparkle pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text with better visibility
    ctx.fillStyle = "white";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw text shadow for better visibility
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 4;
    ctx.fillText(coverText, canvas.width / 2, canvas.height / 2 - 15);
    
    ctx.font = "36px sans-serif";
    ctx.fillText(coverEmoji, canvas.width / 2, canvas.height / 2 + 25);
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
    ctx.arc(canvasX, canvasY, 30, 0, Math.PI * 2);
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
      onReveal?.();
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 30, 50]);
      }
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isScratching) return;
    scratch(clientX, clientY);
  };

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
            backgroundColor: '#ec4899' // Fallback before canvas draws
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

      {/* Reveal animation */}
      {isRevealed && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {[...Array(25)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.8, 0], 
                rotate: 360,
                y: -60,
              }}
              transition={{ duration: 1, delay: i * 0.03 }}
            >
              ✨
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
};
