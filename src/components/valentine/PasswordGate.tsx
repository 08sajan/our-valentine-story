import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Sparkles, Eye, EyeOff, Stars } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = 'Punturu';
const STORAGE_KEY = 'valentine-unlocked';

// Floating Hearts Background
const FloatingHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0.1, 0.6, 0.1],
          scale: [0.5, 1.2, 0.5],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "easeInOut",
        }}
      >
        <Heart 
          className={`w-${3 + Math.floor(Math.random() * 4)} h-${3 + Math.floor(Math.random() * 4)} ${
            i % 3 === 0 ? 'text-pink-400' : i % 3 === 1 ? 'text-rose-400' : 'text-red-400'
          } fill-current`} 
          style={{ 
            width: 12 + Math.random() * 16,
            height: 12 + Math.random() * 16,
            filter: 'blur(0.5px)'
          }}
        />
      </motion.div>
    ))}
  </div>
);

// Sparkle particles
const SparkleParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          boxShadow: '0 0 6px 2px rgba(255,255,255,0.8)',
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

// Pulsing rings effect
const PulsingRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-pink-400/30"
        style={{ width: 200 + i * 80, height: 200 + i * 80 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem(STORAGE_KEY);
    if (unlocked === 'true') {
      onUnlock();
    }
  }, [onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setIsUnlocking(true);
      localStorage.setItem(STORAGE_KEY, 'true');
      if (navigator.vibrate) navigator.vibrate([50, 30, 100, 50, 150]);
      
      // Delay unlock for celebration animation
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setError(true);
      setShake(true);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
      setTimeout(() => {
        setError(false);
        setShake(false);
      }, 1000);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background: 'linear-gradient(135deg, #1a0a1a 0%, #2d1040 30%, #1a0520 60%, #2a1030 100%)'
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(147,51,234,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <FloatingHearts />
      <SparkleParticles />
      <PulsingRings />

      {/* Unlock celebration overlay */}
      <AnimatePresence>
        {isUnlocking && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Burst of hearts */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 1
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  scale: [0, 1.5, 1],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.02,
                  ease: "easeOut"
                }}
              >
                {['💕', '❤️', '💖', '💗', '✨', '🌟', '💫'][i % 7]}
              </motion.div>
            ))}
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.5 }}
              className="text-6xl"
            >
              💕
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ 
          opacity: isUnlocking ? 0 : 1, 
          scale: isUnlocking ? 1.2 : 1,
          y: 0,
          x: shake ? [0, -15, 15, -15, 15, 0] : 0
        }}
        transition={{ 
          duration: shake ? 0.4 : 0.6,
          type: shake ? 'tween' : 'spring',
          stiffness: 100,
          damping: 15
        }}
        className="relative w-full max-w-sm mx-4"
      >
        {/* Glass card with enhanced glow */}
        <div 
          className="relative backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.25), 0 0 100px rgba(147, 51, 234, 0.1)'
          }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(236,72,153,0.3), transparent, rgba(147,51,234,0.3), transparent)',
              backgroundSize: '400% 400%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 pointer-events-none rounded-3xl" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Lock icon with romantic glow */}
            <motion.div
              className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center mb-8 border border-white/20 relative"
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(236, 72, 153, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)',
                  '0 0 50px rgba(147, 51, 234, 0.4), 0 0 80px rgba(147, 51, 234, 0.2)',
                  '0 0 30px rgba(236, 72, 153, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)',
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lock className="w-10 h-10 text-pink-300" />
              </motion.div>
              
              {/* Orbiting hearts */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 2.67
                  }}
                  style={{ width: 100, height: 100 }}
                >
                  <motion.span 
                    className="absolute top-0 left-1/2 -translate-x-1/2 text-sm"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {['💕', '✨', '💖'][i]}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

            {/* Title with shimmer effect */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl font-serif text-white mb-3 flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-pink-400" />
                </motion.span>
                <span className="bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-transparent">
                  For My Love
                </span>
                <motion.span
                  animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </motion.span>
              </h1>
              <motion.p 
                className="text-white/60 text-sm"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Enter our secret password to continue 💕
              </motion.p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div 
                className="relative"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className={`w-full px-6 py-4 rounded-2xl bg-white/10 border-2 text-white placeholder-white/40 text-center text-lg font-medium tracking-wide transition-all duration-300 focus:outline-none ${
                    error 
                      ? 'border-red-400 bg-red-500/10' 
                      : 'border-white/20 focus:border-pink-400 focus:bg-white/15 focus:shadow-[0_0_30px_rgba(236,72,153,0.3)]'
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-red-400 text-sm text-center flex items-center justify-center gap-2"
                  >
                    <span>💔</span>
                    <span>Wrong password! Try again, my love</span>
                    <span>💔</span>
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-semibold text-lg shadow-lg flex items-center justify-center gap-3 relative overflow-hidden"
                style={{
                  boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 15px 50px rgba(236, 72, 153, 0.5)' 
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </motion.span>
                <span className="relative z-10">Unlock Our World</span>
              </motion.button>
            </form>

            {/* Hint */}
            <motion.p
              className="text-center text-white/30 text-xs mt-6 italic flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Stars className="w-3 h-3" />
              <span>Hint: Your special nickname</span>
              <Stars className="w-3 h-3" />
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
