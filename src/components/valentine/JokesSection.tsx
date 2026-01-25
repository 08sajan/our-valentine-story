import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laugh, RefreshCw, Heart, ChevronRight, ChevronLeft, Globe } from 'lucide-react';

interface Joke {
  id: string;
  setup: string;
  punchline: string;
  category: 'love' | 'funny' | 'cute' | 'cheesy' | 'pun';
}

const englishJokes: Joke[] = [
  // Love Jokes
  { id: 'e1', setup: "Are you a magician?", punchline: "Because whenever I look at you, everyone else disappears! 💕", category: 'love' },
  { id: 'e2', setup: "Do you have a map?", punchline: "Because I just got lost in your eyes! 👀✨", category: 'love' },
  { id: 'e3', setup: "Are you a parking ticket?", punchline: "Because you've got 'fine' written all over you! 😏", category: 'love' },
  { id: 'e4', setup: "Is your name Google?", punchline: "Because you have everything I've been searching for! 🔍💝", category: 'love' },
  { id: 'e5', setup: "Do you believe in love at first sight?", punchline: "Or should I walk by again? 😉", category: 'love' },
  { id: 'e6', setup: "Are you a bank loan?", punchline: "Because you've got my interest! 💰😂", category: 'cheesy' },
  { id: 'e7', setup: "If you were a vegetable...", punchline: "You'd be a cute-cumber! 🥒💕", category: 'cute' },
  { id: 'e8', setup: "Are you made of copper and tellurium?", punchline: "Because you're Cu-Te! 🔬❤️", category: 'pun' },
  { id: 'e9', setup: "Is your dad a boxer?", punchline: "Because you're a knockout! 🥊😍", category: 'cheesy' },
  { id: 'e10', setup: "Can I follow you home?", punchline: "Cause my parents always told me to follow my dreams! 💭", category: 'love' },
  // Funny Jokes
  { id: 'e11', setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything! 🔬😂", category: 'funny' },
  { id: 'e12', setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field! 🌾", category: 'funny' },
  { id: 'e13', setup: "What do you call a fake noodle?", punchline: "An impasta! 🍝", category: 'pun' },
  { id: 'e14', setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up! 🥚😂", category: 'funny' },
  { id: 'e15', setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved! 🌊", category: 'pun' },
  { id: 'e16', setup: "Why did the cookie go to the doctor?", punchline: "Because it was feeling crummy! 🍪", category: 'funny' },
  { id: 'e17', setup: "What do you call a bear with no teeth?", punchline: "A gummy bear! 🐻🍬", category: 'cute' },
  { id: 'e18', setup: "Why can't you trust stairs?", punchline: "They're always up to something! 🪜", category: 'funny' },
  { id: 'e19', setup: "What's orange and sounds like a parrot?", punchline: "A carrot! 🥕🦜", category: 'pun' },
  { id: 'e20', setup: "Why did the bicycle fall over?", punchline: "Because it was two-tired! 🚲😴", category: 'funny' },
  // More jokes
  { id: 'e21', setup: "What did the left eye say to the right eye?", punchline: "Between us, something smells! 👃😂", category: 'funny' },
  { id: 'e22', setup: "Why do cows wear bells?", punchline: "Because their horns don't work! 🐄🔔", category: 'funny' },
  { id: 'e23', setup: "What do you call a fish without eyes?", punchline: "A fsh! 🐟", category: 'pun' },
  { id: 'e24', setup: "Why did the tomato turn red?", punchline: "Because it saw the salad dressing! 🍅", category: 'funny' },
  { id: 'e25', setup: "What do you call a sleeping dinosaur?", punchline: "A dino-snore! 🦖💤", category: 'cute' },
  { id: 'e26', setup: "I told my wife she was drawing her eyebrows too high.", punchline: "She looked surprised! 😮", category: 'funny' },
  { id: 'e27', setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts! 💀", category: 'funny' },
  { id: 'e28', setup: "What's a vampire's favorite fruit?", punchline: "A blood orange! 🧛🍊", category: 'pun' },
  { id: 'e29', setup: "Why did the math book look so sad?", punchline: "Because it had too many problems! 📚😢", category: 'funny' },
  { id: 'e30', setup: "What do you call a dog that does magic?", punchline: "A Labracadabrador! 🐕✨", category: 'pun' },
];

const nepaliJokes: Joke[] = [
  { id: 'n1', setup: "शिक्षक: तिमीले होमवर्क किन गरेनौ?", punchline: "विद्यार्थी: सर, म बाटोमा हराएँ! 📚😂", category: 'funny' },
  { id: 'n2', setup: "एउटा केटाले केटीलाई भन्यो: तिमी WiFi जस्तै हौ।", punchline: "किनभने तिमीबिना connection छैन! 📶💕", category: 'love' },
  { id: 'n3', setup: "डाक्टर: तपाईंलाई के भयो?", punchline: "बिरामी: तपाईंले बताउनुहोस्, डाक्टर त तपाईं हो! 👨‍⚕️😂", category: 'funny' },
  { id: 'n4', setup: "तिम्रो आँखा Google Maps जस्तो छ।", punchline: "किनभने म सधैं हराउँछु तिम्रो आँखामा! 👀💕", category: 'love' },
  { id: 'n5', setup: "आमा: खाना खायौ?", punchline: "छोरा: खाइरहेको छु, Instagram मा! 📱🍔", category: 'funny' },
  { id: 'n6', setup: "तिमी चन्द्रमा जस्तो हौ।", punchline: "टाढा छौ तर मन भित्र छौ! 🌙💖", category: 'love' },
  { id: 'n7', setup: "शिक्षक: 'म' को बहुवचन के हो?", punchline: "विद्यार्थी: हामी! शिक्षक: र 'तिमी' को? विद्यार्थी: तिमीहरू! शिक्षक: 'बच्चा' को? विद्यार्थी: जुम्ल्याहा! 👶👶😂", category: 'funny' },
  { id: 'n8', setup: "के तिमी बिजुली हौ?", punchline: "किनभने तिमीले मेरो हृदयमा शर्ट सर्किट गरियौ! ⚡💝", category: 'love' },
  { id: 'n9', setup: "बुवा: स्कूलमा के सिक्यौ आज?", punchline: "छोरा: धेरै कम! भोलि पनि जानुपर्छ! 📚😅", category: 'funny' },
  { id: 'n10', setup: "तिम्रो मुस्कान सूर्य जस्तो छ।", punchline: "दिनभर उज्यालो, रातभर याद! ☀️💕", category: 'love' },
  { id: 'n11', setup: "एउटा मान्छे भित्र गयो बैंकमा।", punchline: "र बाहिर निस्कियो... किनभने ATM बन्द थियो! 🏦😂", category: 'funny' },
  { id: 'n12', setup: "के तिमी जादुगर हौ?", punchline: "किनभने तिमीलाई देख्दा सबै गायब हुन्छन्! ✨💕", category: 'love' },
];

const hindiJokes: Joke[] = [
  { id: 'h1', setup: "टीचर: तुमने होमवर्क क्यों नहीं किया?", punchline: "स्टूडेंट: सर, रास्ते में खो गया! 📚😂", category: 'funny' },
  { id: 'h2', setup: "तुम WiFi जैसी हो।", punchline: "क्योंकि तुम्हारे बिना connection नहीं है! 📶💕", category: 'love' },
  { id: 'h3', setup: "डॉक्टर: आपको क्या हुआ?", punchline: "मरीज़: आप बताइए, डॉक्टर तो आप हैं! 👨‍⚕️😂", category: 'funny' },
  { id: 'h4', setup: "तुम्हारी आँखें Google Maps जैसी हैं।", punchline: "क्योंकि मैं हमेशा खो जाता हूँ इनमें! 👀💕", category: 'love' },
  { id: 'h5', setup: "माँ: खाना खाया?", punchline: "बेटा: खा रहा हूँ, Instagram पर! 📱🍔", category: 'funny' },
  { id: 'h6', setup: "तुम चाँद जैसी हो।", punchline: "दूर हो पर दिल में हो! 🌙💖", category: 'love' },
  { id: 'h7', setup: "पप्पू टीचर से: सर मैं बड़ा होकर क्या बनूँ?", punchline: "टीचर: पहले छोटा तो बन! 📏😂", category: 'funny' },
  { id: 'h8', setup: "क्या तुम बिजली हो?", punchline: "क्योंकि तुमने मेरे दिल में शॉर्ट सर्किट कर दिया! ⚡💝", category: 'love' },
  { id: 'h9', setup: "पापा: स्कूल में क्या सीखा आज?", punchline: "बेटा: बहुत कम! कल भी जाना पड़ेगा! 📚😅", category: 'funny' },
  { id: 'h10', setup: "तुम्हारी मुस्कान सूरज जैसी है।", punchline: "दिनभर रोशनी, रातभर याद! ☀️💕", category: 'love' },
  { id: 'h11', setup: "एक आदमी बैंक गया।", punchline: "और बाहर आ गया... क्योंकि ATM बंद था! 🏦😂", category: 'funny' },
  { id: 'h12', setup: "क्या तुम जादूगर हो?", punchline: "क्योंकि तुम्हें देखते ही सब गायब हो जाते हैं! ✨💕", category: 'love' },
  { id: 'h13', setup: "संता: ये बच्चा किसका है?", punchline: "बंता: नाम से तो मेरा लगता है! 👶😂", category: 'funny' },
  { id: 'h14', setup: "तुम मेरी ज़िन्दगी में WiFi जैसी हो।", punchline: "बिना तुम्हारे सब disconnect! 📵💕", category: 'love' },
];

const categoryEmojis = {
  love: '💕',
  funny: '😂',
  cute: '🥰',
  cheesy: '🧀',
  pun: '😏'
};

export const JokesSection = () => {
  const [language, setLanguage] = useState<'english' | 'nepali' | 'hindi'>('english');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorite-jokes');
    return saved ? JSON.parse(saved) : [];
  });

  const jokes = language === 'english' ? englishJokes : language === 'nepali' ? nepaliJokes : hindiJokes;
  const currentJoke = jokes[currentIndex];

  const nextJoke = () => {
    setShowPunchline(false);
    setCurrentIndex((prev) => (prev + 1) % jokes.length);
  };

  const prevJoke = () => {
    setShowPunchline(false);
    setCurrentIndex((prev) => (prev - 1 + jokes.length) % jokes.length);
  };

  const randomJoke = () => {
    setShowPunchline(false);
    setCurrentIndex(Math.floor(Math.random() * jokes.length));
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentJoke.id)) {
      setFavorites(prev => prev.filter(id => id !== currentJoke.id));
    } else {
      setFavorites(prev => [...prev, currentJoke.id]);
    }
    localStorage.setItem('favorite-jokes', JSON.stringify(favorites));
  };

  return (
    <div className="py-6 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          😂 Jokes & Laughs
        </motion.h2>
        <p className="text-white/70 text-sm">
          Let me make you smile, Puntuu! 💕
        </p>
      </div>

      {/* Language Toggle */}
      <div className="flex justify-center gap-2 mb-6">
        {[
          { id: 'english', label: '🇺🇸 English' },
          { id: 'nepali', label: '🇳🇵 नेपाली' },
          { id: 'hindi', label: '🇮🇳 हिंदी' }
        ].map(lang => (
          <button
            key={lang.id}
            onClick={() => {
              setLanguage(lang.id as any);
              setCurrentIndex(0);
              setShowPunchline(false);
            }}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
              language === lang.id
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                : 'bg-white/10 text-white/70'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Joke Card */}
      <motion.div
        className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl p-6 border border-yellow-500/30 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Category Badge */}
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
            {categoryEmojis[currentJoke.category]} {currentJoke.category}
          </span>
          <span className="text-white/50 text-xs">
            {currentIndex + 1}/{jokes.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentJoke.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Setup */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Laugh className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-white text-lg font-medium">
                {currentJoke.setup}
              </p>
            </motion.div>

            {/* Reveal Button / Punchline */}
            {!showPunchline ? (
              <motion.button
                onClick={() => setShowPunchline(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg"
              >
                😂 Reveal Punchline!
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white/10 rounded-2xl p-4 text-center"
              >
                <p className="text-white text-lg font-medium">
                  {currentJoke.punchline}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <motion.button
            onClick={prevJoke}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          <div className="flex gap-3">
            <motion.button
              onClick={randomJoke}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20"
              title="Random joke"
            >
              <RefreshCw className="w-5 h-5 text-white" />
            </motion.button>
            
            <motion.button
              onClick={toggleFavorite}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full transition-colors ${
                favorites.includes(currentJoke.id)
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Heart className={`w-5 h-5 ${favorites.includes(currentJoke.id) ? 'fill-white' : 'text-white'}`} />
            </motion.button>
          </div>

          <motion.button
            onClick={nextJoke}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Fun Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 rounded-2xl p-4 text-center"
      >
        <p className="text-white/60 text-sm">
          💕 {englishJokes.length + nepaliJokes.length + hindiJokes.length}+ jokes to make you smile!
        </p>
        <p className="text-white/40 text-xs mt-1">
          Favorites: {favorites.length} jokes saved
        </p>
      </motion.div>
    </div>
  );
};
