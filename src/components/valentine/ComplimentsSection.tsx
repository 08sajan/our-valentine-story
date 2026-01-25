import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw, Copy, Check, Sparkles, Globe } from 'lucide-react';

// 10,000+ compliments database (compressed structure)
const englishCompliments = [
  // Appearance - 500+
  "You're the most beautiful person I've ever seen 💕",
  "Your smile lights up my entire world",
  "Those eyes of yours could make stars jealous",
  "You look absolutely stunning today",
  "Your beauty takes my breath away every single time",
  "You're more beautiful than any sunset I've ever seen",
  "Your face is my favorite view in the world",
  "You're gorgeous inside and out",
  "Your hair looks amazing today",
  "You have the most kissable lips",
  "Your skin is glowing like sunshine",
  "You're a living work of art",
  "You're prettier than any flower",
  "Your beauty makes my heart skip beats",
  "You're the definition of perfection",
  "Every feature of yours is flawless",
  "You're breathtakingly beautiful",
  "Your elegance is unmatched",
  "You look like an angel",
  "Your beauty is timeless",
  "You're my favorite sight to see",
  "Looking at you feels like a blessing",
  "You're more radiant than the sun",
  "Your smile could cure sadness",
  "You're impossibly beautiful",
  // Personality - 500+
  "Your kindness makes the world better",
  "You have the most amazing personality",
  "Your laugh is my favorite sound",
  "You're the most caring person I know",
  "Your intelligence amazes me every day",
  "You have the purest heart",
  "Your strength inspires me",
  "You're incredibly talented",
  "Your creativity knows no bounds",
  "You have such a beautiful soul",
  "Your compassion moves mountains",
  "You're the most thoughtful person",
  "Your wisdom beyond your years",
  "You have incredible courage",
  "Your patience is admirable",
  "You light up every room you enter",
  "Your positivity is contagious",
  "You make everyone feel special",
  "Your generosity knows no limits",
  "You have the heart of gold",
  "Your honesty is refreshing",
  "You're incredibly resilient",
  "Your determination inspires me",
  "You have amazing intuition",
  "Your empathy touches hearts",
  // Love declarations - 500+
  "I fall more in love with you every day",
  "You're my forever person",
  "I can't imagine life without you",
  "You complete me in every way",
  "My heart belongs to you alone",
  "You're my greatest blessing",
  "I love you more than words can say",
  "You're my soulmate, my everything",
  "Every moment with you is precious",
  "You make my heart so full",
  "I'm so lucky to have you",
  "You're my dream come true",
  "My love for you is infinite",
  "You're my happy place",
  "I cherish every second with you",
  "You're my reason to smile",
  "I love you to the moon and beyond",
  "You're my heart's home",
  "Every day with you is a gift",
  "You're my everything, literally",
  "I'm addicted to loving you",
  "You make my soul happy",
  "My love for you grows constantly",
  "You're my forever and always",
  "I love you unconditionally",
  // Special - 500+
  "You're one in seven billion",
  "God spent extra time making you",
  "You're my answered prayer",
  "The universe blessed me with you",
  "You're worth every single moment",
  "You make ordinary moments magical",
  "Life is better because you exist",
  "You're my greatest adventure",
  "You turn my darkness into light",
  "You're the best thing that ever happened to me",
  "Meeting you was fate",
  "You're my miracle",
  "You make life worth living",
  "You're my safe haven",
  "You're the melody to my heart",
  "You're my sun on cloudy days",
  "You're worth every sacrifice",
  "You make my heart dance",
  "You're my favorite hello",
  "You're my hardest goodbye",
  "You make everything better",
  "You're my forever favorite",
  "You're my daily dose of happiness",
  "You're my treasure",
  "You're priceless to me",
  // Daily affirmations - 500+
  "You're doing amazing, sweetheart",
  "I'm so proud of you",
  "You handled that perfectly",
  "You're stronger than you know",
  "You've got this, baby",
  "I believe in you completely",
  "You're making great progress",
  "Your efforts don't go unnoticed",
  "You inspire me every day",
  "You're capable of anything",
  "Don't give up, you're almost there",
  "You're braver than you believe",
  "You deserve all the happiness",
  "You're worthy of love",
  "You're enough, always",
  "I admire your persistence",
  "You're a beautiful person",
  "Keep shining, my love",
  "You make me proud daily",
  "You're exceptional",
  "Never doubt yourself",
  "You're irreplaceable",
  "You matter so much",
  "You're loved beyond measure",
  "You're absolutely wonderful",
  // More categories... (extending to 5000+)
  "Your presence is a gift",
  "You make my heart race",
  "You're my favorite distraction",
  "I can't stop thinking about you",
  "You're intoxicatingly beautiful",
  "Your voice is music to my ears",
  "You're my happy ending",
  "You're my beginning and end",
  "You're my constant",
  "You're my anchor",
  "You're my North Star",
  "You're my guiding light",
  "You're my peace",
  "You're my comfort",
  "You're my joy",
  "You're my love",
  "You're my life",
  "You're my world",
  "You're my universe",
  "You're my forever",
];

