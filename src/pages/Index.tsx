import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, VolumeX, Lock, Sparkles } from "lucide-react";

// Valentine's Week Days Configuration
const valentineDays = [
  {
    date: new Date(2025, 1, 7), // Feb 7
    name: "Rose Day",
    emoji: "🌹",
    color: "from-rose-400 to-pink-500",
    bgGradient: "from-rose-50 via-pink-50 to-red-50",
  },
  {
    date: new Date(2025, 1, 8), // Feb 8
    name: "Propose Day",
    emoji: "💍",
    color: "from-amber-400 to-rose-500",
    bgGradient: "from-amber-50 via-rose-50 to-pink-50",
  },
  {
    date: new Date(2025, 1, 9), // Feb 9
    name: "Chocolate Day",
    emoji: "🍫",
    color: "from-amber-600 to-amber-800",
    bgGradient: "from-amber-50 via-orange-50 to-amber-100",
  },
  {
    date: new Date(2025, 1, 10), // Feb 10
    name: "Teddy Day",
    emoji: "🧸",
    color: "from-amber-300 to-amber-500",
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50",
  },
  {
    date: new Date(2025, 1, 11), // Feb 11
    name: "Promise Day",
    emoji: "🤝",
    color: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-50 via-pink-50 to-rose-50",
  },
  {
    date: new Date(2025, 1, 12), // Feb 12
    name: "Hug Day",
    emoji: "🤗",
    color: "from-orange-400 to-rose-400",
    bgGradient: "from-orange-50 via-rose-50 to-pink-50",
  },
  {
    date: new Date(2025, 1, 13), // Feb 13
    name: "Kiss Day",
    emoji: "💋",
    color: "from-red-400 to-pink-500",
    bgGradient: "from-red-50 via-pink-50 to-rose-50",
  },
  {
    date: new Date(2025, 1, 14), // Feb 14
    name: "Valentine's Day",
    emoji: "💕",
    color: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 via-pink-100 to-rose-100",
  },
];

