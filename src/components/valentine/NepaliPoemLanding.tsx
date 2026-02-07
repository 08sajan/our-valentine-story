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
    setTimeout(onEnter, 800);
  };

  const poemLines = [
    "अब तिमीलाई भनौँ कसरी म तिमी कस्ती छौ।",
    "बानी व्यवराको कुरा गरुम् भने सबैभन्दा ज्ञानी छौ।",
    "नयनको कुरा गरुम् भने मलाई डुबाएर मार्ने खालकी छौ।",
    "बोलिको कुरा गरुम् भने घाँटीमा कोइलीलाई बास दिएकी छौ।",
    "",
    "केशको त झन के कुरा त्यो केस फिँजाउदा मन लोभ्याउने खालकी छौ।",
    "हेर्दामा धेरै नबोल्ने खालकी भएपनि मनले चन्चले स्वभावकी छौ।",
    "",
    "निधारमा कालो टिका लगाउँदा विश्व सुन्दरी देखिएकी छौ।",
    "सबै कुरा बुझ्दा बुझ्दै पनि नबुझेको नाटक पार्नमा उत्कृष्ट छौ।",
    "",
    "तिमी मेरो छेउमा नहुँदा मलाई शून्यता अनुभव गराउने खालकी छौ।",
    "मैले भगवानलाई आफ्नो लागि मागेको जीवनसंगिनी जस्ती छौ।",
    "",
    "रूपको कुरा गरुम् भने फूलभन्दा बढी मनमोहक छौ।",
    "सुन्दरताको कुरा गरुम् भने चन्द्रमा भन्दा राम्री छौ।",
    "",
    "चन्द्रमा जस्तो राम्रीमात्र हैन् मबाट चन्द्रमा जतिकै टाढा छौ।",
    "अब तिम्रो अरु के कुरा गर्नु तिमी छेउमा हुँदा मलाई स्वर्गको अनुभव दिलाउने खालकी छौ। 💕"
  ];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 overflow-y-auto"
          style={{
            minHeight: '100dvh',
            width: '100vw',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle Stars Background - CSS only */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3 + Math.random() * 0.4,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Floating Hearts - reduced count */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-lg opacity-15"
                style={{ left: `${15 + i * 18}%` }}
                initial={{ y: "100vh" }}
                animate={{ y: "-10vh" }}
                transition={{
                  duration: 18 + i * 3,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear",
                }}
              >
                💕
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div 
            className="relative z-10 flex flex-col items-center justify-center px-4 py-8"
            style={{ minHeight: '100dvh' }}
          >
            {/* Title */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                <Sparkles className="w-5 h-5 text-pink-400" />
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
              </motion.div>
              <h1 className="text-2xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300">
                For My Dearest Puntuu
              </h1>
              <p className="text-rose-300/60 mt-1 text-sm font-serif italic">
                A Valentine's Week Journey of Love 💕
              </p>
            </motion.div>

            {/* Highlighted Quote */}
            <motion.div
              className="mb-6 px-6 py-4 rounded-2xl backdrop-blur-xl max-w-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255,100,150,0.25), rgba(200,100,200,0.15))',
                border: '1px solid rgba(255,182,193,0.4)',
                boxShadow: '0 8px 32px rgba(255,100,150,0.2)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.p
                className="text-lg md:text-xl font-serif text-center leading-relaxed"
                style={{
                  background: 'linear-gradient(to right, #fda4af, #f9a8d4, #c4b5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                animate={{ 
                  textShadow: ['0 0 20px rgba(255,100,150,0.5)', '0 0 40px rgba(255,100,150,0.8)', '0 0 20px rgba(255,100,150,0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                "I do not expect you to love me.<br/>
                I expect myself to keep loving you."
              </motion.p>
              <motion.div 
                className="flex justify-center mt-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-xl">💖</span>
              </motion.div>
            </motion.div>

            {/* Nepali Poem */}
            <motion.div
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl mb-6 max-w-lg w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="text-2xl mb-3 text-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📜✨
              </motion.div>

              <div className="space-y-1 text-rose-200 font-serif text-center">
                {poemLines.map((line, index) => (
              <motion.p
                    key={index}
                    className={`text-sm md:text-base ${line === '' ? 'h-2' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Enter Button - Appears quickly */}
            <motion.button
              onClick={handleEnter}
              className="relative group px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full text-white font-serif text-lg shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
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
              className="text-rose-300/40 text-xs mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              ✨ 7 Days • 7 Surprises • 1 Forever Love ✨
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
