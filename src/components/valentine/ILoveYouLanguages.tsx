import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Globe, Volume2, Sparkles, X } from "lucide-react";
import ReactDOM from "react-dom";

interface Language {
  language: string;
  country: string;
  flag: string;
  iLoveYou: string;
  pronunciation?: string;
}

// 100+ ways to say I Love You
const allLanguages: Language[] = [
  { language: "English", country: "USA/UK", flag: "🇺🇸", iLoveYou: "I love you", pronunciation: "I luv yoo" },
  { language: "Nepali", country: "Nepal", flag: "🇳🇵", iLoveYou: "म तिमीलाई माया गर्छु", pronunciation: "Ma timilai maya garchhu" },
  { language: "Hindi", country: "India", flag: "🇮🇳", iLoveYou: "मैं तुमसे प्यार करता/करती हूँ", pronunciation: "Main tumse pyaar karta/karti hoon" },
  { language: "Spanish", country: "Spain", flag: "🇪🇸", iLoveYou: "Te quiero / Te amo", pronunciation: "Teh kee-eh-roh / Teh ah-moh" },
  { language: "French", country: "France", flag: "🇫🇷", iLoveYou: "Je t'aime", pronunciation: "Zhuh tem" },
  { language: "German", country: "Germany", flag: "🇩🇪", iLoveYou: "Ich liebe dich", pronunciation: "Ikh lee-buh dikh" },
  { language: "Italian", country: "Italy", flag: "🇮🇹", iLoveYou: "Ti amo", pronunciation: "Tee ah-moh" },
  { language: "Portuguese", country: "Brazil", flag: "🇧🇷", iLoveYou: "Eu te amo", pronunciation: "Eh-oo chee ah-moo" },
  { language: "Japanese", country: "Japan", flag: "🇯🇵", iLoveYou: "愛してる", pronunciation: "Aishiteru" },
  { language: "Korean", country: "South Korea", flag: "🇰🇷", iLoveYou: "사랑해요", pronunciation: "Saranghaeyo" },
  { language: "Chinese (Mandarin)", country: "China", flag: "🇨🇳", iLoveYou: "我爱你", pronunciation: "Wǒ ài nǐ" },
  { language: "Arabic", country: "Middle East", flag: "🇸🇦", iLoveYou: "أحبك", pronunciation: "Uhibbuka/Uhibbuki" },
  { language: "Russian", country: "Russia", flag: "🇷🇺", iLoveYou: "Я тебя люблю", pronunciation: "Ya tebya lyublyu" },
  { language: "Greek", country: "Greece", flag: "🇬🇷", iLoveYou: "Σ'αγαπώ", pronunciation: "S'agapó" },
  { language: "Turkish", country: "Turkey", flag: "🇹🇷", iLoveYou: "Seni seviyorum", pronunciation: "Seh-nee seh-vee-yor-um" },
  { language: "Dutch", country: "Netherlands", flag: "🇳🇱", iLoveYou: "Ik hou van jou", pronunciation: "Ik how van yow" },
  { language: "Polish", country: "Poland", flag: "🇵🇱", iLoveYou: "Kocham cię", pronunciation: "Ko-ham che" },
  { language: "Swedish", country: "Sweden", flag: "🇸🇪", iLoveYou: "Jag älskar dig", pronunciation: "Yag el-skar dey" },
  { language: "Norwegian", country: "Norway", flag: "🇳🇴", iLoveYou: "Jeg elsker deg", pronunciation: "Yai el-sker dai" },
  { language: "Danish", country: "Denmark", flag: "🇩🇰", iLoveYou: "Jeg elsker dig", pronunciation: "Yai el-sker die" },
  { language: "Finnish", country: "Finland", flag: "🇫🇮", iLoveYou: "Minä rakastan sinua", pronunciation: "Mee-na ra-kas-tan see-noo-a" },
  { language: "Hebrew", country: "Israel", flag: "🇮🇱", iLoveYou: "אני אוהב/ת אותך", pronunciation: "Ani ohev/ohevet otcha" },
  { language: "Thai", country: "Thailand", flag: "🇹🇭", iLoveYou: "ผม/ฉันรักคุณ", pronunciation: "Phom/Chan rak khun" },
  { language: "Vietnamese", country: "Vietnam", flag: "🇻🇳", iLoveYou: "Anh yêu em / Em yêu anh", pronunciation: "Ahn yew em" },
  { language: "Indonesian", country: "Indonesia", flag: "🇮🇩", iLoveYou: "Aku cinta kamu", pronunciation: "Ah-koo chin-ta ka-moo" },
  { language: "Malay", country: "Malaysia", flag: "🇲🇾", iLoveYou: "Saya cintakan awak", pronunciation: "Sa-ya chin-ta-kan a-wak" },
  { language: "Filipino", country: "Philippines", flag: "🇵🇭", iLoveYou: "Mahal kita", pronunciation: "Ma-hal kee-ta" },
  { language: "Bengali", country: "Bangladesh", flag: "🇧🇩", iLoveYou: "আমি তোমাকে ভালোবাসি", pronunciation: "Ami tomake bhalobashi" },
  { language: "Tamil", country: "Tamil Nadu", flag: "🇮🇳", iLoveYou: "நான் உன்னை காதலிக்கிறேன்", pronunciation: "Naan unnai kaadhalikiren" },
  { language: "Telugu", country: "Andhra Pradesh", flag: "🇮🇳", iLoveYou: "నేను నిన్ను ప్రేమిస్తున్నాను", pronunciation: "Nenu ninnu premistunnanu" },
  { language: "Marathi", country: "Maharashtra", flag: "🇮🇳", iLoveYou: "मी तुझ्यावर प्रेम करतो/करते", pronunciation: "Mi tujhyavar prem karto/karte" },
  { language: "Gujarati", country: "Gujarat", flag: "🇮🇳", iLoveYou: "હું તને પ્રેમ કરું છું", pronunciation: "Hoon tane prem karoo chhoo" },
  { language: "Punjabi", country: "Punjab", flag: "🇮🇳", iLoveYou: "ਮੈਂ ਤੁਹਾਨੂੰ ਪਿਆਰ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ", pronunciation: "Main tuhanu pyar karda/kardi haan" },
  { language: "Urdu", country: "Pakistan", flag: "🇵🇰", iLoveYou: "میں تم سے پیار کرتا/کرتی ہوں", pronunciation: "Main tumse pyaar karta/karti hoon" },
  { language: "Persian", country: "Iran", flag: "🇮🇷", iLoveYou: "دوستت دارم", pronunciation: "Dooset daram" },
  { language: "Swahili", country: "East Africa", flag: "🇰🇪", iLoveYou: "Nakupenda", pronunciation: "Na-koo-pen-da" },
  { language: "Zulu", country: "South Africa", flag: "🇿🇦", iLoveYou: "Ngiyakuthanda", pronunciation: "Ngi-ya-ku-tan-da" },
  { language: "Afrikaans", country: "South Africa", flag: "🇿🇦", iLoveYou: "Ek het jou lief", pronunciation: "Ek het yo leef" },
  { language: "Czech", country: "Czech Republic", flag: "🇨🇿", iLoveYou: "Miluji tě", pronunciation: "Mi-lu-yi tyeh" },
  { language: "Hungarian", country: "Hungary", flag: "🇭🇺", iLoveYou: "Szeretlek", pronunciation: "Se-ret-lek" },
  { language: "Romanian", country: "Romania", flag: "🇷🇴", iLoveYou: "Te iubesc", pronunciation: "Teh yoo-besk" },
  { language: "Bulgarian", country: "Bulgaria", flag: "🇧🇬", iLoveYou: "Обичам те", pronunciation: "Obicham te" },
  { language: "Croatian", country: "Croatia", flag: "🇭🇷", iLoveYou: "Volim te", pronunciation: "Vo-lim teh" },
  { language: "Serbian", country: "Serbia", flag: "🇷🇸", iLoveYou: "Волим те", pronunciation: "Volim te" },
  { language: "Slovak", country: "Slovakia", flag: "🇸🇰", iLoveYou: "Ľúbim ťa", pronunciation: "Lyoo-bim tya" },
  { language: "Slovenian", country: "Slovenia", flag: "🇸🇮", iLoveYou: "Ljubim te", pronunciation: "Lyoo-bim teh" },
  { language: "Ukrainian", country: "Ukraine", flag: "🇺🇦", iLoveYou: "Я тебе кохаю", pronunciation: "Ya tebe kokhayu" },
  { language: "Estonian", country: "Estonia", flag: "🇪🇪", iLoveYou: "Ma armastan sind", pronunciation: "Ma ar-mas-tan sind" },
  { language: "Latvian", country: "Latvia", flag: "🇱🇻", iLoveYou: "Es tevi mīlu", pronunciation: "Es te-vi mee-lu" },
  { language: "Lithuanian", country: "Lithuania", flag: "🇱🇹", iLoveYou: "Aš tave myliu", pronunciation: "Ash ta-ve mi-lyu" },
  { language: "Icelandic", country: "Iceland", flag: "🇮🇸", iLoveYou: "Ég elska þig", pronunciation: "Yeg el-ska thig" },
  { language: "Welsh", country: "Wales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", iLoveYou: "Rwy'n dy garu di", pronunciation: "Rween dee ga-ree dee" },
  { language: "Irish", country: "Ireland", flag: "🇮🇪", iLoveYou: "Tá grá agam duit", pronunciation: "Taw graw a-gum dwit" },
  { language: "Scottish Gaelic", country: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", iLoveYou: "Tha gaol agam ort", pronunciation: "Ha gool akum orsht" },
  { language: "Catalan", country: "Catalonia", flag: "🇪🇸", iLoveYou: "T'estimo", pronunciation: "Tes-tee-mo" },
  { language: "Basque", country: "Basque Country", flag: "🇪🇸", iLoveYou: "Maite zaitut", pronunciation: "My-teh zai-toot" },
  { language: "Galician", country: "Galicia", flag: "🇪🇸", iLoveYou: "Quérote", pronunciation: "Keh-ro-teh" },
  { language: "Latin", country: "Ancient Rome", flag: "🏛️", iLoveYou: "Te amo", pronunciation: "Teh ah-mo" },
  { language: "Esperanto", country: "International", flag: "🌍", iLoveYou: "Mi amas vin", pronunciation: "Mee a-mas veen" },
  { language: "Hawaiian", country: "Hawaii", flag: "🌺", iLoveYou: "Aloha wau iā 'oe", pronunciation: "A-lo-ha vau ee-ah o-eh" },
  { language: "Maori", country: "New Zealand", flag: "🇳🇿", iLoveYou: "Kei te aroha au i a koe", pronunciation: "Kay teh a-ro-ha ow ee a ko-eh" },
  { language: "Samoan", country: "Samoa", flag: "🇼🇸", iLoveYou: "Ou te alofa ia te oe", pronunciation: "Ow teh a-lo-fa ee-a teh o-eh" },
  { language: "Tongan", country: "Tonga", flag: "🇹🇴", iLoveYou: "'Ofa atu", pronunciation: "O-fa a-too" },
  { language: "Fijian", country: "Fiji", flag: "🇫🇯", iLoveYou: "Au domoni iko", pronunciation: "Ow do-mo-nee ee-ko" },
  { language: "Mongolian", country: "Mongolia", flag: "🇲🇳", iLoveYou: "Би чамд хайртай", pronunciation: "Bi chamd khairtai" },
  { language: "Tibetan", country: "Tibet", flag: "🏔️", iLoveYou: "ང་ཁྱེད་རང་ལ་དགའ།", pronunciation: "Nga khyed-rang-la dga" },
  { language: "Burmese", country: "Myanmar", flag: "🇲🇲", iLoveYou: "ချစ်တယ်", pronunciation: "Chit tae" },
  { language: "Khmer", country: "Cambodia", flag: "🇰🇭", iLoveYou: "ខ្ញុំស្រលាញ់អ្នក", pronunciation: "Knyom srolanh nak" },
  { language: "Lao", country: "Laos", flag: "🇱🇦", iLoveYou: "ຂ້ອຍຮັກເຈົ້າ", pronunciation: "Khoi hak chao" },
  { language: "Sinhala", country: "Sri Lanka", flag: "🇱🇰", iLoveYou: "මම ඔයාට ආදරෙයි", pronunciation: "Mama oyaata adarei" },
  { language: "Kazakh", country: "Kazakhstan", flag: "🇰🇿", iLoveYou: "Мен сені сүйемін", pronunciation: "Men seni suyemin" },
  { language: "Uzbek", country: "Uzbekistan", flag: "🇺🇿", iLoveYou: "Men sizni sevaman", pronunciation: "Men siz-ni se-va-man" },
  { language: "Georgian", country: "Georgia", flag: "🇬🇪", iLoveYou: "მიყვარხარ", pronunciation: "Mikvarkhar" },
  { language: "Armenian", country: "Armenia", flag: "🇦🇲", iLoveYou: "Ես քdelays սdelays delays delay սdelays" },
  { language: "Albanian", country: "Albania", flag: "🇦🇱", iLoveYou: "Të dua", pronunciation: "Te doo-a" },
  { language: "Maltese", country: "Malta", flag: "🇲🇹", iLoveYou: "Inħobbok", pronunciation: "In-hob-bok" },
  { language: "Kurdish", country: "Kurdistan", flag: "🏳️", iLoveYou: "Ez te hez dikim", pronunciation: "Ez teh hez di-kim" },
  { language: "Pashto", country: "Afghanistan", flag: "🇦🇫", iLoveYou: "زه تا سره مینه لرم", pronunciation: "Za ta sara meena larum" },
  { language: "Amharic", country: "Ethiopia", flag: "🇪🇹", iLoveYou: "እወድሻለሁ", pronunciation: "Ewedishalehu" },
  { language: "Yoruba", country: "Nigeria", flag: "🇳🇬", iLoveYou: "Mo nifẹ̀ẹ rẹ", pronunciation: "Mo nee-feh reh" },
  { language: "Igbo", country: "Nigeria", flag: "🇳🇬", iLoveYou: "A hụrụ m gị n'anya", pronunciation: "A hu-ru m gi n'a-nya" },
  { language: "Hausa", country: "Nigeria", flag: "🇳🇬", iLoveYou: "Ina sonki/Ina sonka", pronunciation: "Ee-na son-ki" },
  { language: "Xhosa", country: "South Africa", flag: "🇿🇦", iLoveYou: "Ndiyakuthanda", pronunciation: "Ndi-ya-ku-tan-da" },
  { language: "Shona", country: "Zimbabwe", flag: "🇿🇼", iLoveYou: "Ndinokuda", pronunciation: "Ndi-no-ku-da" },
  { language: "Twi", country: "Ghana", flag: "🇬🇭", iLoveYou: "Me dɔ wo", pronunciation: "Meh daw woh" },
  { language: "Wolof", country: "Senegal", flag: "🇸🇳", iLoveYou: "Begg naa la", pronunciation: "Beg na la" },
  { language: "Somali", country: "Somalia", flag: "🇸🇴", iLoveYou: "Waan ku jeclahay", pronunciation: "Waan koo jec-la-hai" },
  { language: "Tigrinya", country: "Eritrea", flag: "🇪🇷", iLoveYou: "የፍቅረካ", pronunciation: "Yefkireka" },
  { language: "Malagasy", country: "Madagascar", flag: "🇲🇬", iLoveYou: "Tiako ianao", pronunciation: "Tee-ah-ko ee-ah-now" },
  { language: "Luxembourgish", country: "Luxembourg", flag: "🇱🇺", iLoveYou: "Ech hunn dech gär", pronunciation: "Ech hun dech gair" },
  { language: "Frisian", country: "Netherlands", flag: "🇳🇱", iLoveYou: "Ik hâld fan dy", pronunciation: "Ik hold fan dee" },
  { language: "Corsican", country: "Corsica", flag: "🇫🇷", iLoveYou: "Ti tengu cara", pronunciation: "Tee ten-goo ka-ra" },
  { language: "Sardinian", country: "Sardinia", flag: "🇮🇹", iLoveYou: "T'amo", pronunciation: "Tah-mo" },
  { language: "Sign Language", country: "Universal", flag: "🤟", iLoveYou: "🤟 (ILY sign)", pronunciation: "Hand sign: thumb, index, pinky extended" },
  { language: "Emoji", country: "Digital World", flag: "💕", iLoveYou: "💕❤️🥰😍💖", pronunciation: "Heart emojis" },
  { language: "Music Notes", country: "Universal", flag: "🎵", iLoveYou: "♪ You are my sunshine ♪", pronunciation: "Sing it with love!" },
];

const LanguageModal = ({
  language,
  onClose
}: {
  language: Language;
  onClose: () => void;
}) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      {/* Floating hearts */}
      {[...Array(25)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {['💕', '❤️', '💖', '💗', '💓', '💝', '💘'][i % 7]}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.5, rotate: 10 }}
        className="bg-gradient-to-b from-pink-900/70 to-purple-900/70 rounded-3xl p-8 max-w-sm w-full text-center border border-pink-500/40"
        onClick={e => e.stopPropagation()}
      >
        {/* Flag */}
        <motion.span
          className="text-7xl block mb-4"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {language.flag}
        </motion.span>

        {/* Language name */}
        <p className="text-pink-300 text-lg font-medium mb-2">
          {language.language}
        </p>
        <p className="text-white/60 text-sm mb-4">
          {language.country}
        </p>

        {/* I Love You in this language */}
        <motion.div
          className="bg-white/10 rounded-2xl p-6 mb-4"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-white text-2xl font-serif mb-2">
            {language.iLoveYou}
          </p>
          {language.pronunciation && (
            <p className="text-pink-300/80 text-sm italic">
              "{language.pronunciation}"
            </p>
          )}
        </motion.div>

        {/* For Puntuu */}
        <motion.p
          className="text-pink-300 font-serif"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          For you, Puntuu, in every language 💕
        </motion.p>

        <motion.button
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="inline mr-2" size={18} />
          Close
        </motion.button>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const ILoveYouLanguages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('iloveyou-discovered');
    if (saved) setDiscoveredCount(parseInt(saved));
  }, []);

  const handleSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    const newCount = discoveredCount + 1;
    setDiscoveredCount(newCount);
    localStorage.setItem('iloveyou-discovered', String(newCount));
  };

  const filteredLanguages = allLanguages.filter(lang =>
    lang.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          className="flex justify-center gap-2 text-4xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Globe className="text-blue-400" size={36} />
          <span>❤️</span>
          <Sparkles className="text-yellow-400" size={36} />
        </motion.div>
        <h3 className="text-xl font-serif text-pink-300">I Love You in Every Language</h3>
        <p className="text-white/60 text-sm">
          {allLanguages.length} ways to say "I Love You, Puntuu" 💕
        </p>
        <p className="text-pink-400 text-xs">
          💖 Discovered {discoveredCount} love languages together
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search languages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white/10 border border-pink-500/30 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-pink-500"
      />

      {/* Language grid */}
      <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-1">
        {filteredLanguages.map((lang, index) => (
          <motion.button
            key={lang.language}
            onClick={() => handleSelect(lang)}
            className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-3 text-center border border-pink-500/20 hover:border-pink-400/60 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl block">{lang.flag}</span>
            <p className="text-white/80 text-xs mt-1 truncate">{lang.language}</p>
          </motion.button>
        ))}
      </div>

      {/* Nepali highlight */}
      <motion.div
        className="bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl p-4 border border-red-500/30 text-center"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-3xl">🇳🇵</span>
        <p className="text-red-300 font-serif text-lg mt-2">
          म तिमीलाई माया गर्छु, मेरो पुन्तु
        </p>
        <p className="text-white/60 text-sm italic">
          "Ma timilai maya garchhu, mero Puntuu"
        </p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedLanguage && (
          <LanguageModal
            language={selectedLanguage}
            onClose={() => setSelectedLanguage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
