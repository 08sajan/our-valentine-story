import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Flame, X, Sparkles, Eye, EyeOff } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Fantasy {
  id: string;
  title: string;
  description: string;
  emoji: string;
  intensity: 'soft' | 'medium' | 'hot';
}

const fantasies: Fantasy[] = [
  { id: '1', title: 'Candlelit Romance', description: 'Soft music, dim candlelight, rose petals on the bed... just you and me, taking our time.', emoji: '🕯️', intensity: 'soft' },
  { id: '2', title: 'Slow Dancing Close', description: 'No music needed, just our heartbeats syncing as we sway in the darkness.', emoji: '💃', intensity: 'soft' },
  { id: '3', title: 'Rainy Day Cuddles', description: 'The sound of rain, your body pressed against mine, nowhere to be but here.', emoji: '🌧️', intensity: 'soft' },
  { id: '4', title: 'Surprise at the Door', description: 'Coming home to find you waiting, the anticipation building with every step closer...', emoji: '🚪', intensity: 'medium' },
  { id: '5', title: 'Late Night Whispers', description: 'Secrets shared in the dark, hands exploring, discovering each other all over again.', emoji: '🌙', intensity: 'medium' },
  { id: '6', title: 'Morning After', description: 'Waking up tangled together, lazy kisses turning into something more.', emoji: '☀️', intensity: 'medium' },
  { id: '7', title: 'Passionate Reunion', description: 'After days apart, finally together, unable to keep our hands off each other.', emoji: '🔥', intensity: 'hot' },
  { id: '8', title: 'Wild & Free', description: 'No rules, no limits, just pure desire and connection.', emoji: '⚡', intensity: 'hot' },
  { id: '9', title: 'Forbidden Fantasy', description: 'That thing we\'ve only whispered about... finally making it real.', emoji: '💋', intensity: 'hot' },
];

const positions = [
  { id: '1', name: 'Missionary Magic', description: 'Classic, intimate, eye contact that speaks volumes', emoji: '💑' },
  { id: '2', name: 'Spooning Bliss', description: 'Close, warm, feeling every breath', emoji: '🥄' },
  { id: '3', name: 'Cowgirl Dreams', description: 'You take control, I admire the view', emoji: '🤠' },
  { id: '4', name: 'Doggy Style', description: 'Primal, passionate, deep connection', emoji: '🐕' },
  { id: '5', name: 'Lotus Love', description: 'Face to face, heart to heart, soul to soul', emoji: '🪷' },
  { id: '6', name: 'Standing Passion', description: 'Against the wall, urgent and intense', emoji: '🧱' },
  { id: '7', name: 'Reverse Cowgirl', description: 'A different perspective, same fire', emoji: '🔄' },
  { id: '8', name: 'The Bridge', description: 'Flexible, adventurous, deeply connected', emoji: '🌉' },
];

const scenarios: Fantasy[] = [
  { id: '1', title: 'Strangers at a Bar', description: 'Pretending we just met, flirting like the first time, building that tension all over again...', emoji: '🍸', intensity: 'medium' },
  { id: '2', title: 'Boss & Secretary', description: 'You walk into my office, close the door behind you... overtime takes on a new meaning.', emoji: '💼', intensity: 'hot' },
  { id: '3', title: 'Hotel Getaway', description: 'Anonymous room, do not disturb sign, nothing but us and 48 hours...', emoji: '🏨', intensity: 'hot' },
  { id: '4', title: 'Under the Stars', description: 'Secluded beach or rooftop, just us and the night sky, making our own fireworks.', emoji: '⭐', intensity: 'medium' },
  { id: '5', title: 'Shower Surprise', description: 'Steam, hot water, slippery bodies, nowhere to go but closer...', emoji: '🚿', intensity: 'hot' },
  { id: '6', title: 'Kitchen Counter', description: 'Cooking together turns into tasting each other, the meal can wait...', emoji: '🍳', intensity: 'hot' },
];

const intensityColors = {
  soft: 'from-pink-400 to-rose-400',
  medium: 'from-orange-400 to-red-400',
  hot: 'from-red-500 to-pink-600'
};

