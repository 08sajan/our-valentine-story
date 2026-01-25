import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Sparkles, Heart, RefreshCw } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'food' | 'movie' | 'adventure' | 'cozy' | 'romantic';
}

const activities: Activity[] = [
  // Food
  { id: '1', title: 'Sushi Night', description: 'Order your favorite sushi rolls and try something new together', emoji: '🍣', category: 'food' },
  { id: '2', title: 'Pizza Party', description: 'Get that pizza with extra cheese, just the way you like it', emoji: '🍕', category: 'food' },
  { id: '3', title: 'Ice Cream Run', description: 'Late night drive for your favorite flavor', emoji: '🍦', category: 'food' },
  { id: '4', title: 'Cook Together', description: 'Make that recipe we\'ve been wanting to try', emoji: '👨‍🍳', category: 'food' },
  { id: '5', title: 'Dessert First', description: 'Skip dinner, go straight to cake', emoji: '🎂', category: 'food' },
  { id: '6', title: 'Breakfast for Dinner', description: 'Pancakes and waffles at 8pm? Yes please!', emoji: '🥞', category: 'food' },
  { id: '7', title: 'Street Food Adventure', description: 'Find the best momos and chaat in town', emoji: '🥟', category: 'food' },
  { id: '8', title: 'Bake Something Sweet', description: 'Cookies, brownies, or cake - get messy together', emoji: '🍪', category: 'food' },
  
  // Movies
  { id: '9', title: 'Horror Movie Night', description: 'Get scared so you can hold onto me tighter', emoji: '👻', category: 'movie' },
  { id: '10', title: 'Rom-Com Marathon', description: 'Laugh and cry at cheesy love stories together', emoji: '💝', category: 'movie' },
  { id: '11', title: 'Rewatch Our Favorite', description: 'That movie we can quote by heart', emoji: '🎬', category: 'movie' },
  { id: '12', title: 'Disney Night', description: 'Sing along to every song, no judgment', emoji: '🏰', category: 'movie' },
  { id: '13', title: 'Action Movie Marathon', description: 'Explosions and popcorn - perfect combo', emoji: '💥', category: 'movie' },
  { id: '14', title: 'Bollywood Classics', description: 'Dance, drama, and romance all in one', emoji: '🎭', category: 'movie' },
  
  // Adventures
  { id: '15', title: 'Midnight Drive', description: 'Windows down, music up, going nowhere specific', emoji: '🚗', category: 'adventure' },
  { id: '16', title: 'Stargazing', description: 'Find a quiet spot and count the stars together', emoji: '⭐', category: 'adventure' },
  { id: '17', title: 'Explore Somewhere New', description: 'Get lost in a part of town we\'ve never been', emoji: '🗺️', category: 'adventure' },
  { id: '18', title: 'Sunrise Watch', description: 'Wake up early and witness magic together', emoji: '🌅', category: 'adventure' },
  { id: '19', title: 'Hiking Date', description: 'Nature walk with stunning views', emoji: '🥾', category: 'adventure' },
  { id: '20', title: 'Picnic in the Park', description: 'Pack snacks and find a cozy spot', emoji: '🧺', category: 'adventure' },
  { id: '21', title: 'Rain Walk', description: 'Dance in the rain like no one\'s watching', emoji: '🌧️', category: 'adventure' },
  
  // Cozy
  { id: '22', title: 'Blanket Fort', description: 'Build a cozy fort and hide from the world', emoji: '🏕️', category: 'cozy' },
  { id: '23', title: 'Reading Together', description: 'Sit in comfortable silence, just being near each other', emoji: '📚', category: 'cozy' },
  { id: '24', title: 'Nap Together', description: 'Sometimes the best activity is doing nothing', emoji: '😴', category: 'cozy' },
  { id: '25', title: 'Hot Chocolate & Talk', description: 'Deep conversations over warm drinks', emoji: '☕', category: 'cozy' },
  { id: '26', title: 'Puzzle Night', description: 'Work on a puzzle together piece by piece', emoji: '🧩', category: 'cozy' },
  { id: '27', title: 'Board Games', description: 'Friendly competition and lots of laughs', emoji: '🎲', category: 'cozy' },
  { id: '28', title: 'Spa Night at Home', description: 'Face masks, candles, and relaxation', emoji: '🧖‍♀️', category: 'cozy' },
  
  // Romantic
  { id: '29', title: 'Dance in the Kitchen', description: 'No music needed, just hold each other and sway', emoji: '💃', category: 'romantic' },
  { id: '30', title: 'Love Letters Night', description: 'Write each other a letter and read them aloud', emoji: '💌', category: 'romantic' },
  { id: '31', title: 'Photo Session', description: 'Take silly and sweet pictures of us together', emoji: '📸', category: 'romantic' },
  { id: '32', title: 'Memory Lane', description: 'Look at old photos and relive our moments', emoji: '🎞️', category: 'romantic' },
  { id: '33', title: 'Candlelit Dinner', description: 'Home-cooked meal with candles and music', emoji: '🕯️', category: 'romantic' },
  { id: '34', title: 'Sunset Watch', description: 'Find a perfect spot to watch the sunset', emoji: '🌇', category: 'romantic' },
  { id: '35', title: 'Recreate First Date', description: 'Relive where it all began', emoji: '💕', category: 'romantic' },
  { id: '36', title: 'Wish Upon a Star', description: 'Make wishes together under the night sky', emoji: '🌟', category: 'romantic' },
];

