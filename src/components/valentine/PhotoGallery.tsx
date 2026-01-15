import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";

interface Photo {
  url: string;
  caption: string;
}

// Placeholder photos - replace with actual photos
const defaultPhotos: Photo[] = [
  { url: "/placeholder.svg", caption: "Our first adventure together 💕" },
  { url: "/placeholder.svg", caption: "That magical sunset we watched 🌅" },
  { url: "/placeholder.svg", caption: "Your beautiful smile ✨" },
  { url: "/placeholder.svg", caption: "Making memories every day 💖" },
  { url: "/placeholder.svg", caption: "Forever grateful for you 🥰" },
];

interface PhotoGalleryProps {
  photos?: Photo[];
}

export const PhotoGallery = ({ photos = defaultPhotos }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [direction, setDirection] = useState(0);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === photos.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? photos.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-red-600 text-center flex items-center justify-center gap-2">
        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        Our Memories Together
        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
      </h3>

      {/* Thumbnail strip */}
      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        {photos.map((photo, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex 
                ? "border-pink-500 ring-2 ring-pink-300" 
                : "border-white/50 opacity-60 hover:opacity-100"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={photo.url} 
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Main photo display */}
      <div className="relative">
        <motion.div 
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 cursor-pointer shadow-lg"
          onClick={() => setIsExpanded(true)}
          whileHover={{ scale: 1.02 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentIndex}
              src={photos[currentIndex].url}
              alt={photos[currentIndex].caption}
              className="w-full h-full object-cover"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Caption overlay */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`caption-${currentIndex}`}
          >
            <p className="text-white text-center font-medium">
              {photos[currentIndex].caption}
            </p>
          </motion.div>

          {/* Photo counter */}
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {photos.length}
          </div>
        </motion.div>

        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(1); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-pink-500 w-6" 
                : "bg-pink-200 hover:bg-pink-300"
            }`}
          />
        ))}
      </div>

      {/* Expanded view modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
              onClick={() => setIsExpanded(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
            
            <motion.p 
              className="absolute bottom-8 text-white text-center text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {photos[currentIndex].caption}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
