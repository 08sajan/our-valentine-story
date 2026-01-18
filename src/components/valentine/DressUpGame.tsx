import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check, Crown, Gem } from "lucide-react";

interface DressUpGameProps {
  onComplete?: () => void;
}

type Category = 'dress' | 'jewelry' | 'shoes' | 'hairstyle' | 'accessories';

interface Item {
  id: string;
  name: string;
  image: string;
  color: string;
  description: string;
}

const categories: { key: Category; label: string; emoji: string }[] = [
  { key: 'dress', label: 'Dress', emoji: '👗' },
  { key: 'jewelry', label: 'Jewelry', emoji: '💎' },
  { key: 'shoes', label: 'Shoes', emoji: '👠' },
  { key: 'hairstyle', label: 'Hairstyle', emoji: '💇‍♀️' },
  { key: 'accessories', label: 'Extras', emoji: '✨' },
];

const items: Record<Category, Item[]> = {
  dress: [
    { id: 'red-gown', name: 'Elegant Red Gown', image: '👗', color: 'from-red-500 to-rose-600', description: 'A stunning floor-length red gown with elegant draping' },
    { id: 'white-bridal', name: 'White Bridal', image: '🤍', color: 'from-white to-gray-100', description: 'A beautiful white wedding-style dress' },
    { id: 'pink-sari', name: 'Pink Sari', image: '🩷', color: 'from-pink-400 to-rose-500', description: 'Traditional pink sari with gold embroidery' },
    { id: 'golden-lehenga', name: 'Golden Lehenga', image: '✨', color: 'from-amber-400 to-yellow-500', description: 'Gorgeous golden lehenga for special occasions' },
    { id: 'maroon-anarkali', name: 'Maroon Anarkali', image: '🌹', color: 'from-rose-700 to-red-800', description: 'Elegant maroon anarkali with intricate work' },
    { id: 'purple-gown', name: 'Royal Purple Gown', image: '💜', color: 'from-purple-500 to-violet-600', description: 'Majestic purple evening gown' },
  ],
  jewelry: [
    { id: 'diamond-set', name: 'Diamond Set', image: '💎', color: 'from-cyan-300 to-blue-400', description: 'Complete diamond necklace and earring set' },
    { id: 'gold-kundan', name: 'Gold Kundan', image: '👑', color: 'from-amber-400 to-yellow-500', description: 'Traditional kundan jewelry with gold finish' },
    { id: 'pearl-set', name: 'Pearl Elegance', image: '🤍', color: 'from-white to-gray-100', description: 'Classic pearl necklace with matching earrings' },
    { id: 'ruby-set', name: 'Ruby Collection', image: '❤️', color: 'from-red-500 to-rose-600', description: 'Stunning ruby and gold jewelry set' },
    { id: 'emerald-set', name: 'Emerald Beauty', image: '💚', color: 'from-emerald-400 to-green-500', description: 'Elegant emerald jewelry ensemble' },
  ],
  shoes: [
    { id: 'golden-heels', name: 'Golden Heels', image: '👠', color: 'from-amber-400 to-yellow-500', description: 'Stunning golden high heels' },
    { id: 'red-stilettos', name: 'Red Stilettos', image: '👠', color: 'from-red-500 to-rose-600', description: 'Elegant red stiletto heels' },
    { id: 'silver-sandals', name: 'Silver Sandals', image: '👡', color: 'from-gray-300 to-gray-400', description: 'Sparkly silver strappy sandals' },
    { id: 'crystal-heels', name: 'Crystal Heels', image: '✨', color: 'from-cyan-200 to-blue-300', description: 'Glass slipper-style crystal heels' },
    { id: 'rose-gold', name: 'Rose Gold Heels', image: '🌸', color: 'from-rose-300 to-pink-400', description: 'Beautiful rose gold heels' },
  ],
  hairstyle: [
    { id: 'elegant-bun', name: 'Elegant Bun', image: '💫', color: 'from-amber-600 to-orange-700', description: 'Classic elegant updo bun with accessories' },
    { id: 'flowing-curls', name: 'Flowing Curls', image: '🌊', color: 'from-amber-500 to-yellow-600', description: 'Beautiful loose curls cascading down' },
    { id: 'braided-crown', name: 'Braided Crown', image: '👑', color: 'from-amber-700 to-orange-800', description: 'Intricate braided crown hairstyle' },
    { id: 'side-swept', name: 'Side Swept', image: '💃', color: 'from-gray-700 to-black', description: 'Glamorous side-swept waves' },
    { id: 'traditional-bun', name: 'Traditional Bun', image: '🌺', color: 'from-rose-400 to-pink-500', description: 'Traditional bun with flower decorations' },
  ],
  accessories: [
    { id: 'diamond-ring', name: 'Diamond Ring', image: '💍', color: 'from-cyan-300 to-blue-400', description: 'Beautiful diamond engagement ring' },
    { id: 'gold-bangles', name: 'Gold Bangles', image: '⭕', color: 'from-amber-400 to-yellow-500', description: 'Set of traditional gold bangles' },
    { id: 'clutch-purse', name: 'Designer Clutch', image: '👛', color: 'from-rose-400 to-pink-500', description: 'Elegant designer clutch purse' },
    { id: 'maang-tikka', name: 'Maang Tikka', image: '✨', color: 'from-amber-500 to-orange-500', description: 'Traditional maang tikka headpiece' },
    { id: 'watch', name: 'Gold Watch', image: '⌚', color: 'from-amber-400 to-yellow-500', description: 'Elegant gold wrist watch' },
  ],
};

