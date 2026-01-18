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
    { id: 'red-gown', name: 'Red Evening Gown', visual: '👗', gradient: 'from-red-600 via-rose-500 to-red-700', description: 'Stunning floor-length red gown' },
    { id: 'white-bridal', name: 'Bridal White', visual: '🤍', gradient: 'from-white via-gray-100 to-white', description: 'Beautiful white wedding dress' },
    { id: 'pink-lehenga', name: 'Pink Lehenga', visual: '🩷', gradient: 'from-pink-400 via-rose-400 to-pink-500', description: 'Traditional pink lehenga' },
    { id: 'golden-saree', name: 'Golden Saree', visual: '✨', gradient: 'from-amber-400 via-yellow-400 to-amber-500', description: 'Gorgeous golden saree' },
    { id: 'maroon-anarkali', name: 'Maroon Anarkali', visual: '🌹', gradient: 'from-rose-700 via-red-700 to-rose-800', description: 'Elegant maroon anarkali' },
    { id: 'purple-gown', name: 'Royal Purple', visual: '💜', gradient: 'from-purple-500 via-violet-500 to-purple-600', description: 'Majestic purple gown' },
  ],
  jewelry: [
    { id: 'diamond-set', name: 'Diamond Set', visual: '💎', gradient: 'from-cyan-200 via-white to-blue-200', description: 'Diamond necklace & earrings' },
    { id: 'gold-kundan', name: 'Gold Kundan', visual: '👑', gradient: 'from-amber-400 via-yellow-300 to-amber-500', description: 'Traditional kundan jewelry' },
    { id: 'pearl-set', name: 'Pearl Elegance', visual: '🤍', gradient: 'from-white via-gray-100 to-pink-50', description: 'Classic pearl set' },
    { id: 'ruby-set', name: 'Ruby Collection', visual: '❤️', gradient: 'from-red-500 via-rose-500 to-red-600', description: 'Stunning ruby set' },
    { id: 'emerald-set', name: 'Emerald Beauty', visual: '💚', gradient: 'from-emerald-400 via-green-400 to-emerald-500', description: 'Elegant emerald ensemble' },
  ],
  shoes: [
    { id: 'golden-heels', name: 'Golden Heels', visual: '👠', gradient: 'from-amber-400 via-yellow-400 to-amber-500', description: 'Stunning golden high heels' },
    { id: 'red-stilettos', name: 'Red Stilettos', visual: '👠', gradient: 'from-red-500 via-rose-500 to-red-600', description: 'Elegant red stilettos' },
    { id: 'silver-sandals', name: 'Silver Sandals', visual: '👡', gradient: 'from-gray-300 via-white to-gray-400', description: 'Sparkly silver sandals' },
    { id: 'crystal-heels', name: 'Crystal Heels', visual: '✨', gradient: 'from-cyan-200 via-blue-200 to-purple-200', description: 'Glass slipper-style heels' },
    { id: 'rose-gold', name: 'Rose Gold Heels', visual: '🌸', gradient: 'from-rose-300 via-pink-300 to-rose-400', description: 'Beautiful rose gold heels' },
  ],
  hairstyle: [
    { id: 'elegant-bun', name: 'Elegant Bun', visual: '💫', gradient: 'from-amber-600 via-orange-600 to-amber-700', description: 'Classic elegant updo' },
    { id: 'flowing-curls', name: 'Flowing Curls', visual: '🌊', gradient: 'from-amber-500 via-yellow-500 to-amber-600', description: 'Beautiful loose curls' },
    { id: 'braided-crown', name: 'Braided Crown', visual: '👑', gradient: 'from-amber-700 via-orange-700 to-amber-800', description: 'Intricate braided crown' },
    { id: 'side-swept', name: 'Side Swept', visual: '💃', gradient: 'from-gray-700 via-gray-800 to-black', description: 'Glamorous side-swept waves' },
    { id: 'traditional-bun', name: 'Floral Bun', visual: '🌺', gradient: 'from-rose-400 via-pink-400 to-rose-500', description: 'Traditional bun with flowers' },
  ],
  accessories: [
    { id: 'diamond-ring', name: 'Diamond Ring', visual: '💍', gradient: 'from-cyan-200 via-white to-blue-200', description: 'Diamond engagement ring' },
    { id: 'gold-bangles', name: 'Gold Bangles', visual: '⭕', gradient: 'from-amber-400 via-yellow-400 to-amber-500', description: 'Traditional gold bangles' },
    { id: 'clutch-purse', name: 'Designer Clutch', visual: '👛', gradient: 'from-rose-400 via-pink-400 to-rose-500', description: 'Elegant clutch purse' },
    { id: 'maang-tikka', name: 'Maang Tikka', visual: '✨', gradient: 'from-amber-500 via-orange-400 to-amber-500', description: 'Traditional headpiece' },
    { id: 'watch', name: 'Gold Watch', visual: '⌚', gradient: 'from-amber-400 via-yellow-400 to-amber-500', description: 'Elegant gold watch' },
  ],
};

