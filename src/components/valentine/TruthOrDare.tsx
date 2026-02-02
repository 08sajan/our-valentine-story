import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flame, RefreshCw, Sparkles, Check, X } from 'lucide-react';

interface Challenge {
  id: string;
  text: string;
  intensity: 'sweet' | 'spicy' | 'hot';
}

const truths: Challenge[] = [
  // Sweet (15)
  { id: 't1', text: "What's your favorite memory of us together?", intensity: 'sweet' },
  { id: 't2', text: "When did you first know you loved me?", intensity: 'sweet' },
  { id: 't3', text: "What's the cutest thing I do without realizing?", intensity: 'sweet' },
  { id: 't4', text: "What song reminds you of me?", intensity: 'sweet' },
  { id: 't5', text: "What's your favorite thing about our relationship?", intensity: 'sweet' },
  { id: 't6', text: "If you could relive one day with me, which would it be?", intensity: 'sweet' },
  { id: 't7', text: "What made you smile today thinking about me?", intensity: 'sweet' },
  { id: 't8', text: "What's your dream date with me?", intensity: 'sweet' },
  { id: 't9', text: "What habit of mine do you secretly love?", intensity: 'sweet' },
  { id: 't10', text: "What do you want us to do together in the future?", intensity: 'sweet' },
  { id: 't11', text: "What's the silliest thing you love about me?", intensity: 'sweet' },
  { id: 't12', text: "If we had a song, what would it be?", intensity: 'sweet' },
  { id: 't13', text: "What's one thing I do that makes you feel most loved?", intensity: 'sweet' },
  { id: 't14', text: "What's your favorite pet name for me?", intensity: 'sweet' },
  { id: 't15', text: "Where do you want our first trip together to be?", intensity: 'sweet' },
  // Spicy (15)
  { id: 't16', text: "What's your biggest secret fantasy about us?", intensity: 'spicy' },
  { id: 't17', text: "What's the most attractive thing about me?", intensity: 'spicy' },
  { id: 't18', text: "Have you ever dreamed about me? What happened?", intensity: 'spicy' },
  { id: 't19', text: "What outfit do you wish I would wear?", intensity: 'spicy' },
  { id: 't20', text: "What's the naughtiest thought you've had about me?", intensity: 'spicy' },
  { id: 't21', text: "Where's a place you want to kiss me that you haven't yet?", intensity: 'spicy' },
  { id: 't22', text: "What turns you on most about me?", intensity: 'spicy' },
  { id: 't23', text: "What's something you've been too shy to tell me?", intensity: 'spicy' },
  { id: 't24', text: "What body part of mine do you find most attractive?", intensity: 'spicy' },
  { id: 't25', text: "What do you think about when you miss me at night?", intensity: 'spicy' },
  { id: 't26', text: "If I was there right now, what would you do first?", intensity: 'spicy' },
  { id: 't27', text: "What's your favorite way to be touched by me?", intensity: 'spicy' },
  { id: 't28', text: "What's one thing that makes your heart race about me?", intensity: 'spicy' },
  { id: 't29', text: "Describe your perfect romantic evening with me...", intensity: 'spicy' },
  { id: 't30', text: "What do you secretly wish we could do more often?", intensity: 'spicy' },
  // Hot (15)
  { id: 't31', text: "Describe your wildest fantasy with me in detail...", intensity: 'hot' },
  { id: 't32', text: "What's the hottest moment you've imagined with me?", intensity: 'hot' },
  { id: 't33', text: "If we were alone right now, what would you want to do?", intensity: 'hot' },
  { id: 't34', text: "What's a new thing you want to try with me in bed?", intensity: 'hot' },
  { id: 't35', text: "Tell me your most secret desire...", intensity: 'hot' },
  { id: 't36', text: "What position do you fantasize about most?", intensity: 'hot' },
  { id: 't37', text: "Describe how you want me to kiss you right now...", intensity: 'hot' },
  { id: 't38', text: "What would you do if I showed up at your door right now?", intensity: 'hot' },
  { id: 't39', text: "What's the dirtiest text you've wanted to send me?", intensity: 'hot' },
  { id: 't40', text: "Where's the most adventurous place you'd want us to get intimate?", intensity: 'hot' },
  { id: 't41', text: "What sounds do you want to hear me make?", intensity: 'hot' },
  { id: 't42', text: "Describe your ultimate night of passion with me...", intensity: 'hot' },
  { id: 't43', text: "What's something naughty you want me to do to you?", intensity: 'hot' },
  { id: 't44', text: "If I could do anything to you right now, what would it be?", intensity: 'hot' },
  { id: 't45', text: "Tell me exactly what you're craving from me tonight...", intensity: 'hot' },
];

