import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check } from "lucide-react";

interface DressUpGameProps {
  onComplete?: () => void;
}

type Category = 'dress' | 'earrings' | 'necklace' | 'shoes' | 'hairstyle';

interface Item {
  id: string;
  emoji: string;
  name: string;
  color: string;
}

const categories: { key: Category; label: string; emoji: string }[] = [
  { key: 'dress', label: 'Dress', emoji: '👗' },
  { key: 'earrings', label: 'Earrings', emoji: '💎' },
  { key: 'necklace', label: 'Necklace', emoji: '📿' },
  { key: 'shoes', label: 'Shoes', emoji: '👠' },
  { key: 'hairstyle', label: 'Hairstyle', emoji: '💇‍♀️' },
];

const items: Record<Category, Item[]> = {
  dress: [
    { id: 'red-gown', emoji: '👗', name: 'Elegant Red Gown', color: 'from-red-500 to-rose-600' },
    { id: 'white-dress', emoji: '🤍', name: 'Pure White Dress', color: 'from-white to-gray-200' },
    { id: 'pink-dress', emoji: '💕', name: 'Romantic Pink', color: 'from-pink-400 to-rose-500' },
    { id: 'golden-dress', emoji: '✨', name: 'Golden Glamour', color: 'from-amber-400 to-yellow-500' },
    { id: 'black-dress', emoji: '🖤', name: 'Classic Black', color: 'from-gray-800 to-black' },
    { id: 'purple-dress', emoji: '💜', name: 'Royal Purple', color: 'from-purple-500 to-violet-600' },
  ],
  earrings: [
    { id: 'diamond', emoji: '💎', name: 'Diamond Drops', color: 'from-cyan-300 to-blue-400' },
    { id: 'pearl', emoji: '🤍', name: 'Pearl Elegance', color: 'from-white to-gray-100' },
    { id: 'ruby', emoji: '❤️', name: 'Ruby Hearts', color: 'from-red-500 to-rose-600' },
    { id: 'gold-hoops', emoji: '⭕', name: 'Gold Hoops', color: 'from-amber-400 to-yellow-500' },
    { id: 'emerald', emoji: '💚', name: 'Emerald Beauty', color: 'from-emerald-400 to-green-500' },
  ],
  necklace: [
    { id: 'diamond-pendant', emoji: '💎', name: 'Diamond Pendant', color: 'from-cyan-300 to-blue-400' },
    { id: 'pearl-string', emoji: '📿', name: 'Pearl String', color: 'from-white to-gray-100' },
    { id: 'heart-locket', emoji: '💕', name: 'Heart Locket', color: 'from-rose-400 to-pink-500' },
    { id: 'gold-chain', emoji: '⛓️', name: 'Gold Chain', color: 'from-amber-400 to-yellow-500' },
    { id: 'choker', emoji: '✨', name: 'Elegant Choker', color: 'from-purple-400 to-violet-500' },
  ],
  shoes: [
    { id: 'red-heels', emoji: '👠', name: 'Red Heels', color: 'from-red-500 to-rose-600' },
    { id: 'glass-slippers', emoji: '✨', name: 'Glass Slippers', color: 'from-cyan-200 to-blue-300' },
    { id: 'gold-sandals', emoji: '👡', name: 'Golden Sandals', color: 'from-amber-400 to-yellow-500' },
    { id: 'white-heels', emoji: '🤍', name: 'White Elegance', color: 'from-white to-gray-200' },
    { id: 'black-pumps', emoji: '🖤', name: 'Black Pumps', color: 'from-gray-700 to-black' },
  ],
  hairstyle: [
    { id: 'elegant-bun', emoji: '💫', name: 'Elegant Bun', color: 'from-amber-600 to-orange-700' },
    { id: 'flowing-waves', emoji: '🌊', name: 'Flowing Waves', color: 'from-amber-500 to-yellow-600' },
    { id: 'braided-crown', emoji: '👑', name: 'Braided Crown', color: 'from-amber-700 to-orange-800' },
    { id: 'sleek-straight', emoji: '✨', name: 'Sleek & Straight', color: 'from-gray-800 to-black' },
    { id: 'romantic-curls', emoji: '💕', name: 'Romantic Curls', color: 'from-rose-400 to-pink-500' },
  ],
};

export const DressUpGame = ({ onComplete }: DressUpGameProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>('dress');
  const [selections, setSelections] = useState<Record<Category, string | null>>({
    dress: null,
    earrings: null,
    necklace: null,
    shoes: null,
    hairstyle: null,
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (category: Category, itemId: string) => {
    setSelections(prev => ({ ...prev, [category]: itemId }));
  };

  const completedCount = Object.values(selections).filter(Boolean).length;
  const allSelected = completedCount === categories.length;

  const handleComplete = () => {
    setIsComplete(true);
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-serif text-rose-300 mb-2">
          Dress Up For Our Date Night ✨
        </h3>
        <p className="text-white/70 text-sm">
          Choose the perfect outfit for our special evening together
        </p>
      </motion.div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.key}
            className={`w-3 h-3 rounded-full ${
              selections[cat.key] ? 'bg-rose-400' : 'bg-white/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
        {categories.map((cat) => (
          <motion.button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 whitespace-nowrap ${
              activeCategory === cat.key
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/70'
            } ${selections[cat.key] ? 'ring-2 ring-rose-400/50' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            {selections[cat.key] && <Check className="w-3 h-3" />}
          </motion.button>
        ))}
      </div>

      {/* Items Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {items[activeCategory].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleSelect(activeCategory, item.id)}
              className={`relative p-4 rounded-2xl backdrop-blur-md border-2 transition-all ${
                selections[activeCategory] === item.id
                  ? 'border-rose-400 bg-rose-500/30'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`text-4xl mb-2 ${
                  selections[activeCategory] === item.id ? 'scale-110' : ''
                }`}
                animate={
                  selections[activeCategory] === item.id
                    ? { rotate: [0, 5, -5, 0] }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                {item.emoji}
              </motion.div>
              <p className="text-xs text-white/80">{item.name}</p>
              
              {selections[activeCategory] === item.id && (
                <motion.div
                  className="absolute top-1 right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Selected Preview */}
      <motion.div
        className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10"
        layout
      >
        <h4 className="text-center text-rose-300 text-sm mb-3">Your Choices</h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map((cat) => {
            const selected = getSelectedItem(cat.key);
            return (
              <motion.div
                key={cat.key}
                className="text-center"
                layout
              >
                <div className={`text-3xl ${selected ? '' : 'opacity-30'}`}>
                  {selected?.emoji || cat.emoji}
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
            className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl text-white font-serif text-lg relative overflow-hidden"
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
            className="text-center py-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.div>
            <h4 className="text-2xl font-serif text-rose-300 mb-2">
              You're Absolutely Stunning!
            </h4>
            <p className="text-white/70 font-serif italic">
              "I can't wait to pick you up and take you to dinner, my beautiful Puntuu"
            </p>
            
            {/* Date Scene Preview */}
            <motion.div
              className="mt-6 p-4 bg-gradient-to-r from-amber-900/30 to-rose-900/30 rounded-2xl border border-amber-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-center gap-4 text-4xl mb-3">
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
              <p className="text-amber-300/80 text-sm">
                Our perfect date night awaits...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
