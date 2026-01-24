import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Heart, Droplets, Moon, Sun, Sparkles, 
  ThermometerSun, Pill, Coffee, Bath, Bed, Music,
  Flower2, HeartPulse, Cookie, Salad, ChevronLeft, 
  ChevronRight, Check, AlertCircle, Info, Gift, Send
} from 'lucide-react';

interface PeriodData {
  lastPeriodStart: string;
  cycleLength: number;
  periodLength: number;
  symptoms: string[];
  notes: string;
}

interface DayInfo {
  date: Date;
  isPeriod: boolean;
  isFertile: boolean;
  isOvulation: boolean;
  isPredicted: boolean;
  dayOfCycle: number;
}

const defaultData: PeriodData = {
  lastPeriodStart: '',
  cycleLength: 28,
  periodLength: 5,
  symptoms: [],
  notes: ''
};

const symptomOptions = [
  { id: 'cramps', label: 'Cramps', icon: '😣' },
  { id: 'headache', label: 'Headache', icon: '🤕' },
  { id: 'bloating', label: 'Bloating', icon: '😮‍💨' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'mood-swings', label: 'Mood Swings', icon: '🎭' },
  { id: 'acne', label: 'Acne', icon: '😟' },
  { id: 'backache', label: 'Back Pain', icon: '🔙' },
  { id: 'cravings', label: 'Cravings', icon: '🍫' },
];

const healthTips = [
  {
    phase: 'menstrual',
    title: '🩸 During Your Period',
    tips: [
      { icon: <Bath className="w-4 h-4" />, text: 'Take warm baths to ease cramps' },
      { icon: <Bed className="w-4 h-4" />, text: 'Get plenty of rest and sleep' },
      { icon: <ThermometerSun className="w-4 h-4" />, text: 'Use a heating pad on your tummy' },
      { icon: <Salad className="w-4 h-4" />, text: 'Eat iron-rich foods like spinach' },
      { icon: <Droplets className="w-4 h-4" />, text: 'Stay hydrated with warm water' },
    ]
  },
  {
    phase: 'follicular',
    title: '🌱 Follicular Phase',
    tips: [
      { icon: <Sun className="w-4 h-4" />, text: 'Energy is rising - great for workouts!' },
      { icon: <Sparkles className="w-4 h-4" />, text: 'Try new activities and challenges' },
      { icon: <Salad className="w-4 h-4" />, text: 'Eat fresh, light foods' },
      { icon: <Coffee className="w-4 h-4" />, text: 'Your body can handle more caffeine now' },
    ]
  },
  {
    phase: 'ovulation',
    title: '✨ Ovulation Phase',
    tips: [
      { icon: <HeartPulse className="w-4 h-4" />, text: 'Peak energy and confidence!' },
      { icon: <Music className="w-4 h-4" />, text: 'Great time for social activities' },
      { icon: <Flower2 className="w-4 h-4" />, text: 'Skin often looks its best' },
    ]
  },
  {
    phase: 'luteal',
    title: '🌙 Luteal Phase (PMS)',
    tips: [
      { icon: <Cookie className="w-4 h-4" />, text: 'Eat complex carbs to boost mood' },
      { icon: <Pill className="w-4 h-4" />, text: 'Magnesium can help with symptoms' },
      { icon: <Moon className="w-4 h-4" />, text: 'Prioritize relaxation and self-care' },
      { icon: <Bath className="w-4 h-4" />, text: 'Gentle yoga or stretching helps' },
    ]
  }
];

const careMessages = [
  "Remember, I'm always here for you during these days 💕",
  "You're so strong, and I admire you every day 🌸",
  "Take it easy today, you deserve all the rest 💝",
  "I'll bring you chocolate and cuddles anytime 🍫",
  "You're beautiful inside and out, always 💖",
  "Let me know how I can make you feel better 🥰",
];

// Care Package items
interface CareItem {
  id: string;
  emoji: string;
  name: string;
  message: string;
  color: string;
}

