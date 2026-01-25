import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, X, Search, Heart, Leaf, AlertTriangle, Sparkles, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: 'superfoods' | 'proteins' | 'grains' | 'fruits' | 'vegetables' | 'dairy' | 'nuts' | 'avoid';
  benefits: string[];
  nutrients: string[];
  bestFor: string[];
  howToEat: string;
  caution?: string;
  whenToEat?: string;
}

const foodItems: FoodItem[] = [
  // Superfoods for Women
  {
    id: 'avocado',
    name: 'Avocado',
    emoji: '🥑',
    category: 'superfoods',
    benefits: ['Glowing skin', 'Healthy fats for hormones', 'Hair growth', 'Heart health'],
    nutrients: ['Vitamin E', 'Potassium', 'Folate', 'Healthy fats'],
    bestFor: ['Skin health', 'Hormonal balance', 'Brain function'],
    howToEat: 'Toast with eggs, smoothies, salads, or as guacamole',
    whenToEat: 'Morning or lunch for sustained energy'
  },
  {
    id: 'salmon',
    name: 'Salmon',
    emoji: '🐟',
    category: 'proteins',
    benefits: ['Reduces inflammation', 'Brain health', 'Glowing skin', 'Strong bones'],
    nutrients: ['Omega-3 fatty acids', 'Vitamin D', 'Protein', 'B vitamins'],
    bestFor: ['PMS relief', 'Depression', 'Skin elasticity', 'Heart health'],
    howToEat: 'Grilled, baked, or in sushi. Aim for 2 servings per week',
    whenToEat: 'Lunch or dinner'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    emoji: '🥬',
    category: 'vegetables',
    benefits: ['Prevents anemia', 'Strong bones', 'Healthy pregnancy', 'Energy boost'],
    nutrients: ['Iron', 'Folate', 'Vitamin K', 'Calcium', 'Magnesium'],
    bestFor: ['Period recovery', 'Pregnancy', 'Bone health', 'Fatigue'],
    howToEat: 'Salads, smoothies, sautéed, or in eggs. Pair with vitamin C for iron absorption',
    whenToEat: 'Any time, especially during/after period'
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    emoji: '🫐',
    category: 'fruits',
    benefits: ['Anti-aging', 'UTI prevention', 'Brain health', 'Reduces inflammation'],
    nutrients: ['Antioxidants', 'Vitamin C', 'Vitamin K', 'Fiber'],
    bestFor: ['Skin health', 'Memory', 'UTI prevention', 'Weight management'],
    howToEat: 'Fresh, in smoothies, yogurt parfaits, or oatmeal',
    whenToEat: 'Morning for antioxidant boost'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    emoji: '🥚',
    category: 'proteins',
    benefits: ['Complete protein', 'Brain health', 'Hair growth', 'Eye health'],
    nutrients: ['Protein', 'Choline', 'Vitamin D', 'B12', 'Biotin'],
    bestFor: ['Hair strength', 'Brain function', 'Muscle building', 'Weight loss'],
    howToEat: 'Boiled, scrambled, poached, or in omelets',
    whenToEat: 'Breakfast for sustained energy'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    emoji: '🥛',
    category: 'dairy',
    benefits: ['Gut health', 'Strong bones', 'Vaginal health', 'Weight management'],
    nutrients: ['Probiotics', 'Protein', 'Calcium', 'B12'],
    bestFor: ['Digestive health', 'Yeast prevention', 'Bone density', 'Satiety'],
    howToEat: 'Plain with fruits, in smoothies, or as a sour cream substitute',
    caution: 'Choose unsweetened varieties',
    whenToEat: 'Breakfast or as a snack'
  },
  {
    id: 'almonds',
    name: 'Almonds',
    emoji: '🥜',
    category: 'nuts',
    benefits: ['Healthy skin', 'Heart health', 'Blood sugar control', 'Brain function'],
    nutrients: ['Vitamin E', 'Magnesium', 'Protein', 'Healthy fats', 'Fiber'],
    bestFor: ['Skin glow', 'PMS symptoms', 'Energy', 'Weight management'],
    howToEat: 'Raw as snacks, in salads, or as almond butter',
    whenToEat: 'Mid-morning or afternoon snack'
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    emoji: '🌾',
    category: 'grains',
    benefits: ['Complete plant protein', 'Blood sugar control', 'Digestive health', 'Energy'],
    nutrients: ['Protein', 'Fiber', 'Iron', 'Magnesium', 'B vitamins'],
    bestFor: ['Vegetarians', 'Energy', 'Muscle building', 'Blood sugar'],
    howToEat: 'As rice substitute, in salads, or breakfast bowls',
    whenToEat: 'Lunch or dinner'
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    emoji: '🍠',
    category: 'vegetables',
    benefits: ['Skin health', 'Eye health', 'Blood sugar stability', 'Immune boost'],
    nutrients: ['Beta-carotene', 'Vitamin A', 'Fiber', 'Potassium'],
    bestFor: ['Glowing skin', 'Vision', 'Gut health', 'Immune system'],
    howToEat: 'Baked, mashed, or as fries',
    whenToEat: 'Lunch or dinner'
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    emoji: '🥦',
    category: 'vegetables',
    benefits: ['Cancer prevention', 'Detoxification', 'Bone health', 'Skin repair'],
    nutrients: ['Vitamin C', 'Vitamin K', 'Folate', 'Fiber', 'Sulforaphane'],
    bestFor: ['Hormonal balance', 'Liver detox', 'Immune system'],
    howToEat: 'Steamed (not overcooked), roasted, or in stir-fries',
    whenToEat: 'Lunch or dinner'
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate',
    emoji: '🍫',
    category: 'superfoods',
    benefits: ['Mood boost', 'Heart health', 'Brain function', 'Antioxidants'],
    nutrients: ['Magnesium', 'Iron', 'Antioxidants', 'Flavonoids'],
    bestFor: ['PMS cravings', 'Stress relief', 'Heart health'],
    howToEat: '1-2 squares of 70%+ dark chocolate',
    caution: 'Limit to 1 oz daily',
    whenToEat: 'Afternoon or when craving sweets'
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    emoji: '🌿',
    category: 'superfoods',
    benefits: ['Anti-inflammatory', 'Pain relief', 'Skin glow', 'Immune boost'],
    nutrients: ['Curcumin', 'Antioxidants', 'Vitamin C', 'Iron'],
    bestFor: ['Period cramps', 'Joint pain', 'Skin health', 'Immunity'],
    howToEat: 'Golden milk, curries, smoothies. Always with black pepper for absorption',
    whenToEat: 'Evening golden milk or in meals'
  },
  {
    id: 'banana',
    name: 'Banana',
    emoji: '🍌',
    category: 'fruits',
    benefits: ['Energy boost', 'Mood lift', 'Muscle cramps prevention', 'Digestive health'],
    nutrients: ['Potassium', 'Vitamin B6', 'Fiber', 'Magnesium'],
    bestFor: ['Pre-workout', 'PMS', 'Sleep', 'Muscle cramps'],
    howToEat: 'Fresh, in smoothies, or frozen as ice cream',
    whenToEat: 'Morning or pre-workout'
  },
  {
    id: 'lentils',
    name: 'Lentils (Dal)',
    emoji: '🍲',
    category: 'proteins',
    benefits: ['Iron boost', 'Protein source', 'Blood sugar control', 'Heart health'],
    nutrients: ['Protein', 'Iron', 'Folate', 'Fiber'],
    bestFor: ['Vegetarians', 'Anemia prevention', 'Pregnancy', 'Energy'],
    howToEat: 'As dal, in soups, salads, or curries',
    whenToEat: 'Lunch or dinner'
  },
  {
    id: 'flaxseeds',
    name: 'Flaxseeds',
    emoji: '🌰',
    category: 'superfoods',
    benefits: ['Hormonal balance', 'Skin health', 'Digestive health', 'Heart health'],
    nutrients: ['Omega-3', 'Lignans', 'Fiber', 'Protein'],
    bestFor: ['Menstrual health', 'Skin', 'Constipation', 'Cholesterol'],
    howToEat: 'Ground in smoothies, yogurt, or sprinkled on salads',
    caution: 'Always grind before eating for absorption',
    whenToEat: 'Morning'
  },
  // Foods to Avoid
  {
    id: 'processed-sugar',
    name: 'Processed Sugar',
    emoji: '🍬',
    category: 'avoid',
    benefits: [],
    nutrients: ['Empty calories'],
    bestFor: [],
    howToEat: 'AVOID - causes inflammation, acne, weight gain, and hormonal imbalance',
    caution: 'Causes blood sugar spikes, increases inflammation, worsens PMS and acne'
  },
  {
    id: 'trans-fats',
    name: 'Trans Fats & Fried Foods',
    emoji: '🍟',
    category: 'avoid',
    benefits: [],
    nutrients: ['Harmful fats'],
    bestFor: [],
    howToEat: 'AVOID - increases inflammation and heart disease risk',
    caution: 'Found in fast food, packaged snacks, fried foods. Disrupts hormones and skin health'
  },
  {
    id: 'excess-caffeine',
    name: 'Excess Caffeine',
    emoji: '☕',
    category: 'avoid',
    benefits: [],
    nutrients: [],
    bestFor: [],
    howToEat: 'LIMIT to 1-2 cups daily, avoid during period',
    caution: 'Can worsen anxiety, disrupt sleep, increase period cramps, and cause dehydration'
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    emoji: '🍷',
    category: 'avoid',
    benefits: [],
    nutrients: [],
    bestFor: [],
    howToEat: 'LIMIT or AVOID - disrupts hormones and sleep',
    caution: 'Dehydrates skin, disrupts sleep, worsens PMS, affects liver and hormonal balance'
  },
];

