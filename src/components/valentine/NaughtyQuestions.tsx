import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flame, Sparkles, RefreshCw } from "lucide-react";

interface Question {
  question: string;
  intensity: 'mild' | 'medium' | 'spicy' | 'hot';
  category: string;
}

const questions: Question[] = [
  // MILD - Sweet & Romantic
  { question: "What's your biggest fantasy about us?", intensity: 'mild', category: 'Dreams' },
  { question: "Where's your favorite place I've kissed you?", intensity: 'mild', category: 'Kisses' },
  { question: "What outfit of mine drives you crazy?", intensity: 'mild', category: 'Attraction' },
  { question: "What's the most romantic thing you want us to do?", intensity: 'mild', category: 'Romance' },
  { question: "What's something you've always wanted to try with me?", intensity: 'mild', category: 'Adventures' },
  { question: "What physical feature of mine do you love most?", intensity: 'mild', category: 'Attraction' },
  { question: "Where would you love for me to take you on a surprise date?", intensity: 'mild', category: 'Dates' },
  { question: "What's the most attractive thing I do without realizing?", intensity: 'mild', category: 'Attraction' },
  { question: "If we had a whole day with no interruptions, what would you want to do?", intensity: 'mild', category: 'Dreams' },
  { question: "What nickname do you secretly love me calling you?", intensity: 'mild', category: 'Sweet' },
  { question: "What's your favorite memory of us being close?", intensity: 'mild', category: 'Memories' },
  { question: "What makes you feel most loved by me?", intensity: 'mild', category: 'Love' },
  { question: "What's your favorite way to be cuddled?", intensity: 'mild', category: 'Cuddles' },
  { question: "What type of kiss makes you melt the most?", intensity: 'mild', category: 'Kisses' },
  { question: "What perfume or scent on me drives you wild?", intensity: 'mild', category: 'Senses' },

  // MEDIUM - Flirty & Playful
  { question: "What's your favorite place to be touched by me?", intensity: 'medium', category: 'Touch' },
  { question: "What's the most attractive thing I've ever said to you?", intensity: 'medium', category: 'Words' },
  { question: "Have you ever had a dream about us? Describe it in detail!", intensity: 'medium', category: 'Dreams' },
  { question: "What's something you've wanted to tell me but felt shy?", intensity: 'medium', category: 'Secrets' },
  { question: "What's the naughtiest thought you've had about me today?", intensity: 'medium', category: 'Thoughts' },
  { question: "What do you think about when you miss me at night?", intensity: 'medium', category: 'Missing' },
  { question: "What kind of kisses drive you absolutely crazy?", intensity: 'medium', category: 'Kisses' },
  { question: "What's something that always makes you blush when I do it?", intensity: 'medium', category: 'Shy' },
  { question: "Describe your perfect romantic evening with me in detail", intensity: 'medium', category: 'Romance' },
  { question: "What's the sexiest compliment you've ever received from me?", intensity: 'medium', category: 'Words' },
  { question: "If I whispered something in your ear right now, what would make you shiver?", intensity: 'medium', category: 'Whispers' },
  { question: "What's your favorite part of my body to look at?", intensity: 'medium', category: 'Attraction' },
  { question: "What's the most romantic thing you've imagined us doing?", intensity: 'medium', category: 'Fantasy' },
  { question: "When did you first feel attracted to me and why?", intensity: 'medium', category: 'Beginning' },
  { question: "What outfit should I wear to drive you absolutely crazy?", intensity: 'medium', category: 'Attraction' },

  // SPICY - Getting Heated 🔥
  { question: "What's your deepest desire that you haven't told me yet?", intensity: 'spicy', category: 'Desires' },
  { question: "What's the most intimate thing you want to experience with me?", intensity: 'spicy', category: 'Intimacy' },
  { question: "What do you imagine when you think of our wedding night?", intensity: 'spicy', category: 'Future' },
  { question: "What's your secret fantasy about us that makes you blush?", intensity: 'spicy', category: 'Fantasy' },
  { question: "What's the boldest thing you've wanted to do with me?", intensity: 'spicy', category: 'Bold' },
  { question: "What makes you feel most desired by me?", intensity: 'spicy', category: 'Desire' },
  { question: "What's the most passionate scenario you've imagined?", intensity: 'spicy', category: 'Passion' },
  { question: "If we were alone in a hotel room, what would you want first?", intensity: 'spicy', category: 'Alone' },
  { question: "What's your dream honeymoon night like in detail?", intensity: 'spicy', category: 'Honeymoon' },
  { question: "What makes your heart race when you're with me?", intensity: 'spicy', category: 'Excitement' },
  { question: "What's something about me that drives you wild?", intensity: 'spicy', category: 'Wild' },
  { question: "What's the perfect way for me to seduce you?", intensity: 'spicy', category: 'Seduction' },
  { question: "What's your favorite way I've made you feel special?", intensity: 'spicy', category: 'Special' },
  { question: "Describe the perfect romantic night we could have together", intensity: 'spicy', category: 'Romance' },
  { question: "What would you do if I showed up at your door in lingerie?", intensity: 'spicy', category: 'Surprise' },

  // HOT - Very Intimate 🌶️🌶️
  { question: "What's your ultimate fantasy that makes you blush just thinking about it?", intensity: 'hot', category: 'Fantasy' },
  { question: "What's the most passionate dream you've had about us?", intensity: 'hot', category: 'Dreams' },
  { question: "What's something you're dying to experience with me someday?", intensity: 'hot', category: 'Desires' },
  { question: "What's your wildest imagination about our first night together?", intensity: 'hot', category: 'First Night' },
  { question: "What makes you feel completely captivated and surrendered to me?", intensity: 'hot', category: 'Captivation' },
  { question: "What's the most intimate moment you can imagine sharing with me?", intensity: 'hot', category: 'Intimacy' },
  { question: "What's a secret desire you've never shared with anyone before?", intensity: 'hot', category: 'Secrets' },
  { question: "What would make our alone time absolutely perfect and unforgettable?", intensity: 'hot', category: 'Perfect' },
  { question: "If you could have me do anything to you, what would it be?", intensity: 'hot', category: 'Wishes' },
  { question: "What makes you feel completely irresistible and desired?", intensity: 'hot', category: 'Irresistible' },
  { question: "What's your naughtiest thought about what we'll do on our wedding night?", intensity: 'hot', category: 'Wedding Night' },
  { question: "Describe in detail your perfect intimate fantasy with me", intensity: 'hot', category: 'Fantasy' },
  { question: "What would you want me to whisper in your ear while we're close?", intensity: 'hot', category: 'Whispers' },
  { question: "What's the hottest scenario you've imagined about us?", intensity: 'hot', category: 'Scenarios' },
  { question: "If there were no limits, what would you want us to try together?", intensity: 'hot', category: 'No Limits' },
];

