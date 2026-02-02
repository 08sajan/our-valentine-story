import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, RefreshCw } from "lucide-react";
import { ScratchCard } from "./ScratchCard";

interface Fortune {
  id: number;
  category: "romantic" | "spicy" | "sweet" | "naughty";
  emoji: string;
  content: string;
  bgGradient: string;
}

const fortunes: Fortune[] = [
  // Romantic Fortunes (10)
  { id: 1, category: "romantic", emoji: "💕", content: "Tonight, I'm going to kiss every inch of your beautiful face until you fall asleep in my arms.", bgGradient: "from-rose-500 to-pink-600" },
  { id: 2, category: "romantic", emoji: "🌹", content: "I want to spend the whole night just holding you, feeling your heartbeat against mine.", bgGradient: "from-red-500 to-rose-600" },
  { id: 3, category: "romantic", emoji: "💫", content: "Let me be the one who makes you forget every bad day with just one long, deep kiss.", bgGradient: "from-purple-500 to-pink-500" },
  { id: 4, category: "romantic", emoji: "🥰", content: "I want to wake up next to you, see your messy hair, and fall in love all over again.", bgGradient: "from-pink-500 to-rose-500" },
  { id: 5, category: "romantic", emoji: "💗", content: "Your body against mine is the safest place I've ever known.", bgGradient: "from-rose-400 to-pink-500" },
  { id: 6, category: "romantic", emoji: "🌙", content: "I'll count every star in the sky, and still, my love for you will be infinite.", bgGradient: "from-indigo-500 to-purple-500" },
  { id: 7, category: "romantic", emoji: "✨", content: "Every moment without you feels like missing a part of my soul.", bgGradient: "from-pink-400 to-rose-500" },
  { id: 8, category: "romantic", emoji: "💝", content: "I want to slow dance with you in our living room at midnight, just us and the moonlight.", bgGradient: "from-rose-500 to-red-500" },
  { id: 9, category: "romantic", emoji: "🦋", content: "You give me butterflies every single time, even now.", bgGradient: "from-purple-400 to-pink-500" },
  { id: 10, category: "romantic", emoji: "💖", content: "I'm saving every kiss for you, storing them up until I can give them all at once.", bgGradient: "from-pink-500 to-purple-500" },
  
  // Sweet Fortunes (10)
  { id: 11, category: "sweet", emoji: "🍫", content: "I want to feed you chocolate while you lay on my chest watching your favorite show.", bgGradient: "from-amber-500 to-orange-500" },
  { id: 12, category: "sweet", emoji: "🧸", content: "Can we build a blanket fort tonight and just cuddle until we fall asleep?", bgGradient: "from-orange-400 to-amber-500" },
  { id: 13, category: "sweet", emoji: "☕", content: "I'll make you hot chocolate and we'll share it under the stars on our future balcony.", bgGradient: "from-yellow-500 to-amber-500" },
  { id: 14, category: "sweet", emoji: "🌸", content: "I want to braid your hair while you tell me about your day.", bgGradient: "from-pink-400 to-rose-400" },
  { id: 15, category: "sweet", emoji: "💝", content: "Let's slow dance in the kitchen at midnight with no music, just our heartbeats.", bgGradient: "from-rose-400 to-pink-400" },
  { id: 16, category: "sweet", emoji: "🎀", content: "I want to give you forehead kisses until you giggle and push me away.", bgGradient: "from-pink-300 to-rose-400" },
  { id: 17, category: "sweet", emoji: "🍰", content: "Let's bake something together and make a mess, then clean up while dancing.", bgGradient: "from-amber-400 to-orange-400" },
  { id: 18, category: "sweet", emoji: "📖", content: "I want to read to you until you fall asleep in my arms.", bgGradient: "from-indigo-400 to-purple-400" },
  { id: 19, category: "sweet", emoji: "🌻", content: "Let me be your sunshine on cloudy days, always.", bgGradient: "from-yellow-400 to-amber-400" },
  { id: 20, category: "sweet", emoji: "🫶", content: "I want to hold your hand everywhere we go, so the world knows you're mine.", bgGradient: "from-rose-400 to-pink-500" },
  
  // Spicy Fortunes (10)
  { id: 21, category: "spicy", emoji: "🔥", content: "I can't stop thinking about how your lips would taste right now.", bgGradient: "from-red-600 to-orange-500" },
  { id: 22, category: "spicy", emoji: "💋", content: "Tonight, I want to kiss you until you forget your own name.", bgGradient: "from-rose-600 to-red-600" },
  { id: 23, category: "spicy", emoji: "😈", content: "I want to whisper all the things I want to do to you while you're trying to sleep.", bgGradient: "from-purple-600 to-rose-600" },
  { id: 24, category: "spicy", emoji: "🌶️", content: "Your neck looks like it needs some attention... from my lips.", bgGradient: "from-red-500 to-pink-600" },
  { id: 25, category: "spicy", emoji: "💦", content: "I want to pin you against the wall and kiss you until we're both breathless.", bgGradient: "from-rose-600 to-purple-600" },
  { id: 26, category: "spicy", emoji: "🌡️", content: "The temperature rises every time I think about your touch.", bgGradient: "from-orange-500 to-red-600" },
  { id: 27, category: "spicy", emoji: "⚡", content: "Your touch sends electricity through my entire body.", bgGradient: "from-yellow-500 to-orange-600" },
  { id: 28, category: "spicy", emoji: "💥", content: "I want to explore every inch of you with my fingertips.", bgGradient: "from-red-500 to-rose-600" },
  { id: 29, category: "spicy", emoji: "🔮", content: "I see us getting very, very close tonight...", bgGradient: "from-purple-500 to-pink-600" },
  { id: 30, category: "spicy", emoji: "🎭", content: "Let's play a game where every wrong answer costs an article of clothing.", bgGradient: "from-rose-500 to-red-600" },
  
  // Naughty Fortunes (15)
  { id: 31, category: "naughty", emoji: "🔞", content: "I've been imagining you on your knees, looking up at me with those innocent eyes...", bgGradient: "from-purple-700 to-rose-700" },
  { id: 32, category: "naughty", emoji: "😏", content: "Tonight, I want your mouth on me until I can't take it anymore.", bgGradient: "from-red-700 to-purple-700" },
  { id: 33, category: "naughty", emoji: "🍑", content: "I'm going to worship every curve of your body with my tongue tonight.", bgGradient: "from-rose-700 to-pink-700" },
  { id: 34, category: "naughty", emoji: "💋", content: "I want to taste you... slowly... until you're begging for more.", bgGradient: "from-purple-800 to-rose-700" },
  { id: 35, category: "naughty", emoji: "🔥", content: "Let me show you exactly how I want to make love to you, starting with my lips on your thighs...", bgGradient: "from-red-800 to-purple-700" },
  { id: 36, category: "naughty", emoji: "😈", content: "I've been thinking about that thing you do with your tongue... I need it tonight.", bgGradient: "from-rose-800 to-red-700" },
  { id: 37, category: "naughty", emoji: "💦", content: "I want you to take me in your mouth while I tell you how good you make me feel.", bgGradient: "from-purple-700 to-pink-700" },
  { id: 38, category: "naughty", emoji: "🌙", content: "Tonight, we're not sleeping until we've explored every fantasy we've ever whispered about.", bgGradient: "from-indigo-700 to-purple-700" },
  { id: 39, category: "naughty", emoji: "🔞", content: "I want to feel your lips wrapped around me while I moan your name.", bgGradient: "from-red-700 to-rose-700" },
  { id: 40, category: "naughty", emoji: "💕", content: "Let's make love so passionately that the neighbors know my name.", bgGradient: "from-rose-700 to-red-700" },
  { id: 41, category: "naughty", emoji: "🥵", content: "I want you to take complete control of me tonight.", bgGradient: "from-orange-700 to-red-700" },
  { id: 42, category: "naughty", emoji: "🔗", content: "Tie me up and do whatever you want... I trust you completely.", bgGradient: "from-purple-800 to-pink-700" },
  { id: 43, category: "naughty", emoji: "👅", content: "I want to feel your tongue in places that make me scream.", bgGradient: "from-red-700 to-purple-800" },
  { id: 44, category: "naughty", emoji: "🍯", content: "Let's cover each other in something sweet and lick it all off slowly.", bgGradient: "from-amber-600 to-orange-700" },
  { id: 45, category: "naughty", emoji: "🌶️", content: "I want you to ride me until we're both exhausted and blissful.", bgGradient: "from-red-800 to-rose-700" },
];

