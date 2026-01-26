import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { ScratchCard } from "./ScratchCard";

interface Fortune {
  id: number;
  category: "romantic" | "spicy" | "sweet" | "naughty";
  emoji: string;
  content: string;
  bgGradient: string;
}

const fortunes: Fortune[] = [
  // Romantic Fortunes
  { id: 1, category: "romantic", emoji: "💕", content: "Tonight, I'm going to kiss every inch of your beautiful face until you fall asleep in my arms.", bgGradient: "from-rose-500 to-pink-600" },
  { id: 2, category: "romantic", emoji: "🌹", content: "I want to spend the whole night just holding you, feeling your heartbeat against mine.", bgGradient: "from-red-500 to-rose-600" },
  { id: 3, category: "romantic", emoji: "💫", content: "Let me be the one who makes you forget every bad day with just one long, deep kiss.", bgGradient: "from-purple-500 to-pink-500" },
  { id: 4, category: "romantic", emoji: "🥰", content: "I want to wake up next to you, see your messy hair, and fall in love all over again.", bgGradient: "from-pink-500 to-rose-500" },
  { id: 5, category: "romantic", emoji: "💗", content: "Your body against mine is the safest place I've ever known.", bgGradient: "from-rose-400 to-pink-500" },
  
  // Sweet Fortunes
  { id: 6, category: "sweet", emoji: "🍫", content: "I want to feed you chocolate while you lay on my chest watching your favorite show.", bgGradient: "from-amber-500 to-orange-500" },
  { id: 7, category: "sweet", emoji: "🧸", content: "Can we build a blanket fort tonight and just cuddle until we fall asleep?", bgGradient: "from-orange-400 to-amber-500" },
  { id: 8, category: "sweet", emoji: "☕", content: "I'll make you hot chocolate and we'll share it under the stars on our future balcony.", bgGradient: "from-yellow-500 to-amber-500" },
  { id: 9, category: "sweet", emoji: "🌸", content: "I want to braid your hair while you tell me about your day.", bgGradient: "from-pink-400 to-rose-400" },
  { id: 10, category: "sweet", emoji: "💝", content: "Let's slow dance in the kitchen at midnight with no music, just our heartbeats.", bgGradient: "from-rose-400 to-pink-400" },
  
  // Spicy Fortunes
  { id: 11, category: "spicy", emoji: "🔥", content: "I can't stop thinking about how your lips would taste right now.", bgGradient: "from-red-600 to-orange-500" },
  { id: 12, category: "spicy", emoji: "💋", content: "Tonight, I want to kiss you until you forget your own name.", bgGradient: "from-rose-600 to-red-600" },
  { id: 13, category: "spicy", emoji: "😈", content: "I want to whisper all the things I want to do to you while you're trying to sleep.", bgGradient: "from-purple-600 to-rose-600" },
  { id: 14, category: "spicy", emoji: "🌶️", content: "Your neck looks like it needs some attention... from my lips.", bgGradient: "from-red-500 to-pink-600" },
  { id: 15, category: "spicy", emoji: "💦", content: "I want to pin you against the wall and kiss you until we're both breathless.", bgGradient: "from-rose-600 to-purple-600" },
  
  // Naughty Fortunes
  { id: 16, category: "naughty", emoji: "🔞", content: "I've been imagining you on your knees, looking up at me with those innocent eyes...", bgGradient: "from-purple-700 to-rose-700" },
  { id: 17, category: "naughty", emoji: "😏", content: "Tonight, I want your mouth on me until I can't take it anymore.", bgGradient: "from-red-700 to-purple-700" },
  { id: 18, category: "naughty", emoji: "🍑", content: "I'm going to worship every curve of your body with my tongue tonight.", bgGradient: "from-rose-700 to-pink-700" },
  { id: 19, category: "naughty", emoji: "💋", content: "I want to taste you... slowly... until you're begging for more.", bgGradient: "from-purple-800 to-rose-700" },
  { id: 20, category: "naughty", emoji: "🔥", content: "Let me show you exactly how I want to make love to you, starting with my lips on your thighs...", bgGradient: "from-red-800 to-purple-700" },
  { id: 21, category: "naughty", emoji: "😈", content: "I've been thinking about that thing you do with your tongue... I need it tonight.", bgGradient: "from-rose-800 to-red-700" },
  { id: 22, category: "naughty", emoji: "💦", content: "I want you to take me in your mouth while I tell you how good you make me feel.", bgGradient: "from-purple-700 to-pink-700" },
  { id: 23, category: "naughty", emoji: "🌙", content: "Tonight, we're not sleeping until we've explored every fantasy we've ever whispered about.", bgGradient: "from-indigo-700 to-purple-700" },
  { id: 24, category: "naughty", emoji: "🔞", content: "I want to feel your lips wrapped around me while I moan your name.", bgGradient: "from-red-700 to-rose-700" },
  { id: 25, category: "naughty", emoji: "💕", content: "Let's make love so passionately that the neighbors know my name.", bgGradient: "from-rose-700 to-red-700" },
];

const FortuneCard = ({ fortune }: { fortune: Fortune }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`bg-gradient-to-br ${fortune.bgGradient} rounded-xl p-5 text-center min-h-[160px] flex flex-col items-center justify-center`}
  >
    <motion.span 
      className="text-4xl mb-3"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {fortune.emoji}
    </motion.span>
    <p className="text-white font-serif text-lg leading-relaxed">
      {fortune.content}
    </p>
    <motion.div 
      className="mt-3 flex gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          ✨
        </motion.span>
      ))}
    </motion.div>
  </motion.div>
);

export const FortuneSection = () => {
  const [revealedFortunes, setRevealedFortunes] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "romantic" | "spicy" | "sweet" | "naughty">("all");
  
  const categories = [
    { id: "all", label: "All", emoji: "✨", color: "from-pink-500 to-purple-500" },
    { id: "romantic", label: "Romantic", emoji: "💕", color: "from-rose-500 to-pink-500" },
    { id: "sweet", label: "Sweet", emoji: "🍫", color: "from-amber-500 to-orange-500" },
    { id: "spicy", label: "Spicy", emoji: "🔥", color: "from-red-500 to-orange-500" },
    { id: "naughty", label: "Naughty", emoji: "😈", color: "from-purple-600 to-rose-600" },
  ];
  
  const filteredFortunes = selectedCategory === "all" 
    ? fortunes 
    : fortunes.filter(f => f.category === selectedCategory);

  const handleReveal = (id: number) => {
    if (!revealedFortunes.includes(id)) {
      setRevealedFortunes(prev => [...prev, id]);
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
            onClick={() => setSelectedCategory(cat.id as any)}
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

      {/* Fortune Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredFortunes.map((fortune) => (
            <motion.div
              key={fortune.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {revealedFortunes.includes(fortune.id) ? (
                <FortuneCard fortune={fortune} />
              ) : (
                <ScratchCard
                  coverText="Scratch to reveal"
                  coverEmoji={fortune.category === "naughty" ? "🔞" : fortune.category === "spicy" ? "🔥" : "✨"}
                  onReveal={() => handleReveal(fortune.id)}
                >
                  <FortuneCard fortune={fortune} />
                </ScratchCard>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <motion.div 
        className="text-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-rose-300/60 text-sm">
          Revealed: {revealedFortunes.length} / {fortunes.length} fortunes
        </p>
        <div className="flex justify-center gap-1 mt-2">
          {fortunes.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                revealedFortunes.includes(i + 1) ? "bg-pink-500" : "bg-white/20"
              }`}
              animate={revealedFortunes.includes(i + 1) ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
