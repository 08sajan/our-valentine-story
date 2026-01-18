import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check, Crown, Gem, Star } from "lucide-react";

interface DressUpGameProps {
  onComplete?: () => void;
}

type Category = 'dress' | 'jewelry' | 'shoes' | 'hairstyle' | 'accessories';

interface Item {
  id: string;
  name: string;
  visual: string;
  color: string;
  gradient: string;
  description: string;
}

const categories: { key: Category; label: string; emoji: string }[] = [
  { key: 'dress', label: 'Dress', emoji: '👗' },
  { key: 'jewelry', label: 'Jewelry', emoji: '💎' },
  { key: 'shoes', label: 'Shoes', emoji: '👠' },
  { key: 'hairstyle', label: 'Hair', emoji: '💇‍♀️' },
  { key: 'accessories', label: 'Extras', emoji: '✨' },
];

const items: Record<Category, Item[]> = {
  dress: [
    { 
      id: 'red-gown', 
      name: 'Red Evening Gown', 
      visual: '👗',
      color: 'red',
      gradient: 'from-red-600 via-rose-500 to-red-700',
      description: 'Stunning floor-length red gown with elegant draping'
    },
    { 
      id: 'white-bridal', 
      name: 'Bridal White', 
      visual: '🤍',
      color: 'white',
      gradient: 'from-white via-gray-100 to-white',
      description: 'Beautiful white wedding-style dress with lace'
    },
    { 
      id: 'pink-lehenga', 
      name: 'Pink Lehenga', 
      visual: '🩷',
      color: 'pink',
      gradient: 'from-pink-400 via-rose-400 to-pink-500',
      description: 'Traditional pink lehenga with gold embroidery'
    },
    { 
      id: 'golden-saree', 
      name: 'Golden Saree', 
      visual: '✨',
      color: 'gold',
      gradient: 'from-amber-400 via-yellow-400 to-amber-500',
      description: 'Gorgeous golden saree for special occasions'
    },
    { 
      id: 'maroon-anarkali', 
      name: 'Maroon Anarkali', 
      visual: '🌹',
      color: 'maroon',
      gradient: 'from-rose-700 via-red-700 to-rose-800',
      description: 'Elegant maroon anarkali with intricate work'
    },
    { 
      id: 'purple-gown', 
      name: 'Royal Purple', 
      visual: '💜',
      color: 'purple',
      gradient: 'from-purple-500 via-violet-500 to-purple-600',
      description: 'Majestic purple evening gown'
    },
  ],
  jewelry: [
    { 
      id: 'diamond-set', 
      name: 'Diamond Set', 
      visual: '💎',
      color: 'diamond',
      gradient: 'from-cyan-200 via-white to-blue-200',
      description: 'Complete diamond necklace with matching earrings'
    },
    { 
      id: 'gold-kundan', 
      name: 'Gold Kundan', 
      visual: '👑',
      color: 'gold',
      gradient: 'from-amber-400 via-yellow-300 to-amber-500',
      description: 'Traditional kundan jewelry with gold finish'
    },
    { 
      id: 'pearl-set', 
      name: 'Pearl Elegance', 
      visual: '🤍',
      color: 'pearl',
      gradient: 'from-white via-gray-100 to-pink-50',
      description: 'Classic pearl necklace with matching earrings'
    },
    { 
      id: 'ruby-set', 
      name: 'Ruby Collection', 
      visual: '❤️',
      color: 'ruby',
      gradient: 'from-red-500 via-rose-500 to-red-600',
      description: 'Stunning ruby and gold jewelry set'
    },
    { 
      id: 'emerald-set', 
      name: 'Emerald Beauty', 
      visual: '💚',
      color: 'emerald',
      gradient: 'from-emerald-400 via-green-400 to-emerald-500',
      description: 'Elegant emerald jewelry ensemble'
    },
  ],
  shoes: [
    { 
      id: 'golden-heels', 
      name: 'Golden Heels', 
      visual: '👠',
      color: 'gold',
      gradient: 'from-amber-400 via-yellow-400 to-amber-500',
      description: 'Stunning golden high heels with glitter'
    },
    { 
      id: 'red-stilettos', 
      name: 'Red Stilettos', 
      visual: '👠',
      color: 'red',
      gradient: 'from-red-500 via-rose-500 to-red-600',
      description: 'Elegant red stiletto heels'
    },
    { 
      id: 'silver-sandals', 
      name: 'Silver Sandals', 
      visual: '👡',
      color: 'silver',
      gradient: 'from-gray-300 via-white to-gray-400',
      description: 'Sparkly silver strappy sandals'
    },
    { 
      id: 'crystal-heels', 
      name: 'Crystal Heels', 
      visual: '✨',
      color: 'crystal',
      gradient: 'from-cyan-200 via-blue-200 to-purple-200',
      description: 'Glass slipper-style crystal heels'
    },
    { 
      id: 'rose-gold', 
      name: 'Rose Gold Heels', 
      visual: '🌸',
      color: 'rosegold',
      gradient: 'from-rose-300 via-pink-300 to-rose-400',
      description: 'Beautiful rose gold heels'
    },
  ],
  hairstyle: [
    { 
      id: 'elegant-bun', 
      name: 'Elegant Bun', 
      visual: '💫',
      color: 'brown',
      gradient: 'from-amber-600 via-orange-600 to-amber-700',
      description: 'Classic elegant updo with accessories'
    },
    { 
      id: 'flowing-curls', 
      name: 'Flowing Curls', 
      visual: '🌊',
      color: 'brown',
      gradient: 'from-amber-500 via-yellow-500 to-amber-600',
      description: 'Beautiful loose curls cascading down'
    },
    { 
      id: 'braided-crown', 
      name: 'Braided Crown', 
      visual: '👑',
      color: 'dark',
      gradient: 'from-amber-700 via-orange-700 to-amber-800',
      description: 'Intricate braided crown hairstyle'
    },
    { 
      id: 'side-swept', 
      name: 'Side Swept', 
      visual: '💃',
      color: 'black',
      gradient: 'from-gray-700 via-gray-800 to-black',
      description: 'Glamorous side-swept waves'
    },
    { 
      id: 'traditional-bun', 
      name: 'Floral Bun', 
      visual: '🌺',
      color: 'decorated',
      gradient: 'from-rose-400 via-pink-400 to-rose-500',
      description: 'Traditional bun with flower decorations'
    },
  ],
  accessories: [
    { 
      id: 'diamond-ring', 
      name: 'Diamond Ring', 
      visual: '💍',
      color: 'diamond',
      gradient: 'from-cyan-200 via-white to-blue-200',
      description: 'Beautiful diamond engagement ring'
    },
    { 
      id: 'gold-bangles', 
      name: 'Gold Bangles', 
      visual: '⭕',
      color: 'gold',
      gradient: 'from-amber-400 via-yellow-400 to-amber-500',
      description: 'Set of traditional gold bangles'
    },
    { 
      id: 'clutch-purse', 
      name: 'Designer Clutch', 
      visual: '👛',
      color: 'rose',
      gradient: 'from-rose-400 via-pink-400 to-rose-500',
      description: 'Elegant designer clutch purse'
    },
    { 
      id: 'maang-tikka', 
      name: 'Maang Tikka', 
      visual: '✨',
      color: 'gold',
      gradient: 'from-amber-500 via-orange-400 to-amber-500',
      description: 'Traditional maang tikka headpiece'
    },
    { 
      id: 'watch', 
      name: 'Gold Watch', 
      visual: '⌚',
      color: 'gold',
      gradient: 'from-amber-400 via-yellow-400 to-amber-500',
      description: 'Elegant gold wrist watch'
    },
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
    <div className="w-full max-w-full overflow-hidden space-y-4">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-serif text-rose-300">
            Dress Up For Our Date
          </h3>
          <Crown className="w-5 h-5 text-amber-400" />
        </div>
        <p className="text-white/70 text-xs">
          Choose your perfect outfit for our special evening ✨
        </p>
      </motion.div>

      {/* Progress Dots */}
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

      {/* Category Tabs - Horizontally scrollable */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              } ${selections[cat.key] ? 'ring-2 ring-rose-400/50' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base">{cat.emoji}</span>
              <span>{cat.label}</span>
              {selections[cat.key] && <Check className="w-3 h-3" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Wardrobe Display */}
      <div className="relative bg-gradient-to-br from-amber-900/30 via-rose-900/20 to-purple-900/30 rounded-2xl p-4 border border-amber-500/20 overflow-hidden">
        {/* Wardrobe decoration */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-t-2xl" />
        <div className="absolute top-3 left-0 w-2 h-full bg-gradient-to-b from-amber-800 to-amber-900" />
        <div className="absolute top-3 right-0 w-2 h-full bg-gradient-to-b from-amber-800 to-amber-900" />
        
        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 gap-3 pt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {items[activeCategory].map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleSelect(activeCategory, item.id)}
                className={`relative p-4 rounded-xl backdrop-blur-md border-2 transition-all text-center ${
                  selections[activeCategory] === item.id
                    ? 'border-rose-400 bg-rose-500/30 shadow-lg shadow-rose-500/20 scale-105'
                    : 'border-white/10 bg-black/20 hover:bg-white/10 hover:border-white/20'
                }`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: selections[activeCategory] === item.id ? 1.05 : 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Item Visual Display */}
                <div className="relative mb-3">
                  <motion.div
                    className={`text-5xl p-3 rounded-xl bg-gradient-to-br ${item.gradient} mx-auto w-20 h-20 flex items-center justify-center shadow-lg`}
                    animate={
                      selections[activeCategory] === item.id
                        ? { 
                            scale: [1, 1.1, 1], 
                            rotate: [0, 3, -3, 0],
                            boxShadow: [
                              '0 0 20px rgba(251, 113, 133, 0.3)',
                              '0 0 40px rgba(251, 113, 133, 0.5)',
                              '0 0 20px rgba(251, 113, 133, 0.3)'
                            ]
                          }
                        : {}
                    }
                    transition={{ duration: 1, repeat: selections[activeCategory] === item.id ? Infinity : 0 }}
                  >
                    {item.visual}
                  </motion.div>
                  
                  {/* Sparkle effect on selected */}
                  {selections[activeCategory] === item.id && (
                    <>
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-1 -left-1"
                        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <Sparkles className="w-4 h-4 text-rose-400" />
                      </motion.div>
                    </>
                  )}
                </div>
                
                {/* Item Info */}
                <p className="text-sm text-white font-medium truncate">{item.name}</p>
                <p className="text-[10px] text-white/50 mt-1 line-clamp-1">{item.description}</p>
                
                {/* Selection indicator */}
                {selections[activeCategory] === item.id && (
                  <motion.div
                    className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selected Preview - Mirror Style */}
      <motion.div
        className="bg-gradient-to-br from-amber-900/40 to-rose-900/40 backdrop-blur-md rounded-2xl p-4 border border-amber-500/30 relative overflow-hidden"
        layout
      >
        {/* Mirror frame effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-rose-400/10 pointer-events-none" />
        
        <h4 className="text-center text-rose-300 text-sm mb-3 flex items-center justify-center gap-2 relative z-10">
          <Gem className="w-4 h-4" />
          Your Look
          <Gem className="w-4 h-4" />
        </h4>
        
        {/* Avatar Display */}
        <div className="flex justify-center items-end gap-1 h-24 relative z-10">
          {categories.map((cat) => {
            const selected = getSelectedItem(cat.key);
            return (
              <motion.div
                key={cat.key}
                className="text-center"
                layout
                whileHover={{ scale: 1.2 }}
                animate={selected ? { y: [0, -4, 0] } : {}}
                transition={{ duration: 2, repeat: selected ? Infinity : 0, delay: categories.indexOf(cat) * 0.2 }}
              >
                <div className={`text-3xl ${selected ? '' : 'opacity-20 grayscale'}`}>
                  {selected?.visual || cat.emoji}
                </div>
                <p className="text-[8px] text-white/50 mt-1">{cat.label}</p>
              </motion.div>
            );
          })}
        </div>
        
        {/* Completion status */}
        <p className="text-center text-white/40 text-xs mt-2 relative z-10">
          {completedCount}/{categories.length} items selected
        </p>
      </motion.div>

      {/* Complete Button */}
      <AnimatePresence>
        {allSelected && !isComplete && (
          <motion.button
            onClick={handleComplete}
            className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl text-white font-serif text-lg relative overflow-hidden shadow-xl shadow-rose-500/30"
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

      {/* Result - Date Night Scene */}
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
            <p className="text-white/70 font-serif italic text-base mb-6">
              "I can't wait to pick you up and take you to dinner, my beautiful Puntuu"
            </p>
            
            {/* Romantic Date Scene */}
            <motion.div
              className="bg-gradient-to-br from-amber-900/40 via-rose-900/30 to-purple-900/40 rounded-2xl p-6 border border-amber-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Date Scene Animation */}
              <div className="flex justify-center items-center gap-4 text-4xl mb-4">
                <motion.span
                  animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >🚗</motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >💑</motion.span>
                <motion.span
                  animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                >🏰</motion.span>
              </div>
              
              {/* Dinner Table Scene */}
              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <div className="flex justify-center items-end gap-2 text-3xl mb-2">
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>🕯️</motion.span>
                  <span>🍽️</span>
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>🥂</motion.span>
                  <span>🍽️</span>
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>🕯️</motion.span>
                </div>
                <p className="text-amber-300/80 text-sm">
                  A romantic candlelit dinner awaits...
                </p>
              </div>
              
              {/* Your Final Look */}
              <div className="bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-xl p-4">
                <p className="text-rose-300 text-sm font-medium mb-3">Your Perfect Look Tonight:</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {categories.map((cat) => {
                    const selected = getSelectedItem(cat.key);
                    return selected ? (
                      <motion.div
                        key={cat.key}
                        className="text-3xl"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: categories.indexOf(cat) * 0.2 }}
                      >
                        {selected.visual}
                      </motion.div>
                    ) : null;
                  })}
                </div>
              </div>
              
              <motion.p 
                className="text-amber-300/80 text-sm mt-4 italic"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                The night is young and so is our love... 🌙✨
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
