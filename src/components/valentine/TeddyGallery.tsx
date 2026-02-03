import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";
import ReactDOM from "react-dom";

interface TeddyItem {
  emoji: string;
  name: string;
  message: string;
  image: string;
  color: string;
}

// Super cute, girly pink Pinterest-style teddies! 🎀💕
const teddies: TeddyItem[] = [
  { 
    emoji: "🧸💕", 
    name: "Pink Princess Teddy", 
    message: "A fluffy pink princess just for my princess! Cuddle me whenever you miss him, sweetheart! 💕",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    color: "#FFB6C1"
  },
  { 
    emoji: "🧸🎀", 
    name: "Ribbon Bow Cutie", 
    message: "Wrapped in love with a pretty bow, just like my heart wrapped around you, babe! 🎀",
    image: "https://images.unsplash.com/photo-1585155770913-6090424a786d?w=600",
    color: "#FF69B4"
  },
  { 
    emoji: "🧸💗", 
    name: "Love Heart Bear", 
    message: "Holding my heart forever - this teddy guards our love, Punturu! 💗",
    image: "https://images.unsplash.com/photo-1615031335940-d0c7e8f88e4f?w=600",
    color: "#FF1493"
  },
  { 
    emoji: "🧸🌸", 
    name: "Cherry Blossom Bear", 
    message: "Soft like petals, sweet like spring - that's you, my love! 🌸",
    image: "https://images.unsplash.com/photo-1602734846297-9299fc2d4703?w=600",
    color: "#FFB7C5"
  },
  { 
    emoji: "🧸✨", 
    name: "Sparkle Fluff", 
    message: "You make my whole world sparkle, just like this magical teddy, sweetheart! ✨",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600",
    color: "#FFC0CB"
  },
  { 
    emoji: "🧸🦋", 
    name: "Butterfly Dream", 
    message: "You give me butterflies every single day, babe! 🦋",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600",
    color: "#E6E6FA"
  },
  { 
    emoji: "🧸🍓", 
    name: "Strawberry Sweetie", 
    message: "Sweet as strawberries, adorable as you! You're my favorite treat, my love! 🍓",
    image: "https://images.unsplash.com/photo-1582845512747-e42001c95638?w=600",
    color: "#FF6B6B"
  },
  { 
    emoji: "🧸👑", 
    name: "Royal Princess Bear", 
    message: "A teddy fit for a queen - because that's exactly what you are, sweetheart! 👑",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=600",
    color: "#FFD700"
  },
  { 
    emoji: "🧸💜", 
    name: "Lavender Dreams", 
    message: "Soft, calming, and always here for you - like my love, Punturu! 💜",
    image: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=600",
    color: "#DDA0DD"
  },
  { 
    emoji: "🧸🌙", 
    name: "Moonlight Cuddles", 
    message: "For sweet dreams and cozy nights - I'm always with you, babe! 🌙",
    image: "https://images.unsplash.com/photo-1536816579748-4ecb3f03d72a?w=600",
    color: "#B8B8D1"
  },
  { 
    emoji: "🧸🌹", 
    name: "Rose Petal Bear", 
    message: "Romantic and beautiful, just like every moment with you, my love! 🌹",
    image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=600",
    color: "#C41E3A"
  },
  { 
    emoji: "🧸🎂", 
    name: "Birthday Wish Bear", 
    message: "Every day with you feels like a celebration, sweetheart! 🎂",
    image: "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?w=600",
    color: "#FFE4E1"
  },
  { 
    emoji: "🧸🍯", 
    name: "Honey Bear", 
    message: "Sweet as honey, that's my girl! You're my sweetest addiction! 🍯",
    image: "https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?w=600",
    color: "#DAA520"
  },
  { 
    emoji: "🧸❄️", 
    name: "Winter Cuddles Bear", 
    message: "Even on the coldest days, thoughts of you keep me warm, babe! ❄️",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
    color: "#87CEEB"
  },
  { 
    emoji: "🧸🌻", 
    name: "Sunshine Bear", 
    message: "You're my sunshine on cloudy days, Punturu! 🌻",
    image: "https://images.unsplash.com/photo-1566958769312-82cef41d19ef?w=600",
    color: "#FFD93D"
  },
  { 
    emoji: "🧸🎵", 
    name: "Musical Bear", 
    message: "You're the melody to my heart's song, sweetheart! 🎵",
    image: "https://images.unsplash.com/photo-1532009877282-3340270e0529?w=600",
    color: "#FF85A2"
  },
];

