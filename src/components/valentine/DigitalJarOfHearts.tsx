import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, RefreshCw } from 'lucide-react';
import { createPortal } from 'react-dom';

interface HeartContent {
  type: 'compliment' | 'memory' | 'reason';
  text: string;
}

const heartContents: HeartContent[] = [
  // Compliments - More Personal and Specific
  { type: 'compliment', text: 'Your smile is the first thing I think of every morning and the last image before I sleep 💕' },
  { type: 'compliment', text: 'You have the most beautiful soul I\'ve ever encountered - pure, kind, and so incredibly rare ✨' },
  { type: 'compliment', text: 'Your laugh is my favorite sound in the entire universe - I would do anything just to hear it 🎵' },
  { type: 'compliment', text: 'You make everyone around you feel special just by being your authentic, wonderful self 🌟' },
  { type: 'compliment', text: 'Your eyes hold entire galaxies - I could get lost in them forever and never want to be found 👁️' },
  { type: 'compliment', text: 'You\'re the most beautiful person, inside and out - I still can\'t believe you\'re mine, sweetheart 🌹' },
  { type: 'compliment', text: 'Your kindness could heal the world - the way you care for others takes my breath away 💝' },
  { type: 'compliment', text: 'You\'re so much stronger than you know, braver than you believe, and more loved than you can imagine 💪' },
  { type: 'compliment', text: 'Being loved by you, babe, is the greatest gift of my entire life - I treasure every moment 🎁' },
  { type: 'compliment', text: 'You make ordinary moments feel like magic - every second with you is an adventure ✨' },
  { type: 'compliment', text: 'Your voice is the melody my heart beats to - I could listen to you talk forever, my love 💓' },
  { type: 'compliment', text: 'You\'re my favorite hello and my hardest goodbye - distance means nothing when someone means everything 🥺' },
  { type: 'compliment', text: 'Every love song suddenly makes sense because of you - you\'re my living love story, Punturu 🎶' },
  { type: 'compliment', text: 'You\'re the reason I believe in forever - with you, I want eternity 💍' },
  { type: 'compliment', text: 'Your hugs feel like coming home after years away - my safe place in this chaotic world 🏠' },
  { type: 'compliment', text: 'You\'re not just beautiful - you\'re the entire definition of beauty reimagined, sweetheart 🌸' },
  { type: 'compliment', text: 'The way you care about the little things shows how big your heart really is, my love 💗' },
  { type: 'compliment', text: 'You make me want to be a better man every single day - you inspire me, babe 🌟' },
  { type: 'compliment', text: 'Your determination and resilience amaze me - nothing can stop my powerful girl 🔥' },
  { type: 'compliment', text: 'The way you look at me makes me feel like the luckiest person alive 👀💕' },
  { type: 'compliment', text: 'Your intelligence and wit keep me on my toes - conversations with you are my favorite ✨' },
  { type: 'compliment', text: 'Even on your worst days, you\'re still the best thing that ever happened to me 💝' },
  { type: 'compliment', text: 'Your patience and understanding make me feel safe to be myself - thank you, love 🙏' },
  { type: 'compliment', text: 'The way you dance when you think no one is watching - adorable beyond words 💃' },
  
  // Memories - Real and Intimate
  { type: 'memory', text: 'Remember our first call? My heart was racing the entire time and I couldn\'t stop smiling for hours 📞' },
  { type: 'memory', text: 'The way you laugh when I make silly jokes... I make those jokes just to see your face light up 😂' },
  { type: 'memory', text: 'When you fell asleep on call and I just listened to you breathe... that\'s when I knew I was in deep 😴' },
  { type: 'memory', text: 'That time you got shy when I complimented your eyes... so adorable I wanted to squeeze you through the screen 🙈' },
  { type: 'memory', text: 'Staying up until 3 AM talking about our dreams, fears, and everything in between 🌙' },
  { type: 'memory', text: 'When you sent me that voice note saying you missed me... I\'ve saved it and listened to it 100+ times 🔁' },
  { type: 'memory', text: 'The first time you said "I love you" - my heart literally stopped, then exploded with happiness 💓' },
  { type: 'memory', text: 'Our silly video calls where we just stare at each other and smile like idiots in love 📱' },
  { type: 'memory', text: 'When you got a little jealous... it was so cute, it made me love you even more 😏' },
  { type: 'memory', text: 'The way you say my name makes everything feel right - like I was born just to hear you say it 🥰' },
  { type: 'memory', text: 'Our inside jokes that nobody else would understand - that\'s our secret language 😆' },
  { type: 'memory', text: 'When you trusted me with your deepest fears... I felt so honored to hold your heart 🤝' },
  { type: 'memory', text: 'Planning our future together at 2 AM - I can\'t wait to make all those dreams real 🏡' },
  { type: 'memory', text: 'That song that now belongs only to us - I can\'t hear it without thinking of you 🎵' },
  { type: 'memory', text: 'Every goodnight message that makes me sleep with the biggest smile on my face 😊' },
  { type: 'memory', text: 'The first photo you sent me... I still look at it every day, babe 📸' },
  { type: 'memory', text: 'When you cried and let me be there for you - even through a screen, I felt so close to you 🫂' },
  { type: 'memory', text: 'That time we planned our wedding details - even just dreaming with you feels perfect 💒' },
  { type: 'memory', text: 'When you surprised me with that message out of nowhere - my heart melted completely 💌' },
  { type: 'memory', text: 'Our first "I miss you" - I realized how deep we were already in 💕' },
  
  // 100 Reasons I Love You (expanded)
  { type: 'reason', text: 'Reason #1: The way your nose crinkles when you laugh really hard ❤️' },
  { type: 'reason', text: 'Reason #7: How you always think of others before yourself, sweetheart 💕' },
  { type: 'reason', text: 'Reason #13: The little sounds you make when you\'re comfortable 🥰' },
  { type: 'reason', text: 'Reason #21: Your determination to achieve your dreams inspires me daily ⭐' },
  { type: 'reason', text: 'Reason #28: The way you get excited about food - it\'s absolutely adorable 🍕' },
  { type: 'reason', text: 'Reason #34: The way you get excited about the little things in life 🎉' },
  { type: 'reason', text: 'Reason #42: How you make even boring moments feel special just by existing 💫' },
  { type: 'reason', text: 'Reason #49: Your stubborn streak - it shows how passionate you are 🔥' },
  { type: 'reason', text: 'Reason #55: Your patience with me when I\'m being difficult, my love 🙏' },
  { type: 'reason', text: 'Reason #61: The way you take care of your family - your heart is so big 👨‍👩‍👧' },
  { type: 'reason', text: 'Reason #67: The way you say "I love you" like you mean it every single time 💝' },
  { type: 'reason', text: 'Reason #73: How you remember the little things I tell you, babe 🧠' },
  { type: 'reason', text: 'Reason #78: Your morning voice - raspy and adorable 🌅' },
  { type: 'reason', text: 'Reason #84: The way you pout when you want something - irresistible 😭' },
  { type: 'reason', text: 'Reason #89: Your beautiful, pure heart that loves so deeply, Punturu 💗' },
  { type: 'reason', text: 'Reason #93: How protective you get - my fierce little warrior 🛡️' },
  { type: 'reason', text: 'Reason #95: The way you look at me like I\'m the only person in the world 👀' },
  { type: 'reason', text: 'Reason #97: Your sleepy texts that barely make sense - so cute 😴💬' },
  { type: 'reason', text: 'Reason #99: How you make me laugh even when I\'m upset 😂❤️' },
  { type: 'reason', text: 'Reason #100: Simply because you\'re YOU - and that\'s enough for a lifetime of love, sweetheart 💕' },
];

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const heartColors = [
  'text-pink-400',
  'text-rose-400', 
  'text-red-400',
  'text-fuchsia-400',
  'text-pink-300'
];

