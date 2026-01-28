import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Import all Extra sections
import { LoveQuiz } from "@/components/valentine/LoveQuiz";
import { DressUpGame } from "@/components/valentine/DressUpGame";
import { WhenIMissYou } from "@/components/valentine/WhenIMissYou";
import { PhotoBooth } from "@/components/valentine/PhotoBooth";
import { SharedDreamsBucketList } from "@/components/valentine/SharedDreamsBucketList";
import { CuratedSoundscapes } from "@/components/valentine/CuratedSoundscapes";
import { DigitalJarOfHearts } from "@/components/valentine/DigitalJarOfHearts";
import { EmergencyComfortButton } from "@/components/valentine/EmergencyComfortButton";
import { GrowthArchive } from "@/components/valentine/GrowthArchive";
import { FutureMaps } from "@/components/valentine/FutureMaps";
import { DecisionMaker } from "@/components/valentine/DecisionMaker";
import { PermissionSlips } from "@/components/valentine/PermissionSlips";
import { BirthdayCelebration } from "@/components/valentine/BirthdayCelebration";
import { FlowerBouquetGallery } from "@/components/valentine/FlowerBouquetGallery";
import { ILoveYouLanguages } from "@/components/valentine/ILoveYouLanguages";
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
import { NepaliPoemsGallery } from "@/components/valentine/NepaliPoemsGallery";
import { HeartCursor } from "@/components/valentine/HeartCursor";
import { ParallaxStars } from "@/components/valentine/ParallaxStars";

type SectionKey = 'quiz' | 'game' | 'missyou' | 'photobooth' | 'dreams' | 'music' | 'hearts' | 
  'comfort' | 'growth' | 'future' | 'decide' | 'coupons' | 'birthday' | 'bouquets' | 'languages' |
  'period' | 'karaoke' | 'health' | 'food' | 'compliments' | 'jokes' | 'truthordare' | 
  'affirmations' | 'mood' | 'selfcare' | 'treats' | 'pinterest' | 'escape' | 'matchgame' |
  'wouldyourather' | 'poems' | 'naughty' | 'airhostess';

