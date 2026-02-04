import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartCrack, Sparkles, PartyPopper, Music } from "lucide-react";
import ReactDOM from "react-dom";

// Grand Celebration Modal
const GrandCelebrationModal = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1000);
    const timer2 = setTimeout(() => setPhase(2), 3000);
    const timer3 = setTimeout(() => setPhase(3), 5000);
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.body.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a0505 0%, #4a1942 30%, #2d1a4a 60%, #1a0a2e 100%)',
      }}
    >
      {/* Massive confetti explosion */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: -50,
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: [0, Math.sin(i) * 100],
            rotate: [0, 1080],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        >
          {['🎉', '💕', '❤️', '💖', '🎊', '✨', '💗', '🌹', '🥳', '💝', '🎈', '💐', '🌸', '💘'][i % 14]}
        </motion.div>
      ))}

      {/* Fireworks */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`firework-${i}`}
          className="absolute"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${20 + Math.random() * 30}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <div className="relative">
            {[...Array(8)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9ff3'][j % 5],
                }}
                animate={{
                  x: [0, Math.cos(j * 45 * Math.PI / 180) * 60],
                  y: [0, Math.sin(j * 45 * Math.PI / 180) * 60],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(251, 113, 133, 0.4) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center p-6 max-w-md">
        {/* Giant beating heart */}
        <motion.div
          className="text-8xl mb-6"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
        >
          💕
        </motion.div>

        {/* Phase-based content */}
        <AnimatePresence mode="wait">
          {phase >= 0 && (
            <motion.h1
              key="title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif mb-4"
              style={{
                background: 'linear-gradient(135deg, #fb7185, #f472b6, #c084fc, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SHE SAID YES! 🎉💖🎉
            </motion.h1>
          )}
        </AnimatePresence>

        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <p className="text-white text-xl font-serif mb-4">
              You just made me the happiest person in the entire universe!
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {['💃', '🕺', '👨‍❤️‍👩', '💑', '🥂'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-4xl"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 rounded-2xl p-6 mb-6 backdrop-blur-sm"
          >
            <p className="text-pink-300 font-serif text-lg italic">
              "I promise to love you endlessly, protect your heart always, and make you smile every single day. You are my Valentine forever, my love!"
            </p>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Music notes */}
            <div className="flex justify-center gap-2 mb-4">
              {['🎵', '🎶', '🎵', '🎶', '🎵'].map((note, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  {note}
                </motion.span>
              ))}
            </div>

            <motion.button
              onClick={onClose}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full text-white font-bold text-lg shadow-2xl shadow-pink-500/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <PartyPopper className="inline mr-2" size={24} />
              Continue Our Love Story! 💕
            </motion.button>
          </motion.div>
        )}

        {/* Emoji celebration row */}
        <motion.div
          className="flex justify-center gap-2 flex-wrap mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {['💕', '❤️', '💖', '💗', '💝', '🌹', '✨', '💐', '🥰', '😘', '🎊', '🎉', '💘', '💞'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 2 + i * 0.08, type: 'spring' }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
};

// Heartbreak Modal
const HeartbreakModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0505 0%, #1a0a0a 50%, #0a0510 100%)',
      }}
    >
      {/* Falling broken hearts */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: -30,
          }}
          animate={{
            y: ['0vh', '120vh'],
            rotate: [0, 360],
            opacity: [1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        >
          💔
        </motion.div>
      ))}

      {/* Rain effect */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
            width: '2px',
            height: '20px',
            background: 'rgba(156, 163, 175, 0.4)',
            borderRadius: '4px',
          }}
          animate={{
            y: ['0vh', '110vh'],
          }}
          transition={{
            duration: 0.7 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center p-6 max-w-md">
        <motion.div
          animate={{
            scale: [1, 0.9, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <HeartCrack size={120} className="text-red-400 mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif text-rose-300 mb-4"
        >
          My heart is broken... 💔
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 font-serif text-lg mb-6"
        >
          But my love for you will never fade...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10"
        >
          <p className="text-rose-300 font-serif text-xl italic">
            "I will ask you again next year, and the year after, and every year until you say yes. Because you are my forever, sweetheart."
          </p>
        </motion.div>

        <motion.p
          className="text-white/50 text-sm mb-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Waiting for you... always 💕
        </motion.p>

        <motion.button
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white/80 font-medium"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
          whileTap={{ scale: 0.95 }}
        >
          I'll wait for you forever 💔
        </motion.button>
      </div>
    </motion.div>,
    document.body
  );
};

export const ValentineProposal = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHeartbreak, setShowHeartbreak] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('valentine-proposal-answer');
    if (saved) {
      setAnswer(saved as 'yes' | 'no');
      setHasAnswered(true);
    }
  }, []);

  const handleYes = () => {
    setAnswer('yes');
    setHasAnswered(true);
    setShowCelebration(true);
    localStorage.setItem('valentine-proposal-answer', 'yes');
  };

  const handleNo = () => {
    setAnswer('no');
    setHasAnswered(true);
    setShowHeartbreak(true);
    localStorage.setItem('valentine-proposal-answer', 'no');
  };

  const resetAnswer = () => {
    setAnswer(null);
    setHasAnswered(false);
    localStorage.removeItem('valentine-proposal-answer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          className="text-5xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>
        <h3 className="text-2xl font-serif text-pink-300">The Big Question</h3>
      </div>

      {/* Main question card */}
      <motion.div
        className="bg-gradient-to-b from-pink-900/50 to-rose-900/50 rounded-3xl p-8 border border-pink-500/30 text-center"
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Floating hearts around the card */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-xl"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {['💕', '❤️', '💖'][i % 3]}
          </motion.span>
        ))}

        <motion.p
          className="text-white text-2xl font-serif mb-6"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Will you be my Valentine? 💌
        </motion.p>

        <p className="text-pink-300/80 text-sm mb-8 font-serif italic">
          "My dearest love, I have loved you with every beat of my heart..."
        </p>

        {!hasAnswered ? (
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handleYes}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold text-lg shadow-lg shadow-pink-500/40"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="inline mr-2" size={20} />
              Yes! 💕
            </motion.button>
            <motion.button
              onClick={handleNo}
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-full text-white/70 font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Not yet...
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            {answer === 'yes' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <p className="text-green-400 text-xl mb-2">💕 You said YES! 💕</p>
                <p className="text-white/60 text-sm">We're celebrating forever!</p>
                <motion.button
                  onClick={() => setShowCelebration(true)}
                  className="mt-4 px-6 py-2 bg-pink-500/30 rounded-full text-pink-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Celebrate again! 🎉
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <p className="text-rose-400 text-lg mb-2">💔 I'll wait for you...</p>
                <p className="text-white/60 text-sm">Changed your mind?</p>
                <motion.button
                  onClick={resetAnswer}
                  className="mt-4 px-6 py-2 bg-pink-500/30 rounded-full text-pink-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Answer again 💕
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showCelebration && (
          <GrandCelebrationModal onClose={() => setShowCelebration(false)} />
        )}
        {showHeartbreak && (
          <HeartbreakModal onClose={() => setShowHeartbreak(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