const categoryColors = {
  food: 'from-orange-400 to-red-500',
  movie: 'from-purple-400 to-indigo-500',
  adventure: 'from-green-400 to-emerald-500',
  cozy: 'from-amber-400 to-yellow-500',
  romantic: 'from-pink-400 to-rose-500'
};

export const DecisionMaker = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState<Activity[]>([]);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedActivity(null);
    
    // Vibrate
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }

    // Spin animation
    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setSelectedActivity(randomActivity);
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        
        // Final selection
        const finalActivity = activities[Math.floor(Math.random() * activities.length)];
        setSelectedActivity(finalActivity);
        setHistory(prev => [finalActivity, ...prev.slice(0, 4)]);
        
        // Celebration vibrate
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    }, 100 + spins * 20);
  };

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🎲 What Should We Do?
        </motion.h2>
        <p className="text-white/70 text-sm">
          Let me decide for us! 💕
        </p>
      </div>

      {/* Spin Button */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={spinWheel}
          disabled={isSpinning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-400"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'blur(15px)' }}
          />

          <div 
            className="relative w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #ff6b9d, #ff4081)',
              boxShadow: '0 15px 40px rgba(255,100,150,0.4)'
            }}
          >
            <motion.div
              animate={isSpinning ? { rotate: 360 } : {}}
              transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0, ease: "linear" }}
            >
              {isSpinning ? (
                <RefreshCw className="w-12 h-12 text-white" />
              ) : (
                <Shuffle className="w-12 h-12 text-white" />
              )}
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* Result Card */}
      <AnimatePresence mode="wait">
        {selectedActivity && (
          <motion.div
            key={selectedActivity.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className={`p-6 rounded-3xl bg-gradient-to-br ${categoryColors[selectedActivity.category]} mb-6`}
            style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
          >
            {!isSpinning && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-3"
                >
                  {selectedActivity.emoji}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedActivity.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {selectedActivity.description}
                </p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 flex items-center justify-center gap-2 text-white/80"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs">It's decided!</span>
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )}
            
            {isSpinning && (
              <div className="text-center py-4">
                <span className="text-5xl">{selectedActivity.emoji}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedActivity && !isSpinning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-white/50"
        >
          <p className="text-sm">Tap the button to decide!</p>
        </motion.div>
      )}

      {/* History */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <h4 className="text-white/60 text-sm mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4" /> Recent picks
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {history.map((activity, i) => (
              <motion.div
                key={`${activity.id}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`flex-shrink-0 px-4 py-2 rounded-full bg-gradient-to-r ${categoryColors[activity.category]} text-white text-sm`}
              >
                {activity.emoji} {activity.title}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Options Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h4 className="text-white/60 text-sm mb-3">All our options:</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryColors).map(([category, gradient]) => (
            <span
              key={category}
              className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs capitalize`}
            >
              {category} ({activities.filter(a => a.category === category).length})
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
