import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";

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
    content: `Puntuu, I want you to know I'm not here for anything casual I'm here for forever. I want to love you in the purest form, a soul-to-soul connection where I prove to you every day that you are perfect, even with the insecurities you carry. Even if life gets heavy and you try to push me away, I'm never letting go. You aren't "too much" to love. I will always choose the hard days with you over the easy days with anyone else. You are my greatest gift.

I will love you like this. I will never try to reshape you to make you easier to love. I will choose you exactly as you are the soft parts, the complicated thoughts, the silence, and the overthinking. I'll be the one who looks at your face and knows when your mind is too loud, and I'll never raise my voice because I know how deeply you feel everything.

I will treat you as if you are fragile in the best way not weak, just precious. I'll protect your heart without ever trying to cage it. I want you to feel like you matter, like you aren't replaceable, like you are home. I want my presence to be your calm, to make you smile without trying, and to listen to your endless talking without ever making you feel like you're too much.

I promise never hurt you. I only want to make you feel safe enough to shine. I love you so much 😙❤️`
  }
];

// 3D Envelope Component
const Envelope3D = ({ 
  letter, 
  index, 
  isOpened, 
  onOpen 
}: { 
  letter: Letter; 
  index: number; 
  isOpened: boolean; 
  onOpen: () => void;
}) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, rotateY: 180, scale: 0.5 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ 
        scale: 1.15, 
        rotateY: 15,
        rotateX: -10,
        z: 50,
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onOpen}
    >
      <div 
        className={`
          relative w-14 h-14 sm:w-16 sm:h-16
          ${isOpened ? 'opacity-50' : ''}
        `}
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(10deg)",
        }}
      >
        {/* Envelope back */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg"
          style={{
            transform: "translateZ(-2px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        />
        
        {/* Envelope front */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 rounded-lg overflow-hidden"
          style={{
            transform: "translateZ(0px)",
            boxShadow: "inset 0 2px 10px rgba(255,255,255,0.5), 0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Envelope flap with 3D effect */}
          <div 
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              background: "linear-gradient(135deg, #fde68a 0%, #fcd34d 50%, #f59e0b 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 70%)",
              transform: isOpened ? "rotateX(180deg) translateY(-50%)" : "rotateX(0deg)",
              transformOrigin: "top center",
              transition: "transform 0.3s ease",
            }}
          />
          
          {/* Inner paper peek */}
          <div 
            className="absolute top-1 left-1 right-1 h-1/3 bg-white rounded-t-sm"
            style={{ opacity: isOpened ? 1 : 0.3 }}
          />
        </div>
        
        {/* 3D Wax Seal */}
        <motion.div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-7 h-7 sm:w-8 sm:h-8 rounded-full
            bg-gradient-to-br ${letter.sealColor}
            flex items-center justify-center
            border-2 border-white/30
          `}
          style={{
            transform: "translateZ(8px) translate(-50%, -50%)",
            boxShadow: `
              0 4px 15px rgba(0,0,0,0.4),
              inset 0 2px 4px rgba(255,255,255,0.3),
              inset 0 -2px 4px rgba(0,0,0,0.2)
            `,
          }}
          animate={!isOpened ? {
            scale: [1, 1.1, 1],
            rotateZ: [0, 5, -5, 0],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold drop-shadow-lg">
            {isOpened ? "✓" : letter.id}
          </span>
        </motion.div>
        
        {/* Shine effect */}
        {!isOpened && (
          <motion.div
            className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
            style={{ transform: "translateZ(1px)" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const LetterGallery = () => {
  const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lock body scroll when letter is open
  useEffect(() => {
    if (currentLetter) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [currentLetter]);

  const openLetter = (letter: Letter, index: number) => {
    setCurrentLetter(letter);
    setCurrentIndex(index);
    setOpenedLetters(prev => new Set([...prev, letter.id]));
    
    if ('vibrate' in navigator) {
      navigator.vibrate([100]);
    }
  };

  const closeLetter = () => {
    setCurrentLetter(null);
  };

  const goToNext = () => {
    if (currentIndex < letters.length - 1) {
      const nextLetter = letters[currentIndex + 1];
      openLetter(nextLetter, currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const prevLetter = letters[currentIndex - 1];
      openLetter(prevLetter, currentIndex - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="text-center mb-6">
        <motion.p 
          className="text-rose-300 font-medium text-sm"
          animate={{ scale: openedLetters.size > 0 ? [1, 1.05, 1] : 1 }}
          key={openedLetters.size}
        >
          💌 {openedLetters.size}/{letters.length} letters opened
        </motion.p>
        <p className="text-white/50 text-xs mt-1">
          Tap the 3D envelopes to read my love letters
        </p>
      </div>

      {/* 3D Envelope Grid */}
      <div 
        className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2"
        style={{ perspective: "1000px" }}
      >
        {letters.map((letter, index) => (
          <Envelope3D
            key={letter.id}
            letter={letter}
            index={index}
            isOpened={openedLetters.has(letter.id)}
            onOpen={() => openLetter(letter, index)}
          />
        ))}
      </div>

      {/* Celebration when all opened */}
      <AnimatePresence>
        {openedLetters.size === letters.length && !currentLetter && (
          <motion.div
            className="text-center py-6"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <motion.span
              className="text-5xl inline-block"
              animate={{ 
                scale: [1, 1.3, 1], 
                rotate: [0, 15, -15, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.span>
            <p className="text-rose-300 font-serif mt-3 text-lg">
              You've read all my letters, Puntuu!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN Letter Modal with 3D Animation */}
      <AnimatePresence>
        {currentLetter && (
          <motion.div
            className="fixed inset-0 z-[99999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-rose-950 via-black to-purple-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            
            {/* Floating 3D hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{ 
                    left: `${5 + i * 8}%`,
                    perspective: "500px"
                  }}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{
                    y: ['-10%', '110%'],
                    rotateY: [0, 360],
                    rotateX: [0, 180],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: 'linear',
                  }}
                >
                  💕
                </motion.div>
              ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div 
                className="flex-shrink-0 bg-black/70 backdrop-blur-xl border-b border-white/10"
                style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <motion.button
                    onClick={closeLetter}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all active:scale-95"
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Back</span>
                  </motion.button>
                  
                  <div className="text-center flex-1 mx-4">
                    <p className="text-white text-sm font-medium">
                      Letter {currentIndex + 1} of {letters.length}
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={closeLetter}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all active:scale-95"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Letter Content with 3D effect */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="p-4 pb-8" style={{ perspective: "1000px" }}>
                  <motion.div
                    key={currentLetter.id}
                    className="w-full max-w-lg mx-auto"
                    initial={{ opacity: 0, rotateX: -30, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: 30, y: -50 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* 3D Letter Card */}
                    <div 
                      className="bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-3xl overflow-hidden"
                      style={{
                        boxShadow: `
                          0 25px 50px -12px rgba(0, 0, 0, 0.5),
                          0 0 0 1px rgba(255, 255, 255, 0.1),
                          inset 0 1px 0 rgba(255, 255, 255, 0.5)
                        `,
                        transform: "translateZ(20px)",
                      }}
                    >
                      {/* Letter Header with 3D Seal */}
                      <div 
                        className="relative bg-gradient-to-r from-rose-100 via-amber-50 to-rose-100 p-6 text-center border-b border-rose-200"
                        style={{
                          boxShadow: "inset 0 -5px 15px rgba(0,0,0,0.05)",
                        }}
                      >
                        {/* 3D Wax Seal */}
                        <motion.div
                          className={`
                            w-20 h-20 mx-auto rounded-full 
                            bg-gradient-to-br ${currentLetter.sealColor}
                            flex items-center justify-center
                            border-4 border-white
                          `}
                          initial={{ scale: 0, rotateZ: -180 }}
                          animate={{ scale: 1, rotateZ: 0 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          style={{
                            boxShadow: `
                              0 10px 30px rgba(0,0,0,0.3),
                              inset 0 3px 6px rgba(255,255,255,0.4),
                              inset 0 -3px 6px rgba(0,0,0,0.2)
                            `,
                            transform: "translateZ(30px)",
                          }}
                        >
                          <span className="text-3xl drop-shadow-lg">{currentLetter.emoji}</span>
                        </motion.div>
                        
                        <motion.h2
                          className="mt-4 text-2xl font-serif text-rose-700 font-bold"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {currentLetter.title}
                        </motion.h2>
                      </div>

                      {/* Letter Body */}
                      <div className="p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <p className="text-gray-700 font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line">
                            {currentLetter.content}
                          </p>
                        </motion.div>

                        {/* Signature */}
                        <motion.div 
                          className="mt-8 pt-4 border-t border-rose-200 text-right"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <p className="text-rose-500 font-serif italic text-lg flex items-center justify-end gap-2">
                            With all my love
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                            </motion.span>
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div 
                className="flex-shrink-0 bg-black/70 backdrop-blur-xl border-t border-white/10"
                style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
              >
                <div className="px-4 py-4">
                  {/* Letter indicators */}
                  <div className="flex justify-center gap-2 mb-4">
                    {letters.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => openLetter(letters[i], i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentIndex 
                            ? 'bg-rose-400 w-8' 
                            : 'bg-white/30 w-2 hover:bg-white/50'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between items-center gap-4">
                    <motion.button
                      onClick={goPrev}
                      disabled={currentIndex === 0}
                      className={`flex-1 py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all ${
                        currentIndex === 0 
                          ? 'bg-white/5 text-white/30' 
                          : 'bg-white/15 text-white hover:bg-white/25 active:scale-95'
                      }`}
                      whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Previous</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={goToNext}
                      disabled={currentIndex === letters.length - 1}
                      className={`flex-1 py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all ${
                        currentIndex === letters.length - 1 
                          ? 'bg-white/5 text-white/30' 
                          : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 active:scale-95'
                      }`}
                      whileTap={currentIndex < letters.length - 1 ? { scale: 0.95 } : {}}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
