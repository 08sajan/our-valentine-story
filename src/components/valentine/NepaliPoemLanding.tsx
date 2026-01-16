import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ChevronRight } from "lucide-react";

interface NepaliPoemLandingProps {
  onEnter: () => void;
}

export const NepaliPoemLanding = ({ onEnter }: NepaliPoemLandingProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 1000);
  };

  const nepaliPoem = `तिम्रो मुस्कान देख्दा मेरो मन,
फूल्छ जसरी फूल्छ बसन्त।
तिमी बिना यो जीवन सुन्य छ,
तिमीसँग मात्र पूर्ण छ।

म तिम्रो हो, तिमी मेरो हौ,
यो माया कहिल्यै टुट्दैन।
हरेक सास र हरेक धड्कनमा,
तिम्रो नाम मात्र गुन्जिन्छ।

पुन्टुउ, मेरो प्यारो,
तिमी मेरो सबैकुरा हौ।
यो प्रेम अनन्त छ,
सदाको लागि तिम्रो छु म।`;

  const poemLines = nepaliPoem.split('\n');

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated Stars Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ y: "100vh", rotate: 0 }}
                animate={{ y: "-100vh", rotate: 360 }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                💕
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            className="relative z-10 max-w-2xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
                <Sparkles className="w-6 h-6 text-pink-400" />
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300">
                For My Dearest Puntuu
              </h1>
              <p className="text-rose-300/70 mt-2 font-serif italic">
                A Valentine's Week Journey of Love 💕
              </p>
            </motion.div>

            {/* Nepali Poem */}
            <motion.div
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
              
              <motion.div
                className="text-3xl mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📜✨
              </motion.div>

              <div className="space-y-3 text-rose-200 font-serif">
                {poemLines.map((line, index) => (
                  <motion.p
                    key={index}
                    className={`text-lg md:text-xl ${line === '' ? 'h-2' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.15 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Enter Button */}
            <motion.button
              onClick={handleEnter}
              className="relative group px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full text-white font-serif text-xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <span className="relative flex items-center gap-2">
                Begin Our Journey
                <ChevronRight className="w-5 h-5" />
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💕
                </motion.span>
              </span>
            </motion.button>

            {/* Hint */}
            <motion.p
              className="text-rose-300/50 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
            >
              ✨ 7 Days • 7 Surprises • 1 Forever Love ✨
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
