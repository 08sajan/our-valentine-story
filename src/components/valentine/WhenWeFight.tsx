import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CloudRain, Sun, Sparkles, X, HeartHandshake } from "lucide-react";
import ReactDOM from "react-dom";

interface FightResolution {
  id: string;
  title: string;
  letter: string;
  emoji: string;
  healing: string;
}

const fightResolutions: FightResolution[] = [
  {
    id: "after-silence",
    title: "When We Go Silent 🤐",
    emoji: "🤐",
    letter: `My sweetheart, I know sometimes we go quiet after a fight. The silence hurts more than any words. But please know that even in my silence, my heart is screaming your name. I'm not ignoring you - I'm just processing, trying to find the right words to make it better. I hate every second I'm not talking to you. You are my favorite voice, my favorite sound. I promise, no silence will ever mean I love you less. 💔➡️❤️`,
    healing: "Deep breaths, remember why we fell in love"
  },
  {
    id: "said-wrong-things",
    title: "When Words Hurt 😢",
    emoji: "😢",
    letter: `Babe, if I said something that hurt you, please know it came from a moment of weakness, never from my heart. My heart only knows how to love you. Words spoken in anger are like storms - they pass, but our love is the sky that remains forever. I am so sorry if I ever made you feel less than the queen you are. You deserve only the sweetest words, and I promise to try harder every single day. 🌧️➡️🌈`,
    healing: "A tight virtual hug and 'I'm sorry' 100 times"
  },
  {
    id: "misunderstanding",
    title: "When We Misunderstand 🔄",
    emoji: "🔄",
    letter: `My love, sometimes we see the same thing but from different angles. And that's okay - it means we're both passionate, we both care. I never want to be right at the cost of making you feel wrong. Even if we see things differently, I will always, always try to see it from your eyes. Because your perspective matters more to me than winning any argument. Let's talk it out, sweetheart. 🗣️💕`,
    healing: "A calm conversation with 'I understand' and 'Tell me more'"
  },
  {
    id: "space-needed",
    title: "When You Need Space 🌙",
    emoji: "🌙",
    letter: `I know sometimes you need space, and even though it hurts to be away from you, I respect it. I'll be right here, waiting with open arms whenever you're ready. Your peace matters more to me than my impatience. Take all the time you need - I'm not going anywhere. Not now, not ever. This love is permanent, love. 🔐💗`,
    healing: "Patience, trust, and a reminder that 'I'm here when you're ready'"
  },
  {
    id: "jealousy-moment",
    title: "When Jealousy Strikes 💢",
    emoji: "💢",
    letter: `Sweetheart, if I ever seemed jealous or possessive, it's only because I'm terrified of losing the most precious thing in my life - you. But I trust you with all my heart. Jealousy is just fear dressed in anger, and I'm working on it. You are free to be you, and I will always be secure in our love because I know what we have is real. You chose me, and that's enough. 🛡️❤️`,
    healing: "Reassurance, trust-building, and 'You're my only one'"
  },
  {
    id: "small-fights",
    title: "When Small Things Get Big 🐜➡️🐘",
    emoji: "🐜",
    letter: `Sometimes we fight about the smallest things - and later we laugh about how silly it was. But in the moment, it feels huge. I'm sorry for every small thing I made into a big deal. Let's promise to laugh at the little stuff and save our energy for dancing together instead. Life is too short for silly fights, my love. Let's giggle more. 😄💖`,
    healing: "A tickle war and 'This is so silly, I love you'"
  },
  {
    id: "different-moods",
    title: "When Our Moods Clash 🌪️",
    emoji: "🌪️",
    letter: `Some days I'm cloudy when you're sunny, or stormy when you need calm. I'm sorry for the days my mood affected yours. I'm learning to manage my storms so they don't rain on your parade. You deserve sunshine every single day, and I want to be your sun, not your storm. Let's weather this together, always. ⛈️➡️☀️`,
    healing: "Acknowledge moods, give gentle space, then reconnect"
  },
  {
    id: "making-up",
    title: "Making Up Is Beautiful 💑",
    emoji: "💑",
    letter: `You know what, babe? The best part of any fight is the making up. That moment when we look at each other and realize nothing matters more than us. When I see your face soften and that smile return - that's when I fall in love with you all over again. Every fight makes us stronger. Every makeup session makes us closer. I love you through it all. 🤗💕`,
    healing: "Kisses, cuddles, and 'I love you more than any fight'"
  },
  {
    id: "feeling-distant",
    title: "When We Feel Distant 🌌",
    emoji: "🌌",
    letter: `My love, sometimes we feel miles apart even when we're together. Life gets busy, stress takes over, and we forget to connect. But I want you to know - no matter how distant we feel, my heart is always reaching for yours. Let's pause, look into each other's eyes, and remember why we chose this forever together. 💫`,
    healing: "A long, deep conversation and quality time together"
  },
  {
    id: "feeling-unheard",
    title: "When You Feel Unheard 👂",
    emoji: "👂",
    letter: `Sweetheart, if you ever feel like I'm not listening, please tell me. Your voice is the most important sound in my world. I want to hear every thought, every worry, every dream. I'm sorry if I ever made you feel invisible. You are seen, you are heard, you are cherished. Always. 💝`,
    healing: "Active listening, eye contact, and 'I hear you'"
  },
  {
    id: "overthinking",
    title: "When We Overthink 🧠",
    emoji: "🧠",
    letter: `My babe, sometimes our minds create problems that don't exist. We overthink a look, a word, a silence. But please remember - my love for you is simple and pure. No hidden meanings, no secret anger. Just love, always love. Let's talk before we spiral, okay? 💕`,
    healing: "Open communication and 'Tell me what's on your mind'"
  },
  {
    id: "feeling-insecure",
    title: "When Insecurity Creeps In 🥺",
    emoji: "🥺",
    letter: `My love, insecurity is a liar. It whispers that you're not enough, that I might leave, that this is too good to be true. But listen to me - you are MORE than enough. I chose you, I choose you every day, and I will keep choosing you forever. Never doubt how much you mean to me. 💖`,
    healing: "Reassurance, compliments, and extra love"
  }
];

