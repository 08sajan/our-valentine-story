import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Sparkles, X, Download, Trash2, Image, RotateCcw, FlipHorizontal } from "lucide-react";
import ReactDOM from "react-dom";

interface SavedPhoto {
  id: string;
  dataUrl: string;
  timestamp: number;
  filter: string;
  frame: string;
}

// Photo filters
const filters = [
  { id: 'none', name: 'Original', style: '' },
  { id: 'warm', name: 'Warm Love', style: 'sepia(20%) saturate(130%) brightness(105%)' },
  { id: 'romantic', name: 'Romantic', style: 'saturate(140%) brightness(108%) contrast(95%) hue-rotate(-5deg)' },
  { id: 'dreamy', name: 'Dreamy', style: 'brightness(112%) contrast(88%) saturate(80%) blur(0.5px)' },
  { id: 'vintage', name: 'Vintage', style: 'sepia(35%) contrast(115%) brightness(95%)' },
  { id: 'bw', name: 'Classic B&W', style: 'grayscale(100%) contrast(115%)' },
  { id: 'pink', name: 'Pink Glow', style: 'saturate(120%) hue-rotate(-10deg) brightness(105%)' },
  { id: 'golden', name: 'Golden Hour', style: 'sepia(15%) saturate(140%) brightness(108%) contrast(95%)' },
];

// Romantic frames
const frames = [
  { id: 'hearts', name: '💕 Hearts', border: '8px solid #ff69b4', shadow: '0 0 30px rgba(255,105,180,0.5)' },
  { id: 'gold', name: '✨ Golden', border: '8px solid #ffd700', shadow: '0 0 30px rgba(255,215,0,0.5)' },
  { id: 'rose', name: '🌹 Rose', border: '8px solid #c41e3a', shadow: '0 0 30px rgba(196,30,58,0.5)' },
  { id: 'lavender', name: '💜 Lavender', border: '8px solid #dda0dd', shadow: '0 0 30px rgba(221,160,221,0.5)' },
  { id: 'simple', name: '🤍 Simple', border: '4px solid white', shadow: '0 0 20px rgba(255,255,255,0.3)' },
];

const STORAGE_KEY = 'puntuu-photos';

// Camera Modal Component
const CameraModal = ({
  onCapture,
  onClose,
  selectedFilter,
  selectedFrame
}: {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
  selectedFilter: typeof filters[0];
  selectedFrame: typeof frames[0];
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMirrored, setIsMirrored] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera access to take photos.');
    }
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    // Start countdown
    setCountdown(3);
    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);
        
        // Actual capture
        const video = videoRef.current!;
        const canvas = canvasRef.current!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d')!;
        
        if (isMirrored) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        
        ctx.drawImage(video, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl);
        
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    }, 1000);
  }, [isMirrored, onCapture]);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1a0505 0%, #2d1f3d 50%, #1a0a1a 100%)',
      }}
    >
      {/* Header */}
      <div style={{
        flexShrink: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        padding: '16px',
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <motion.button
          onClick={onClose}
          style={{
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} />
        </motion.button>
        
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-rose-400" />
          <span style={{ color: 'white', fontFamily: 'serif' }}>Take a Photo 📸</span>
        </div>
        
        <motion.button
          onClick={() => setIsMirrored(!isMirrored)}
          style={{
            padding: '10px',
            background: isMirrored ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FlipHorizontal size={20} />
        </motion.button>
      </div>

      {/* Camera View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        {error ? (
          <div className="text-center text-white p-6">
            <p className="text-rose-400 mb-4">{error}</p>
            <motion.button
              onClick={startCamera}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white"
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Try Again
            </motion.button>
          </div>
        ) : (
          <motion.div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              maxWidth: '400px',
              width: '100%',
              border: selectedFrame.border,
              boxShadow: selectedFrame.shadow,
            }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                transform: isMirrored ? 'scaleX(-1)' : 'none',
                filter: selectedFilter.style,
              }}
            />
            
            {/* Countdown overlay */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.5)',
                  }}
                >
                  <span style={{ fontSize: '8rem', color: 'white', fontWeight: 'bold' }}>
                    {countdown}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Capture Button */}
        {!error && (
          <motion.button
            onClick={capturePhoto}
            disabled={countdown !== null}
            style={{
              marginTop: '30px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              border: '4px solid white',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(236,72,153,0.5)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ boxShadow: ['0 10px 40px rgba(236,72,153,0.5)', '0 10px 60px rgba(236,72,153,0.7)', '0 10px 40px rgba(236,72,153,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Camera className="w-8 h-8 text-white mx-auto" />
          </motion.button>
        )}
      </div>

      {/* Filter selector at bottom */}
      <div style={{
        flexShrink: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        padding: '16px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      }}>
        <p className="text-white/60 text-xs text-center mb-2">Selected: {selectedFilter.name} • {selectedFrame.name}</p>
      </div>
    </motion.div>,
    document.body
  );
};

const SECRET_PASSWORD = 'Anjalisajan';

// Password Modal for Photo Deletion
const DeletePasswordModal = ({
  onSuccess,
  onCancel
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
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
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999999] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: error ? [1, 1.02, 0.98, 1] : 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-rose-900/80 to-pink-900/80 rounded-2xl p-6 w-full max-w-sm border border-pink-400/30"
      >
        <div className="text-center mb-4">
          <Trash2 className="w-12 h-12 text-red-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-rose-100">Delete Photo 🗑️</h3>
          <p className="text-rose-300/70 text-sm">Enter password to delete</p>
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
          <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 rounded-xl font-semibold">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// Photo View Modal
const PhotoViewModal = ({
  photo,
  onClose,
  onDelete
}: {
  photo: SavedPhoto;
  onClose: () => void;
  onDelete: () => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.download = `puntuu-memory-${Date.now()}.jpg`;
    link.href = photo.dataUrl;
    link.click();
  };

  const handleDeleteRequest = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    onDelete();
  };

  return ReactDOM.createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(20px)',
        }}
        onClick={onClose}
      >
        {/* Floating hearts */}
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              fontSize: '1.5rem',
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              pointerEvents: 'none',
            }}
            animate={{
              y: [0, -800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['💕', '✨', '💗', '🌟', '💖'][i % 5]}
          </motion.span>
        ))}

        {/* Header */}
        <div style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.5)',
          padding: '16px',
          paddingTop: 'max(16px, env(safe-area-inset-top))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <motion.button
            onClick={onClose}
            style={{
              padding: '10px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>
          
          <span style={{ color: 'white', fontFamily: 'serif' }}>
            Our Memory 💕
          </span>
          
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleDeleteRequest(); }}
            style={{
              padding: '10px',
              background: 'rgba(239,68,68,0.2)',
              borderRadius: '50%',
              color: '#ef4444',
              border: 'none',
              cursor: 'pointer',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={20} />
          </motion.button>
        </div>

        {/* Photo */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
          <motion.img
            src={photo.dataUrl}
            alt="Memory"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '24px',
              boxShadow: '0 25px 80px rgba(236,72,153,0.3)',
            }}
          />
        </div>

        {/* Actions */}
        <div style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.5)',
          padding: '16px',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
        }}>
          <motion.button
            onClick={(e) => { e.stopPropagation(); downloadPhoto(); }}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              borderRadius: '9999px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Download
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Password Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeletePasswordModal
            onSuccess={handleDeleteConfirm}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};