// Fullscreen Teddy Modal with enhanced design
const TeddyModal = ({
  teddy,
  onClose
}: {
  teddy: TeddyItem;
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
        background: `linear-gradient(135deg, ${teddy.color}20 0%, #1a0a1a 50%, ${teddy.color}10 100%)`,
        backdropFilter: 'blur(20px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Floating hearts and sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: `${1 + Math.random()}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.3, 1],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['💕', '🧸', '💗', '✨', '🎀', '💖', '🌸', '💝', '🦋', '👑'][i % 10]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.5, y: 100, rotateY: -20 }}
        animate={{ scale: 1, y: 0, rotateY: 0 }}
        exit={{ scale: 0.5, y: 100, rotateY: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, ${teddy.color}30 0%, rgba(255,182,193,0.15) 50%, ${teddy.color}20 100%)`,
          borderRadius: '28px',
          padding: '24px',
          maxWidth: '380px',
          width: '100%',
          border: `2px solid ${teddy.color}60`,
          position: 'relative',
          boxShadow: `0 30px 80px ${teddy.color}40`,
        }}
      >
        {/* Sparkle decoration */}
        <motion.div
          style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)' }}
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-pink-400" />
        </motion.div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            padding: '10px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10,
          }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.25)' }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        {/* Big Image with glow */}
        <motion.div
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '20px',
            border: `3px solid ${teddy.color}80`,
          }}
          animate={{ 
            boxShadow: [
              `0 20px 60px ${teddy.color}40`,
              `0 25px 80px ${teddy.color}60`,
              `0 20px 60px ${teddy.color}40`
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <motion.img
            src={teddy.image}
            alt={teddy.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* Big Emoji with bounce */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          animate={{ 
            scale: [1, 1.25, 1], 
            rotate: [0, -10, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }}>
            {teddy.emoji}
          </span>
        </motion.div>

        {/* Name */}
        <h3 style={{
          textAlign: 'center',
          fontSize: '1.6rem',
          fontFamily: 'serif',
          background: `linear-gradient(135deg, ${teddy.color}, #FFB6C1)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
          fontWeight: 'bold',
        }}>
          {teddy.name}
        </h3>

        {/* Message with special styling */}
        <motion.div 
          style={{
            background: `linear-gradient(135deg, ${teddy.color}20, rgba(255,255,255,0.08))`,
            borderRadius: '18px',
            padding: '18px',
            border: `1px solid ${teddy.color}30`,
          }}
          animate={{ borderColor: [`${teddy.color}30`, `${teddy.color}60`, `${teddy.color}30`] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p style={{
            color: 'rgba(255,255,255,0.95)',
            fontFamily: 'serif',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            "{teddy.message}"
          </p>
        </motion.div>

        {/* Love animation */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}
        >
          {['💕', '🎀', '✨', '💖', '🌸'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ 
                scale: [1, 1.4, 1],
                y: [0, -8, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15
              }}
              style={{ fontSize: '1.6rem' }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const TeddyGallery = () => {
  const [selectedTeddy, setSelectedTeddy] = useState<number | null>(null);
  const [viewingTeddy, setViewingTeddy] = useState<TeddyItem | null>(null);
  const [hugCount, setHugCount] = useState(0);

  const handleHug = (index: number) => {
    setSelectedTeddy(index);
    setHugCount(prev => prev + 1);
    setViewingTeddy(teddies[index]);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with cute styling */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-5xl mb-2"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🧸💕
        </motion.div>
        <h3 className="text-lg font-serif text-pink-300 mb-1">
          Adorable Teddy Collection
        </h3>
        <p className="text-white/60 text-xs">
          Tap any cutie to give them a big hug! 🎀
        </p>
      </motion.div>

      {/* Hug Counter */}
      <motion.div
        className="text-center py-2 px-4 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-400/30 inline-block mx-auto w-full"
        animate={{ scale: hugCount > 0 ? [1, 1.05, 1] : 1 }}
        key={hugCount}
      >
        <span className="text-pink-300 font-medium text-sm">
          💕 You've hugged {hugCount} adorable teddies! 💕
        </span>
      </motion.div>

      {/* Teddy Grid - super cute pink themed */}
      <div className="grid grid-cols-3 gap-3">
        {teddies.map((teddy, index) => (
          <motion.button
            key={index}
            onClick={() => handleHug(index)}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            style={{
              background: `linear-gradient(135deg, ${teddy.color}25 0%, rgba(255,182,193,0.15) 100%)`,
              border: `2px solid ${teddy.color}40`,
            }}
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.93 }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden">
              <img 
                src={teddy.image} 
                alt={teddy.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-115"
                loading="lazy"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${teddy.color}90 0%, transparent 60%)`
                }}
              />
            </div>
            
            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
              <motion.span
                className="text-2xl block drop-shadow-lg"
                animate={selectedTeddy === index ? { 
                  scale: [1, 1.4, 1],
                  rotate: [0, -15, 15, 0]
                } : {}}
                transition={{ duration: 0.6 }}
              >
                {teddy.emoji}
              </motion.span>
              <p className="text-[10px] text-white font-medium truncate drop-shadow-md">
                {teddy.name}
              </p>
            </div>
            
            {/* Hug animation burst */}
            <AnimatePresence>
              {selectedTeddy === index && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-xl"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 2],
                        opacity: [1, 0],
                        x: Math.cos(i * 45 * Math.PI / 180) * 50,
                        y: Math.sin(i * 45 * Math.PI / 180) * 50,
                      }}
                      transition={{ duration: 0.9 }}
                    >
                      {['💕', '🎀', '✨', '💖', '🌸', '💗', '🦋', '👑'][i]}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Favorite heart indicator */}
            <motion.div
              className="absolute top-2 right-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400 drop-shadow-lg" />
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Tap hint */}
      <motion.p 
        className="text-center text-pink-400/70 text-xs"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨ Each teddy has a special message just for you! ✨
      </motion.p>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {viewingTeddy && (
          <TeddyModal
            teddy={viewingTeddy}
            onClose={() => setViewingTeddy(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
