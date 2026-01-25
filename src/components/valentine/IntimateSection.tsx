import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Flame, X, Sparkles, Eye, EyeOff, Star, Zap } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Fantasy {
  id: string;
  title: string;
  description: string;
  emoji: string;
  intensity: 'soft' | 'medium' | 'hot' | 'wild';
  details?: string;
}

interface Position {
  id: string;
  name: string;
  description: string;
  emoji: string;
  howTo?: string;
  intensity: 'intimate' | 'passionate' | 'adventurous';
}

const fantasies: Fantasy[] = [
  { id: '1', title: 'Candlelit Romance', description: 'Soft music, dim candlelight, rose petals on the bed... just you and me, taking our time.', emoji: '🕯️', intensity: 'soft', details: 'I light dozens of candles around the room. Slow music plays. I undress you slowly, kissing every inch...' },
  { id: '2', title: 'Slow Dancing Close', description: 'No music needed, just our heartbeats syncing as we sway in the darkness.', emoji: '💃', intensity: 'soft', details: 'Our bodies pressed together, swaying gently. My hands explore your curves as we move...' },
  { id: '3', title: 'Rainy Day in Bed', description: 'The sound of rain, your body pressed against mine, nowhere to be but here.', emoji: '🌧️', intensity: 'soft', details: 'Thunder outside, warmth inside. We spend hours exploring each other, no rush...' },
  { id: '4', title: 'Midnight Surprise', description: 'You wake up to my kisses trailing down your body... discovering what I have planned.', emoji: '🌙', intensity: 'medium', details: 'You stir awake to feel my lips on your neck, moving lower... my hands already wandering...' },
  { id: '5', title: 'Blindfolded Pleasure', description: 'I take away your sight so every touch, every kiss becomes electric and intense.', emoji: '🎭', intensity: 'medium', details: 'A silk blindfold. You can\'t see but you feel everything ten times more intensely...' },
  { id: '6', title: 'Morning After Bliss', description: 'Waking up tangled together, lazy kisses turning into something much more.', emoji: '☀️', intensity: 'medium', details: 'Sunlight streaming in, your hair messy, you look so beautiful. One kiss leads to another...' },
  { id: '7', title: 'Against the Wall', description: 'I can\'t wait anymore. I push you against the wall the moment we get home...', emoji: '🧱', intensity: 'hot', details: 'The door barely closes. My lips on yours, hands everywhere, clothes coming off right there...' },
  { id: '8', title: 'Passionate Reunion', description: 'Days apart, finally together, unable to keep our hands off each other.', emoji: '🔥', intensity: 'hot', details: 'The moment you walk through that door, I grab you. We don\'t make it to the bedroom...' },
  { id: '9', title: 'Wild & Primal', description: 'No holding back. Raw desire. Taking exactly what we want from each other.', emoji: '⚡', intensity: 'wild', details: 'Hair pulling, scratching, moaning. Pure animal instinct taking over...' },
  { id: '10', title: 'All Night Long', description: 'Round after round... we don\'t stop until the sun comes up and we\'re completely spent.', emoji: '🌟', intensity: 'wild', details: 'Hours of pleasure. Every position. Every fantasy. Until we collapse, satisfied and exhausted...' },
  { id: '11', title: 'The Tease', description: 'I bring you to the edge again and again, never quite letting you finish... until you beg.', emoji: '😈', intensity: 'wild', details: 'So close, so many times. You\'re trembling, begging, desperate for release...' },
  { id: '12', title: 'Dominant Night', description: 'Tonight I take complete control. You do exactly what I say...', emoji: '👑', intensity: 'wild', details: 'My voice is firm. You obey. And you love every second of surrendering to me...' },
];

