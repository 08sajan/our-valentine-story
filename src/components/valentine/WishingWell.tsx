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
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 20, 30]);
    }

    setTimeout(() => setShowStar(false), 2000);
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
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <motion.h3
          className="text-xl font-serif text-rose-300 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          Our Wishing Well
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        </motion.h3>
        <p className="text-white/50 text-sm mt-1">
          Make wishes for our future together 💫
        </p>
      </div>

      {/* Wishing Well Animation */}
      <motion.div 
        className="relative h-28 flex items-center justify-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-6xl">🌟</div>
        
        {/* Shooting star animation when wish is made */}
        <AnimatePresence>
          {showStar && (
            <motion.div
              className="absolute"
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                scale: [0.5, 1.5, 1, 0.5],
                y: [-20, -80],
                x: [0, 40]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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

      {/* Preset wishes */}
      <div className="grid grid-cols-2 gap-2">
        {presetWishes.map((wish, index) => (
          <motion.button
            key={wish}
            onClick={() => makeWish(wish)}
            disabled={wishes.includes(wish)}
            className={`p-3 rounded-xl text-xs text-left transition-all ${
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
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-rose-400"
          onKeyDown={(e) => e.key === 'Enter' && addCustomWish()}
        />
        <motion.button
          onClick={addCustomWish}
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl text-white text-sm font-medium"
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
