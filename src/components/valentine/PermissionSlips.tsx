import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Heart, Check, Gift, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Coupon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  redeemed: boolean;
}

const initialCoupons: Coupon[] = [
  { id: '1', title: 'Chores-Free Night', description: 'Valid for one night of me doing ALL the chores while you relax', emoji: '🧹', gradient: 'from-blue-400 to-cyan-500', redeemed: false },
  { id: '2', title: 'Unlimited Rant Session', description: 'Valid for a 30-minute rant where I just listen and agree', emoji: '🗣️', gradient: 'from-purple-400 to-indigo-500', redeemed: false },
  { id: '3', title: 'Favorite Takeout', description: 'Valid for ordering your favorite food, no questions asked', emoji: '🍱', gradient: 'from-orange-400 to-red-500', redeemed: false },
  { id: '4', title: 'Nap Permission', description: 'Valid for guilt-free napping while I handle everything', emoji: '😴', gradient: 'from-indigo-400 to-purple-500', redeemed: false },
  { id: '5', title: 'Movie Marathon Control', description: 'Valid for full control of what we watch, no complaints', emoji: '🎬', gradient: 'from-pink-400 to-rose-500', redeemed: false },
  { id: '6', title: 'Breakfast in Bed', description: 'Valid for waking up to your favorite breakfast already made', emoji: '🥞', gradient: 'from-amber-400 to-yellow-500', redeemed: false },
  { id: '7', title: 'Extra Cuddles', description: 'Valid for unlimited cuddles on demand, no time limit', emoji: '🤗', gradient: 'from-rose-400 to-pink-500', redeemed: false },
  { id: '8', title: 'Winning Any Argument', description: 'Valid for automatically winning one argument', emoji: '🏆', gradient: 'from-emerald-400 to-teal-500', redeemed: false },
  { id: '9', title: 'Spa Night', description: 'Valid for full pampering - foot rub, massage, face mask', emoji: '💆', gradient: 'from-violet-400 to-fuchsia-500', redeemed: false },
  { id: '10', title: 'No Phone Zone', description: 'Valid for my complete, undivided attention', emoji: '📵', gradient: 'from-cyan-400 to-blue-500', redeemed: false },
  { id: '11', title: 'Shopping Spree', description: 'Valid for guilt-free shopping where I carry all bags', emoji: '🛍️', gradient: 'from-pink-400 to-purple-500', redeemed: false },
  { id: '12', title: 'Dance Party', description: 'Valid for a spontaneous dance party anytime', emoji: '💃', gradient: 'from-amber-400 to-orange-500', redeemed: false },
  { id: '13', title: 'Dessert First', description: 'Valid for eating dessert before dinner', emoji: '🍰', gradient: 'from-rose-400 to-red-500', redeemed: false },
  { id: '14', title: 'Lazy Sunday', description: 'Valid for staying in bed all day with snacks', emoji: '🛋️', gradient: 'from-blue-400 to-indigo-500', redeemed: false },
  { id: '15', title: 'Love Letter', description: 'Valid for an on-the-spot handwritten love letter', emoji: '💌', gradient: 'from-red-400 to-rose-500', redeemed: false },
  { id: '16', title: 'Midnight Snack Run', description: 'Valid for getting any snack you want, any time', emoji: '🌙', gradient: 'from-violet-400 to-purple-500', redeemed: false },
  { id: '17', title: 'Head Massage', description: 'Valid for a 30-minute head and scalp massage', emoji: '✨', gradient: 'from-teal-400 to-cyan-500', redeemed: false },
  { id: '18', title: 'Pick the Restaurant', description: 'Valid for choosing any restaurant', emoji: '🍽️', gradient: 'from-orange-400 to-amber-500', redeemed: false },
  { id: '19', title: 'Ice Cream Date', description: 'Valid for an immediate ice cream run together', emoji: '🍦', gradient: 'from-pink-300 to-rose-400', redeemed: false },
  { id: '20', title: 'Foot Massage', description: 'Valid for a relaxing 20-minute foot massage', emoji: '🦶', gradient: 'from-green-400 to-emerald-500', redeemed: false },
  { id: '21', title: 'Photo Session', description: 'Valid for taking unlimited cute pics together', emoji: '📸', gradient: 'from-purple-400 to-pink-500', redeemed: false },
  { id: '22', title: 'Cooking Together', description: 'Valid for cooking your favorite meal together', emoji: '👩‍🍳', gradient: 'from-amber-400 to-orange-500', redeemed: false },
  { id: '23', title: 'Stargazing Night', description: 'Valid for a romantic stargazing date', emoji: '⭐', gradient: 'from-indigo-400 to-blue-600', redeemed: false },
  { id: '24', title: 'Morning Kisses', description: 'Valid for extra morning kisses before waking up', emoji: '💋', gradient: 'from-rose-400 to-red-500', redeemed: false },
  { id: '25', title: 'Surprise Gift', description: 'Valid for receiving a surprise gift from me', emoji: '🎁', gradient: 'from-pink-400 to-fuchsia-500', redeemed: false },
  { id: '26', title: 'Long Drive', description: 'Valid for a scenic long drive with music', emoji: '🚗', gradient: 'from-cyan-400 to-teal-500', redeemed: false },
  { id: '27', title: 'Poetry Reading', description: 'Valid for me reading you romantic poetry', emoji: '📜', gradient: 'from-amber-400 to-yellow-500', redeemed: false },
  { id: '28', title: 'Picnic Date', description: 'Valid for a romantic picnic in the park', emoji: '🧺', gradient: 'from-green-400 to-lime-500', redeemed: false },
  { id: '29', title: 'Full Day Together', description: 'Valid for an entire day of just us', emoji: '💕', gradient: 'from-rose-400 to-pink-500', redeemed: false },
  { id: '30', title: 'Serenade', description: 'Valid for me singing your favorite song to you', emoji: '🎤', gradient: 'from-violet-400 to-purple-500', redeemed: false },
  // NEW COUPONS
  { id: '31', title: 'Back Massage', description: 'Valid for a 30-minute relaxing back massage', emoji: '💪', gradient: 'from-blue-400 to-indigo-500', redeemed: false },
  { id: '32', title: 'Bubble Bath', description: 'Valid for me preparing a romantic bubble bath', emoji: '🛁', gradient: 'from-pink-400 to-rose-500', redeemed: false },
  { id: '33', title: 'Binge Watch', description: 'Valid for watching your favorite series all day', emoji: '📺', gradient: 'from-purple-400 to-violet-500', redeemed: false },
  { id: '34', title: 'Forehead Kisses', description: 'Valid for unlimited forehead kisses on demand', emoji: '😘', gradient: 'from-rose-400 to-pink-500', redeemed: false },
  { id: '35', title: 'Breakfast Date', description: 'Valid for a cute breakfast date at your favorite cafe', emoji: '☕', gradient: 'from-amber-400 to-orange-500', redeemed: false },
  { id: '36', title: 'Hand Holding', description: 'Valid for holding hands everywhere we go', emoji: '🤝', gradient: 'from-emerald-400 to-teal-500', redeemed: false },
  { id: '37', title: 'Pillow Fort', description: 'Valid for building a cozy pillow fort together', emoji: '🏰', gradient: 'from-indigo-400 to-purple-500', redeemed: false },
  { id: '38', title: 'Sunset Watch', description: 'Valid for watching the sunset together', emoji: '🌅', gradient: 'from-orange-400 to-red-500', redeemed: false },
  { id: '39', title: 'Phone-Free Date', description: 'Valid for a complete phone-free romantic date', emoji: '💑', gradient: 'from-pink-400 to-rose-500', redeemed: false },
  { id: '40', title: 'Love Playlist', description: 'Valid for me making you a personalized love playlist', emoji: '🎵', gradient: 'from-violet-400 to-fuchsia-500', redeemed: false },
  { id: '41', title: 'Slow Dance', description: 'Valid for a romantic slow dance at home', emoji: '💫', gradient: 'from-rose-400 to-pink-500', redeemed: false },
  { id: '42', title: 'Temple Visit', description: 'Valid for a peaceful temple visit together', emoji: '🛕', gradient: 'from-amber-400 to-yellow-500', redeemed: false },
  { id: '43', title: 'Rain Dance', description: 'Valid for dancing in the rain together', emoji: '🌧️', gradient: 'from-blue-400 to-cyan-500', redeemed: false },
  { id: '44', title: 'Hot Chocolate', description: 'Valid for me making you hot chocolate on demand', emoji: '🍫', gradient: 'from-amber-500 to-orange-600', redeemed: false },
  { id: '45', title: 'Bedtime Story', description: 'Valid for me reading you a bedtime story', emoji: '📖', gradient: 'from-purple-400 to-indigo-500', redeemed: false },
  { id: '46', title: 'Flower Delivery', description: 'Valid for a surprise flower delivery', emoji: '💐', gradient: 'from-pink-400 to-rose-500', redeemed: false },
  { id: '47', title: 'Candlelit Dinner', description: 'Valid for a romantic candlelit dinner at home', emoji: '🕯️', gradient: 'from-amber-400 to-red-500', redeemed: false },
  { id: '48', title: 'Nose Kisses', description: 'Valid for unlimited cute nose kisses', emoji: '🐽', gradient: 'from-pink-300 to-rose-400', redeemed: false },
  { id: '49', title: 'Cheek Squishes', description: 'Valid for unlimited cheek squishing privileges', emoji: '🥰', gradient: 'from-rose-400 to-pink-500', redeemed: false },
  { id: '50', title: 'Forever Yours', description: 'Valid for my eternal love and devotion', emoji: '♾️', gradient: 'from-rose-500 to-red-600', redeemed: false },
];

