import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, X, Calendar, Sparkles, Plus, Trash2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface FuturePin {
  id: string;
  title: string;
  description: string;
  timeline: string;
  x: number;
  y: number;
  emoji: string;
  gradient: string;
  isCustom?: boolean;
}

const defaultPins: FuturePin[] = [
  {
    id: '1',
    title: 'Our First Meeting',
    description: 'The moment I finally get to hold you in my arms. The airport, the train station, wherever it is - it will be the most magical moment of my life. I\'ll probably cry.',
    timeline: 'Counting the days...',
    x: 50,
    y: 25,
    emoji: '🫂',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: '2',
    title: 'Our First Home Together',
    description: 'A cozy apartment with a balcony where we\'ll have morning chai together. Where we\'ll cook dinner, watch movies, and build our life. Just you, me, and our dreams.',
    timeline: 'When we\'re ready',
    x: 25,
    y: 35,
    emoji: '🏠',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: '3',
    title: 'Disney World Magic',
    description: 'Walking through Magic Kingdom holding your hand. Watching fireworks over Cinderella\'s Castle. I want to see your face light up like a kid again.',
    timeline: 'Dream vacation',
    x: 75,
    y: 30,
    emoji: '🏰',
    gradient: 'from-blue-400 to-purple-500'
  },
  {
    id: '4',
    title: 'Beach Paradise',
    description: 'Walking hand in hand on white sand beaches at sunset. Collecting shells together. Building sandcastles. Just us and the ocean.',
    timeline: 'Our first vacation',
    x: 65,
    y: 50,
    emoji: '🏖️',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: '5',
    title: 'Paris, City of Love',
    description: 'Kissing you under the Eiffel Tower at midnight. Coffee at a tiny cafe. Dancing by the Seine. The city of love with the love of my life.',
    timeline: 'One magical day',
    x: 40,
    y: 20,
    emoji: '🗼',
    gradient: 'from-rose-400 to-pink-500'
  },
  {
    id: '6',
    title: 'Our Wedding Day',
    description: 'The day I officially become yours forever. I\'ll be waiting at the altar, trying not to cry as you walk towards me. The beginning of our forever.',
    timeline: 'When the stars align',
    x: 15,
    y: 55,
    emoji: '💒',
    gradient: 'from-violet-400 to-purple-500'
  },
  {
    id: '7',
    title: 'Mountain Retreat',
    description: 'Snuggling in a cabin surrounded by snow, with a fireplace and hot chocolate. Reading books together. Just us against the world.',
    timeline: 'A winter someday',
    x: 55,
    y: 15,
    emoji: '🏔️',
    gradient: 'from-slate-400 to-gray-500'
  },
  {
    id: '8',
    title: 'Our Secret Garden',
    description: 'A picnic under the stars, fairy lights in the trees, rose petals everywhere. Where I\'ll slow dance with you until the sun comes up.',
    timeline: 'Every anniversary',
    x: 80,
    y: 65,
    emoji: '🌸',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: '9',
    title: 'Our Baby\'s First Steps',
    description: 'A little version of us taking their first wobbly steps. Your eyes, my smile. Watching them grow with the love we\'ve built together.',
    timeline: 'Our greatest adventure',
    x: 30,
    y: 70,
    emoji: '👶',
    gradient: 'from-yellow-400 to-amber-500'
  },
  {
    id: '10',
    title: 'Growing Old Together',
    description: 'Two rocking chairs on a porch. Grey hair and wrinkled hands still intertwined. Telling our grandkids our love story. Forever and always.',
    timeline: 'Our lifetime',
    x: 50,
    y: 80,
    emoji: '💕',
    gradient: 'from-red-400 to-rose-500'
  }
];

const emojiOptions = ['🏠', '🏖️', '🗼', '🏰', '🏔️', '🌸', '💒', '🎢', '🎭', '🌺', '☕', '🍕', '🎪', '🚗', '✈️', '🚂'];
const gradientOptions = [
  'from-pink-400 to-rose-500',
  'from-blue-400 to-cyan-500',
  'from-purple-400 to-violet-500',
  'from-amber-400 to-orange-500',
  'from-green-400 to-emerald-500',
  'from-red-400 to-rose-500',
];

