import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RefreshCw, Clock } from "lucide-react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const loveEmojis = ['💕', '❤️', '💖', '💗', '💓', '💘', '💝', '💞', '🌹', '💐', '🌸', '🦋'];

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createDeck = (pairCount: number): Card[] => {
  const selectedEmojis = loveEmojis.slice(0, pairCount);
  const pairs = [...selectedEmojis, ...selectedEmojis];
  const shuffled = shuffleArray(pairs);
  
  return shuffled.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

export const MemoryMatchGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const pairCounts = { easy: 6, medium: 8, hard: 12 };

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !gameWon) {
      timer = setInterval(() => {
        setTimeElapsed(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameWon]);

  const resetGame = () => {
    setCards(createDeck(pairCounts[difficulty]));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setTimeElapsed(0);
    setIsPlaying(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!isPlaying) setIsPlaying(true);
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === pairCounts[difficulty]) {
              setGameWon(true);
              if ('vibrate' in navigator) {
                navigator.vibrate([100, 50, 100, 50, 200]);
              }
            }
            return newMatches;
          });
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const gridCols = difficulty === 'easy' ? 'grid-cols-3' : difficulty === 'medium' ? 'grid-cols-4' : 'grid-cols-4';

  return (
    <div className="space-y-6 relative">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {loveEmojis[i % loveEmojis.length]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-5xl mb-3 inline-flex gap-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>🃏</motion.span>
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💕</motion.span>
        </motion.div>
        <h3 className="text-xl font-serif mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
            Love Memory Match
          </span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </h3>
        <motion.p 
          className="text-white/60 text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Find matching pairs of love! 💖
        </motion.p>
      </motion.div>

      {/* Difficulty Selector */}
      <div className="flex justify-center gap-2">
        {(['easy', 'medium', 'hard'] as const).map((diff) => (
          <motion.button
            key={diff}
            onClick={() => setDifficulty(diff)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              difficulty === diff
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/70'
            }`}
          >
            {diff === 'easy' && '💕 Easy (12)'}
            {diff === 'medium' && '💗 Medium (16)'}
            {diff === 'hard' && '🔥 Hard (24)'}
          </motion.button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4">
        <div className="bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-rose-400" />
          <span className="text-white text-sm font-mono">{formatTime(timeElapsed)}</span>
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-white text-sm">{moves} moves</span>
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span className="text-white text-sm">{matches}/{pairCounts[difficulty]}</span>
        </div>
      </div>

      {/* Game Won */}
      <AnimatePresence>
        {gameWon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-5xl mb-3"
            >
              🎉
            </motion.div>
            <h4 className="text-2xl font-bold text-white mb-2">You Won!</h4>
            <p className="text-white/90 mb-4">
              Completed in {formatTime(timeElapsed)} with {moves} moves! 💕
            </p>
            <motion.button
              onClick={resetGame}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-rose-500 rounded-xl font-bold"
            >
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Grid */}
      {!gameWon && (
        <div className={`grid ${gridCols} gap-2`}>
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched}
              className={`aspect-square rounded-xl relative ${
                card.isMatched 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                  : card.isFlipped 
                    ? 'bg-gradient-to-br from-rose-400 to-pink-500' 
                    : 'bg-gradient-to-br from-purple-500 to-indigo-500'
              }`}
              style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
              whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
              whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
            >
              <AnimatePresence mode="wait">
                {(card.isFlipped || card.isMatched) ? (
                  <motion.span
                    key="front"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    className="absolute inset-0 flex items-center justify-center text-3xl"
                  >
                    {card.emoji}
                  </motion.span>
                ) : (
                  <motion.span
                    key="back"
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -90 }}
                    className="absolute inset-0 flex items-center justify-center text-2xl"
                  >
                    💜
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      )}

      {/* Reset Button */}
      {!gameWon && (
        <motion.button
          onClick={resetGame}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-xl bg-white/10 text-white font-medium flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Reset Game
        </motion.button>
      )}

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Finding your match was the best thing that ever happened to me!" 💕
        </p>
      </motion.div>
    </div>
  );
};
