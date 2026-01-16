import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  loveNote: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What do I call you the most? 💕",
    options: ["Baby", "Puntuu", "Love", "Sweetheart"],
    correctAnswer: 1,
    loveNote: "You'll always be my Puntuu! 🥰"
  },
  {
    id: 2,
    question: "What time would I answer your call no matter what?",
    options: ["Only morning", "Only evening", "2:00 AM always", "When I'm free"],
    correctAnswer: 2,
    loveNote: "Any time, day or night, I'm always here for you ❤️"
  },
  {
    id: 3,
    question: "What kind of home do I want to build with you?",
    options: ["A loud party house", "A peaceful quiet home", "A fancy mansion", "A small apartment"],
    correctAnswer: 1,
    loveNote: "Just the quiet magic of us, no shouting, only love 🏠"
  },
  {
    id: 4,
    question: "If God gave me a blank book, what would I fill it with?",
    options: ["My dreams", "Money wishes", "Your name", "Travel plans"],
    correctAnswer: 2,
    loveNote: "Every page, every line - just you, Puntuu 📖"
  },
  {
    id: 5,
    question: "How many roses did I give you today?",
    options: ["100", "1,000", "10,000", "Infinite"],
    correctAnswer: 2,
    loveNote: "Even 10,000 isn't enough for what you mean to me 🌹"
  },
  {
    id: 6,
    question: "What do I want to bring you every morning?",
    options: ["Breakfast in bed", "Tea and chocolates", "Flowers", "Nothing special"],
    correctAnswer: 1,
    loveNote: "Starting every day making you smile is my dream 🍵🍫"
  },
  {
    id: 7,
    question: "What do I love watching you do peacefully?",
    options: ["Cook", "Dance", "Sleep", "Work"],
    correctAnswer: 2,
    loveNote: "Watching you sleep peacefully makes my heart full 💤"
  },
  {
    id: 8,
    question: "How many children do I dream of having with you?",
    options: ["None", "One", "Two", "A whole team!"],
    correctAnswer: 2,
    loveNote: "Little versions of us, growing up seeing love 👨‍👩‍👧‍👦"
  },
  {
    id: 9,
    question: "What would I never do to you?",
    options: ["Ignore you", "Raise my voice", "Leave you", "All of these"],
    correctAnswer: 3,
    loveNote: "Never any of these. You're too precious for pain 💝"
  },
  {
    id: 10,
    question: "What do you make me feel I can be again?",
    options: ["A child", "A hero", "A prince", "A star"],
    correctAnswer: 0,
    loveNote: "With you, I don't have to pretend to be strong. I can just be me 🧒💕"
  },
  {
    id: 11,
    question: "What will I buy you for no reason at all?",
    options: ["Jewelry", "Flowers", "Chocolates", "All gifts"],
    correctAnswer: 1,
    loveNote: "Random flowers just to see that beautiful smile 💐"
  },
  {
    id: 12,
    question: "What is my greatest fear about you?",
    options: ["Losing you", "You crying", "You being hurt", "All of these"],
    correctAnswer: 3,
    loveNote: "I'd hurt myself a thousand times before letting you feel any pain 🛡️"
  }
];

export const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(index === questions[currentQuestion].correctAnswer ? [50, 30, 50] : [100]);
    }

    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsComplete(false);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h3
          className="text-xl font-serif text-rose-300 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
          How Well Do You Know Our Love?
          <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
        </motion.h3>
        <p className="text-white/50 text-xs mt-1">12 questions about us 💕</p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex justify-center gap-1 flex-wrap">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentQuestion ? 'w-6 bg-rose-400' :
                  i < currentQuestion ? 'w-3 bg-rose-500' : 'w-3 bg-white/20'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <p className="text-white/50 text-sm mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              
              <h4 className="text-lg text-white font-medium mb-5">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      showResult && index === currentQ.correctAnswer
                        ? 'bg-green-500/30 border-green-400 text-green-200'
                        : showResult && index === selectedAnswer && !isCorrect
                        ? 'bg-red-500/30 border-red-400 text-red-200'
                        : selectedAnswer === index
                        ? 'bg-rose-500/30 border-rose-400 text-white'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    } border`}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Love Note */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-3 rounded-xl text-center ${
                      isCorrect ? 'bg-green-500/20' : 'bg-rose-500/20'
                    }`}
                  >
                    <p className="text-white/90 text-sm">
                      {isCorrect ? "✨ " : "💕 "}
                      {currentQ.loveNote}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        /* Results */
        <motion.div
          className="text-center space-y-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="text-6xl"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {score >= 10 ? "💖" : score >= 7 ? "💕" : score >= 4 ? "💗" : "💝"}
          </motion.div>

          <div>
            <p className="text-2xl text-white font-bold">
              {score}/{questions.length}
            </p>
            <p className="text-rose-300 mt-1">
              {score === questions.length 
                ? "PERFECT! You know my heart completely! 🥰" 
                : score >= 10
                ? "Amazing! Our souls are connected! ❤️"
                : score >= 7 
                ? "Wonderful! Our love grows stronger! 💕" 
                : score >= 4
                ? "Sweet! We're learning each other 💗"
                : "Every day we discover more about us 💝"}
            </p>
          </div>

          <div className="flex justify-center gap-1 flex-wrap max-w-xs mx-auto">
            {[...Array(score)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={resetQuiz}
            className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
