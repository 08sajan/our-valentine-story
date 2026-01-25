import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Clock, Trophy, X, CheckCircle2 } from "lucide-react";
import ReactDOM from "react-dom";

interface Room {
  id: string;
  name: string;
  emoji: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  puzzles: Puzzle[];
  color: string;
  completionMessage: string;
}

interface Puzzle {
  id: string;
  question: string;
  hint: string;
  answer: string;
  type: 'text' | 'choice' | 'number';
  options?: string[];
}

const rooms: Room[] = [
  {
    id: 'love-letters',
    name: 'The Love Letter Vault',
    emoji: '💌',
    description: 'Decode romantic messages to unlock the vault',
    difficulty: 'Easy',
    color: 'from-pink-400 to-rose-500',
    completionMessage: 'You found the secret love letter! "I love you more than words can say, Puntuu!" 💕',
    puzzles: [
      {
        id: '1',
        question: 'What word completes: "You are the ____ of my eye"?',
        hint: 'A fruit that grows on trees 🍎',
        answer: 'apple',
        type: 'text'
      },
      {
        id: '2',
        question: 'How many letters are in "LOVE"?',
        hint: 'Count them!',
        answer: '4',
        type: 'number'
      },
      {
        id: '3',
        question: 'Complete the phrase: "You make my heart ____"',
        hint: 'What does a butterfly do? 🦋',
        answer: 'flutter',
        type: 'text'
      },
    ]
  },
  {
    id: 'memory-lane',
    name: 'Memory Lane Mystery',
    emoji: '🎞️',
    description: 'Answer questions about our relationship',
    difficulty: 'Medium',
    color: 'from-purple-400 to-violet-500',
    completionMessage: 'You unlocked our treasure chest of memories! Our love story is the best! 💜',
    puzzles: [
      {
        id: '1',
        question: 'What flower symbolizes love?',
        hint: 'It has thorns but is beautiful 🌹',
        answer: 'rose',
        type: 'text'
      },
      {
        id: '2',
        question: 'Solve: 14 (Valentine) + 2 (us) = ?',
        hint: 'Simple math!',
        answer: '16',
        type: 'number'
      },
      {
        id: '3',
        question: 'What do you call two people deeply in love?',
        hint: 'Rhymes with "hole dates"',
        answer: 'soulmates',
        type: 'text'
      },
      {
        id: '4',
        question: 'What\'s the magic word I always say to you?',
        hint: 'Starts with "Pun..."',
        answer: 'puntuu',
        type: 'text'
      },
    ]
  },
  {
    id: 'dream-castle',
    name: 'The Dream Castle',
    emoji: '🏰',
    description: 'Navigate through our future dreams',
    difficulty: 'Hard',
    color: 'from-amber-400 to-orange-500',
    completionMessage: 'You found the key to our forever castle! Our future awaits! 🏰👑',
    puzzles: [
      {
        id: '1',
        question: 'What color is associated with romance?',
        hint: 'Think hearts ❤️',
        answer: 'red',
        type: 'text'
      },
      {
        id: '2',
        question: 'How many months in a year to celebrate our love?',
        hint: 'All of them!',
        answer: '12',
        type: 'number'
      },
      {
        id: '3',
        question: 'What do couples exchange on their wedding?',
        hint: 'Circular and precious 💍',
        answer: 'rings',
        type: 'text'
      },
      {
        id: '4',
        question: 'What comes after "I love..."?',
        hint: 'The most important word',
        answer: 'you',
        type: 'text'
      },
      {
        id: '5',
        question: 'What will we be called after marriage?',
        hint: 'A family unit 👨‍👩‍👧',
        answer: 'family',
        type: 'text'
      },
    ]
  },
  {
    id: 'heart-maze',
    name: 'Heart Maze Adventure',
    emoji: '💝',
    description: 'Find your way through the maze of love',
    difficulty: 'Easy',
    color: 'from-rose-400 to-pink-600',
    completionMessage: 'You navigated straight to my heart! You always know the way! 💝',
    puzzles: [
      {
        id: '1',
        question: 'What shape represents love?',
        hint: '❤️',
        answer: 'heart',
        type: 'text'
      },
      {
        id: '2',
        question: 'How many days are in the month of love (February)?',
        hint: 'Usually 28, sometimes 29',
        answer: '28',
        type: 'number'
      },
      {
        id: '3',
        question: 'What flying baby is associated with love?',
        hint: 'Has wings and a bow 🏹',
        answer: 'cupid',
        type: 'text'
      },
    ]
  },
  {
    id: 'secret-garden',
    name: 'Secret Garden Quest',
    emoji: '🌸',
    description: 'Discover secrets in our magical garden',
    difficulty: 'Medium',
    color: 'from-green-400 to-emerald-500',
    completionMessage: 'You bloomed our secret garden with love! Every flower here is for you! 🌸',
    puzzles: [
      {
        id: '1',
        question: 'What flower symbolizes purity and new beginnings?',
        hint: 'White, elegant, often in weddings 🌷',
        answer: 'lily',
        type: 'text'
      },
      {
        id: '2',
        question: 'How many petals does a traditional rose have?',
        hint: 'Between 4 and 6',
        answer: '5',
        type: 'number'
      },
      {
        id: '3',
        question: 'What season is associated with love blooming?',
        hint: 'When flowers bloom 🌷',
        answer: 'spring',
        type: 'text'
      },
      {
        id: '4',
        question: 'What do we pick from the garden for our love?',
        hint: 'Colorful and fragrant 💐',
        answer: 'flowers',
        type: 'text'
      },
    ]
  },
  {
    id: 'starlight-tower',
    name: 'Starlight Tower',
    emoji: '🌟',
    description: 'Climb the tower of wishes and dreams',
    difficulty: 'Hard',
    color: 'from-indigo-400 to-purple-600',
    completionMessage: 'You reached the top! Now make a wish under the stars with me! 🌟✨',
    puzzles: [
      {
        id: '1',
        question: 'What do lovers wish upon at night?',
        hint: 'Twinkle twinkle ⭐',
        answer: 'star',
        type: 'text'
      },
      {
        id: '2',
        question: 'How many colors are in a rainbow?',
        hint: 'ROYGBIV',
        answer: '7',
        type: 'number'
      },
      {
        id: '3',
        question: 'What time of day is most romantic for stargazing?',
        hint: 'When the sun goes down 🌙',
        answer: 'night',
        type: 'text'
      },
      {
        id: '4',
        question: 'What do we call the path of stars across the sky?',
        hint: 'A milky way of stars 🌌',
        answer: 'milky way',
        type: 'text'
      },
      {
        id: '5',
        question: 'What bright object lights up our romantic nights?',
        hint: 'Changes shape throughout the month 🌙',
        answer: 'moon',
        type: 'text'
      },
    ]
  },
  {
    id: 'treasure-island',
    name: 'Treasure Island Romance',
    emoji: '🏝️',
    description: 'Find the hidden treasure of love',
    difficulty: 'Medium',
    color: 'from-cyan-400 to-blue-500',
    completionMessage: 'X marks the spot! The treasure was our love all along! 🏝️💎',
    puzzles: [
      {
        id: '1',
        question: 'What surrounds an island?',
        hint: 'Blue and wavy 🌊',
        answer: 'water',
        type: 'text'
      },
      {
        id: '2',
        question: 'What do you find in a treasure chest?',
        hint: 'Shiny and valuable 💎',
        answer: 'gold',
        type: 'text'
      },
      {
        id: '3',
        question: 'How many wishes does a genie typically grant?',
        hint: 'A magic number',
        answer: '3',
        type: 'number'
      },
      {
        id: '4',
        question: 'What do pirates follow to find treasure?',
        hint: 'Shows X marks the spot 🗺️',
        answer: 'map',
        type: 'text'
      },
    ]
  },
  {
    id: 'love-potion',
    name: 'Love Potion Laboratory',
    emoji: '🧪',
    description: 'Brew the perfect love potion',
    difficulty: 'Hard',
    color: 'from-fuchsia-400 to-pink-600',
    completionMessage: 'The love potion is complete! But we didn\'t need it - we already have real love! 🧪💕',
    puzzles: [
      {
        id: '1',
        question: 'What emotion does a love potion create?',
        hint: 'The strongest emotion ❤️',
        answer: 'love',
        type: 'text'
      },
      {
        id: '2',
        question: 'What color is traditionally associated with magic?',
        hint: 'Mystical and royal 💜',
        answer: 'purple',
        type: 'text'
      },
      {
        id: '3',
        question: 'How many ingredients for a perfect love spell? (Hint: lucky number)',
        hint: 'Lucky number!',
        answer: '7',
        type: 'number'
      },
      {
        id: '4',
        question: 'What magical creature grants wishes?',
        hint: 'Comes out of a lamp ✨',
        answer: 'genie',
        type: 'text'
      },
      {
        id: '5',
        question: 'What do you feel when you see someone you love?',
        hint: 'Winged insects in your tummy 🦋',
        answer: 'butterflies',
        type: 'text'
      },
    ]
  },
];

