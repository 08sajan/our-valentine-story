import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Letter {
  id: number;
  sealColor: string;
  title: string;
  content: string;
}

const letters: Letter[] = [
  {
    id: 1,
    sealColor: "from-red-500 to-rose-600",
    title: "The First Time I Saw You",
    content: "The moment I saw you, Puntuu, everything else faded away. You weren't just beautiful—you were magnetic. I knew right then that you were going to change my life forever."
  },
  {
    id: 2,
    sealColor: "from-pink-500 to-rose-500",
    title: "Your Laugh",
    content: "Your laugh is my favorite sound in the entire world. It's like music that makes everything better. Every time you laugh, I fall in love with you all over again, Puntuu."
  },
  {
    id: 3,
    sealColor: "from-purple-500 to-pink-500",
    title: "Late Night Calls",
    content: "Those late night video calls when we're both sleepy but neither wants to hang up—those are my favorite moments. Watching you fall asleep on call makes me feel like I'm home."
  },
  {
    id: 4,
    sealColor: "from-rose-500 to-red-500",
    title: "Your Smile",
    content: "When you smile at me, Puntuu, the whole world stops. That smile has the power to fix my worst days and make my best days even better. Never stop smiling for me."
  },
  {
    id: 5,
    sealColor: "from-amber-500 to-rose-500",
    title: "The Little Things",
    content: "I love the way you eat, the way you get excited about little things, the way you care about everyone. Every little quirk of yours makes me love you more."
  },
  {
    id: 6,
    sealColor: "from-pink-600 to-purple-500",
    title: "Missing You",
    content: "Every second without you feels incomplete. When we're apart, you're all I think about. You've become my favorite thought, my constant daydream, my beautiful obsession."
  },
  {
    id: 7,
    sealColor: "from-red-600 to-pink-600",
    title: "Our Future",
    content: "I dream about our future together, Puntuu. Waking up next to you, building a home with you, growing old with you. Every dream I have starts and ends with you."
  },
  {
    id: 8,
    sealColor: "from-rose-600 to-amber-500",
    title: "Your Strength",
    content: "You're so much stronger than you know. The way you handle everything with grace amazes me. I'm so proud to be yours, and I'll always be here to support you."
  },
  {
    id: 9,
    sealColor: "from-purple-600 to-rose-500",
    title: "My Best Friend",
    content: "You're not just my love—you're my best friend. I can tell you anything, laugh with you about everything, and be completely myself. Thank you for being my person."
  },
  {
    id: 10,
    sealColor: "from-red-500 to-pink-600",
    title: "Forever Yours",
    content: "No matter what happens, no matter where life takes us, I will always be yours. You are my today, my tomorrow, and all of my tomorrows. I love you, Puntuu. Forever and always. 💕"
  }
];

export const LetterGallery = () => {
  const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null);

  const openLetter = (letter: Letter) => {
    setCurrentLetter(letter);
    setOpenedLetters(prev => new Set([...prev, letter.id]));
    
    // Vibrate on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([100]);
    }
  };

  const closeLetter = () => {
    setCurrentLetter(null);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="text-center">
        <p className="text-rose-600 font-medium">
          💌 {openedLetters.size}/{letters.length} letters opened
        </p>
      </div>

      {/* Envelope Grid */}
      <div className="grid grid-cols-5 gap-3">
        {letters.map((letter, index) => (
          <motion.button
            key={letter.id}
            onClick={() => openLetter(letter)}
            className="relative aspect-square"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Envelope */}
            <div className={`w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden ${openedLetters.has(letter.id) ? 'opacity-60' : ''}`}>
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0 h-1/2">
                <div className="absolute top-0 left-0 right-0 border-l-[25px] border-r-[25px] border-t-[20px] border-l-transparent border-r-transparent border-t-amber-200" />
              </div>
              
              {/* Wax seal */}
              <motion.div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${letter.sealColor} shadow-md flex items-center justify-center z-10`}
                animate={!openedLetters.has(letter.id) ? { 
                  scale: [1, 1.1, 1],
                  boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.4)", "0 0 0 8px rgba(239, 68, 68, 0)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">
                  {openedLetters.has(letter.id) ? "✓" : letter.id}
                </span>
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {currentLetter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLetter}
          >
            <motion.div
              className="bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
              initial={{ scale: 0.5, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 90 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative seal */}
              <motion.div
                className={`absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${currentLetter.sealColor} shadow-lg flex items-center justify-center`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white text-xl">💕</span>
              </motion.div>

              {/* Letter content */}
              <motion.div
                className="mt-4 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-serif text-rose-700 text-center">
                  {currentLetter.title}
                </h3>
                
                <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                
                <p className="text-gray-700 font-serif leading-relaxed text-center">
                  {currentLetter.content}
                </p>
                
                <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                
                <p className="text-right text-rose-500 font-serif italic">
                  With all my love ❤️
                </p>
              </motion.div>

              {/* Close hint */}
              <motion.p
                className="text-center text-gray-400 text-xs mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Tap anywhere to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
