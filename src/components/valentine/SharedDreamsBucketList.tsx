import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, Heart, Plane, Coffee, Home, Star, Music, Camera, Utensils } from 'lucide-react';

interface BucketItem {
  id: string;
  title: string;
  description: string;
  category: 'adventure' | 'simple' | 'milestone' | 'romance';
  icon: React.ReactNode;
  completed: boolean;
}

const initialBucketList: BucketItem[] = [
  // Adventures
  { id: '1', title: 'Visit Paris Together', description: 'Kiss under the Eiffel Tower at midnight', category: 'adventure', icon: <Plane className="w-5 h-5" />, completed: false },
  { id: '2', title: 'Beach Vacation', description: 'Walk hand in hand on white sand beaches', category: 'adventure', icon: <MapPin className="w-5 h-5" />, completed: false },
  { id: '3', title: 'Northern Lights', description: 'Watch the aurora borealis wrapped in a blanket together', category: 'adventure', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '4', title: 'Road Trip Adventure', description: 'Drive cross country with our favorite playlist', category: 'adventure', icon: <Music className="w-5 h-5" />, completed: false },
  { id: '5', title: '✨ Disney World Magic', description: 'Hold hands at the Magic Kingdom, watch fireworks over Cinderella Castle', category: 'adventure', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '6', title: 'Tokyo Love Story', description: 'Get lost in cherry blossoms and neon lights together', category: 'adventure', icon: <Plane className="w-5 h-5" />, completed: false },
  { id: '7', title: 'Maldives Overwater Villa', description: 'Wake up to turquoise waters and breakfast in bed', category: 'adventure', icon: <MapPin className="w-5 h-5" />, completed: false },
  { id: '8', title: 'Safari Adventure', description: 'Watch lions at sunrise, fall asleep under African stars', category: 'adventure', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '31', title: 'Hot Air Balloon Ride', description: 'Float above the clouds holding your hand at sunrise', category: 'adventure', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '32', title: 'Scuba Diving Together', description: 'Explore underwater worlds and find colorful fish', category: 'adventure', icon: <MapPin className="w-5 h-5" />, completed: false },
  { id: '33', title: 'Switzerland Alps', description: 'Ski down mountains and warm up with hot chocolate', category: 'adventure', icon: <Plane className="w-5 h-5" />, completed: false },
  { id: '34', title: 'Bali Temple Visit', description: 'Meditate together at ancient temples at sunrise', category: 'adventure', icon: <Star className="w-5 h-5" />, completed: false },
  
  // Simple Pleasures
  { id: '9', title: 'Breakfast in Bed', description: 'I make you pancakes shaped like hearts', category: 'simple', icon: <Coffee className="w-5 h-5" />, completed: false },
  { id: '10', title: 'Picnic Under Stars', description: 'Lay on a blanket and count shooting stars', category: 'simple', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '11', title: 'Cook a Fancy Dinner', description: 'Try that complicated recipe together (and probably fail adorably)', category: 'simple', icon: <Utensils className="w-5 h-5" />, completed: false },
  { id: '12', title: 'Photo Booth Date', description: 'Fill an album with our silly faces', category: 'simple', icon: <Camera className="w-5 h-5" />, completed: false },
  { id: '13', title: 'Late Night Ice Cream', description: 'Sneak out at midnight for ice cream runs', category: 'simple', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '14', title: 'Dance in the Rain', description: 'Get completely soaked while slow dancing', category: 'simple', icon: <Music className="w-5 h-5" />, completed: false },
  { id: '15', title: 'Build a Blanket Fort', description: 'Movie marathon inside our cozy fortress', category: 'simple', icon: <Home className="w-5 h-5" />, completed: false },
  { id: '16', title: 'Spa Day at Home', description: 'Face masks, candles, and pampering each other', category: 'simple', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '35', title: 'Learn to Cook Momos', description: 'Make dumplings together, messy but fun', category: 'simple', icon: <Utensils className="w-5 h-5" />, completed: false },
  { id: '36', title: 'Sunset Watching Ritual', description: 'Never miss a sunset together, wherever we are', category: 'simple', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '37', title: 'Plant a Tree Together', description: 'Watch it grow as our love grows', category: 'simple', icon: <Home className="w-5 h-5" />, completed: false },
  { id: '38', title: 'Karaoke Night', description: 'Sing our hearts out even if we sound terrible', category: 'simple', icon: <Music className="w-5 h-5" />, completed: false },
  
  // Milestones
  { id: '17', title: 'Our First Home', description: 'Build our quiet sanctuary filled with love', category: 'milestone', icon: <Home className="w-5 h-5" />, completed: false },
  { id: '18', title: 'Adopt a Pet', description: 'Get a furry baby to spoil together', category: 'milestone', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '19', title: 'Plant a Garden', description: 'Watch our love grow like our flowers', category: 'milestone', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '20', title: 'Anniversary Traditions', description: 'Create rituals that are only ours', category: 'milestone', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '21', title: '👶 Start Our Family', description: 'Bring beautiful little versions of us into the world', category: 'milestone', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '22', title: 'Grow Old Together', description: 'Hold hands on the porch swing at 80, still madly in love', category: 'milestone', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '23', title: 'Renew Our Vows', description: 'Promise forever to each other again and again', category: 'milestone', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '24', title: 'Buy Matching Rings', description: 'Symbols of our unbreakable bond', category: 'milestone', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '39', title: 'Build a Dream House', description: 'Design every room together from scratch', category: 'milestone', icon: <Home className="w-5 h-5" />, completed: false },
  { id: '40', title: 'Start a Business Together', description: 'Build something amazing as partners', category: 'milestone', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '41', title: 'Have Three Kids', description: 'Fill our home with love, laughter and little footsteps', category: 'milestone', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '42', title: 'Celebrate 50 Years', description: 'Golden anniversary with all our grandchildren', category: 'milestone', icon: <Star className="w-5 h-5" />, completed: false },
  
  // Romance
  { id: '25', title: 'Surprise Love Letters', description: 'Hide notes for you to find randomly', category: 'romance', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '26', title: 'Recreate First Date', description: 'Relive the magic of our beginning', category: 'romance', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '27', title: 'Couple Photoshoot', description: 'Professional photos to hang on our walls', category: 'romance', icon: <Camera className="w-5 h-5" />, completed: false },
  { id: '28', title: 'Watch Every Sunset', description: 'Make it a tradition to never miss one together', category: 'romance', icon: <Star className="w-5 h-5" />, completed: false },
  { id: '29', title: 'Write Our Love Story', description: 'Document every chapter from the beginning', category: 'romance', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '30', title: 'Slow Dance at Home', description: 'No music needed, just our heartbeats', category: 'romance', icon: <Music className="w-5 h-5" />, completed: false },
  { id: '43', title: 'Candlelit Bath Together', description: 'Rose petals, bubbles, and pure romance', category: 'romance', icon: <Heart className="w-5 h-5" />, completed: false },
  { id: '44', title: 'Anniversary Scrapbook', description: 'Add memories every year forever', category: 'romance', icon: <Camera className="w-5 h-5" />, completed: false },
  { id: '45', title: 'Private Beach Dinner', description: 'Just us, the waves, and a candlelit table', category: 'romance', icon: <Utensils className="w-5 h-5" />, completed: false },
  { id: '46', title: 'Match Tattoos', description: 'Permanent symbols of our forever love', category: 'romance', icon: <Heart className="w-5 h-5" />, completed: false },
];

