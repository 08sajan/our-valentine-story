import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, X, Heart, Maximize2 } from "lucide-react";
import ReactDOM from "react-dom";

// Import memories
import memory1 from "@/assets/memories/memory-1.jpg";
import memory2 from "@/assets/memories/memory-2.png";
import memory3 from "@/assets/memories/memory-3.png";
import memory4 from "@/assets/memories/memory-4.png";
import memory5 from "@/assets/memories/memory-5.png";
import memory6 from "@/assets/memories/memory-6.png";
import memory7 from "@/assets/memories/memory-7.jpg";
import memory8 from "@/assets/memories/memory-8.jpg";
import memory9 from "@/assets/memories/memory-9.jpg";
import memory10 from "@/assets/memories/memory-10.jpg";
import memory11 from "@/assets/memories/memory-11.jpg";

interface Photo {
  url: string;
  caption: string;
}

const memoriesData: Photo[] = [
  { url: memory1, caption: "My favorite view - You on my screen 💕" },
  { url: memory2, caption: "Even eating makes you look cute 😍" },
  { url: memory3, caption: "Sleepy Puntuu is the cutest 💤" },
  { url: memory4, caption: "Peaceful dreams, my love 🌙" },
  { url: memory5, caption: "That smile that makes my day ✨" },
  { url: memory6, caption: "Missing you every second 💕" },
  { url: memory7, caption: "Beautiful like a flower garden 🌺" },
  { url: memory8, caption: "That innocent smile I fell for 🥰" },
  { url: memory9, caption: "My gorgeous girl 💖" },
  { url: memory10, caption: "So proud of my graduate! 🎓" },
  { url: memory11, caption: "Traditional beauty that melts my heart ❤️" },
];

interface KenBurnsSlideshowProps {
  photos?: Photo[];
  autoPlayInterval?: number;
}

export const KenBurnsSlideshow = ({ 
  photos = memoriesData, 
  autoPlayInterval = 5000 
}: KenBurnsSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, autoPlayInterval]);

  // Hide controls after inactivity in fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    
    let timeout: NodeJS.Timeout;
    const hideControls = () => {
      timeout = setTimeout(() => setShowControls(false), 3000);
    };
    
    const showControlsOnMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      hideControls();
    };
    
    hideControls();
    window.addEventListener('mousemove', showControlsOnMove);
    window.addEventListener('touchstart', showControlsOnMove);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', showControlsOnMove);
      window.removeEventListener('touchstart', showControlsOnMove);
    };
  }, [isFullscreen]);

  const SlideshowContent = ({ fullscreen = false }: { fullscreen?: boolean }) => (
    <div 
      className={`relative overflow-hidden ${
        fullscreen 
          ? 'w-full h-full' 
          : 'aspect-video rounded-2xl'
      }`}
      onMouseEnter={() => setShowControls(true)}
    >
      {/* Background blur layer */}
      <div className="absolute inset-0 bg-black">
        <img
          src={photos[currentIndex].url}
          alt=""
          className="w-full h-full object-cover blur-2xl opacity-50 scale-110"
        />
      </div>

      {/* Main image with simple fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption}
            className={`${fullscreen ? 'max-h-[75vh] max-w-[95vw]' : 'w-full h-full'} object-contain z-10`}
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-20" style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)'
      }} />

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`caption-${currentIndex}`}
          className="absolute bottom-24 left-0 right-0 z-30 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6">
            <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 mx-auto max-w-md">
              <p className={`text-white text-center font-serif ${fullscreen ? 'text-xl' : 'text-base'}`}>
                {photos[currentIndex].caption}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 z-40 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        style={{ pointerEvents: showControls ? 'auto' : 'none' }}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-2 text-white">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <span className="font-serif text-sm">Our Memories</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-sm bg-black/40 px-3 py-1 rounded-full">
              {currentIndex + 1} / {photos.length}
            </span>
            {!fullscreen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(true);
                }}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors border border-white/30"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            )}
            {fullscreen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                }}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors border border-white/30"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Center play/pause */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="p-4 rounded-full bg-black/50 backdrop-blur-md text-white border-2 border-white/40 hover:bg-black/70 transition-all shadow-xl"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-1" />
            )}
          </button>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 backdrop-blur-md text-white border-2 border-white/40 hover:bg-black/70 transition-all shadow-xl"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 backdrop-blur-md text-white border-2 border-white/40 hover:bg-black/70 transition-all shadow-xl"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Progress dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-8 shadow-lg' 
                  : 'bg-white/40 w-2 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Regular slideshow */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-serif text-rose-300 flex items-center justify-center gap-2">
            ✨ Photo Slideshow ✨
          </h3>
          <p className="text-white/50 text-xs mt-1">
            Relive our beautiful moments 💕
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.25)' }}
        >
          <SlideshowContent />
        </div>

        {/* Thumbnail strip */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-2 px-4">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? "border-pink-400 ring-2 ring-pink-400/50 scale-110" 
                  : "border-white/30 opacity-60 hover:opacity-100"
              }`}
            >
              <img 
                src={photo.url} 
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen portal */}
      {isFullscreen && ReactDOM.createPortal(
        <motion.div
          className="fixed inset-0 z-[200] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SlideshowContent fullscreen />
        </motion.div>,
        document.body
      )}
    </>
  );
};
