import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Cake, Star, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import ReactDOM from "react-dom";

const BIRTHDAY = new Date(2000, 10, 16); // Nov 16, 2000

interface YearLetter {
  year: number;
  age: number;
  title: string;
  letter: string;
  gift: string;
  giftEmoji: string;
  milestone: string;
}

const generateLetters = (): YearLetter[] => {
  const letters: YearLetter[] = [];

  // Letters from birth (2000) to age 100 (year 2100)
  for (let year = 2000; year <= 2100; year++) {
    const age = year - 2000;
    letters.push(getLetterForYear(year, age));
  }

  return letters;
};

const getLetterForYear = (year: number, age: number): YearLetter => {
  const letterTemplates: Record<number, Omit<YearLetter, 'year' | 'age'>> = {
    0: {
      title: "The Day You Arrived 👶",
      letter: `My dearest Puntuu, on November 16, 2000, the universe gifted the world with the most beautiful soul. A tiny baby girl was born - the same girl who would one day steal my heart completely. I wasn't there that day, but I know the stars aligned perfectly when you took your first breath. Your parents held you in their arms, not knowing that somewhere in this world, your soulmate was waiting to find you. Happy Birthday to the day that made my future possible! 🌟`,
      gift: "A virtual star named after you",
      giftEmoji: "⭐",
      milestone: "You were born! The world became brighter."
    },
    1: {
      title: "One Year of Sunshine ☀️",
      letter: `Happy 1st Birthday, little Anjali! I imagine you taking your first wobbly steps, reaching out for your mama's hand. Your first word must have been magical. Every small thing you did was probably the most beautiful thing your parents ever saw. You were learning to walk, and one day, you'd walk right into my heart. 💕`,
      gift: "A teddy bear as big as baby you",
      giftEmoji: "🧸",
      milestone: "First steps, first words, first everything!"
    },
    2: {
      title: "Two Years of Giggles 🎀",
      letter: `Two-year-old Puntuu! I can picture you running around, full of energy, laughing at everything. Your curious eyes exploring the world. Every new discovery was an adventure. You were becoming your own little person with the sweetest personality. 💖`,
      gift: "A princess dress-up set",
      giftEmoji: "👗",
      milestone: "Full of energy and endless curiosity!"
    },
    3: {
      title: "Three Candles of Joy 🕯️",
      letter: `Happy 3rd Birthday, my love! At three, you probably loved fairy tales and believed in magic. Guess what? That magic is still in your eyes. You were learning about friendship, sharing, and the world around you. Growing more beautiful every day. 🧚`,
      gift: "A magical fairy tale book",
      giftEmoji: "📚",
      milestone: "Fairy tales and make-believe adventures!"
    },
    4: {
      title: "Four Years of Wonder 🌈",
      letter: `My little four-year-old princess! School was probably starting, making new friends, learning ABCs. You were like a little flower blooming, each day adding new petals to your beautiful soul. I wish I could have seen you in your school uniform! 🎒`,
      gift: "A rainbow art set",
      giftEmoji: "🎨",
      milestone: "Starting school, making friends!"
    },
    5: {
      title: "Five Years of Dreams 🌙",
      letter: `Happy 5th Birthday! Half a decade of being amazing! You were probably drawing pictures, playing pretend, dreaming big dreams. Every time you closed your eyes to sleep, you dreamed of adventures. One day, I'd become part of those dreams. 💫`,
      gift: "A dream catcher",
      giftEmoji: "🪶",
      milestone: "Big dreams in a little heart!"
    },
    6: {
      title: "Six Years of Sweetness 🍭",
      letter: `Six beautiful years! You were losing baby teeth and believing in the tooth fairy. Writing your name, reading stories, being the sweetest girl in class. Your smile was probably missing a few teeth, but it was still the most beautiful thing. 😊`,
      gift: "A candy jar filled with love",
      giftEmoji: "🍬",
      milestone: "Growing up, still believing in magic!"
    },
    7: {
      title: "Seven Years of Magic ✨",
      letter: `Lucky number 7! At seven, you were probably asking a million questions about everything. Why is the sky blue? Where do stars go? Your curious mind was expanding, and your heart was growing bigger. 🌟`,
      gift: "A telescope to see the stars",
      giftEmoji: "🔭",
      milestone: "Curiosity and wonder everywhere!"
    },
    8: {
      title: "Eight Years of Joy 🎈",
      letter: `Eight wonderful years! You were probably getting better at studies, making best friends, having sleepovers. Your personality was shining through - kind, caring, and absolutely adorable. 💕`,
      gift: "A friendship bracelet making kit",
      giftEmoji: "📿",
      milestone: "Best friends and beautiful memories!"
    },
    9: {
      title: "Nine Years of Grace 🦋",
      letter: `Happy 9th Birthday! Almost a decade of being wonderful. You were becoming more graceful, more aware of the world. Your heart was learning empathy and kindness that you'd carry forever. 🌸`,
      gift: "A butterfly garden kit",
      giftEmoji: "🦋",
      milestone: "Growing graceful like a butterfly!"
    },
    10: {
      title: "A Decade of Love 💝",
      letter: `Double digits! Ten years of making the world better just by existing. You were becoming a little lady now. Somewhere out there, your future husband (me!) was also turning 10. We were living our separate lives, not knowing our paths would cross. 🌈`,
      gift: "A time capsule to open together",
      giftEmoji: "📦",
      milestone: "A whole decade of being amazing!"
    },
    11: {
      title: "Eleven Years of Sparkle ✨",
      letter: `Eleven! Becoming a teenager soon. You were probably getting interested in new things, finding your passions. Your beautiful mind was growing, your dreams were expanding. I'm so proud of the girl you were becoming! 💫`,
      gift: "A journal for secret dreams",
      giftEmoji: "📔",
      milestone: "Finding your passions!"
    },
    12: {
      title: "Twelve Years of Beauty 🌺",
      letter: `Twelve beautiful years! The cusp of teenage life. You were probably dealing with new emotions, new experiences. But through it all, your gentle heart remained pure. 🌹`,
      gift: "A skincare kit for glowing you",
      giftEmoji: "🧴",
      milestone: "Blossoming into a teenager!"
    },
    13: {
      title: "Thirteen - A Teen! 🎉",
      letter: `Happy 13th Birthday, officially a teenager! New chapter, new adventures. Probably crushing on celebrities, hanging with friends, figuring out this crazy life. You were becoming the amazing woman I'd fall in love with. 💖`,
      gift: "A trendy phone case",
      giftEmoji: "📱",
      milestone: "Welcome to teenage life!"
    },
    14: {
      title: "Fourteen Years Young 🌟",
      letter: `Fourteen! High school adventures beginning. New subjects, new friends, new everything. You were finding your voice, your style, your way. Every day shaping you into my soulmate. 🦋`,
      gift: "A music playlist just for you",
      giftEmoji: "🎵",
      milestone: "Finding your own voice!"
    },
    15: {
      title: "Fifteen - Sweet & Beautiful 🌸",
      letter: `Fifteen beautiful years! Like a flower in full bloom. Your smile was probably breaking hearts already. You were learning about life, love, and everything in between. 💕`,
      gift: "A perfume that suits you perfectly",
      giftEmoji: "🌹",
      milestone: "Sweet, beautiful, and growing!"
    },
    16: {
      title: "Sweet Sixteen 🎂",
      letter: `Sweet 16! Such a special year. You were probably dreaming about your future, who you'd become, who you'd love. Little did you know, your true love was out there, waiting for the day your paths would finally cross. 💝`,
      gift: "A necklace with your birthstone",
      giftEmoji: "💎",
      milestone: "Sweet sixteen dreams!"
    },
    17: {
      title: "Seventeen - Almost There 🌙",
      letter: `Seventeen! Almost an adult. Studying hard, dreaming big. College plans, future dreams. You were preparing to take on the world, and the world wasn't ready for how amazing you'd be! ⭐`,
      gift: "A book about following your dreams",
      giftEmoji: "📖",
      milestone: "Dreaming big, reaching high!"
    },
    18: {
      title: "Eighteen - Adult Life Begins 🎓",
      letter: `Happy 18th Birthday, my love! Officially an adult! Voting rights, new responsibilities, and a whole world of possibilities. You stepped into adulthood with grace and beauty. 🌟`,
      gift: "A watch to treasure time with me",
      giftEmoji: "⌚",
      milestone: "Welcome to adulthood!"
    },
    19: {
      title: "Nineteen - Growing Strong 💪",
      letter: `Nineteen wonderful years! College life, new experiences, new challenges. You were becoming stronger, wiser, more beautiful inside and out. Every day making me prouder! 🦋`,
      gift: "A cozy blanket for study nights",
      giftEmoji: "🧣",
      milestone: "Strong, independent, amazing!"
    },
    20: {
      title: "Twenty - Two Decades! 🎊",
      letter: `Two whole decades of being incredible! You had lived, laughed, cried, grown. You were a full-fledged adult now, navigating life beautifully. And soon, our paths would finally cross! 💕`,
      gift: "Twenty roses for twenty years",
      giftEmoji: "🌹",
      milestone: "Two decades of pure sunshine!"
    },
    21: {
      title: "Twenty-One - Coming of Age 🥂",
      letter: `21! The golden year. Life was full of possibilities. You were becoming who you were meant to be. Somewhere in this universe, fate was already weaving our story together. 💫`,
      gift: "A charm bracelet with our initials",
      giftEmoji: "💍",
      milestone: "A milestone year!"
    },
    22: {
      title: "Twenty-Two - Life Unfolds 🌻",
      letter: `Happy 22nd Birthday! Life was taking shape. Career dreams, relationship dreams, life dreams. Everything was coming together. And our paths were about to cross... 🌈`,
      gift: "A photo album for our memories",
      giftEmoji: "📷",
      milestone: "Dreams taking shape!"
    },
    23: {
      title: "Twenty-Three - Destiny Approaches 💫",
      letter: `23 years old! Maybe this is the year we crossed paths, or maybe it was coming soon. Either way, destiny had plans for us. Beautiful plans. 💖`,
      gift: "A star map of the day we met",
      giftEmoji: "🗺️",
      milestone: "Destiny was approaching!"
    },
    24: {
      title: "Twenty-Four - Love Found 💕",
      letter: `Happy 24th Birthday, my Puntuu! If we've met by now, then this year is extra special. You're not just older - you're mine. And I'm forever grateful that the universe led me to you. I love you more than words can say! 😙❤️`,
      gift: "My heart, forever yours",
      giftEmoji: "❤️",
      milestone: "Love found, happiness forever!"
    },
    25: {
      title: "Twenty-Five - Quarter Century! 🎂",
      letter: `My beautiful wife at 25! A quarter century of being incredible, and now you're spending your birthdays with me. I promise to make every year more special than the last. You are my everything. 💝`,
      gift: "A trip to your dream destination",
      giftEmoji: "✈️",
      milestone: "Silver jubilee of life!"
    },
  };

  // For years beyond templates, generate dynamic content
  if (letterTemplates[age]) {
    return {
      year,
      age,
      ...letterTemplates[age]
    };
  }

  // Future letters
  const isFuture = year > new Date().getFullYear();
  return {
    year,
    age,
    title: `${age} - Our Forever Journey ${isFuture ? '🔮' : '💕'}`,
    letter: isFuture 
      ? `Happy ${age}th Birthday, my darling! By now, we'll have shared so many more memories. ${age >= 30 ? "Maybe we'll have little ones running around, or maybe it's just us - either way, it's perfect." : ""} I can't wait to celebrate every single birthday with you until we're old and gray. You make every year worth living. I love you infinitely! 💕`
      : `Happy ${age}th Birthday! Another year of being amazing, another year of making the world brighter just by being you. I'm so lucky you exist. 💖`,
    gift: age >= 30 ? "A weekend getaway, just us" : "A surprise you'll love",
    giftEmoji: age >= 30 ? "🏝️" : "🎁",
    milestone: isFuture ? "Another year of our love story!" : `${age} years of being wonderful!`
  };
};