const PinModal = ({ pin, onClose, onDelete }: { pin: FuturePin; onClose: () => void; onDelete?: () => void }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="relative max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,240,245,0.95))',
            boxShadow: '0 25px 80px rgba(255,100,150,0.4)'
          }}
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${pin.gradient} p-6 relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {pin.isCustom && onDelete && (
              <button
                onClick={onDelete}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-red-500/50 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            )}

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-3"
            >
              {pin.emoji}
            </motion.div>
            <h3 className="text-xl font-bold text-white">{pin.title}</h3>
            
            <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{pin.timeline}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'Georgia, serif' }}>
              {pin.description}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex justify-center"
            >
              <div className="flex items-center gap-2 text-pink-500">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Our future awaits</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const AddPinModal = ({ onClose, onAdd }: { onClose: () => void; onAdd: (pin: Omit<FuturePin, 'id' | 'x' | 'y'>) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('');
  const [emoji, setEmoji] = useState('🏠');
  const [gradient, setGradient] = useState(gradientOptions[0]);

  const handleSubmit = () => {
    if (title && description) {
      onAdd({
        title,
        description,
        timeline: timeline || 'Someday...',
        emoji,
        gradient,
        isCustom: true,
      });
      onClose();
    }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="relative max-w-sm w-full bg-gradient-to-br from-purple-900/95 to-pink-900/95 rounded-3xl p-6 border border-white/20"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <h3 className="text-xl font-bold text-white mb-4 text-center">Add Our Dream 💕</h3>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Dream title..."
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this dream..."
            rows={3}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 resize-none"
          />

          <input
            type="text"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            placeholder="When? (e.g., 'Summer 2026')"
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40"
          />

          <div>
            <p className="text-white/60 text-xs mb-2">Pick an emoji:</p>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-2 rounded-lg transition-all ${emoji === e ? 'bg-white/30 scale-110' : 'bg-white/10'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/60 text-xs mb-2">Pick a color:</p>
            <div className="flex gap-2">
              {gradientOptions.map((g) => (
                <button
                  key={g}
                  onClick={() => setGradient(g)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${g} transition-all ${gradient === g ? 'ring-2 ring-white scale-110' : ''}`}
                />
              ))}
            </div>
          </div>

          <motion.button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Our Map 💕
          </motion.button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const FutureMaps = () => {
  const [pins, setPins] = useState<FuturePin[]>(() => {
    const saved = localStorage.getItem('future-map-pins');
    return saved ? JSON.parse(saved) : defaultPins;
  });
  const [selectedPin, setSelectedPin] = useState<FuturePin | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('future-map-pins', JSON.stringify(pins));
  }, [pins]);

  const addPin = (newPin: Omit<FuturePin, 'id' | 'x' | 'y'>) => {
    const id = Date.now().toString();
    const x = 10 + Math.random() * 80;
    const y = 15 + Math.random() * 65;
    setPins(prev => [...prev, { ...newPin, id, x, y }]);
  };

  const deletePin = (id: string) => {
    setPins(prev => prev.filter(p => p.id !== id));
    setSelectedPin(null);
  };

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          📍 Our Future Map
        </motion.h2>
        <p className="text-white/70 text-sm">
          Places where I'll take you 💕
        </p>
      </div>

      {/* Add Button */}
      <motion.button
        onClick={() => setShowAddModal(true)}
        className="w-full mb-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        Add Our Dream Location
      </motion.button>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          height: '400px',
          background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
        }}
      >
        {/* Decorative map elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-white/5"
              style={{ top: `${i * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-white/5"
              style={{ left: `${i * 10}%` }}
            />
          ))}

          <motion.div
            className="absolute w-32 h-32 rounded-full bg-blue-500/10"
            style={{ top: '20%', left: '60%' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-green-500/10"
            style={{ top: '50%', left: '20%' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-pink-500/10"
            style={{ top: '60%', left: '70%' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Connection lines between pins */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {pins.slice(0, -1).map((pin, i) => {
            const nextPin = pins[i + 1];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${pin.x}%`}
                y1={`${pin.y}%`}
                x2={`${nextPin.x}%`}
                y2={`${nextPin.y}%`}
                stroke="rgba(255,100,150,0.3)"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.3 }}
              />
            );
          })}
        </svg>

        {/* Pins */}
        {pins.map((pin, index) => (
          <motion.button
            key={pin.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            className="absolute transform -translate-x-1/2 -translate-y-full"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onClick={() => setSelectedPin(pin)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/30 rounded-full blur-sm" />
            
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              className={`relative bg-gradient-to-b ${pin.gradient} rounded-full p-1 ${pin.isCustom ? 'ring-2 ring-white/50' : ''}`}
              style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-lg">{pin.emoji}</span>
              </div>
              
              <div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '10px solid white'
                }}
              />
            </motion.div>

            <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-white/80 text-xs bg-black/40 px-2 py-1 rounded">
                {pin.title}
              </span>
            </div>
          </motion.button>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
            <MapPin className="w-3 h-3" />
            <span>Tap a pin to explore our future</span>
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPin && (
          <PinModal
            pin={selectedPin}
            onClose={() => setSelectedPin(null)}
            onDelete={selectedPin.isCustom ? () => deletePin(selectedPin.id) : undefined}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && (
          <AddPinModal
            onClose={() => setShowAddModal(false)}
            onAdd={addPin}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
