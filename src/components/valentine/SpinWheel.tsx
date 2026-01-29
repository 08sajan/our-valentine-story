import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowRight, X } from 'lucide-react';

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

export const SpinWheel = ({ sections, onSelectSection, onClose }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedSection(null);
    
    if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);

    // Random rotation (5-10 full spins + random position)
    const spins = 5 + Math.random() * 5;
    const randomIndex = Math.floor(Math.random() * sections.length);
    const segmentAngle = 360 / sections.length;
    const targetRotation = rotation + (spins * 360) + (randomIndex * segmentAngle);
    
    setRotation(targetRotation);

    // Determine winner after spin
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSection(sections[randomIndex]);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-3xl p-6 border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <motion.h2
            className="text-2xl font-bold text-white flex items-center justify-center gap-2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
            Spin & Play!
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.h2>
          <p className="text-white/60 text-sm mt-1">
            Let fate decide what we do next! 🎲
          </p>
        </div>

        {/* Wheel Container */}
        <div className="relative mx-auto w-72 h-72 mb-6">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-yellow-400 drop-shadow-lg" />
          </div>

          {/* Wheel */}
          <motion.div
            className="relative w-full h-full rounded-full border-4 border-yellow-400/80 shadow-[0_0_30px_rgba(250,204,21,0.3)] overflow-hidden"
            animate={{ rotate: rotation }}
            transition={{ 
              duration: 4, 
              ease: [0.2, 0.8, 0.3, 1],
            }}
            style={{ transformOrigin: 'center center' }}
          >
            {sections.slice(0, 8).map((section, index) => {
              const angle = (360 / Math.min(sections.length, 8)) * index;
              const skewAngle = 90 - (360 / Math.min(sections.length, 8));
              
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
                    className="absolute text-2xl"
                    style={{
                      transform: `skewY(${-skewAngle}deg) rotate(${45}deg)`,
                      left: '30%',
                      top: '50%',
                    }}
                  >
                    {section.emoji}
                  </span>
                </div>
              );
            })}
            
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg flex items-center justify-center z-10 border-4 border-white/30">
              <span className="text-2xl">💕</span>
            </div>
          </motion.div>
        </div>

        {/* Result Display */}
        <AnimatePresence mode="wait">
          {selectedSection && !isSpinning && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-white/20 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-4xl">{selectedSection.emoji}</span>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">You got:</p>
                  <h3 className="text-xl font-bold text-white">{selectedSection.label}</h3>
                </div>
              </div>
              
              <motion.button
                onClick={goToSection}
                className="mt-3 px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let's Go!</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spin Button */}
        <motion.button
          onClick={spin}
          disabled={isSpinning}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
            isSpinning 
              ? 'bg-white/10 text-white/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50'
          }`}
          whileHover={!isSpinning ? { scale: 1.02 } : {}}
          whileTap={!isSpinning ? { scale: 0.98 } : {}}
        >
          {isSpinning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-6 h-6" />
              </motion.div>
              <span>Spinning...</span>
            </>
          ) : (
            <>
              <span>🎰</span>
              <span>{selectedSection ? 'Spin Again!' : 'Spin the Wheel!'}</span>
              <span>🎰</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
