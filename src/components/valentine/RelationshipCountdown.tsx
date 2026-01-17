import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Phone, Gem } from "lucide-react";

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
      className={`text-lg sm:text-2xl md:text-3xl font-bold ${color}`}
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
  emoji: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

const MilestoneCounter = ({ startDate, title, emoji, icon, gradientFrom, gradientTo }: MilestoneCounterProps) => {
  const [time, setTime] = useState<TimeElapsed>(calculateTimeElapsed(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeElapsed(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <motion.div
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
        {icon}
        <h4 className="text-white font-serif text-xs sm:text-sm">{title}</h4>
        <span className="text-base sm:text-lg">{emoji}</span>
      </div>
      
      <div className="grid grid-cols-6 gap-1 sm:gap-2">
        <CountdownItem value={time.years} label="Years" color="text-rose-300" />
        <CountdownItem value={time.months} label="Months" color="text-pink-300" />
        <CountdownItem value={time.days} label="Days" color="text-purple-300" />
        <CountdownItem value={time.hours} label="Hours" color="text-violet-300" />
        <CountdownItem value={time.minutes} label="Mins" color="text-indigo-300" />
        <CountdownItem value={time.seconds} label="Secs" color="text-blue-300" />
      </div>
    </motion.div>
  );
};

export const RelationshipCountdown = () => {
  // Nov 3 - Started talking on phone calls (using 2024 as a reasonable year)
  const phoneCallsDate = new Date(2024, 10, 3); // Month is 0-indexed, so 10 = November
  
  // Dec 2 - Got married
  const marriageDate = new Date(2024, 11, 2); // Month is 0-indexed, so 11 = December

  return (
    <div className="space-y-3 sm:space-y-4">
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
        <p className="text-white/50 text-[10px] sm:text-xs mt-1">Every second counts with you 💕</p>
      </div>

      <MilestoneCounter
        startDate={phoneCallsDate}
        title="Since We Started Talking"
        emoji="📞"
        icon={<Phone className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />}
        gradientFrom="from-amber-500/20"
        gradientTo="to-orange-500/20"
      />

      <MilestoneCounter
        startDate={marriageDate}
        title="Since We Got Married"
        emoji="💍"
        icon={<Gem className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400" />}
        gradientFrom="from-rose-500/20"
        gradientTo="to-pink-500/20"
      />

      <motion.div
        className="text-center pt-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-white/40 text-[10px] sm:text-xs italic">
          And counting forever... ♾️❤️
        </p>
      </motion.div>
    </div>
  );
};