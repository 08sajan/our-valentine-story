import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star, RefreshCw, Copy, Check, BookHeart } from "lucide-react";

interface Affirmation {
  english: string;
  nepali: string;
  category: 'confidence' | 'love' | 'selfworth' | 'beauty' | 'strength' | 'peace';
}

// 100+ Affirmations organized by category
const affirmations: Affirmation[] = [
  // CONFIDENCE (20)
  { english: "I am confident in who I am and what I bring to the world.", nepali: "म को हुँ र संसारमा के ल्याउँछु त्यसमा विश्वस्त छु।", category: 'confidence' },
  { english: "I trust my intuition and make decisions with ease.", nepali: "म आफ्नो अन्तर्ज्ञानमा विश्वास गर्छु र सजिलैसँग निर्णय गर्छु।", category: 'confidence' },
  { english: "I am capable of achieving anything I set my mind to.", nepali: "म जे पनि हासिल गर्न सक्षम छु।", category: 'confidence' },
  { english: "My voice matters and deserves to be heard.", nepali: "मेरो आवाज महत्त्वपूर्ण छ र सुन्न योग्य छ।", category: 'confidence' },
  { english: "I embrace challenges as opportunities for growth.", nepali: "म चुनौतीहरूलाई विकासको अवसरको रूपमा अँगाल्छु।", category: 'confidence' },
  { english: "I am brave, bold, and beautiful.", nepali: "म बहादुर, साहसी र सुन्दर छु।", category: 'confidence' },
  { english: "I believe in my abilities completely.", nepali: "म आफ्नो क्षमतामा पूर्ण विश्वास गर्छु।", category: 'confidence' },
  { english: "I radiate confidence, self-respect, and inner harmony.", nepali: "म आत्मविश्वास, आत्म-सम्मान र भित्री सद्भाव विकिरण गर्छु।", category: 'confidence' },
  { english: "I am not afraid to shine brightly.", nepali: "म उज्यालो चम्कनमा डराउँदिन।", category: 'confidence' },
  { english: "I have the power to create change in my life.", nepali: "मसँग मेरो जीवनमा परिवर्तन सिर्जना गर्ने शक्ति छ।", category: 'confidence' },
  { english: "Every step I take is filled with purpose.", nepali: "मैले चालेको हरेक कदम उद्देश्यले भरिएको छ।", category: 'confidence' },
  { english: "I am exactly where I need to be right now.", nepali: "म अहिले ठीक त्यहीँ छु जहाँ हुनुपर्छ।", category: 'confidence' },
  { english: "I am proud of everything I have accomplished.", nepali: "मैले हासिल गरेको सबै कुराको म गर्व गर्छु।", category: 'confidence' },
  { english: "I choose to be confident and fearless.", nepali: "म आत्मविश्वासी र निडर हुन रोज्छु।", category: 'confidence' },
  { english: "My potential is limitless.", nepali: "मेरो क्षमता असीमित छ।", category: 'confidence' },
  { english: "I stand tall and walk with grace.", nepali: "म ठाडो उभिन्छु र अनुग्रहले हिँड्छु।", category: 'confidence' },
  { english: "I trust the journey of my life.", nepali: "म मेरो जीवनको यात्रामा विश्वास गर्छु।", category: 'confidence' },
  { english: "I am resilient and can handle anything.", nepali: "म लचिलो छु र जे पनि सम्हाल्न सक्छु।", category: 'confidence' },
  { english: "My confidence grows stronger each day.", nepali: "मेरो आत्मविश्वास प्रत्येक दिन बढ्दै जान्छ।", category: 'confidence' },
  { english: "I deserve success and embrace it fully.", nepali: "म सफलताको योग्य छु र पूर्ण रूपमा अँगाल्छु।", category: 'confidence' },

  // LOVE (20)
  { english: "I am deeply loved and cherished.", nepali: "म गहिरो माया र सम्मानित छु।", category: 'love' },
  { english: "Love flows to me effortlessly and abundantly.", nepali: "प्रेम मतिर सजिलो र प्रशस्त रूपमा बग्छ।", category: 'love' },
  { english: "I am worthy of a beautiful, fulfilling relationship.", nepali: "म सुन्दर, पूर्ण सम्बन्धको योग्य छु।", category: 'love' },
  { english: "My heart is open to giving and receiving love.", nepali: "मेरो मुटु प्रेम दिन र लिनको लागि खुला छ।", category: 'love' },
  { english: "I attract loving, caring people into my life.", nepali: "म मेरो जीवनमा माया गर्ने, हेरचाह गर्ने मानिसहरूलाई आकर्षित गर्छु।", category: 'love' },
  { english: "Love surrounds me in every moment.", nepali: "प्रेमले मलाई हरेक पलमा घेरेको छ।", category: 'love' },
  { english: "I am grateful for the love in my life.", nepali: "म मेरो जीवनमा भएको प्रेमको लागि आभारी छु।", category: 'love' },
  { english: "My relationship grows stronger every day.", nepali: "मेरो सम्बन्ध हरेक दिन बलियो हुँदै जान्छ।", category: 'love' },
  { english: "I give love freely and receive it joyfully.", nepali: "म स्वतन्त्र रूपमा प्रेम दिन्छु र खुसीसँग प्राप्त गर्छु।", category: 'love' },
  { english: "I am someone's answered prayer.", nepali: "म कसैको उत्तरित प्रार्थना हुँ।", category: 'love' },
  { english: "True love finds me because I am ready for it.", nepali: "साँचो प्रेमले मलाई फेला पार्छ किनभने म यसको लागि तयार छु।", category: 'love' },
  { english: "I choose to see love everywhere I look.", nepali: "म जहाँ पनि हेर्छु प्रेम देख्न रोज्छु।", category: 'love' },
  { english: "My love story is beautiful and unique.", nepali: "मेरो प्रेम कथा सुन्दर र अद्वितीय छ।", category: 'love' },
  { english: "I am the greatest gift to my partner.", nepali: "म मेरो साथीको लागि सबैभन्दा ठूलो उपहार हुँ।", category: 'love' },
  { english: "Love heals me and makes me whole.", nepali: "प्रेमले मलाई निको पार्छ र पूर्ण बनाउँछ।", category: 'love' },
  { english: "I radiate love and it comes back to me multiplied.", nepali: "म प्रेम विकिरण गर्छु र यो गुणित भएर फर्कन्छ।", category: 'love' },
  { english: "Every day, I fall more in love with life.", nepali: "हरेक दिन, म जीवनको प्रेममा झन् पर्छु।", category: 'love' },
  { english: "I am loved exactly as I am.", nepali: "म जस्तो छु त्यसैगरी माया गरिन्छ।", category: 'love' },
  { english: "My heart is filled with unconditional love.", nepali: "मेरो मुटु बिना शर्त प्रेमले भरिएको छ।", category: 'love' },
  { english: "Love is my birthright and I claim it fully.", nepali: "प्रेम मेरो जन्मसिद्ध अधिकार हो र म यसलाई पूर्ण रूपमा दाबी गर्छु।", category: 'love' },

  // SELF-WORTH (20)
  { english: "I am enough, exactly as I am.", nepali: "म जस्तो छु त्यसैमा पर्याप्त छु।", category: 'selfworth' },
  { english: "I deserve happiness, respect, and love.", nepali: "म खुशी, सम्मान र प्रेमको योग्य छु।", category: 'selfworth' },
  { english: "My worth is not defined by others' opinions.", nepali: "मेरो मूल्य अरूको विचारले परिभाषित हुँदैन।", category: 'selfworth' },
  { english: "I am valuable and my contributions matter.", nepali: "म मूल्यवान छु र मेरो योगदान महत्त्वपूर्ण छ।", category: 'selfworth' },
  { english: "I refuse to settle for less than I deserve.", nepali: "म मेरो योग्यताभन्दा कममा बस्न अस्वीकार गर्छु।", category: 'selfworth' },
  { english: "I am worthy of all the good things in life.", nepali: "म जीवनका सबै राम्रा कुराहरूको योग्य छु।", category: 'selfworth' },
  { english: "My self-worth is unshakeable.", nepali: "मेरो आत्म-मूल्य अटल छ।", category: 'selfworth' },
  { english: "I honor my needs and prioritize my well-being.", nepali: "म मेरो आवश्यकताहरूलाई सम्मान गर्छु र कल्याणलाई प्राथमिकता दिन्छु।", category: 'selfworth' },
  { english: "I am proud to be me.", nepali: "म आफू हुनुमा गर्व गर्छु।", category: 'selfworth' },
  { english: "I am a unique and precious soul.", nepali: "म एक अद्वितीय र बहुमूल्य आत्मा हुँ।", category: 'selfworth' },
  { english: "I release all feelings of inadequacy.", nepali: "म अपर्याप्तताको सबै भावनाहरू छोड्छु।", category: 'selfworth' },
  { english: "I celebrate my accomplishments, big and small.", nepali: "म मेरो उपलब्धिहरू, ठूला र सानो, मनाउँछु।", category: 'selfworth' },
  { english: "I set healthy boundaries because I value myself.", nepali: "म स्वस्थ सीमाहरू राख्छु किनभने म आफूलाई मूल्य दिन्छु।", category: 'selfworth' },
  { english: "I am complete within myself.", nepali: "म आफैंमा पूर्ण छु।", category: 'selfworth' },
  { english: "My worth comes from within, not from external validation.", nepali: "मेरो मूल्य भित्रबाट आउँछ, बाह्य प्रमाणबाट होइन।", category: 'selfworth' },
  { english: "I accept myself unconditionally.", nepali: "म आफूलाई बिना शर्त स्वीकार गर्छु।", category: 'selfworth' },
  { english: "I am worthy of taking up space.", nepali: "म ठाउँ लिनको योग्य छु।", category: 'selfworth' },
  { english: "I matter, my feelings matter, my dreams matter.", nepali: "म महत्त्व राख्छु, मेरो भावनाले महत्त्व राख्छ, मेरो सपनाले महत्त्व राख्छ।", category: 'selfworth' },
  { english: "I am irreplaceable and special.", nepali: "म अपरिवर्तनीय र विशेष छु।", category: 'selfworth' },
  { english: "Every day I become more confident in my worth.", nepali: "हरेक दिन म आफ्नो मूल्यमा बढी आत्मविश्वासी हुँदै जान्छु।", category: 'selfworth' },

  // BEAUTY (15)
  { english: "I am beautiful inside and out.", nepali: "म भित्र र बाहिर सुन्दर छु।", category: 'beauty' },
  { english: "My beauty shines from my soul.", nepali: "मेरो सुन्दरता मेरो आत्माबाट चम्कन्छ।", category: 'beauty' },
  { english: "I embrace my unique features that make me beautiful.", nepali: "म मेरो अद्वितीय विशेषताहरू अँगाल्छु जसले मलाई सुन्दर बनाउँछ।", category: 'beauty' },
  { english: "My smile brightens the world.", nepali: "मेरो मुस्कानले संसार उज्यालो बनाउँछ।", category: 'beauty' },
  { english: "I am gorgeous, glowing, and graceful.", nepali: "म आकर्षक, चम्किलो र अनुग्रहपूर्ण छु।", category: 'beauty' },
  { english: "Beauty radiates from my kindness.", nepali: "सुन्दरता मेरो दयाबाट विकिरण हुन्छ।", category: 'beauty' },
  { english: "I love my body and treat it with respect.", nepali: "म मेरो शरीर माया गर्छु र सम्मानका साथ व्यवहार गर्छु।", category: 'beauty' },
  { english: "My eyes tell stories of love and warmth.", nepali: "मेरो आँखाले प्रेम र न्यानोपनको कथाहरू बताउँछ।", category: 'beauty' },
  { english: "I am attracted to beauty and beauty is attracted to me.", nepali: "म सुन्दरतातिर आकर्षित छु र सुन्दरता मतिर आकर्षित छ।", category: 'beauty' },
  { english: "My presence lights up any room I enter.", nepali: "मेरो उपस्थितिले म प्रवेश गर्ने कुनै पनि कोठा उज्यालो बनाउँछ।", category: 'beauty' },
  { english: "I am a masterpiece, crafted with love.", nepali: "म प्रेमले बनाइएको उत्कृष्ट कृति हुँ।", category: 'beauty' },
  { english: "My beauty grows with my wisdom.", nepali: "मेरो सुन्दरता मेरो ज्ञानसँगै बढ्छ।", category: 'beauty' },
  { english: "I see beauty in myself that others admire.", nepali: "म आफैंमा सुन्दरता देख्छु जुन अरूले प्रशंसा गर्छन्।", category: 'beauty' },
  { english: "My heart is beautiful, and it shows.", nepali: "मेरो मुटु सुन्दर छ, र यो देखिन्छ।", category: 'beauty' },
  { english: "I am aging gracefully and beautifully.", nepali: "म अनुग्रहपूर्ण र सुन्दर रूपमा बुढ्यौली गर्दैछु।", category: 'beauty' },

  // STRENGTH (15)
  { english: "I am stronger than my challenges.", nepali: "म मेरो चुनौतीहरूभन्दा बलियो छु।", category: 'strength' },
  { english: "I overcome obstacles with grace and ease.", nepali: "म अनुग्रह र सजिलोसँग बाधाहरू पार गर्छु।", category: 'strength' },
  { english: "My inner strength guides me through tough times.", nepali: "मेरो भित्री शक्तिले मलाई कठिन समयमा मार्गदर्शन गर्छ।", category: 'strength' },
  { english: "I am a warrior, not a worrier.", nepali: "म योद्धा हुँ, चिन्ताग्रस्त होइन।", category: 'strength' },
  { english: "Every setback is a setup for a comeback.", nepali: "हरेक पछाडि फर्किनको लागि सेटअप हो।", category: 'strength' },
  { english: "I rise after every fall, stronger than before.", nepali: "म हरेक पतन पछि पहिलेभन्दा बलियो भएर उठ्छु।", category: 'strength' },
  { english: "I am unbreakable and unstoppable.", nepali: "म अटूट र अनरोक्य छु।", category: 'strength' },
  { english: "I face my fears with courage.", nepali: "म साहसका साथ मेरो डर सामना गर्छु।", category: 'strength' },
  { english: "I am the hero of my own story.", nepali: "म आफ्नो कथाको नायक हुँ।", category: 'strength' },
  { english: "My past does not define my future.", nepali: "मेरो अतीतले मेरो भविष्य परिभाषित गर्दैन।", category: 'strength' },
  { english: "I turn pain into power.", nepali: "म पीडालाई शक्तिमा बदल्छु।", category: 'strength' },
  { english: "I am tough, tenacious, and triumphant.", nepali: "म कडा, दृढ र विजयी छु।", category: 'strength' },
  { english: "Nothing can break my spirit.", nepali: "केहीले पनि मेरो आत्मालाई तोड्न सक्दैन।", category: 'strength' },
  { english: "I embrace my power and use it wisely.", nepali: "म मेरो शक्ति अँगाल्छु र बुद्धिमानीसँग प्रयोग गर्छु।", category: 'strength' },
  { english: "I am a force of nature.", nepali: "म प्रकृतिको शक्ति हुँ।", category: 'strength' },

  // PEACE (15)
  { english: "I am at peace with myself and the world.", nepali: "म आफैंसँग र संसारसँग शान्तिमा छु।", category: 'peace' },
  { english: "I release all worries and embrace calm.", nepali: "म सबै चिन्ताहरू छोड्छु र शान्ति अँगाल्छु।", category: 'peace' },
  { english: "Peace flows through me with every breath.", nepali: "हरेक सासका साथ शान्ति मबाट बग्छ।", category: 'peace' },
  { english: "I choose serenity over stress.", nepali: "म तनावभन्दा शान्ति रोज्छु।", category: 'peace' },
  { english: "My mind is calm, my heart is at ease.", nepali: "मेरो मन शान्त छ, मेरो मुटु आरामदायी छ।", category: 'peace' },
  { english: "I let go of what I cannot control.", nepali: "म जे नियन्त्रण गर्न सक्दिन त्यो छोड्छु।", category: 'peace' },
  { english: "I am surrounded by tranquility.", nepali: "म शान्तिले घेरिएको छु।", category: 'peace' },
  { english: "Every moment is a chance to find inner peace.", nepali: "हरेक पल भित्री शान्ति फेला पार्ने अवसर हो।", category: 'peace' },
  { english: "I breathe in peace, I breathe out stress.", nepali: "म शान्ति भित्र लिन्छु, तनाव बाहिर छोड्छु।", category: 'peace' },
  { english: "I deserve a peaceful and happy life.", nepali: "म शान्तिपूर्ण र खुशी जीवनको योग्य छु।", category: 'peace' },
  { english: "I am grateful for this present moment.", nepali: "म यो वर्तमान पलको लागि आभारी छु।", category: 'peace' },
  { english: "I trust the universe to guide me.", nepali: "म ब्रह्माण्डलाई मार्गदर्शन गर्न विश्वास गर्छु।", category: 'peace' },
  { english: "Stillness brings me clarity and wisdom.", nepali: "स्थिरताले मलाई स्पष्टता र ज्ञान ल्याउँछ।", category: 'peace' },
  { english: "I am centered and grounded.", nepali: "म केन्द्रित र आधारित छु।", category: 'peace' },
  { english: "My soul is filled with peace and harmony.", nepali: "मेरो आत्मा शान्ति र सद्भावले भरिएको छ।", category: 'peace' },
];

