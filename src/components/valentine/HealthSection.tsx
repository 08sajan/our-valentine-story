import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Search, ChevronRight, AlertCircle, Sparkles, Activity, Apple, Moon, Droplets, Pill } from 'lucide-react';
import { createPortal } from 'react-dom';

interface HealthTopic {
  id: string;
  title: string;
  emoji: string;
  category: 'menstrual' | 'skin' | 'mental' | 'nutrition' | 'fitness' | 'sleep' | 'common' | 'reproductive';
  symptoms: string[];
  causes: string[];
  prevention: string[];
  homeRemedies: string[];
  whenToSeeDoctor: string[];
  foods: { good: string[]; avoid: string[] };
}

const healthTopics: HealthTopic[] = [
  // Menstrual Health
  {
    id: 'period-cramps',
    title: 'Period Cramps',
    emoji: '🌸',
    category: 'menstrual',
    symptoms: ['Lower abdominal pain', 'Back pain', 'Thigh pain', 'Nausea', 'Headache'],
    causes: ['Prostaglandins causing uterine contractions', 'Endometriosis', 'Fibroids', 'Adenomyosis'],
    prevention: ['Regular exercise', 'Maintain healthy weight', 'Reduce stress', 'Avoid caffeine before period'],
    homeRemedies: ['Heat pad on abdomen', 'Gentle massage', 'Chamomile tea', 'Ginger tea', 'Light yoga stretches'],
    whenToSeeDoctor: ['Severe pain affecting daily life', 'Pain not relieved by OTC medication', 'Heavy bleeding with clots', 'Fever during period'],
    foods: { good: ['Bananas', 'Dark chocolate', 'Spinach', 'Salmon', 'Ginger'], avoid: ['Caffeine', 'Salty foods', 'Alcohol', 'Fatty foods'] }
  },
  {
    id: 'pms',
    title: 'PMS Symptoms',
    emoji: '😔',
    category: 'menstrual',
    symptoms: ['Mood swings', 'Bloating', 'Breast tenderness', 'Fatigue', 'Irritability', 'Food cravings'],
    causes: ['Hormonal fluctuations', 'Serotonin changes', 'Low magnesium', 'Stress'],
    prevention: ['Regular exercise', 'Balanced diet', 'Adequate sleep', 'Stress management'],
    homeRemedies: ['Calcium supplements', 'Magnesium-rich foods', 'Vitamin B6', 'Exercise', 'Relaxation techniques'],
    whenToSeeDoctor: ['Symptoms severely affect work/relationships', 'Depression or anxiety', 'Physical symptoms unbearable'],
    foods: { good: ['Whole grains', 'Leafy greens', 'Nuts', 'Eggs', 'Yogurt'], avoid: ['Sugar', 'Alcohol', 'Caffeine', 'Processed foods'] }
  },
  {
    id: 'irregular-periods',
    title: 'Irregular Periods',
    emoji: '📅',
    category: 'menstrual',
    symptoms: ['Cycles shorter than 21 days', 'Cycles longer than 35 days', 'Missed periods', 'Heavy or light flow changes'],
    causes: ['PCOS', 'Thyroid disorders', 'Stress', 'Weight changes', 'Hormonal imbalance'],
    prevention: ['Maintain healthy weight', 'Regular exercise', 'Stress management', 'Balanced nutrition'],
    homeRemedies: ['Turmeric milk', 'Cinnamon tea', 'Papaya', 'Aloe vera juice', 'Regular sleep schedule'],
    whenToSeeDoctor: ['No period for 3+ months', 'Sudden changes in cycle', 'Excessive bleeding', 'Painful periods'],
    foods: { good: ['Turmeric', 'Cinnamon', 'Pineapple', 'Papaya', 'Flaxseeds'], avoid: ['Processed foods', 'Excess sugar', 'Trans fats'] }
  },
  // Skin Health
  {
    id: 'acne',
    title: 'Acne & Breakouts',
    emoji: '✨',
    category: 'skin',
    symptoms: ['Pimples', 'Blackheads', 'Whiteheads', 'Cystic bumps', 'Oily skin'],
    causes: ['Hormonal changes', 'Excess sebum', 'Bacteria', 'Diet', 'Stress'],
    prevention: ['Gentle cleansing twice daily', 'Non-comedogenic products', 'Regular pillowcase changes', 'Don\'t touch face'],
    homeRemedies: ['Tea tree oil', 'Honey mask', 'Aloe vera gel', 'Green tea toner', 'Ice cubes for inflammation'],
    whenToSeeDoctor: ['Severe cystic acne', 'Scarring', 'No improvement after 2 months', 'Painful nodules'],
    foods: { good: ['Berries', 'Tomatoes', 'Green tea', 'Fatty fish', 'Nuts'], avoid: ['Dairy', 'High glycemic foods', 'Fried foods', 'Chocolate (sometimes)'] }
  },
  {
    id: 'dry-skin',
    title: 'Dry Skin',
    emoji: '🧴',
    category: 'skin',
    symptoms: ['Flaking', 'Itching', 'Rough texture', 'Tight feeling', 'Cracking'],
    causes: ['Cold weather', 'Low humidity', 'Hot showers', 'Harsh soaps', 'Dehydration'],
    prevention: ['Moisturize immediately after bathing', 'Use gentle cleansers', 'Humidifier in room', 'Drink plenty of water'],
    homeRemedies: ['Coconut oil', 'Olive oil', 'Honey mask', 'Oatmeal bath', 'Aloe vera'],
    whenToSeeDoctor: ['Severe cracking with bleeding', 'Signs of infection', 'No improvement with home care'],
    foods: { good: ['Avocados', 'Fatty fish', 'Sweet potatoes', 'Walnuts', 'Cucumbers'], avoid: ['Alcohol', 'Caffeine', 'Salty foods'] }
  },
  // Mental Health
  {
    id: 'anxiety',
    title: 'Anxiety',
    emoji: '🦋',
    category: 'mental',
    symptoms: ['Excessive worry', 'Restlessness', 'Rapid heartbeat', 'Difficulty concentrating', 'Sleep problems', 'Muscle tension'],
    causes: ['Stress', 'Trauma', 'Genetics', 'Medical conditions', 'Hormonal changes'],
    prevention: ['Regular exercise', 'Adequate sleep', 'Limiting caffeine', 'Mindfulness practice', 'Social connections'],
    homeRemedies: ['Deep breathing (4-7-8 technique)', 'Grounding exercises', 'Lavender aromatherapy', 'Chamomile tea', 'Journaling'],
    whenToSeeDoctor: ['Anxiety affecting daily functioning', 'Panic attacks', 'Physical symptoms worsening', 'Thoughts of self-harm'],
    foods: { good: ['Dark chocolate', 'Turmeric', 'Yogurt', 'Green tea', 'Salmon'], avoid: ['Caffeine', 'Alcohol', 'Sugar', 'Processed foods'] }
  },
  {
    id: 'stress',
    title: 'Stress Management',
    emoji: '🧘',
    category: 'mental',
    symptoms: ['Headaches', 'Muscle tension', 'Fatigue', 'Sleep issues', 'Mood changes', 'Digestive problems'],
    causes: ['Work pressure', 'Relationship issues', 'Financial concerns', 'Health worries', 'Life changes'],
    prevention: ['Time management', 'Setting boundaries', 'Regular breaks', 'Physical activity', 'Support network'],
    homeRemedies: ['Meditation', 'Yoga', 'Walking in nature', 'Warm bath', 'Listening to music', 'Creative hobbies'],
    whenToSeeDoctor: ['Unable to cope daily', 'Turning to unhealthy habits', 'Physical health declining', 'Persistent depression'],
    foods: { good: ['Oatmeal', 'Oranges', 'Spinach', 'Fatty fish', 'Nuts'], avoid: ['Caffeine excess', 'Alcohol', 'Sugary snacks'] }
  },
  // Common Ailments
  {
    id: 'headache',
    title: 'Headaches & Migraines',
    emoji: '🤕',
    category: 'common',
    symptoms: ['Throbbing pain', 'Sensitivity to light/sound', 'Nausea', 'Visual disturbances', 'Neck stiffness'],
    causes: ['Tension', 'Dehydration', 'Hormonal changes', 'Sleep deprivation', 'Screen time', 'Food triggers'],
    prevention: ['Stay hydrated', 'Regular sleep schedule', 'Limit screen time', 'Manage stress', 'Regular meals'],
    homeRemedies: ['Cold compress on forehead', 'Peppermint oil on temples', 'Ginger tea', 'Rest in dark room', 'Caffeine (small amount)'],
    whenToSeeDoctor: ['Worst headache of life', 'Fever with stiff neck', 'Vision changes', 'Confusion', 'More than 15 headache days/month'],
    foods: { good: ['Water', 'Magnesium-rich foods', 'Ginger', 'Leafy greens'], avoid: ['Aged cheese', 'Wine', 'Processed meats', 'MSG'] }
  },
  {
    id: 'cold-flu',
    title: 'Cold & Flu',
    emoji: '🤧',
    category: 'common',
    symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Body aches', 'Fever', 'Fatigue'],
    causes: ['Viral infection', 'Weakened immunity', 'Cold exposure', 'Close contact with sick people'],
    prevention: ['Hand washing', 'Avoid touching face', 'Get enough sleep', 'Vitamin C', 'Stay away from sick people'],
    homeRemedies: ['Honey and lemon tea', 'Chicken soup', 'Steam inhalation', 'Salt water gargle', 'Rest and fluids', 'Turmeric milk'],
    whenToSeeDoctor: ['High fever (>103°F)', 'Difficulty breathing', 'Symptoms lasting >10 days', 'Chest pain'],
    foods: { good: ['Chicken soup', 'Citrus fruits', 'Garlic', 'Ginger', 'Honey'], avoid: ['Dairy (increases mucus)', 'Alcohol', 'Sugary foods'] }
  },
  {
    id: 'digestive',
    title: 'Digestive Issues',
    emoji: '🍵',
    category: 'common',
    symptoms: ['Bloating', 'Gas', 'Constipation', 'Diarrhea', 'Stomach pain', 'Nausea'],
    causes: ['Poor diet', 'Stress', 'Food intolerances', 'Lack of fiber', 'Dehydration'],
    prevention: ['Eat slowly', 'Fiber-rich diet', 'Stay hydrated', 'Regular exercise', 'Probiotics'],
    homeRemedies: ['Ginger tea', 'Peppermint tea', 'Fennel seeds', 'Apple cider vinegar', 'Warm water with lemon'],
    whenToSeeDoctor: ['Blood in stool', 'Unexplained weight loss', 'Severe pain', 'Persistent symptoms >2 weeks'],
    foods: { good: ['Yogurt', 'Bananas', 'Ginger', 'Papaya', 'Whole grains'], avoid: ['Fried foods', 'Carbonated drinks', 'Artificial sweeteners'] }
  },
  // Sleep
  {
    id: 'insomnia',
    title: 'Sleep Problems',
    emoji: '😴',
    category: 'sleep',
    symptoms: ['Difficulty falling asleep', 'Waking up frequently', 'Early waking', 'Daytime fatigue', 'Irritability'],
    causes: ['Stress', 'Screen time before bed', 'Caffeine', 'Irregular schedule', 'Anxiety'],
    prevention: ['Consistent sleep schedule', 'No screens 1 hour before bed', 'Cool, dark room', 'No caffeine after 2 PM'],
    homeRemedies: ['Warm milk', 'Lavender oil', 'Chamomile tea', 'Meditation', 'Reading', 'White noise'],
    whenToSeeDoctor: ['Insomnia lasting >3 weeks', 'Affecting daily life', 'Snoring with breathing pauses', 'Restless legs'],
    foods: { good: ['Almonds', 'Warm milk', 'Kiwi', 'Tart cherries', 'Chamomile tea'], avoid: ['Caffeine', 'Alcohol', 'Heavy meals', 'Spicy food at night'] }
  },
  // Reproductive Health
  {
    id: 'uti',
    title: 'UTI (Urinary Tract Infection)',
    emoji: '🚿',
    category: 'reproductive',
    symptoms: ['Burning during urination', 'Frequent urge to urinate', 'Cloudy urine', 'Pelvic pain', 'Blood in urine'],
    causes: ['Bacteria entering urethra', 'Holding urine too long', 'Dehydration', 'Sexual activity'],
    prevention: ['Drink plenty of water', 'Urinate after intercourse', 'Wipe front to back', 'Avoid irritating products', 'Cotton underwear'],
    homeRemedies: ['Cranberry juice (unsweetened)', 'Lots of water', 'Vitamin C', 'Probiotics', 'Heat pad on bladder'],
    whenToSeeDoctor: ['Fever', 'Back pain', 'Blood in urine', 'Symptoms not improving in 2 days', 'Recurrent UTIs'],
    foods: { good: ['Cranberries', 'Blueberries', 'Yogurt', 'Garlic', 'Lots of water'], avoid: ['Caffeine', 'Alcohol', 'Spicy foods', 'Artificial sweeteners'] }
  },
  {
    id: 'vaginal-health',
    title: 'Vaginal Health',
    emoji: '🌺',
    category: 'reproductive',
    symptoms: ['Unusual discharge', 'Itching', 'Odor', 'Irritation', 'Discomfort'],
    causes: ['pH imbalance', 'Yeast overgrowth', 'Bacterial infection', 'Hormonal changes', 'Irritating products'],
    prevention: ['Cotton underwear', 'Avoid douching', 'Gentle unscented soap externally only', 'Probiotics', 'Breathable clothing'],
    homeRemedies: ['Plain yogurt (eating)', 'Apple cider vinegar bath', 'Tea tree oil diluted', 'Coconut oil', 'Probiotics'],
    whenToSeeDoctor: ['Unusual colored discharge', 'Strong odor', 'Persistent itching', 'Pain during sex', 'Sores or bumps'],
    foods: { good: ['Yogurt with probiotics', 'Cranberries', 'Garlic', 'Leafy greens'], avoid: ['Sugar excess', 'Alcohol', 'Refined carbs'] }
  },
  // Hair
  {
    id: 'hair-loss',
    title: 'Hair Loss & Thinning',
    emoji: '💇',
    category: 'skin',
    symptoms: ['Excessive shedding', 'Thinning on top', 'Widening part', 'Bald patches', 'Slow regrowth'],
    causes: ['Hormonal changes', 'Stress', 'Nutritional deficiency', 'PCOS', 'Thyroid issues', 'Tight hairstyles'],
    prevention: ['Balanced diet with iron and protein', 'Gentle hair care', 'Avoid heat styling', 'Manage stress'],
    homeRemedies: ['Coconut oil massage', 'Onion juice', 'Egg mask', 'Aloe vera', 'Green tea rinse'],
    whenToSeeDoctor: ['Sudden hair loss', 'Bald patches', 'Accompanied by other symptoms', 'No improvement after lifestyle changes'],
    foods: { good: ['Eggs', 'Spinach', 'Salmon', 'Nuts', 'Sweet potatoes'], avoid: ['Sugar', 'Processed foods', 'Excess vitamin A'] }
  },
  // Fitness
  {
    id: 'muscle-pain',
    title: 'Muscle Pain & Soreness',
    emoji: '💪',
    category: 'fitness',
    symptoms: ['Stiffness', 'Aching muscles', 'Limited mobility', 'Tenderness', 'Fatigue'],
    causes: ['Exercise', 'Poor posture', 'Stress tension', 'Dehydration', 'Lack of stretching'],
    prevention: ['Warm up before exercise', 'Stretch after', 'Stay hydrated', 'Proper form', 'Gradual increase in activity'],
    homeRemedies: ['Epsom salt bath', 'Ice for acute pain', 'Heat for chronic pain', 'Gentle stretching', 'Massage', 'Turmeric'],
    whenToSeeDoctor: ['Pain after injury', 'Swelling', 'Weakness', 'Pain lasting >2 weeks', 'Fever with muscle pain'],
    foods: { good: ['Tart cherry juice', 'Ginger', 'Fatty fish', 'Turmeric', 'Leafy greens'], avoid: ['Alcohol', 'Processed foods', 'Sugar'] }
  },
  {
    id: 'fatigue',
    title: 'Chronic Fatigue',
    emoji: '😫',
    category: 'common',
    symptoms: ['Constant tiredness', 'Lack of energy', 'Brain fog', 'Muscle weakness', 'Poor concentration'],
    causes: ['Poor sleep', 'Anemia', 'Thyroid issues', 'Depression', 'Poor nutrition', 'Dehydration'],
    prevention: ['7-9 hours sleep', 'Regular exercise', 'Balanced diet', 'Stress management', 'Stay hydrated'],
    homeRemedies: ['Iron-rich foods', 'B vitamins', 'Reduce caffeine', 'Power naps (20 min)', 'Morning sunlight'],
    whenToSeeDoctor: ['Fatigue lasting >2 weeks', 'Unexplained weight changes', 'Depression', 'Other symptoms present'],
    foods: { good: ['Spinach', 'Eggs', 'Nuts', 'Bananas', 'Whole grains'], avoid: ['Excess sugar', 'Processed foods', 'Alcohol'] }
  },
];

