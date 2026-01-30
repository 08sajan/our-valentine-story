import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Trash2 } from "lucide-react";

const presetWishes = [
  "A lifetime of happiness together 💕",
  "To always make each other laugh 😊",
  "To travel the world hand in hand 🌍",
  "A peaceful home full of love 🏠",
  "Growing old together gracefully 👫",
  "Never losing our spark ✨",
  "Supporting each other's dreams 🌟",
  "Creating beautiful memories 📸",
  "Always choosing each other 💑",
  "Building our forever together 💒"
];

const STORAGE_KEY = "puntuu-wishes";

export const WishingWell = () => {
  const [wishes, setWishes] = useState<string[]>([]);
  const [customWish, setCustomWish] = useState("");
  const [showStar, setShowStar] = useState(false);
  const [lastWish, setLastWish] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  // Load wishes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishes(parsed);
        }
      } catch (e) {
        console.error("Failed to load wishes:", e);
      }
    }
  }, []);

  // Save wishes to localStorage whenever they change
  useEffect(() => {
    if (wishes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    }
  }, [wishes]);

  const makeWish = (wish: string) => {
    if (wishes.includes(wish)) return;
    
    setWishes(prev => [...prev, wish]);
    setLastWish(wish);
    setShowStar(true);
    setShowCelebration(true);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 20, 30, 20, 50]);
    }

    setTimeout(() => setShowStar(false), 2500);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const addCustomWish = () => {
    if (customWish.trim() && !wishes.includes(customWish.trim())) {
      makeWish(customWish.trim());
      setCustomWish("");
    }
  };

  const removeWish = (wishToRemove: string) => {
    setWishes(prev => {
      const updated = prev.filter(w => w !== wishToRemove);
      if (updated.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      }
      return updated;
    });
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const customWishes = wishes.filter(w => !presetWishes.includes(w));

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="text-center">
        <motion.h3
          className="text-base sm:text-xl font-serif text-rose-300 flex items-center justify-center gap-1 sm:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
          <span className="px-1">Our Wishing Well</span>
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
        </motion.h3>
        <p className="text-white/50 text-xs sm:text-sm mt-1">
          Make wishes for our future together 💫
        </p>
      </div>

      {/* Wishing Well Animation */}
      <motion.div 
        className="relative h-32 flex items-center justify-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div 
          className="text-7xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌟
        </motion.div>
        
        {/* Shooting star animation when wish is made */}
        <AnimatePresence>
          {showStar && (
            <>
              <motion.div
                className="absolute"
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0.5, 2, 1.5, 0.5],
                  y: [-20, -100],
                  x: [0, 60]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <Sparkles className="w-10 h-10 text-yellow-300" />
              </motion.div>
              
              {/* Star trail */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0],
                    y: [-10 - i * 12, -80 - i * 15],
                    x: [i * 8, 50 + i * 10],
                  }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                >
                  ⭐
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ left: `${Math.random() * 100}%`, bottom: '40%' }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{ 
                  y: -300 - Math.random() * 200,
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.5, 1],
                  x: (Math.random() - 0.5) * 100,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2, delay: i * 0.04 }}
              >
                {['⭐', '✨', '🌟', '💫', '🌠'][i % 5]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Last wish display */}
      <AnimatePresence>
        {lastWish && (
          <motion.div
            key={lastWish}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-rose-200 italic text-sm">
              "{ lastWish }"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preset wishes - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 max-h-48 sm:max-h-none overflow-y-auto">
        {presetWishes.map((wish, index) => (
          <motion.button
            key={wish}
            onClick={() => makeWish(wish)}
            disabled={wishes.includes(wish)}
            className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs text-left transition-all ${
              wishes.includes(wish)
                ? 'bg-rose-500/20 border-rose-400/50 text-rose-300'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            } border`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={!wishes.includes(wish) ? { scale: 1.02 } : {}}
            whileTap={!wishes.includes(wish) ? { scale: 0.98 } : {}}
          >
            {wishes.includes(wish) && <span className="mr-1">✓</span>}
            {wish}
          </motion.button>
        ))}
      </div>

      {/* Custom wish input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customWish}
          onChange={(e) => setCustomWish(e.target.value)}
          placeholder="Add your own wish..."
          className="flex-1 px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-rose-400"
          onKeyDown={(e) => e.key === 'Enter' && addCustomWish()}
        />
        <motion.button
          onClick={addCustomWish}
          className="px-3 sm:px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg sm:rounded-xl text-white text-xs sm:text-sm font-medium whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Wish ✨
        </motion.button>
      </div>

      {/* Custom wishes list */}
      {customWishes.length > 0 && (
        <div className="space-y-2">
          <p className="text-white/50 text-xs">Your personal wishes:</p>
          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {customWishes.map((wish, index) => (
              <motion.div
                key={wish}
                className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 border border-rose-400/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-rose-200 text-xs flex-1 mr-2">✨ {wish}</span>
                <button
                  onClick={() => removeWish(wish)}
                  className="text-white/40 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Wishes count */}
      <div className="text-center">
        <motion.p 
          className="text-white/40 text-xs"
          key={wishes.length}
          animate={{ scale: [1, 1.1, 1] }}
        >
          {wishes.length} wish{wishes.length !== 1 ? 'es' : ''} made for our future 💕
        </motion.p>
        {wishes.length > 0 && (
          <p className="text-white/30 text-xs mt-1">
            (Saved and will appear next time ✓)
          </p>
        )}
      </div>
    </div>
  );
};
