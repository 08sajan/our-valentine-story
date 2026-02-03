import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Trash2, Lock, X, Calendar, Sparkles, Image, Link2 } from "lucide-react";
import ReactDOM from "react-dom";

const SECRET_PASSWORD = 'Anjalisajan';

interface PinItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  futureDate: string;
  addedAt: number;
}

const defaultPins: PinItem[] = [
  // INTIMATE LINGERIE COLLECTION - Victoria Secret Style
  {
    id: 'lingerie-1',
    title: 'Black Lace Bralette',
    description: 'Delicate black lace bralette with scalloped edges - perfect for special nights 💋',
    image: 'https://images.unsplash.com/photo-1617330527566-d6de4abecb50?w=600',
    category: 'Lingerie',
    futureDate: 'Honeymoon',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-2',
    title: 'Red Satin Set',
    description: 'Sultry red satin lingerie set - irresistible passion ❤️',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
    category: 'Lingerie',
    futureDate: 'Valentine',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-3',
    title: 'Blush Pink Babydoll',
    description: 'Sweet blush pink babydoll with lace trim - angelic and sexy 🎀',
    image: 'https://images.unsplash.com/photo-1612530542704-8ae9d5718f3e?w=600',
    category: 'Lingerie',
    futureDate: 'First Night',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-4',
    title: 'White Bridal Chemise',
    description: 'Pure white silk chemise with lace details - bridal perfection 💍',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600',
    category: 'Lingerie',
    futureDate: 'Wedding Night',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-5',
    title: 'Black Silk Nightdress',
    description: 'Elegant black silk nightdress with lace accents - timeless seduction 🖤',
    image: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600',
    category: 'Night Dress',
    futureDate: 'Every Night',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-6',
    title: 'Rose Lace Bodysuit',
    description: 'Romantic rose-colored lace bodysuit - feminine and bold 🌹',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600',
    category: 'Lingerie',
    futureDate: 'Anniversary',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-7',
    title: 'Navy Satin Slip',
    description: 'Luxurious navy satin slip dress - sophisticated allure 💙',
    image: 'https://images.unsplash.com/photo-1594938374182-a57061cd0fbe?w=600',
    category: 'Night Dress',
    futureDate: 'Date Night',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-8',
    title: 'Champagne Teddy',
    description: 'Shimmering champagne teddy with delicate straps - celebratory vibes 🥂',
    image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600',
    category: 'Lingerie',
    futureDate: 'Special Occasion',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-9',
    title: 'Burgundy Velvet Set',
    description: 'Rich burgundy velvet lingerie set - luxuriously intimate 🍷',
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600',
    category: 'Lingerie',
    futureDate: 'Winter Nights',
    addedAt: Date.now()
  },
  {
    id: 'lingerie-10',
    title: 'Ivory Lace Robe',
    description: 'Flowing ivory lace robe over matching set - bridal goddess 👰',
    image: 'https://images.unsplash.com/photo-1599662875272-64de8f6dd0ec?w=600',
    category: 'Night Dress',
    futureDate: 'Honeymoon',
    addedAt: Date.now()
  },
  // FUTURE DREAMS
  {
    id: '1',
    title: 'Our First Home',
    description: 'A cozy apartment with plants and our favorite books 🏠',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
    category: 'Home',
    futureDate: '2027',
    addedAt: Date.now()
  },
  {
    id: '2',
    title: 'Paris Honeymoon',
    description: 'Walking under the Eiffel Tower together 🗼',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
    category: 'Travel',
    futureDate: '2026',
    addedAt: Date.now()
  },
  {
    id: '3',
    title: 'Beach Wedding',
    description: 'Sunset ceremony with waves as our music 🌅',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    category: 'Wedding',
    futureDate: '2026',
    addedAt: Date.now()
  },
  {
    id: '4',
    title: 'Our Baby Nursery',
    description: 'Soft colors, plush toys, and endless love 👶',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600',
    category: 'Family',
    futureDate: '2028',
    addedAt: Date.now()
  },
  {
    id: '5',
    title: 'Christmas Together',
    description: 'Decorating our tree with our first ornaments 🎄',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=600',
    category: 'Celebrations',
    futureDate: '2025',
    addedAt: Date.now()
  },
  {
    id: '6',
    title: 'Cooking Together',
    description: 'Sunday mornings making breakfast as a team 👩‍🍳',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
    category: 'Daily Life',
    futureDate: '2025',
    addedAt: Date.now()
  },
];

const categories = ['Lingerie', 'Night Dress', 'Home', 'Travel', 'Wedding', 'Family', 'Celebrations', 'Daily Life', 'Adventure', 'Dreams'];
const STORAGE_KEY = 'puntuu-pinterest-board';