const positions: Position[] = [
  { id: '1', name: 'Missionary Magic', description: 'Deep eye contact, bodies intertwined, feeling every heartbeat', emoji: '💑', intensity: 'intimate', howTo: 'Face to face, chest to chest. I can kiss you, watch your face, feel your breath on my neck...' },
  { id: '2', name: 'Spooning Bliss', description: 'Close, warm, feeling every breath on your neck', emoji: '🥄', intensity: 'intimate', howTo: 'Both on our sides, me behind you. My arms wrapped around, lips on your shoulder, going slow and deep...' },
  { id: '3', name: 'Lotus Love', description: 'You sit on my lap, we\'re face to face, heart to heart', emoji: '🪷', intensity: 'intimate', howTo: 'Wrapped around each other, moving together as one. The most intimate connection possible...' },
  { id: '4', name: 'Cowgirl Dreams', description: 'You take the reins, I watch in awe as you move', emoji: '🤠', intensity: 'passionate', howTo: 'You on top, in control. Setting the pace, the depth, while I admire every inch of you...' },
  { id: '5', name: 'Reverse View', description: 'A different perspective, same fire burning between us', emoji: '🔄', intensity: 'passionate', howTo: 'You facing away, looking back at me. A view that drives me absolutely wild...' },
  { id: '6', name: 'Standing Passion', description: 'Against the wall, in the shower, wherever we can\'t wait', emoji: '🚿', intensity: 'passionate', howTo: 'Lifted against the wall or bent over, water running down our bodies in the shower...' },
  { id: '7', name: 'From Behind', description: 'Primal, deep, my hands exploring everything', emoji: '🔥', intensity: 'adventurous', howTo: 'Hands on your hips, pulling you back into me. Deep, intense, hearing you moan...' },
  { id: '8', name: 'Legs Up High', description: 'Deeper than ever, hitting spots that make you scream', emoji: '⬆️', intensity: 'adventurous', howTo: 'Your legs over my shoulders, going as deep as possible. Intense pleasure...' },
  { id: '9', name: 'The Bridge', description: 'Flexible, adventurous, a stretch in more ways than one', emoji: '🌉', intensity: 'adventurous', howTo: 'Arched back, incredible angle. Requires flexibility but the sensation is worth it...' },
  { id: '10', name: 'Edge of the Bed', description: 'You on the edge, me standing, perfect angle for both', emoji: '🛏️', intensity: 'adventurous', howTo: 'You lie back at the edge, legs wrapped around me as I stand. Deep and controlled...' },
  { id: '11', name: 'Face Down', description: 'Submissive, trusting, completely surrendering to pleasure', emoji: '⬇️', intensity: 'adventurous', howTo: 'Face down, hips raised. Complete surrender. Deep and intense...' },
  { id: '12', name: 'The Pretzel', description: 'Twisted together, hitting new angles of pleasure', emoji: '🥨', intensity: 'adventurous', howTo: 'Legs intertwined, twisted together in ways that create incredible sensations...' },
];

