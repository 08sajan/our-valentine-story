import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowRight, X, Heart } from 'lucide-react';

interface Section {
  key: string;
  label: string;
  emoji: string;
  category: string;
}

interface SpinWheelProps {
  sections: Section[];
  onSelectSection: (key: string) => void;
  onClose: () => void;
}

const wheelColors = [
  'from-pink-500 to-rose-500',
  'from-purple-500 to-indigo-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-amber-500 to-orange-500',
  'from-red-500 to-pink-500',
  'from-violet-500 to-purple-500',
  'from-teal-500 to-blue-500',
];

// Floating sparkles
const FloatingSparkles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      >
        <span className="text-lg">{['✨', '💫', '⭐', '🌟'][i % 4]}</span>
      </motion.div>
    ))}
  </div>
);

export const SpinWheel = ({ sections, onSelectSection, onClose }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedSection(null);
    setShowCelebration(false);
    
    if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);

    // Random rotation (5-10 full spins + random position)
    const spins = 5 + Math.random() * 5;
    const randomIndex = Math.floor(Math.random() * Math.min(sections.length, 8));
    const segmentAngle = 360 / Math.min(sections.length, 8);
    const targetRotation = rotation + (spins * 360) + (randomIndex * segmentAngle);
    
    setRotation(targetRotation);

    // Determine winner after spin
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSection(sections[randomIndex]);
      setShowCelebration(true);
      if (navigator.vibrate) navigator.vibrate([100, 50, 150]);
    }, 4000);
  };

  const goToSection = () => {
    if (selectedSection) {
      onSelectSection(selectedSection.key);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <FloatingSparkles />
      
      {/* Celebration burst */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl pointer-events-none"
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  scale: 0,
                  opacity: 1
                }}
                animate={{ 
                  x: `calc(50% + ${(Math.random() - 0.5) * 400}px)`,
                  y: `calc(50% + ${(Math.random() - 0.5) * 400}px)`,
                  scale: [0, 1.5, 1],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720,
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
              >
                {['🎉', '✨', '💕', '🌟', '💫', '🎊'][i % 6]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full max-w-md bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-rose-900/95 rounded-3xl p-6 border border-white/20 shadow-2xl"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 100px rgba(236,72,153,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(236,72,153,0.4), transparent, rgba(147,51,234,0.4), transparent)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all z-10 border border-white/10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Title */}
        <motion.div 
          className="text-center mb-6 relative z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.h2
            className="text-3xl font-bold text-white flex items-center justify-center gap-3"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-yellow-400" />
            </motion.span>
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Spin & Play!
            </span>
            <motion.span
              animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-yellow-400" />
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-sm mt-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Let fate decide what we do next! 🎲💕
          </motion.p>
        </motion.div>

        {/* Wheel Container */}
        <div className="relative mx-auto w-72 h-72 mb-6">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 30px rgba(250,204,21,0.4), 0 0 60px rgba(250,204,21,0.2)',
                '0 0 50px rgba(236,72,153,0.4), 0 0 80px rgba(236,72,153,0.2)',
                '0 0 30px rgba(250,204,21,0.4), 0 0 60px rgba(250,204,21,0.2)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Pointer with pulse */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
            <motion.div 
              className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ filter: 'drop-shadow(0 0 10px rgba(250,204,21,0.8))' }}
            />
          </div>

          {/* Wheel */}
          <motion.div
            className="relative w-full h-full rounded-full border-4 border-yellow-400/80 overflow-hidden"
            animate={{ rotate: rotation }}
            transition={{ 
              duration: 4, 
              ease: [0.15, 0.85, 0.25, 1],
            }}
            style={{ 
              transformOrigin: 'center center',
              boxShadow: '0 0 30px rgba(250,204,21,0.4), inset 0 0 30px rgba(0,0,0,0.3)'
            }}
          >
            {sections.slice(0, 8).map((section, index) => {
              const numSegments = Math.min(sections.length, 8);
              const angle = (360 / numSegments) * index;
              const skewAngle = 90 - (360 / numSegments);
              
              return (
                <div
                  key={section.key}
                  className={`absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br ${wheelColors[index % wheelColors.length]}`}
                  style={{
                    transform: `rotate(${angle}deg) skewY(${skewAngle}deg)`,
                    left: '50%',
                    top: 0,
                  }}
                >
                  <span
                    className="absolute text-2xl drop-shadow-lg"
                    style={{
                      transform: `skewY(${-skewAngle}deg) rotate(${45}deg)`,
                      left: '25%',
                      top: '45%',
                    }}
                  >
                    {section.emoji}
                  </span>
                </div>
              );
            })}
            
            {/* Center circle */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-lg flex items-center justify-center z-10 border-4 border-white/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                boxShadow: '0 0 20px rgba(250,204,21,0.6), inset 0 0 10px rgba(255,255,255,0.3)'
              }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ rotate: isSpinning ? 360 : 0 }}
                transition={{ duration: 1, repeat: isSpinning ? Infinity : 0, ease: "linear" }}
              >
                💕
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Result Display */}
        <AnimatePresence mode="wait">
          {selectedSection && !isSpinning && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mb-4 p-5 rounded-2xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-rose-500/30 border border-white/20 text-center backdrop-blur-sm"
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 40px rgba(236,72,153,0.2)'
              }}
            >
              <div className="flex items-center justify-center gap-4 mb-3">
                <motion.span 
                  className="text-5xl"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {selectedSection.emoji}
                </motion.span>
                <div className="text-left">
                  <motion.p 
                    className="text-white/60 text-xs uppercase tracking-wider"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    ✨ You got:
                  </motion.p>
                  <motion.h3 
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedSection.label}
                  </motion.h3>
                </div>
              </div>
              
              <motion.button
                onClick={goToSection}
                className="mt-3 px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold flex items-center gap-2 mx-auto shadow-lg"
                style={{
                  boxShadow: '0 10px 30px rgba(16,185,129,0.4)'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(16,185,129,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Let's Go!</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spin Button */}
        <motion.button
          onClick={spin}
          disabled={isSpinning}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden ${
            isSpinning 
              ? 'bg-white/10 text-white/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white'
          }`}
          style={{
            boxShadow: isSpinning ? 'none' : '0 10px 40px rgba(236, 72, 153, 0.4)'
          }}
          whileHover={!isSpinning ? { scale: 1.02, boxShadow: '0 15px 50px rgba(236, 72, 153, 0.5)' } : {}}
          whileTap={!isSpinning ? { scale: 0.98 } : {}}
        >
          {/* Shimmer effect */}
          {!isSpinning && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          )}
          
          {isSpinning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-6 h-6" />
              </motion.div>
              <span>Spinning...</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </>
          ) : (
            <>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎰
              </motion.span>
              <span className="relative z-10">{selectedSection ? 'Spin Again!' : 'Spin the Wheel!'}</span>
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎰
              </motion.span>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
