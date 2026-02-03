import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicHug = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [hugIntensity, setHugIntensity] = useState<'gentle' | 'warm' | 'tight'>('warm');
  const videoRef = useRef<HTMLVideoElement>(null);

  const sendHug = () => {
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    
    // Play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    
    // Vibrate pattern like a heartbeat - stronger for tight hugs
    if ('vibrate' in navigator) {
      const patterns = {
        gentle: [50, 100, 50],
        warm: [100, 100, 100, 100, 200],
        tight: [200, 50, 200, 50, 300, 50, 300]
      };
      navigator.vibrate(patterns[hugIntensity]);
    }

    setTimeout(() => setIsHugging(false), 6000);
  };

  const hugMessages = {
    gentle: "Soft and tender, like a butterfly's touch...",
    warm: "In your arms, I'm home, sweetheart...",
    tight: "Never letting go, holding you forever, babe..."
  };

  return (
    <div className="relative text-center space-y-6">
      {/* Cinematic Hug Video Container */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-orange-900/30 to-rose-900/30">
        
        {/* Romantic background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-orange-500/10"
          animate={isHugging ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.2 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* 3D Pulsing Ring Effect */}
        <AnimatePresence>
          {isHugging && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-pink-400/50"
                  initial={{ width: 100, height: 100, opacity: 0.8 }}
                  animate={{ 
                    width: 400 + i * 50, 
                    height: 400 + i * 50, 
                    opacity: 0,
                    rotateX: 45
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.3, 
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Real Romantic Couple Hug Video */}
        <motion.div
          className="relative z-10 w-full h-full overflow-hidden rounded-2xl"
          initial={{ scale: 1, rotateY: 0 }}
          animate={isHugging ? { 
            scale: 1.08, 
            rotateY: [-2, 2, -2],
          } : { scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'center 30%',
              filter: isHugging ? 'brightness(1.2) saturate(1.3)' : 'brightness(1)'
            }}
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800"
          >
            <source src="https://player.vimeo.com/external/371834002.sd.mp4?s=8b72ece00e76c68de5f64f88e04e3a9e3e58fcbc&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          
          {/* Fallback image when video not playing */}
          {!isHugging && (
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800"
              alt="Romantic couple embracing"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{ objectPosition: 'center 30%' }}
            />
          )}
          
          {/* Warm glow overlay when hugging */}
          <motion.div 
            className="absolute inset-0 bg-gradient-radial from-pink-500/40 via-orange-400/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHugging ? [0.4, 0.7, 0.4] : 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>

        {/* Hug Effect - Enhanced 3D */}
        <AnimatePresence>
          {isHugging && (
            <>
              {/* Heart burst with 3D depth */}
              {[...Array(25)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl z-20"
                  style={{ transformStyle: 'preserve-3d' }}
                  initial={{ scale: 0, opacity: 1, z: 0 }}
                  animate={{
                    scale: [0, 1.8, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 14.4 * Math.PI / 180) * 150,
                    y: Math.sin(i * 14.4 * Math.PI / 180) * 150,
                    z: [0, 100, 0],
                    rotateZ: [0, 180],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, delay: i * 0.04 }}
                >
                  {['🫂', '💕', '✨', '💗', '🤗', '💖'][i % 6]}
                </motion.span>
              ))}

              {/* Warm 3D glow */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-radial from-pink-400/60 via-orange-300/40 to-transparent rounded-full blur-3xl z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3, 2.5], 
                  opacity: [0, 1, 0.8],
                  rotateZ: [0, 45]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* Embraced heart - 3D pop */}
              <motion.span
                className="absolute text-8xl z-30"
                initial={{ scale: 0, opacity: 0, y: 50, rotateY: -90 }}
                animate={{ 
                  scale: [0, 1.6, 1.2], 
                  opacity: 1, 
                  y: 0,
                  rotateY: [90, 0, -5, 5, 0]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                🫂
              </motion.span>

              {/* "Together" text with 3D effect */}
              <motion.p
                className="absolute bottom-8 text-white font-serif text-xl z-30 drop-shadow-2xl"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  textShadow: ['0 0 10px rgba(255,182,193,0.5)', '0 0 30px rgba(255,182,193,0.8)', '0 0 10px rgba(255,182,193,0.5)']
                }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
              >
                {hugMessages[hugIntensity]}
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Hug Intensity Selector */}
      <div className="flex justify-center gap-3">
        {(['gentle', 'warm', 'tight'] as const).map((type) => (
          <motion.button
            key={type}
            onClick={() => setHugIntensity(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              hugIntensity === type
                ? 'bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type === 'gentle' && '🤗 Gentle'}
            {type === 'warm' && '🫂 Warm'}
            {type === 'tight' && '💕 Tight'}
          </motion.button>
        ))}
      </div>

      {/* Hug Button - 3D enhanced */}
      <motion.button
        onClick={sendHug}
        disabled={isHugging}
        className={`px-10 py-5 rounded-full font-medium text-lg shadow-2xl transition-all ${
          isHugging 
            ? "bg-pink-300 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-orange-400 to-rose-500 text-white hover:shadow-2xl hover:shadow-rose-500/40"
        }`}
        whileHover={!isHugging ? { scale: 1.08, rotateZ: [-1, 1, -1] } : {}}
        whileTap={!isHugging ? { scale: 0.92 } : {}}
        style={{ 
          boxShadow: '0 15px 40px rgba(251, 146, 60, 0.4)',
          transformStyle: 'preserve-3d'
        }}
      >
        {isHugging ? "🤗 Feeling the warmth..." : "Send a Tight Hug to Sweetheart 🫂"}
      </motion.button>

      {/* Hug Counter */}
      <motion.p
        className="text-orange-400 font-medium text-lg"
        animate={{ scale: hugCount > 0 ? [1, 1.15, 1] : 1 }}
        key={hugCount}
      >
        {hugCount > 0 && `You've sent ${hugCount} warm hugs to sweetheart! 💕`}
      </motion.p>

      {/* Message */}
      <AnimatePresence>
        {isHugging && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-orange-300 font-serif italic text-lg"
          >
            "In your hug, I find my peace, babe..."
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
