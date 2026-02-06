import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import ReactDOM from "react-dom";
 
// Import uploaded teddy images
import teddy1 from "@/assets/teddies/teddy-1.jpg";
import teddy2 from "@/assets/teddies/teddy-2.jpg";
import teddy3 from "@/assets/teddies/teddy-3.jpg";
import teddy4 from "@/assets/teddies/teddy-4.jpg";
import teddy5 from "@/assets/teddies/teddy-5.jpg";
import teddy6 from "@/assets/teddies/teddy-6.jpg";
import teddy7 from "@/assets/teddies/teddy-7.jpg";
import teddy8 from "@/assets/teddies/teddy-8.jpg";
import teddy9 from "@/assets/teddies/teddy-9.webp";
import teddy10 from "@/assets/teddies/teddy-10.webp";

interface TeddyItem {
  emoji: string;
  name: string;
  message: string;
  image: string;
  color: string;
}

// Only the 10 uploaded teddies
const teddies: TeddyItem[] = [
  { 
    emoji: "🧸🌸", 
    name: "Rose Basket Teddy", 
    message: "Holding a basket of roses just for you, my sweetheart! You deserve all the flowers in the world! 🌸",
    image: teddy1,
    color: "#F5E6D3"
  },
  { 
    emoji: "🧸🌹", 
    name: "White Rose Bear", 
    message: "Pure white like my love for you, holding a red rose from my heart, babe! 🌹",
    image: teddy2,
    color: "#FFFFFF"
  },
  { 
    emoji: "🧸❤️", 
    name: "I Love You Bear", 
    message: "This teddy says what my heart screams every second - I LOVE YOU, sweetheart! ❤️",
    image: teddy3,
    color: "#DC2626"
  },
  { 
    emoji: "🧸🧥", 
    name: "Hoodie Cutie Bear", 
    message: "Cozy in a hoodie just like you look adorable in my hoodies, love! 🧥",
    image: teddy4,
    color: "#8B6914"
  },
  { 
    emoji: "🧸🧣", 
    name: "Pink Scarf Teddy", 
    message: "Wrapped in pink warmth to keep you cozy on cold nights, my love! 🧣",
    image: teddy5,
    color: "#FFB6C1"
  },
  { 
    emoji: "🧸🎀", 
    name: "Bow Tie Cutie", 
    message: "All dressed up with a pretty bow because every day with you is special, babe! 🎀",
    image: teddy6,
    color: "#FFFDD0"
  },
  { 
    emoji: "🧸💕", 
    name: "Heart Ribbon Bear", 
    message: "A heart on my chest because you live in my heart forever, sweetheart! 💕",
    image: teddy7,
    color: "#FAF0E6"
  },
  { 
    emoji: "🧸👶", 
    name: "Mama & Baby Bear", 
    message: "Holding you close like I always want to, my precious love! Like a mama bear protects her baby! 👶",
    image: teddy8,
    color: "#FFF5EE"
  },
  { 
    emoji: "🧸🌷", 
    name: "Flower Bouquet Teddy", 
    message: "Bringing you fresh flowers every day because you deserve to smile, my love! 🌷",
    image: teddy9,
    color: "#8B4513"
  },
  { 
    emoji: "🧸💙", 
    name: "Stitch Costume Bear", 
    message: "Being silly and cute just to make you laugh, my adorable sweetheart! 💙",
    image: teddy10,
    color: "#4682B4"
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
        background: `linear-gradient(135deg, ${teddy.color}20 0%, #1a0a1a 50%, ${teddy.color}10 100%)`,
        backdropFilter: 'blur(20px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Floating hearts - reduced count for performance */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: `${1 + Math.random()}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['💕', '🧸', '💗', '✨', '🎀', '💖'][i % 6]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, ${teddy.color}30 0%, rgba(255,182,193,0.15) 50%, ${teddy.color}20 100%)`,
          borderRadius: '28px',
          padding: '24px',
          maxWidth: '380px',
          width: '100%',
          border: `2px solid ${teddy.color}60`,
          position: 'relative',
          boxShadow: `0 20px 60px ${teddy.color}30`,
        }}
      >
        {/* Sparkle decoration */}
        <motion.div
          style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        {/* Image */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '20px',
            border: `3px solid ${teddy.color}80`,
            boxShadow: `0 15px 40px ${teddy.color}30`,
          }}
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
        </div>

        {/* Big Emoji */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={{ fontSize: '4rem' }}>
            {teddy.emoji}
          </span>
        </motion.div>

        {/* Name */}
        <h3 style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontFamily: 'serif',
          background: `linear-gradient(135deg, ${teddy.color}, #FFB6C1)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
          fontWeight: 'bold',
        }}>
          {teddy.name}
        </h3>

        {/* Message */}
        <div 
          style={{
            background: `linear-gradient(135deg, ${teddy.color}20, rgba(255,255,255,0.08))`,
            borderRadius: '18px',
            padding: '18px',
            border: `1px solid ${teddy.color}30`,
          }}
        >
          <p style={{
            color: 'rgba(255,255,255,0.95)',
            fontFamily: 'serif',
            fontSize: '1rem',
            lineHeight: 1.7,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            "{teddy.message}"
          </p>
        </div>

        {/* Love animation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
          {['💕', '🎀', '✨', '💖', '🌸'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{ fontSize: '1.4rem' }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const TeddyGallery = () => {
  const [viewingTeddy, setViewingTeddy] = useState<TeddyItem | null>(null);
  const [hugCount, setHugCount] = useState(0);

  const handleHug = (index: number) => {
    setHugCount(prev => prev + 1);
    setViewingTeddy(teddies[index]);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-2">🧸💕</div>
        <h3 className="text-lg font-serif text-pink-300 mb-1">
          Adorable Teddy Collection
        </h3>
        <p className="text-white/60 text-xs">
          Tap any cutie to give them a big hug! 🎀
        </p>
      </div>

      {/* Hug Counter */}
      <div className="text-center py-2 px-4 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-400/30">
        <span className="text-pink-300 font-medium text-sm">
          💕 You've hugged {hugCount} adorable teddies! 💕
        </span>
      </div>

      {/* Teddy Grid */}
      <div className="grid grid-cols-2 gap-3">
        {teddies.map((teddy, index) => (
          <motion.button
            key={index}
            onClick={() => handleHug(index)}
            className="relative rounded-2xl overflow-hidden shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${teddy.color}25 0%, rgba(255,182,193,0.15) 100%)`,
              border: `2px solid ${teddy.color}40`,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden">
              <img 
                src={teddy.image} 
                alt={teddy.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              />
            </div>
            
            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
              <span className="text-2xl block mb-1">{teddy.emoji}</span>
              <span className="text-white text-xs font-medium">
                {teddy.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
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
