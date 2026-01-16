import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Letter {
  id: number;
  sealColor: string;
  title: string;
  content: string;
  emoji: string;
}

const letters: Letter[] = [
  {
    id: 1,
    sealColor: "from-red-500 to-rose-600",
    title: "The First Thought 🌅",
    emoji: "🌅",
    content: `Puntuu, it's crazy to think we were once just strangers passing through the same world, living separate lives. Now, I don't know how I ever survived without you, because you've become the first thought in my mornings and the silent prayer that closes my eyes at night. If God handed me a blank book and told me anything I wrote would become mine, I wouldn't ask for wealth or power I'd just fill every single inch, every margin, and every line with your name. You are the only thing I ever truly hoped for, shaped perfectly for my world. I love you so much 😙❤️`
  },
  {
    id: 2,
    sealColor: "from-pink-500 to-rose-500",
    title: "The Choice 💖",
    emoji: "💖",
    content: `Sometimes my chest actually pains because it's so full of you it's a heavy, beautiful ache that I can't always put into words. I want you to know that without a blink of an eye and without a second of hesitation, I will always choose you over anyone else, even over myself. I used to think I'd never open up or love like this, but you came into my life and changed the rhythm of my heart. I care about you in a way that I didn't think was possible for me. I love you so much 😙❤️`
  },
  {
    id: 3,
    sealColor: "from-purple-500 to-pink-500",
    title: "My Sweetest Home 🏠",
    emoji: "🏠",
    content: `I'm not just looking to "be" with you I want to be your person in every sense. I want to be the one who sits with you when you're missing your parents and the one who holds your hand through every high and low. I promise to be your shelter when the storms get too loud and your loudest cheer when the world goes quiet. Whether you're too sick to stand or just need someone to find your hand in the dark, I'm right here. You are my sweetest home. I love you so much 😙❤️`
  },
  {
    id: 4,
    sealColor: "from-rose-500 to-red-500",
    title: "Choosing Tomorrow ⏳",
    emoji: "⏳",
    content: `I really love you, and I'm more than willing to wait for you, Puntuu. I know you might not feel ready yet, but I'm staying right here until the day you are, because this love is far too big to just let go of. I choose you not just for the "now," but for every single tomorrow that comes our way. In a world full of options, you will always be my only choice. I'll be right here, cheesing for you and supporting you in every way I can. I love you so much 😙❤️`
  },
  {
    id: 5,
    sealColor: "from-amber-500 to-rose-500",
    title: "Our Future Vows 💍",
    emoji: "💍",
    content: `One day, I want to marry you and build a home together one we decorate exactly how you like it. I want a house that is full of peace, with no shouting and no loud sounds, just the quiet magic of us. I want our children to grow up seeing a father who is completely in love with their mother, kissing her every chance he gets. I have this constant urge to kneel down before you and tell you that I love you more than anything in this life. I love you so much 😙❤️`
  },
  {
    id: 6,
    sealColor: "from-pink-600 to-purple-500",
    title: "Peace in the Silence 💤",
    emoji: "💤",
    content: `If I don't talk to you even for a little while, I miss you so much it hurts. There's something so beautiful about watching you sleep peacefully; it makes me believe that the world is actually a sweet place. I want to hug you tightly, hold your hands, and just let you sleep in my lap. When I'm with you, I feel like I can finally be a child again I don't have to pretend to be strong or perfect. I can just be me. I love you so much 😙❤️`
  },
  {
    id: 7,
    sealColor: "from-red-600 to-pink-600",
    title: "Five Years From Now 🍵",
    emoji: "🍵",
    content: `How do I see us in five years? I see us starting our mornings together, with me bringing you a cup of tea and some chocolates. I'll be the one you call first when you hear good news, and the one who listens to all your stories at the end of the day. I will know every one of your worries and make them mine so nothing ever cracks your fragile heart. We'll offer each other a shoulder to lean on through all the years to come. I love you so much 😙❤️`
  },
  {
    id: 8,
    sealColor: "from-rose-600 to-amber-500",
    title: "Respect and Loyalty 🤝",
    emoji: "🤝",
    content: `I promise to always treat you with the respect you deserve and never do anything that would break your trust. As the years pass, I promise to grow and learn how to treat you even more nicely than I do today. You are my precious girl, and I would hurt myself a thousand times before I ever let a single tear fall because of me. I can't put into words what you mean to me, but I promise I will never betray you. I love you so much 😙❤️`
  },
  {
    id: 9,
    sealColor: "from-purple-600 to-rose-500",
    title: "My Silent Vows 💐",
    emoji: "💐",
    content: `I will forever be the boy who never raises his voice at you. I will be the one who buys you flowers for no reason at all, just to see you smile. You can call me at 2:00 AM and I will always answer, no matter how tired I am. I'll find every excuse just to be near you because I can't even sleep properly without knowing you're safe. I mention you in every single one of my prayers, and I'll do anything to make sure you stay happy. I love you so much 😙❤️`
  },
  {
    id: 10,
    sealColor: "from-red-500 to-pink-600",
    title: "My Purest Choice ♾️❤️",
    emoji: "♾️",
    content: `Puntuu, I want you to know I'm not here for anything casual I'm here for forever. I want to love you in the purest form, a soul-to-soul connection where I prove to you every day that you are perfect, even with the insecurities you carry. Even if life gets heavy and you try to push me away, I'm never letting go. You aren't "too much" to love. I will always choose the hard days with you over the easy days with anyone else. You are my greatest gift. I will love you like this. I will never try to reshape you to make you easier to love. I will choose you exactly as you are the soft parts, the complicated thoughts, the silence, and the overthinking. I'll be the one who looks at your face and knows when your mind is too loud, and I'll never raise my voice because I know how deeply you feel everything. I will treat you as if you are fragile in the best way not weak, just precious. I'll protect your heart without ever trying to cage it. I want you to feel like you matter, like you aren't replaceable, like you are home. I want my presence to be your calm, to make you smile without trying, and to listen to your endless talking without ever making you feel like you're too much. I promise never hurt you. I only want to make you feel safe enough to shine. I love you so much 😙❤️`
  }
];