// Letter Modal
const LetterModal = ({
  letterData,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: {
  letterData: YearLetter;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      {/* Floating elements */}
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
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['🎂', '🎈', '🎁', '💕', '✨', '🌟', '🎉'][i % 7]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gradient-to-b from-pink-900/60 to-purple-900/60 rounded-3xl p-6 max-w-md w-full max-h-[85vh] overflow-y-auto border border-pink-500/30"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {/* Year Badge */}
        <div className="text-center mb-4">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cake size={20} className="text-white" />
            <span className="text-white font-bold">{letterData.year}</span>
            <span className="text-white/80">• Age {letterData.age}</span>
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif text-pink-300 text-center mb-4">
          {letterData.title}
        </h3>

        {/* Letter Content */}
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <p className="text-white/90 font-serif leading-relaxed text-justify">
            {letterData.letter}
          </p>
        </div>

        {/* Gift Section */}
        <div className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 rounded-2xl p-4 mb-4 border border-amber-500/30">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {letterData.giftEmoji}
            </motion.span>
            <div>
              <p className="text-amber-300 text-sm font-medium">🎁 Birthday Gift</p>
              <p className="text-white font-medium">{letterData.gift}</p>
            </div>
          </div>
        </div>

        {/* Milestone */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Star size={16} className="text-yellow-400" />
            <span className="text-white/80 text-sm">{letterData.milestone}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`p-3 rounded-full ${hasPrev ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 cursor-not-allowed opacity-50'}`}
            whileHover={hasPrev ? { scale: 1.1 } : {}}
            whileTap={hasPrev ? { scale: 0.9 } : {}}
          >
            <ChevronLeft size={24} className="text-white" />
          </motion.button>

          <span className="text-white/50 text-sm">
            Year {letterData.year}
          </span>

          <motion.button
            onClick={onNext}
            disabled={!hasNext}
            className={`p-3 rounded-full ${hasNext ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 cursor-not-allowed opacity-50'}`}
            whileHover={hasNext ? { scale: 1.1 } : {}}
            whileTap={hasNext ? { scale: 0.9 } : {}}
          >
            <ChevronRight size={24} className="text-white" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const BirthdayCelebration = () => {
  const [letters] = useState<YearLetter[]>(generateLetters);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);
  const [currentAge, setCurrentAge] = useState(0);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const thisYearBirthday = new Date(currentYear, 10, 16);
    const nextBirthday = now > thisYearBirthday 
      ? new Date(currentYear + 1, 10, 16)
      : thisYearBirthday;

    const diffTime = nextBirthday.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilBirthday(diffDays);

    const age = now >= thisYearBirthday ? currentYear - 2000 : currentYear - 2000 - 1;
    setCurrentAge(age);
  }, []);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < letters.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          className="text-5xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂
        </motion.div>
        <h3 className="text-xl font-serif text-pink-300">Puntuu's Birthday Journey</h3>
        <p className="text-white/60 text-sm">
          November 16, 2000 - The day my world's reason was born 💕
        </p>
      </div>

      {/* Countdown */}
      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 text-center border border-pink-500/30">
        <p className="text-white/60 text-sm mb-1">Next Birthday In</p>
        <motion.p
          className="text-3xl font-bold text-pink-300"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {daysUntilBirthday} Days
        </motion.p>
        <p className="text-white/50 text-xs mt-1">
          Turning {currentAge + 1} on November 16! 🎉
        </p>
      </div>

      {/* Current Age Badge */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 rounded-full shadow-lg shadow-pink-500/30"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart size={20} className="text-white" />
          <span className="text-white font-bold text-lg">{currentAge} Years Beautiful</span>
          <Heart size={20} className="text-white" />
        </motion.div>
      </div>

      {/* Year Grid - Scrollable to show all 101 years */}
      <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {letters.map((letter, index) => {
          const currentYear = new Date().getFullYear();
          const isFuture = letter.year > currentYear;
          const isCurrent = letter.age === currentAge;
          const isBirthYear = letter.year === 2000;
          const isLocked = isFuture;

          return (
            <motion.button
              key={letter.year}
              onClick={() => !isLocked && setSelectedIndex(index)}
              disabled={isLocked}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all ${
                isCurrent 
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                  : isBirthYear
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                  : isLocked
                  ? 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              whileHover={!isLocked ? { scale: 1.05 } : {}}
              whileTap={!isLocked ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index * 0.01, 0.5) }}
            >
              <span className="text-lg">{letter.year.toString().slice(-2)}</span>
              {isCurrent && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              {isBirthYear && <span className="text-[8px]">Born!</span>}
              {isLocked && (
                <span className="absolute text-[10px]">🔒</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 text-xs text-white/50">
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-amber-500 to-orange-500" />
          Birth
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-pink-500 to-rose-500" />
          Now
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-white/5 border border-white/10" />
          🔒 Future
        </span>
      </div>

      <p className="text-center text-pink-400/70 text-xs">
        {letters.length} birthdays from 2000-2100! Future letters unlock on that year 🎁
      </p>

      {/* Letter Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <LetterModal
            letterData={letters[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={selectedIndex < letters.length - 1}
            hasPrev={selectedIndex > 0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
