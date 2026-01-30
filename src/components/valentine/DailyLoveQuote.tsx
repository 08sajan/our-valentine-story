import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Quote } from "lucide-react";

const loveQuotes = [
  { quote: "You are my today and all of my tomorrows.", author: "Leo Christopher", emoji: "💕" },
  { quote: "In all the world, there is no heart for me like yours.", author: "Maya Angelou", emoji: "💖" },
  { quote: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft", emoji: "🥰" },
  { quote: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", author: "F. Scott Fitzgerald", emoji: "✨" },
  { quote: "If I know what love is, it is because of you.", author: "Hermann Hesse", emoji: "💗" },
  { quote: "My soul and your soul are forever tangled.", author: "N.R. Hart", emoji: "🌹" },
  { quote: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.", author: "Angelita Lim", emoji: "💝" },
  { quote: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë", emoji: "💓" },
  { quote: "I would rather spend one lifetime with you, than face all the ages of this world alone.", author: "J.R.R. Tolkien", emoji: "💍" },
  { quote: "You are my heart, my life, my one and only thought.", author: "Arthur Conan Doyle", emoji: "❤️" },
  { quote: "I have found the one whom my soul loves.", author: "Song of Solomon", emoji: "🌸" },
  { quote: "I fell in love the way you fall asleep: slowly, and then all at once.", author: "John Green", emoji: "😴💕" },
  { quote: "You are the source of my joy, the center of my world and the whole of my heart.", author: "Unknown", emoji: "🌟" },
  { quote: "Every love story is beautiful, but ours is my favorite.", author: "Unknown", emoji: "📖💕" },
  { quote: "I choose you. And I'll choose you over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.", author: "Unknown", emoji: "💘" },
  { quote: "You are my sun, my moon, and all my stars.", author: "E.E. Cummings", emoji: "🌙⭐" },
  { quote: "I love you more than I have ever found a way to say to you.", author: "Ben Folds", emoji: "💬💕" },
  { quote: "To love and be loved is to feel the sun from both sides.", author: "David Viscott", emoji: "☀️" },
  { quote: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", emoji: "🤗" },
  { quote: "You make my heart smile.", author: "Unknown", emoji: "😊💖" },
  { quote: "I need you like a heart needs a beat.", author: "Unknown", emoji: "💓" },
  { quote: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu", emoji: "💪💕" },
  { quote: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.", author: "Unknown", emoji: "📅💕" },
  { quote: "You're the closest to heaven that I'll ever be.", author: "Goo Goo Dolls", emoji: "👼" },
  { quote: "I love you to the moon and back.", author: "Unknown", emoji: "🌙🚀" },
  { quote: "You are the last thought in my mind before I drift off to sleep and the first thought when I wake up each morning.", author: "Unknown", emoji: "💤💕" },
  { quote: "My love for you is a journey, starting at forever and ending at never.", author: "Unknown", emoji: "🛤️💕" },
  { quote: "I want all of you, forever, every day.", author: "Nicholas Sparks", emoji: "♾️" },
  { quote: "You had me at hello.", author: "Jerry Maguire", emoji: "👋💕" },
  { quote: "I am who I am because of you. You are every reason, every hope, and every dream I've ever had.", author: "Nicholas Sparks", emoji: "🌈" },
];

const STORAGE_KEY = "puntuu-last-quote-date";

export const DailyLoveQuote = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState<typeof loveQuotes[0] | null>(null);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem(STORAGE_KEY);
    
    // Show quote if it hasn't been shown today
    if (lastShown !== today) {
      // Get quote based on day of year for consistency
      const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
      );
      const quoteIndex = dayOfYear % loveQuotes.length;
      setQuote(loveQuotes[quoteIndex]);
      
      // Delay showing for a smooth entrance after page load
      setTimeout(() => {
        setIsVisible(true);
        setShowHearts(true);
      }, 800);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 20, 30]);
    }
  };

  if (!quote) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Floating Hearts Background */}
          {showHearts && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: '-10%',
                  }}
                  animate={{
                    y: [0, -window.innerHeight * 1.2],
                    x: [0, Math.sin(i) * 50],
                    rotate: [0, 360],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  {['💕', '💖', '💗', '💓', '❤️', '🌹', '✨'][i % 7]}
                </motion.div>
              ))}
            </div>
          )}

          {/* Sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* Quote Card */}
          <motion.div
            className="relative max-w-md w-full"
            initial={{ scale: 0.5, opacity: 0, y: 50, rotateX: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.2 
            }}
          >
            {/* Glowing rings */}
            <motion.div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-red-500/30 blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-rose-400/20 blur-md"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />

            {/* Card */}
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-rose-900/90 via-pink-900/90 to-purple-900/90 border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />

              {/* Close button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center gap-2 mb-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
                <motion.h2
                  className="text-xl font-serif bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Today's Love Note 💌
                </motion.h2>
                <p className="text-white/50 text-xs mt-1">
                  A special message for my Puntuu
                </p>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-pink-400/30" />
                <motion.p
                  className="text-white/90 font-serif text-lg text-center leading-relaxed italic px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  "{quote.quote}"
                </motion.p>
                <Quote className="absolute -bottom-2 -right-2 w-8 h-8 text-pink-400/30 rotate-180" />
              </div>

              {/* Author */}
              <motion.p
                className="text-center text-pink-300/70 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                — {quote.author}
              </motion.p>

              {/* Emoji */}
              <motion.div
                className="text-center text-4xl mt-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {quote.emoji}
              </motion.div>

              {/* CTA */}
              <motion.button
                onClick={handleClose}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Our Day Together
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    💕
                  </motion.span>
                </span>
              </motion.button>

              {/* Footer note */}
              <p className="text-center text-white/30 text-xs mt-4">
                ✨ New quote every day ✨
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
