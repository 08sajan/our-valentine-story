import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

interface GrowthItem {
  id: string;
  herTrait: string;
  myGrowth: string;
  emoji: string;
  gradient: string;
  detail: string;
}

const growthItems: GrowthItem[] = [
  {
    id: '1',
    herTrait: 'Your Patience',
    myGrowth: 'I\'ve learned to slow down and appreciate the quiet moments.',
    emoji: '🕊️',
    gradient: 'from-blue-400 to-cyan-500',
    detail: 'Before you, I rushed through life like I was running out of time. But watching how you handle things with such grace and patience has transformed me. Now I savor every second with you. I pause to notice the small things - the way sunlight hits your face, the sound of your breathing when you\'re calm. You\'ve taught me that the best moments in life aren\'t rushed.'
  },
  {
    id: '2',
    herTrait: 'Your Kindness',
    myGrowth: 'You\'ve shown me how to be gentle with others and myself.',
    emoji: '💕',
    gradient: 'from-pink-400 to-rose-500',
    detail: 'Your compassion for others takes my breath away every single day. The way you care about people, even strangers, has softened my rough edges. I used to be harder, more guarded. But loving you has opened my heart in ways I never thought possible. Because of you, I\'m kinder to myself on my bad days. I forgive myself more easily. Your kindness is contagious.'
  },
  {
    id: '3',
    herTrait: 'Your Honesty',
    myGrowth: 'I\'ve become more open and vulnerable because you created a safe space for my true self.',
    emoji: '✨',
    gradient: 'from-amber-400 to-orange-500',
    detail: 'With you, I feel safe to be completely myself - the messy, imperfect, real me. You never judge me for my fears or insecurities. Instead, you hold space for all of me. This has taught me to be more honest, not just with you, but with myself. I\'ve learned that vulnerability isn\'t weakness - it\'s the deepest form of courage. And you gave me that courage.'
  },
  {
    id: '4',
    herTrait: 'Your Strength',
    myGrowth: 'Watching you face challenges with grace has inspired me to be braver.',
    emoji: '💪',
    gradient: 'from-emerald-400 to-teal-500',
    detail: 'I\'ve watched you go through hard times, and the way you handle adversity is nothing short of inspiring. You don\'t give up. You don\'t crumble. You bend, but you never break. Your resilience has shown me what true strength looks like. Because of you, I face my own battles with more courage. I know that if you can be that strong, I can find strength too.'
  },
  {
    id: '5',
    herTrait: 'Your Joy',
    myGrowth: 'You\'ve taught me to find happiness in the simplest things.',
    emoji: '🌈',
    gradient: 'from-violet-400 to-purple-500',
    detail: 'A sunset, a warm cup of tea, a random song, a silly meme - you find joy in everything. Before you, I was chasing big moments for happiness. But you\'ve shown me that life\'s magic is in the ordinary moments. Now I notice the colors of the sky. I appreciate the warmth of a lazy afternoon. Life is more colorful because you taught me where to look for the colors.'
  },
  {
    id: '6',
    herTrait: 'Your Faith in Me',
    myGrowth: 'Because you believe in my dreams, I\'ve started believing in them too.',
    emoji: '⭐',
    gradient: 'from-yellow-400 to-amber-500',
    detail: 'You see potential in me that I couldn\'t see in myself. When I doubt my abilities, you remind me of my strengths. When I want to give up, you push me forward. Your unwavering belief in me has been transformative. Dreams that once felt impossible now feel within reach. Because you believe I can do it, I\'ve started believing it too. You\'re my biggest cheerleader.'
  },
  {
    id: '7',
    herTrait: 'Your Forgiveness',
    myGrowth: 'You\'ve taught me that love isn\'t about perfection - it\'s about growing together.',
    emoji: '🤍',
    gradient: 'from-slate-400 to-gray-500',
    detail: 'I\'ve made mistakes. I\'ve said wrong things. I\'ve had bad days where I wasn\'t my best. But you\'ve forgiven me every time with such grace. You\'ve taught me that real love isn\'t about being perfect - it\'s about choosing each other despite the imperfections. Because of you, I\'ve learned to forgive myself and to extend that same grace to others.'
  },
  {
    id: '8',
    herTrait: 'Your Love',
    myGrowth: 'Simply being loved by you has made me want to become my best self.',
    emoji: '🌸',
    gradient: 'from-rose-400 to-pink-500',
    detail: 'Your love is healing. Your presence is medicine. Just knowing that you exist and that you chose me makes me want to be better - not because you ask for it, but because you deserve the best version of me. Every day I wake up wanting to be worthy of the love you give so freely. You haven\'t just become part of my life - you\'ve become the reason I want to live it fully.'
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
          "Before you, sweetheart, I was a different person. Not bad, but incomplete. 
          Like a puzzle missing its most important pieces. You came into my life 
          and painted colors I didn't know existed. Here's exactly how you've made me better..."
        </p>
        <div className="flex justify-center mt-4 gap-2">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </motion.div>
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
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="text-2xl"
                    animate={expandedId === item.id ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <div className="flex-1">
                    <p className="text-white font-semibold">
                      Because of {item.herTrait}...
                    </p>
                    <p className="text-white/70 text-sm mt-0.5">
                      {item.myGrowth}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/60" />
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
                    className={`mt-2 p-5 rounded-2xl bg-gradient-to-br ${item.gradient}/20 border-l-4`}
                    style={{ borderColor: 'rgba(255,255,255,0.5)' }}
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
                      <p className="text-white/90 leading-relaxed text-sm">
                        {item.detail}
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
          background: 'linear-gradient(145deg, rgba(255,100,150,0.25), rgba(255,150,180,0.15))',
          border: '1px solid rgba(255,100,150,0.4)'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-4"
        >
          💖
        </motion.div>
        <p className="text-white/90 text-base leading-relaxed mb-3">
          You haven't just become part of my life, Puntuu...
        </p>
        <p className="text-pink-300 font-bold text-lg">
          You've become the reason I want to be the best version of myself.
        </p>
        <p className="text-white/60 text-sm mt-3 italic">
          Every day with you is a day I become better. Thank you for existing. 💕
        </p>
      </motion.div>
    </div>
  );
};