const scenarios: Fantasy[] = [
  { id: '1', title: 'Strangers at a Bar', description: 'Pretending we just met, flirting like the first time, building that tension...', emoji: '🍸', intensity: 'medium', details: 'We meet at a bar like strangers. You\'re stunning. I buy you a drink. The flirting gets intense...' },
  { id: '2', title: 'Boss & Secretary', description: 'You walk into my office, close the door behind you... overtime takes on a new meaning.', emoji: '💼', intensity: 'hot', details: 'The door locks. You lean against my desk. "You wanted to see me, boss?" The tension is electric...' },
  { id: '3', title: 'Hotel Getaway', description: 'Anonymous room, do not disturb sign, nothing but us and 48 hours...', emoji: '🏨', intensity: 'hot', details: 'New city, nobody knows us. That hotel bed sees everything we\'ve been wanting to do...' },
  { id: '4', title: 'Under the Stars', description: 'Secluded beach or rooftop, just us and the night sky, making our own fireworks.', emoji: '⭐', intensity: 'medium', details: 'A blanket on a private beach. The waves crash as we lose ourselves in each other...' },
  { id: '5', title: 'Shower Steam', description: 'Hot water, steam, slippery bodies, nowhere to go but closer...', emoji: '🚿', intensity: 'hot', details: 'Water running down our bodies. Soap and skin. Pressing you against the wet tiles...' },
  { id: '6', title: 'Kitchen Counter', description: 'Cooking together turns into tasting each other, the meal can wait...', emoji: '🍳', intensity: 'hot', details: 'I lift you onto the counter. Dinner is forgotten. You\'re the only thing I want to taste...' },
  { id: '7', title: 'Car Fantasy', description: 'Parked somewhere private, windows fogging up, teenage excitement...', emoji: '🚗', intensity: 'wild', details: 'Back seat, cramped space, trying to be quiet. The thrill of getting caught adds to the excitement...' },
  { id: '8', title: 'Strip Poker Night', description: 'Every lost hand means something comes off... winner takes all.', emoji: '🃏', intensity: 'medium', details: 'Cards dealt, stakes high. Piece by piece, we undress. By the end, there are no losers...' },
  { id: '9', title: 'Massage Night', description: 'Starting innocent... hands moving lower... oil everywhere...', emoji: '💆', intensity: 'medium', details: 'Warm oil on your back. My hands work your muscles, then wander. The massage turns into something more...' },
  { id: '10', title: 'Truth or Dare', description: 'The dares get naughtier and naughtier until clothes are optional...', emoji: '🎯', intensity: 'hot', details: '"I dare you to..." Each dare pushing boundaries. Each truth revealing desires...' },
  { id: '11', title: 'Dominant & Submissive', description: 'Tonight we have roles to play. Safe word ready. Total trust, total surrender.', emoji: '⛓️', intensity: 'wild', details: 'Complete power exchange. Commands given. Commands obeyed. Safe, consensual, incredibly hot...' },
  { id: '12', title: 'Birthday Surprise', description: 'It\'s your special day. I\'m your gift. Unwrap me however you want...', emoji: '🎁', intensity: 'hot', details: 'Wearing nothing but a ribbon. "Happy birthday. Do whatever you want to me tonight..."' },
  { id: '13', title: 'Nurse & Patient', description: 'You\'re here to take my temperature... but things are about to get very hot.', emoji: '👩‍⚕️', intensity: 'hot', details: 'Wearing that cute nurse outfit. "Let me check your vitals..." Your hands explore everywhere...' },
  { id: '14', title: 'Teacher & Student', description: 'After-hours tutoring session... the lesson is about to get very personal.', emoji: '📚', intensity: 'hot', details: '"Stay after class." The door locks. Your grades depend on how well you... perform...' },
  { id: '15', title: 'Fitness Instructor', description: 'Private gym session... time to work on your flexibility and stamina.', emoji: '🏋️‍♀️', intensity: 'medium', details: 'In tight workout clothes. "Let me help you stretch..." Hands guiding your body into new positions...' },
  { id: '16', title: 'Room Service', description: 'I ordered something special from room service... and it\'s you.', emoji: '🛎️', intensity: 'hot', details: 'A knock on the door. You walk in with a smile. "Your special order has arrived..."' },
  { id: '17', title: 'Photography Session', description: 'Boudoir photoshoot gets increasingly revealing... the camera isn\'t the only thing capturing heat.', emoji: '📷', intensity: 'wild', details: '"Now pose for me..." Each photo more daring. Soon the camera is forgotten...' },
  { id: '18', title: 'Dancer for a Night', description: 'Private dance, just for me. Those moves, those eyes, that body...', emoji: '💃', intensity: 'wild', details: 'Music playing. You move closer, dancing just for me. Every sway hypnotizing...' },
];

const intensityColors = {
  soft: 'from-pink-400 to-rose-400',
  medium: 'from-orange-400 to-red-400',
  hot: 'from-red-500 to-pink-600',
  wild: 'from-purple-600 to-red-600',
  intimate: 'from-pink-400 to-rose-400',
  passionate: 'from-orange-400 to-red-500',
  adventurous: 'from-red-500 to-purple-600'
};

