import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Heart, Sparkles, Coffee, UtensilsCrossed, X, Volume2, VolumeX, CloudSun } from "lucide-react";
import ReactDOM from "react-dom";

interface Activity {
  id: string;
  name: string;
  emoji: string;
  description: string;
  dialogue: string;
  color: string;
  animation?: string;
}

const activities: Activity[] = [
  {
    id: 'welcome',
    name: 'Welcome Aboard',
    emoji: '✈️',
    description: 'Greet passengers warmly',
    color: 'from-blue-400 to-indigo-500',
    dialogue: "Welcome aboard Love Airlines Flight 143! ✈️💕 I'm your personal flight attendant today. Please make yourself comfortable, my love. This is going to be a beautiful journey together!",
    animation: 'wave'
  },
  {
    id: 'drinks',
    name: 'Serve Drinks',
    emoji: '🥤',
    description: 'Offer refreshing beverages',
    color: 'from-cyan-400 to-blue-500',
    dialogue: "What would you like to drink, my dear? 🥤 We have champagne for celebrations, fresh juice for sweetness, or perhaps some warm tea to relax? Whatever you desire, I'll make it special for you! 💕",
    animation: 'pour'
  },
  {
    id: 'meals',
    name: 'Serve Meals',
    emoji: '🍽️',
    description: 'Present delicious food',
    color: 'from-orange-400 to-amber-500',
    dialogue: "Dinner is served, my love! 🍽️ Today we have your favorite dishes prepared with extra care. Let me know if you need anything else - your comfort is my priority! 💕",
    animation: 'serve'
  },
  {
    id: 'blanket',
    name: 'Offer Blanket',
    emoji: '🛏️',
    description: 'Provide cozy comfort',
    color: 'from-purple-400 to-violet-500',
    dialogue: "Are you feeling cold, baby? 🛏️ Here's a warm, cozy blanket just for you. Let me tuck you in and make sure you're comfortable. Sweet dreams are waiting for you! 💕",
    animation: 'wrap'
  },
  {
    id: 'pillow',
    name: 'Fluff Pillow',
    emoji: '🛋️',
    description: 'Make them comfortable',
    color: 'from-pink-400 to-rose-500',
    dialogue: "Let me fluff your pillow for you! 🛋️ There, nice and soft, just like my love for you. Rest your head and relax - I'll take care of everything! 💕",
    animation: 'fluff'
  },
  {
    id: 'safety',
    name: 'Safety Demo',
    emoji: '🦺',
    description: 'Show safety procedures',
    color: 'from-yellow-400 to-orange-500',
    dialogue: "Now for our special safety demonstration! 🦺 In case of emergency... just look into my eyes - that's your safe place! And remember, I'll always be right here beside you, no matter what! 💕",
    animation: 'demo'
  },
  {
    id: 'landing',
    name: 'Announce Landing',
    emoji: '🛬',
    description: 'Prepare for arrival',
    color: 'from-green-400 to-emerald-500',
    dialogue: "Attention passengers! 🛬 We're about to land in the city of Love. Please fasten your seatbelt and prepare your heart for an amazing adventure together! Thank you for flying with me! 💕",
    animation: 'land'
  },
  {
    id: 'kiss',
    name: 'First Class Service',
    emoji: '💋',
    description: 'VIP treatment with love',
    color: 'from-red-400 to-rose-600',
    dialogue: "As our VIP first-class passenger, you deserve the best treatment! 💋 A sweet kiss on your forehead, a warm hug, and all my love - that's your exclusive privilege! You're my most special passenger ever! 💕",
    animation: 'kiss'
  },
];

// Floating clouds component
const FloatingClouds = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white/20"
        style={{
          left: `${i * 25}%`,
          top: `${10 + (i % 3) * 20}%`,
          fontSize: '3rem',
        }}
        animate={{
          x: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10 + i * 2,
          repeat: Infinity,
          delay: i * 2,
        }}
      >
        ☁️
      </motion.div>
    ))}
  </div>
);

