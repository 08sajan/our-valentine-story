import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import ReactDOM from "react-dom";
// Premium Components
import { HeartCursor } from "@/components/valentine/HeartCursor";
import { ParallaxStars } from "@/components/valentine/ParallaxStars";
import { Fireflies } from "@/components/valentine/Fireflies";
import { ConfettiCannon } from "@/components/valentine/ConfettiCannon";
import { ScratchCard } from "@/components/valentine/ScratchCard";
import { SelfTypingLoveLetter } from "@/components/valentine/TypewriterText";
import { PhotoGallery } from "@/components/valentine/PhotoGallery";
import { CandleCeremony } from "@/components/valentine/CandleCeremony";
import { CountdownTimer } from "@/components/valentine/CountdownTimer";
import { BackgroundMusic } from "@/components/valentine/BackgroundMusic";
import { RoseCounter } from "@/components/valentine/RoseCounter";
import { RoseBouquet } from "@/components/valentine/RoseBouquet";
import { TeddyGallery } from "@/components/valentine/TeddyGallery";
import { FallingStars } from "@/components/valentine/FallingStars";
import { LetterGallery } from "@/components/valentine/LetterGallery";
import { CinematicHug } from "@/components/valentine/CinematicHug";
import { CinematicKiss } from "@/components/valentine/CinematicKiss";
import { NepaliPoemLanding } from "@/components/valentine/NepaliPoemLanding";
import { DressUpGame } from "@/components/valentine/DressUpGame";
import { LoveQuiz } from "@/components/valentine/LoveQuiz";
import { WishingWell } from "@/components/valentine/WishingWell";
import { RelationshipCountdown } from "@/components/valentine/RelationshipCountdown";
import { WhenIMissYou } from "@/components/valentine/WhenIMissYou";
import { PhotoBooth } from "@/components/valentine/PhotoBooth";
// New Romantic Sections
import { OpenWhenLetters } from "@/components/valentine/OpenWhenLetters";
import { SharedDreamsBucketList } from "@/components/valentine/SharedDreamsBucketList";
import { CuratedSoundscapes } from "@/components/valentine/CuratedSoundscapes";
import { DigitalJarOfHearts } from "@/components/valentine/DigitalJarOfHearts";
import { EmergencyComfortButton } from "@/components/valentine/EmergencyComfortButton";
import { GrowthArchive } from "@/components/valentine/GrowthArchive";
import { FutureMaps } from "@/components/valentine/FutureMaps";
import { DecisionMaker } from "@/components/valentine/DecisionMaker";
import { PermissionSlips } from "@/components/valentine/PermissionSlips";
import { IntimateSection } from "@/components/valentine/IntimateSection";
import { VoiceVideoMessages } from "@/components/valentine/VoiceVideoMessages";
import { BirthdayCelebration } from "@/components/valentine/BirthdayCelebration";
import { FlowerBouquetGallery } from "@/components/valentine/FlowerBouquetGallery";
import { WhenWeFight } from "@/components/valentine/WhenWeFight";
import { ILoveYouLanguages } from "@/components/valentine/ILoveYouLanguages";
import { ValentineProposal } from "@/components/valentine/ValentineProposal";
import { PeriodTracker } from "@/components/valentine/PeriodTracker";
import { KaraokeSection } from "@/components/valentine/KaraokeSection";
import { HealthSection } from "@/components/valentine/HealthSection";
import { FoodNutritionGuide } from "@/components/valentine/FoodNutritionGuide";
import { ComplimentsSection } from "@/components/valentine/ComplimentsSection";
import { JokesSection } from "@/components/valentine/JokesSection";
import { TruthOrDare } from "@/components/valentine/TruthOrDare";
import { DailyAffirmations } from "@/components/valentine/DailyAffirmations";
import { MoodTracker } from "@/components/valentine/MoodTracker";
import { SelfCareSection } from "@/components/valentine/SelfCareSection";
import { NaughtyQuestions } from "@/components/valentine/NaughtyQuestions";
import { VirtualTreats } from "@/components/valentine/VirtualTreats";
import { PrivatePinterest } from "@/components/valentine/PrivatePinterest";
import { EscapeRoom } from "@/components/valentine/EscapeRoom";
import { AirHostessRoleplay } from "@/components/valentine/AirHostessRoleplay";
import { MemoryMatchGame } from "@/components/valentine/MemoryMatchGame";
import { WouldYouRather } from "@/components/valentine/WouldYouRather";
import { 
  ShakeHeartsExplosion, 
  KonamiSecret, 
  MidnightSurprise,
  LongPressSecret 
} from "@/components/valentine/EasterEggs";

// Import memories
import memory1 from "@/assets/memories/memory-1.jpg";
import memory2 from "@/assets/memories/memory-2.png";
import memory3 from "@/assets/memories/memory-3.png";
import memory4 from "@/assets/memories/memory-4.png";
import memory5 from "@/assets/memories/memory-5.png";
import memory6 from "@/assets/memories/memory-6.png";
import memory7 from "@/assets/memories/memory-7.jpg";
import memory8 from "@/assets/memories/memory-8.jpg";
import memory9 from "@/assets/memories/memory-9.jpg";
import memory10 from "@/assets/memories/memory-10.jpg";
import memory11 from "@/assets/memories/memory-11.jpg";
import proposalPhoto from "@/assets/proposal-photo.jpg";

