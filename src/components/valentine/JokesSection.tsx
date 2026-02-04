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
  // More unique jokes
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
  { id: 'e31', setup: "Are you WiFi?", punchline: "Because I'm feeling a connection! 📶💕", category: 'love' },
  { id: 'e32', setup: "Did it hurt when you fell from heaven?", punchline: "Because you're clearly an angel! 😇", category: 'cheesy' },
  { id: 'e33', setup: "Why did the gym close down?", punchline: "It just didn't work out! 💪😂", category: 'funny' },
  { id: 'e34', setup: "What did the grape say when stepped on?", punchline: "Nothing, it just let out a little wine! 🍇", category: 'pun' },
  { id: 'e35', setup: "You must be tired...", punchline: "Because you've been running through my mind all day! 💭💕", category: 'love' },
];

const nepaliJokes: Joke[] = [
  // Unique Nepali jokes - NOT translations!
  { id: 'n1', setup: "केटा: म तिम्रो लागि चन्द्रमा ल्याइदिन्छु!", punchline: "केटी: पहिले घाम आउँदा छाता त ल्याइदेऊ! ☀️😂", category: 'funny' },
  { id: 'n2', setup: "मेरो मन तिम्रो लागि 24/7 खुला छ।", punchline: "तर maintenance को लागि कहिलेकाहीं बन्द हुन्छ! 🏪💕", category: 'love' },
  { id: 'n3', setup: "दाजु: भाउजु कति सुन्दर हुनुहुन्छ!", punchline: "भाई: हजुर, तर घरको WiFi password भन्नुस् न! 📶😂", category: 'funny' },
  { id: 'n4', setup: "तिमी मेरो favorite notification हौ।", punchline: "Do Not Disturb मा पनि तिम्रो message आउँछ! 📱💗", category: 'love' },
  { id: 'n5', setup: "साथीले सोध्यो: Love life कस्तो छ?", punchline: "म: Netflix buffering जस्तो - loading नै loading! ⏳😂", category: 'funny' },
  { id: 'n6', setup: "तिम्रो हाँसो मेरो power bank हो।", punchline: "Low battery हुँदा तिमीले charge गर्छौ! 🔋💕", category: 'love' },
  { id: 'n7', setup: "आमा: खाना खाइसक्यौ?", punchline: "छोरा: हो, पहिला Insta story हाल्दैछु! 📸🍛", category: 'funny' },
  { id: 'n8', setup: "तिमी GPS जस्तो हौ।", punchline: "तिमीबिना म जिन्दगीमा हराउँछु! 🗺️💖", category: 'love' },
  { id: 'n9', setup: "साथी: तिम्रो crush कस्तो छ?", punchline: "म: Maggi जस्तो - 2 minutes मा ready! 🍜😂", category: 'funny' },
  { id: 'n10', setup: "तिमीले मलाई हेर्दा के हुन्छ थाहा छ?", punchline: "मेरो heart rate Fitbit ले track गर्न छोड्छ! ⌚💓", category: 'love' },
  { id: 'n11', setup: "बुवा: के पढ्दैछौ?", punchline: "छोरा: Netflix को subtitles! 📺😅", category: 'funny' },
  { id: 'n12', setup: "तिमी मेरो alarm हौ।", punchline: "Snooze गर्न मन लाग्दैन! ⏰💕", category: 'cute' },
  { id: 'n13', setup: "केटी: तिमी मलाई कति माया गर्छौ?", punchline: "केटा: Jio को data जत्तिकै - unlimited! 📡😂", category: 'love' },
  { id: 'n14', setup: "मेरो जिन्दगी तिम्रो बिना PUBG जस्तो छ।", punchline: "Chicken Dinner बिनाको game! 🎮💔", category: 'funny' },
  { id: 'n15', setup: "तिमी मेरो antivirus हौ।", punchline: "Negativity बाट protect गर्छौ! 🛡️💗", category: 'love' },
];

const hindiJokes: Joke[] = [
  // Unique Hindi jokes - NOT translations!
  { id: 'h1', setup: "पप्पू की GF बोली: मुझे चाँद चाहिए!", punchline: "पप्पू: अभी Swiggy पे check करता हूँ! 🌙📱", category: 'funny' },
  { id: 'h2', setup: "तुम मेरे लिए UPI जैसी हो।", punchline: "Instant connection, no waiting! 💸💕", category: 'love' },
  { id: 'h3', setup: "संता: यार, प्यार में पड़ गया!", punchline: "बंता: Hospital जा, X-ray करा! 💔😂", category: 'funny' },
  { id: 'h4', setup: "तुम्हारी आँखों में खो जाता हूँ।", punchline: "GPS भी signal नहीं पकड़ पाता! 📍💖", category: 'love' },
  { id: 'h5', setup: "बीवी: आज खाना मैं बनाऊँगी!", punchline: "पति ने तुरंत Zomato Gold लिया! 🍕😂", category: 'funny' },
  { id: 'h6', setup: "तुम मेरी जिंदगी का 5G हो।", punchline: "Super fast, super amazing! 📶💗", category: 'love' },
  { id: 'h7', setup: "दोस्त: तेरी शादी कब होगी?", punchline: "मैं: जब Maths आसान हो जाएगी! ➗😅", category: 'funny' },
  { id: 'h8', setup: "तुम्हारे बिना मेरा दिल ऐसा है।", punchline: "जैसे chai में चीनी नहीं! ☕💕", category: 'love' },
  { id: 'h9', setup: "Teacher: Silence का मतलब बताओ।", punchline: "Pappu: जब biwi गुस्से में हो! 🤫😂", category: 'funny' },
  { id: 'h10', setup: "मेरा प्यार तुम्हारे लिए Google जैसा है।", punchline: "हमेशा तुम्हारे लिए answers ready! 🔍💖", category: 'love' },
  { id: 'h11', setup: "बेटा: पापा, मुझे iPhone चाहिए।", punchline: "पापा: और मुझे जादू की छड़ी! 🪄😂", category: 'funny' },
  { id: 'h12', setup: "तुम मेरे दिल की Amazon Prime हो।", punchline: "Free delivery of happiness! 📦💕", category: 'cute' },
  { id: 'h13', setup: "GF: मुझसे ज्यादा किसे प्यार करते हो?", punchline: "BF: Mommy के हाथ के पराठों को! 🥙😂", category: 'funny' },
  { id: 'h14', setup: "तुम्हारे साथ time ऐसे कटता है।", punchline: "जैसे YouTube पे Autoplay on हो! ▶️💗", category: 'love' },
  { id: 'h15', setup: "पति: डार्लिंग, I love you 3000!", punchline: "पत्नी: मुझे 3000 की shopping चाहिए! 🛍️😂", category: 'funny' },
  { id: 'h16', setup: "तुम मेरे लिए Netflix जैसी हो।", punchline: "एक बार start किया तो रुक नहीं सकता! 📺💕", category: 'love' },
  { id: 'h17', setup: "लड़की: मुझे stars चाहिए!", punchline: "लड़का: Uber rating देख, 4.9 है! ⭐😂", category: 'funny' },
  { id: 'h18', setup: "तुम्हारी smile देखकर मन करता है।", punchline: "Screenshot ले लूँ memory के लिए! 📸💖", category: 'love' },
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
          Let me make you smile, sweetheart! 💕
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
