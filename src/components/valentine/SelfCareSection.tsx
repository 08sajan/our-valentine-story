import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Moon, Sun, Star, X, CheckCircle2 } from "lucide-react";
import ReactDOM from "react-dom";

interface SelfCareItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'skincare' | 'wellness' | 'mindfulness' | 'body' | 'sleep';
  tips: string[];
  affirmation: string;
}

const selfCareItems: SelfCareItem[] = [
  // SKINCARE
  {
    id: 'cleanser',
    title: 'Gentle Cleansing',
    description: 'Start with a clean canvas',
    emoji: '🧴',
    category: 'skincare',
    tips: [
      'Use lukewarm water, not hot',
      'Massage gently in circular motions',
      'Double cleanse at night if wearing makeup',
      'Pat dry, don\'t rub your skin',
      'Choose a gentle, pH-balanced cleanser'
    ],
    affirmation: 'My skin is glowing and healthy!'
  },
  {
    id: 'moisturize',
    title: 'Hydrate & Moisturize',
    description: 'Lock in that moisture',
    emoji: '💧',
    category: 'skincare',
    tips: [
      'Apply on slightly damp skin',
      'Use upward strokes when applying',
      'Don\'t forget your neck and décolletage',
      'Layer thinnest to thickest products',
      'Drink plenty of water too!'
    ],
    affirmation: 'I nourish my skin with love!'
  },
  {
    id: 'sunscreen',
    title: 'Sun Protection',
    description: 'Shield your beautiful skin',
    emoji: '☀️',
    category: 'skincare',
    tips: [
      'Apply SPF 30+ every single day',
      'Reapply every 2 hours if outdoors',
      'Use 2 finger lengths for face',
      'Don\'t forget ears and lips',
      'UV rays penetrate clouds too!'
    ],
    affirmation: 'I protect my skin every day!'
  },
  {
    id: 'facemask',
    title: 'Weekly Face Mask',
    description: 'Treat yourself to luxury',
    emoji: '🧖‍♀️',
    category: 'skincare',
    tips: [
      'Clay masks for oily skin',
      'Sheet masks for hydration',
      'Apply after cleansing and toning',
      'Relax for 15-20 minutes',
      'Follow with serum and moisturizer'
    ],
    affirmation: 'I deserve pampering and self-care!'
  },

  // WELLNESS
  {
    id: 'water',
    title: 'Stay Hydrated',
    description: 'Water is life',
    emoji: '💦',
    category: 'wellness',
    tips: [
      'Drink 8 glasses daily',
      'Start your morning with warm water',
      'Infuse with lemon or cucumber',
      'Carry a water bottle everywhere',
      'Set hourly reminders'
    ],
    affirmation: 'I nourish my body with water!'
  },
  {
    id: 'vitamins',
    title: 'Vitamins & Nutrition',
    description: 'Feed your body right',
    emoji: '🥗',
    category: 'wellness',
    tips: [
      'Eat colorful fruits and vegetables',
      'Get enough protein for hair and nails',
      'Consider vitamin D and iron',
      'Omega-3s for glowing skin',
      'Listen to your body\'s needs'
    ],
    affirmation: 'I fuel my body with goodness!'
  },
  {
    id: 'movement',
    title: 'Joyful Movement',
    description: 'Move your beautiful body',
    emoji: '💃',
    category: 'wellness',
    tips: [
      'Dance like nobody\'s watching',
      'Take a walk in nature',
      'Try yoga or stretching',
      'Find exercise you actually enjoy',
      '10 minutes is better than none!'
    ],
    affirmation: 'My body loves to move!'
  },

  // MINDFULNESS
  {
    id: 'meditation',
    title: 'Daily Meditation',
    description: 'Find your inner peace',
    emoji: '🧘‍♀️',
    category: 'mindfulness',
    tips: [
      'Start with just 5 minutes',
      'Focus on your breath',
      'It\'s okay if your mind wanders',
      'Try guided meditations',
      'Consistency matters more than duration'
    ],
    affirmation: 'I am calm and centered!'
  },
  {
    id: 'gratitude',
    title: 'Gratitude Practice',
    description: 'Count your blessings',
    emoji: '🙏',
    category: 'mindfulness',
    tips: [
      'Write 3 things you\'re grateful for',
      'Do this every morning or night',
      'Include small and big things',
      'Feel the gratitude in your heart',
      'Share gratitude with others'
    ],
    affirmation: 'I am grateful for my beautiful life!'
  },
  {
    id: 'journal',
    title: 'Journaling',
    description: 'Express your thoughts',
    emoji: '📔',
    category: 'mindfulness',
    tips: [
      'Write freely without judgment',
      'Start with prompts if needed',
      'Express emotions on paper',
      'Reflect on your growth',
      'Keep it private and honest'
    ],
    affirmation: 'My thoughts and feelings matter!'
  },

  // BODY
  {
    id: 'haircare',
    title: 'Hair Love',
    description: 'Your crown deserves care',
    emoji: '💇‍♀️',
    category: 'body',
    tips: [
      'Use a silk pillowcase',
      'Don\'t overwash your hair',
      'Deep condition weekly',
      'Avoid excessive heat styling',
      'Trim regularly for healthy ends'
    ],
    affirmation: 'My hair is beautiful and healthy!'
  },
  {
    id: 'bodycare',
    title: 'Body Skincare',
    description: 'Soft skin everywhere',
    emoji: '🛁',
    category: 'body',
    tips: [
      'Exfoliate gently 1-2 times a week',
      'Moisturize right after shower',
      'Pay attention to elbows and knees',
      'Use body oils for extra glow',
      'Take relaxing baths with salts'
    ],
    affirmation: 'I love and appreciate my body!'
  },
  {
    id: 'nails',
    title: 'Nail Care',
    description: 'Pretty tips',
    emoji: '💅',
    category: 'body',
    tips: [
      'Keep nails clean and dry',
      'Push back cuticles gently',
      'Use a base coat before polish',
      'Moisturize cuticles daily',
      'File in one direction only'
    ],
    affirmation: 'Every detail of me is worth caring for!'
  },

  // SLEEP
  {
    id: 'sleeptime',
    title: 'Beauty Sleep',
    description: 'Rest for radiance',
    emoji: '😴',
    category: 'sleep',
    tips: [
      'Aim for 7-9 hours of sleep',
      'Keep a consistent sleep schedule',
      'No screens 1 hour before bed',
      'Keep bedroom cool and dark',
      'Try calming tea before bed'
    ],
    affirmation: 'I deserve restful, peaceful sleep!'
  },
  {
    id: 'nightroutine',
    title: 'Night Routine',
    description: 'Wind down beautifully',
    emoji: '🌙',
    category: 'sleep',
    tips: [
      'Remove all makeup before bed',
      'Apply night cream or retinol',
      'Do a gentle facial massage',
      'Use an eye cream',
      'Spritz lavender on your pillow'
    ],
    affirmation: 'I end each day with love for myself!'
  },
];

