import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicKiss = () => {
  const [kissed, setKissed] = useState(false);
  const [kissCount, setKissCount] = useState(0);
  const [kissType, setKissType] = useState<'gentle' | 'passionate' | 'playful'>('passionate');
  const videoRef = useRef<HTMLVideoElement>(null);

  const sendKiss = () => {
    setKissed(true);
    setKissCount(prev => prev + 1);

    // Play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }

    // Vibrate - different patterns for each kiss type
    if ('vibrate' in navigator) {
      const patterns = {
        gentle: [30, 50, 30],
        passionate: [50, 30, 50, 30, 100, 50, 150],
        playful: [20, 20, 40, 20, 40, 20, 80]
      };
      navigator.vibrate(patterns[kissType]);
    }

    setTimeout(() => {
      setKissed(false);
    }, 6000);
  };

  const kissMessages = {
    gentle: "Soft as a whisper, sweet as forever...",
    passionate: "Where magic happens, sweetheart... 💋",
    playful: "Stolen kisses are the sweetest, babe!"
  };

  const kissEmojis = {
    gentle: ['💋', '💕', '🌸', '✨', '🦋'],
    passionate: ['💋', '❤️', '🔥', '💗', '💓'],
    playful: ['💋', '😘', '💝', '💖', '🥰']
  };

  return (
    <div className="relative text-center space-y-6">
      {/* Kiss Video Container - 3D Enhanced */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-red-900/30 to-pink-900/30">
        
        {/* Romantic sunset background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,100,100,0.15) 0%, rgba(255,50,100,0.2) 50%, rgba(200,50,100,0.15) 100%)',
          }}
          animate={kissed ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.2 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* 3D Pulsing Heart Rings */}
        <AnimatePresence>
          {kissed && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ 
                    scale: [0, 3],
                    opacity: [0.8, 0],
                    rotateZ: [0, 15 * (i % 2 ? 1 : -1)]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.2, 
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <span className="text-5xl">💋</span>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Real Romantic Kiss Video */}
        <motion.div
          className="relative z-10 w-full h-full overflow-hidden rounded-2xl"
          initial={{ scale: 1 }}
          animate={kissed ? { 
            scale: 1.1, 
            rotateY: [-3, 3, -3]
          } : { scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ 
              objectPosition: 'center 25%',
              filter: kissed ? 'brightness(1.2) saturate(1.4)' : 'brightness(1)'
            }}
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800"
          >
            <source src="https://player.vimeo.com/external/368484050.sd.mp4?s=73ed0f0f3e1e3c1a7e8e9d7c3f3e4d5c6b7a8b9c&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          
          {/* Fallback image when video not playing */}
          {!kissed && (
            <img
              src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800"
              alt="Romantic couple kissing"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{ objectPosition: 'center 25%' }}
            />
          )}
          
          {/* Pink glow overlay when kissing */}
          <motion.div 
            className="absolute inset-0 bg-gradient-radial from-pink-500/50 via-red-400/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: kissed ? [0.5, 0.8, 0.5] : 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>

        {/* Kiss Effect - 3D Enhanced */}
        <AnimatePresence>
          {kissed && (
            <>
              {/* Heart explosion with 3D depth */}
              {[...Array(30)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl z-20"
                  initial={{ scale: 0, opacity: 1, x: 0, y: -20 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 12 * Math.PI / 180) * 160,
                    y: Math.sin(i * 12 * Math.PI / 180) * 160 - 20,
                    rotateZ: [0, 180],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, delay: i * 0.03 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {kissEmojis[kissType][i % 5]}
                </motion.span>
              ))}

              {/* Romantic 3D glow */}
              <motion.div
                className="absolute w-80 h-80 bg-gradient-radial from-red-400/60 via-pink-400/40 to-transparent rounded-full blur-3xl z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2.5, 2], 
                  opacity: [0, 1, 0.7],
                  rotateZ: [0, 30]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              />

              {/* Kiss emoji at center - 3D pop */}
              <motion.span
                className="absolute text-7xl z-30"
                initial={{ scale: 0, opacity: 0, rotateY: -180 }}
                animate={{ 
                  scale: [0, 2.2, 1.8], 
                  opacity: 1,
                  rotateY: [180, 0, -10, 10, 0],
                  rotateZ: [0, 15, -15, 0]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                💋
              </motion.span>

              {/* Sparkle ring with 3D */}
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={`sparkle-${i}`}
                  className="absolute text-xl z-25"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 30 * Math.PI / 180) * 80,
                    y: Math.sin(i * 30 * Math.PI / 180) * 80,
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.4 + i * 0.05,
                    repeat: 3,
                    repeatDelay: 0.3
                  }}
                >
                  ✨
                </motion.span>
              ))}

              {/* Romantic text with 3D glow */}
              <motion.p
                className="absolute bottom-8 text-white font-serif text-xl z-30 drop-shadow-2xl"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  textShadow: ['0 0 10px rgba(255,105,180,0.5)', '0 0 30px rgba(255,105,180,0.8)', '0 0 10px rgba(255,105,180,0.5)']
                }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
              >
                {kissMessages[kissType]}
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Kiss Type Selector */}
      <div className="flex justify-center gap-3">
        {(['gentle', 'passionate', 'playful'] as const).map((type) => (
          <motion.button
            key={type}
            onClick={() => setKissType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              kissType === type
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type === 'gentle' && '🌸 Gentle'}
            {type === 'passionate' && '💋 Passionate'}
            {type === 'playful' && '😘 Playful'}
          </motion.button>
        ))}
      </div>

      {/* Kiss Button - 3D Enhanced */}
      <motion.button
        onClick={sendKiss}
        disabled={kissed}
        className={`px-10 py-5 rounded-full font-medium text-lg shadow-2xl transition-all ${
          kissed 
            ? "bg-pink-300 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-pink-500/40"
        }`}
        whileHover={!kissed ? { scale: 1.08, rotateZ: [-1, 1, -1] } : {}}
        whileTap={!kissed ? { scale: 0.92 } : {}}
        style={{ 
          boxShadow: '0 15px 40px rgba(236, 72, 153, 0.4)',
          transformStyle: 'preserve-3d'
        }}
      >
        {kissed ? "💋 Sending love..." : "Send a Passionate Kiss to Babe 💋"}
      </motion.button>

      {/* Kiss Counter */}
      <motion.p
        className="text-pink-400 font-medium text-lg"
        animate={{ scale: kissCount > 0 ? [1, 1.15, 1] : 1 }}
        key={kissCount}
      >
        {kissCount > 0 && `You've sent ${kissCount} magical kisses to sweetheart! 💕`}
      </motion.p>

      {/* Romantic Message */}
      <AnimatePresence mode="wait">
        {kissed && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-red-400 font-serif italic text-lg"
          >
            "In your kiss, I taste forever, my love..."
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
