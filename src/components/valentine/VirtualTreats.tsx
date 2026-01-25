import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Plane, Star, X } from "lucide-react";
import ReactDOM from "react-dom";

interface TreatItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  message: string;
  benefits: string[];
}

const treats: TreatItem[] = [
  {
    id: 'pineapple',
    name: 'Sweet Pineapple',
    emoji: '🍍',
    description: 'Fresh tropical sweetness',
    color: 'from-yellow-400 to-amber-500',
    message: 'Mmm! This pineapple is as sweet as your smile! 🍍💕',
    benefits: ['Rich in Vitamin C', 'Boosts immunity', 'Great for skin', 'Natural sweetness']
  },
  {
    id: 'madhu',
    name: 'Madhu (Honey)',
    emoji: '🍯',
    description: 'Golden nectar of love',
    color: 'from-amber-400 to-yellow-600',
    message: 'You are the honey that sweetens my life, Puntuu! 🍯💛',
    benefits: ['Natural energy', 'Soothes throat', 'Antioxidant rich', 'Pure sweetness']
  },
  {
    id: 'coke',
    name: 'Chilled Coke',
    emoji: '🥤',
    description: 'Refreshing fizzy drink',
    color: 'from-red-500 to-red-700',
    message: 'Fizzy and fun, just like our love! 🥤✨',
    benefits: ['Refreshing', 'Instant energy', 'Perfect treat', 'Celebration drink']
  },
  {
    id: 'cheesecake',
    name: 'Creamy Cheesecake',
    emoji: '🍰',
    description: 'Rich and dreamy dessert',
    color: 'from-orange-300 to-amber-400',
    message: 'Life is sweet with you, like this cheesecake! 🍰💕',
    benefits: ['Rich & creamy', 'Perfect dessert', 'Celebration treat', 'Sweet memories']
  },
  {
    id: 'chocolate',
    name: 'Dark Chocolate',
    emoji: '🍫',
    description: 'Romantic indulgence',
    color: 'from-amber-700 to-amber-900',
    message: 'Sweet, rich, and irresistible - just like you! 🍫❤️',
    benefits: ['Mood booster', 'Antioxidants', 'Heart healthy', 'Pure indulgence']
  },
  {
    id: 'strawberry',
    name: 'Fresh Strawberries',
    emoji: '🍓',
    description: 'Sweet and romantic',
    color: 'from-red-400 to-rose-500',
    message: 'Berry sweet moments with my berry sweet girl! 🍓💕',
    benefits: ['Vitamin C', 'Low calories', 'Heart healthy', 'Romantic treat']
  },
  {
    id: 'icecream',
    name: 'Ice Cream',
    emoji: '🍨',
    description: 'Cool and delightful',
    color: 'from-pink-300 to-rose-400',
    message: 'You make every moment as sweet as ice cream! 🍨✨',
    benefits: ['Cooling treat', 'Mood lifter', 'Sweet escape', 'Comfort food']
  },
  {
    id: 'mango',
    name: 'Juicy Mango',
    emoji: '🥭',
    description: 'King of fruits',
    color: 'from-yellow-400 to-orange-500',
    message: 'You\'re the mango to my lassi, the sweet to my treat! 🥭💛',
    benefits: ['Vitamin A & C', 'Digestive aid', 'Summer favorite', 'Natural sweetness']
  },
];

const TreatModal = ({ treat, onClose }: { treat: TreatItem; onClose: () => void }) => {
  const [isEating, setIsEating] = useState(false);
  const [eaten, setEaten] = useState(false);

  const handleEat = () => {
    setIsEating(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
    setTimeout(() => {
      setIsEating(false);
      setEaten(true);
    }, 1500);
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-gradient-to-br ${treat.color} rounded-3xl p-6 max-w-sm w-full`}
        style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 rounded-full p-2"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Treat Display */}
        <div className="text-center mb-6">
          <AnimatePresence mode="wait">
            {!eaten ? (
              <motion.div
                key="treat"
                animate={isEating ? { 
                  scale: [1, 0.8, 0.5, 0],
                  rotate: [0, 10, -10, 360],
                  opacity: [1, 1, 0.5, 0]
                } : { scale: [1, 1.1, 1] }}
                transition={isEating ? { duration: 1.5 } : { duration: 2, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                {treat.emoji}
              </motion.div>
            ) : (
              <motion.div
                key="yum"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-4"
              >
                😋
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="text-2xl font-bold text-white mb-2">{treat.name}</h3>
          <p className="text-white/80">{treat.description}</p>
        </div>

        {/* Message */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4 text-center">
          <p className="text-white font-serif italic">
            {eaten ? treat.message : 'Tap to enjoy this treat! 💕'}
          </p>
        </div>

        {/* Benefits */}
        {eaten && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <p className="text-white/70 text-sm mb-2">Benefits:</p>
            <div className="flex flex-wrap gap-2">
              {treat.benefits.map((benefit, i) => (
                <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Eat Button */}
        {!eaten && !isEating && (
          <motion.button
            onClick={handleEat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold flex items-center justify-center gap-2"
          >
            <span className="text-xl">{treat.emoji}</span>
            Enjoy This Treat!
          </motion.button>
        )}

        {isEating && (
          <div className="text-center py-4">
            <p className="text-white animate-pulse">Nom nom nom... 😋</p>
          </div>
        )}

        {eaten && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-white">Yummy! Want another? 💕</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const VirtualTreats = () => {
  const [selectedTreat, setSelectedTreat] = useState<TreatItem | null>(null);
  const [treatsEnjoyed, setTreatsEnjoyed] = useState<Set<string>>(new Set());

  const handleTreatClick = (treat: TreatItem) => {
    setSelectedTreat(treat);
    setTreatsEnjoyed(prev => new Set([...prev, treat.id]));
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🍰
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Virtual Treats Café
        </h3>
        <p className="text-white/60 text-sm">
          Enjoy some sweet treats, Puntuu! 💕
        </p>
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-pink-400 text-sm">
          🍽️ {treatsEnjoyed.size}/{treats.length} treats enjoyed!
        </span>
      </div>

      {/* Treats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {treats.map((treat, index) => (
          <motion.button
            key={treat.id}
            onClick={() => handleTreatClick(treat)}
            className={`relative p-4 rounded-2xl bg-gradient-to-br ${treat.color} text-center overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            <motion.span
              className="text-4xl block mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
            >
              {treat.emoji}
            </motion.span>
            <p className="text-white font-medium text-sm">{treat.name}</p>
            
            {treatsEnjoyed.has(treat.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
              >
                <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Airhostess Service */}
      <motion.div
        className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-4 border border-blue-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.span
            className="text-3xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✈️👩‍✈️
          </motion.span>
          <div>
            <p className="text-white font-medium">First Class Service</p>
            <p className="text-white/60 text-xs">I'll serve you like an airhostess! 💕</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-white/80 text-sm italic">
            "Welcome aboard Love Airlines! ✈️ Today's special treats are ready for you. 
            Please sit back, relax, and let me take care of everything. Your comfort is my priority!" 
            - Your Personal Flight Attendant 💋
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {['🥤 Drinks', '🍰 Desserts', '🍫 Snacks', '🍓 Fruits'].map((item, i) => (
            <span key={i} className="bg-blue-500/30 px-3 py-1 rounded-full text-white text-xs">
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "I'd love to feed you all these treats in person someday, Puntuu!" 💕
        </p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTreat && (
          <TreatModal
            treat={selectedTreat}
            onClose={() => setSelectedTreat(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