// Valentine's Week Days Configuration
const valentineDays = [
  {
    date: new Date(2025, 1, 7),
    name: "Rose Day",
    emoji: "🌹",
    gradient: "from-rose-500 via-pink-500 to-red-500",
    bgGradient: "from-rose-900 via-pink-900 to-red-900",
    glowColor: "rose",
  },
  {
    date: new Date(2025, 1, 8),
    name: "Propose Day", 
    emoji: "🌻",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    bgGradient: "from-amber-900 via-orange-900 to-rose-900",
    glowColor: "amber",
  },
  {
    date: new Date(2025, 1, 9),
    name: "Chocolate Day",
    emoji: "🍫",
    gradient: "from-amber-600 via-orange-700 to-amber-800",
    bgGradient: "from-amber-950 via-orange-950 to-stone-900",
    glowColor: "amber",
  },
  {
    date: new Date(2025, 1, 10),
    name: "Teddy Day",
    emoji: "🧸",
    gradient: "from-amber-400 via-orange-400 to-rose-400",
    bgGradient: "from-amber-900 via-orange-900 to-rose-900",
    glowColor: "orange",
  },
  {
    date: new Date(2025, 1, 11),
    name: "Promise Day",
    emoji: "⭐",
    gradient: "from-purple-500 via-violet-500 to-pink-500",
    bgGradient: "from-indigo-950 via-purple-950 to-pink-950",
    glowColor: "purple",
  },
  {
    date: new Date(2025, 1, 12),
    name: "Hug Day",
    emoji: "🫂",
    gradient: "from-orange-400 via-rose-500 to-pink-500",
    bgGradient: "from-orange-900 via-rose-900 to-pink-900",
    glowColor: "orange",
  },
  {
    date: new Date(2025, 1, 13),
    name: "Kiss Day",
    emoji: "💋",
    gradient: "from-red-500 via-pink-500 to-rose-500",
    bgGradient: "from-red-950 via-pink-950 to-rose-950",
    glowColor: "red",
  },
  {
    date: new Date(2025, 1, 14),
    name: "Valentine's Day",
    emoji: "💕",
    gradient: "from-red-500 via-pink-600 to-rose-600",
    bgGradient: "from-red-950 via-pink-950 to-rose-950",
    glowColor: "pink",
  },
];

// Personalized Messages for Puntuu
const personalizedMessages = {
  rose: `I was looking at this massive field of roses, Puntuu, and all I could think about was how even this isn't enough to show you what you mean to me. People give roses because they're beautiful, but roses eventually fade. My love for you just keeps growing, deeper and stronger every single day. I don't just want to give you flowers. I want to give you a life where you never have to wonder if you're loved. You are my constant bloom, the brightest color in my world, and I am so incredibly lucky that I get to call you mine. I love you 😙❤️`,
  
  propose: `Puntuu, I've been playing this moment over in my head a thousand times. I chose this sunflower specifically because of how it lives it spends its whole life turning its face toward the sun. That's exactly what my heart does with you. You are my light, my warmth, and my reason to keep moving forward. I'm not just asking you to be my girl for a day or a year I'm asking you to be my partner in everything. Through the messy hair mornings, the loud laughs, and the quiet, hard days, I want it all. I want you. So, Puntuu... will you walk this journey with me forever? I love you 😙❤️`,
  
  chocolate: `You know what, Puntuu? Life is like a box of chocolates—unpredictable and sometimes bitter. But with you, every moment is the sweetest flavor. You're the one who makes everything taste better, feel warmer, and seem brighter. I could offer you all the chocolates in the world, but nothing will ever be as sweet as your smile. You're my favorite kind of sweetness—the kind that never gets old. I love you 😙❤️`,
  
  teddy: `I know I can't always be there to pull you close when you're tired or having a rough day, and honestly, that's the hardest part for me. So, I'm sending these teddies to keep your bed warm and to give you a place to rest your head when I'm not around. But just so we're clear, none of them are as soft as you, and none of them can give hugs as good as mine. Every time you see them, I want you to imagine me right there with you, holding you tight and telling you that everything is going to be okay. You're my precious Puntuu, always. I love you 😙❤️`,
  
  promise: `Puntuu, I'm not going to make you fake promises that people just say because they sound good. I'm making these because I mean them from the bottom of my soul. I promise to never let go of your hand when things get scary. I promise to listen to you, even when you aren't saying anything at all. I promise to protect your smile like it's the most valuable thing in the world, because to me, it is. Most importantly, I promise that no matter how much time passes, I will never stop trying to win your heart. You'll never have to doubt where you stand with me. You are my first thought, my last wish, and my biggest priority. I love you 😙❤️`,
  
  hug: `You know that feeling when you finally get home after a long, exhausting day and you can just finally breathe? That is exactly what your hug feels like to me, Puntuu. It's my favorite place in the world. When I'm holding you, the rest of the world just disappears. The noise stops, the stress fades, and it's just us. I'm sending you this digital tight hug, but I'm counting down the seconds until I can feel your heart beating against mine for real. You're my safety, my peace, and my home. I love you 😙❤️`,
  
  kiss: `There's a specific kind of magic that happens when I kiss you, Puntuu. It's like time just glitches and stops moving. In that moment, nothing else matters not the past, not the future, just the feeling of being completely connected to you. It's the way you make me feel alive and calm all at the same time. Every kiss we've shared is tucked away in my heart like a treasure even tough it's just in calls😢 it's so addicted to the way i am with you and I never want to spend a single day without your magic in my life. I love you 😙❤️`,

  finalLetter: `My Sweetest Puntuu,

I was sitting here thinking about us, and I realized that we were just strangers once, passing through the same world and living separate stories. I don't know how it happened, but you've become the first thought in my mornings and the silent prayer in my nights. Honestly, if God handed me a book where anything I wrote became mine, I'd still cover every inch, every line, and every margin with your name 📖🖋️. You're everything I ever hoped for, shaped perfectly in a world that can be so messy.

My chest actually pains when I can't tell you how badly I love you. I want you to know that without a blink of an eye, and without thinking twice, I will always choose you over anyone else even over myself 💖. I want to hold you tight while we play, share our clothes, and listen to the music you like. I don't need anyone else because everything I was searching for, I found in you 🏠✨.

I have this strong urge to kneel down before you and tell you that I love you more than anything. I want to marry you one day and build a home full of love with no shouting and no loud sounds. I want our children to grow up seeing a father who kisses their mom every second and loves her completely. I'll be the one who sits with you when you miss your parents, and the one who holds your hand through birth. I want to be the one who feeds you with my own hand and kisses you when you don't feel like doing anything 🫂💓.

I promise to be your shelter on rainy days and your loudest cheer on quiet ones. I will never raise my voice at you, and I'll buy you flowers for no reason at all 🌸. You can call me at 2:00 AM and I will always answer. Even if you try to push me away, I will never let you go because you're my priority.

I will know all your worries and make them mine so nothing ever cracks your fragile heart. We've already done the hardest part, which was finding each other among millions of people now let's do the easiest thing, and never lose each other 🤝🌎.

I love you more than any amount of distance and more than any fight we will ever have. You are my sweetest home, Puntuu. I am yours completely, honestly, and forever ♾️❤️.

I Love You.`,
};

