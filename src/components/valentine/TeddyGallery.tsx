import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import ReactDOM from "react-dom";

interface TeddyItem {
  emoji: string;
  name: string;
  message: string;
  image: string;
  color: string;
}

// Super cute, girly teddies perfect for girls!
const teddies: TeddyItem[] = [
  { 
    emoji: "🧸💕", 
    name: "Princess Pink Bear", 
    message: "A pink princess bear for my princess! You deserve all the cute things in the world 💕",
    image: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=600",
    color: "#FFC0CB"
  },
  { 
    emoji: "🧸🌸", 
    name: "Fluffy White Cutie", 
    message: "Soft as clouds, pure as your heart - cuddle me when you miss him!",
    image: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=600",
    color: "#FFFAFA"
  },
  { 
    emoji: "🧸💗", 
    name: "Valentine Heart Bear", 
    message: "Holding a heart that represents my love for you - forever! 💝",
    image: "https://images.unsplash.com/photo-1602734846297-9299fc2d4703?w=600",
    color: "#FF69B4"
  },
  { 
    emoji: "🧸🎀", 
    name: "Ribbon Bow Teddy", 
    message: "With a pretty bow just like you - adorable and perfect!",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600",
    color: "#FFB6C1"
  },
  { 
    emoji: "🧸✨", 
    name: "Sparkle Dream Bear", 
    message: "Sprinkled with dreams and starlight, just like my love for you ✨",
    image: "https://images.unsplash.com/photo-1615031335599-92a2f7d93c80?w=600",
    color: "#DEB887"
  },
  { 
    emoji: "🧸🌙", 
    name: "Sleepy Moon Teddy", 
    message: "To guard your dreams and keep you company through the night 🌙",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600",
    color: "#E6E6FA"
  },
  { 
    emoji: "🧸💜", 
    name: "Lavender Love Bear", 
    message: "Soft lavender colored bear for peaceful cuddles 💜",
    image: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=600",
    color: "#E6E6FA"
  },
  { 
    emoji: "🧸🍓", 
    name: "Strawberry Sweetie", 
    message: "Sweet as strawberries, cute as you, Puntuu! 🍓",
    image: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=600",
    color: "#FF6B6B"
  },
  { 
    emoji: "🧸👑", 
    name: "Royal Queen Bear", 
    message: "A teddy fit for a queen - because that's what you are! 👑",
    image: "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?w=600",
    color: "#FFD700"
  },
  { 
    emoji: "🧸💐", 
    name: "Flower Bouquet Bear", 
    message: "This teddy comes with virtual flowers - roses for my rose! 🌹",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600",
    color: "#FFA07A"
  },
  { 
    emoji: "🧸🦋", 
    name: "Butterfly Kiss Teddy", 
    message: "Soft butterfly kisses from this teddy to you! 🦋",
    image: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=600",
    color: "#87CEEB"
  },
  { 
    emoji: "🧸🌈", 
    name: "Rainbow Happiness Bear", 
    message: "Bringing all colors of happiness into your life! 🌈",
    image: "https://images.unsplash.com/photo-1602734846297-9299fc2d4703?w=600",
    color: "#FFE4E1"
  },
];

// Fullscreen Teddy Modal
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
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(20px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Floating hearts and sparkles */}
      {[...Array(25)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: '1.5rem',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['💕', '🧸', '💗', '✨', '🎀', '💖', '🌸'][i % 7]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(255,182,193,0.2) 0%, rgba(255,105,180,0.15) 100%)',
          borderRadius: '24px',
          padding: '24px',
          maxWidth: '380px',
          width: '100%',
          border: '1px solid rgba(255,182,193,0.4)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            padding: '8px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        {/* Big Image */}
        <motion.div
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '20px',
            boxShadow: '0 20px 60px rgba(255,105,180,0.3)',
          }}
          animate={{ 
            boxShadow: [
              '0 20px 60px rgba(255,105,180,0.3)',
              '0 20px 80px rgba(255,182,193,0.5)',
              '0 20px 60px rgba(255,105,180,0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src={teddy.image}
            alt={teddy.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {/* Big Emoji */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={{ fontSize: '4rem' }}>{teddy.emoji}</span>
        </motion.div>

        {/* Name */}
        <h3 style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontFamily: 'serif',
          color: '#FFB6C1',
          marginBottom: '12px',
        }}>
          {teddy.name}
        </h3>

        {/* Message */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '16px',
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'serif',
            fontSize: '1rem',
            lineHeight: 1.6,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            "{teddy.message}"
          </p>
        </div>

        {/* Hug animation */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '8px' }}
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
              {['💕', '🎀', '✨', '💖', '🌸'][i]}
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
    
    // Vibrate on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hug Counter */}
      <motion.div
        className="text-center"
        animate={{ scale: hugCount > 0 ? [1, 1.1, 1] : 1 }}
        key={hugCount}
      >
        <span className="text-pink-400 font-medium">
          💕 You've hugged {hugCount} adorable teddies!
        </span>
      </motion.div>

      {/* Teddy Grid - cute pink themed */}
      <div className="grid grid-cols-3 gap-3">
        {teddies.map((teddy, index) => (
          <motion.button
            key={index}
            onClick={() => handleHug(index)}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255,182,193,0.2) 0%, rgba(255,105,180,0.2) 100%)',
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden">
              <img 
                src={teddy.image} 
                alt={teddy.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent" />
            </div>
            
            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
              <motion.span
                className="text-2xl block"
                animate={selectedTeddy === index ? { 
                  scale: [1, 1.3, 1],
                  rotate: [0, -10, 10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {teddy.emoji}
              </motion.span>
              <p className="text-[10px] text-pink-200 font-medium truncate">{teddy.name}</p>
            </div>
            
            {/* Hug animation */}
            <AnimatePresence>
              {selectedTeddy === index && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-xl"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.5],
                        opacity: [1, 0],
                        x: Math.cos(i * 60 * Math.PI / 180) * 40,
                        y: Math.sin(i * 60 * Math.PI / 180) * 40,
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      {['💕', '🎀', '✨', '💖', '🌸', '💗'][i]}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Tap hint */}
      <p className="text-center text-pink-400/70 text-xs">
        Tap any teddy to give it a big hug! 🧸💕
      </p>

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