const categoryInfo = {
  confidence: { emoji: '💪', name: 'Confidence', color: 'from-orange-400 to-amber-500' },
  love: { emoji: '💕', name: 'Love', color: 'from-rose-400 to-pink-500' },
  selfworth: { emoji: '👑', name: 'Self-Worth', color: 'from-purple-400 to-violet-500' },
  beauty: { emoji: '✨', name: 'Beauty', color: 'from-pink-400 to-rose-400' },
  strength: { emoji: '🔥', name: 'Strength', color: 'from-red-400 to-orange-500' },
  peace: { emoji: '🕊️', name: 'Peace', color: 'from-blue-400 to-cyan-500' },
};

export const DailyAffirmations = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation>(affirmations[0]);
  const [showNepali, setShowNepali] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('affirmation-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Set a random affirmation on load
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(random);
  }, []);

  useEffect(() => {
    localStorage.setItem('affirmation-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getNewAffirmation = () => {
    const filtered = selectedCategory 
      ? affirmations.filter(a => a.category === selectedCategory)
      : affirmations;
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentAffirmation(random);
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const copyAffirmation = () => {
    const text = showNepali ? currentAffirmation.nepali : currentAffirmation.english;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = () => {
    const text = currentAffirmation.english;
    if (favorites.includes(text)) {
      setFavorites(prev => prev.filter(f => f !== text));
    } else {
      setFavorites(prev => [...prev, text]);
    }
  };

  const isFavorite = favorites.includes(currentAffirmation.english);
  const category = categoryInfo[currentAffirmation.category];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <h3 className="text-xl font-serif text-rose-300 mb-2">
          Daily Affirmations
        </h3>
        <p className="text-white/60 text-sm">
          Start your day with positivity, Puntuu! 💕
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <motion.button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
            !selectedCategory
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
              : 'bg-white/10 text-white/70'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {Object.entries(categoryInfo).map(([key, info]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              selectedCategory === key
                ? `bg-gradient-to-r ${info.color} text-white`
                : 'bg-white/10 text-white/70'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span>{info.emoji}</span>
            <span>{info.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Main Affirmation Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAffirmation.english}
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          className={`relative p-6 rounded-3xl bg-gradient-to-br ${category.color}`}
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
        >
          {/* Category badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs flex items-center gap-1">
              {category.emoji} {category.name}
            </span>
            <motion.button
              onClick={toggleFavorite}
              whileTap={{ scale: 0.8 }}
              className="p-2"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'text-white fill-white' : 'text-white/60'}`} 
              />
            </motion.button>
          </div>

          {/* Affirmation text */}
          <motion.div 
            className="min-h-[100px] flex items-center justify-center"
            onClick={() => setShowNepali(!showNepali)}
          >
            <p className="text-white text-xl font-serif text-center leading-relaxed">
              "{showNepali ? currentAffirmation.nepali : currentAffirmation.english}"
            </p>
          </motion.div>

          {/* Language toggle hint */}
          <p className="text-white/60 text-xs text-center mt-4">
            Tap to see in {showNepali ? 'English' : 'Nepali'}
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-4">
            <motion.button
              onClick={copyAffirmation}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 px-4 py-2 rounded-full text-white text-sm flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* New Affirmation Button */}
      <motion.button
        onClick={getNewAffirmation}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium flex items-center justify-center gap-3"
        style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.3)' }}
      >
        <RefreshCw className="w-5 h-5" />
        New Affirmation
        <Sparkles className="w-5 h-5" />
      </motion.button>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <BookHeart className="w-6 h-6 text-rose-400 mx-auto mb-2" />
          <p className="text-white text-2xl font-bold">{affirmations.length}+</p>
          <p className="text-white/60 text-xs">Affirmations</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <p className="text-white text-2xl font-bold">{favorites.length}</p>
          <p className="text-white/60 text-xs">Favorites</p>
        </div>
      </div>

      {/* Romantic message */}
      <motion.div
        className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-4 text-center border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/80 font-serif text-sm italic">
          "You deserve to hear these words every day. I believe in you completely, Puntuu!" 💕
        </p>
      </motion.div>
    </div>
  );
};