const ContentModal = ({ content, onClose }: { content: HeartContent; onClose: () => void }) => {
  const getTypeConfig = () => {
    switch (content.type) {
      case 'compliment':
        return { emoji: '💝', label: 'A Compliment For You', gradient: 'linear-gradient(145deg, #ff6b9d, #ff8fab)' };
      case 'memory':
        return { emoji: '📸', label: 'A Memory Snack', gradient: 'linear-gradient(145deg, #a855f7, #c084fc)' };
      case 'reason':
        return { emoji: '❤️', label: 'Why I Love You', gradient: 'linear-gradient(145deg, #ef4444, #f87171)' };
      default:
        return { emoji: '💕', label: 'For You', gradient: 'linear-gradient(145deg, #ff6b9d, #ff8fab)' };
    }
  };

  const config = getTypeConfig();

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      {/* Burst of hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl pointer-events-none"
          initial={{ x: '50%', y: '50%', scale: 0 }}
          animate={{ 
            x: `${50 + (Math.random() - 0.5) * 120}%`,
            y: `${50 + (Math.random() - 0.5) * 120}%`,
            scale: [0, 1.5, 0],
            rotate: Math.random() * 360
          }}
          transition={{ duration: 2, delay: i * 0.05 }}
        >
          {['💕', '💗', '💖', '💓', '❤️'][i % 5]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 10 }}
        className="relative max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="rounded-3xl p-8 text-center"
          style={{
            background: config.gradient,
            boxShadow: '0 25px 80px rgba(255,100,150,0.5)'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            {config.emoji}
          </motion.div>

          <p className="text-sm text-white/70 uppercase tracking-wider mb-3">
            {config.label}
          </p>

          <p className="text-white text-lg font-medium leading-relaxed">
            {content.text}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-white/50 text-sm"
          >
            Tap anywhere to close 💕
          </motion.div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const DigitalJarOfHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [selectedContent, setSelectedContent] = useState<HeartContent | null>(null);
  const [clickedCount, setClickedCount] = useState(() => {
    const saved = localStorage.getItem('hearts-clicked-count');
    return saved ? parseInt(saved) : 0;
  });

  // Save clicked count
  useEffect(() => {
    localStorage.setItem('hearts-clicked-count', clickedCount.toString());
  }, [clickedCount]);

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = [];
      for (let i = 0; i < 25; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 90 + 5,
          y: Math.random() * 80 + 10,
          size: 24 + Math.random() * 28,
          duration: 4 + Math.random() * 4,
          delay: Math.random() * 3,
          color: heartColors[Math.floor(Math.random() * heartColors.length)]
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  const handleHeartClick = useCallback((heartId: number) => {
    const randomContent = heartContents[Math.floor(Math.random() * heartContents.length)];
    setSelectedContent(randomContent);
    setClickedCount(prev => prev + 1);
    
    if (navigator.vibrate) {
      navigator.vibrate([30, 20, 50]);
    }
  }, []);

  const complimentCount = heartContents.filter(h => h.type === 'compliment').length;
  const memoryCount = heartContents.filter(h => h.type === 'memory').length;
  const reasonCount = heartContents.filter(h => h.type === 'reason').length;

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          💖 Jar of Hearts
        </motion.h2>
        <p className="text-white/70 text-sm mb-2">
          Catch a floating heart for a dose of love
        </p>
        <motion.p 
          className="text-pink-300 text-sm font-medium"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Hearts caught: {clickedCount} 💕
        </motion.p>
      </div>

      {/* Jar Container */}
      <div 
        className="relative h-[400px] rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,100,150,0.15) 0%, rgba(255,150,180,0.25) 100%)',
          border: '3px solid rgba(255,255,255,0.2)',
          boxShadow: 'inset 0 0 80px rgba(255,100,150,0.3), 0 20px 60px rgba(0,0,0,0.3)'
        }}
      >
        {/* Glass reflection */}
        <div 
          className="absolute top-0 left-0 right-0 h-8 rounded-t-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)'
          }}
        />

        {/* Floating hearts */}
        {hearts.map((heart) => (
          <motion.button
            key={heart.id}
            className={`absolute cursor-pointer ${heart.color} hover:scale-125 active:scale-90 transition-transform z-10`}
            style={{ left: `${heart.x}%`, top: `${heart.y}%`, fontSize: heart.size }}
            animate={{
              y: [0, -25, 0, 25, 0],
              x: [0, 12, 0, -12, 0],
              rotate: [0, 8, 0, -8, 0]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => handleHeartClick(heart.id)}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.7 }}
          >
            <Heart className="fill-current drop-shadow-lg" style={{ width: heart.size, height: heart.size }} />
          </motion.button>
        ))}

        {/* Sparkle effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity
            }}
          />
        ))}

        {/* Instructions */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center z-20"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-white/70 text-sm bg-black/30 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
            👆 Tap any heart for love
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 flex flex-wrap justify-center gap-2 text-xs"
      >
        <div className="bg-pink-500/20 px-3 py-1.5 rounded-full flex items-center gap-1">
          <span className="text-pink-300">💝 {complimentCount}</span>
        </div>
        <div className="bg-purple-500/20 px-3 py-1.5 rounded-full flex items-center gap-1">
          <span className="text-purple-300">📸 {memoryCount}</span>
        </div>
        <div className="bg-red-500/20 px-3 py-1.5 rounded-full flex items-center gap-1">
          <span className="text-red-300">❤️ {reasonCount}</span>
        </div>
      </motion.div>

      <p className="text-center text-white/40 text-xs mt-3">
        {heartContents.length} love messages inside 💕
      </p>

      <AnimatePresence>
        {selectedContent && (
          <ContentModal
            content={selectedContent}
            onClose={() => setSelectedContent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