const ContentModal = ({ content, type, onClose }: { content: any; type: string; onClose: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at center, rgba(255,50,100,0.2) 0%, rgba(0,0,0,0.95) 70%)' }}
      onClick={onClose}
    >
      {/* Floating emojis */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{ x: `${Math.random() * 100}%`, y: '100%' }}
          animate={{ y: '-100%', x: `${Math.random() * 100}%` }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: i * 0.3 }}
        >
          {['🔥', '💋', '❤️‍🔥', '💕', '✨'][i % 5]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="relative max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className={`rounded-3xl overflow-hidden ${
            content.intensity ? `bg-gradient-to-br ${intensityColors[content.intensity as keyof typeof intensityColors]}` : 'bg-gradient-to-br from-pink-500 to-red-500'
          }`}
          style={{ boxShadow: '0 25px 80px rgba(255,50,100,0.5)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="p-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              {content.emoji}
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {content.title || content.name}
            </h3>
            
            <p className="text-white/90 leading-relaxed">
              {content.description}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5 text-yellow-300" />
              <span className="text-white/80 text-sm">Just for us</span>
              <Flame className="w-5 h-5 text-yellow-300" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const IntimateSection = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [contentType, setContentType] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'fantasies' | 'positions' | 'scenarios'>('fantasies');

  const handleUnlock = () => {
    setIsUnlocked(true);
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 100]);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center"
            style={{ boxShadow: '0 20px 60px rgba(255,100,150,0.4)' }}
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            🔥 Private Section
          </h2>
          <p className="text-white/70 text-sm mb-6">
            Only for my eyes... and yours 💋
          </p>

          <motion.button
            onClick={handleUnlock}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold"
            style={{ boxShadow: '0 10px 30px rgba(255,100,150,0.4)' }}
          >
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Unlock Our Secrets
            </span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🔥 Our Private World
        </motion.h2>
        <p className="text-white/70 text-sm">
          Just between us... 💋
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {[
          { id: 'fantasies', label: '💭 Fantasies', count: fantasies.length },
          { id: 'positions', label: '🔥 Positions', count: positions.length },
          { id: 'scenarios', label: '🎭 Scenarios', count: scenarios.length }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                : 'bg-white/10 text-white/70'
            }`}
          >
            {tab.label} ({tab.count})
          </motion.button>
        ))}
      </div>

      {/* Content Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="grid grid-cols-2 gap-3"
        >
          {activeTab === 'fantasies' && fantasies.map((fantasy, i) => (
            <motion.button
              key={fantasy.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => { setSelectedContent(fantasy); setContentType('fantasy'); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${intensityColors[fantasy.intensity]} text-left`}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <span className="text-2xl mb-2 block">{fantasy.emoji}</span>
              <p className="text-white font-medium text-sm">{fantasy.title}</p>
              <span className="text-xs text-white/60 capitalize">{fantasy.intensity}</span>
            </motion.button>
          ))}

          {activeTab === 'positions' && positions.map((position, i) => (
            <motion.button
              key={position.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => { setSelectedContent(position); setContentType('position'); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-left"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <span className="text-2xl mb-2 block">{position.emoji}</span>
              <p className="text-white font-medium text-sm">{position.name}</p>
            </motion.button>
          ))}

          {activeTab === 'scenarios' && scenarios.map((scenario, i) => (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => { setSelectedContent(scenario); setContentType('scenario'); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${intensityColors[scenario.intensity]} text-left`}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <span className="text-2xl mb-2 block">{scenario.emoji}</span>
              <p className="text-white font-medium text-sm">{scenario.title}</p>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-white/50 text-xs italic">
          "Every fantasy becomes better because it's with you" 💕
        </p>
        <button
          onClick={() => setIsUnlocked(false)}
          className="mt-4 flex items-center gap-2 text-white/40 text-xs mx-auto hover:text-white/60 transition-colors"
        >
          <EyeOff className="w-4 h-4" />
          Lock section
        </button>
      </motion.div>

      <AnimatePresence>
        {selectedContent && (
          <ContentModal
            content={selectedContent}
            type={contentType}
            onClose={() => setSelectedContent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
