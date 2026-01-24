import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicHug = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sendHug = () => {
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    
    // Play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    
    // Vibrate pattern like a heartbeat
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 100, 100, 100, 200]);
    }

    setTimeout(() => setIsHugging(false), 6000);
  };

  return (
    <div className="relative text-center space-y-6">
      {/* Cinematic Hug Video Container */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-orange-900/30 to-rose-900/30">
        
        {/* Romantic background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-orange-500/10"
          animate={isHugging ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Real Romantic Couple Hug Video */}
        <motion.div
          className="relative z-10 w-full h-full overflow-hidden"
          initial={{ scale: 1 }}
          animate={isHugging ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'center 30%',
              filter: isHugging ? 'brightness(1.1) saturate(1.2)' : 'brightness(1)'
            }}
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800"
          >
            {/* Using romantic couple video */}
            <source src="https://player.vimeo.com/external/371834002.sd.mp4?s=8b72ece00e76c68de5f64f88e04e3a9e3e58fcbc&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
            {/* Fallback image */}
            Your browser does not support the video tag.
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
            className="absolute inset-0 bg-gradient-radial from-pink-500/30 via-orange-400/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHugging ? 0.6 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Hug Effect */}
        <AnimatePresence>
          {isHugging && (
            <>
              {/* Heart burst */}
              {[...Array(20)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl z-20"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 18 * Math.PI / 180) * 130,
                    y: Math.sin(i * 18 * Math.PI / 180) * 130,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.04 }}
                >
                  {i % 4 === 0 ? "🫂" : i % 4 === 1 ? "💕" : i % 4 === 2 ? "✨" : "💗"}
                </motion.span>
              ))}

              {/* Warm glow */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-radial from-pink-400/50 via-orange-300/30 to-transparent rounded-full blur-3xl z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />

              {/* Embraced heart */}
              <motion.span
                className="absolute text-7xl z-30"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: [0, 1.5, 1], opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                🫂
              </motion.span>

              {/* "Together" text */}
              <motion.p
                className="absolute bottom-6 text-white font-serif text-lg z-30 drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
              >
                In your arms, I'm home 💕
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Hug Button */}
      <motion.button
        onClick={sendHug}
        disabled={isHugging}
        className={`px-8 py-4 rounded-full font-medium text-lg shadow-xl transition-all ${
          isHugging 
            ? "bg-pink-300 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-orange-400 to-rose-500 text-white hover:shadow-2xl hover:shadow-rose-500/30"
        }`}
        whileHover={!isHugging ? { scale: 1.05 } : {}}
        whileTap={!isHugging ? { scale: 0.95 } : {}}
      >
        {isHugging ? "🤗 Feeling the warmth..." : "Send a Tight Hug 🫂"}
      </motion.button>

      {/* Hug Counter */}
      <motion.p
        className="text-orange-400 font-medium"
        animate={{ scale: hugCount > 0 ? [1, 1.1, 1] : 1 }}
        key={hugCount}
      >
        {hugCount > 0 && `You've sent ${hugCount} warm hugs to Puntuu! 💕`}
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
            "In your hug, I find my peace..."
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
