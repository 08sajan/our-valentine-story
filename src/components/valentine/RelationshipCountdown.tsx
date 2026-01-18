import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Phone, Gem, Sparkles } from "lucide-react";

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeElapsed = (startDate: Date): TimeElapsed => {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  
  return { years, months, days, hours, minutes, seconds };
};

interface CountdownItemProps {
  value: number;
  label: string;
  color: string;
}

const CountdownItem = ({ value, label, color }: CountdownItemProps) => (
  <motion.div 
    className="text-center"
    key={value}
  >
    <motion.div 
      className={`text-lg sm:text-2xl font-bold ${color} tabular-nums`}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 0.5 }}
      key={value}
    >
      {value.toString().padStart(2, '0')}
    </motion.div>
    <p className="text-white/50 text-[8px] sm:text-[10px] uppercase tracking-wider">{label}</p>
  </motion.div>
);

interface MilestoneCounterProps {
  startDate: Date;
  title: string;
  subtitle: string;
  emoji: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

const MilestoneCounter = ({ startDate, title, subtitle, emoji, icon, gradientFrom, gradientTo }: MilestoneCounterProps) => {
  const [time, setTime] = useState<TimeElapsed>(calculateTimeElapsed(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeElapsed(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <motion.div
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl p-4 border border-white/10 relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {icon}
          </motion.div>
          <div className="text-center">
            <h4 className="text-white font-serif text-sm font-medium">{title}</h4>
            <p className="text-white/60 text-xs">{subtitle}</p>
          </div>
          <motion.span 
            className="text-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {emoji}
          </motion.span>
        </div>
        
        <div className="grid grid-cols-6 gap-1 sm:gap-2 bg-black/20 rounded-xl p-3">
          <CountdownItem value={time.years} label="Years" color="text-rose-300" />
          <CountdownItem value={time.months} label="Months" color="text-pink-300" />
          <CountdownItem value={time.days} label="Days" color="text-purple-300" />
          <CountdownItem value={time.hours} label="Hours" color="text-violet-300" />
          <CountdownItem value={time.minutes} label="Mins" color="text-indigo-300" />
          <CountdownItem value={time.seconds} label="Secs" color="text-blue-300" />
        </div>
      </div>
    </motion.div>
  );
};

export const RelationshipCountdown = () => {
  // Nov 3, 2025 - Started talking on phone calls
  const phoneCallsDate = new Date(2025, 10, 3); // Month is 0-indexed, so 10 = November
  
  // Dec 3, 2025 - Got married
  const marriageDate = new Date(2025, 11, 3); // Month is 0-indexed, so 11 = December

  return (
    <div className="w-full max-w-full overflow-hidden space-y-4">
      <div className="text-center mb-2">
        <motion.h3
          className="text-base sm:text-lg font-serif text-rose-300 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
          Our Love Journey
          <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
        </motion.h3>
        <p className="text-white/50 text-xs mt-1">Every second counts with you 💕</p>
      </div>

      <MilestoneCounter
        startDate={phoneCallsDate}
        title="Since We Started Talking"
        subtitle="November 3, 2025"
        emoji="📞"
        icon={<Phone className="w-4 h-4 text-amber-400" />}
        gradientFrom="from-amber-500/20"
        gradientTo="to-orange-500/20"
      />

      <MilestoneCounter
        startDate={marriageDate}
        title="Since We Got Married"
        subtitle="December 3, 2025"
        emoji="💍"
        icon={<Gem className="w-4 h-4 text-rose-400" />}
        gradientFrom="from-rose-500/20"
        gradientTo="to-pink-500/20"
      />

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-rose-300 text-sm font-serif">Dream Come True</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-white/70 text-xs sm:text-sm text-center italic">
          Every second with you feels like a dream I never want to wake up from. 
          From our first call to forever, you're my greatest blessing. 💕
        </p>
      </motion.div>

      <motion.div
        className="text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-white/40 text-xs italic flex items-center justify-center gap-2">
          <span>And counting forever...</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ♾️❤️
          </motion.span>
        </p>
      </motion.div>
    </div>
  );
};
