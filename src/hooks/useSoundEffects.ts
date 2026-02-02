import { useCallback, useRef } from 'react';

// Sound URLs - using free sound effects
const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  pop: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  reveal: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  heart: 'https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  magic: 'https://assets.mixkit.co/active_storage/sfx/1436/1436-preview.mp3',
  celebrate: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
};

type SoundType = keyof typeof SOUNDS;

export const useSoundEffects = () => {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  const isMuted = useRef(false);

  const playSound = useCallback((type: SoundType, volume = 0.5) => {
    if (isMuted.current) return;

    try {
      // Create or reuse audio element
      if (!audioCache.current[type]) {
        audioCache.current[type] = new Audio(SOUNDS[type]);
      }

      const audio = audioCache.current[type];
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay restrictions
      });
    } catch {
      // Ignore errors
    }
  }, []);

  const playClick = useCallback(() => playSound('click', 0.3), [playSound]);
  const playPop = useCallback(() => playSound('pop', 0.4), [playSound]);
  const playReveal = useCallback(() => playSound('reveal', 0.5), [playSound]);
  const playSuccess = useCallback(() => playSound('success', 0.4), [playSound]);
  const playHeart = useCallback(() => playSound('heart', 0.4), [playSound]);
  const playWhoosh = useCallback(() => playSound('whoosh', 0.3), [playSound]);
  const playMagic = useCallback(() => playSound('magic', 0.5), [playSound]);
  const playCelebrate = useCallback(() => playSound('celebrate', 0.5), [playSound]);

  const toggleMute = useCallback(() => {
    isMuted.current = !isMuted.current;
    return isMuted.current;
  }, []);

  return {
    playSound,
    playClick,
    playPop,
    playReveal,
    playSuccess,
    playHeart,
    playWhoosh,
    playMagic,
    playCelebrate,
    toggleMute,
    isMuted: () => isMuted.current,
  };
};