const categoryInfo = {
  skincare: { emoji: '✨', name: 'Skincare', color: 'from-pink-400 to-rose-500' },
  wellness: { emoji: '💚', name: 'Wellness', color: 'from-green-400 to-emerald-500' },
  mindfulness: { emoji: '🧘‍♀️', name: 'Mindfulness', color: 'from-purple-400 to-violet-500' },
  body: { emoji: '💕', name: 'Body Care', color: 'from-rose-400 to-pink-500' },
  sleep: { emoji: '🌙', name: 'Sleep', color: 'from-indigo-400 to-purple-500' },
};

const DetailModal = ({ item, onClose }: { item: SelfCareItem; onClose: () => void }) => {
  const [checkedTips, setCheckedTips] = useState<Set<number>>(new Set());
  const category = categoryInfo[item.category];

  const toggleTip = (index: number) => {
    setCheckedTips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(20px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-gradient-to-br ${category.color} rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto`}
        style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 rounded-full p-2"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <motion.span
            className="text-6xl block mb-3"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {item.emoji}
          </motion.span>
          <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
          <p className="text-white/80">{item.description}</p>
        </div>

        {/* Tips */}
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <p className="text-white font-medium mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Tips for you:
          </p>
          <div className="space-y-2">
            {item.tips.map((tip, index) => (
              <motion.button
                key={index}
                onClick={() => toggleTip(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  checkedTips.has(index) ? 'bg-white/20' : 'bg-white/5'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  checkedTips.has(index) ? 'bg-white border-white' : 'border-white/50'
                }`}>
                  {checkedTips.has(index) && <CheckCircle2 className="w-4 h-4 text-pink-500" />}
                </div>
                <span className={`text-sm text-left ${checkedTips.has(index) ? 'text-white line-through' : 'text-white/90'}`}>
                  {tip}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Affirmation */}
        <motion.div
          className="bg-white/20 rounded-2xl p-4 text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-white/70 text-xs mb-1">Say this to yourself:</p>
          <p className="text-white font-serif text-lg italic">"{item.affirmation}"</p>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const SelfCareSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelfCareItem | null>(null);

  const filteredItems = selectedCategory
    ? selfCareItems.filter(item => item.category === selectedCategory)
    : selfCareItems;

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
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧖‍♀️
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Self-Care Guide
        </h3>
        <p className="text-white/60 text-sm">
          You deserve all the pampering, Puntuu! 💕
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <motion.button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
            !selectedCategory
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
              : 'bg-white/10 text-white/70'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {Object.entries(categoryInfo).map(([key, info]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              selectedCategory === key
                ? `bg-gradient-to-r ${info.color} text-white`
                : 'bg-white/10 text-white/70'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span>{info.emoji}</span>
            <span>{info.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map((item, index) => {
          const category = categoryInfo[item.category];
          return (
            <motion.button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${category.color} text-left overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <motion.span
                className="text-3xl block mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
              >
                {item.emoji}
              </motion.span>
              <p className="text-white font-medium text-sm">{item.title}</p>
              <p className="text-white/70 text-xs">{item.description}</p>
              
              <Sparkles className="absolute bottom-2 right-2 w-4 h-4 text-white/30" />
            </motion.button>
          );
        })}
      </div>

      {/* Daily Routine Suggestion */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-2xl p-4 border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sun className="w-4 h-4 text-amber-400" />
          <p className="text-white/80 text-sm font-medium">Morning Routine</p>
        </div>
        <p className="text-white/60 text-xs">
          Cleanse → Tone → Serum → Moisturize → Sunscreen ☀️
        </p>
        <div className="flex items-center gap-2 mt-3 mb-3">
          <Moon className="w-4 h-4 text-indigo-400" />
          <p className="text-white/80 text-sm font-medium">Night Routine</p>
        </div>
        <p className="text-white/60 text-xs">
          Remove makeup → Cleanse → Treat → Eye cream → Night cream 🌙
        </p>
      </motion.div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Taking care of yourself isn't selfish - it's necessary. You deserve to glow, Puntuu!" 💕
        </p>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