const categoryInfo = {
  superfoods: { label: 'Superfoods', color: 'from-emerald-400 to-green-500', icon: '⭐' },
  proteins: { label: 'Proteins', color: 'from-red-400 to-rose-500', icon: '💪' },
  grains: { label: 'Whole Grains', color: 'from-amber-400 to-orange-500', icon: '🌾' },
  fruits: { label: 'Fruits', color: 'from-pink-400 to-rose-500', icon: '🍎' },
  vegetables: { label: 'Vegetables', color: 'from-green-400 to-emerald-500', icon: '🥬' },
  dairy: { label: 'Dairy', color: 'from-blue-400 to-cyan-500', icon: '🥛' },
  nuts: { label: 'Nuts & Seeds', color: 'from-amber-500 to-yellow-600', icon: '🥜' },
  avoid: { label: 'Foods to Limit', color: 'from-red-500 to-rose-600', icon: '⚠️' }
};

const FoodModal = ({ food, onClose }: { food: FoodItem; onClose: () => void }) => {
  const catInfo = categoryInfo[food.category];
  const isAvoid = food.category === 'avoid';

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="relative max-w-md w-full max-h-[80vh] overflow-y-auto rounded-3xl"
        onClick={e => e.stopPropagation()}
        style={{ background: 'linear-gradient(145deg, #1a1a2e, #16213e)' }}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${catInfo.color} p-6 sticky top-0 z-10`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="text-center">
            <motion.span 
              className="text-5xl mb-2 block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {food.emoji}
            </motion.span>
            <h3 className="text-xl font-bold text-white">{food.name}</h3>
            <span className="text-white/70 text-sm">{catInfo.label}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {!isAvoid && (
            <>
              {/* Benefits */}
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> Benefits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {food.benefits.map((b, i) => (
                    <span key={i} className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-xs">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrients */}
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" /> Key Nutrients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {food.nutrients.map((n, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" /> Best For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {food.bestFor.map((b, i) => (
                    <span key={i} className="px-3 py-1 bg-pink-500/20 text-pink-200 rounded-full text-xs">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Eat */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">🍽️ How to Eat</h4>
                <p className="text-white/70 text-sm">{food.howToEat}</p>
              </div>

              {/* When to Eat */}
              {food.whenToEat && (
                <div className="bg-purple-500/10 rounded-xl p-4">
                  <h4 className="text-purple-300 font-medium mb-1">⏰ Best Time</h4>
                  <p className="text-white/70 text-sm">{food.whenToEat}</p>
                </div>
              )}
            </>
          )}

          {/* Caution */}
          {food.caution && (
            <div className={`rounded-xl p-4 ${isAvoid ? 'bg-red-500/20 border border-red-500/30' : 'bg-amber-500/10 border border-amber-500/20'}`}>
              <h4 className={`font-medium mb-1 flex items-center gap-2 ${isAvoid ? 'text-red-300' : 'text-amber-300'}`}>
                <AlertTriangle className="w-4 h-4" /> {isAvoid ? 'Why to Avoid' : 'Caution'}
              </h4>
              <p className="text-white/70 text-sm">{food.caution}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const FoodNutritionGuide = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const filteredFoods = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const goodFoods = filteredFoods.filter(f => f.category !== 'avoid');
  const avoidFoods = filteredFoods.filter(f => f.category === 'avoid');

  return (
    <div className="py-6 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🍎 Nutrition Guide
        </motion.h2>
        <p className="text-white/70 text-sm">
          What to eat for a healthy, glowing you 💕
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search foods or benefits..."
          className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-white text-gray-800 font-medium'
              : 'bg-white/10 text-white/70'
          }`}
        >
          All Foods
        </button>
        {Object.entries(categoryInfo).map(([key, info]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === key
                ? `bg-gradient-to-r ${info.color} text-white font-medium`
                : 'bg-white/10 text-white/70'
            }`}
          >
            {info.icon} {info.label}
          </button>
        ))}
      </div>

      {/* Good Foods */}
      {goodFoods.length > 0 && (
        <>
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" /> Foods to Eat
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {goodFoods.map((food, index) => {
              const catInfo = categoryInfo[food.category];
              return (
                <motion.button
                  key={food.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedFood(food)}
                  className={`p-3 rounded-2xl bg-gradient-to-br ${catInfo.color} text-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl block mb-1">{food.emoji}</span>
                  <p className="text-white text-xs font-medium">{food.name}</p>
                </motion.button>
              );
            })}
          </div>
        </>
      )}

      {/* Foods to Avoid */}
      {avoidFoods.length > 0 && (
        <>
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" /> Foods to Limit/Avoid
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {avoidFoods.map((food, index) => (
              <motion.button
                key={food.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedFood(food)}
                className="p-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-left flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl">{food.emoji}</span>
                <div>
                  <p className="text-white font-medium text-sm">{food.name}</p>
                  <p className="text-red-300 text-xs">Tap to learn why</p>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}

      {filteredFoods.length === 0 && (
        <div className="text-center py-8">
          <span className="text-4xl mb-2 block">🔍</span>
          <p className="text-white/60">No foods found. Try a different search!</p>
        </div>
      )}

      {/* Love Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/20"
      >
        <p className="text-white/80 text-sm text-center italic">
          "Eat well, glow well, my love! Your health makes me happy 💕"
        </p>
      </motion.div>

      <AnimatePresence>
        {selectedFood && (
          <FoodModal food={selectedFood} onClose={() => setSelectedFood(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
