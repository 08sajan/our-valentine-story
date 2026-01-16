import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TeddyItem {
  emoji: string;
  name: string;
  message: string;
}

const teddies: TeddyItem[] = [
  { emoji: "🧸", name: "Mr. Cuddly", message: "For cozy night hugs" },
  { emoji: "🐻", name: "Honey Bear", message: "As sweet as you" },
  { emoji: "🐻‍❄️", name: "Snow Bear", message: "For cold winter nights" },
  { emoji: "🧸", name: "Dream Keeper", message: "Guards your sleep" },
  { emoji: "🐨", name: "Koala Cutie", message: "Never lets go" },
  { emoji: "🐼", name: "Panda Love", message: "Black, white & loved all over" },
];

export const TeddyGallery = () => {
  const [selectedTeddy, setSelectedTeddy] = useState<number | null>(null);
  const [hugCount, setHugCount] = useState(0);

  const handleHug = (index: number) => {
    setSelectedTeddy(index);
    setHugCount(prev => prev + 1);
    
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
        <span className="text-amber-600 font-medium">
          💕 You've sent {hugCount} virtual hugs!
        </span>
      </motion.div>

      {/* Teddy Grid */}
      <div className="grid grid-cols-3 gap-4">
        {teddies.map((teddy, index) => (
          <motion.button
            key={index}
            onClick={() => handleHug(index)}
            className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.span
              className="text-5xl block"
              animate={selectedTeddy === index ? { 
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, 0]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {teddy.emoji}
            </motion.span>
            <p className="text-xs text-amber-700 mt-2 font-medium">{teddy.name}</p>
            
            {/* Hug animation */}
            <AnimatePresence>
              {selectedTeddy === index && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-xl"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.5],
                        opacity: [1, 0],
                        x: Math.cos(i * 72 * Math.PI / 180) * 50,
                        y: Math.sin(i * 72 * Math.PI / 180) * 50,
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      💕
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Selected Teddy Message */}
      <AnimatePresence mode="wait">
        {selectedTeddy !== null && (
          <motion.div
            key={selectedTeddy}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4"
          >
            <p className="text-amber-700 font-serif italic">
              "{teddies[selectedTeddy].message}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
