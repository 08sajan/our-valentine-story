import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Sparkles, Eye, EyeOff } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = 'Punturu';
const STORAGE_KEY = 'valentine-unlocked';

export const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Check if already unlocked
    const unlocked = localStorage.getItem(STORAGE_KEY);
    if (unlocked === 'true') {
      onUnlock();
    }
  }, [onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      if (navigator.vibrate) navigator.vibrate([50, 30, 100]);
      onUnlock();
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
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1a0a1a 0%, #2d1040 50%, #1a0520 100%)'
      }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: shake ? [0, -10, 10, -10, 10, 0] : 0
        }}
        transition={{ 
          duration: shake ? 0.4 : 0.5,
          type: shake ? 'tween' : 'spring'
        }}
        className="relative w-full max-w-sm mx-4"
      >
        {/* Glass card */}
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Lock icon */}
            <motion.div
              className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center mb-6 border border-white/20"
              animate={{ 
                boxShadow: ['0 0 30px rgba(236, 72, 153, 0.3)', '0 0 50px rgba(236, 72, 153, 0.5)', '0 0 30px rgba(236, 72, 153, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-8 h-8 text-pink-300" />
            </motion.div>

            {/* Title */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl font-serif text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span>For My Love</span>
                <Sparkles className="w-5 h-5 text-pink-400" />
              </h1>
              <p className="text-white/60 text-sm">
                Enter our secret password to continue 💕
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className={`w-full px-5 py-4 rounded-2xl bg-white/10 border-2 text-white placeholder-white/40 text-center text-lg font-medium tracking-wide transition-all focus:outline-none ${
                    error 
                      ? 'border-red-400 bg-red-500/10' 
                      : 'border-white/20 focus:border-pink-400 focus:bg-white/15'
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
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    Wrong password! Try again, my love 💔
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(236, 72, 153, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Unlock Our World</span>
              </motion.button>
            </form>

            {/* Hint */}
            <motion.p
              className="text-center text-white/30 text-xs mt-6 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hint: Your special nickname 💫
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