export const LetterGallery = () => {
  const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null);

  const openLetter = (letter: Letter) => {
    setCurrentLetter(letter);
    setOpenedLetters(prev => new Set([...prev, letter.id]));
    
    // Vibrate on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([100]);
    }
  };

  const closeLetter = () => {
    setCurrentLetter(null);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="text-center">
        <motion.p 
          className="text-rose-300 font-medium"
          animate={{ scale: openedLetters.size > 0 ? [1, 1.05, 1] : 1 }}
          key={openedLetters.size}
        >
          💌 {openedLetters.size}/{letters.length} letters opened
        </motion.p>
        <p className="text-white/50 text-xs mt-1">
          Break the wax seals to read my love letters
        </p>
      </div>

      {/* Envelope Grid - 2 rows of 5 */}
      <div className="grid grid-cols-5 gap-3">
        {letters.map((letter, index) => (
          <motion.button
            key={letter.id}
            onClick={() => openLetter(letter)}
            className="relative aspect-square"
            initial={{ opacity: 0, scale: 0, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.15, y: -8, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Envelope */}
            <motion.div 
              className={`w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden transition-all ${
                openedLetters.has(letter.id) ? 'opacity-50 scale-95' : ''
              }`}
              animate={!openedLetters.has(letter.id) ? {
                boxShadow: ["0 0 0 0 rgba(251, 191, 36, 0.4)", "0 0 20px 5px rgba(251, 191, 36, 0.2)", "0 0 0 0 rgba(251, 191, 36, 0.4)"]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0 h-1/2">
                <div 
                  className="absolute top-0 left-0 right-0 border-l-[25px] border-r-[25px] border-t-[20px] border-l-transparent border-r-transparent border-t-amber-300"
                  style={{ filter: openedLetters.has(letter.id) ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
              </div>
              
              {/* Wax seal */}
              <motion.div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${letter.sealColor} shadow-lg flex items-center justify-center z-10 border-2 border-white/20`}
                animate={!openedLetters.has(letter.id) ? { 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-sm font-bold drop-shadow-md">
                  {openedLetters.has(letter.id) ? "✓" : letter.id}
                </span>
              </motion.div>
              
              {/* Shine effect */}
              {!openedLetters.has(letter.id) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {currentLetter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLetter}
          >
            {/* Letter Paper */}
            <motion.div
              className="bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-2xl p-6 max-w-md w-full shadow-2xl relative max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.3, rotateY: -180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.3, rotateY: 180, opacity: 0 }}
              transition={{ type: "spring", damping: 20, duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLetter}
                className="absolute top-3 right-3 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center hover:bg-rose-200 transition-colors"
              >
                <X className="w-4 h-4 text-rose-600" />
              </button>
              
              {/* Decorative seal */}
              <motion.div
                className={`absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${currentLetter.sealColor} shadow-xl flex items-center justify-center border-4 border-white`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="text-2xl">{currentLetter.emoji}</span>
              </motion.div>

              {/* Letter content */}
              <motion.div
                className="mt-8 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-serif text-rose-700 text-center font-bold">
                  {currentLetter.title}
                </h3>
                
                <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                
                <p className="text-gray-700 font-serif leading-relaxed text-justify whitespace-pre-line text-sm">
                  {currentLetter.content}
                </p>
                
                <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                
                <p className="text-right text-rose-500 font-serif italic text-lg">
                  With all my love ❤️
                </p>
              </motion.div>

              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-rose-200 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-rose-200 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-rose-200 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-rose-200 rounded-br-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Letters Opened Celebration */}
      <AnimatePresence>
        {openedLetters.size === letters.length && (
          <motion.div
            className="text-center py-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-5xl mb-3"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.div>
            <p className="text-rose-300 font-serif text-lg">
              You've read all my love letters, Puntuu!
            </p>
            <p className="text-white/60 text-sm mt-1">
              Every word comes from the deepest part of my heart ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