const CouponModal = ({ coupon, onClose, onRedeem }: { coupon: Coupon; onClose: () => void; onRedeem: () => void }) => {
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
        initial={{ scale: 0.8, rotateY: -90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.8, rotateY: 90 }}
        className="relative max-w-sm w-full perspective-1000"
        onClick={e => e.stopPropagation()}
      >
        {/* Ticket design */}
        <div 
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${coupon.gradient}`}
          style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
        >
          {/* Perforated edge effect */}
          <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-black/90 rounded-full -ml-2" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-around">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-black/90 rounded-full -mr-2" />
            ))}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-6 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="px-8 py-8">
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-3"
              >
                {coupon.emoji}
              </motion.div>
              <div className="flex items-center justify-center gap-2 text-white/60 text-xs mb-2">
                <Ticket className="w-4 h-4" />
                <span>LOVE COUPON</span>
                <Ticket className="w-4 h-4" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {coupon.title}
              </h3>
            </div>

            {/* Description */}
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <p className="text-white text-center leading-relaxed">
                {coupon.description}
              </p>
            </div>

            {/* Fine print */}
            <div className="text-center text-white/60 text-xs mb-6">
              <p>✨ No expiration date</p>
              <p>💕 Can be used anytime</p>
              <p>🎁 Redeemable with a screenshot!</p>
            </div>

            {/* Redeem Button */}
            {!coupon.redeemed ? (
              <motion.button
                onClick={onRedeem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 rounded-2xl bg-white text-gray-800 font-bold flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5" />
                Mark as Redeemed
              </motion.button>
            ) : (
              <div className="w-full py-4 rounded-2xl bg-white/20 text-white font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Redeemed with Love!
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const PermissionSlips = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('love-coupons');
    return saved ? JSON.parse(saved) : initialCoupons;
  });
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    localStorage.setItem('love-coupons', JSON.stringify(coupons));
  }, [coupons]);

  const handleRedeem = (id: string) => {
    setCoupons(prev => prev.map(c => 
      c.id === id ? { ...c, redeemed: true } : c
    ));
    setSelectedCoupon(prev => prev ? { ...prev, redeemed: true } : null);
  };

  const redeemedCount = coupons.filter(c => c.redeemed).length;

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          🎫 Love Coupons
        </motion.h2>
        <p className="text-white/70 text-sm mb-2">
          Redeem anytime you need me 💕
        </p>
        <p className="text-pink-300 text-xs">
          Redeemed: {redeemedCount}/{coupons.length}
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-2 gap-3">
        {coupons.map((coupon, index) => (
          <motion.button
            key={coupon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCoupon(coupon)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative p-4 rounded-2xl bg-gradient-to-br ${coupon.gradient} text-left overflow-hidden`}
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            {/* Redeemed overlay */}
            {coupon.redeemed && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: -20 }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xs"
                >
                  REDEEMED ✓
                </motion.div>
              </div>
            )}

            <span className="text-3xl mb-2 block">{coupon.emoji}</span>
            <p className="text-white font-medium text-sm leading-tight">
              {coupon.title}
            </p>
            
            {/* Ticket icon */}
            <Ticket className="absolute bottom-2 right-2 w-5 h-5 text-white/30" />
          </motion.button>
        ))}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-2xl bg-white/10 text-center"
      >
        <p className="text-white/80 text-sm">
          💝 To redeem, just send me a screenshot! 
        </p>
        <p className="text-white/60 text-xs mt-1">
          These never expire. Use them whenever you need. 
        </p>
      </motion.div>

      <AnimatePresence>
        {selectedCoupon && (
          <CouponModal
            coupon={selectedCoupon}
            onClose={() => setSelectedCoupon(null)}
            onRedeem={() => handleRedeem(selectedCoupon.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