const PasswordModal = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === SECRET_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: error ? [1, 1.02, 0.98, 1] : 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-rose-900/80 to-pink-900/80 rounded-2xl p-6 w-full max-w-sm border border-pink-400/30"
      >
        <div className="text-center mb-4">
          <Lock className="w-12 h-12 text-rose-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-rose-100">Our Private Board 📌</h3>
          <p className="text-rose-300/70 text-sm">Enter password to manage pins</p>
        </div>
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter password..."
          className={`w-full bg-rose-500/20 border rounded-xl px-4 py-3 text-white placeholder-rose-300/50 focus:outline-none focus:ring-2 focus:ring-rose-400 mb-4 ${
            error ? 'border-red-500' : 'border-rose-400/30'
          }`}
          autoFocus
        />
        
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 bg-white/10 text-white py-3 rounded-xl font-medium">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-semibold">
            Unlock
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const AddPinModal = ({ onAdd, onClose }: { onAdd: (pin: Omit<PinItem, 'id' | 'addedAt'>) => void; onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Dreams');
  const [futureDate, setFutureDate] = useState('2026');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      title,
      description,
      image: image || 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600',
      category,
      futureDate,
    });
    onClose();
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-rose-900/90 to-pink-900/90 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto border border-pink-400/30"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-rose-100">Add New Pin 📌</h3>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-rose-200 text-sm mb-1 block">Dream Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Our dream..."
              className="w-full bg-white/10 border border-rose-400/30 rounded-xl px-4 py-3 text-white placeholder-rose-300/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="text-rose-200 text-sm mb-1 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this dream..."
              rows={2}
              className="w-full bg-white/10 border border-rose-400/30 rounded-xl px-4 py-3 text-white placeholder-rose-300/50 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
            />
          </div>

          <div>
            <label className="text-rose-200 text-sm mb-1 block">Image URL (optional)</label>
            <div className="relative">
              <Image className="absolute left-3 top-3 w-5 h-5 text-rose-300/50" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white/10 border border-rose-400/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-rose-300/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <label className="text-rose-200 text-sm mb-1 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    category === cat
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-rose-200 text-sm mb-1 block">Target Year</label>
            <div className="flex gap-2">
              {['2025', '2026', '2027', '2028', '2030', '2035'].map((year) => (
                <button
                  key={year}
                  onClick={() => setFutureDate(year)}
                  className={`flex-1 py-2 rounded-xl text-sm transition-all ${
                    futureDate === year
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold flex items-center justify-center gap-2"
            disabled={!title.trim()}
          >
            <Plus className="w-5 h-5" />
            Add to Our Board
          </motion.button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const PinModal = ({ pin, onClose, onDelete }: { pin: PinItem; onClose: () => void; onDelete: () => void }) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-rose-900/90 to-pink-900/90 rounded-3xl overflow-hidden max-w-sm w-full border border-pink-400/30"
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <img src={pin.image} alt={pin.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-black/50 rounded-full p-2">
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="bg-rose-500 px-3 py-1 rounded-full text-white text-xs">
              {pin.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span className="text-rose-300 text-sm">{pin.futureDate}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{pin.title}</h3>
          <p className="text-white/70 text-sm mb-4">{pin.description}</p>

          <div className="flex gap-3">
            <motion.button
              onClick={onDelete}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-medium flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </motion.button>
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-medium flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Love It
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const PrivatePinterest = () => {
  const [pins, setPins] = useState<PinItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultPins;
  });
  const [selectedPin, setSelectedPin] = useState<PinItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'add' | 'delete' | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
  }, [pins]);

  const handleAddPin = (newPin: Omit<PinItem, 'id' | 'addedAt'>) => {
    const pin: PinItem = {
      ...newPin,
      id: Date.now().toString(),
      addedAt: Date.now(),
    };
    setPins(prev => [pin, ...prev]);
  };

  const handleDeletePin = (id: string) => {
    setPins(prev => prev.filter(p => p.id !== id));
    setSelectedPin(null);
    setPendingDeleteId(null);
  };

  const requestAction = (action: 'add' | 'delete', deleteId?: string) => {
    setPendingAction(action);
    if (deleteId) setPendingDeleteId(deleteId);
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    if (pendingAction === 'add') {
      setShowAddModal(true);
    } else if (pendingAction === 'delete' && pendingDeleteId) {
      handleDeletePin(pendingDeleteId);
    }
    setPendingAction(null);
  };

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
          📌
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Our Future Board
        </h3>
        <p className="text-white/60 text-sm">
          Private Pinterest for our dreams! 💕
        </p>
      </motion.div>

      {/* Add Button */}
      <motion.button
        onClick={() => requestAction('add')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2"
        style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.3)' }}
      >
        <Plus className="w-5 h-5" />
        Pin a New Dream
        <Sparkles className="w-5 h-5" />
      </motion.button>

      {/* Pinterest Grid */}
      <div className="columns-2 gap-3 space-y-3">
        {pins.map((pin, index) => (
          <motion.button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            className="w-full rounded-2xl overflow-hidden bg-white/10 break-inside-avoid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={pin.image} alt={pin.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="bg-rose-500/80 px-2 py-0.5 rounded-full text-white text-[10px] mb-1 inline-block">
                  {pin.futureDate}
                </span>
                <p className="text-white font-medium text-sm">{pin.title}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats */}
      <div className="text-center">
        <p className="text-white/50 text-xs">
          {pins.length} dreams pinned 📌💕
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
          "Every pin is a promise, every dream is our future together!" 💕
        </p>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal
            onSuccess={handlePasswordSuccess}
            onCancel={() => {
              setShowPasswordModal(false);
              setPendingAction(null);
              setPendingDeleteId(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && (
          <AddPinModal
            onAdd={handleAddPin}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPin && (
          <PinModal
            pin={selectedPin}
            onClose={() => setSelectedPin(null)}
            onDelete={() => requestAction('delete', selectedPin.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