const categoryInfo = {
  menstrual: { label: 'Menstrual Health', color: 'from-pink-400 to-rose-500', icon: '🌸' },
  skin: { label: 'Skin & Hair', color: 'from-purple-400 to-violet-500', icon: '✨' },
  mental: { label: 'Mental Wellness', color: 'from-indigo-400 to-blue-500', icon: '🧘' },
  nutrition: { label: 'Nutrition', color: 'from-green-400 to-emerald-500', icon: '🥗' },
  fitness: { label: 'Fitness', color: 'from-orange-400 to-amber-500', icon: '💪' },
  sleep: { label: 'Sleep', color: 'from-indigo-400 to-purple-500', icon: '😴' },
  common: { label: 'Common Issues', color: 'from-blue-400 to-cyan-500', icon: '🏥' },
  reproductive: { label: 'Reproductive Health', color: 'from-rose-400 to-pink-500', icon: '🌺' }
};

const HealthModal = ({ topic, onClose }: { topic: HealthTopic; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'symptoms' | 'remedies' | 'foods' | 'doctor'>('symptoms');
  const catInfo = categoryInfo[topic.category];

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
        className="relative max-w-lg w-full max-h-[85vh] overflow-hidden rounded-3xl"
        onClick={e => e.stopPropagation()}
        style={{ background: 'linear-gradient(145deg, #1a1a2e, #16213e)' }}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${catInfo.color} p-6`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="text-center">
            <span className="text-4xl mb-2 block">{topic.emoji}</span>
            <h3 className="text-xl font-bold text-white">{topic.title}</h3>
            <span className="text-white/70 text-sm">{catInfo.label}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-2 bg-black/30">
          {[
            { id: 'symptoms', label: '🩺 Symptoms' },
            { id: 'remedies', label: '🏠 Remedies' },
            { id: 'foods', label: '🍎 Foods' },
            { id: 'doctor', label: '⚠️ When to See Dr' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${catInfo.color} text-white`
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {activeTab === 'symptoms' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-400" /> Symptoms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topic.symptoms.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-rose-500/20 text-rose-200 rounded-full text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">📋 Causes</h4>
                <ul className="space-y-1">
                  {topic.causes.map((c, i) => (
                    <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-pink-400">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">🛡️ Prevention</h4>
                <ul className="space-y-1">
                  {topic.prevention.map((p, i) => (
                    <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-green-400">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'remedies' && (
            <div>
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4 text-purple-400" /> Home Remedies
              </h4>
              <div className="space-y-2">
                {topic.homeRemedies.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-3 bg-white/5 rounded-xl flex items-center gap-3"
                  >
                    <span className="text-lg">💊</span>
                    <span className="text-white/80 text-sm">{r}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'foods' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Apple className="w-4 h-4 text-green-400" /> Foods to Eat
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topic.foods.good.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-xs">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400" /> Foods to Avoid
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topic.foods.avoid.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-xs">
                      ✗ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'doctor' && (
            <div>
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h4 className="text-red-300 font-medium">When to See a Doctor</h4>
                </div>
                <p className="text-white/60 text-xs mb-3">
                  Please consult a healthcare professional if you experience:
                </p>
              </div>
              <ul className="space-y-2">
                {topic.whenToSeeDoctor.map((w, i) => (
                  <li key={i} className="text-white/80 text-sm flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                    <span className="text-red-400">⚠️</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/30 border-t border-white/10">
          <p className="text-white/40 text-xs text-center italic">
            💕 This is for educational purposes. Always consult a doctor for medical advice, my love!
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const HealthSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<HealthTopic | null>(null);

  const filteredTopics = healthTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-6 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🏥 Health Guide for You
        </motion.h2>
        <p className="text-white/70 text-sm">
          Women's health tips, remedies & care 💕
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search symptoms or conditions..."
          className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
          All Topics
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

      {/* Topics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredTopics.map((topic, index) => {
          const catInfo = categoryInfo[topic.category];
          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setSelectedTopic(topic)}
              className={`p-4 rounded-2xl bg-gradient-to-br ${catInfo.color} text-left`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mb-2 block">{topic.emoji}</span>
              <h4 className="text-white font-medium text-sm mb-1">{topic.title}</h4>
              <p className="text-white/60 text-xs">{catInfo.label}</p>
              <ChevronRight className="w-4 h-4 text-white/50 absolute bottom-3 right-3" />
            </motion.button>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-8">
          <span className="text-4xl mb-2 block">🔍</span>
          <p className="text-white/60">No topics found. Try a different search!</p>
        </div>
      )}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 bg-pink-500/10 rounded-2xl border border-pink-500/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-pink-400" />
          <span className="text-pink-300 text-sm font-medium">With Love</span>
        </div>
        <p className="text-white/60 text-xs">
          I made this section just for you, Puntuu! Please always consult a doctor for serious concerns. 
          Your health is my priority 💕
        </p>
      </motion.div>

      <AnimatePresence>
        {selectedTopic && (
          <HealthModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