export const PhotoBooth = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);
  const [viewingPhoto, setViewingPhoto] = useState<SavedPhoto | null>(null);

  // Load saved photos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedPhotos(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load photos');
      }
    }
  }, []);

  // Save photos to localStorage
  const savePhotos = (photos: SavedPhoto[]) => {
    setSavedPhotos(photos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  };

  const handleCapture = (dataUrl: string) => {
    const newPhoto: SavedPhoto = {
      id: Date.now().toString(),
      dataUrl,
      timestamp: Date.now(),
      filter: filters[selectedFilter].name,
      frame: frames[selectedFrame].name,
    };
    savePhotos([newPhoto, ...savedPhotos]);
    setShowCamera(false);
  };

  const handleDelete = (id: string) => {
    savePhotos(savedPhotos.filter(p => p.id !== id));
    setViewingPhoto(null);
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
          className="text-4xl mb-2"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📸
        </motion.div>
        <h3 className="text-lg font-serif text-rose-300 mb-1">
          Our Photo Booth
        </h3>
        <p className="text-white/60 text-xs">
          Take real photos and save our memories forever 💕
        </p>
      </motion.div>

      {/* Take Photo Button */}
      <motion.button
        onClick={() => setShowCamera(true)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium flex items-center justify-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.4)' }}
      >
        <Camera className="w-6 h-6" />
        Take a Photo Together
        <Sparkles className="w-5 h-5" />
      </motion.button>

      {/* Filter Selection */}
      <div>
        <p className="text-white/60 text-xs mb-2">Choose a filter:</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedFilter === index
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Frame Selection */}
      <div>
        <p className="text-white/60 text-xs mb-2">Choose a frame:</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {frames.map((frame, index) => (
            <motion.button
              key={frame.id}
              onClick={() => setSelectedFrame(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedFrame === index
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {frame.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Saved Photos Gallery */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/80 text-sm font-medium flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            Our Memories ({savedPhotos.length})
          </p>
        </div>

        {savedPhotos.length === 0 ? (
          <motion.div
            className="text-center py-12 bg-white/5 rounded-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/50 text-sm">No photos yet!</p>
            <p className="text-white/30 text-xs">Take your first photo together 💕</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {savedPhotos.map((photo, index) => (
              <motion.button
                key={photo.id}
                onClick={() => setViewingPhoto(photo)}
                className="relative aspect-square rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={photo.dataUrl}
                  alt="Memory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Heart className="absolute bottom-2 right-2 w-4 h-4 text-rose-400 fill-rose-400" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "Every photo of us is a treasure. I can't wait to fill this with 
          all our beautiful moments together, Puntuu!" 📸💕
        </p>
      </motion.div>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <CameraModal
            onCapture={handleCapture}
            onClose={() => setShowCamera(false)}
            selectedFilter={filters[selectedFilter]}
            selectedFrame={frames[selectedFrame]}
          />
        )}
      </AnimatePresence>

      {/* Photo View Modal */}
      <AnimatePresence>
        {viewingPhoto && (
          <PhotoViewModal
            photo={viewingPhoto}
            onClose={() => setViewingPhoto(null)}
            onDelete={() => handleDelete(viewingPhoto.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