export const DressUpGame = ({ onComplete }: DressUpGameProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>('dress');
  const [selections, setSelections] = useState<Record<Category, string | null>>({
    dress: null,
    jewelry: null,
    shoes: null,
    hairstyle: null,
    accessories: null,
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (category: Category, itemId: string) => {
    setSelections(prev => ({ ...prev, [category]: itemId }));
    if ('vibrate' in navigator) {
      navigator.vibrate([50]);
    }
  };

  const completedCount = Object.values(selections).filter(Boolean).length;
  const allSelected = completedCount === categories.length;

  const handleComplete = () => {
    setIsComplete(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    setTimeout(() => {
      setShowResult(true);
      onComplete?.();
    }, 1000);
  };

  const getSelectedItem = (category: Category) => {
    const itemId = selections[category];
    return items[category].find(item => item.id === itemId);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-rose-300">
            Dress Up For Our Date Night
          </h3>
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
        </div>
        <p className="text-white/70 text-xs sm:text-sm">
          Choose your perfect outfit for our special evening ✨
        </p>
      </motion.div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.key}
            className={`w-3 h-3 rounded-full transition-all ${
              selections[cat.key] ? 'bg-rose-400 scale-110' : 'bg-white/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>

      {/* Category Tabs - Scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
        {categories.map((cat) => (
          <motion.button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all ${
              activeCategory === cat.key
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            } ${selections[cat.key] ? 'ring-2 ring-rose-400/50' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base sm:text-lg">{cat.emoji}</span>
            <span>{cat.label}</span>
            {selections[cat.key] && <Check className="w-3 h-3" />}
          </motion.button>
        ))}
      </div>

      {/* Items Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {items[activeCategory].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleSelect(activeCategory, item.id)}
              className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-md border-2 transition-all text-left ${
                selections[activeCategory] === item.id
                  ? 'border-rose-400 bg-rose-500/30 shadow-lg shadow-rose-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Item Image/Emoji */}
              <div className="flex items-center justify-center mb-2">
                <motion.div
                  className={`text-3xl sm:text-4xl p-2 sm:p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20`}
                  animate={
                    selections[activeCategory] === item.id
                      ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {item.image}
                </motion.div>
              </div>
              
              {/* Item Info */}
              <div className="text-center">
                <p className="text-xs sm:text-sm text-white font-medium truncate">{item.name}</p>
                <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 line-clamp-2">{item.description}</p>
              </div>
              
              {/* Selection indicator */}
              {selections[activeCategory] === item.id && (
                <motion.div
                  className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Selected Preview */}
      <motion.div
        className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10"
        layout
      >
        <h4 className="text-center text-rose-300 text-xs sm:text-sm mb-3 flex items-center justify-center gap-2">
          <Gem className="w-4 h-4" />
          Your Choices
          <Gem className="w-4 h-4" />
        </h4>
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
          {categories.map((cat) => {
            const selected = getSelectedItem(cat.key);
            return (
              <motion.div
                key={cat.key}
                className="text-center"
                layout
                whileHover={{ scale: 1.1 }}
              >
                <div className={`text-2xl sm:text-3xl ${selected ? '' : 'opacity-30 grayscale'}`}>
                  {selected?.image || cat.emoji}
                </div>
                <p className="text-[10px] text-white/50 mt-1">{cat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Complete Button */}
      <AnimatePresence>
        {allSelected && !isComplete && (
          <motion.button
            onClick={handleComplete}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-xl sm:rounded-2xl text-white font-serif text-base sm:text-lg relative overflow-hidden shadow-xl shadow-rose-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              You Look Perfect!
              <Heart className="w-5 h-5 fill-current" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="text-center py-4 sm:py-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-5xl sm:text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.div>
            <h4 className="text-xl sm:text-2xl font-serif text-rose-300 mb-2">
              You're Absolutely Stunning!
            </h4>
            <p className="text-white/70 font-serif italic text-sm sm:text-base">
              "I can't wait to pick you up and take you to dinner, my beautiful Puntuu"
            </p>
            
            {/* Date Scene Preview */}
            <motion.div
              className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-amber-900/30 to-rose-900/30 rounded-xl sm:rounded-2xl border border-amber-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Date Scene Icons */}
              <div className="flex justify-center gap-3 sm:gap-4 text-3xl sm:text-4xl mb-3">
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                >🚗</motion.span>
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >💑</motion.span>
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >🍽️</motion.span>
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                >🥂</motion.span>
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
                >🌙</motion.span>
              </div>
              
              {/* Your Outfit Summary */}
              <div className="bg-black/20 rounded-xl p-3 sm:p-4 mb-3">
                <p className="text-amber-300/80 text-xs sm:text-sm font-medium mb-2">Your Perfect Look:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {categories.map((cat) => {
                    const selected = getSelectedItem(cat.key);
                    return selected ? (
                      <span key={cat.key} className="text-2xl">{selected.image}</span>
                    ) : null;
                  })}
                </div>
              </div>
              
              <p className="text-amber-300/80 text-xs sm:text-sm">
                Our perfect date night awaits... 💫
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
