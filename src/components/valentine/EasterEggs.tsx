import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShakeHeart {
  id: number;
  x: number;
  y: number;
}

// Hook for shake detection
export const useShakeDetection = (onShake: () => void, threshold = 15) => {
  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    let shakeCount = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const deltaX = Math.abs((acceleration.x || 0) - lastX);
      const deltaY = Math.abs((acceleration.y || 0) - lastY);
      const deltaZ = Math.abs((acceleration.z || 0) - lastZ);

      if (deltaX + deltaY + deltaZ > threshold) {
        shakeCount++;
        if (shakeCount >= 3) {
          onShake();
          shakeCount = 0;
        }
      }

      lastX = acceleration.x || 0;
      lastY = acceleration.y || 0;
      lastZ = acceleration.z || 0;
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [onShake, threshold]);
};

// Shake hearts explosion component
export const ShakeHeartsExplosion = () => {
  const [hearts, setHearts] = useState<ShakeHeart[]>([]);

  const triggerExplosion = useCallback(() => {
    const newHearts: ShakeHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    
    setHearts(newHearts);
    
    // Vibrate if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    
    setTimeout(() => setHearts([]), 2000);
  }, []);

  useShakeDetection(triggerExplosion);

  return (
    <AnimatePresence>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="fixed pointer-events-none z-[100] text-3xl"
          initial={{ 
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2,
            scale: 0,
            opacity: 1,
          }}
          animate={{ 
            x: heart.x, 
            y: heart.y,
            scale: [0, 1.5, 1],
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {["❤️", "💕", "💖", "💗", "💝"][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

// Konami code detector hook
export const useKonamiCode = (onSuccess: () => void) => {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      setInputSequence(prev => {
        const newSequence = [...prev, key].slice(-10);
        
        // Check if sequence matches
        if (newSequence.length === konamiCode.length) {
          const matches = newSequence.every((k, i) => 
            k.toLowerCase() === konamiCode[i].toLowerCase()
          );
          if (matches) {
            onSuccess();
            return [];
          }
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSuccess]);
};

// Konami code secret message
export const KonamiSecret = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useKonamiCode(() => {
    setIsRevealed(true);
    // Vibrate if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  });

  return (
    <AnimatePresence>
      {isRevealed && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsRevealed(false)}
        >
          <motion.div
            className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-8 rounded-3xl text-white text-center max-w-md shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🎮💕
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">You Found the Secret!</h2>
            <p className="text-lg mb-4">
              You know me so well! Just like you figured out this code, 
              you've unlocked the secret to my heart. 
            </p>
            <p className="italic opacity-90">
              I love you more than all the cheat codes in the world, Anjali! 💖
            </p>
            <p className="mt-4 text-sm opacity-70">Tap anywhere to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Midnight surprise
export const MidnightSurprise = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Show between 11:59 PM and 12:05 AM
      if ((hours === 23 && minutes >= 59) || (hours === 0 && minutes <= 5)) {
        setIsVisible(true);
      }
    };

    checkMidnight();
    const interval = setInterval(checkMidnight, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[150] bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Stars background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity }}
        />
      ))}
      
      <motion.div
        className="text-center z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌙✨
        </motion.div>
        <h2 className="text-3xl font-serif text-white mb-4">
          Midnight Magic
        </h2>
        <p className="text-xl text-purple-200 mb-6 max-w-md">
          Even at midnight, when the world sleeps, 
          my love for you shines brighter than all the stars, Anjali.
        </p>
        <motion.p
          className="text-purple-300 italic"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          "You are my moon in the darkest nights"
        </motion.p>
        <button
          onClick={() => setIsVisible(false)}
          className="mt-8 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors"
        >
          Continue to Valentine's Week 💕
        </button>
      </motion.div>
    </motion.div>
  );
};

// Long press secret message hook
export const useLongPress = (callback: () => void, ms = 800) => {
  const [startTime, setStartTime] = useState<number | null>(null);

  const start = useCallback(() => {
    setStartTime(Date.now());
  }, []);

  const end = useCallback(() => {
    if (startTime && Date.now() - startTime >= ms) {
      callback();
    }
    setStartTime(null);
  }, [startTime, ms, callback]);

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: end,
    onTouchStart: start,
    onTouchEnd: end,
  };
};

// Long press secret component wrapper
export const LongPressSecret = ({ 
  children, 
  secretMessage 
}: { 
  children: React.ReactNode;
  secretMessage: string;
}) => {
  const [showSecret, setShowSecret] = useState(false);

  const longPressProps = useLongPress(() => {
    setShowSecret(true);
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    setTimeout(() => setShowSecret(false), 3000);
  });

  return (
    <div {...longPressProps} className="relative">
      {children}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap z-50 shadow-lg"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
          >
            {secretMessage}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-pink-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