// Plane animation
const FlyingPlane = () => (
  <motion.div
    className="absolute text-4xl"
    initial={{ x: '-100%', y: '50%' }}
    animate={{ 
      x: ['0%', '120%'],
      y: ['30%', '20%', '40%', '25%'],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    ✈️
  </motion.div>
);

const ActivityModal = ({ 
  activity, 
  onClose 
}: { 
  activity: Activity; 
  onClose: () => void 
}) => {
  const [isServing, setIsServing] = useState(false);
  const [served, setServed] = useState(false);
  const [playAmbience, setPlayAmbience] = useState(false);

  const handleServe = () => {
    setIsServing(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
    setTimeout(() => {
      setIsServing(false);
      setServed(true);
    }, 2500);
  };

  // Get specific animation based on activity
  const getActivityAnimation = () => {
    switch (activity.animation) {
      case 'wave':
        return { rotate: [0, 20, -20, 20, 0], scale: [1, 1.1, 1] };
      case 'pour':
        return { rotate: [0, -45, 0], y: [0, 10, 0] };
      case 'serve':
        return { x: [0, 20, -20, 0], scale: [1, 1.05, 1] };
      case 'wrap':
        return { scale: [1, 1.2, 0.9, 1.1, 1] };
      case 'fluff':
        return { y: [0, -15, 5, -10, 0], scale: [1, 1.1, 0.95, 1] };
      case 'demo':
        return { x: [-20, 20, -20, 20, 0], rotate: [0, 5, -5, 0] };
      case 'land':
        return { y: [0, 20, 0], rotate: [0, -15, 0] };
      case 'kiss':
        return { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] };
      default:
        return { scale: [1, 1.1, 1] };
    }
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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingClouds />
        {served && <FlyingPlane />}
      </div>

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-gradient-to-br ${activity.color} rounded-3xl p-6 max-w-sm w-full relative overflow-hidden`}
        style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
      >
        {/* Cabin window effect */}
        <div className="absolute top-4 right-12 w-12 h-16 rounded-full bg-gradient-to-b from-sky-300/40 to-blue-200/20 border-2 border-white/20" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 rounded-full p-2 z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Ambience toggle */}
        <button
          onClick={() => setPlayAmbience(!playAmbience)}
          className="absolute top-4 left-4 bg-white/20 rounded-full p-2 z-10"
        >
          {playAmbience ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Activity Icon with realistic animation */}
        <div className="text-center mb-6 pt-4">
          <motion.div
            animate={isServing ? getActivityAnimation() : { scale: [1, 1.05, 1], y: [0, -5, 0] }}
            transition={isServing ? { duration: 2.5 } : { duration: 3, repeat: Infinity }}
            className="text-8xl mb-4 drop-shadow-lg"
          >
            {activity.emoji}
          </motion.div>
          
          {/* Sparkle effects during service */}
          {isServing && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${20 + (i * 5)}%`,
                    top: `${20 + (i % 4) * 15}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -20, -40],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  ✨
                </motion.span>
              ))}
            </div>
          )}
          
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{activity.name}</h3>
          <p className="text-white/90">{activity.description}</p>
        </div>

        {/* Animated service indicator */}
        {isServing && (
          <motion.div
            className="flex justify-center mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Plane className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white text-sm">In-flight service...</span>
            </div>
          </motion.div>
        )}

        {/* Dialogue with realistic chat bubble */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/10">
          <div className="flex items-start gap-3">
            <motion.div
              animate={served ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-2xl border-2 border-white/50 shadow-lg">
                👩‍✈️
              </div>
            </motion.div>
            <div>
              <p className="text-white/60 text-xs mb-1">Flight Attendant Puntuu</p>
              <p className="text-white font-serif text-sm leading-relaxed">
                {served ? activity.dialogue : "Tap the button to start the service..."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!served && !isServing && (
          <motion.button
            onClick={handleServe}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold flex items-center justify-center gap-3 shadow-xl"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Plane className="w-5 h-5" />
            </motion.span>
            <span className="text-lg">{activity.emoji}</span>
            Start {activity.name}
          </motion.button>
        )}

        {served && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.3, 1], y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
                  className="text-2xl"
                >
                  💕
                </motion.span>
              ))}
            </div>
            <p className="text-white font-medium">Service complete! Enjoy your flight! ✈️💕</p>
            <motion.button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-white/20 rounded-full text-white text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Flight
            </motion.button>
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
  const [flightProgress, setFlightProgress] = useState(0);

  useEffect(() => {
    // Update flight progress based on completed activities
    setFlightProgress((completedActivities.size / activities.length) * 100);
  }, [completedActivities]);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setCompletedActivities(prev => new Set([...prev, activity.id]));
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Sky Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-300/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="text-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-6xl mb-3"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          👩‍✈️✈️
        </motion.div>
        <h3 className="text-2xl font-serif text-rose-300 mb-2">
          Air Hostess Roleplay
        </h3>
        <p className="text-white/60 text-sm">
          I'll serve you like a first-class flight attendant! 💕
        </p>
      </motion.div>

      {/* Flight Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between text-xs text-white/60 mb-2">
          <span>🛫 Departure</span>
          <span>🛬 Arrival</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-pink-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${flightProgress}%` }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-lg"
            style={{ left: `${Math.min(flightProgress, 92)}%` }}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ✈️
          </motion.div>
        </div>
        <p className="text-center text-pink-400 text-sm mt-2">
          ✈️ {completedActivities.size}/{activities.length} services completed!
        </p>
      </div>

      {/* Welcome Banner */}
      <motion.div
        className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-2xl p-4 border border-blue-400/30 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl opacity-20"
              style={{ left: `${20 + i * 30}%`, top: '20%' }}
              animate={{ x: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 2 }}
            >
              ☁️
            </motion.span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 mb-3 relative">
          <motion.div
            animate={{ x: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Plane className="w-8 h-8 text-blue-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">Welcome to Love Airlines!</p>
            <p className="text-white/60 text-xs">Flight 143 to Forever 💕</p>
          </div>
          <CloudSun className="w-6 h-6 text-amber-400 ml-auto" />
        </div>
        <p className="text-white/80 text-sm italic relative">
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
              {/* Cabin window decorations */}
              <div className="absolute top-2 right-2 w-3 h-4 rounded-full bg-white/10" />
              
              <motion.span
                className="text-4xl block mb-2"
                animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
              >
                {activity.emoji}
              </motion.span>
              <p className="text-white font-medium text-sm">{activity.name}</p>
              <p className="text-white/70 text-xs mt-1">{activity.description}</p>
              
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Flight Info */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <motion.div 
          className="bg-white/10 rounded-xl p-3"
          whileHover={{ scale: 1.05 }}
        >
          <Coffee className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Drinks Ready</p>
        </motion.div>
        <motion.div 
          className="bg-white/10 rounded-xl p-3"
          whileHover={{ scale: 1.05 }}
        >
          <UtensilsCrossed className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Meals Ready</p>
        </motion.div>
        <motion.div 
          className="bg-white/10 rounded-xl p-3"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-5 h-5 text-pink-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">VIP Service</p>
        </motion.div>
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