const intensityInfo = {
  mild: { emoji: '💕', name: 'Sweet', color: 'from-pink-400 to-rose-400' },
  medium: { emoji: '💗', name: 'Flirty', color: 'from-rose-400 to-pink-500' },
  spicy: { emoji: '🔥', name: 'Spicy', color: 'from-orange-400 to-red-500' },
  hot: { emoji: '🌶️', name: 'Hot', color: 'from-red-500 to-rose-600' },
};

export const NaughtyQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);

  const getRandomQuestion = () => {
    const filtered = selectedIntensity
      ? questions.filter(q => q.intensity === selectedIntensity)
      : questions;
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentQuestion(random);
    setAnsweredCount(prev => prev + 1);
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
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔥
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Naughty Questions
        </h3>
        <p className="text-white/60 text-sm">
          Fun, flirty questions just for us! 💕
        </p>
      </motion.div>

      {/* Intensity Filter */}
      <div className="flex gap-2 justify-center flex-wrap">
        <motion.button
          onClick={() => setSelectedIntensity(null)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            !selectedIntensity
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
              : 'bg-white/10 text-white/70'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {Object.entries(intensityInfo).map(([key, info]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedIntensity(key)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              selectedIntensity === key
                ? `bg-gradient-to-r ${info.color} text-white`
                : 'bg-white/10 text-white/70'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span>{info.emoji}</span>
            <span>{info.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Current Question */}
      <AnimatePresence mode="wait">
        {currentQuestion ? (
          <motion.div
            key={currentQuestion.question}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            className={`relative p-6 rounded-3xl bg-gradient-to-br ${intensityInfo[currentQuestion.intensity].color}`}
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
          >
            {/* Category badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
                {intensityInfo[currentQuestion.intensity].emoji} {currentQuestion.category}
              </span>
              <span className="text-white/60 text-xs">
                #{answeredCount}
              </span>
            </div>

            {/* Question */}
            <motion.p 
              className="text-white text-xl font-serif text-center leading-relaxed min-h-[80px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {currentQuestion.question}
            </motion.p>

            {/* Hearts */}
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  className="text-xl"
                >
                  💕
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 rounded-3xl bg-white/10 text-center"
          >
            <span className="text-4xl block mb-3">❓</span>
            <p className="text-white/70">Tap the button below to get a question!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Get Question Button */}
      <motion.button
        onClick={getRandomQuestion}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium flex items-center justify-center gap-3"
        style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.3)' }}
      >
        <RefreshCw className="w-5 h-5" />
        {currentQuestion ? 'Next Question' : 'Get a Question'}
        <Flame className="w-5 h-5" />
      </motion.button>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Sparkles className="w-6 h-6 text-rose-400 mx-auto mb-2" />
          <p className="text-white text-2xl font-bold">{questions.length}</p>
          <p className="text-white/60 text-xs">Questions</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
          <p className="text-white text-2xl font-bold">{answeredCount}</p>
          <p className="text-white/60 text-xs">Explored</p>
        </div>
      </div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "These questions are just for us - a fun way to know each other even deeper! 💕"
        </p>
      </motion.div>
    </div>
  );
};
