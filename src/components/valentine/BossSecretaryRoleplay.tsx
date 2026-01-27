import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Heart, Coffee, FileText, X, Clock, Calendar } from "lucide-react";
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
    id: 'morning',
    name: 'Morning Greeting',
    emoji: '🌅',
    description: 'Start the workday right',
    color: 'from-amber-400 to-orange-500',
    dialogue: "Good morning, Boss! ☕ I brought you your favorite coffee, just the way you like it. I also reorganized your schedule to make sure you have a lunch break today... with me, if you don't mind? 😏 Your first meeting isn't until 10, so we have some time for... important business discussions. 💕"
  },
  {
    id: 'coffee',
    name: 'Coffee Break',
    emoji: '☕',
    description: 'Special coffee delivery',
    color: 'from-amber-500 to-yellow-600',
    dialogue: "I noticed you've been working so hard, Boss... ☕ Here's your coffee with extra love. I added a little heart in the foam - can you see it? Just like the heart I have for you. Should I stay and keep you company? I can massage those tense shoulders while you work... 💕"
  },
  {
    id: 'meeting',
    name: 'Private Meeting',
    emoji: '🚪',
    description: 'Behind closed doors',
    color: 'from-purple-500 to-indigo-600',
    dialogue: "You wanted to see me in your office, Boss? 🚪 *closes door* I've cleared your schedule for the next hour. It's just you and me now... What did you want to discuss? Or maybe... you just wanted to spend some quality time with your favorite secretary? 😏💕"
  },
  {
    id: 'overtime',
    name: 'Working Late',
    emoji: '🌙',
    description: 'Overtime together',
    color: 'from-indigo-500 to-purple-600',
    dialogue: "Everyone else has gone home, Boss... 🌙 It's just you and me in the whole building. I ordered dinner for us - your favorite! Let's take a break from those reports. The couch in your office looks comfortable... maybe we could watch a movie on your laptop? 💕"
  },
  {
    id: 'promotion',
    name: 'Special Promotion',
    emoji: '⭐',
    description: 'Career advancement',
    color: 'from-yellow-400 to-amber-500',
    dialogue: "A promotion? For me? ⭐ Oh Boss, you're too kind! How can I ever thank you enough? Maybe... I could show my gratitude with a thank-you dinner? Or a thank-you kiss? Or maybe I'll just be the best secretary-girlfriend you've ever had! 💕"
  },
  {
    id: 'jealous',
    name: 'Jealous Moment',
    emoji: '😤',
    description: 'Protective feelings',
    color: 'from-rose-500 to-red-600',
    dialogue: "Who was that person flirting with you at the meeting? 😤 I don't like the way they were looking at you, Boss. You're MY boss, and I'm YOUR secretary! Maybe I need to remind you why you should only have eyes for me... *adjusts your tie and stands very close* Better? 💕"
  },
  {
    id: 'vacation',
    name: 'Business Trip',
    emoji: '✈️',
    description: 'Travel together',
    color: 'from-cyan-500 to-blue-600',
    dialogue: "A business trip? Just the two of us? ✈️ I already booked the flights and... oops, it seems like only rooms with one king bed were available! What a coincidence, right? 😏 Don't worry Boss, I'll take very good care of you on this trip! 💕"
  },
  {
    id: 'surprise',
    name: 'Office Surprise',
    emoji: '🎁',
    description: 'Special gift',
    color: 'from-pink-500 to-rose-600',
    dialogue: "Close your eyes, Boss! 🎁 I have a surprise for you... Ta-da! I decorated your office for your birthday! Just kidding, it's not your birthday - I just wanted to celebrate YOU today! Here's a cake, flowers, and... me! I'm your gift. Will you unwrap me? 😏💕"
  },
];

const ScenarioModal = ({ 
  scenario, 
  onClose 
}: { 
  scenario: Scenario; 
  onClose: () => void 
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleStart = () => {
    setIsTyping(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
    setTimeout(() => {
      setIsTyping(false);
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
            animate={isTyping ? { 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            } : { scale: [1, 1.05, 1] }}
            transition={isTyping ? { duration: 0.5, repeat: 3 } : { duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {scenario.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">{scenario.name}</h3>
          <p className="text-white/80">{scenario.description}</p>
        </div>

        {/* Typing Animation */}
        {isTyping && (
          <div className="flex justify-center mb-4 gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}

        {/* Dialogue */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-2xl">👩‍💼</span>
            <p className="text-white font-serif italic text-sm leading-relaxed">
              {complete ? scenario.dialogue : "Click the button to see what your secretary has to say..."}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {!complete && !isTyping && (
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold flex items-center justify-center gap-2"
          >
            <Briefcase className="w-5 h-5" />
            Call Secretary
          </motion.button>
        )}

        {isTyping && (
          <div className="text-center py-4">
            <motion.p 
              className="text-white animate-pulse"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💼 Your secretary is coming...
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
            <p className="text-white text-sm">At your service, Boss! 💕</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const BossSecretaryRoleplay = () => {
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
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          👩‍💼💼
        </motion.div>
        <h3 className="text-xl font-serif text-amber-300 mb-2">
          Boss & Secretary
        </h3>
        <p className="text-white/60 text-sm">
          At your service, Boss! 💕
        </p>
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-amber-400 text-sm">
          💼 {completedScenarios.size}/{scenarios.length} office moments!
        </span>
      </div>

      {/* Office Banner */}
      <motion.div
        className="bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-2xl p-4 border border-amber-400/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Briefcase className="w-8 h-8 text-amber-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">Love Corporation</p>
            <p className="text-white/60 text-xs">Where romance meets business 💕</p>
          </div>
        </div>
        <p className="text-white/80 text-sm italic">
          "The best part of being your boss is having you as my secretary... and my love!"
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

      {/* Office Items */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <Coffee className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Coffee</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <FileText className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Reports</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Calendar className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Schedule</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <Clock className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <p className="text-white/80 text-xs">Overtime</p>
        </div>
      </div>

      {/* Quote */}
      <motion.div
        className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Being your secretary is my dream job, Boss! 💼💕"
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
