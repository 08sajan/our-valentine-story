import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

const presetWishes = [
  "A lifetime of happiness together 💕",
  "To always make each other laugh 😊",
  "To travel the world hand in hand 🌍",
  "A peaceful home full of love 🏠",
  "Growing old together gracefully 👫",
  "Never losing our spark ✨",
  "Supporting each other's dreams 🌟",
  "Creating beautiful memories 📸"
];

export const WishingWell = () => {
  const [wishes, setWishes] = useState<string[]>([]);
  const [customWish, setCustomWish] = useState("");
  const [showStar, setShowStar] = useState(false);
  const [lastWish, setLastWish] = useState("");

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
    if (customWish.trim()) {
      makeWish(customWish);
      setCustomWish("");
    }
  };

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
        className="relative h-32 flex items-center justify-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-7xl">🌟</div>
        
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
            transition={{ delay: index * 0.05 }}
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

      {/* Wishes count */}
      <div className="text-center">
        <p className="text-white/40 text-xs">
          {wishes.length} wish{wishes.length !== 1 ? 'es' : ''} made for our future 💕
        </p>
      </div>
    </div>
  );
};
