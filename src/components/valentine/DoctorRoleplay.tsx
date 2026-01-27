import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stethoscope, Thermometer, Pill, X, Activity } from "lucide-react";
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
    id: 'checkup',
    name: 'Health Checkup',
    emoji: '🩺',
    description: 'A caring examination',
    color: 'from-blue-400 to-cyan-500',
    dialogue: "Hello there, beautiful patient! 🩺 Let me check your vitals... Hmm, your heart rate seems elevated. Could it be because of me? 😏 Don't worry, I'll take very good care of you today. Now, where does it hurt? Let me make it all better... 💕"
  },
  {
    id: 'heartbeat',
    name: 'Heart Check',
    emoji: '❤️',
    description: 'Listen to your heart',
    color: 'from-red-400 to-rose-500',
    dialogue: "Time to check your heart, sweetie! ❤️ *places stethoscope gently* Oh my... your heartbeat is so beautiful. It's beating faster now... Is it because I'm standing so close? Don't be nervous, I'm here to take care of you. Your heart is in safe hands with me! 💕"
  },
  {
    id: 'temperature',
    name: 'Take Temperature',
    emoji: '🌡️',
    description: 'Check for fever',
    color: 'from-orange-400 to-amber-500',
    dialogue: "Let me check if you have a fever... 🌡️ *touches your forehead gently* Hmm, you feel a little warm to me. But wait, I think that's just because you're so hot! 😏 Should I prescribe some cuddles to bring your temperature down? Doctor's orders! 💕"
  },
  {
    id: 'medicine',
    name: 'Prescribe Medicine',
    emoji: '💊',
    description: 'Special prescription',
    color: 'from-purple-400 to-violet-500',
    dialogue: "Based on my diagnosis, I'm prescribing you something special! 💊 Take one dose of kisses every morning, hugs as needed throughout the day, and unlimited cuddles before bed. Side effects may include: excessive smiling, uncontrollable happiness, and falling deeper in love! 💕"
  },
  {
    id: 'bandage',
    name: 'Kiss It Better',
    emoji: '🩹',
    description: 'Healing touch',
    color: 'from-pink-400 to-rose-500',
    dialogue: "Aww, does it hurt here? 🩹 Let Doctor Puntuu make it all better! *gently places a kiss* There, there... my kisses have magical healing powers, you know. One more kiss for good measure... and another... okay, maybe I just can't stop kissing you! 💕"
  },
  {
    id: 'bedrest',
    name: 'Bed Rest Order',
    emoji: '🛏️',
    description: 'Doctor orders rest',
    color: 'from-indigo-400 to-blue-500',
    dialogue: "After careful examination, I'm ordering strict bed rest! 🛏️ And guess what? As your personal doctor, I'll be staying right by your side to monitor your recovery. We can watch movies, cuddle, and I'll spoon-feed you soup. Doctor's orders - no arguing! 💕"
  },
  {
    id: 'surgery',
    name: 'Heart Surgery',
    emoji: '💝',
    description: 'Special procedure',
    color: 'from-rose-500 to-red-600',
    dialogue: "I need to perform a very delicate procedure... 💝 I'm going to surgically attach my heart to yours! Don't worry, it's a painless procedure with 100% success rate. After this, our hearts will beat as one forever. Are you ready? Here I go... *hugs you tightly* Surgery complete! 💕"
  },
  {
    id: 'nightshift',
    name: 'Night Shift Care',
    emoji: '🌙',
    description: 'Late night attention',
    color: 'from-violet-500 to-purple-600',
    dialogue: "It's my night shift, and you're my only VIP patient! 🌙 I'll be here all night, checking on you, holding your hand, making sure you're comfortable. If you need anything - a glass of water, an extra blanket, or just someone to cuddle with - I'm right here. Sweet dreams, my love! 💕"
  },
];

const ScenarioModal = ({ 
  scenario, 
  onClose 
}: { 
  scenario: Scenario; 
  onClose: () => void 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleStart = () => {
    setIsPlaying(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
    setTimeout(() => {
      setIsPlaying(false);
      setComplete(true);
    }, 2000);
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
            animate={isPlaying ? { 
              scale: [1, 1.3, 0.9, 1.2, 1],
              rotate: [0, 15, -15, 10, 0]
            } : { scale: [1, 1.05, 1] }}
            transition={isPlaying ? { duration: 2 } : { duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {scenario.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">{scenario.name}</h3>
          <p className="text-white/80">{scenario.description}</p>
        </div>

        {/* EKG Animation */}
        {isPlaying && (
          <div className="flex justify-center mb-4">
            <motion.div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-white rounded-full"
                  animate={{ height: [10, 30, 10, 40, 10] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Dialogue */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-2xl">👩‍⚕️</span>
            <p className="text-white font-serif italic text-sm leading-relaxed">
              {complete ? scenario.dialogue : "Tap the button to begin the examination..."}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {!complete && !isPlaying && (
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold flex items-center justify-center gap-2"
          >
            <Stethoscope className="w-5 h-5" />
            Begin Examination
          </motion.button>
        )}

        {isPlaying && (
          <div className="text-center py-4">
            <motion.p 
              className="text-white animate-pulse flex items-center justify-center gap-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Activity className="w-5 h-5" />
              Examining with love...
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
                  💕
                </motion.span>
              ))}
            </div>
            <p className="text-white text-sm">Examination complete! You're in perfect health! 💕</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const DoctorRoleplay = () => {
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
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          👩‍⚕️🩺
        </motion.div>
        <h3 className="text-xl font-serif text-cyan-300 mb-2">
          Doctor Roleplay
        </h3>
        <p className="text-white/60 text-sm">
          Let me take care of you, my patient! 💕
        </p>
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-cyan-400 text-sm">
          🩺 {completedScenarios.size}/{scenarios.length} examinations completed!
        </span>
      </div>

      {/* Hospital Banner */}
      <motion.div
        className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl p-4 border border-cyan-400/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-red-400 fill-red-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">Love Hospital</p>
            <p className="text-white/60 text-xs">Dr. Puntuu's Special Care Unit 💕</p>
          </div>
        </div>
        <p className="text-white/80 text-sm italic">
          "The best medicine is love, and I have an unlimited supply for you!"
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
                  <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Medical Tools */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <Stethoscope className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Stethoscope</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Thermometer className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Thermometer</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Pill className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Medicine</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Heart className="w-5 h-5 text-red-400 mx-auto mb-1 fill-red-400" />
          <p className="text-white/80 text-xs">Love</p>
        </div>
      </div>

      {/* Quote */}
      <motion.div
        className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "I became a doctor just to heal your heart with my love! 🩺💕"
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