const ResolutionModal = ({
  resolution,
  onClose
}: {
  resolution: FightResolution;
  onClose: () => void;
}) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      {/* Floating healing elements */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['💕', '🌈', '☀️', '🤗', '💖', '✨', '🌸', '💗'][i % 8]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gradient-to-b from-blue-900/60 to-purple-900/60 rounded-3xl p-6 max-w-md w-full max-h-[85vh] overflow-y-auto border border-blue-500/30"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {/* Title with emoji */}
        <div className="text-center mb-6">
          <motion.span
            className="text-6xl block mb-4"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {resolution.emoji}
          </motion.span>
          <h3 className="text-2xl font-serif text-blue-300">
            {resolution.title}
          </h3>
        </div>

        {/* Letter */}
        <div className="bg-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/90 font-serif leading-relaxed text-justify">
            {resolution.letter}
          </p>
        </div>

        {/* Healing section */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 border border-green-500/30">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HeartHandshake size={28} className="text-green-400" />
            </motion.div>
            <div>
              <p className="text-green-300 text-sm font-medium">💚 How We Heal</p>
              <p className="text-white font-medium">{resolution.healing}</p>
            </div>
          </div>
        </div>

        {/* Closing affirmation */}
        <motion.p
          className="text-center text-pink-300 font-serif mt-4 italic"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          "Every storm ends with a rainbow, my love" 🌈
        </motion.p>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const WhenWeFight = () => {
  const [selectedResolution, setSelectedResolution] = useState<FightResolution | null>(null);
  const [healedCount, setHealedCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('fight-healed-count');
    if (saved) setHealedCount(parseInt(saved));
  }, []);

  const handleOpen = (resolution: FightResolution) => {
    setSelectedResolution(resolution);
    const newCount = healedCount + 1;
    setHealedCount(newCount);
    localStorage.setItem('fight-healed-count', String(newCount));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          className="flex justify-center gap-2 text-4xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CloudRain className="text-blue-400" size={40} />
          <span>➡️</span>
          <Sun className="text-yellow-400" size={40} />
        </motion.div>
        <h3 className="text-xl font-serif text-blue-300">When We Fight</h3>
        <p className="text-white/60 text-sm">
          Because every storm ends with us holding hands 💕
        </p>
        <p className="text-green-400 text-xs">
          💚 Healed together {healedCount} times
        </p>
      </div>

      {/* Resolution cards */}
      <div className="grid grid-cols-2 gap-3">
        {fightResolutions.map((resolution, index) => (
          <motion.button
            key={resolution.id}
            onClick={() => handleOpen(resolution)}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-4 text-center border border-blue-500/30 hover:border-blue-400/60 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="text-3xl block mb-2"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
            >
              {resolution.emoji}
            </motion.span>
            <p className="text-white/90 text-sm font-medium">
              {resolution.title.replace(/\s*[\p{Emoji}\u200d]+\s*/gu, '')}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Bottom affirmation */}
      <motion.div
        className="text-center bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-4 border border-pink-500/20"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-pink-300 font-serif">
          "We don't fight against each other - we fight for us" 💑
        </p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedResolution && (
          <ResolutionModal
            resolution={selectedResolution}
            onClose={() => setSelectedResolution(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
