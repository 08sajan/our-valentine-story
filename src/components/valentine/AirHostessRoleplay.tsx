import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Heart, Sparkles, Coffee, UtensilsCrossed, X } from "lucide-react";
import ReactDOM from "react-dom";

interface Activity {
  id: string;
  name: string;
  emoji: string;
  description: string;
  dialogue: string;
  color: string;
}

const activities: Activity[] = [
  {
    id: 'welcome',
    name: 'Welcome Aboard',
    emoji: '✈️',
    description: 'Greet passengers warmly',
    color: 'from-blue-400 to-indigo-500',
    dialogue: "Welcome aboard Love Airlines Flight 143! ✈️💕 I'm your personal flight attendant today. Please make yourself comfortable, my love. This is going to be a beautiful journey together!"
  },
  {
    id: 'drinks',
    name: 'Serve Drinks',
    emoji: '🥤',
    description: 'Offer refreshing beverages',
    color: 'from-cyan-400 to-blue-500',
    dialogue: "What would you like to drink, my dear? 🥤 We have champagne for celebrations, fresh juice for sweetness, or perhaps some warm tea to relax? Whatever you desire, I'll make it special for you! 💕"
  },
  {
    id: 'meals',
    name: 'Serve Meals',
    emoji: '🍽️',
    description: 'Present delicious food',
    color: 'from-orange-400 to-amber-500',
    dialogue: "Dinner is served, my love! 🍽️ Today we have your favorite dishes prepared with extra care. Let me know if you need anything else - your comfort is my priority! 💕"
  },
  {
    id: 'blanket',
    name: 'Offer Blanket',
    emoji: '🛏️',
    description: 'Provide cozy comfort',
    color: 'from-purple-400 to-violet-500',
    dialogue: "Are you feeling cold, baby? 🛏️ Here's a warm, cozy blanket just for you. Let me tuck you in and make sure you're comfortable. Sweet dreams are waiting for you! 💕"
  },
  {
    id: 'pillow',
    name: 'Fluff Pillow',
    emoji: '🛋️',
    description: 'Make them comfortable',
    color: 'from-pink-400 to-rose-500',
    dialogue: "Let me fluff your pillow for you! 🛋️ There, nice and soft, just like my love for you. Rest your head and relax - I'll take care of everything! 💕"
  },
  {
    id: 'safety',
    name: 'Safety Demo',
    emoji: '🦺',
    description: 'Show safety procedures',
    color: 'from-yellow-400 to-orange-500',
    dialogue: "Now for our special safety demonstration! 🦺 In case of emergency... just look into my eyes - that's your safe place! And remember, I'll always be right here beside you, no matter what! 💕"
  },
  {
    id: 'landing',
    name: 'Announce Landing',
    emoji: '🛬',
    description: 'Prepare for arrival',
    color: 'from-green-400 to-emerald-500',
    dialogue: "Attention passengers! 🛬 We're about to land in the city of Love. Please fasten your seatbelt and prepare your heart for an amazing adventure together! Thank you for flying with me! 💕"
  },
  {
    id: 'kiss',
    name: 'First Class Service',
    emoji: '💋',
    description: 'VIP treatment with love',
    color: 'from-red-400 to-rose-600',
    dialogue: "As our VIP first-class passenger, you deserve the best treatment! 💋 A sweet kiss on your forehead, a warm hug, and all my love - that's your exclusive privilege! You're my most special passenger ever! 💕"
  },
];

const ActivityModal = ({ 
  activity, 
  onClose 
}: { 
  activity: Activity; 
  onClose: () => void 
}) => {
  const [isServing, setIsServing] = useState(false);
  const [served, setServed] = useState(false);

  const handleServe = () => {
    setIsServing(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
    setTimeout(() => {
      setIsServing(false);
      setServed(true);
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
        className={`bg-gradient-to-br ${activity.color} rounded-3xl p-6 max-w-sm w-full`}
        style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 rounded-full p-2"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Activity Icon */}
        <div className="text-center mb-6">
          <motion.div
            animate={isServing ? { 
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, 10, -10, 5, 0]
            } : { scale: [1, 1.1, 1] }}
            transition={isServing ? { duration: 1.5 } : { duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {activity.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">{activity.name}</h3>
          <p className="text-white/80">{activity.description}</p>
        </div>

        {/* Dialogue */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-2xl">👩‍✈️</span>
            <p className="text-white font-serif italic text-sm leading-relaxed">
              {served ? activity.dialogue : "Tap the button to begin..."}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {!served && !isServing && (
          <motion.button
            onClick={handleServe}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold flex items-center justify-center gap-2"
          >
            <span className="text-xl">{activity.emoji}</span>
            Start {activity.name}
          </motion.button>
        )}

        {isServing && (
          <div className="text-center py-4">
            <motion.p 
              className="text-white animate-pulse"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨ Serving with love... ✨
            </motion.p>
          </div>
        )}

        {served && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="flex justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.3, 1], y: [0, -8, 0] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  className="text-xl"
                >
                  💕
                </motion.span>
              ))}
            </div>
            <p className="text-white text-sm">Service complete! 💕</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const AirHostessRoleplay = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setCompletedActivities(prev => new Set([...prev, activity.id]));
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
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          👩‍✈️✈️
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Air Hostess Roleplay
        </h3>
        <p className="text-white/60 text-sm">
          I'll serve you like a first-class flight attendant! 💕
        </p>
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-pink-400 text-sm">
          ✈️ {completedActivities.size}/{activities.length} activities completed!
        </span>
      </div>

      {/* Welcome Banner */}
      <motion.div
        className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-2xl p-4 border border-blue-400/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Plane className="w-8 h-8 text-blue-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">Welcome to Love Airlines!</p>
            <p className="text-white/60 text-xs">Flight 143 to Forever 💕</p>
          </div>
        </div>
        <p className="text-white/80 text-sm italic">
          "Fasten your seatbelt, my love. This is going to be the most romantic flight of your life!"
        </p>
      </motion.div>

      {/* Activities Grid */}
      <div className="grid grid-cols-2 gap-3">
        {activities.map((activity, index) => {
          const isCompleted = completedActivities.has(activity.id);
          return (
            <motion.button
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${activity.color} text-center overflow-hidden`}
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
                {activity.emoji}
              </motion.span>
              <p className="text-white font-medium text-sm">{activity.name}</p>
              <p className="text-white/70 text-xs mt-1">{activity.description}</p>
              
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                >
                  <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Flight Info */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <Coffee className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Drinks Ready</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <UtensilsCrossed className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Meals Ready</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Sparkles className="w-5 h-5 text-pink-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">VIP Service</p>
        </div>
      </div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Being your personal flight attendant is my favorite roleplay! 
          Let me pamper you, my first-class passenger! ✈️💕"
        </p>
      </motion.div>

      {/* Activity Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityModal
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
