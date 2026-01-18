import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check, Crown, Gem, Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import ReactDOM from "react-dom";

interface DressUpGameProps {
  onComplete?: () => void;
}

type Category = 'dresses' | 'earrings' | 'necklaces' | 'shoes' | 'hairstyles' | 'extras';

interface Item {
  id: string;
  name: string;
  image: string;
  color: string;
  description: string;
}

const categories: { key: Category; label: string; emoji: string }[] = [
  { key: 'dresses', label: 'Dresses', emoji: '👗' },
  { key: 'earrings', label: 'Earrings', emoji: '💎' },
  { key: 'necklaces', label: 'Necklaces', emoji: '📿' },
  { key: 'shoes', label: 'Shoes', emoji: '👠' },
  { key: 'hairstyles', label: 'Hair', emoji: '💇‍♀️' },
  { key: 'extras', label: 'Extras', emoji: '✨' },
];

// Realistic items with Pinterest-inspired descriptions
const items: Record<Category, Item[]> = {
  dresses: [
    { id: 'red-velvet-gown', name: 'Red Velvet Gown', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400', color: '#dc2626', description: 'Luxurious floor-length velvet with sweetheart neckline' },
    { id: 'blush-tulle', name: 'Blush Tulle Princess', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', color: '#fda4af', description: 'Romantic layered tulle ballgown' },
    { id: 'gold-sequin', name: 'Gold Sequin Glamour', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', color: '#fbbf24', description: 'Stunning all-over sequin mermaid dress' },
    { id: 'emerald-satin', name: 'Emerald Satin Slip', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', color: '#10b981', description: 'Elegant bias-cut silk satin' },
    { id: 'burgundy-lace', name: 'Burgundy Lace', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', color: '#7f1d1d', description: 'Intricate French lace overlay' },
    { id: 'champagne-beaded', name: 'Champagne Beaded', image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400', color: '#fef3c7', description: 'Hand-beaded bodice with flowing skirt' },
    { id: 'black-velvet', name: 'Black Velvet Drama', image: 'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?w=400', color: '#1f2937', description: 'Classic old Hollywood glamour' },
    { id: 'pink-lehenga', name: 'Pink Bridal Lehenga', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', color: '#ec4899', description: 'Traditional embroidered bridal lehenga' },
  ],
  earrings: [
    { id: 'diamond-drops', name: 'Diamond Drops', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', color: '#e0f2fe', description: 'Elegant teardrop diamond earrings' },
    { id: 'gold-chandeliers', name: 'Gold Chandeliers', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', color: '#fcd34d', description: 'Statement chandelier earrings' },
    { id: 'pearl-studs', name: 'Pearl Studs', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', color: '#faf5ff', description: 'Classic freshwater pearl studs' },
    { id: 'ruby-dangles', name: 'Ruby Dangles', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', color: '#ef4444', description: 'Cascading ruby drop earrings' },
    { id: 'emerald-hoops', name: 'Emerald Hoops', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400', color: '#34d399', description: 'Delicate emerald-encrusted hoops' },
    { id: 'kundan-jhumkas', name: 'Kundan Jhumkas', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400', color: '#f59e0b', description: 'Traditional Indian jhumka earrings' },
  ],
  necklaces: [
    { id: 'diamond-choker', name: 'Diamond Choker', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400', color: '#f0f9ff', description: 'Brilliant-cut diamond choker' },
    { id: 'gold-layered', name: 'Gold Layered Set', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', color: '#fcd34d', description: 'Delicate layered gold chains' },
    { id: 'pearl-strand', name: 'Pearl Strand', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', color: '#fffbeb', description: 'Classic Akoya pearl necklace' },
    { id: 'statement-bib', name: 'Statement Bib', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400', color: '#a78bfa', description: 'Crystal-encrusted statement piece' },
    { id: 'kundan-set', name: 'Kundan Bridal Set', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400', color: '#fbbf24', description: 'Traditional kundan polki necklace' },
    { id: 'pendant-chain', name: 'Heart Pendant', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400', color: '#fb7185', description: 'Romantic heart pendant on chain' },
  ],
  shoes: [
    { id: 'crystal-stilettos', name: 'Crystal Stilettos', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', color: '#e0f2fe', description: 'Cinderella-inspired crystal heels' },
    { id: 'red-pumps', name: 'Red Satin Pumps', image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400', color: '#dc2626', description: 'Classic red carpet stilettos' },
    { id: 'gold-strappy', name: 'Gold Strappy Heels', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400', color: '#fbbf24', description: 'Elegant strappy sandals' },
    { id: 'nude-platforms', name: 'Nude Platforms', image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400', color: '#fed7aa', description: 'Comfortable platform heels' },
    { id: 'silver-sparkle', name: 'Silver Sparkle', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', color: '#e2e8f0', description: 'Glittering silver pumps' },
    { id: 'rose-gold-sandals', name: 'Rose Gold Sandals', image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400', color: '#fda4af', description: 'Delicate rose gold evening sandals' },
  ],
  hairstyles: [
    { id: 'elegant-updo', name: 'Elegant Updo', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', color: '#78350f', description: 'Classic twisted chignon' },
    { id: 'hollywood-waves', name: 'Hollywood Waves', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400', color: '#92400e', description: 'Old Hollywood finger waves' },
    { id: 'braided-crown', name: 'Braided Crown', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400', color: '#451a03', description: 'Romantic braided crown style' },
    { id: 'loose-curls', name: 'Loose Romantic Curls', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400', color: '#78350f', description: 'Soft bouncy curls' },
    { id: 'sleek-ponytail', name: 'Sleek High Ponytail', image: 'https://images.unsplash.com/photo-1554519515-242161756769?w=400', color: '#1c1917', description: 'Dramatic high ponytail' },
    { id: 'flower-bun', name: 'Floral Bun', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400', color: '#be185d', description: 'Traditional bun with fresh flowers' },
  ],
  extras: [
    { id: 'diamond-ring', name: 'Diamond Ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400', color: '#f0f9ff', description: 'Stunning engagement ring' },
    { id: 'gold-bangles', name: 'Gold Bangles Set', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', color: '#fcd34d', description: 'Stack of delicate gold bangles' },
    { id: 'clutch-rose', name: 'Rose Gold Clutch', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', color: '#fda4af', description: 'Elegant evening clutch' },
    { id: 'tiara', name: 'Crystal Tiara', image: 'https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=400', color: '#e0f2fe', description: 'Princess-worthy crystal tiara' },
    { id: 'maang-tikka', name: 'Maang Tikka', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400', color: '#fbbf24', description: 'Traditional forehead jewelry' },
    { id: 'silk-wrap', name: 'Silk Evening Wrap', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', color: '#a78bfa', description: 'Luxurious silk shawl' },
  ],
};

// Realistic Item Card Component
const ItemCard = ({ 
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
      className="relative cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <div 
        className={`
          relative rounded-2xl overflow-hidden
          ${isSelected 
            ? 'ring-3 ring-rose-400 shadow-xl shadow-rose-500/30' 
            : 'ring-1 ring-white/20'
          }
        `}
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Color dot indicator */}
          <div 
            className="absolute top-2 left-2 w-4 h-4 rounded-full border-2 border-white/50"
            style={{ backgroundColor: item.color }}
          />
          
          {/* Selection indicator */}
          {isSelected && (
            <motion.div
              className="absolute top-2 right-2 w-7 h-7 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              style={{
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
                className="absolute bottom-12 left-2"
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </motion.div>
              <motion.div
                className="absolute bottom-12 right-2"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
              </motion.div>
            </>
          )}
        </div>
        
        {/* Item Info */}
        <div className="p-3">
          <p className="text-sm text-white font-medium truncate">{item.name}</p>
          <p className="text-[10px] text-white/60 mt-0.5 line-clamp-1">{item.description}</p>
        </div>
        
        {/* Selection glow */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              boxShadow: 'inset 0 0 30px rgba(251, 113, 133, 0.3)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Date Night Result Modal
const DateNightModal = ({
  selections,
  onClose
}: {
  selections: Record<Category, string | null>;
  onClose: () => void;
}) => {
  const getSelectedItems = () => {
    const selected: { category: string; item: Item }[] = [];
    Object.entries(selections).forEach(([cat, itemId]) => {
      if (itemId) {
        const item = items[cat as Category].find(i => i.id === itemId);
        if (item) {
          selected.push({ category: cat, item });
        }
      }
    });
    return selected;
  };

  const selectedItems = getSelectedItems();

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1a0505 0%, #2d1f3d 50%, #1a0a1a 100%)',
      }}
    >
      {/* Romantic particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '1.5rem',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['✨', '💕', '💎', '🌟', '💗'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div 
        style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          paddingTop: 'max(16px, env(safe-area-inset-top))',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <Crown className="w-6 h-6 text-amber-400" />
          <span style={{ color: 'white', fontFamily: 'serif', fontSize: '1.25rem' }}>
            Ready for Our Date! 💕
          </span>
          <Crown className="w-6 h-6 text-amber-400" />
        </motion.div>
        <motion.button
          onClick={onClose}
          style={{
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px', paddingBottom: 'max(40px, env(safe-area-inset-bottom))' }}>
        {/* Romantic message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.2) 0%, rgba(217, 70, 239, 0.2) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(251, 113, 133, 0.3)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '3rem', marginBottom: '16px' }}
          >
            👸✨
          </motion.div>
          <p style={{ color: 'white', fontFamily: 'serif', fontSize: '1.1rem', lineHeight: 1.6 }}>
            My beautiful Puntuu, you look absolutely stunning! 
            I can't wait for our romantic dinner date. 
            You're the most gorgeous person in the world to me! 💕
          </p>
        </motion.div>

        {/* Selected Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {selectedItems.map(({ category, item }, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
              />
              <div style={{ padding: '12px' }}>
                <p style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>{item.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginTop: '2px' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Romantic Date Scene */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '24px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)',
            borderRadius: '24px',
            textAlign: 'center',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: '4rem', marginBottom: '16px' }}
          >
            🌙🍷🕯️
          </motion.div>
          <h3 style={{ color: '#fbbf24', fontFamily: 'serif', fontSize: '1.5rem', marginBottom: '12px' }}>
            Our Dream Date Night
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
            A candlelit dinner at our favorite restaurant...
            Soft music playing in the background...
            Your hand in mine across the table...
            This is all I ever dreamed of, Puntuu. 💕
          </p>
        </motion.div>
      </div>
    </motion.div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export const DressUpGame = ({ onComplete }: DressUpGameProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>('dresses');
  const [selections, setSelections] = useState<Record<Category, string | null>>({
    dresses: null,
    earrings: null,
    necklaces: null,
    shoes: null,
    hairstyles: null,
    extras: null,
  });
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
    setShowResult(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    onComplete?.();
  };

  const getSelectedItem = (category: Category) => {
    const itemId = selections[category];
    return items[category].find(item => item.id === itemId);
  };

  const activeCategoryIndex = categories.findIndex(c => c.key === activeCategory);

  const goToPrevCategory = () => {
    if (activeCategoryIndex > 0) {
      setActiveCategory(categories[activeCategoryIndex - 1].key);
    }
  };

  const goToNextCategory = () => {
    if (activeCategoryIndex < categories.length - 1) {
      setActiveCategory(categories[activeCategoryIndex + 1].key);
    }
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
          >
            <Crown className="w-6 h-6 text-amber-400" />
          </motion.div>
          <h3 className="text-lg font-serif text-rose-300">
            Get Ready for Our Date 💕
          </h3>
          <motion.div
            animate={{ rotateY: [0, -360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Crown className="w-6 h-6 text-amber-400" />
          </motion.div>
        </div>
        <p className="text-white/70 text-xs">
          Choose your perfect look from our collection ✨
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / categories.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-center text-white/50 text-xs mt-2">
          {completedCount} of {categories.length} selected
        </p>
      </div>

      {/* Category Navigation with arrows */}
      <div className="flex items-center gap-2 px-2">
        <motion.button
          onClick={goToPrevCategory}
          disabled={activeCategoryIndex === 0}
          className={`p-2 rounded-full ${
            activeCategoryIndex === 0 
              ? 'bg-white/5 text-white/30' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium 
                  flex items-center gap-2 whitespace-nowrap transition-all
                  ${activeCategory === cat.key
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }
                  ${selections[cat.key] ? 'ring-2 ring-green-400/50' : ''}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-base">{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.label}</span>
                {selections[cat.key] && <Check className="w-3 h-3 text-green-400" />}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.button
          onClick={goToNextCategory}
          disabled={activeCategoryIndex === categories.length - 1}
          className={`p-2 rounded-full ${
            activeCategoryIndex === categories.length - 1 
              ? 'bg-white/5 text-white/30' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Items Grid */}
      <div className="relative bg-gradient-to-br from-black/40 to-purple-900/30 rounded-2xl p-4 border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {items[activeCategory].map((item, index) => (
              <ItemCard
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

      {/* Selected Preview */}
      <div className="bg-gradient-to-br from-amber-900/30 to-rose-900/30 rounded-2xl p-4 border border-amber-500/30">
        <h4 className="text-center text-rose-300 text-sm mb-3 flex items-center justify-center gap-2">
          <Gem className="w-4 h-4" />
          Your Look
          <Gem className="w-4 h-4" />
        </h4>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => {
            const selected = getSelectedItem(cat.key);
            return (
              <motion.div
                key={cat.key}
                className="flex-shrink-0 w-16 text-center"
                animate={selected ? { y: [0, -3, 0] } : {}}
                transition={{ duration: 2, repeat: selected ? Infinity : 0 }}
              >
                <div 
                  className={`
                    w-14 h-14 mx-auto rounded-xl overflow-hidden
                    ${selected 
                      ? 'ring-2 ring-rose-400 shadow-lg shadow-rose-500/30' 
                      : 'bg-white/10 border border-dashed border-white/30'
                    }
                  `}
                >
                  {selected ? (
                    <img 
                      src={selected.image} 
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl opacity-40">
                      {cat.emoji}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-white/60 mt-1 truncate">{cat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Complete Button */}
      <motion.button
        onClick={handleComplete}
        disabled={!allSelected}
        className={`
          w-full py-4 rounded-2xl text-white font-medium
          flex items-center justify-center gap-3
          ${allSelected
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-xl shadow-rose-500/30'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
          }
        `}
        whileHover={allSelected ? { scale: 1.02 } : {}}
        whileTap={allSelected ? { scale: 0.98 } : {}}
        animate={allSelected ? {
          boxShadow: [
            '0 10px 40px rgba(251, 113, 133, 0.3)',
            '0 10px 60px rgba(251, 113, 133, 0.5)',
            '0 10px 40px rgba(251, 113, 133, 0.3)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: allSelected ? Infinity : 0 }}
      >
        {allSelected ? (
          <>
            <Heart className="w-5 h-5" fill="white" />
            Ready for Our Date Night! 💕
            <Sparkles className="w-5 h-5" />
          </>
        ) : (
          <>
            Complete all selections ({completedCount}/{categories.length})
          </>
        )}
      </motion.button>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && (
          <DateNightModal 
            selections={selections} 
            onClose={() => setShowResult(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