// Floating Hearts Component
const FloatingHearts = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30"
          initial={{
            x: Math.random() * windowWidth,
            y: windowHeight + 100,
            rotate: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <Heart size={20 + Math.random() * 20} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

// Sparkle Effect Component
const SparkleEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// Rose Petals Component
const RosePetals = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * windowWidth,
            y: -50,
            rotate: 0,
          }}
          animate={{
            y: windowHeight + 50,
            x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 100}px)`,
            rotate: 360,
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <div className="w-4 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full transform rotate-45 opacity-60" />
        </motion.div>
      ))}
    </div>
  );
};

// Day Content Components
const RoseDayContent = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center space-y-8"
  >
    <motion.div
      className="text-8xl"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      🌹
    </motion.div>
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl font-serif text-rose-700">
        A Rose for My Anjali
      </h2>
      <p className="text-lg text-rose-600/80 max-w-md mx-auto leading-relaxed">
        Like the most beautiful rose in the garden, you stand out in every crowd. 
        Your beauty isn't just on the surface—it blooms from your kind heart.
      </p>
      <motion.div
        className="flex justify-center gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {["🌹", "🌷", "🌸", "💐", "🌺"].map((flower, i) => (
          <motion.span
            key={i}
            className="text-4xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          >
            {flower}
          </motion.span>
        ))}
      </motion.div>
    </div>
    <p className="text-rose-500 italic font-serif text-xl">
      "Every love story is beautiful, but ours is my favorite."
    </p>
  </motion.div>
);

const ProposeDayContent = () => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8"
    >
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setRevealed(true)}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-8xl"
          animate={revealed ? { scale: [1, 1.3, 1] } : { scale: [1, 1.05, 1] }}
          transition={{ duration: revealed ? 0.5 : 2, repeat: revealed ? 0 : Infinity }}
        >
          {revealed ? "💍" : "💝"}
        </motion.div>
        {!revealed && (
          <p className="text-amber-600 text-sm mt-2">Tap to reveal</p>
        )}
      </motion.div>
      
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-amber-700">
              Anjali, I Choose You
            </h2>
            <p className="text-lg text-amber-600/80 max-w-md mx-auto leading-relaxed">
              Every morning I wake up, I choose you. Every moment of every day, 
              my heart beats for you. You're not just my love—you're my home.
            </p>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-5xl"
            >
              💖
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ChocolateDayContent = () => {
  const [opened, setOpened] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8"
    >
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setOpened(true)}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-8xl"
          animate={opened ? { rotateY: 180 } : {}}
          transition={{ duration: 0.6 }}
        >
          {opened ? "🍫" : "🎁"}
        </motion.div>
        {!opened && (
          <p className="text-amber-700 text-sm mt-2">Tap to open the box</p>
        )}
      </motion.div>
      
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-amber-800">
              Life is Sweeter with You, Anjali
            </h2>
            <p className="text-lg text-amber-700/80 max-w-md mx-auto leading-relaxed">
              You're the sweetest thing in my life—sweeter than any chocolate. 
              Every moment with you melts my heart like chocolate on a warm day.
            </p>
            <div className="flex justify-center gap-3">
              {["🍫", "🍬", "🍭", "🧁", "🍰"].map((sweet, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {sweet}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TeddyDayContent = () => {
  const [hugged, setHugged] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8"
    >
      <motion.div
        className="cursor-pointer"
        onClick={() => setHugged(!hugged)}
        whileHover={{ scale: 1.1 }}
        animate={hugged ? { 
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-8xl block">{hugged ? "🤗" : "🧸"}</span>
        <p className="text-amber-600 text-sm mt-2">
          {hugged ? "Sending you the biggest hug!" : "Tap teddy for a hug"}
        </p>
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif text-amber-700">
          My Cuddly Anjali
        </h2>
        <p className="text-lg text-amber-600/80 max-w-md mx-auto leading-relaxed">
          Like a teddy bear, I want to be there for you always—
          to comfort you, to make you smile, and to be your safe place.
        </p>
        <motion.p
          className="text-amber-500 italic font-serif text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          "You'll always have me to hold onto."
        </motion.p>
      </div>
    </motion.div>
  );
};

const PromiseDayContent = () => {
  const promises = [
    "I promise to love you more each day",
    "I promise to be your biggest supporter",
    "I promise to make you laugh when you're sad",
    "I promise to cherish every moment with you",
    "I promise to be there, no matter what",
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8"
    >
      <motion.div
        className="text-8xl"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        🤝
      </motion.div>
      
      <h2 className="text-3xl md:text-4xl font-serif text-purple-700">
        My Promises to You, Anjali
      </h2>
      
      <div className="space-y-4 max-w-md mx-auto">
        {promises.map((promise, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 }}
            className="flex items-center gap-3 text-left bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm"
          >
            <span className="text-2xl">💜</span>
            <p className="text-purple-700">{promise}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-purple-500 italic font-serif text-lg">
          "These promises are sealed with my love forever."
        </p>
      </motion.div>
    </motion.div>
  );
};

const HugDayContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8"
    >
      <motion.div
        className="text-8xl"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🤗
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif text-orange-600">
          Wrapped in My Love, Anjali
        </h2>
        <p className="text-lg text-orange-500/80 max-w-md mx-auto leading-relaxed">
          In my arms is where you belong. Every hug with you feels like 
          coming home. You're my safe place, my comfort, my everything.
        </p>
        
        <motion.div
          className="flex justify-center items-center gap-2 text-6xl"
          animate={{ x: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>🧍‍♀️</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            💕
          </motion.span>
          <span>🧍‍♂️</span>
        </motion.div>
        
        <p className="text-orange-400 italic font-serif text-lg pt-4">
          "In your hug, I find my peace."
        </p>
      </div>
    </motion.div>
  );
};

const KissDayContent = () => {
  const [kissed, setKissed] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8"
    >
      <motion.div
        className="cursor-pointer relative"
        onClick={() => setKissed(true)}
        whileHover={{ scale: 1.1 }}
      >
        <motion.span
          className="text-8xl block"
          animate={kissed ? { scale: [1, 1.3, 1] } : {}}
        >
          💋
        </motion.span>
        {kissed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45 * Math.PI / 180) * 80,
                  y: Math.sin(i * 45 * Math.PI / 180) * 80,
                }}
                transition={{ duration: 1, delay: i * 0.1 }}
              >
                ❤️
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif text-red-600">
          A Kiss for My Anjali
        </h2>
        <p className="text-lg text-red-500/80 max-w-md mx-auto leading-relaxed">
          Words fade, but a kiss speaks the language of the heart. 
          Every kiss with you writes a new chapter in our love story.
        </p>
        <motion.p
          className="text-red-400 italic font-serif text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          "In your kiss, I taste forever."
        </motion.p>
      </div>
    </motion.div>
  );
};

const ValentineDayContent = () => {
  const [showLetter, setShowLetter] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8"
    >
      {/* Fireworks effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + Math.random() * 30}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Sparkles className="text-yellow-400 w-8 h-8" />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="text-8xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💕
      </motion.div>
      
      <h2 className="text-4xl md:text-5xl font-serif text-red-600">
        Happy Valentine's Day, Anjali!
      </h2>
      
      <motion.button
        onClick={() => setShowLetter(!showLetter)}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showLetter ? "Close Letter" : "💌 Open My Love Letter"}
      </motion.button>
      
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-lg mx-auto text-left space-y-4"
          >
            <p className="text-red-700 font-serif text-lg">My Dearest Anjali,</p>
            <p className="text-gray-700 leading-relaxed">
              From the first moment I saw you, I knew you were special. 
              Your smile lights up my darkest days, your laughter is my favorite melody, 
              and your love is the greatest gift I've ever received.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Valentine's Week, I wanted to remind you of how much you mean to me. 
              Every day with you is a blessing, and I fall more in love with you 
              with each passing moment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You're not just my Valentine—you're my best friend, my confidant, 
              my partner in everything. I can't imagine my life without you.
            </p>
            <p className="text-red-600 font-serif text-lg italic">
              Forever and Always Yours,<br />
              ❤️ Your Love
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="pt-4">
        <p className="text-red-400 text-sm">
          📸 Upload your photos to make this day even more special
        </p>
      </div>
      
      <motion.p
        className="text-red-500 italic font-serif text-xl"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        "You are my today and all of my tomorrows."
      </motion.p>
    </motion.div>
  );
};

const dayContents = [
  RoseDayContent,
  ProposeDayContent,
  ChocolateDayContent,
  TeddyDayContent,
  PromiseDayContent,
  HugDayContent,
  KissDayContent,
  ValentineDayContent,
];

// Locked Day Component
const LockedDay = ({ day, daysUntil }: { day: typeof valentineDays[0]; daysUntil: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center space-y-6"
  >
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Lock className="w-16 h-16 mx-auto text-gray-400" />
    </motion.div>
    <h2 className="text-2xl font-serif text-gray-600">
      {day.name} is Coming Soon
    </h2>
    <p className="text-gray-500">
      Come back in {daysUntil} {daysUntil === 1 ? "day" : "days"} ❤️
    </p>
    <motion.p
      className="text-pink-400 italic"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      "Good things come to those who wait..."
    </motion.p>
  </motion.div>
);

// Day Card Component
const DayCard = ({ 
  day, 
  index, 
  isUnlocked, 
  isActive, 
  onClick 
}: { 
  day: typeof valentineDays[0];
  index: number;
  isUnlocked: boolean;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    disabled={!isUnlocked}
    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all min-w-[72px] ${
      isUnlocked 
        ? `bg-gradient-to-br ${day.color} text-white shadow-lg hover:shadow-xl cursor-pointer` 
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    } ${isActive ? "ring-4 ring-white ring-opacity-60 scale-105" : ""}`}
    whileHover={isUnlocked ? { scale: 1.05 } : {}}
    whileTap={isUnlocked ? { scale: 0.95 } : {}}
  >
    <span className="text-3xl">{isUnlocked ? day.emoji : "🔒"}</span>
    <span className="text-xs mt-1 font-medium opacity-90">
      {day.name.split(" ")[0]}
    </span>
    {isActive && (
      <motion.div
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
        layoutId="activeIndicator"
      />
    )}
  </motion.button>
);