const dares: Challenge[] = [
  // Sweet (15)
  { id: 'd1', text: "Send me a voice note saying 'I love you' in your cutest voice", intensity: 'sweet' },
  { id: 'd2', text: "Write me a 3-line poem right now", intensity: 'sweet' },
  { id: 'd3', text: "Tell me 5 things you love about me without thinking", intensity: 'sweet' },
  { id: 'd4', text: "Send me your most beautiful selfie right now", intensity: 'sweet' },
  { id: 'd5', text: "Call me and sing our favorite song for 30 seconds", intensity: 'sweet' },
  { id: 'd6', text: "Make a promise to me and keep it forever", intensity: 'sweet' },
  { id: 'd7', text: "Record yourself blowing me a kiss", intensity: 'sweet' },
  { id: 'd8', text: "Text me 'I miss you' in 3 different ways", intensity: 'sweet' },
  { id: 'd9', text: "Share your favorite photo of us and tell me why", intensity: 'sweet' },
  { id: 'd10', text: "Give me a virtual hug (describe it in detail!)", intensity: 'sweet' },
  { id: 'd11', text: "Send me a good morning voice note tomorrow", intensity: 'sweet' },
  { id: 'd12', text: "Draw a heart and write our names in it, send a pic", intensity: 'sweet' },
  { id: 'd13', text: "Tell me something you've never told anyone else", intensity: 'sweet' },
  { id: 'd14', text: "List 3 reasons why you're grateful for us", intensity: 'sweet' },
  { id: 'd15', text: "Send me a selfie making your silliest face", intensity: 'sweet' },
  // Spicy (15)
  { id: 'd16', text: "Send me a flirty photo (keep it classy but hot!)", intensity: 'spicy' },
  { id: 'd17', text: "Describe what you'd do if I was there right now", intensity: 'spicy' },
  { id: 'd18', text: "Send me a voice note whispering something romantic", intensity: 'spicy' },
  { id: 'd19', text: "Tell me what you're wearing... in detail", intensity: 'spicy' },
  { id: 'd20', text: "Describe your perfect romantic night with me", intensity: 'spicy' },
  { id: 'd21', text: "Write a flirty message that would make me blush", intensity: 'spicy' },
  { id: 'd22', text: "Record yourself saying something that'll give me butterflies", intensity: 'spicy' },
  { id: 'd23', text: "Send me a photo that shows off your best feature", intensity: 'spicy' },
  { id: 'd24', text: "Describe how you'd seduce me step by step", intensity: 'spicy' },
  { id: 'd25', text: "Tell me your favorite way to be kissed", intensity: 'spicy' },
  { id: 'd26', text: "Send a voice note telling me how much you want me", intensity: 'spicy' },
  { id: 'd27', text: "Describe your ideal morning waking up next to me", intensity: 'spicy' },
  { id: 'd28', text: "Tell me what you find irresistible about me", intensity: 'spicy' },
  { id: 'd29', text: "Send a pic of you in your favorite outfit", intensity: 'spicy' },
  { id: 'd30', text: "Whisper three things you want to do with me", intensity: 'spicy' },
  // Hot (15)
  { id: 'd31', text: "Describe exactly how you want me to kiss you", intensity: 'hot' },
  { id: 'd32', text: "Tell me in detail what happens when we finally meet", intensity: 'hot' },
  { id: 'd33', text: "Write me the most passionate message you can", intensity: 'hot' },
  { id: 'd34', text: "Describe your ultimate fantasy date from start to... finish", intensity: 'hot' },
  { id: 'd35', text: "Send me a voice note that'll make me crazy for you", intensity: 'hot' },
  { id: 'd36', text: "Tell me exactly what you want me to do when I see you", intensity: 'hot' },
  { id: 'd37', text: "Describe how you'd wake me up on a lazy Sunday morning", intensity: 'hot' },
  { id: 'd38', text: "Send me a text that would make me lose my mind", intensity: 'hot' },
  { id: 'd39', text: "Describe your perfect night together, don't hold back", intensity: 'hot' },
  { id: 'd40', text: "Tell me what sounds you want to hear from me", intensity: 'hot' },
  { id: 'd41', text: "Whisper your deepest desire in a voice note", intensity: 'hot' },
  { id: 'd42', text: "Describe how you'd tease me until I can't take it", intensity: 'hot' },
  { id: 'd43', text: "Tell me where you want my hands on you", intensity: 'hot' },
  { id: 'd44', text: "Describe what you'd do to me if no one was watching", intensity: 'hot' },
  { id: 'd45', text: "Send a voice note telling me your wildest fantasy", intensity: 'hot' },
];

const intensityInfo = {
  sweet: { color: 'from-pink-400 to-rose-400', emoji: '💕', label: 'Sweet' },
  spicy: { color: 'from-orange-400 to-red-400', emoji: '🌶️', label: 'Spicy' },
  hot: { color: 'from-red-500 to-pink-600', emoji: '🔥', label: 'Hot' }
};

