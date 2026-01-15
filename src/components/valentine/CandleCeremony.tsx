import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CandleCeremony = () => {
  const [isLit, setIsLit] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const lightCandle = () => {
    setIsLit(true);
    // Gradually increase glow
    let intensity = 0;
    const interval = setInterval(() => {
      intensity += 0.1;
      setGlowIntensity(Math.min(intensity, 1));
      if (intensity >= 1) clearInterval(interval);
    }, 100);
  };

  return (
    <div className="relative flex flex-col items-center py-8">
      {/* Ambient glow */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="absolute inset-0 rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: glowIntensity * 0.3 }}
            style={{
              background: "radial-gradient(circle at center 30%, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.1) 40%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Candle */}
      <div className="relative">
        {/* Flame */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-amber-400/30 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Flame shape */}
              <motion.div
                className="relative"
                animate={{
                  scaleY: [1, 1.1, 0.95, 1],
                  scaleX: [1, 0.95, 1.05, 1],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <div className="w-6 h-10 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full transform rotate-0"
                  style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  }}
                />
                {/* Inner flame */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-blue-400 to-white rounded-full opacity-80" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wick */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-800 rounded-full" />

        {/* Candle body */}
        <div className="w-12 h-24 bg-gradient-to-b from-rose-100 to-rose-200 rounded-lg shadow-lg relative overflow-hidden">
          {/* Wax drips */}
          <div className="absolute top-0 left-1 w-2 h-4 bg-rose-50 rounded-b-full" />
          <div className="absolute top-0 right-2 w-1.5 h-3 bg-rose-50 rounded-b-full" />
          
          {/* Heart decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-50">
            💕
          </div>
        </div>

        {/* Candle holder */}
        <div className="w-16 h-3 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg mx-auto -mt-1 shadow-md" />
        <div className="w-20 h-2 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg mx-auto shadow-md" />
      </div>

      {/* Light button or message */}
      <motion.div className="mt-8 text-center">
        {!isLit ? (
          <motion.button
            onClick={lightCandle}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🕯️ Light the Candle of Love
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-amber-700 font-serif text-lg">
              This flame represents our eternal love
            </p>
            <motion.p
              className="text-amber-600 italic text-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "May it never fade..."
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
