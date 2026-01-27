import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, BookOpen, GraduationCap, PenTool, Star } from "lucide-react";
import ReactDOM from "react-dom";

interface Scenario {
  id: string;
  name: string;
  emoji: string;
  description: string;
  dialogue: string;
  color: string;
}

const scenarios: Scenario[] = [
  {
    id: 'lesson',
    name: 'Private Lesson',
    emoji: '📚',
    description: 'One-on-one tutoring',
    color: 'from-blue-400 to-indigo-500',
    dialogue: "Welcome to our private lesson, my star student! 📚 Today I'm going to teach you the most important subject - the art of being loved. Pay attention, because there will be a test later... and the only correct answer is kissing your teacher! 😏💕"
  },
  {
    id: 'homework',
    name: 'Check Homework',
    emoji: '📝',
    description: 'Review your work',
    color: 'from-green-400 to-emerald-500',
    dialogue: "Let me see your homework... 📝 Hmm, you got every answer right! But wait, you forgot to draw a heart at the end. That's okay, teacher will help you practice. *draws heart* See? Now do the same on my cheek with a kiss! That's your new homework! 💕"
  },
  {
    id: 'detention',
    name: 'After School',
    emoji: '🕐',
    description: 'Special detention',
    color: 'from-purple-400 to-violet-500',
    dialogue: "You've been called to stay after school! 🕐 Not because you're in trouble... but because I missed you all day and wanted some extra time with my favorite student. Don't tell anyone, but you're getting an A+ just for being cute! 😏💕"
  },
  {
    id: 'praise',
    name: 'Gold Star',
    emoji: '⭐',
    description: 'You deserve praise',
    color: 'from-yellow-400 to-amber-500',
    dialogue: "You did such a good job today! ⭐ Here's a gold star for being an amazing student... and here's a special star kiss on your forehead for being MY student. You're the best thing that ever happened in my classroom! 💕"
  },
  {
    id: 'notes',
    name: 'Pass Notes',
    emoji: '💌',
    description: 'Secret messages',
    color: 'from-pink-400 to-rose-500',
    dialogue: "Psst! 💌 *slides a folded note to you* Don't tell anyone, but I've been writing love notes to you during class. This one says 'I love you more than teaching'. Shhh, it's our little secret! Write me back? 💕"
  },
  {
    id: 'recess',
    name: 'Secret Recess',
    emoji: '🎠',
    description: 'Hidden playground time',
    color: 'from-cyan-400 to-blue-500',
    dialogue: "Meet me behind the playground! 🎠 I know I'm your teacher, but during recess, I just want to be your best friend... okay, maybe more than friends. Let's go on the swings together and I'll push you really high! 💕"
  },
  {
    id: 'graduation',
    name: 'Graduation Day',
    emoji: '🎓',
    description: 'Special ceremony',
    color: 'from-indigo-500 to-purple-600',
    dialogue: "Congratulations on graduating from my class! 🎓 You've learned everything I could teach you... except one last lesson. *whispers* The lesson is: now that you're not my student anymore, I can finally ask you on a date! Will you go out with your former teacher? 💕"
  },
  {
    id: 'field',
    name: 'Field Trip',
    emoji: '🚌',
    description: 'Special outing',
    color: 'from-orange-400 to-red-500',
    dialogue: "Surprise! I planned a special field trip - just for the two of us! 🚌 We're going to the most romantic spot in town. Don't worry about permission slips... love doesn't need permission! Now sit next to me on the bus! 💕"
  },
];

const ScenarioModal = ({ 
  scenario, 
  onClose 
}: { 
  scenario: Scenario; 
  onClose: () => void 
}) => {
  const [isTeaching, setIsTeaching] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleStart = () => {
    setIsTeaching(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
    setTimeout(() => {
      setIsTeaching(false);
      setComplete(true);
    }, 1800);
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-gradient-to-br ${scenario.color} rounded-3xl p-6 max-w-sm w-full relative`}
        style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 rounded-full p-2"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Animated Icon */}
        <div className="text-center mb-6">
          <motion.div
            animate={isTeaching ? { 
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0]
            } : { scale: [1, 1.05, 1] }}
            transition={isTeaching ? { duration: 0.6, repeat: 3 } : { duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {scenario.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">{scenario.name}</h3>
          <p className="text-white/80">{scenario.description}</p>
        </div>

        {/* Writing Animation */}
        {isTeaching && (
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ x: [0, 30, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <PenTool className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        )}

        {/* Dialogue */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-2xl">👩‍🏫</span>
            <p className="text-white font-serif italic text-sm leading-relaxed">
              {complete ? scenario.dialogue : "Class is about to begin! Tap the button..."}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {!complete && !isTeaching && (
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Start Lesson
          </motion.button>
        )}

        {isTeaching && (
          <div className="text-center py-4">
            <motion.p 
              className="text-white animate-pulse"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              📚 Teacher is preparing the lesson...
            </motion.p>
          </div>
        )}

        {complete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="flex justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.3, 1], y: [0, -8, 0] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  className="text-xl"
                >
                  ⭐
                </motion.span>
              ))}
            </div>
            <p className="text-white text-sm">A+ for being my favorite! 💕</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const TeacherStudentRoleplay = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(new Set());

  const handleScenarioClick = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCompletedScenarios(prev => new Set([...prev, scenario.id]));
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
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
          animate={{ 
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          👩‍🏫📚
        </motion.div>
        <h3 className="text-xl font-serif text-indigo-300 mb-2">
          Teacher & Student
        </h3>
        <p className="text-white/60 text-sm">
          Class is in session, my dear student! 💕
        </p>
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-indigo-400 text-sm">
          📚 {completedScenarios.size}/{scenarios.length} lessons completed!
        </span>
      </div>

      {/* School Banner */}
      <motion.div
        className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl p-4 border border-indigo-400/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GraduationCap className="w-8 h-8 text-indigo-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">Love Academy</p>
            <p className="text-white/60 text-xs">Teacher Puntuu's Classroom 💕</p>
          </div>
        </div>
        <p className="text-white/80 text-sm italic">
          "The only subject I teach is how to love you more every day!"
        </p>
      </motion.div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-2 gap-3">
        {scenarios.map((scenario, index) => {
          const isCompleted = completedScenarios.has(scenario.id);
          return (
            <motion.button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario)}
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${scenario.color} text-center overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <motion.span
                className="text-3xl block mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
              >
                {scenario.emoji}
              </motion.span>
              <p className="text-white font-medium text-sm">{scenario.name}</p>
              <p className="text-white/70 text-xs mt-1">{scenario.description}</p>
              
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                >
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* School Supplies */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Books</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <PenTool className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Pen</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1 fill-yellow-400" />
          <p className="text-white/80 text-xs">Stars</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Heart className="w-5 h-5 text-red-400 mx-auto mb-1 fill-red-400" />
          <p className="text-white/80 text-xs">Love</p>
        </div>
      </div>

      {/* Quote */}
      <motion.div
        className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "You're my favorite student... and my only love! 📚💕"
        </p>
      </motion.div>

      {/* Scenario Modal */}
      <AnimatePresence>
        {selectedScenario && (
          <ScenarioModal
            scenario={selectedScenario}
            onClose={() => setSelectedScenario(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