export const TruthOrDare = () => {
  const [mode, setMode] = useState<'truth' | 'dare' | null>(null);
  const [intensity, setIntensity] = useState<'sweet' | 'spicy' | 'hot'>('sweet');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [showChoice, setShowChoice] = useState(true);

  const getChallenge = (type: 'truth' | 'dare') => {
    const challenges = type === 'truth' ? truths : dares;
    const filtered = challenges.filter(c => c.intensity === intensity && !completed.includes(c.id));
    
    if (filtered.length === 0) {
      const allOfIntensity = challenges.filter(c => c.intensity === intensity);
      if (allOfIntensity.length > 0) {
        return allOfIntensity[Math.floor(Math.random() * allOfIntensity.length)];
      }
    }
    
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const handleChoice = (type: 'truth' | 'dare') => {
    setMode(type);
    setCurrentChallenge(getChallenge(type));
    setShowChoice(false);
  };

  const handleComplete = () => {
    if (currentChallenge) {
      setCompleted(prev => [...prev, currentChallenge.id]);
    }
    setShowChoice(true);
    setCurrentChallenge(null);
    setMode(null);
  };

  const handleSkip = () => {
    if (mode) {
      setCurrentChallenge(getChallenge(mode));
    }
  };

  const handleNewGame = () => {
    setShowChoice(true);
    setCurrentChallenge(null);
    setMode(null);
  };

  const intensityStyle = intensityInfo[intensity];

  return (
    <div className="py-6 px-4 relative">
      {/* Floating sparkles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['✨', '💕', '🔥', '💫'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎯
          </motion.span>
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent">
            Truth or Dare
          </span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💕
          </motion.span>
        </motion.h2>
        <motion.p 
          className="text-white/70 text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          A romantic game just for us, love! 💕
        </motion.p>
      </div>

      {/* Intensity Selector */}
      <div className="flex justify-center gap-2 mb-6">
        {(['sweet', 'spicy', 'hot'] as const).map(int => {
          const info = intensityInfo[int];
          return (
            <button
              key={int}
              onClick={() => setIntensity(int)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                intensity === int
                  ? `bg-gradient-to-r ${info.color} text-white`
                  : 'bg-white/10 text-white/70'
              }`}
            >
              {info.emoji} {info.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {showChoice ? (
          <motion.div
            key="choice"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-4"
          >
            <motion.button
              onClick={() => handleChoice('truth')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-6 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Truth</h3>
                  <p className="text-white/70 text-sm">Answer honestly...</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleChoice('dare')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-6 rounded-3xl bg-gradient-to-r ${intensityStyle.color} text-white`}
            >
              <div className="flex items-center justify-center gap-3">
                <Flame className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Dare</h3>
                  <p className="text-white/70 text-sm">Are you brave enough?</p>
                </div>
              </div>
            </motion.button>

            <div className="text-center pt-4">
              <p className="text-white/40 text-sm">
                Completed: {completed.length} challenges
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div
              className={`rounded-3xl p-6 bg-gradient-to-br ${
                mode === 'truth' 
                  ? 'from-blue-500/20 to-purple-500/20 border-blue-500/30' 
                  : `${intensityStyle.color.replace('from-', 'from-').replace('to-', 'to-')}/20 border-pink-500/30`
              } border mb-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${
                  mode === 'truth' ? 'from-blue-500 to-purple-500' : intensityStyle.color
                } text-white`}>
                  {mode === 'truth' ? '💭 Truth' : '🔥 Dare'}
                </span>
                <span className="text-white/50 text-sm">
                  {intensityStyle.emoji} {intensityStyle.label}
                </span>
              </div>

              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {mode === 'truth' ? '🤔' : '😈'}
                </motion.div>
                <p className="text-white text-lg font-medium leading-relaxed">
                  {currentChallenge?.text}
                </p>
              </motion.div>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleSkip}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 rounded-2xl bg-white/10 text-white font-medium flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Skip
                </motion.button>
                <motion.button
                  onClick={handleComplete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-3 rounded-2xl bg-gradient-to-r ${
                    mode === 'truth' ? 'from-blue-500 to-purple-500' : intensityStyle.color
                  } text-white font-medium flex items-center justify-center gap-2`}
                >
                  <Check className="w-4 h-4" />
                  Done!
                </motion.button>
              </div>
            </motion.div>

            <button
              onClick={handleNewGame}
              className="w-full py-3 text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              ← Choose again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-white/5 rounded-2xl"
      >
        <h4 className="text-white/80 font-medium mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          How to Play
        </h4>
        <ul className="text-white/60 text-sm space-y-1">
          <li>• Choose your intensity level</li>
          <li>• Pick Truth or Dare</li>
          <li>• Complete the challenge honestly</li>
          <li>• No lying! That's the rule, babe! 💕</li>
        </ul>
      </motion.div>
    </div>
  );
};
