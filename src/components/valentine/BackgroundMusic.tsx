import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Volume2 } from "lucide-react";

interface BackgroundMusicProps {
  autoPlay?: boolean;
}

export const BackgroundMusic = ({ autoPlay = true }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("https://www.bensound.com/bensound-music/bensound-love.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Auto-play attempt on first user interaction
    const handleFirstInteraction = () => {
      if (!hasInteracted && autoPlay && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked
          });
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [autoPlay, hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        {/* Volume Slider */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <p className="text-xs text-center mt-2 text-pink-600">
                {Math.round(volume * 100)}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music Button */}
        <motion.button
          onClick={toggleMusic}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${
            isPlaying 
              ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white" 
              : "bg-white/80 backdrop-blur-xl text-gray-500"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isPlaying ? { 
            boxShadow: ["0 0 0 0 rgba(236, 72, 153, 0.4)", "0 0 0 20px rgba(236, 72, 153, 0)"]
          } : {}}
          transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? (
            <Music className="w-6 h-6" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </motion.button>

        {/* Music Note Animation */}
        <AnimatePresence>
          {isPlaying && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-400 pointer-events-none"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, (i - 1) * 20],
                    y: -40,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  style={{ left: "50%", bottom: "100%" }}
                >
                  ♪
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
