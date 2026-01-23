import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star, Moon, Sun, Music, Coffee, Phone, Book, Camera, Smile, Palette, X } from "lucide-react";
import ReactDOM from "react-dom";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  funMessage: string;
}

const activities: ActivityItem[] = [
  {
    id: "call",
    title: "Call Me",
    description: "I'll pick up no matter what time it is",
    emoji: "📞",
    color: "from-green-400 to-emerald-500",
    funMessage: "Your voice is my favorite sound in the whole world. Even a 1-minute call makes my entire day brighter! 💕"
  },
  {
    id: "photos",
    title: "Look at Our Photos",
    description: "Scroll through our memories together",
    emoji: "📸",
    color: "from-pink-400 to-rose-500",
    funMessage: "Every photo of us captures a moment where I fell deeper in love with you. Your smile in those pictures? Pure magic! ✨"
  },
  {
    id: "voice",
    title: "Listen to My Voice Notes",
    description: "All those silly things I've recorded",
    emoji: "🎤",
    color: "from-purple-400 to-violet-500",
    funMessage: "I hope my voice notes make you smile! I record them imagining your beautiful face lighting up when you hear them 🥰"
  },
  {
    id: "letter",
    title: "Re-read My Letters",
    description: "Every word written with love",
    emoji: "💌",
    color: "from-red-400 to-rose-500",
    funMessage: "Each letter holds a piece of my heart. When you read them, know that I meant every single word forever! 💕"
  },
  {
    id: "music",
    title: "Play Our Playlist",
    description: "Songs that remind us of each other",
    emoji: "🎵",
    color: "from-blue-400 to-cyan-500",
    funMessage: "Every song in our playlist is like a love letter. 'Lover' by Taylor Swift hits different when I think of you! 🎶"
  },
  {
    id: "hug",
    title: "Hug a Pillow",
    description: "Pretend it's me (I do this too!)",
    emoji: "🤗",
    color: "from-orange-400 to-amber-500",
    funMessage: "I know it's not the same, but I hug my pillow too and imagine it's you. Soon, Puntuu, soon! 🧸"
  },
  {
    id: "dream",
    title: "Think About Our Future",
    description: "Our home, our adventures, our life",
    emoji: "🏠",
    color: "from-teal-400 to-emerald-500",
    funMessage: "Close your eyes and imagine us cooking together, lazy Sunday mornings, and building our forever. It's coming! 💭"
  },
  {
    id: "text",
    title: "Text Me 'I Miss You'",
    description: "I'll reply with a thousand hearts",
    emoji: "💬",
    color: "from-indigo-400 to-purple-500",
    funMessage: "Seeing 'I miss you' from you makes my heart do backflips! I'll send you the most loving reply ever 💕💕💕"
  },
  {
    id: "cook",
    title: "Make Something Sweet",
    description: "And think of feeding me someday",
    emoji: "🍳",
    color: "from-amber-400 to-orange-500",
    funMessage: "Imagine us cooking together! You making chai while I wrap my arms around you from behind... soon! ☕"
  },
  {
    id: "smile",
    title: "Watch Our Videos",
    description: "All those cute moments we recorded",
    emoji: "🎬",
    color: "from-rose-400 to-pink-500",
    funMessage: "Your laugh in those videos? My absolute favorite sound. Play them on repeat when you miss me! 🥰"
  },
  {
    id: "countdown",
    title: "Count Days Until We Meet",
    description: "Every day brings us closer",
    emoji: "📅",
    color: "from-cyan-400 to-blue-500",
    funMessage: "Each sunrise is one day closer to holding you! The countdown makes it even more exciting 🌅"
  },
  {
    id: "pray",
    title: "Pray for Us",
    description: "For our love and our future",
    emoji: "🙏",
    color: "from-yellow-400 to-amber-500",
    funMessage: "I pray for us every single day - for your happiness, our love, and our beautiful future together 💫"
  },
];

const ActivityModal = ({
  activity,
  onClose
}: {
  activity: ActivityItem;
  onClose: () => void;
}) => {
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
      {/* Floating hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            left: `${Math.random() * 100}%`,
            bottom: '-20%',
          }}
          animate={{
            y: [0, -800],
            opacity: [0, 1, 0],
            x: [0, Math.sin(i) * 50],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {['💕', '✨', '💗', '🌟', '💖'][i % 5]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #2d1f3d 0%, #1a0a1a 100%)',
          borderRadius: '24px',
          padding: '32px',
          maxWidth: '400px',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            padding: '8px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        {/* Emoji */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '24px' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={{ fontSize: '5rem' }}>{activity.emoji}</span>
        </motion.div>

        {/* Title */}
        <h3 style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontFamily: 'serif',
          color: 'white',
          marginBottom: '16px',
        }}>
          {activity.title}
        </h3>

        {/* Message */}
        <div style={{
          background: `linear-gradient(135deg, ${activity.color.split(' ')[0].replace('from-', '')}20, ${activity.color.split(' ')[1]?.replace('to-', '')}20)`,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'serif',
            fontSize: '1rem',
            lineHeight: 1.6,
            textAlign: 'center',
          }}>
            {activity.funMessage}
          </p>
        </div>

        {/* Hearts animation */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ 
                scale: [1, 1.3, 1],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{ fontSize: '1.5rem' }}
            >
              💕
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const WhenIMissYou = () => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  const handleActivityClick = (activity: ActivityItem) => {
    setSelectedActivity(activity);
    setCompletedActivities(prev => new Set([...prev, activity.id]));
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
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
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          When You Miss Me, Puntuu...
        </h3>
        <p className="text-white/60 text-sm">
          Tap any activity to feel closer to me 💕
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="text-center"
        animate={{ scale: completedActivities.size > 0 ? [1, 1.05, 1] : 1 }}
        key={completedActivities.size}
      >
        <span className="text-rose-400 text-sm">
          ✨ {completedActivities.size}/{activities.length} activities explored
        </span>
      </motion.div>

      {/* Activities Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {activities.map((activity, index) => (
          <motion.button
            key={activity.id}
            onClick={() => handleActivityClick(activity)}
            className={`relative rounded-2xl p-3 text-center transition-all ${
              completedActivities.has(activity.id)
                ? 'bg-gradient-to-br ' + activity.color + ' text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-3xl block mb-1"
              animate={completedActivities.has(activity.id) ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {activity.emoji}
            </motion.span>
            <p className="text-[10px] font-medium leading-tight">
              {activity.title}
            </p>

            {/* Completed indicator */}
            {completedActivities.has(activity.id) && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Distance means so little when someone means so much. 
          I'm always with you in spirit, Puntuu!" 💕
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