// Main Index Component
const Index = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Calculate which days are unlocked based on current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const getDaysUntil = (date: Date) => {
    const diff = date.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  const isDayUnlocked = (date: Date) => {
    if (previewMode) return true;
    return today >= date;
  };
  
  // Find the latest unlocked day on mount
  useEffect(() => {
    let latestUnlocked = 0;
    valentineDays.forEach((day, index) => {
      if (isDayUnlocked(day.date)) {
        latestUnlocked = index;
      }
    });
    setCurrentDay(latestUnlocked);
  }, [previewMode]);
  
  // Triple-tap handler for preview mode
  const handleHeaderTap = () => {
    setTapCount(prev => prev + 1);
    
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    
    tapTimeoutRef.current = setTimeout(() => {
      setTapCount(0);
    }, 500);
    
    if (tapCount >= 2) {
      setPreviewMode(!previewMode);
      setTapCount(0);
    }
  };
  
  // Music toggle
  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://www.bensound.com/bensound-music/bensound-love.mp3");
      audioRef.current.loop = true;
    }
    
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked - user needs to interact first
      });
    }
    setIsMusicPlaying(!isMusicPlaying);
  };
  
  const currentDayData = valentineDays[currentDay];
  const CurrentDayContent = dayContents[currentDay];
  const isCurrentDayUnlocked = isDayUnlocked(currentDayData.date);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentDayData.bgGradient} transition-all duration-700`}>
      <FloatingHearts />
      <SparkleEffect />
      {currentDay === 0 && <RosePetals />}
      
      {/* Header */}
      <header 
        className="relative z-20 p-4 flex items-center justify-between"
        onClick={handleHeaderTap}
      >
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          <span className="font-serif text-pink-600 text-lg">For Anjali</span>
        </div>
        
        <div className="flex items-center gap-3">
          {previewMode && (
            <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
              Preview Mode
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMusic();
            }}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors"
          >
            {isMusicPlaying ? (
              <Music className="w-5 h-5 text-pink-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
      </header>
      
      {/* Day Navigation */}
      <nav className="relative z-20 px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {valentineDays.map((day, index) => (
            <DayCard
              key={index}
              day={day}
              index={index}
              isUnlocked={isDayUnlocked(day.date)}
              isActive={currentDay === index}
              onClick={() => isDayUnlocked(day.date) && setCurrentDay(index)}
            />
          ))}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="relative z-10 px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            {/* Day Title */}
            <div className="text-center mb-8">
              <motion.span
                className="text-6xl block mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentDayData.emoji}
              </motion.span>
              <h1 className={`text-3xl font-serif bg-gradient-to-r ${currentDayData.color} bg-clip-text text-transparent`}>
                {currentDayData.name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {currentDayData.date.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            {/* Content */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl">
              {isCurrentDayUnlocked ? (
                <CurrentDayContent />
              ) : (
                <LockedDay 
                  day={currentDayData} 
                  daysUntil={getDaysUntil(currentDayData.date)} 
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="relative z-20 text-center py-8 text-pink-400 text-sm">
        <p>Made with 💕 for Anjali</p>
      </footer>
    </div>
  );
};

export default Index;
