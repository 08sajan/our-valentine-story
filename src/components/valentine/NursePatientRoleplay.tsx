import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Syringe, Thermometer, Pill, BedDouble } from "lucide-react";
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
    id: 'greeting',
    name: 'Nurse Greeting',
    emoji: '👩‍⚕️',
    description: 'Welcome to my care',
    color: 'from-pink-400 to-rose-500',
    dialogue: "Hello, sweetie! 👩‍⚕️ I'm Nurse Puntuu, and I'll be taking care of you today. Don't be nervous - I promise to be very gentle with you. Now, let me check your vitals... Hmm, your heart rate goes up when I'm near. How interesting! 😏💕"
  },
  {
    id: 'temperature',
    name: 'Check Temperature',
    emoji: '🌡️',
    description: 'Fever check time',
    color: 'from-orange-400 to-amber-500',
    dialogue: "Time to check your temperature! 🌡️ *places hand on your forehead* You feel a little warm... but I think that's just because you're so hot! 😏 Don't worry, Nurse Puntuu knows exactly how to cool you down. Want me to blow on your forehead? 💕"
  },
  {
    id: 'injection',
    name: 'Love Injection',
    emoji: '💉',
    description: 'Special medicine',
    color: 'from-purple-400 to-violet-500',
    dialogue: "I need to give you a special injection! 💉 Don't worry, this won't hurt at all. It's my special 'Love Serum' - guaranteed to make you feel all warm and fuzzy inside! Side effects include: excessive smiling, butterflies in stomach, and an urge to kiss your nurse! 💕"
  },
  {
    id: 'spongebath',
    name: 'Sponge Bath',
    emoji: '🧽',
    description: 'Gentle care',
    color: 'from-cyan-400 to-blue-500',
    dialogue: "Time for your sponge bath, patient! 🧽 I'll be very gentle, I promise... *dips sponge in warm water* Just relax and let Nurse Puntuu take care of you. You're in good hands - literally! 😏 Now, let's get you all nice and clean... 💕"
  },
  {
    id: 'medicine',
    name: 'Give Medicine',
    emoji: '💊',
    description: 'Time for pills',
    color: 'from-green-400 to-emerald-500',
    dialogue: "Medicine time! 💊 Open wide, say 'ahh'... Good patient! Here's your vitamin L (that stands for Love, of course). Take it with a kiss from your nurse for maximum effectiveness! *kisses your forehead* There, all better! 💕"
  },
  {
    id: 'bedtime',
    name: 'Tuck Into Bed',
    emoji: '🛏️',
    description: 'Bedtime care',
    color: 'from-indigo-400 to-purple-500',
    dialogue: "Time for bed, my dear patient! 🛏️ Let me tuck you in nice and cozy... *fluffs your pillow* There we go! Do you want me to stay and hold your hand until you fall asleep? Actually, forget what you want - I'm staying anyway! Sweet dreams, baby! 💕"
  },
  {
    id: 'nightwatch',
    name: 'Night Watch',
    emoji: '🌙',
    description: 'All night care',
    color: 'from-violet-500 to-purple-600',
    dialogue: "I'm on night duty tonight, which means I'll be watching over you all night! 🌙 If you need anything - water, an extra blanket, a midnight cuddle - just call for Nurse Puntuu. I'll be right by your side, making sure you rest well... and maybe sneaking a kiss while you sleep! 💕"
  },
  {
    id: 'discharge',
    name: 'Discharge Day',
    emoji: '🎉',
    description: 'Time to go home',
    color: 'from-pink-500 to-rose-600',
    dialogue: "Congratulations, you're being discharged! 🎉 But wait... I'm going to miss taking care of you! Here's my prescription for home: unlimited hugs, daily kisses, and one Nurse Puntuu to take home with you! That last one is non-negotiable. I'm coming with you! 💕"
  },
];

const ScenarioModal = ({ 
  scenario, 
  onClose 
}: { 
  scenario: Scenario; 
  onClose: () => void 
}) => {
  const [isCaring, setIsCaring] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleStart = () => {
    setIsCaring(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
    setTimeout(() => {
      setIsCaring(false);
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
            animate={isCaring ? { 
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, 10, -10, 5, 0]
            } : { y: [0, -5, 0] }}
            transition={isCaring ? { duration: 1.8 } : { duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {scenario.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">{scenario.name}</h3>
          <p className="text-white/80">{scenario.description}</p>
        </div>

        {/* Heartbeat Animation */}
        {isCaring && (
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </motion.div>
          </div>
        )}

        {/* Dialogue */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-2xl">👩‍⚕️</span>
            <p className="text-white font-serif italic text-sm leading-relaxed">
              {complete ? scenario.dialogue : "Tap the button to receive Nurse Puntuu's care..."}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {!complete && !isCaring && (
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
            Receive Care
          </motion.button>
        )}

        {isCaring && (
          <div className="text-center py-4">
            <motion.p 
              className="text-white animate-pulse"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💉 Nurse is taking care of you...
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
            <p className="text-white text-sm">You're all taken care of! 💕</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const NursePatientRoleplay = () => {
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
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          👩‍⚕️💉
        </motion.div>
        <h3 className="text-xl font-serif text-pink-300 mb-2">
          Nurse & Patient
        </h3>
        <p className="text-white/60 text-sm">
          Nurse Puntuu will take care of you! 💕
        </p>
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-pink-400 text-sm">
          💉 {completedScenarios.size}/{scenarios.length} treatments completed!
        </span>
      </div>

      {/* Hospital Banner */}
      <motion.div
        className="bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-2xl p-4 border border-pink-400/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-red-400 fill-red-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">Love Ward</p>
            <p className="text-white/60 text-xs">Nurse Puntuu's Special Care 💕</p>
          </div>
        </div>
        <p className="text-white/80 text-sm italic">
          "I'm your nurse, your caretaker, and your biggest fan! Let me make you feel better!"
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

      {/* Medical Supplies */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <Syringe className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Syringe</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Thermometer className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Thermo</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Pill className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Pills</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <BedDouble className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Bed</p>
        </div>
      </div>

      {/* Quote */}
      <motion.div
        className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "I'll nurse you back to health with love and kisses! 💉💕"
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