const RoomModal = ({ 
  room, 
  onClose, 
  onComplete 
}: { 
  room: Room; 
  onClose: () => void; 
  onComplete: () => void;
}) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!completed) {
      const timer = setInterval(() => setTimeElapsed(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [completed]);

  const puzzle = room.puzzles[currentPuzzle];

  const checkAnswer = () => {
    const isCorrect = answer.toLowerCase().trim() === puzzle.answer.toLowerCase();
    if (isCorrect) {
      const newSolved = new Set(solved);
      newSolved.add(currentPuzzle);
      setSolved(newSolved);

      if (newSolved.size === room.puzzles.length) {
        setCompleted(true);
        onComplete();
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100, 50, 200]);
        }
      } else {
        setCurrentPuzzle(prev => prev + 1);
        setAnswer('');
        setShowHint(false);
      }
    } else {
      setWrongAnswer(true);
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
      }
      setTimeout(() => setWrongAnswer(false), 500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className={`bg-gradient-to-br ${room.color} rounded-3xl p-6 max-w-md w-full max-h-[85vh] overflow-y-auto`}
        style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-4xl">{room.emoji}</span>
            <h3 className="text-xl font-bold text-white mt-2">{room.name}</h3>
          </div>
          <button onClick={onClose} className="bg-white/20 rounded-full p-2">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Timer & Progress */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex gap-1">
            {room.puzzles.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  solved.has(i) ? 'bg-green-400' : i === currentPuzzle ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {completed ? (
          /* Completion Screen */
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h4 className="text-2xl font-bold text-white mb-2">Escape Complete!</h4>
            <p className="text-white/80 mb-4">Time: {formatTime(timeElapsed)}</p>
            <div className="bg-white/20 rounded-2xl p-4 mb-4">
              <p className="text-white font-serif italic">{room.completionMessage}</p>
            </div>
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-gray-800 rounded-xl font-bold"
            >
              <Trophy className="w-5 h-5 inline mr-2" />
              Claim Victory!
            </motion.button>
          </motion.div>
        ) : (
          /* Puzzle Screen */
          <div className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white/60 text-xs mb-2">
                Puzzle {currentPuzzle + 1} of {room.puzzles.length}
              </p>
              <p className="text-white text-lg font-medium">{puzzle.question}</p>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-amber-500/30 rounded-xl p-3"
              >
                <p className="text-white text-sm">💡 Hint: {puzzle.hint}</p>
              </motion.div>
            )}

            <motion.input
              type={puzzle.type === 'number' ? 'number' : 'text'}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Your answer..."
              className={`w-full bg-white/20 border-2 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none ${
                wrongAnswer ? 'border-red-500 animate-shake' : 'border-white/30 focus:border-white'
              }`}
              animate={wrongAnswer ? { x: [-10, 10, -10, 10, 0] } : {}}
            />

            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowHint(true)}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 rounded-xl bg-white/20 text-white font-medium"
                disabled={showHint}
              >
                💡 Hint
              </motion.button>
              <motion.button
                onClick={checkAnswer}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 rounded-xl bg-white text-gray-800 font-bold"
              >
                <Key className="w-4 h-4 inline mr-2" />
                Try Answer
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const EscapeRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [completedRooms, setCompletedRooms] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('escape-rooms-completed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('escape-rooms-completed', JSON.stringify([...completedRooms]));
  }, [completedRooms]);

  const handleComplete = (roomId: string) => {
    setCompletedRooms(prev => new Set([...prev, roomId]));
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
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔐
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Love Escape Rooms
        </h3>
        <p className="text-white/60 text-sm">
          Solve puzzles to unlock our secrets! 💕
        </p>
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-pink-400 text-sm">
          🏆 {completedRooms.size}/{rooms.length} rooms completed!
        </span>
      </div>

      {/* Rooms Grid */}
      <div className="space-y-3">
        {rooms.map((room, index) => {
          const isCompleted = completedRooms.has(room.id);
          return (
            <motion.button
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className={`w-full p-4 rounded-2xl bg-gradient-to-r ${room.color} text-left relative overflow-hidden`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              {isCompleted && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <span className="text-4xl">{room.emoji}</span>
                <div>
                  <h4 className="text-white font-bold">{room.name}</h4>
                  <p className="text-white/80 text-sm">{room.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-white text-xs">
                      {room.difficulty}
                    </span>
                    <span className="text-white/60 text-xs">
                      {room.puzzles.length} puzzles
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Every puzzle we solve together makes our bond stronger!" 💕
        </p>
      </motion.div>

      {/* Room Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <RoomModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
            onComplete={() => handleComplete(selectedRoom.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
