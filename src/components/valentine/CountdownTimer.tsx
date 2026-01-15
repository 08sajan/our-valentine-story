import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

export const CountdownTimer = ({ targetDate, label = "Valentine's Day" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsComplete(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-pink-500 to-rose-600 text-white w-16 h-16 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
        key={value}
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <span className="text-2xl font-bold relative z-10">
          {value.toString().padStart(2, '0')}
        </span>
      </motion.div>
      <span className="text-xs text-pink-600 mt-1 font-medium uppercase tracking-wide">
        {label}
      </span>
    </motion.div>
  );

  if (isComplete) {
    return (
      <motion.div 
        className="text-center py-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-flex items-center gap-2 text-pink-600 text-xl font-serif"
        >
          <Heart className="w-6 h-6 fill-pink-500" />
          It's {label}!
          <Heart className="w-6 h-6 fill-pink-500" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="py-4">
      <p className="text-center text-pink-500 text-sm mb-3 font-medium">
        ⏰ Countdown to {label}
      </p>
      <div className="flex justify-center gap-3">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="flex items-center text-pink-400 text-2xl font-bold pt-2">:</div>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div className="flex items-center text-pink-400 text-2xl font-bold pt-2">:</div>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <div className="flex items-center text-pink-400 text-2xl font-bold pt-2">:</div>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};
