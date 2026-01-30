import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flame, Sparkles, RotateCcw, ChevronRight, X, Stars } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Question {
  optionA: string;
  optionB: string;
  category: 'sweet' | 'spicy' | 'hot';
}

const questions: Question[] = [
  // Sweet Questions
  { optionA: "Have breakfast in bed every morning", optionB: "Have dinner dates every night", category: 'sweet' },
  { optionA: "Slow dance in the rain", optionB: "Watch the sunrise together", category: 'sweet' },
  { optionA: "Receive 100 love letters", optionB: "Get 100 surprise hugs", category: 'sweet' },
  { optionA: "Cook together every day", optionB: "Order food and cuddle every day", category: 'sweet' },
  { optionA: "Have matching outfits", optionB: "Have matching tattoos", category: 'sweet' },
  { optionA: "Live in a cozy cabin", optionB: "Live in a beach house", category: 'sweet' },
  { optionA: "Wake up to kisses", optionB: "Fall asleep cuddling", category: 'sweet' },
  { optionA: "Travel the world together", optionB: "Build a dream home together", category: 'sweet' },
  { optionA: "Have breakfast picnics", optionB: "Have midnight snack dates", category: 'sweet' },
  { optionA: "Get serenaded", optionB: "Get a surprise proposal", category: 'sweet' },
  { optionA: "Have a movie marathon", optionB: "Have a cooking competition", category: 'sweet' },
  { optionA: "Receive flowers every week", optionB: "Receive handwritten notes every day", category: 'sweet' },
  { optionA: "Go stargazing together", optionB: "Watch movies under blankets", category: 'sweet' },
  { optionA: "Share an ice cream sundae", optionB: "Share a pizza in bed", category: 'sweet' },
  { optionA: "Dance in the living room", optionB: "Sing karaoke together", category: 'sweet' },
  
  // Spicy Questions  
  { optionA: "Be blindfolded by your partner", optionB: "Blindfold your partner", category: 'spicy' },
  { optionA: "Have a romantic bath together", optionB: "Have a massage night", category: 'spicy' },
  { optionA: "Play truth or dare all night", optionB: "Play never have I ever all night", category: 'spicy' },
  { optionA: "Whisper secrets in the dark", optionB: "Share fantasies in writing", category: 'spicy' },
  { optionA: "Go on a spontaneous adventure", optionB: "Have a surprise date night", category: 'spicy' },
  { optionA: "Be seduced with words", optionB: "Be seduced with touch", category: 'spicy' },
  { optionA: "Role play as strangers meeting", optionB: "Recreate your first date", category: 'spicy' },
  { optionA: "Have a candlelit evening", optionB: "Have a moonlit swim", category: 'spicy' },
  { optionA: "Leave love marks", optionB: "Receive love marks", category: 'spicy' },
  { optionA: "Be teased all day", optionB: "Be surprised at night", category: 'spicy' },
  { optionA: "Read romantic stories together", optionB: "Create your own love story", category: 'spicy' },
  { optionA: "Have a photoshoot together", optionB: "Make a video together", category: 'spicy' },
  { optionA: "Slow and sensual", optionB: "Fast and passionate", category: 'spicy' },
  { optionA: "Morning intimacy", optionB: "Late night intimacy", category: 'spicy' },
  { optionA: "Dress up for each other", optionB: "Undress each other slowly", category: 'spicy' },
  
  // Hot Questions
  { optionA: "Be in control", optionB: "Let them take control", category: 'hot' },
  { optionA: "Use handcuffs", optionB: "Use blindfolds", category: 'hot' },
  { optionA: "Try a new location", optionB: "Try a new position", category: 'hot' },
  { optionA: "Whisper what you want", optionB: "Show what you want", category: 'hot' },
  { optionA: "Tease until they beg", optionB: "Give in to their desires", category: 'hot' },
  { optionA: "Roleplay as boss & secretary", optionB: "Roleplay as teacher & student", category: 'hot' },
  { optionA: "Use ice cubes", optionB: "Use warm oil", category: 'hot' },
  { optionA: "Give a strip tease", optionB: "Watch a strip tease", category: 'hot' },
  { optionA: "Take the lead in bed", optionB: "Follow their lead in bed", category: 'hot' },
  { optionA: "Be vocal about pleasure", optionB: "Use body language only", category: 'hot' },
  { optionA: "Quick and spontaneous", optionB: "Long and planned", category: 'hot' },
  { optionA: "Morning surprise", optionB: "Midnight awakening", category: 'hot' },
  { optionA: "Dominant partner tonight", optionB: "Submissive partner tonight", category: 'hot' },
  { optionA: "Try something new every time", optionB: "Perfect the favorites", category: 'hot' },
  { optionA: "Fantasy fulfillment night", optionB: "Spontaneous passion", category: 'hot' },
];