const FortuneCard = ({ fortune, onReveal }: { fortune: Fortune; onReveal: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ type: "spring", damping: 15 }}
    className={`bg-gradient-to-br ${fortune.bgGradient} rounded-3xl p-8 text-center min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden`}
  >
    {/* Sparkle effects */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white/30 rounded-full"
        style={{
          left: `${15 + (i * 10)}%`,
          top: `${10 + ((i % 3) * 30)}%`,
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
    
    <motion.span 
      className="text-6xl mb-4"
      animate={{ 
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {fortune.emoji}
    </motion.span>
    
    <p className="text-white font-serif text-xl leading-relaxed max-w-xs">
      {fortune.content}
    </p>
    
    <motion.div 
      className="mt-6 flex gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 1.4, 1], y: [0, -8, 0] }}
          transition={{ delay: i * 0.1, duration: 1, repeat: Infinity, repeatDelay: 1 }}
          className="text-lg"
        >
          ✨
        </motion.span>
      ))}
    </motion.div>

    <motion.button
      onClick={onReveal}
      className="mt-6 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-medium flex items-center gap-2"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
      whileTap={{ scale: 0.95 }}
    >
      <RefreshCw className="w-4 h-4" />
      New Fortune
    </motion.button>
  </motion.div>
);

export const FortuneSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "romantic" | "spicy" | "sweet" | "naughty">("all");
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [fortuneKey, setFortuneKey] = useState(0);
  
  const categories = [
    { id: "all", label: "All", emoji: "✨", color: "from-pink-500 to-purple-500" },
    { id: "romantic", label: "Romantic", emoji: "💕", color: "from-rose-500 to-pink-500" },
    { id: "sweet", label: "Sweet", emoji: "🍫", color: "from-amber-500 to-orange-500" },
    { id: "spicy", label: "Spicy", emoji: "🔥", color: "from-red-500 to-orange-500" },
    { id: "naughty", label: "Naughty", emoji: "😈", color: "from-purple-600 to-rose-600" },
  ];
  
  const getRandomFortune = useCallback(() => {
    const filtered = selectedCategory === "all" 
      ? fortunes 
      : fortunes.filter(f => f.category === selectedCategory);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }, [selectedCategory]);

  const handleReveal = () => {
    const newFortune = getRandomFortune();
    setCurrentFortune(newFortune);
    setIsRevealed(true);
    setFortuneKey(prev => prev + 1);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 100]);
    }
  };

  const handleNewFortune = () => {
    setIsRevealed(false);
    setCurrentFortune(null);
    setFortuneKey(prev => prev + 1);
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
          className="inline-flex items-center gap-2 mb-3"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-amber-400" />
          <Star className="w-5 h-5 text-pink-400" />
          <Sparkles className="w-6 h-6 text-amber-400" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300">
          Fortune Cards
        </h2>
        <p className="text-rose-200/60 mt-2 text-sm">
          Scratch to reveal your intimate fortune 💕
        </p>
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id as any);
              setIsRevealed(false);
              setCurrentFortune(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-1">{cat.emoji}</span>
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Fortune Card Area */}
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {isRevealed && currentFortune ? (
            <motion.div
              key={`fortune-${fortuneKey}`}
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <FortuneCard fortune={currentFortune} onReveal={handleNewFortune} />
            </motion.div>
          ) : (
            <motion.div
              key={`scratch-${fortuneKey}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <ScratchCard
                coverText="Scratch to reveal your fortune"
                coverEmoji={selectedCategory === "naughty" ? "🔞" : selectedCategory === "spicy" ? "🔥" : "✨"}
                onReveal={handleReveal}
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-5xl mb-4"
                  >
                    🔮
                  </motion.div>
                  <p className="text-white font-serif text-lg">
                    Your fortune awaits...
                  </p>
                </div>
              </ScratchCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-rose-300/50 text-xs">
          {isRevealed ? "Tap 'New Fortune' to get another one!" : "Scratch the card above to reveal your fortune 💫"}
        </p>
      </motion.div>
    </div>
  );
};
