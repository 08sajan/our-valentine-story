import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface GrowthItem {
  id: string;
  herTrait: string;
  myGrowth: string;
  emoji: string;
  gradient: string;
}

const growthItems: GrowthItem[] = [
  {
    id: '1',
    herTrait: 'Your Patience',
    myGrowth: 'I\'ve learned to slow down and appreciate the quiet moments. Before you, I rushed through life. Now I savor every second with you.',
    emoji: '🕊️',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    id: '2',
    herTrait: 'Your Kindness',
    myGrowth: 'You\'ve shown me how to be gentle with others and myself. Your compassion has softened my rough edges.',
    emoji: '💕',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: '3',
    herTrait: 'Your Honesty',
    myGrowth: 'I\'ve become more open and vulnerable because you created a space where I feel safe to be my true self.',
    emoji: '✨',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: '4',
    herTrait: 'Your Strength',
    myGrowth: 'Watching you face challenges with grace has inspired me to be braver in my own battles.',
    emoji: '💪',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    id: '5',
    herTrait: 'Your Love for Life',
    myGrowth: 'You\'ve taught me to find joy in simple things - a sunset, a warm cup of tea, a random song. Life is more colorful with you.',
    emoji: '🌈',
    gradient: 'from-violet-400 to-purple-500'
  },
  {
    id: '6',
    herTrait: 'Your Belief in Me',
    myGrowth: 'Because you believe in my dreams, I\'ve started believing in them too. Your faith in me has been transformative.',
    emoji: '⭐',
    gradient: 'from-yellow-400 to-amber-500'
  },
  {
    id: '7',
    herTrait: 'Your Forgiveness',
    myGrowth: 'You\'ve taught me that love isn\'t about being perfect - it\'s about growing together and forgiving each other\'s flaws.',
    emoji: '🤍',
    gradient: 'from-slate-400 to-gray-500'
  },
  {
    id: '8',
    herTrait: 'Your Presence',
    myGrowth: 'Just being with you has made me a better person. Your energy is healing, and your love is my greatest teacher.',
    emoji: '🌸',
    gradient: 'from-rose-400 to-pink-500'
  }
];

export const GrowthArchive = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🌱 How You've Changed Me
        </motion.h2>
        <p className="text-white/70 text-sm">
          The beautiful ways you've shaped my soul
        </p>
      </div>

      {/* Intro Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-6 rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <p className="text-white/90 text-center italic leading-relaxed">
          "Before you, I was a different person. Not bad, but incomplete. 
          You came into my life and painted colors I didn't know existed. 
          Here's how you've made me better..."
        </p>
        <div className="flex justify-center mt-4">
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
        </div>
      </motion.div>

      {/* Growth Items */}
      <div className="space-y-3">
        {growthItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="w-full text-left"
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className={`p-4 rounded-2xl transition-all ${
                  expandedId === item.id 
                    ? `bg-gradient-to-r ${item.gradient}` 
                    : 'bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      Because of {item.herTrait}...
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === item.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5 text-white/60" />
                  </motion.div>
                </div>
              </div>
            </motion.button>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div 
                    className="mt-2 p-4 rounded-2xl"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                      borderLeft: '3px solid',
                      borderImage: `linear-gradient(to bottom, var(--tw-gradient-stops)) 1`
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0 mt-1" />
                      <p className="text-white/90 leading-relaxed text-sm">
                        {item.myGrowth}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Closing Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 rounded-2xl text-center"
        style={{
          background: 'linear-gradient(145deg, rgba(255,100,150,0.2), rgba(255,150,180,0.1))',
          border: '1px solid rgba(255,100,150,0.3)'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl mb-3"
        >
          💖
        </motion.div>
        <p className="text-white/90 text-sm leading-relaxed">
          You haven't just become part of my life...
        </p>
        <p className="text-pink-300 font-bold mt-2">
          You've become the reason I want to be the best version of myself.
        </p>
      </motion.div>
    </div>
  );
};
