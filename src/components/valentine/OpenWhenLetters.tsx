import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Mail, Cloud, Smile, Moon, Sparkles, Coffee, Sun, Star } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Letter {
  id: string;
  mood: string;
  emoji: string;
  icon: React.ReactNode;
  gradient: string;
  title: string;
  content: string;
}

const letters: Letter[] = [
  {
    id: 'bad-day',
    mood: 'Having a Bad Day',
    emoji: '🌧️',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-blue-400 to-indigo-500',
    title: 'When the World Feels Heavy...',
    content: `My dearest Puntuu,

I know today feels impossible. I know the weight on your shoulders seems unbearable right now. But I need you to know something...

You are the strongest person I know. Not because you don't cry, but because you get up every single time. You face each day with a courage that takes my breath away.

Right now, close your eyes. Take a deep breath. Imagine my arms around you, holding you tight. I'm there with you, even when I'm not physically present.

This moment will pass. The storm will clear. And when it does, I'll be right here, loving you through every single second of it.

You are not alone. You never will be.

I love you more than words could ever express.

Forever yours,
Your love 💕`
  },
  {
    id: 'miss-me',
    mood: 'You Miss Me',
    emoji: '💕',
    icon: <Heart className="w-6 h-6" />,
    gradient: 'from-pink-400 to-rose-500',
    title: 'When Your Heart Aches for Me...',
    content: `My beautiful Puntuu,

If you're reading this, it means you're missing me. And honestly? That makes my heart so full because I miss you too, every single moment we're apart.

Close your eyes right now. Can you feel it? That warmth spreading through your chest? That's my love reaching across whatever distance separates us.

I want you to know that no matter where I am, a part of me is always with you. In every heartbeat, in every breath, you're there.

Look at our photos. Remember my laugh. Think of my arms around you. I'm coming back to you. I always will.

Until then, know that you are the first thing I think of when I wake up and the last face I see before I sleep.

Missing you is just loving you from far away.

Counting every second until I see you again,
Your forever love 💗`
  },
  {
    id: 'need-laugh',
    mood: 'You Need a Laugh',
    emoji: '😂',
    icon: <Smile className="w-6 h-6" />,
    gradient: 'from-yellow-400 to-orange-500',
    title: 'Emergency Smile Delivery! 📦',
    content: `ATTENTION PUNTUU! 🚨

This is an OFFICIAL notification that you are TOO CUTE and it's becoming a public safety hazard!

Scientists are baffled. The government is involved. They're calling it the "Puntuu Effect" and there's no known cure except unlimited cuddles.

Fun fact: Every time you smile, a grumpy cat somewhere becomes slightly less grumpy. You're basically a superhero.

Remember when you tried to be mad at me but couldn't because I made that silly face? Yeah, imagine that face right now. 🤪

Also, I bet I can make you smile in 3 seconds:
1... 
2... 
3... 
I LOVE YOU! 💕

(If you didn't smile, read again until you do. Those are the rules.)

Your personal comedian and biggest fan,
The one who will always make you laugh 🎭`
  },
  {
    id: 'cant-sleep',
    mood: "You Can't Sleep",
    emoji: '🌙',
    icon: <Moon className="w-6 h-6" />,
    gradient: 'from-indigo-400 to-purple-500',
    title: 'For Those Restless Nights...',
    content: `My sleepy Puntuu,

The night is quiet, but your mind won't stop, will it? I wish I was there to stroke your hair and whisper sweet nothings until your eyes grew heavy.

Imagine this: You're in our cozy bed. The room is warm. My arms are wrapped around you, your head on my chest. You can hear my heartbeat - slow and steady, beating just for you.

I'm humming that song you love. My fingers are tracing gentle patterns on your back. With every breath, you feel safer. More peaceful.

There's nowhere you need to be. Nothing you need to do. Just breathe and let go.

You are loved.
You are safe.
You are home.

Sweet dreams, my angel. I'll meet you there.

Holding you in my heart until morning,
Your peaceful place 🌟`
  },
  {
    id: 'feeling-insecure',
    mood: 'Feeling Insecure',
    emoji: '🦋',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-purple-400 to-pink-500',
    title: 'A Reminder of Your Magic...',
    content: `My precious Puntuu,

I know what those voices in your head are saying. And I need you to know - they're lying. Every single word.

Let me tell you what I see when I look at you:

I see the most beautiful soul wrapped in the most beautiful person. I see kindness that could heal the world. I see strength disguised as softness. I see dreams waiting to bloom.

Your laugh? It's my favorite sound in the entire universe.
Your eyes? They hold galaxies I want to explore forever.
Your heart? It's the safest home I've ever known.

You are not "too much." You are MORE than enough. You are everything.

The way you love, the way you care, the way you exist - it's all magic. Pure, beautiful magic.

And I am the luckiest person alive because that magic chose me.

Never forget who you are,
The one who sees all of you and loves every bit 💖`
  },
  {
    id: 'morning-motivation',
    mood: 'Starting Your Day',
    emoji: '☀️',
    icon: <Sun className="w-6 h-6" />,
    gradient: 'from-amber-400 to-yellow-500',
    title: 'Good Morning, My Sunshine!',
    content: `Rise and shine, beautiful! ☀️

If you're reading this, a new day has begun - and that means new opportunities to be amazing (which you do effortlessly, by the way).

Here's your morning checklist:
✨ Wake up (you did it!)
✨ Be adorable (can't help it)
✨ Remember you're loved (by me, always)
✨ Conquer the world (optional but you'll probably do it anyway)

Today might throw challenges at you. But here's a secret - you've survived 100% of your worst days so far. That's a perfect track record, and I'm betting on you to keep it.

Go out there and shine, my love. Be kind to yourself. Take breaks when you need them. And remember - I'm cheering for you from wherever I am.

You've got this. And you've got me.

Your biggest supporter,
The one who loves you more each day 🌻`
  },
  {
    id: 'need-motivation',
    mood: 'Need Motivation',
    emoji: '⭐',
    icon: <Star className="w-6 h-6" />,
    gradient: 'from-emerald-400 to-teal-500',
    title: 'Your Personal Cheerleader Reporting!',
    content: `HEY YOU! Yes, YOU, Puntuu!

I need you to listen very carefully:

That thing you're worried about? You're going to crush it.
That goal that seems too big? You're going to reach it.
That dream that feels impossible? You're going to live it.

How do I know? Because I've seen you. I've seen what you're capable of. I've watched you turn tears into triumph more times than I can count.

You have a fire in you that could light up the darkest night. You have a determination that moves mountains. You have a spirit that inspires everyone around you - especially me.

So take that first step. Then another. Then another. And before you know it, you'll be standing exactly where you dreamed of being.

I believe in you with every fiber of my being. Now it's time for you to believe in yourself.

GO GET 'EM, TIGER! 🐯

Your eternal believer,
The one who knows you're unstoppable 💪`
  },
  {
    id: 'feeling-loved',
    mood: 'Want to Feel Loved',
    emoji: '🥰',
    icon: <Coffee className="w-6 h-6" />,
    gradient: 'from-rose-400 to-red-500',
    title: 'A Dose of Pure Love...',
    content: `My dearest, most precious Puntuu,

You came here because you needed to feel loved. So let me give you exactly that.

I love you.

I love you in the morning when your hair is messy and your eyes are sleepy.
I love you in the evening when you're tired but still make time for us.
I love you when you're laughing so hard you can't breathe.
I love you when you're crying and the world feels too heavy.

I love your quirks. I love your flaws. I love the things you think are "weird" about you - those are my favorites.

You are not loved despite who you are. You are loved BECAUSE of who you are.

This isn't just words. This is a promise. A vow. A truth written in the stars.

You are loved.
You are cherished.
You are adored.
You are my everything.

And that will never, ever change.

With all my heart, soul, and everything I am,
Yours completely and forever 💕`
  }
];