const ContentModal = ({ content, type, onClose }: { content: any; type: string; onClose: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at center, rgba(255,50,100,0.3) 0%, rgba(0,0,0,0.97) 70%)' }}
      onClick={onClose}
    >
      {/* Floating emojis */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{ x: `${Math.random() * 100}%`, y: '100%' }}
          animate={{ y: '-100%', x: `${Math.random() * 100}%` }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: i * 0.3 }}
        >
          {['🔥', '💋', '❤️‍🔥', '💕', '✨', '💦', '😈', '👅'][i % 8]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="relative max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className={`rounded-3xl overflow-hidden bg-gradient-to-br ${
            content.intensity ? intensityColors[content.intensity as keyof typeof intensityColors] : 'from-pink-500 to-red-500'
          }`}
          style={{ boxShadow: '0 25px 80px rgba(255,50,100,0.5)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center z-10 backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="p-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              {content.emoji}
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {content.title || content.name}
            </h3>
            
            <p className="text-white/90 leading-relaxed mb-6 text-lg">
              {content.description}
            </p>

            {/* Detailed description */}
            {(content.details || content.howTo) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 text-left"
              >
                <p className="text-white/80 text-sm leading-relaxed italic">
                  "{content.details || content.howTo}"
                </p>
              </motion.div>
            )}

            {/* Intensity indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-center gap-3"
            >
              {content.intensity === 'wild' || content.intensity === 'adventurous' ? (
                <>
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wide">
                    {content.intensity}
                  </span>
                  <Zap className="w-5 h-5 text-yellow-300" />
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5 text-yellow-300" />
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wide">
                    {content.intensity}
                  </span>
                  <Flame className="w-5 h-5 text-yellow-300" />
                </>
              )}
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
      navigator.vibrate([50, 30, 100, 50, 200]);
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
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 20px 60px rgba(255,100,150,0.4)',
                '0 30px 80px rgba(255,50,100,0.6)',
                '0 20px 60px rgba(255,100,150,0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex items-center justify-center"
          >
            <Lock className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            🔥 Our Secret Garden
          </h2>
          <p className="text-white/70 text-sm mb-6">
            Only for us... where fantasies come alive 💋
          </p>

          <motion.button
            onClick={handleUnlock}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white font-bold text-lg"
            style={{ boxShadow: '0 15px 40px rgba(255,100,150,0.5)' }}
          >
            <span className="flex items-center gap-3">
              <Eye className="w-5 h-5" />
              Unlock Our Desires
              <Flame className="w-5 h-5" />
            </span>
          </motion.button>

          <p className="text-white/40 text-xs mt-4 italic">
            What happens here, stays between us...
          </p>
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
          🔥 Our Wildest Dreams
        </motion.h2>
        <p className="text-white/70 text-sm">
          Every fantasy I want to make real with you 💋
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {[
          { id: 'fantasies', label: '💭 Fantasies', count: fantasies.length },
          { id: 'positions', label: '🔥 Positions', count: positions.length },
          { id: 'scenarios', label: '🎭 Roleplay', count: scenarios.length }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white'
                : 'bg-white/10 text-white/70'
            }`}
          >
            {tab.label} ({tab.count})
          </motion.button>
        ))}
      </div>

      {/* Intensity Legend */}
      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {activeTab === 'positions' ? (
          <>
            <span className="text-xs px-2 py-1 rounded-full bg-pink-400/30 text-pink-200">💕 Intimate</span>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-400/30 text-orange-200">🔥 Passionate</span>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-400/30 text-purple-200">⚡ Adventurous</span>
          </>
        ) : (
          <>
            <span className="text-xs px-2 py-1 rounded-full bg-pink-400/30 text-pink-200">💕 Soft</span>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-400/30 text-orange-200">🔥 Hot</span>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-400/30 text-purple-200">😈 Wild</span>
          </>
        )}
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
              transition={{ delay: i * 0.03 }}
              onClick={() => { setSelectedContent(fantasy); setContentType('fantasy'); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${intensityColors[fantasy.intensity]} text-left relative overflow-hidden`}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              {fantasy.intensity === 'wild' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/20 to-purple-500/0"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <span className="text-2xl mb-2 block">{fantasy.emoji}</span>
              <p className="text-white font-medium text-sm">{fantasy.title}</p>
              <span className="text-xs text-white/60 capitalize flex items-center gap-1 mt-1">
                {fantasy.intensity === 'wild' && <Zap className="w-3 h-3" />}
                {fantasy.intensity}
              </span>
            </motion.button>
          ))}

          {activeTab === 'positions' && positions.map((position, i) => (
            <motion.button
              key={position.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => { setSelectedContent(position); setContentType('position'); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${intensityColors[position.intensity]} text-left`}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <span className="text-2xl mb-2 block">{position.emoji}</span>
              <p className="text-white font-medium text-sm">{position.name}</p>
              <span className="text-xs text-white/60 capitalize mt-1 block">{position.intensity}</span>
            </motion.button>
          ))}

          {activeTab === 'scenarios' && scenarios.map((scenario, i) => (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => { setSelectedContent(scenario); setContentType('scenario'); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-2xl bg-gradient-to-br ${intensityColors[scenario.intensity]} text-left relative overflow-hidden`}
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              {scenario.intensity === 'wild' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/20 to-purple-500/0"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <span className="text-2xl mb-2 block">{scenario.emoji}</span>
              <p className="text-white font-medium text-sm">{scenario.title}</p>
              <span className="text-xs text-white/60 capitalize flex items-center gap-1 mt-1">
                {scenario.intensity === 'wild' && <Zap className="w-3 h-3" />}
                {scenario.intensity}
              </span>
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
        <p className="text-white/50 text-sm italic mb-4">
          "I want to explore every inch of you, every fantasy with you" 💋
        </p>
        <button
          onClick={() => setIsUnlocked(false)}
          className="flex items-center gap-2 text-white/40 text-xs mx-auto hover:text-white/60 transition-colors"
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
