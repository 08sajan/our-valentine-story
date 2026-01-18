import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import ReactDOM from "react-dom";

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

// Fullscreen Letter Modal - Rendered via Portal
const FullscreenLetterModal = ({
  letter,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onSelectLetter,
}: {
  letter: Letter;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectLetter: (index: number) => void;
}) => {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.inset = '0';
    document.body.style.width = '100%';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.width = '';
    };
  }, []);

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Full Background - Gradient */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1a0a0a 0%, #0d0d0d 50%, #0a0a1a 100%)',
        }}
      />

      {/* Floating Hearts */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${8 + i * 10}%`,
              fontSize: '1.5rem',
              opacity: 0.15,
            }}
            animate={{
              y: ['-5%', '105%'],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1,
              ease: 'linear',
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div 
        style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 'max(16px, env(safe-area-inset-top))',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <motion.button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </motion.button>
          
          <p style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
            Letter {currentIndex + 1} of {letters.length}
          </p>
          
          <motion.button
            onClick={onClose}
            style={{
              padding: '10px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ padding: '20px 16px', paddingBottom: '40px' }}>
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            {/* Letter Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #ffffff 50%, #fff1f2 100%)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Header with Seal */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #ffe4e6 0%, #fef3c7 100%)',
                  padding: '24px',
                  textAlign: 'center',
                  borderBottom: '1px solid #fecdd3',
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${letter.sealColor} flex items-center justify-center border-4 border-white`}
                  style={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{letter.emoji}</span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    marginTop: '16px',
                    fontSize: '1.5rem',
                    fontFamily: 'serif',
                    color: '#be123c',
                    fontWeight: 'bold',
                  }}
                >
                  {letter.title}
                </motion.h2>
              </div>

              {/* Letter Body */}
              <div style={{ padding: '24px' }}>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    color: '#374151',
                    fontFamily: 'serif',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {letter.content}
                </motion.p>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    marginTop: '24px',
                    paddingTop: '16px',
                    borderTop: '1px solid #fecdd3',
                    textAlign: 'right',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: '#f43f5e', fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.1rem' }}>
                    With all my love
                  </span>
                  <Heart size={18} fill="#f43f5e" color="#f43f5e" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ padding: '16px' }}>
          {/* Letter dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            {letters.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelectLetter(i)}
                style={{
                  width: i === currentIndex ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  background: i === currentIndex ? '#fb7185' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
          
          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <motion.button
              onClick={onPrev}
              disabled={currentIndex === 0}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: currentIndex === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
                color: currentIndex === 0 ? 'rgba(255,255,255,0.3)' : 'white',
                border: 'none',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                fontSize: '15px',
                fontWeight: 500,
              }}
              whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft size={20} />
              Previous
            </motion.button>
            
            <motion.button
              onClick={onNext}
              disabled={currentIndex === letters.length - 1}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: currentIndex === letters.length - 1 
                  ? 'rgba(255,255,255,0.05)' 
                  : 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                color: currentIndex === letters.length - 1 ? 'rgba(255,255,255,0.3)' : 'white',
                border: 'none',
                cursor: currentIndex === letters.length - 1 ? 'not-allowed' : 'pointer',
                fontSize: '15px',
                fontWeight: 500,
                boxShadow: currentIndex === letters.length - 1 ? 'none' : '0 10px 30px rgba(244, 63, 94, 0.4)',
              }}
              whileTap={currentIndex < letters.length - 1 ? { scale: 0.95 } : {}}
            >
              Next
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Render to body using portal
  return ReactDOM.createPortal(modalContent, document.body);
};

// 3D Envelope
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
}) => (
  <motion.button
    onClick={onOpen}
    className="relative cursor-pointer border-none bg-transparent p-0"
    style={{ perspective: '800px' }}
    initial={{ opacity: 0, rotateY: 180, scale: 0.5 }}
    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
    whileHover={{ scale: 1.15, rotateY: 15, rotateX: -10 }}
    whileTap={{ scale: 0.9 }}
  >
    <div 
      className={`relative w-14 h-14 sm:w-16 sm:h-16 ${isOpened ? 'opacity-50' : ''}`}
      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(10deg)' }}
    >
      {/* Back */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg"
        style={{ transform: 'translateZ(-2px)', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
      />
      
      {/* Front */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 rounded-lg overflow-hidden"
        style={{ boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.5), 0 4px 20px rgba(0,0,0,0.2)' }}
      >
        {/* Flap */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 50%, #f59e0b 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 70%)',
          }}
        />
        
        {/* Paper peek */}
        <div 
          className="absolute top-1 left-1 right-1 h-1/3 bg-white rounded-t-sm"
          style={{ opacity: isOpened ? 1 : 0.3 }}
        />
      </div>
      
      {/* Seal */}
      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gradient-to-br ${letter.sealColor} flex items-center justify-center border-2 border-white/30`}
        style={{
          transform: 'translateZ(8px) translate(-50%, -50%)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
        }}
        animate={!isOpened ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-white text-[10px] font-bold">{isOpened ? '✓' : letter.id}</span>
      </motion.div>
      
      {/* Shine */}
      {!isOpened && (
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
          style={{ transform: 'translateZ(1px)' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-150%', '150%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>
      )}
    </div>
  </motion.button>
);

export const LetterGallery = () => {
  const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLetter = (letter: Letter, index: number) => {
    setCurrentLetter(letter);
    setCurrentIndex(index);
    setOpenedLetters(prev => new Set([...prev, letter.id]));
    if ('vibrate' in navigator) navigator.vibrate([100]);
  };

  const closeLetter = () => setCurrentLetter(null);

  const goToNext = () => {
    if (currentIndex < letters.length - 1) {
      openLetter(letters[currentIndex + 1], currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      openLetter(letters[currentIndex - 1], currentIndex - 1);
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
          Tap the envelopes to read my love letters
        </p>
      </div>

      {/* 3D Envelope Grid */}
      <div 
        className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2"
        style={{ perspective: '1000px' }}
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

      {/* Celebration */}
      <AnimatePresence>
        {openedLetters.size === letters.length && !currentLetter && (
          <motion.div
            className="text-center py-6"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <motion.span
              className="text-5xl inline-block"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0], y: [0, -10, 0] }}
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

      {/* Fullscreen Modal via Portal */}
      <AnimatePresence>
        {currentLetter && (
          <FullscreenLetterModal
            letter={currentLetter}
            currentIndex={currentIndex}
            onClose={closeLetter}
            onNext={goToNext}
            onPrev={goPrev}
            onSelectLetter={(i) => openLetter(letters[i], i)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