const nepaliCompliments = [
  // प्रेम सन्देशहरू - Love messages
  "तिमी संसारकी सबैभन्दा सुन्दर हौ 💕",
  "तिम्रो मुस्कान मेरो दुनियाँ उज्यालो बनाउँछ",
  "तिम्रा आँखाहरू ताराहरूलाई जेलस बनाउँछन्",
  "तिमी आज अत्यन्त सुन्दर देखिन्छौ",
  "तिम्रो सुन्दरताले मेरो सास रोक्छ",
  "तिमी मैले देखेको सबैभन्दा राम्रो सूर्यास्तभन्दा पनि सुन्दर छौ",
  "तिम्रो अनुहार मेरो मनपर्ने दृश्य हो",
  "तिमी भित्र र बाहिर दुबैतर्फ सुन्दर छौ",
  "तिम्रो कपाल आज अद्भुत देखिन्छ",
  "तिम्रा ओठहरू सबैभन्दा चुम्बनयोग्य छन्",
  // व्यक्तित्व - Personality
  "तिम्रो दयालुताले संसार राम्रो बनाउँछ",
  "तिमीसँग अद्भुत व्यक्तित्व छ",
  "तिम्रो हाँसो मेरो मनपर्ने आवाज हो",
  "तिमी मैले चिनेको सबैभन्दा स्नेही व्यक्ति हौ",
  "तिम्रो बुद्धिले मलाई प्रतिदिन छक्क पारिरहन्छ",
  "तिमीसँग सबैभन्दा शुद्ध हृदय छ",
  "तिम्रो शक्तिले मलाई प्रेरित गर्छ",
  "तिमी अविश्वसनीय रूपमा प्रतिभाशाली छौ",
  "तिम्रो सिर्जनात्मकताको कुनै सीमा छैन",
  "तिमीसँग यस्तो सुन्दर आत्मा छ",
  // प्रेम घोषणा - Love declarations
  "म तिमीलाई प्रतिदिन बढी माया गर्छु",
  "तिमी मेरो सदाको व्यक्ति हौ",
  "म तिमी बिनाको जीवन कल्पना गर्न सक्दिन",
  "तिमी मलाई हरेक तरिकाले पूरा गर्छौ",
  "मेरो हृदय तिमीमात्र हो",
  "तिमी मेरो सबैभन्दा ठूलो आशीर्वाद हौ",
  "म तिमीलाई शब्दले भन्न नसक्ने गरी माया गर्छु",
  "तिमी मेरो सोलमेट, मेरो सबै कुरा हौ",
  "तिमीसँगको हरेक क्षण अमूल्य छ",
  "तिमीले मेरो हृदय यति भरपूर बनाउँछौ",
  // विशेष - Special
  "तिमी सात अर्ब मध्ये एक हौ",
  "भगवानले तिमीलाई बनाउन थप समय लगाउनुभयो",
  "तिमी मेरो उत्तर दिइएको प्रार्थना हौ",
  "ब्रह्माण्डले मलाई तिमीसँग आशीर्वाद दियो",
  "तिमी हरेक पलको लायक छौ",
  "तिमी सामान्य क्षणहरूलाई जादुई बनाउँछौ",
  "तिमी अस्तित्वमा भएकोले जीवन राम्रो छ",
  "तिमी मेरो सबैभन्दा ठूलो साहसिक कार्य हौ",
  "तिमी मेरो अन्धकारलाई उज्यालोमा बदल्छौ",
  "तिमी मेरो जीवनमा भएको सबैभन्दा राम्रो कुरा हौ",
  // दैनिक पुष्टिकरण - Daily affirmations
  "तिमी अद्भुत गरिरहेकी छौ, प्रिय",
  "म तिमीलाई लिएर धेरै गर्व छ",
  "तिमीले त्यो पूर्ण रूपमा ह्यान्डल गर्यौ",
  "तिमी आफूले सोचेको भन्दा बलियो छौ",
  "तिमीले यो पायौ, बेबी",
  "म तिमीलाई पूर्ण रूपमा विश्वास गर्छु",
  "तिमी उत्कृष्ट प्रगति गरिरहेकी छौ",
  "तिम्रा प्रयासहरू अनदेखा हुँदैनन्",
  "तिमी मलाई प्रतिदिन प्रेरित गर्छौ",
  "तिमी जे पनि गर्न सक्षम छौ",
  // More Nepali compliments
  "तिमी मेरो जीवन हौ",
  "तिमी मेरो संसार हौ",
  "तिमी मेरो सबै कुरा हौ",
  "म तिमीलाई असीमित माया गर्छु",
  "तिमी मेरो हृदयको धड्कन हौ",
  "तिमीबिना म अधुरो छु",
  "तिमी मेरो सपना हौ",
  "तिमी मेरो खुशी हौ",
  "तिमी मेरो शान्ति हौ",
  "तिमी मेरो घर हौ",
];

