import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Sparkles, X, Download, Share2 } from "lucide-react";
import ReactDOM from "react-dom";

// Romantic frames with couple photos
const frames = [
  {
    id: 'classic-love',
    name: 'Classic Love',
    image: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800',
    border: 'border-rose-400',
    gradient: 'from-rose-500 to-pink-500',
    overlay: 'rgba(236, 72, 153, 0.1)',
    message: 'Forever & Always 💕',
  },
  {
    id: 'golden-sunset',
    name: 'Golden Sunset',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800',
    border: 'border-amber-400',
    gradient: 'from-amber-500 to-orange-500',
    overlay: 'rgba(251, 191, 36, 0.1)',
    message: 'Our Perfect Moment ✨',
  },
  {
    id: 'romantic-silhouette',
    name: 'Romantic Silhouette',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800',
    border: 'border-purple-400',
    gradient: 'from-purple-500 to-pink-500',
    overlay: 'rgba(168, 85, 247, 0.1)',
    message: 'Love in the Air 💜',
  },
  {
    id: 'beach-love',
    name: 'Beach Romance',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    border: 'border-cyan-400',
    gradient: 'from-cyan-500 to-blue-500',
    overlay: 'rgba(34, 211, 238, 0.1)',
    message: 'Ocean of Love 🌊',
  },
  {
    id: 'forehead-kiss',
    name: 'Sweet Kiss',
    image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800',
    border: 'border-red-400',
    gradient: 'from-red-500 to-rose-500',
    overlay: 'rgba(239, 68, 68, 0.1)',
    message: 'Sealed with a Kiss 💋',
  },
  {
    id: 'holding-hands',
    name: 'Hand in Hand',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800',
    border: 'border-pink-400',
    gradient: 'from-pink-500 to-rose-500',
    overlay: 'rgba(236, 72, 153, 0.1)',
    message: 'Together Forever 🤝',
  },
];

// Photo filters
const filters = [
  { id: 'none', name: 'Original', style: '' },
  { id: 'warm', name: 'Warm', style: 'sepia(20%) saturate(120%) brightness(105%)' },
  { id: 'romantic', name: 'Romantic', style: 'saturate(130%) brightness(105%) contrast(95%)' },
  { id: 'dreamy', name: 'Dreamy', style: 'brightness(110%) contrast(90%) saturate(85%)' },
  { id: 'vintage', name: 'Vintage', style: 'sepia(30%) contrast(110%) brightness(95%)' },
  { id: 'bw', name: 'Classic B&W', style: 'grayscale(100%) contrast(110%)' },
];

// Full screen photo modal
const PhotoModal = ({
  frame,
  filter,
  onClose
}: {
  frame: typeof frames[0];
  filter: typeof filters[0];
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
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1a0505 0%, #2d1f3d 50%, #1a0a1a 100%)',
      }}
    >
      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: '1.5rem',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['💕', '✨', '💗', '🌟', '💖'][i % 5]}
        </motion.span>
      ))}

      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          padding: '16px',
          paddingTop: 'max(16px, env(safe-area-inset-top))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <Camera className="w-5 h-5 text-rose-400" />
          <span style={{ color: 'white', fontFamily: 'serif', fontSize: '1.1rem' }}>
            Our Photo Booth 📸
          </span>
        </motion.div>
        <motion.button
          onClick={onClose}
          style={{
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Main Photo */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', overflow: 'auto' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Frame border */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              border: '8px solid',
              borderImage: `linear-gradient(135deg, ${frame.gradient.includes('rose') ? '#f43f5e' : frame.gradient.includes('amber') ? '#f59e0b' : '#a855f7'}, ${frame.gradient.includes('pink') ? '#ec4899' : frame.gradient.includes('orange') ? '#f97316' : '#ec4899'}) 1`,
              zIndex: 10,
              pointerEvents: 'none',
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(236, 72, 153, 0.3)',
                '0 0 40px rgba(236, 72, 153, 0.5)',
                '0 0 20px rgba(236, 72, 153, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Photo */}
          <img
            src={frame.image}
            alt={frame.name}
            style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              filter: filter.style,
            }}
          />

          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, ${frame.overlay} 0%, transparent 50%)`,
            }}
          />

          {/* Message */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p style={{
              color: 'white',
              fontFamily: 'serif',
              fontSize: '1.25rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}>
              {frame.message}
            </p>
          </motion.div>
        </motion.div>

        {/* Romantic caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: '24px',
            textAlign: 'center',
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            maxWidth: '400px',
          }}
        >
          <p style={{ color: 'white', fontFamily: 'serif', lineHeight: 1.6 }}>
            "Every photo of us tells a story, and I want our story to last forever, Puntuu" 💕
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '16px', marginTop: '20px' }}
        >
          <motion.button
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              borderRadius: '9999px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" fill="white" />
            Save Memory
          </motion.button>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
};

export const PhotoBooth = () => {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [viewingPhoto, setViewingPhoto] = useState<typeof frames[0] | null>(null);

  const handleFrameClick = (index: number) => {
    setSelectedFrame(index);
    setViewingPhoto(frames[index]);
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
          className="text-4xl mb-2"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📸
        </motion.div>
        <h3 className="text-lg font-serif text-rose-300 mb-1">
          Our Photo Booth
        </h3>
        <p className="text-white/60 text-xs">
          Tap any romantic moment to see it bigger 💕
        </p>
      </motion.div>

      {/* Filter Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter, index) => (
          <motion.button
            key={filter.id}
            onClick={() => setSelectedFilter(index)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedFilter === index
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/70'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.name}
          </motion.button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3">
        {frames.map((frame, index) => (
          <motion.button
            key={frame.id}
            onClick={() => handleFrameClick(index)}
            className={`relative rounded-2xl overflow-hidden border-2 ${
              selectedFrame === index ? frame.border + ' ring-2 ring-white/50' : 'border-white/20'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={frame.image}
                alt={frame.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                style={{ filter: filters[selectedFilter].style }}
                loading="lazy"
              />
            </div>
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent`} />
            
            {/* Frame info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
              <p className="text-white font-medium text-sm">{frame.name}</p>
              <p className="text-white/70 text-xs">{frame.message}</p>
            </div>

            {/* Selection glow */}
            {selectedFrame === index && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 30px rgba(236, 72, 153, 0.3)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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
          "One day, we'll have a real photo booth full of our moments. 
          Until then, these dreams keep me going, Puntuu!" 📸💕
        </p>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {viewingPhoto && (
          <PhotoModal
            frame={viewingPhoto}
            filter={filters[selectedFilter]}
            onClose={() => setViewingPhoto(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