// Glassmorphism Container
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl ${className}`}
    style={{ overflow: 'hidden', maxWidth: '100%', width: '100%' }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
    <div className="relative z-10 overflow-hidden">{children}</div>
  </motion.div>
);

const sections = [
  // Roleplays
  { key: 'airhostess', label: 'Airhostess', emoji: '✈️', category: 'roleplay' },
  
  // Games & Fun
  { key: 'quiz', label: 'Love Quiz', emoji: '❓', category: 'games' },
  { key: 'game', label: 'Dress Up', emoji: '👗', category: 'games' },
  { key: 'matchgame', label: 'Match Game', emoji: '🃏', category: 'games' },
  { key: 'truthordare', label: 'Truth/Dare', emoji: '🎯', category: 'games' },
  { key: 'wouldyourather', label: 'Would Rather', emoji: '🤔', category: 'games' },
  { key: 'escape', label: 'Escape Room', emoji: '🔐', category: 'games' },
  
  // Wellness
  { key: 'health', label: 'Health', emoji: '🩺', category: 'wellness' },
  { key: 'food', label: 'Food Guide', emoji: '🥗', category: 'wellness' },
  { key: 'period', label: 'Period Care', emoji: '🌸', category: 'wellness' },
  { key: 'selfcare', label: 'Self-Care', emoji: '🧖‍♀️', category: 'wellness' },
  { key: 'mood', label: 'Mood', emoji: '💭', category: 'wellness' },
  { key: 'affirmations', label: 'Affirm', emoji: '✨', category: 'wellness' },
  
  // Fun & Entertainment
  { key: 'karaoke', label: 'Karaoke', emoji: '🎤', category: 'fun' },
  { key: 'jokes', label: 'Jokes', emoji: '😂', category: 'fun' },
  { key: 'compliments', label: 'Compliments', emoji: '💕', category: 'fun' },
  { key: 'treats', label: 'Treats', emoji: '🍰', category: 'fun' },
  { key: 'naughty', label: 'Naughty Q', emoji: '🔥', category: 'fun' },
  
  // Planning & Future
  { key: 'dreams', label: 'Dreams', emoji: '🌟', category: 'future' },
  { key: 'growth', label: 'Growth', emoji: '🌱', category: 'future' },
  { key: 'future', label: 'Future', emoji: '📍', category: 'future' },
  { key: 'decide', label: 'Decide', emoji: '🎲', category: 'future' },
  { key: 'coupons', label: 'Coupons', emoji: '🎫', category: 'future' },
  
  // Media & Memories
  { key: 'photobooth', label: 'Photos', emoji: '📷', category: 'media' },
  { key: 'music', label: 'Music', emoji: '🎵', category: 'media' },
  { key: 'pinterest', label: 'Our Board', emoji: '📌', category: 'media' },
  { key: 'poems', label: 'Poems', emoji: '📜', category: 'media' },
  
  // Special
  { key: 'missyou', label: 'Miss You', emoji: '🥺', category: 'special' },
  { key: 'hearts', label: 'Jar of Hearts', emoji: '🫙', category: 'special' },
  { key: 'comfort', label: 'Comfort', emoji: '🆘', category: 'special' },
  { key: 'birthday', label: 'Birthday', emoji: '🎂', category: 'special' },
  { key: 'bouquets', label: 'Bouquets', emoji: '💐', category: 'special' },
  { key: 'languages', label: 'I Love You', emoji: '🌍', category: 'special' },
] as const;

const categories = [
  { id: 'roleplay', label: 'Roleplays', emoji: '🎭', color: 'from-purple-500 to-pink-500' },
  { id: 'games', label: 'Games', emoji: '🎮', color: 'from-blue-500 to-cyan-500' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘', color: 'from-green-500 to-emerald-500' },
  { id: 'fun', label: 'Fun', emoji: '🎉', color: 'from-orange-500 to-amber-500' },
  { id: 'future', label: 'Future', emoji: '🔮', color: 'from-indigo-500 to-purple-500' },
  { id: 'media', label: 'Media', emoji: '📸', color: 'from-pink-500 to-rose-500' },
  { id: 'special', label: 'Special', emoji: '💫', color: 'from-rose-500 to-red-500' },
];

const Extra = () => {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSections = selectedCategory 
    ? sections.filter(s => s.category === selectedCategory)
    : sections;

  const renderSection = () => {
    switch (activeSection) {
      case 'quiz': return <LoveQuiz />;
      case 'game': return <DressUpGame />;
      case 'missyou': return <WhenIMissYou />;
      case 'photobooth': return <PhotoBooth />;
      case 'dreams': return <SharedDreamsBucketList />;
      case 'music': return <CuratedSoundscapes />;
      case 'hearts': return <DigitalJarOfHearts />;
      case 'comfort': return <EmergencyComfortButton />;
      case 'growth': return <GrowthArchive />;
      case 'future': return <FutureMaps />;
      case 'decide': return <DecisionMaker />;
      case 'coupons': return <PermissionSlips />;
      case 'birthday': return <BirthdayCelebration />;
      case 'bouquets': return <FlowerBouquetGallery />;
      case 'languages': return <ILoveYouLanguages />;
      case 'period': return <PeriodTracker />;
      case 'karaoke': return <KaraokeSection />;
      case 'health': return <HealthSection />;
      case 'food': return <FoodNutritionGuide />;
      case 'compliments': return <ComplimentsSection />;
      case 'jokes': return <JokesSection />;
      case 'truthordare': return <TruthOrDare />;
      case 'affirmations': return <DailyAffirmations />;
      case 'mood': return <MoodTracker />;
      case 'selfcare': return <SelfCareSection />;
      case 'treats': return <VirtualTreats />;
      case 'pinterest': return <PrivatePinterest />;
      case 'escape': return <EscapeRoom />;
      case 'matchgame': return <MemoryMatchGame />;
      case 'wouldyourather': return <WouldYouRather />;
      case 'poems': return <NepaliPoemsGallery />;
      case 'naughty': return <NaughtyQuestions />;
      case 'airhostess': return <AirHostessRoleplay />;
      default: return null;
    }
  };

  return (
    <div 
      className="relative bg-gradient-to-br from-purple-950 via-pink-950 to-rose-950"
      style={{
        minHeight: '100dvh',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <HeartCursor />
      <ParallaxStars />

      {/* Header */}
      <header className="relative z-20 p-4 flex items-center justify-between">
        <Link to="/">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
        </Link>
        
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </motion.div>
          <span className="font-serif text-pink-300 text-lg">Extras 💫</span>
        </div>
      </header>

      <main className="relative z-10 px-4 py-4 pb-24">
        {!activeSection ? (
          <>
            {/* Title */}
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.span
                className="text-5xl block mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🎁
              </motion.span>
              <h1 className="text-3xl font-serif bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent">
                Extra Goodies
              </h1>
              <p className="text-white/60 text-sm mt-2">
                More fun things for my Puntuu! 💕
              </p>
            </motion.div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <motion.button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategory
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : "bg-white/10 text-white/70"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ All
              </motion.button>
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : "bg-white/10 text-white/70"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.emoji} {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Sections Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {filteredSections.map((section, index) => (
                <motion.button
                  key={section.key}
                  onClick={() => setActiveSection(section.key as SectionKey)}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-3xl mb-2">{section.emoji}</span>
                  <span className="text-white/80 text-xs text-center font-medium">{section.label}</span>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Back button */}
            <motion.button
              onClick={() => setActiveSection(null)}
              className="mb-4 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white backdrop-blur-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Extras</span>
            </motion.button>

            {/* Section Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard className="p-4">
                  {renderSection()}
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </main>

      {/* Footer */}
      <footer 
        className="fixed bottom-0 left-0 right-0 z-20 text-center bg-gradient-to-t from-black/70 via-black/40 to-transparent py-4"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        <p className="text-pink-300/80 text-sm font-serif">
          Made with 💕 for my Puntuu
        </p>
      </footer>
    </div>
  );
};

export default Extra;
