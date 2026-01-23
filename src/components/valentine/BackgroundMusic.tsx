import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Volume2, Heart } from "lucide-react";

interface BackgroundMusicProps {
  autoPlay?: boolean;
}

export const BackgroundMusic = ({ autoPlay = true }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showControls, setShowControls] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Taylor Swift - Lover (user should add lover-music.mp3 to public folder)
    // Or use a royalty-free romantic track as fallback
    audioRef.current = new Audio("/lover-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Fallback to romantic music if custom file doesn't exist
    audioRef.current.onerror = () => {
      if (audioRef.current) {
        // Using a free romantic instrumental as fallback
        audioRef.current.src = "https://www.bensound.com/bensound-music/bensound-love.mp3";
        audioRef.current.load();
      }
    };

    // Auto-play attempt on first user interaction
    const handleFirstInteraction = () => {
      if (!hasInteracted && autoPlay && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setShowTooltip(false);
          })
          .catch(() => {
            // Autoplay blocked - show tooltip
            setShowTooltip(true);
          });
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // Hide tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => setShowTooltip(false), 5000);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      clearTimeout(tooltipTimer);
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
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-16 right-0 bg-rose-500 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
            >
              🎵 Tap for music
              <div className="absolute -bottom-1 right-5 w-2 h-2 bg-rose-500 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume Slider */}
        <AnimatePresence>
          {showControls && isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-4 h-4 text-rose-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
              <p className="text-xs text-center text-rose-600 font-medium">
                {Math.round(volume * 100)}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music Button */}
        <motion.button
          onClick={toggleMusic}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all border-2 ${
            isPlaying 
              ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white border-pink-300" 
              : "bg-white/90 backdrop-blur-xl text-rose-400 border-rose-200 hover:border-rose-400"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isPlaying ? { 
            boxShadow: ["0 0 0 0 rgba(236, 72, 153, 0.4)", "0 0 0 15px rgba(236, 72, 153, 0)"]
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
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, (i - 1.5) * 15],
                    y: -35,
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.35,
                  }}
                  style={{ left: "50%", bottom: "100%" }}
                >
                  {i % 2 === 0 ? (
                    <span className="text-pink-400 text-sm">♪</span>
                  ) : (
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  )}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