const LetterModal = ({ letter, onClose }: { letter: Letter; onClose: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 50,
            opacity: 0.6
          }}
          animate={{ 
            y: -100,
            opacity: 0
          }}
          transition={{ 
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          💕
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-3xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,240,245,0.95))',
          boxShadow: '0 25px 80px rgba(255,100,150,0.4)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${letter.gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                style={{ left: `${i * 10}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{letter.emoji}</span>
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">{letter.title}</h3>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-pink">
            {letter.content.split('\n\n').map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-gray-700 leading-relaxed whitespace-pre-line mb-4 last:mb-0"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-pink-100 flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl"
          >
            💝
          </motion.div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const OpenWhenLetters = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          📬 Open When... Letters
        </motion.h2>
        <p className="text-white/70 text-sm">
          Letters written for your different moments 💕
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4">
        {letters.map((letter, index) => (
          <motion.button
            key={letter.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLetter(letter)}
            className={`relative p-4 rounded-2xl bg-gradient-to-br ${letter.gradient} text-white overflow-hidden group`}
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-200, 200] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <div className="relative z-10">
              <span className="text-2xl mb-2 block">{letter.emoji}</span>
              <p className="text-xs font-medium leading-tight">
                Open when {letter.mood.toLowerCase()}
              </p>
            </div>

            {/* Envelope icon */}
            <motion.div
              className="absolute bottom-2 right-2 opacity-30"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Mail className="w-8 h-8" />
            </motion.div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <LetterModal
            letter={selectedLetter}
            onClose={() => setSelectedLetter(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