const carePackageItems: CareItem[] = [
  { id: 'tea', emoji: '☕', name: 'Warm Tea', message: "Here's a warm cup of tea to comfort you 🍵", color: 'from-amber-500/30 to-orange-500/30' },
  { id: 'heating-pad', emoji: '🔥', name: 'Heating Pad', message: "A warm heating pad for your tummy 💝", color: 'from-red-500/30 to-orange-500/30' },
  { id: 'chocolate', emoji: '🍫', name: 'Chocolate', message: "Your favorite chocolate to sweeten your day 🍫", color: 'from-amber-700/30 to-amber-900/30' },
  { id: 'blanket', emoji: '🛋️', name: 'Cozy Blanket', message: "Wrapping you in the softest blanket 🥰", color: 'from-purple-500/30 to-pink-500/30' },
  { id: 'flowers', emoji: '💐', name: 'Fresh Flowers', message: "Beautiful flowers to brighten your day 🌸", color: 'from-pink-500/30 to-rose-500/30' },
  { id: 'hug', emoji: '🤗', name: 'Virtual Hug', message: "The biggest, warmest hug coming your way! 💕", color: 'from-pink-500/30 to-red-500/30' },
  { id: 'movie', emoji: '🎬', name: 'Movie Night', message: "Let's watch your favorite movie together 🍿", color: 'from-blue-500/30 to-purple-500/30' },
  { id: 'ice-cream', emoji: '🍦', name: 'Ice Cream', message: "Your favorite ice cream flavor! 🍨", color: 'from-pink-300/30 to-blue-300/30' },
  { id: 'massage', emoji: '💆', name: 'Back Massage', message: "A gentle massage to ease the pain 💆‍♀️", color: 'from-teal-500/30 to-green-500/30' },
  { id: 'music', emoji: '🎵', name: 'Relaxing Music', message: "Soft music to soothe your soul 🎶", color: 'from-violet-500/30 to-purple-500/30' },
  { id: 'bath-bomb', emoji: '🛁', name: 'Bath Bomb', message: "A relaxing bath with your favorite scent 🧼", color: 'from-pink-400/30 to-purple-400/30' },
  { id: 'cuddles', emoji: '🥰', name: 'Cuddle Session', message: "Unlimited cuddles and kisses for you 💋", color: 'from-red-400/30 to-pink-400/30' },
  { id: 'painkillers', emoji: '💊', name: 'Pain Relief', message: "Here to take care of all your needs 🏥", color: 'from-blue-400/30 to-cyan-400/30' },
  { id: 'water', emoji: '💧', name: 'Warm Water', message: "Stay hydrated, my love 💦", color: 'from-cyan-400/30 to-blue-400/30' },
  { id: 'pillow', emoji: '🛏️', name: 'Extra Pillow', message: "The comfiest pillow for my queen 👑", color: 'from-indigo-400/30 to-purple-400/30' },
  { id: 'love-letter', emoji: '💌', name: 'Love Letter', message: "You are the most amazing person in my life. I love you more than words can express. 💕", color: 'from-rose-400/30 to-pink-400/30' },
];

interface SentCarePackage {
  itemId: string;
  timestamp: number;
}