const categoryStyles = {
  adventure: { gradient: 'from-blue-400 to-cyan-500', emoji: '✈️', label: 'Adventures' },
  simple: { gradient: 'from-green-400 to-emerald-500', emoji: '☕', label: 'Simple Pleasures' },
  milestone: { gradient: 'from-purple-400 to-pink-500', emoji: '🏠', label: 'Life Milestones' },
  romance: { gradient: 'from-rose-400 to-red-500', emoji: '💕', label: 'Romance' }
};

export const SharedDreamsBucketList = () => {
  const [bucketList, setBucketList] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem('shared-dreams-bucket-list');
    return saved ? JSON.parse(saved) : initialBucketList;
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem('shared-dreams-bucket-list', JSON.stringify(bucketList));
  }, [bucketList]);

  const toggleItem = (id: string) => {
    setBucketList(prev => prev.map(item => {
      if (item.id === id) {
        if (!item.completed) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  const filteredList = selectedCategory === 'all' 
    ? bucketList 
    : bucketList.filter(item => item.category === selectedCategory);

  const completedCount = bucketList.filter(item => item.completed).length;
  const progress = (completedCount / bucketList.length) * 100;

  return (
    <div className="py-8 px-4">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  x: window.innerWidth / 2, 
                  y: window.innerHeight / 2,
                  scale: 0,
                  opacity: 1
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1.5, 1],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.02 }}
              >
                {['✨', '💕', '🌟', '💖', '⭐', '🎉', '💫'][Math.floor(Math.random() * 7)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌟
          </motion.span>
          <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent">
            Our Shared Dreams
          </span>
          <motion.span
            animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌟
          </motion.span>
        </motion.h2>
        <motion.p 
          className="text-white/70 text-sm mb-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Everything I want to experience with you 💕
        </motion.p>

        {/* Progress Bar */}
        <div className="max-w-xs mx-auto mb-4">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span>Dreams Completed</span>
            <motion.span
              key={completedCount}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-pink-300 font-medium"
            >
              {completedCount}/{bucketList.length}
            </motion.span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-white text-gray-800'
              : 'bg-white/20 text-white'
          }`}
        >
          All Dreams ✨
        </motion.button>
        {Object.entries(categoryStyles).map(([key, style]) => (
          <motion.button
            key={key}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === key
                ? `bg-gradient-to-r ${style.gradient} text-white`
                : 'bg-white/20 text-white'
            }`}
          >
            {style.emoji} {style.label}
          </motion.button>
        ))}
      </div>

      {/* Bucket List Items */}
      <div className="space-y-3">
        {filteredList.map((item, index) => {
          const style = categoryStyles[item.category];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleItem(item.id)}
              className={`relative p-4 rounded-2xl cursor-pointer transition-all overflow-hidden ${
                item.completed 
                  ? 'bg-white/10 border-2 border-green-400/50' 
                  : 'bg-white/10 border-2 border-white/20'
              }`}
            >
              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-0`}
                whileHover={{ opacity: 0.1 }}
              />

              <div className="relative flex items-start gap-3">
                {/* Checkbox */}
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.completed 
                      ? `bg-gradient-to-r ${style.gradient}` 
                      : 'bg-white/20 border-2 border-white/40'
                  }`}
                  whileTap={{ scale: 0.8 }}
                >
                  {item.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`p-1 rounded-lg bg-gradient-to-r ${style.gradient}`}>
                      {item.icon}
                    </span>
                    <h3 className={`font-bold text-white ${item.completed ? 'line-through opacity-60' : ''}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={`text-sm text-white/70 ${item.completed ? 'line-through opacity-60' : ''}`}>
                    {item.description}
                  </p>
                </div>

                {/* Category badge */}
                <span className="text-lg">{style.emoji}</span>
              </div>

              {/* Completed overlay effect */}
              {item.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 text-2xl"
                >
                  ✅
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-white/60 text-sm italic">
          "Every dream is better because I'm dreaming it with you" 💕
        </p>
      </motion.div>
    </div>
  );
};
