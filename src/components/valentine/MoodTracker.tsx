import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface MoodEntry {
  date: string;
  mood: string;
  note: string;
  timestamp: number;
}

const moods = [
  { emoji: '😍', name: 'In Love', color: '#ec4899', description: 'Feeling all the love!' },
  { emoji: '🥰', name: 'Happy', color: '#f472b6', description: 'So happy and content!' },
  { emoji: '😊', name: 'Good', color: '#fbbf24', description: 'Feeling pretty good!' },
  { emoji: '😌', name: 'Calm', color: '#34d399', description: 'Peaceful and relaxed' },
  { emoji: '🤔', name: 'Thoughtful', color: '#60a5fa', description: 'Deep in thought' },
  { emoji: '😴', name: 'Tired', color: '#a78bfa', description: 'Need some rest' },
  { emoji: '😢', name: 'Sad', color: '#64748b', description: 'Feeling down' },
  { emoji: '😤', name: 'Frustrated', color: '#f87171', description: 'A bit frustrated' },
  { emoji: '🥺', name: 'Miss You', color: '#f472b6', description: 'Missing someone special' },
  { emoji: '😰', name: 'Anxious', color: '#94a3b8', description: 'Feeling worried' },
  { emoji: '🤗', name: 'Grateful', color: '#fcd34d', description: 'Thankful for everything' },
  { emoji: '💪', name: 'Strong', color: '#fb923c', description: 'Feeling powerful!' },
];

const STORAGE_KEY = 'puntuu-mood-tracker';

export const MoodTracker = () => {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [viewingDate, setViewingDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = entries.find(e => e.date === today);

  const handleSaveMood = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      date: today,
      mood: selectedMood.emoji,
      note: note,
      timestamp: Date.now(),
    };

    setEntries(prev => {
      const filtered = prev.filter(e => e.date !== today);
      return [newEntry, ...filtered].sort((a, b) => b.timestamp - a.timestamp);
    });

    setShowSuccess(true);
    setSelectedMood(null);
    setNote('');
    
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }

    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Get last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const entry = entries.find(e => e.date === dateStr);
      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString('en', { weekday: 'short' }),
        dayNum: date.getDate(),
        entry,
      });
    }
    return days;
  };

  // Get mood stats
  const getMoodStats = () => {
    const last30 = entries.filter(e => {
      const date = new Date(e.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return date >= thirtyDaysAgo;
    });

    const moodCounts: Record<string, number> = {};
    last30.forEach(e => {
      moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    });

    return Object.entries(moodCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const last7Days = getLast7Days();
  const moodStats = getMoodStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {todayEntry ? todayEntry.mood : '💭'}
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Mood Tracker
        </h3>
        <p className="text-white/60 text-sm">
          How are you feeling today, Puntuu? 💕
        </p>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-center"
          >
            <p className="text-white font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Mood saved! I hope you feel amazing! 💕
              <Sparkles className="w-5 h-5" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today's Status */}
      {todayEntry ? (
        <motion.div
          className="bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-2xl p-4 border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">{todayEntry.mood}</span>
            <div>
              <p className="text-white font-medium">Today's Mood</p>
              <p className="text-white/60 text-sm">
                {todayEntry.note || 'No note added'}
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Mood Selection */}
          <div>
            <p className="text-white/60 text-sm mb-3">Select how you're feeling:</p>
            <div className="grid grid-cols-4 gap-2">
              {moods.map((mood, index) => (
                <motion.button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood)}
                  className={`p-3 rounded-xl transition-all ${
                    selectedMood?.name === mood.name
                      ? 'ring-2 ring-white bg-white/20'
                      : 'bg-white/10'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl block mb-1">{mood.emoji}</span>
                  <p className="text-white/70 text-[9px]">{mood.name}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Selected Mood Details */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div 
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: `${selectedMood.color}20` }}
                >
                  <span className="text-4xl mb-2 block">{selectedMood.emoji}</span>
                  <p className="text-white font-medium">{selectedMood.name}</p>
                  <p className="text-white/60 text-sm">{selectedMood.description}</p>
                </div>

                {/* Note input */}
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about how you're feeling... (optional)"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                  rows={3}
                />

                {/* Save Button */}
                <motion.button
                  onClick={handleSaveMood}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" fill="white" />
                  Save Today's Mood
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Last 7 Days */}
      <div className="bg-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-rose-400" />
          <p className="text-white/80 text-sm font-medium">Last 7 Days</p>
        </div>
        <div className="flex justify-between gap-1">
          {last7Days.map((day, index) => (
            <motion.div
              key={day.date}
              className={`flex-1 text-center p-2 rounded-xl ${
                day.date === today ? 'bg-rose-500/20' : 'bg-white/5'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-white/50 text-[10px]">{day.dayName}</p>
              <p className="text-white text-xs mb-1">{day.dayNum}</p>
              <span className="text-xl">
                {day.entry ? day.entry.mood : '·'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mood Stats */}
      {moodStats.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <p className="text-white/80 text-sm font-medium">Your Top Moods (Last 30 Days)</p>
          </div>
          <div className="space-y-2">
            {moodStats.map(([emoji, count], index) => {
              const moodInfo = moods.find(m => m.emoji === emoji);
              const percentage = entries.length > 0 ? Math.round((count / entries.slice(0, 30).length) * 100) : 0;
              return (
                <motion.div
                  key={emoji}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl">{emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80 text-xs">{moodInfo?.name || 'Mood'}</span>
                      <span className="text-white/60 text-xs">{count} days</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Entry Count */}
      <div className="text-center">
        <p className="text-white/50 text-xs">
          Total entries: {entries.length} 📊
        </p>
      </div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Your feelings matter to me. Every emotion you have is valid and beautiful!" 💕
        </p>
      </motion.div>
    </div>
  );
};
