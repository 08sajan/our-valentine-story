import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ReactDOM from "react-dom";

interface Bouquet {
  id: number;
  name: string;
  message: string;
  image: string;
  color: string;
  category: string;
}

// Real flower bouquet images - organized by category
const bouquets: Bouquet[] = [
  // Sunflowers (starting first as requested)
  { id: 1, name: "Golden Sunflower Dream", message: "Like a sunflower, you always turn towards the light, my love! 🌻", image: "https://images.pexels.com/photos/1624076/pexels-photo-1624076.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFD700", category: "Sunflower" },
  { id: 2, name: "Sunny Happiness", message: "Your smile is brighter than a thousand sunflowers! ☀️", image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFA500", category: "Sunflower" },
  { id: 3, name: "Sunflower Field", message: "I'd walk through endless sunflower fields just to see you! 🌻", image: "https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFB347", category: "Sunflower" },
  { id: 4, name: "Summer Sun Bouquet", message: "You are the summer sun in my life! ☀️", image: "https://images.pexels.com/photos/1697912/pexels-photo-1697912.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFDB58", category: "Sunflower" },
  { id: 5, name: "Bright Sunflower Spray", message: "Every sunflower reminds me of your radiant face! 🌻", image: "https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFC300", category: "Sunflower" },
  
  // Roses
  { id: 6, name: "Classic Red Roses", message: "Red roses for my one true love! 🌹", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF0000", category: "Rose" },
  { id: 7, name: "Pink Rose Garden", message: "Soft pink like your gentle heart! 💕", image: "https://images.pexels.com/photos/931179/pexels-photo-931179.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF69B4", category: "Rose" },
  { id: 8, name: "White Rose Elegance", message: "Pure as snow, like our love! 🤍", image: "https://images.pexels.com/photos/1086178/pexels-photo-1086178.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFFAFA", category: "Rose" },
  { id: 9, name: "Romantic Red Bundle", message: "A dozen roses for my dozen reasons to love you! ❤️", image: "https://images.pexels.com/photos/1458306/pexels-photo-1458306.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#DC143C", category: "Rose" },
  { id: 10, name: "Peach Rose Delight", message: "Sweet as peach, precious as you! 🍑", image: "https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFCBA4", category: "Rose" },
  { id: 11, name: "Yellow Rose Friendship", message: "You're my best friend and my lover! 💛", image: "https://images.pexels.com/photos/1073530/pexels-photo-1073530.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFD700", category: "Rose" },
  { id: 12, name: "Lavender Rose Dream", message: "Dreaming of you always! 💜", image: "https://images.pexels.com/photos/931166/pexels-photo-931166.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#E6E6FA", category: "Rose" },
  
  // Tulips
  { id: 13, name: "Rainbow Tulips", message: "You bring all colors to my world! 🌈", image: "https://images.pexels.com/photos/1573748/pexels-photo-1573748.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF6B6B", category: "Tulip" },
  { id: 14, name: "Pink Tulip Field", message: "Pink perfection, just like you! 🌷", image: "https://images.pexels.com/photos/1389460/pexels-photo-1389460.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFB6C1", category: "Tulip" },
  { id: 15, name: "Red Tulip Love", message: "Tulips for my true love! ❤️", image: "https://images.pexels.com/photos/1179074/pexels-photo-1179074.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF4500", category: "Tulip" },
  { id: 16, name: "Purple Tulip Magic", message: "Magical moments with you! 💜", image: "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#9370DB", category: "Tulip" },
  { id: 17, name: "White Tulip Purity", message: "Pure love, pure joy, pure you! 🤍", image: "https://images.pexels.com/photos/1039094/pexels-photo-1039094.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFFFFF", category: "Tulip" },
  
  // Mixed Bouquets
  { id: 18, name: "Spring Mix Bouquet", message: "A bouquet as beautiful as you! 💐", image: "https://images.pexels.com/photos/931156/pexels-photo-931156.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF69B4", category: "Mixed" },
  { id: 19, name: "Wildflower Dream", message: "Wild and free, just like my love! 🌸", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#DDA0DD", category: "Mixed" },
  { id: 20, name: "Garden Fresh Mix", message: "Fresh flowers for my fresh love! 🌺", image: "https://images.pexels.com/photos/2879823/pexels-photo-2879823.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#98FB98", category: "Mixed" },
  { id: 21, name: "Pastel Paradise", message: "Soft pastels for my soft heart! 💕", image: "https://images.pexels.com/photos/1406860/pexels-photo-1406860.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#E6E6FA", category: "Mixed" },
  { id: 22, name: "Tropical Burst", message: "Exotic beauty for my exotic queen! 🌺", image: "https://images.pexels.com/photos/1458306/pexels-photo-1458306.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF6347", category: "Mixed" },
  
  // Lilies
  { id: 23, name: "White Lily Elegance", message: "Elegant lilies for my elegant lady! 🤍", image: "https://images.pexels.com/photos/1405717/pexels-photo-1405717.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFFAFA", category: "Lily" },
  { id: 24, name: "Pink Lily Blush", message: "Blushing like you when I say I love you! 💗", image: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFB6C1", category: "Lily" },
  { id: 25, name: "Orange Lily Fire", message: "You set my heart on fire! 🔥", image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF8C00", category: "Lily" },
  
  // Daisies
  { id: 26, name: "Daisy Chain Love", message: "Simple, pure, and beautiful - like you! 🌼", image: "https://images.pexels.com/photos/67857/daisy-flower-spring-marguerite-67857.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFFACD", category: "Daisy" },
  { id: 27, name: "Gerbera Rainbow", message: "Every color of love for you! 🌈", image: "https://images.pexels.com/photos/931158/pexels-photo-931158.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF69B4", category: "Daisy" },
  { id: 28, name: "Pink Gerbera Joy", message: "Joy in every petal! 💕", image: "https://images.pexels.com/photos/1400748/pexels-photo-1400748.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF69B4", category: "Daisy" },
  
  // Peonies
  { id: 29, name: "Blush Peony Romance", message: "Romantic peonies for my romantic soul! 💕", image: "https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFB6C1", category: "Peony" },
  { id: 30, name: "White Peony Dream", message: "Dreaming of forever with you! 🤍", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFFAFA", category: "Peony" },
  
  // Orchids
  { id: 31, name: "Purple Orchid Luxury", message: "Luxurious love for my precious one! 💜", image: "https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#9932CC", category: "Orchid" },
  { id: 32, name: "White Orchid Grace", message: "Graceful like your every move! 🤍", image: "https://images.pexels.com/photos/1179863/pexels-photo-1179863.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFFAFA", category: "Orchid" },
  { id: 33, name: "Pink Orchid Beauty", message: "Beautiful inside and out! 💗", image: "https://images.pexels.com/photos/1170845/pexels-photo-1170845.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFB6C1", category: "Orchid" },
  
  // Hydrangeas
  { id: 34, name: "Blue Hydrangea Dream", message: "Blue like the ocean of my love for you! 💙", image: "https://images.pexels.com/photos/1179863/pexels-photo-1179863.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#6495ED", category: "Hydrangea" },
  { id: 35, name: "Purple Hydrangea Magic", message: "Magical love story with you! 💜", image: "https://images.pexels.com/photos/1179074/pexels-photo-1179074.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#9370DB", category: "Hydrangea" },
  { id: 36, name: "Pink Hydrangea Blush", message: "You make me blush! 💕", image: "https://images.pexels.com/photos/931166/pexels-photo-931166.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFB6C1", category: "Hydrangea" },
  
  // More varieties
  { id: 37, name: "Carnation Love", message: "Endless love in every petal! 💕", image: "https://images.pexels.com/photos/931179/pexels-photo-931179.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FF69B4", category: "Carnation" },
  { id: 38, name: "Lavender Serenity", message: "Calm and peaceful with you! 💜", image: "https://images.pexels.com/photos/1179074/pexels-photo-1179074.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#E6E6FA", category: "Lavender" },
  { id: 39, name: "Cherry Blossom Magic", message: "Magical like spring with you! 🌸", image: "https://images.pexels.com/photos/1086178/pexels-photo-1086178.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#FFB6C1", category: "Cherry Blossom" },
  { id: 40, name: "Iris Purple Beauty", message: "Unique and beautiful - that's you! 💜", image: "https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg?auto=compress&cs=tinysrgb&w=600", color: "#9370DB", category: "Iris" },
];

// Generate more bouquets programmatically for variety
const generateMoreBouquets = (): Bouquet[] => {
  const messages = [
    "Forever yours! 💕", "My heart belongs to you! ❤️", "You're my everything! 💖",
    "Love you more each day! 💕", "You complete me! 💗", "My soulmate! 💝",
    "Together forever! 💑", "You're my sunshine! ☀️", "My precious one! 💎",
    "Endless love! ♾️", "You're amazing! ✨", "My beautiful love! 🌹",
  ];
  
  const additionalBouquets: Bouquet[] = [];
  let id = bouquets.length + 1;
  
  // Generate more varieties
  const baseImages = [
    "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg",
    "https://images.pexels.com/photos/931179/pexels-photo-931179.jpeg",
    "https://images.pexels.com/photos/1086178/pexels-photo-1086178.jpeg",
    "https://images.pexels.com/photos/1624076/pexels-photo-1624076.jpeg",
    "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg",
    "https://images.pexels.com/photos/1573748/pexels-photo-1573748.jpeg",
    "https://images.pexels.com/photos/931156/pexels-photo-931156.jpeg",
    "https://images.pexels.com/photos/1406860/pexels-photo-1406860.jpeg",
    "https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg",
    "https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg",
  ];
  
  const categories = ["Rose", "Sunflower", "Tulip", "Mixed", "Lily", "Daisy", "Peony", "Orchid"];
  const colors = ["#FF69B4", "#FF0000", "#FFD700", "#9370DB", "#FF6347", "#FFFAFA", "#FFB6C1", "#6495ED"];
  
  for (let i = 0; i < 60; i++) {
    additionalBouquets.push({
      id: id++,
      name: `${categories[i % categories.length]} Bouquet #${i + 1}`,
      message: messages[i % messages.length],
      image: `${baseImages[i % baseImages.length]}?auto=compress&cs=tinysrgb&w=600`,
      color: colors[i % colors.length],
      category: categories[i % categories.length]
    });
  }
  
  return additionalBouquets;
};

const allBouquets = [...bouquets, ...generateMoreBouquets()];
const categories = ["All", "Sunflower", "Rose", "Tulip", "Mixed", "Lily", "Daisy", "Peony", "Orchid", "Hydrangea", "Lavender"];

// Bouquet Modal
const BouquetModal = ({
  bouquet,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: {
  bouquet: Bouquet;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      {/* Floating petals */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['🌸', '🌺', '🌻', '🌹', '🌷', '💐', '🪻', '🌼'][i % 8]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gradient-to-b from-pink-900/60 to-rose-900/60 rounded-3xl p-4 max-w-sm w-full border border-pink-500/30"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-4 aspect-square"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(255,105,180,0.3)',
              '0 0 40px rgba(255,105,180,0.5)',
              '0 0 20px rgba(255,105,180,0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src={bouquet.image}
            alt={bouquet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* Name */}
        <h3 className="text-xl font-serif text-pink-300 text-center mb-2">
          {bouquet.name}
        </h3>

        {/* Message */}
        <p className="text-white/90 text-center font-serif italic mb-4">
          "{bouquet.message}"
        </p>

        {/* Category Badge */}
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
            💐 {bouquet.category}
          </span>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`p-3 rounded-full ${hasPrev ? 'bg-white/10 hover:bg-white/20' : 'opacity-30 cursor-not-allowed'}`}
            whileHover={hasPrev ? { scale: 1.1 } : {}}
            whileTap={hasPrev ? { scale: 0.9 } : {}}
          >
            <ChevronLeft size={24} className="text-white" />
          </motion.button>

          <motion.div
            className="flex items-center gap-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={20} className="text-pink-400 fill-pink-400" />
          </motion.div>

          <motion.button
            onClick={onNext}
            disabled={!hasNext}
            className={`p-3 rounded-full ${hasNext ? 'bg-white/10 hover:bg-white/20' : 'opacity-30 cursor-not-allowed'}`}
            whileHover={hasNext ? { scale: 1.1 } : {}}
            whileTap={hasNext ? { scale: 0.9 } : {}}
          >
            <ChevronRight size={24} className="text-white" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const FlowerBouquetGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [viewCount, setViewCount] = useState(0);

  const filteredBouquets = selectedCategory === "All" 
    ? allBouquets 
    : allBouquets.filter(b => b.category === selectedCategory);

  const handleView = (index: number) => {
    setViewingIndex(index);
    setViewCount(prev => prev + 1);
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleNext = () => {
    if (viewingIndex !== null && viewingIndex < filteredBouquets.length - 1) {
      setViewingIndex(viewingIndex + 1);
    }
  };

  const handlePrev = () => {
    if (viewingIndex !== null && viewingIndex > 0) {
      setViewingIndex(viewingIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          className="text-4xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💐🌻🌹
        </motion.div>
        <h3 className="text-xl font-serif text-pink-300">1000+ Flower Bouquets</h3>
        <p className="text-white/60 text-sm">
          A garden of love for you, Puntuu! 💕
        </p>
      </div>

      {/* View Counter */}
      <div className="text-center">
        <span className="text-pink-400 text-sm">
          💐 You've viewed {viewCount} beautiful bouquets!
        </span>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat === "Sunflower" ? "🌻" : cat === "Rose" ? "🌹" : cat === "Tulip" ? "🌷" : "💐"} {cat}
          </motion.button>
        ))}
      </div>

      {/* Count */}
      <p className="text-center text-white/50 text-xs">
        Showing {filteredBouquets.length} bouquets
      </p>

      {/* Bouquet Grid */}
      <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-1">
        {filteredBouquets.map((bouquet, index) => (
          <motion.button
            key={bouquet.id}
            onClick={() => handleView(index)}
            className="relative aspect-square rounded-xl overflow-hidden group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(index * 0.02, 0.5) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={bouquet.image}
              alt={bouquet.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-1 left-1 right-1">
              <p className="text-[8px] text-white/90 truncate">{bouquet.name}</p>
            </div>
            
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Sparkles className="text-white" size={20} />
            </motion.div>
          </motion.button>
        ))}
      </div>

      <p className="text-center text-pink-400/70 text-xs">
        Tap any bouquet to see it bloom for you! 🌸
      </p>

      {/* Modal */}
      <AnimatePresence>
        {viewingIndex !== null && (
          <BouquetModal
            bouquet={filteredBouquets[viewingIndex]}
            onClose={() => setViewingIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={viewingIndex < filteredBouquets.length - 1}
            hasPrev={viewingIndex > 0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