export const PeriodTracker: React.FC = () => {
  const [data, setData] = useState<PeriodData>(defaultData);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'tracker' | 'tips' | 'care' | 'package'>('tracker');
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [todaySymptoms, setTodaySymptoms] = useState<string[]>([]);
  const [sentPackages, setSentPackages] = useState<SentCarePackage[]>([]);
  const [showSentAnimation, setShowSentAnimation] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('periodTrackerData');
    if (saved) {
      setData(JSON.parse(saved));
    }
    const savedSymptoms = localStorage.getItem('todaySymptoms');
    if (savedSymptoms) {
      const parsed = JSON.parse(savedSymptoms);
      if (parsed.date === new Date().toDateString()) {
        setTodaySymptoms(parsed.symptoms);
      }
    }
    const savedPackages = localStorage.getItem('sentCarePackages');
    if (savedPackages) {
      setSentPackages(JSON.parse(savedPackages));
    }
  }, []);

  const saveData = (newData: PeriodData) => {
    setData(newData);
    localStorage.setItem('periodTrackerData', JSON.stringify(newData));
  };

  const saveTodaySymptoms = (symptoms: string[]) => {
    setTodaySymptoms(symptoms);
    localStorage.setItem('todaySymptoms', JSON.stringify({
      date: new Date().toDateString(),
      symptoms
    }));
  };

  const sendCarePackage = (itemId: string) => {
    const newPackage: SentCarePackage = { itemId, timestamp: Date.now() };
    const updated = [...sentPackages, newPackage];
    setSentPackages(updated);
    localStorage.setItem('sentCarePackages', JSON.stringify(updated));
    setShowSentAnimation(itemId);
    setTimeout(() => setShowSentAnimation(null), 2000);
  };

  const getRecentPackages = () => {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    return sentPackages.filter(p => p.timestamp > oneDayAgo);
  };

  const getDayInfo = (date: Date): DayInfo => {
    if (!data.lastPeriodStart) {
      return { date, isPeriod: false, isFertile: false, isOvulation: false, isPredicted: false, dayOfCycle: 0 };
    }

    const lastPeriod = new Date(data.lastPeriodStart);
    const diffTime = date.getTime() - lastPeriod.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { date, isPeriod: false, isFertile: false, isOvulation: false, isPredicted: false, dayOfCycle: 0 };
    }

    const dayOfCycle = (diffDays % data.cycleLength) + 1;
    const isPeriod = dayOfCycle <= data.periodLength;
    const ovulationDay = data.cycleLength - 14;
    const isOvulation = dayOfCycle === ovulationDay;
    const isFertile = dayOfCycle >= ovulationDay - 5 && dayOfCycle <= ovulationDay + 1;
    const isPredicted = diffDays >= data.cycleLength;

    return { date, isPeriod, isFertile, isOvulation, isPredicted, dayOfCycle };
  };

  const getCurrentPhase = (): string => {
    if (!data.lastPeriodStart) return 'unknown';
    const today = new Date();
    const info = getDayInfo(today);
    
    if (info.dayOfCycle <= data.periodLength) return 'menstrual';
    if (info.dayOfCycle <= 13) return 'follicular';
    if (info.dayOfCycle <= 16) return 'ovulation';
    return 'luteal';
  };

  const getNextPeriodDate = (): Date | null => {
    if (!data.lastPeriodStart) return null;
    const lastPeriod = new Date(data.lastPeriodStart);
    const today = new Date();
    let nextPeriod = new Date(lastPeriod);
    
    while (nextPeriod <= today) {
      nextPeriod.setDate(nextPeriod.getDate() + data.cycleLength);
    }
    return nextPeriod;
  };

  const getDaysUntilPeriod = (): number => {
    const next = getNextPeriodDate();
    if (!next) return -1;
    const today = new Date();
    const diff = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: JSX.Element[] = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Week day headers
    weekDays.forEach((day) => {
      days.push(
        <div key={`header-${day}`} className="text-center text-xs text-pink-300/60 font-medium py-2">
          {day}
        </div>
      );
    });

    // Empty cells before first day
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const info = getDayInfo(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      let bgClass = 'bg-transparent';
      let textClass = 'text-pink-100';

      if (info.isPeriod) {
        bgClass = info.isPredicted ? 'bg-red-400/30 border border-dashed border-red-400/50' : 'bg-red-400/50';
        textClass = 'text-white';
      } else if (info.isOvulation) {
        bgClass = 'bg-purple-400/50';
        textClass = 'text-white';
      } else if (info.isFertile) {
        bgClass = 'bg-purple-400/30';
        textClass = 'text-purple-200';
      }

      days.push(
        <motion.button
          key={`day-${day}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDate(date)}
          className={`
            relative p-2 rounded-full text-sm font-medium transition-all
            ${bgClass} ${textClass}
            ${isToday ? 'ring-2 ring-pink-400 ring-offset-1 ring-offset-transparent' : ''}
            ${isSelected ? 'ring-2 ring-white' : ''}
          `}
        >
          {day}
          {info.isOvulation && (
            <span className="absolute -top-1 -right-1 text-[10px]">✨</span>
          )}
        </motion.button>
      );
    }

    return days;
  };

  const currentPhase = getCurrentPhase();
  const daysUntil = getDaysUntilPeriod();
  const randomMessage = careMessages[Math.floor(Math.random() * careMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900/20 via-purple-900/20 to-pink-900/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-2"
          >
            <Flower2 className="w-12 h-12 text-pink-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-pink-100">Period Care</h2>
          <p className="text-pink-300/70 text-sm mt-1">Taking care of you, always 💕</p>
        </div>

        {/* Status Card */}
        {data.lastPeriodStart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 mb-6 border border-pink-400/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-200 text-sm">Next period in</p>
                <p className="text-3xl font-bold text-white">
                  {daysUntil > 0 ? `${daysUntil} days` : 'Today! 💗'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-pink-200 text-sm">Current Phase</p>
                <p className="text-lg font-semibold text-pink-100 capitalize">{currentPhase}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'tracker', label: 'Tracker', icon: <Calendar className="w-4 h-4" /> },
            { id: 'tips', label: 'Tips', icon: <Heart className="w-4 h-4" /> },
            { id: 'care', label: 'Self Care', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'package', label: 'Care Package', icon: <Gift className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 min-w-[70px] flex items-center justify-center gap-1 py-2 px-2 rounded-xl font-medium transition-all text-xs
                ${activeTab === tab.id 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-pink-500/20 text-pink-200 hover:bg-pink-500/30'}
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Tracker Tab */}
          {activeTab === 'tracker' && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Settings */}
              <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-pink-400/20">
                <h3 className="text-pink-100 font-semibold mb-4 flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Cycle Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-pink-200 text-sm block mb-2">Last Period Start Date</label>
                    <input
                      type="date"
                      value={data.lastPeriodStart}
                      onChange={(e) => saveData({ ...data, lastPeriodStart: e.target.value })}
                      className="w-full bg-pink-500/20 border border-pink-400/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-pink-200 text-sm block mb-2">Cycle Length</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="21"
                          max="35"
                          value={data.cycleLength}
                          onChange={(e) => saveData({ ...data, cycleLength: parseInt(e.target.value) || 28 })}
                          className="w-full bg-pink-500/20 border border-pink-400/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <span className="text-pink-300 text-sm">days</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-pink-200 text-sm block mb-2">Period Length</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="3"
                          max="10"
                          value={data.periodLength}
                          onChange={(e) => saveData({ ...data, periodLength: parseInt(e.target.value) || 5 })}
                          className="w-full bg-pink-500/20 border border-pink-400/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <span className="text-pink-300 text-sm">days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-pink-400/20">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-pink-500/20 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-pink-300" />
                  </button>
                  <h3 className="text-pink-100 font-semibold">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-pink-500/20 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-pink-300" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar()}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-pink-400/20">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-400/50" />
                    <span className="text-pink-200">Period</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-purple-400/30" />
                    <span className="text-pink-200">Fertile</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-purple-400/50" />
                    <span className="text-pink-200">Ovulation</span>
                  </div>
                </div>
              </div>

              {/* Log Symptoms */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSymptomModal(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <HeartPulse className="w-5 h-5" />
                Log Today's Symptoms
              </motion.button>

              {todaySymptoms.length > 0 && (
                <div className="mt-4 p-4 bg-pink-500/10 rounded-xl border border-pink-400/20">
                  <p className="text-pink-200 text-sm mb-2">Today's symptoms:</p>
                  <div className="flex flex-wrap gap-2">
                    {todaySymptoms.map((s) => {
                      const symptom = symptomOptions.find(opt => opt.id === s);
                      return symptom ? (
                        <span key={s} className="bg-pink-500/30 px-3 py-1 rounded-full text-sm text-pink-100">
                          {symptom.icon} {symptom.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {healthTips.map((phase) => (
                <div
                  key={phase.phase}
                  className={`
                    bg-white/5 rounded-2xl p-4 border transition-all
                    ${currentPhase === phase.phase 
                      ? 'border-pink-400 ring-2 ring-pink-400/30' 
                      : 'border-pink-400/20'}
                  `}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-pink-100 font-semibold">{phase.title}</h3>
                    {currentPhase === phase.phase && (
                      <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {phase.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-pink-200 text-sm">
                        <span className="text-pink-400 mt-0.5">{tip.icon}</span>
                        <span>{tip.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* General Tips */}
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 border border-pink-400/30">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-pink-300" />
                  <h3 className="text-pink-100 font-semibold">General Tips</h3>
                </div>
                <ul className="space-y-2 text-pink-200 text-sm">
                  <li>• Track your cycle regularly for better predictions</li>
                  <li>• Exercise gently - yoga and walks are great</li>
                  <li>• Limit salt and caffeine before your period</li>
                  <li>• Keep painkillers handy if you get cramps</li>
                  <li>• Use a period tracking app for reminders</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Self Care Tab */}
          {activeTab === 'care' && (
            <motion.div
              key="care"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Love Note */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-pink-500/30 to-red-500/30 rounded-2xl p-6 border border-pink-400/40 text-center"
              >
                <Heart className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <p className="text-pink-100 text-lg font-medium italic">
                  "{randomMessage}"
                </p>
                <p className="text-pink-300/70 text-sm mt-2">— Your Love</p>
              </motion.div>

              {/* Self Care Ideas */}
              <div className="bg-white/5 rounded-2xl p-4 border border-pink-400/20">
                <h3 className="text-pink-100 font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Self Care Ideas For You
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🛁', text: 'Warm bubble bath' },
                    { icon: '🍫', text: 'Dark chocolate' },
                    { icon: '🎬', text: 'Favorite movie' },
                    { icon: '🧘', text: 'Light stretching' },
                    { icon: '☕', text: 'Herbal tea' },
                    { icon: '📚', text: 'Good book' },
                    { icon: '🎵', text: 'Relaxing music' },
                    { icon: '😴', text: 'Extra sleep' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-pink-500/20 rounded-xl p-3 text-center"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-pink-200 text-sm mt-1">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Comfort Foods */}
              <div className="bg-white/5 rounded-2xl p-4 border border-pink-400/20">
                <h3 className="text-pink-100 font-semibold mb-4 flex items-center gap-2">
                  <Cookie className="w-4 h-4" />
                  Comfort Foods That Help
                </h3>
                
                <div className="space-y-2">
                  {[
                    { food: 'Dark Chocolate', benefit: 'Releases endorphins 🍫' },
                    { food: 'Bananas', benefit: 'Rich in potassium & B6 🍌' },
                    { food: 'Salmon', benefit: 'Omega-3 reduces inflammation 🐟' },
                    { food: 'Spinach', benefit: 'Replenishes iron levels 🥬' },
                    { food: 'Ginger Tea', benefit: 'Soothes cramps naturally 🫚' },
                    { food: 'Nuts', benefit: 'Magnesium for mood 🥜' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-pink-500/10 rounded-xl px-4 py-3">
                      <span className="text-pink-100 font-medium">{item.food}</span>
                      <span className="text-pink-300 text-sm">{item.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Comfort */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-2xl p-4 border border-red-400/30"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/30 p-3 rounded-full">
                    <AlertCircle className="w-6 h-6 text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-pink-100 font-semibold">Need Extra Support?</h3>
                    <p className="text-pink-200 text-sm">Remember, I'm just a call away. Always. 💕</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Care Package Tab */}
          {activeTab === 'package' && (
            <motion.div
              key="package"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block text-4xl mb-2"
                >
                  🎁
                </motion.div>
                <h3 className="text-lg font-semibold text-pink-100">Send a Care Package</h3>
                <p className="text-pink-300/70 text-sm">Virtual comfort items for you 💕</p>
              </div>

              {/* Recent Sent Items */}
              {getRecentPackages().length > 0 && (
                <div className="bg-green-500/20 rounded-xl p-3 border border-green-400/30">
                  <p className="text-green-200 text-sm text-center">
                    ✅ {getRecentPackages().length} care items sent today!
                  </p>
                </div>
              )}

              {/* Care Items Grid */}
              <div className="grid grid-cols-2 gap-3">
                {carePackageItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => sendCarePackage(item.id)}
                    className={`relative bg-gradient-to-r ${item.color} rounded-xl p-4 border border-pink-400/20 text-center overflow-hidden`}
                  >
                    <AnimatePresence>
                      {showSentAnimation === item.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.5 }}
                          className="absolute inset-0 bg-green-500/80 flex items-center justify-center z-10"
                        >
                          <div className="text-white text-center">
                            <Send className="w-6 h-6 mx-auto mb-1" />
                            <p className="text-sm font-medium">Sent! 💕</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="text-3xl block mb-2">{item.emoji}</span>
                    <p className="text-pink-100 font-medium text-sm">{item.name}</p>
                  </motion.button>
                ))}
              </div>

              <div className="bg-pink-500/20 rounded-xl p-4 border border-pink-400/30 text-center">
                <p className="text-pink-200 text-sm italic">
                  "Tap any item to send virtual comfort your way! Each one comes with love 💝"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Symptom Modal */}
      <AnimatePresence>
        {showSymptomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSymptomModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-pink-900 to-purple-900 rounded-2xl p-6 w-full max-w-md border border-pink-400/30"
            >
              <h3 className="text-xl font-bold text-pink-100 mb-4">How are you feeling today?</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {symptomOptions.map((symptom) => {
                  const isSelected = todaySymptoms.includes(symptom.id);
                  return (
                    <motion.button
                      key={symptom.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (isSelected) {
                          saveTodaySymptoms(todaySymptoms.filter(s => s !== symptom.id));
                        } else {
                          saveTodaySymptoms([...todaySymptoms, symptom.id]);
                        }
                      }}
                      className={`
                        flex items-center gap-2 p-3 rounded-xl transition-all
                        ${isSelected 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-pink-500/20 text-pink-200 hover:bg-pink-500/30'}
                      `}
                    >
                      <span className="text-xl">{symptom.icon}</span>
                      <span className="text-sm font-medium">{symptom.label}</span>
                      {isSelected && <Check className="w-4 h-4 ml-auto" />}
                    </motion.button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowSymptomModal(false)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