const categoryConfig = {
  sweet: { icon: Heart, color: 'pink', label: 'Sweet', gradient: 'from-pink-400 to-rose-500' },
  spicy: { icon: Flame, color: 'orange', label: 'Spicy', gradient: 'from-orange-400 to-red-500' },
  hot: { icon: Sparkles, color: 'red', label: 'Hot', gradient: 'from-red-500 to-pink-600' },
};

export const WouldYouRather: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'sweet' | 'spicy' | 'hot'>('sweet');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState({ you: { A: 0, B: 0 }, partner: { A: 0, B: 0 } });

  const filteredQuestions = questions.filter(q => q.category === selectedCategory);
  const currentQuestion = filteredQuestions[currentIndex];
  const config = categoryConfig[selectedCategory];

  const handleSelect = (option: 'A' | 'B') => {
    setSelected(option);
    setScores(prev => ({
      ...prev,
      you: { ...prev.you, [option]: prev.you[option] + 1 }
    }));
    
    setTimeout(() => {
      if (currentIndex < filteredQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelected(null);
    setShowResult(false);
    setScores({ you: { A: 0, B: 0 }, partner: { A: 0, B: 0 } });
  };

  const changeCategory = (cat: 'sweet' | 'spicy' | 'hot') => {
    setSelectedCategory(cat);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-pink-950 to-rose-950 p-4 pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-5xl mb-2"
          >
            💕
          </motion.div>
          <h2 className="text-2xl font-bold text-pink-100">Would You Rather</h2>
          <p className="text-pink-300/70 text-sm">Couples Edition</p>
        </div>

        {/* Category Selector */}
        <div className="flex gap-2 mb-6 justify-center">
          {(Object.keys(categoryConfig) as Array<'sweet' | 'spicy' | 'hot'>).map((cat) => {
            const cfg = categoryConfig[cat];
            const Icon = cfg.icon;
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? `bg-gradient-to-r ${cfg.gradient} text-white shadow-lg`
                    : 'bg-white/10 text-pink-200 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cfg.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-pink-300 text-sm mb-2">
            <span>Question {currentIndex + 1}</span>
            <span>{filteredQuestions.length} total</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${config.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {!showResult && currentQuestion && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              <div className="text-center text-pink-100 text-xl font-semibold mb-6">
                Would You Rather...
              </div>

              {/* Option A */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !selected && handleSelect('A')}
                disabled={selected !== null}
                className={`w-full p-6 rounded-2xl text-left transition-all ${
                  selected === 'A'
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-xl`
                    : selected === 'B'
                      ? 'bg-white/5 text-pink-300/50'
                      : 'bg-white/10 text-pink-100 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    selected === 'A' ? 'bg-white/20' : 'bg-pink-500/20'
                  }`}>
                    A
                  </div>
                  <span className="text-lg">{currentQuestion.optionA}</span>
                </div>
              </motion.button>

              <div className="text-center text-pink-400 font-semibold">OR</div>

              {/* Option B */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !selected && handleSelect('B')}
                disabled={selected !== null}
                className={`w-full p-6 rounded-2xl text-left transition-all ${
                  selected === 'B'
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-xl`
                    : selected === 'A'
                      ? 'bg-white/5 text-pink-300/50'
                      : 'bg-white/10 text-pink-100 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    selected === 'B' ? 'bg-white/20' : 'bg-pink-500/20'
                  }`}>
                    B
                  </div>
                  <span className="text-lg">{currentQuestion.optionB}</span>
                </div>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Results */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 text-center border border-pink-400/30"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-bold text-pink-100 mb-2">Round Complete!</h3>
            <p className="text-pink-300 mb-6">
              You answered all {filteredQuestions.length} {config.label.toLowerCase()} questions!
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-pink-100">{scores.you.A}</div>
                <div className="text-pink-300 text-sm">Option A picks</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-pink-100">{scores.you.B}</div>
                <div className="text-pink-300 text-sm">Option B picks</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className={`w-full bg-gradient-to-r ${config.gradient} text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2`}
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </motion.button>
          </motion.div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-white/5 rounded-xl p-4 border border-pink-400/20">
          <h4 className="text-pink-100 font-semibold mb-2">💡 How to Play</h4>
          <ul className="text-pink-300/70 text-sm space-y-1">
            <li>• Take turns answering with your partner</li>
            <li>• Discuss your choices - the fun is in the conversation!</li>
            <li>• No wrong answers - it's about knowing each other better</li>
            <li>• Try all intensity levels for maximum fun</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