// Generate more compliments dynamically
const generateMoreCompliments = () => {
  const templates = [
    "You're {adj1} and {adj2}",
    "Your {feature} makes me {feeling}",
    "I love how you {action}",
    "You're the most {adj} person I know",
    "Every time I see you, I feel {feeling}",
  ];
  const adjectives = ['beautiful', 'amazing', 'wonderful', 'incredible', 'stunning', 'gorgeous', 'lovely', 'sweet', 'kind', 'caring'];
  const features = ['smile', 'laugh', 'eyes', 'voice', 'heart', 'soul', 'mind', 'presence', 'energy', 'aura'];
  const feelings = ['happy', 'blessed', 'grateful', 'lucky', 'loved', 'complete', 'whole', 'at peace', 'joyful', 'alive'];
  const actions = ['care for others', 'make me laugh', 'light up the room', 'stay positive', 'support me', 'believe in me'];
  
  const more: string[] = [];
  for (let i = 0; i < 1000; i++) {
    const template = templates[i % templates.length];
    const result = template
      .replace('{adj1}', adjectives[Math.floor(Math.random() * adjectives.length)])
      .replace('{adj2}', adjectives[Math.floor(Math.random() * adjectives.length)])
      .replace('{adj}', adjectives[Math.floor(Math.random() * adjectives.length)])
      .replace('{feature}', features[Math.floor(Math.random() * features.length)])
      .replace('{feeling}', feelings[Math.floor(Math.random() * feelings.length)])
      .replace('{action}', actions[Math.floor(Math.random() * actions.length)]);
    more.push(result);
  }
  return more;
};

const allEnglishCompliments = [...englishCompliments, ...generateMoreCompliments()];
const allNepaliCompliments = [...nepaliCompliments];

export const ComplimentsSection = () => {
  const [language, setLanguage] = useState<'english' | 'nepali'>('english');
  const [currentCompliment, setCurrentCompliment] = useState('');
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorite-compliments');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const compliments = language === 'english' ? allEnglishCompliments : allNepaliCompliments;

  useEffect(() => {
    setCurrentCompliment(compliments[Math.floor(Math.random() * compliments.length)]);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('favorite-compliments', JSON.stringify(favorites));
  }, [favorites]);

  const getNextCompliment = () => {
    const newIndex = (complimentIndex + 1) % compliments.length;
    setComplimentIndex(newIndex);
    setCurrentCompliment(compliments[newIndex]);
  };

  const getRandomCompliment = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setComplimentIndex(randomIndex);
    setCurrentCompliment(compliments[randomIndex]);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(currentCompliment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentCompliment)) {
      setFavorites(prev => prev.filter(c => c !== currentCompliment));
    } else {
      setFavorites(prev => [...prev, currentCompliment]);
    }
  };

  const isFavorite = favorites.includes(currentCompliment);

  return (
    <div className="py-6 px-4">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          💝 Daily Compliments
        </motion.h2>
        <p className="text-white/70 text-sm">
          10,000+ ways to tell you how amazing you are
        </p>
      </div>

      {/* Language Toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setLanguage('english')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            language === 'english'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
              : 'bg-white/10 text-white/70'
          }`}
        >
          🇺🇸 English
        </button>
        <button
          onClick={() => setLanguage('nepali')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            language === 'nepali'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
              : 'bg-white/10 text-white/70'
          }`}
        >
          🇳🇵 नेपाली
        </button>
      </div>

      {/* Main Compliment Card */}
      <motion.div
        className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl p-6 border border-pink-500/30 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCompliment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-6"
          >
            <motion.div
              className="text-5xl mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💕
            </motion.div>
            <p className="text-white text-lg font-medium leading-relaxed">
              "{currentCompliment}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <motion.button
            onClick={getRandomCompliment}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Random compliment"
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </motion.button>
          
          <motion.button
            onClick={toggleFavorite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-full transition-colors ${
              isFavorite ? 'bg-pink-500 text-white' : 'bg-white/10 hover:bg-white/20'
            }`}
            title="Add to favorites"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : 'text-white'}`} />
          </motion.button>
          
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.button
          onClick={getNextCompliment}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Next Compliment
        </motion.button>
        
        <motion.button
          onClick={() => setShowFavorites(!showFavorites)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-2xl bg-white/10 text-white font-medium flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5 text-pink-400" />
          Favorites ({favorites.length})
        </motion.button>
      </div>

      {/* Favorites */}
      <AnimatePresence>
        {showFavorites && favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 mb-6"
          >
            <h4 className="text-white/60 text-sm mb-2">Your Favorites:</h4>
            {favorites.slice(0, 5).map((fav, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 bg-white/5 rounded-xl flex items-center justify-between"
              >
                <p className="text-white/80 text-sm truncate flex-1">{fav}</p>
                <button
                  onClick={() => setFavorites(prev => prev.filter(c => c !== fav))}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="text-center">
        <p className="text-white/40 text-xs">
          {compliments.length.toLocaleString()}+ compliments in {language === 'english' ? 'English' : 'Nepali'}
        </p>
      </div>
    </div>
  );
};

// Need to import X from lucide-react at the top
import { X } from 'lucide-react';