// Photo Gallery Data with your uploaded images
const memoriesData = [
  { url: memory1, caption: "My favorite view - You on my screen 💕" },
  { url: memory2, caption: "Even eating makes you look cute 😍" },
  { url: memory3, caption: "Sleepy Puntuu is the cutest 💤" },
  { url: memory4, caption: "Peaceful dreams, my love 🌙" },
  { url: memory5, caption: "That smile that makes my day ✨" },
  { url: memory6, caption: "Missing you every second 💕" },
  { url: memory7, caption: "Beautiful like a flower garden 🌺" },
  { url: memory8, caption: "That innocent smile I fell for 🥰" },
  { url: memory9, caption: "My gorgeous girl 💖" },
  { url: memory10, caption: "So proud of my graduate! 🎓" },
  { url: memory11, caption: "Traditional beauty that melts my heart ❤️" },
];

// Glassmorphism Container - Fixed to prevent overflow
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl ${className}`}
    style={{
      overflow: 'hidden',
      maxWidth: '100%',
      width: '100%',
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {/* Glass shine effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
    <div className="relative z-10 overflow-hidden">{children}</div>
  </motion.div>
);

// Rose Petals Rain
const RosePetalsRain = () => {
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
      {[...Array(25)].map((_, i) => (
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
            rotate: 720,
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <div className="w-4 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full transform rotate-45 opacity-60 blur-[0.5px]" />
        </motion.div>
      ))}
    </div>
  );
};

// Day Content Components
const RoseDayContent = () => {
  const [showMessage, setShowMessage] = useState(false);
  
  return (
    <div className="space-y-8">
      <ScratchCard 
        coverText="Scratch to reveal my gift" 
        coverEmoji="🌹"
        onReveal={() => setShowMessage(true)}
      >
        <div className="py-6">
          {/* 10,000 Roses Bouquet */}
          <RoseBouquet targetCount={10000} duration={6000} />
        </div>
      </ScratchCard>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <LongPressSecret secretMessage="You're my forever rose, Puntuu! 🌹">
                <h3 className="text-2xl font-serif text-rose-300 mb-4 text-center">
                  For My Puntuu 🌹
                </h3>
              </LongPressSecret>
              <p className="text-white/90 font-serif leading-relaxed text-justify">
                {personalizedMessages.rose}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProposeDayContent = () => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="space-y-8">
      <ScratchCard 
        coverText="Scratch to see my proposal" 
        coverEmoji="🌻"
        onReveal={() => setRevealed(true)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6 py-6"
        >
          {/* Sunflower Animation */}
          <motion.div
            className="text-9xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌻
          </motion.div>
          
          <p className="text-amber-300 text-xl font-serif">
            Like a sunflower that always turns towards the sun...
          </p>
          <p className="text-white text-2xl font-serif">
            My heart always turns to you, Puntuu
          </p>
        </motion.div>
      </ScratchCard>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Proposal Photo */}
            <GlassCard className="p-6 text-center overflow-hidden">
              <motion.div
                className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.img 
                  src={proposalPhoto}
                  alt="Proposal moment"
                  className="w-full h-full object-cover"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <motion.div 
                  className="absolute inset-0 border-4 border-amber-400/50 rounded-2xl"
                  animate={{ boxShadow: ["0 0 0 0 rgba(251, 191, 36, 0.4)", "0 0 20px 10px rgba(251, 191, 36, 0.2)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <p className="text-amber-200 text-sm italic">
                Forever turning towards you, my sun 🌻
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <LongPressSecret secretMessage="I choose you, today and always! 💕">
                <h3 className="text-2xl font-serif text-amber-300 mb-4 text-center">
                  My Proposal to You 🌻
                </h3>
              </LongPressSecret>
              <p className="text-white/90 font-serif leading-relaxed text-justify">
                {personalizedMessages.propose}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChocolateDayContent = () => {
  const [opened, setOpened] = useState(false);
  const [selectedChocolate, setSelectedChocolate] = useState<number | null>(null);
  const [viewingChocolate, setViewingChocolate] = useState<typeof chocolates[0] | null>(null);
  
  // Real chocolate images - Dairy Milk, Fruits & Nuts, and more
  const chocolates = [
    { name: "Dairy Milk", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400", desc: "Smooth & Creamy - Just like my love for you" },
    { name: "Fruits & Nuts", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400", desc: "Crunchy Delight - Our love has many flavors" },
    { name: "Dark Chocolate", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400", desc: "Rich & Intense - Deep like my feelings" },
    { name: "Milk Chocolate", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400", desc: "Classic Love - Timeless, just like us" },
    { name: "Truffle", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400", desc: "Melt in Mouth - You melt my heart" },
    { name: "Hazelnut", image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400", desc: "Nutty Bliss - Crazy in love with you" },
    { name: "Caramel", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400", desc: "Sweet Swirl - Sweet like your smile" },
    { name: "White Choco", image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=400", desc: "Pure Vanilla - Pure like your heart" },
    { name: "Ferrero", image: "https://images.unsplash.com/photo-1582176604856-e824b4736522?w=400", desc: "Golden Luxury - You're my treasure" },
    { name: "Praline", image: "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=400", desc: "Elegant Taste - Classy like you" },
    { name: "Almond Bar", image: "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=400", desc: "Crunchy Joy - Joy you bring me" },
    { name: "Heart Box", image: "https://images.unsplash.com/photo-1526081347589-7fa3cb41966e?w=400", desc: "Love Special - Made for my Puntuu" },
  ];

  const handleChocolateClick = (index: number) => {
    setSelectedChocolate(index);
    setViewingChocolate(chocolates[index]);
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  };
  
  // Chocolate Modal
  const ChocolateModal = () => {
    if (!viewingChocolate) return null;
    
    return ReactDOM.createPortal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(20px)',
          padding: '20px',
        }}
        onClick={() => setViewingChocolate(null)}
      >
        {/* Floating chocolates */}
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              fontSize: '2rem',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🍫', '🍬', '💕', '✨', '🍭'][i % 5]}
          </motion.span>
        ))}

        <motion.div
          initial={{ scale: 0.5, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 100 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, rgba(120,70,30,0.3) 0%, rgba(80,40,20,0.3) 100%)',
            borderRadius: '24px',
            padding: '24px',
            maxWidth: '380px',
            width: '100%',
            border: '1px solid rgba(255,200,100,0.3)',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <motion.button
            onClick={() => setViewingChocolate(null)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              padding: '8px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              zIndex: 10,
            }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>

          {/* Big Image */}
          <motion.div
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            animate={{ 
              boxShadow: [
                '0 20px 60px rgba(0,0,0,0.5)',
                '0 20px 80px rgba(180,100,30,0.3)',
                '0 20px 60px rgba(0,0,0,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src={viewingChocolate.image}
              alt={viewingChocolate.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </motion.div>

          {/* Emoji */}
          <motion.div
            style={{ textAlign: 'center', marginBottom: '12px' }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span style={{ fontSize: '3rem' }}>🍫</span>
          </motion.div>

          {/* Name */}
          <h3 style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontFamily: 'serif',
            color: '#DEB887',
            marginBottom: '12px',
          }}>
            {viewingChocolate.name}
          </h3>

          {/* Description */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '16px',
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'serif',
              fontSize: '1rem',
              lineHeight: 1.6,
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              "{viewingChocolate.desc}"
            </p>
          </div>

          {/* Hearts */}
          <motion.div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '8px' }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ 
                  scale: [1, 1.3, 1],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{ fontSize: '1.5rem' }}
              >
                💕
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>,
      document.body
    );
  };
  
  return (
    <div className="space-y-6">
      <ScratchCard 
        coverText="Scratch to open the chocolate box" 
        coverEmoji="🎁"
        onReveal={() => setOpened(true)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4 py-4"
        >
          <h3 className="text-xl font-serif text-amber-300">🍫 My Chocolate Collection For You 🍫</h3>
          <p className="text-amber-200/70 text-xs">Tap any chocolate to see it bigger! 💕</p>
          
          {/* Chocolate Gallery Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-md mx-auto px-2">
            {chocolates.map((choco, i) => (
              <motion.div
                key={i}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 ${
                  selectedChocolate === i ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-amber-800/50'
                }`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChocolateClick(i)}
              >
                <div className="aspect-square">
                  <img 
                    src={choco.image} 
                    alt={choco.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-1.5 text-center">
                  <p className="text-[10px] sm:text-xs font-bold text-amber-200 truncate">{choco.name}</p>
                </div>
                
                {/* Selection glow */}
                {selectedChocolate === i && (
                  <motion.div
                    className="absolute inset-0 bg-amber-400/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ScratchCard>

      {/* Floating chocolates decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`float-choco-${i}`}
            className="absolute text-3xl"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {["🍫", "🍬", "🍭", "🧁", "🍰", "🎂", "🍪", "🍩"][i]}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-6">
              <LongPressSecret secretMessage="You're sweeter than all chocolates! 🍫">
                <h3 className="text-2xl font-serif text-amber-300 mb-4 text-center">
                  Sweet Like You 🍫
                </h3>
              </LongPressSecret>
              <p className="text-white/90 font-serif leading-relaxed text-justify">
                {personalizedMessages.chocolate}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chocolate Modal */}
      <AnimatePresence>
        {viewingChocolate && <ChocolateModal />}
      </AnimatePresence>
    </div>
  );
};

const TeddyDayContent = () => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="space-y-8">
      <ScratchCard 
        coverText="Scratch for teddy surprise" 
        coverEmoji="🧸"
        onReveal={() => setRevealed(true)}
      >
        <TeddyGallery />
      </ScratchCard>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-6">
              <LongPressSecret secretMessage="*Longest teddy hug ever!* 🤗">
                <h3 className="text-2xl font-serif text-amber-300 mb-4 text-center">
                  For My Cuddly Puntuu 🧸
                </h3>
              </LongPressSecret>
              <p className="text-white/90 font-serif leading-relaxed text-justify">
                {personalizedMessages.teddy}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PromiseDayContent = () => {
  return (
    <div className="space-y-8">
      {/* Starry night background */}
      <div className="relative bg-gradient-to-b from-indigo-950 to-purple-950 rounded-3xl p-6 overflow-hidden">
        <FallingStars />
      </div>
      
      {/* Candle Ceremony */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-serif text-purple-300 mb-4 text-center">
          Light a Candle for Our Love ✨
        </h3>
        <CandleCeremony />
      </GlassCard>

      {/* Promise Message */}
      <GlassCard className="p-6">
        <LongPressSecret secretMessage="Every promise is sealed with my love! 💜">
          <h3 className="text-2xl font-serif text-purple-300 mb-4 text-center">
            My Sacred Promises 🤝
          </h3>
        </LongPressSecret>
        <p className="text-white/90 font-serif leading-relaxed text-justify">
          {personalizedMessages.promise}
        </p>
      </GlassCard>
    </div>
  );
};

const HugDayContent = () => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="space-y-8">
      <ScratchCard 
        coverText="Scratch for a warm hug" 
        coverEmoji="🫂"
        onReveal={() => setRevealed(true)}
      >
        <CinematicHug />
      </ScratchCard>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-6">
              <LongPressSecret secretMessage="Infinite hugs coming your way! 💕">
                <h3 className="text-2xl font-serif text-orange-300 mb-4 text-center">
                  My Arms Are Your Home 🤗
                </h3>
              </LongPressSecret>
              <p className="text-white/90 font-serif leading-relaxed text-justify">
                {personalizedMessages.hug}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KissDayContent = () => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="space-y-8">
      <ScratchCard 
        coverText="Scratch for a magical kiss" 
        coverEmoji="💋"
        onReveal={() => setRevealed(true)}
      >
        <CinematicKiss />
      </ScratchCard>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-6">
              <LongPressSecret secretMessage="Every kiss with you is magical! 💋">
                <h3 className="text-2xl font-serif text-red-300 mb-4 text-center">
                  Where Magic Happens 💋
                </h3>
              </LongPressSecret>
              <p className="text-white/90 font-serif leading-relaxed text-justify">
                {personalizedMessages.kiss}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ValentineDayContent = () => {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [activeSection, setActiveSection] = useState<'gallery' | 'letters' | 'letter' | 'game' | 'quiz' | 'wishes' | 'journey' | 'soulmate' | 'missyou' | 'photobooth' | 'openwhen' | 'hearts' | 'comfort' | 'music' | 'dreams' | 'growth' | 'future' | 'decide' | 'coupons' | 'private' | 'recordings' | 'birthday' | 'bouquets' | 'fights' | 'languages' | 'proposal' | 'period' | 'karaoke' | 'health' | 'food' | 'compliments' | 'jokes' | 'truthordare' | 'affirmations' | 'mood' | 'selfcare' | 'naughty' | 'treats' | 'pinterest' | 'escape' | 'airhostess' | 'matchgame'>('gallery');
  const [journeyPassword, setJourneyPassword] = useState('');
  const [journeyUnlocked, setJourneyUnlocked] = useState(false);
  
  useEffect(() => {
    setTriggerConfetti(true);
    const timer = setTimeout(() => setTriggerConfetti(false), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full overflow-hidden">
      {/* Confetti */}
      <ConfettiCannon trigger={triggerConfetti} />
      
      {/* Hero */}
      <GlassCard className="p-4 sm:p-8 text-center">
        <motion.div
          className="text-5xl sm:text-8xl mb-2 sm:mb-4"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>
        <h2 className="text-xl sm:text-4xl font-serif text-pink-300 mb-1 sm:mb-2 break-words">
          Happy Valentine's Day
        </h2>
        <p className="text-lg sm:text-3xl font-serif text-white break-words">
          My Dearest Puntuu 💝
        </p>
      </GlassCard>

      {/* Navigation Tabs - Four rows for all sections */}
      <div className="space-y-2">
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'gallery', label: 'Memories', emoji: '📸' },
            { key: 'letters', label: 'Letters', emoji: '💌' },
            { key: 'openwhen', label: 'Open When', emoji: '📬' },
            { key: 'quiz', label: 'Quiz', emoji: '💕' },
            { key: 'hearts', label: 'Hearts', emoji: '💖' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[9px] sm:text-xs whitespace-nowrap transition-all ${
                activeSection === tab.key 
                  ? "bg-white/30 text-white shadow-lg" 
                  : "bg-white/10 text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'comfort', label: 'Comfort', emoji: '🆘' },
            { key: 'music', label: 'Music', emoji: '🎵' },
            { key: 'dreams', label: 'Dreams', emoji: '🌟' },
            { key: 'growth', label: 'Growth', emoji: '🌱' },
            { key: 'future', label: 'Future', emoji: '📍' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[9px] sm:text-xs whitespace-nowrap transition-all ${
                activeSection === tab.key 
                  ? "bg-white/30 text-white shadow-lg" 
                  : "bg-white/10 text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'decide', label: 'Decide', emoji: '🎲' },
            { key: 'coupons', label: 'Coupons', emoji: '🎫' },
            { key: 'game', label: 'Dress Up', emoji: '👗' },
            { key: 'missyou', label: 'Miss You', emoji: '🥺' },
            { key: 'photobooth', label: 'Photos', emoji: '📷' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[9px] sm:text-xs whitespace-nowrap transition-all ${
                activeSection === tab.key 
                  ? "bg-white/30 text-white shadow-lg" 
                  : "bg-white/10 text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'wishes', label: 'Wishes', emoji: '✨' },
            { key: 'journey', label: 'Journey', emoji: '⏱️' },
            { key: 'soulmate', label: 'Soulmate', emoji: '💫' },
            { key: 'letter', label: 'Final Letter', emoji: '❤️' },
            { key: 'private', label: 'Private', emoji: '🔥' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[9px] sm:text-xs whitespace-nowrap transition-all ${
                activeSection === tab.key 
                  ? "bg-white/30 text-white shadow-lg" 
                  : "bg-white/10 text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'recordings', label: 'Voice/Video', emoji: '🎤' },
            { key: 'birthday', label: 'Birthday', emoji: '🎂' },
            { key: 'bouquets', label: 'Bouquets', emoji: '💐' },
            { key: 'period', label: 'Period Care', emoji: '🌸' },
            { key: 'fights', label: 'When We Fight', emoji: '🌧️' },
            { key: 'languages', label: 'I Love You', emoji: '🌍' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[9px] sm:text-xs whitespace-nowrap transition-all ${
                activeSection === tab.key 
                  ? "bg-white/30 text-white shadow-lg" 
                  : "bg-white/10 text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'health', label: 'Health', emoji: '🩺' },
            { key: 'food', label: 'Food Guide', emoji: '🥗' },
            { key: 'compliments', label: 'Compliments', emoji: '💕' },
            { key: 'jokes', label: 'Jokes', emoji: '😂' },
            { key: 'truthordare', label: 'Truth/Dare', emoji: '🎯' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[9px] sm:text-xs whitespace-nowrap transition-all ${
                activeSection === tab.key 
                  ? "bg-white/30 text-white shadow-lg" 
                  : "bg-white/10 text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'affirmations', label: 'Affirm', emoji: '✨' },
            { key: 'mood', label: 'Mood', emoji: '💭' },
            { key: 'selfcare', label: 'Self-Care', emoji: '🧖‍♀️' },
            { key: 'treats', label: 'Treats', emoji: '🍰' },
            { key: 'escape', label: 'Escape', emoji: '🔐' },
            { key: 'airhostess', label: 'Airhostess', emoji: '✈️' },
            { key: 'matchgame', label: 'Match Game', emoji: '🃏' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium text-[9px] sm:text-xs whitespace-nowrap transition-all ${
                activeSection === tab.key 
                  ? "bg-white/30 text-white shadow-lg" 
                  : "bg-white/10 text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1">
          {[
            { key: 'pinterest', label: 'Our Board', emoji: '📌' },
            { key: 'naughty', label: 'Naughty Q', emoji: '🔥' },
            { key: 'karaoke', label: 'Karaoke', emoji: '🎤' },
            { key: 'proposal', label: 'Be My Valentine?', emoji: '💕' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as typeof activeSection)}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap transition-all bg-gradient-to-r from-pink-500 to-rose-500 ${
                activeSection === tab.key 
                  ? "ring-2 ring-white shadow-lg shadow-pink-500/50" 
                  : "opacity-90"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-serif text-pink-300 mb-4 text-center">
                Our Beautiful Memories 📸
              </h3>
              <PhotoGallery photos={memoriesData} />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'letters' && (
          <motion.div
            key="letters"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-serif text-pink-300 mb-4 text-center">
                10 Letters for You 💌
              </h3>
              <LetterGallery />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-serif text-pink-300 mb-4 text-center">
                My Final Love Letter ❤️
              </h3>
              <div className="bg-gradient-to-br from-amber-50/10 to-rose-50/10 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 font-serif leading-relaxed whitespace-pre-line text-sm">
                  {personalizedMessages.finalLetter}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <LoveQuiz />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'wishes' && (
          <motion.div
            key="wishes"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <WishingWell />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'journey' && (
          <motion.div
            key="journey"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4 sm:p-6">
              {!journeyUnlocked ? (
                <div className="text-center space-y-4">
                  <motion.div
                    className="text-4xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔐
                  </motion.div>
                  <h3 className="text-lg font-serif text-rose-300">Our Journey is Protected</h3>
                  <p className="text-white/60 text-sm">Enter password to unlock</p>
                  <input
                    type="password"
                    value={journeyPassword}
                    onChange={(e) => setJourneyPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full max-w-xs mx-auto px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-center"
                  />
                  <motion.button
                    onClick={() => {
                      if (journeyPassword === 'Anjalisajan') {
                        setJourneyUnlocked(true);
                      } else {
                        alert('Wrong password! 💕');
                      }
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Unlock 💕
                  </motion.button>
                </div>
              ) : (
                <RelationshipCountdown />
              )}
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'soulmate' && (
          <motion.div
            key="soulmate"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <motion.h3
                    className="text-lg sm:text-xl md:text-2xl font-serif text-rose-300 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    I Want to Know You
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  </motion.h3>
                  <p className="text-white/50 text-xs sm:text-sm mt-1">A letter to my soulmate 💫</p>
                </div>
                
                <motion.div 
                  className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-white/90 font-serif leading-relaxed sm:leading-loose text-sm sm:text-base md:text-lg whitespace-pre-line">
{`I want to know your favourite flower and your favourite season. I want to know about your family and all about your childhood. I want to know your colour and your favourite movie, your favourite music, and your favourite food.

I want to know what keeps you up at night and what makes you angry. I want to know what makes you happiest and what you love to do. I want to know your dreams and desires, your goals and aspirations. I want to know what made you.

I want to know you.

I want to know the small, hidden pieces of you, the parts you don't show to anyone. How your heart beats when you're afraid, the little joys that make you smile, the thoughts you never share.

I wonder what comforts you when the world feels too heavy, what unsettles you when no one is watching. I want to understand all of you as if cradling your soul without touching it.

I want to know the ways you ache, the ways you hope, the tiny corners of yourself you keep locked away, and still love you fully, completely, for everything you are, in the way no one ever has.`}
                  </p>
                  
                  <motion.p 
                    className="text-right text-rose-400 font-serif italic text-base sm:text-lg md:text-xl mt-4 sm:mt-6"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    I love you so much 😙❤️
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  className="text-center pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                    <span className="text-white/60 text-sm sm:text-base font-serif">Forever Yours, Puntuu</span>
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  </motion.div>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <DressUpGame />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'missyou' && (
          <motion.div
            key="missyou"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <WhenIMissYou />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'photobooth' && (
          <motion.div
            key="photobooth"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-6">
              <PhotoBooth />
            </GlassCard>
          </motion.div>
        )}

        {/* New Romantic Sections */}
        {activeSection === 'openwhen' && (
          <motion.div
            key="openwhen"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <OpenWhenLetters />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'hearts' && (
          <motion.div
            key="hearts"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <DigitalJarOfHearts />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'comfort' && (
          <motion.div
            key="comfort"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <EmergencyComfortButton />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'music' && (
          <motion.div
            key="music"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <CuratedSoundscapes />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'dreams' && (
          <motion.div
            key="dreams"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <SharedDreamsBucketList />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'growth' && (
          <motion.div
            key="growth"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <GrowthArchive />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'future' && (
          <motion.div
            key="future"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <FutureMaps />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'decide' && (
          <motion.div
            key="decide"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <DecisionMaker />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'coupons' && (
          <motion.div
            key="coupons"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <PermissionSlips />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'private' && (
          <motion.div
            key="private"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <IntimateSection />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'recordings' && (
          <motion.div
            key="recordings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <VoiceVideoMessages />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'birthday' && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <BirthdayCelebration />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'bouquets' && (
          <motion.div
            key="bouquets"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <FlowerBouquetGallery />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'fights' && (
          <motion.div
            key="fights"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <WhenWeFight />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'languages' && (
          <motion.div
            key="languages"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <ILoveYouLanguages />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <ValentineProposal />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'period' && (
          <motion.div
            key="period"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <PeriodTracker />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'karaoke' && (
          <motion.div
            key="karaoke"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <KaraokeSection />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'health' && (
          <motion.div
            key="health"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <HealthSection />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'food' && (
          <motion.div
            key="food"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <FoodNutritionGuide />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'compliments' && (
          <motion.div
            key="compliments"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <ComplimentsSection />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'jokes' && (
          <motion.div
            key="jokes"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <JokesSection />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'truthordare' && (
          <motion.div
            key="truthordare"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <TruthOrDare />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'affirmations' && (
          <motion.div
            key="affirmations"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <DailyAffirmations />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'mood' && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <MoodTracker />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'selfcare' && (
          <motion.div
            key="selfcare"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <SelfCareSection />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'naughty' && (
          <motion.div
            key="naughty"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <NaughtyQuestions />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'treats' && (
          <motion.div
            key="treats"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <VirtualTreats />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'pinterest' && (
          <motion.div
            key="pinterest"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <PrivatePinterest />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'escape' && (
          <motion.div
            key="escape"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <EscapeRoom />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'airhostess' && (
          <motion.div
            key="airhostess"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <AirHostessRoleplay />
            </GlassCard>
          </motion.div>
        )}

        {activeSection === 'matchgame' && (
          <motion.div
            key="matchgame"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GlassCard className="p-4">
              <MemoryMatchGame />
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Message */}
      <GlassCard className="p-8 text-center">
        <LongPressSecret secretMessage="You are my forever Valentine! 💕">
          <motion.p
            className="text-pink-200 font-serif text-xl italic"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "You are my today and all of my tomorrows, Puntuu"
          </motion.p>
        </LongPressSecret>
      </GlassCard>
    </div>
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
const LockedDay = ({ day }: { day: typeof valentineDays[0] }) => (
  <GlassCard className="p-8 text-center">
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Lock className="w-16 h-16 mx-auto text-white/50 mb-4" />
    </motion.div>
    <h2 className="text-2xl font-serif text-white/80 mb-4">
      {day.name} is Coming Soon
    </h2>
    <CountdownTimer targetDate={day.date} label={day.name} />
    <motion.p
      className="text-white/50 italic font-serif mt-4"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      "Good things come to those who wait, Puntuu..."
    </motion.p>
  </GlassCard>
);

// Day Navigation Card
const DayNavCard = ({ 
  day, 
  isUnlocked, 
  isActive, 
  onClick 
}: { 
  day: typeof valentineDays[0];
  isUnlocked: boolean;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    disabled={!isUnlocked}
    className={`relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all min-w-[56px] sm:min-w-[68px] backdrop-blur-md flex-shrink-0 ${
      isUnlocked 
        ? `bg-gradient-to-br ${day.gradient} text-white shadow-lg hover:shadow-xl cursor-pointer` 
        : "bg-white/10 text-white/40 cursor-not-allowed"
    } ${isActive ? "ring-2 ring-white/60 scale-105 sm:scale-110" : ""}`}
    whileHover={isUnlocked ? { scale: 1.1 } : {}}
    whileTap={isUnlocked ? { scale: 0.95 } : {}}
  >
    <span className="text-xl sm:text-2xl">{isUnlocked ? day.emoji : "🔒"}</span>
    <span className="text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium opacity-90">
      {day.name.split(" ")[0]}
    </span>
    {isActive && (
      <motion.div
        className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"
        layoutId="activeIndicator"
      />
    )}
  </motion.button>
);

// Main Component
const Index = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showLanding, setShowLanding] = useState(true);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isDayUnlocked = (date: Date) => {
    if (previewMode) return true;
    return today >= date;
  };
  
  useEffect(() => {
    let latestUnlocked = 0;
    valentineDays.forEach((day, index) => {
      if (isDayUnlocked(day.date)) {
        latestUnlocked = index;
      }
    });
    setCurrentDay(latestUnlocked);
  }, [previewMode]);
  
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

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentDay > 0) {
      const prevIndex = currentDay - 1;
      if (isDayUnlocked(valentineDays[prevIndex].date)) {
        setCurrentDay(prevIndex);
      }
    } else if (direction === 'next' && currentDay < valentineDays.length - 1) {
      const nextIndex = currentDay + 1;
      if (isDayUnlocked(valentineDays[nextIndex].date)) {
        setCurrentDay(nextIndex);
      }
    }
  };
  
  const currentDayData = valentineDays[currentDay];
  const CurrentDayContent = dayContents[currentDay];
  const isCurrentDayUnlocked = isDayUnlocked(currentDayData.date);

  // Show landing page first
  if (showLanding) {
    return <NepaliPoemLanding onEnter={() => setShowLanding(false)} />;
  }
  
  return (
    <div 
      className={`relative bg-gradient-to-br ${currentDayData.bgGradient} transition-all duration-1000`}
      style={{
        minHeight: '100dvh',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Full-screen gradient overlay to prevent white gaps */}
      <div 
        className={`fixed bg-gradient-to-br ${currentDayData.bgGradient}`}
        style={{ 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw', 
          height: '100vh',
          minHeight: '100dvh',
          zIndex: -10,
        }}
      />
      
      {/* Global Effects */}
      <HeartCursor />
      <ParallaxStars />
      {currentDay === 0 && <RosePetalsRain />}
      {currentDay === 4 && <Fireflies />}
      
      {/* Easter Eggs */}
      <ShakeHeartsExplosion />
      <KonamiSecret />
      <MidnightSurprise />
      
      {/* Background Music */}
      <BackgroundMusic autoPlay={true} />
      
      {/* Header */}
      <header 
        className="relative z-20 p-4 flex items-center justify-between"
        onClick={handleHeaderTap}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </motion.div>
          <span className="font-serif text-pink-300 text-lg">For Puntuu 💕</span>
        </div>
        
        {previewMode && (
          <span className="text-xs bg-purple-500/80 text-white px-3 py-1 rounded-full backdrop-blur-sm">
            Preview Mode ✨
          </span>
        )}
      </header>
      
      {/* Day Navigation - Responsive scroll */}
      <nav className="relative z-20 px-2 sm:px-4 pb-4">
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide sm:justify-center">
          {valentineDays.map((day, index) => (
            <DayNavCard
              key={index}
              day={day}
              isUnlocked={isDayUnlocked(day.date)}
              isActive={currentDay === index}
              onClick={() => isDayUnlocked(day.date) && setCurrentDay(index)}
            />
          ))}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="relative z-10 px-3 sm:px-4 py-4 sm:py-6 pb-24 sm:pb-28 w-full max-w-full overflow-x-hidden">
        {/* Day Title */}
        <motion.div 
          className="text-center mb-4 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          key={currentDay}
        >
          <motion.span
            className="text-4xl sm:text-6xl block mb-1 sm:mb-2 drop-shadow-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {currentDayData.emoji}
          </motion.span>
          <h1 className={`text-2xl sm:text-4xl font-serif bg-gradient-to-r ${currentDayData.gradient} bg-clip-text text-transparent drop-shadow-lg`}>
            {currentDayData.name}
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 sm:mt-2">
            {currentDayData.date.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </motion.div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <motion.button
            onClick={() => navigateDay('prev')}
            className={`p-3 rounded-full backdrop-blur-md ${
              currentDay > 0 && isDayUnlocked(valentineDays[currentDay - 1]?.date)
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentDay === 0 || !isDayUnlocked(valentineDays[currentDay - 1]?.date)}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Content */}
          <div className="flex-1 mx-2 sm:mx-4 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDay}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-lg mx-auto overflow-hidden"
              >
                {isCurrentDayUnlocked ? (
                  <CurrentDayContent />
                ) : (
                  <LockedDay day={currentDayData} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={() => navigateDay('next')}
            className={`p-3 rounded-full backdrop-blur-md ${
              currentDay < valentineDays.length - 1 && isDayUnlocked(valentineDays[currentDay + 1]?.date)
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentDay === valentineDays.length - 1 || !isDayUnlocked(valentineDays[currentDay + 1]?.date)}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </main>
      
      {/* Footer */}
      <footer 
        className="fixed bottom-0 left-0 right-0 z-20 text-center bg-gradient-to-t from-black/70 via-black/40 to-transparent"
        style={{ 
          paddingTop: '16px',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        }}
      >
        <p className="text-pink-300/80 text-sm font-serif">
          Made with 💕 for my Puntuu
        </p>
        <p className="text-white/40 text-xs mt-1">
          Shake phone for hearts • Konami: ↑↑↓↓←→←→BA
        </p>
      </footer>
    </div>
  );
};

export default Index;