// 3D Item Card Component
const Item3D = ({ 
  item, 
  isSelected, 
  onSelect, 
  index 
}: { 
  item: Item; 
  isSelected: boolean; 
  onSelect: () => void; 
  index: number;
}) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: "800px" }}
      initial={{ opacity: 0, rotateY: -90, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        rotateY: 0, 
        scale: isSelected ? 1.05 : 1,
      }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
      whileHover={{ 
        scale: 1.1, 
        rotateY: 10,
        rotateX: -5,
        z: 30,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
    >
      <div 
        className={`
          relative p-4 rounded-2xl overflow-hidden
          ${isSelected 
            ? 'ring-2 ring-rose-400 shadow-lg shadow-rose-500/30' 
            : 'border border-white/10'
          }
        `}
        style={{
          background: isSelected 
            ? 'linear-gradient(135deg, rgba(251, 113, 133, 0.3) 0%, rgba(219, 39, 119, 0.2) 100%)'
            : 'rgba(0, 0, 0, 0.3)',
          transformStyle: "preserve-3d",
          boxShadow: isSelected 
            ? '0 20px 40px rgba(251, 113, 133, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* 3D Item Display */}
        <motion.div
          className={`
            text-5xl p-4 rounded-xl mx-auto w-20 h-20 
            flex items-center justify-center
            bg-gradient-to-br ${item.gradient}
          `}
          style={{
            transform: "translateZ(20px)",
            boxShadow: `
              0 15px 35px rgba(0,0,0,0.4),
              inset 0 2px 4px rgba(255,255,255,0.3),
              inset 0 -2px 4px rgba(0,0,0,0.2)
            `,
          }}
          animate={isSelected ? {
            rotateY: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
        >
          {item.visual}
        </motion.div>
        
        {/* Item Info */}
        <div 
          className="text-center mt-3"
          style={{ transform: "translateZ(10px)" }}
        >
          <p className="text-sm text-white font-medium truncate">{item.name}</p>
          <p className="text-[10px] text-white/50 mt-1 line-clamp-1">{item.description}</p>
        </div>
        
        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute top-2 right-2 w-7 h-7 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotateZ: -180 }}
            animate={{ scale: 1, rotateZ: 0 }}
            style={{
              transform: "translateZ(30px)",
              boxShadow: "0 4px 15px rgba(251, 113, 133, 0.5)",
            }}
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
        
        {/* Sparkle effects when selected */}
        {isSelected && (
          <>
            <motion.div
              className="absolute -top-1 -left-1"
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transform: "translateZ(25px)" }}
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -right-1"
              animate={{ rotate: -360, scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              style={{ transform: "translateZ(25px)" }}
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
            </motion.div>
          </>
        )}
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(5px)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
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
    <div className="w-full space-y-4">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Crown className="w-6 h-6 text-amber-400" />
          </motion.div>
          <h3 className="text-lg font-serif text-rose-300">
            Dress Up For Our Date
          </h3>
          <motion.div
            animate={{ rotateY: [0, -360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Crown className="w-6 h-6 text-amber-400" />
          </motion.div>
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
              selections[cat.key] 
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 scale-110' 
                : 'bg-white/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ 
              scale: selections[cat.key] ? [1, 1.2, 1] : 1,
            }}
            transition={{ 
              delay: index * 0.1,
              duration: selections[cat.key] ? 1 : 0.3,
              repeat: selections[cat.key] ? Infinity : 0,
            }}
            style={{
              boxShadow: selections[cat.key] 
                ? '0 0 10px rgba(251, 113, 133, 0.5)' 
                : 'none',
            }}
          />
        ))}
      </div>

      {/* Category Tabs - 3D Style */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max" style={{ perspective: "500px" }}>
          {categories.map((cat, index) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium 
                flex items-center gap-2 whitespace-nowrap transition-all
                ${activeCategory === cat.key
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                }
                ${selections[cat.key] ? 'ring-2 ring-rose-400/50' : ''}
              `}
              initial={{ opacity: 0, rotateX: -30 }}
              animate={{ 
                opacity: 1, 
                rotateX: 0,
                scale: activeCategory === cat.key ? 1.05 : 1,
              }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, rotateX: 10 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: activeCategory === cat.key 
                  ? '0 10px 30px rgba(251, 113, 133, 0.4)'
                  : '0 5px 15px rgba(0,0,0,0.2)',
              }}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span>{cat.label}</span>
              {selections[cat.key] && <Check className="w-3 h-3" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 3D Wardrobe Display */}
      <div 
        className="relative bg-gradient-to-br from-amber-900/40 via-rose-900/30 to-purple-900/40 rounded-3xl p-4 border border-amber-500/30 overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Wardrobe frame - 3D effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-t-3xl"
          style={{
            boxShadow: "0 4px 15px rgba(217, 119, 6, 0.3)",
            transform: "translateZ(10px)",
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 rounded-b-3xl"
        />
        
        {/* Items Grid - 3D */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 gap-4 pt-3"
            initial={{ opacity: 0, rotateY: 30 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -30 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {items[activeCategory].map((item, index) => (
              <Item3D
                key={item.id}
                item={item}
                isSelected={selections[activeCategory] === item.id}
                onSelect={() => handleSelect(activeCategory, item.id)}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3D Mirror Preview */}
      <motion.div
        className="relative bg-gradient-to-br from-amber-900/50 to-rose-900/50 rounded-3xl p-5 border-2 border-amber-500/40 overflow-hidden"
        style={{
          perspective: "500px",
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.4),
            inset 0 0 30px rgba(251, 191, 36, 0.1)
          `,
        }}
        layout
      >
        {/* Mirror frame */}
        <div className="absolute inset-0 rounded-3xl border-4 border-amber-600/50 pointer-events-none" />
        <div className="absolute inset-2 rounded-2xl border border-amber-400/20 pointer-events-none" />
        
        {/* Mirror shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none rounded-3xl"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <h4 className="text-center text-rose-300 text-sm mb-4 flex items-center justify-center gap-2">
          <Gem className="w-4 h-4" />
          Your Look
          <Gem className="w-4 h-4" />
        </h4>
        
        {/* Avatar Display - 3D rotating */}
        <div 
          className="flex justify-center items-end gap-2 h-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          {categories.map((cat, i) => {
            const selected = getSelectedItem(cat.key);
            return (
              <motion.div
                key={cat.key}
                className="text-center"
                animate={selected ? {
                  y: [0, -8, 0],
                  rotateY: [0, 10, -10, 0],
                } : {}}
                transition={{ 
                  duration: 2, 
                  repeat: selected ? Infinity : 0, 
                  delay: i * 0.2 
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div 
                  className={`text-3xl ${selected ? '' : 'opacity-20 grayscale'}`}
                  whileHover={{ scale: 1.3, rotateY: 20 }}
                >
                  {selected?.visual || cat.emoji}
                </motion.div>
                <p className="text-[8px] text-white/50 mt-1">{cat.label}</p>
              </motion.div>
            );
          })}
        </div>
        
        <p className="text-center text-white/40 text-xs mt-3">
          {completedCount}/{categories.length} items selected
        </p>
      </motion.div>

      {/* Complete Button - 3D */}
      <AnimatePresence>
        {allSelected && !isComplete && (
          <motion.button
            onClick={handleComplete}
            className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl text-white font-serif text-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 20, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02, rotateX: 5 }}
            whileTap={{ scale: 0.98 }}
            style={{
              perspective: "500px",
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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

      {/* Result - 3D Date Night Scene */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="text-center py-6"
            initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="text-7xl mb-4 inline-block"
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transformStyle: "preserve-3d" }}
            >
              💕
            </motion.div>
            <h4 className="text-2xl font-serif text-rose-300 mb-2">
              You're Absolutely Stunning!
            </h4>
            <p className="text-white/70 font-serif italic text-base mb-6">
              "I can't wait to pick you up, my beautiful Puntuu"
            </p>
            
            {/* 3D Romantic Date Scene */}
            <motion.div
              className="bg-gradient-to-br from-amber-900/50 via-rose-900/40 to-purple-900/50 rounded-3xl p-6 border border-amber-500/40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* 3D Date Animation */}
              <div 
                className="flex justify-center items-center gap-6 text-4xl mb-4"
                style={{ perspective: "500px" }}
              >
                <motion.span
                  animate={{ 
                    y: [0, -15, 0], 
                    rotateY: [0, 20, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformStyle: "preserve-3d" }}
                >🚗</motion.span>
                <motion.span
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotateZ: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >💑</motion.span>
                <motion.span
                  animate={{ 
                    y: [0, -15, 0], 
                    rotateY: [0, -20, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >🏰</motion.span>
              </div>
              
              {/* Dinner Table - 3D */}
              <div 
                className="bg-black/40 rounded-2xl p-4 mb-4"
                style={{
                  boxShadow: "inset 0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex justify-center items-end gap-3 text-3xl mb-2">
                  <motion.span 
                    animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                  >🕯️</motion.span>
                  <span>🍽️</span>
                  <motion.span 
                    animate={{ rotateZ: [-5, 5, -5] }} 
                    transition={{ duration: 1, repeat: Infinity }}
                  >🥂</motion.span>
                  <span>🍽️</span>
                  <motion.span 
                    animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }} 
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >🕯️</motion.span>
                </div>
                <p className="text-amber-300/80 text-sm">
                  A romantic candlelit dinner awaits...
                </p>
              </div>
              
              {/* Your Outfit */}
              <div 
                className="bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-2xl p-4"
                style={{ perspective: "500px" }}
              >
                <p className="text-rose-300 text-sm font-medium mb-3">Your Perfect Look:</p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {categories.map((cat, i) => {
                    const selected = getSelectedItem(cat.key);
                    return selected ? (
                      <motion.div
                        key={cat.key}
                        className="text-3xl"
                        animate={{ 
                          y: [0, -8, 0],
                          rotateY: [0, 15, -15, 0],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                        style={{ transformStyle: "preserve-3d" }}
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
