// Karaoke Song Database - 100+ songs across Hindi, English, and Nepali

export interface Song {
  id: string;
  title: string;
  artist: string;
  emoji: string;
  genre: string;
  language: 'Hindi' | 'English' | 'Nepali';
  duration: string;
  mood?: string;
  singingTips?: string;
  theme?: string;
}

const defaultLyrics = [
  "🎵 Search for lyrics online 🎵",
  "♪ Sing along with your heart ♪",
  "💕 Feel the music flow through you 💕",
  "",
  "🎤 Record your beautiful voice! 🎤",
];

// Hindi Songs (Bollywood) with rich descriptions
const hindiSongs: Song[] = [
  { id: 'tum-hi-ho', title: 'Tum Hi Ho', artist: 'Arijit Singh', emoji: '💕', genre: 'Romantic', language: 'Hindi', duration: '4:22', mood: 'Deeply romantic, soulful', theme: 'Eternal love, devotion', singingTips: 'Start soft, build emotion gradually, let your heart pour out on the chorus' },
  { id: 'raabta', title: 'Raabta', artist: 'Arijit Singh', emoji: '🌙', genre: 'Romantic', language: 'Hindi', duration: '4:45', mood: 'Mystical, longing', theme: 'Cosmic connection, soulmates', singingTips: 'Feel the connection between souls, emphasize the yearning in verses' },
  { id: 'kal-ho-naa-ho', title: 'Kal Ho Naa Ho', artist: 'Sonu Nigam', emoji: '⭐', genre: 'Emotional', language: 'Hindi', duration: '5:20', mood: 'Bittersweet, hopeful', theme: 'Living in the moment, cherishing love', singingTips: 'Balance joy and sadness, smile through the tears' },
  { id: 'tujhe-dekha', title: 'Tujhe Dekha To', artist: 'Kumar Sanu & Lata', emoji: '🎬', genre: 'Classic', language: 'Hindi', duration: '5:45', mood: 'Iconic, timeless romance', theme: 'First sight love, destiny', singingTips: 'Classic melody - let nostalgia guide your voice, duet with your love!' },
  { id: 'pehla-nasha', title: 'Pehla Nasha', artist: 'Udit Narayan', emoji: '🦋', genre: 'Classic', language: 'Hindi', duration: '5:10', mood: 'First love butterflies', theme: 'Innocent first love, infatuation', singingTips: 'Sing with wide-eyed wonder, remember your first crush' },
  { id: 'channa-mereya', title: 'Channa Mereya', artist: 'Arijit Singh', emoji: '💔', genre: 'Emotional', language: 'Hindi', duration: '4:49', mood: 'Heartbreak, letting go', theme: 'Sacrifice in love, blessing the beloved', singingTips: 'Pour your soul into the high notes, embrace the pain beautifully' },
  { id: 'mere-haath-mein', title: 'Mere Haath Mein', artist: 'Sonu Nigam', emoji: '🤝', genre: 'Romantic', language: 'Hindi', duration: '5:15', mood: 'Promising, secure', theme: 'Partnership, commitment', singingTips: 'Hold hands while singing, make promises with your voice' },
  { id: 'kabira', title: 'Kabira', artist: 'Arijit Singh', emoji: '🎭', genre: 'Soulful', language: 'Hindi', duration: '3:42', mood: 'Mystical, questioning', theme: 'Spiritual love, inner turmoil', singingTips: 'Let the philosophical depth come through, feel the wandering soul' },
  { id: 'tera-ban-jaunga', title: 'Tera Ban Jaunga', artist: 'Akhil & Tulsi', emoji: '💑', genre: 'Romantic', language: 'Hindi', duration: '3:56', mood: 'Complete devotion', theme: 'Becoming one with beloved', singingTips: 'Perfect duet song - harmonize on the chorus, lock eyes' },
  { id: 'tere-sang-yaara', title: 'Tere Sang Yaara', artist: 'Atif Aslam', emoji: '🌅', genre: 'Romantic', language: 'Hindi', duration: '4:31', mood: 'Companion love, warmth', theme: 'Journey together, best friends in love', singingTips: 'Atif\'s unique style - add those signature alaaps!' },
  { id: 'kuch-kuch', title: 'Kuch Kuch Hota Hai', artist: 'Udit & Alka', emoji: '💝', genre: 'Classic', language: 'Hindi', duration: '5:24', mood: 'Sweet realization', theme: 'Falling for your friend', singingTips: 'Playful on verses, heartfelt on chorus - the SRK way!' },
  { id: 'ae-dil-hai-mushkil', title: 'Ae Dil Hai Mushkil', artist: 'Arijit Singh', emoji: '💫', genre: 'Emotional', language: 'Hindi', duration: '4:29', mood: 'Unrequited love', theme: 'Loving without being loved back', singingTips: 'Embrace the complexity of one-sided love, crescendo on title' },
  { id: 'gerua', title: 'Gerua', artist: 'Arijit Singh', emoji: '🧡', genre: 'Romantic', language: 'Hindi', duration: '5:48', mood: 'Vibrant, colorful love', theme: 'Painting life with love', singingTips: 'Think of dancing in saffron fields, let joy paint your voice' },
  { id: 'hawayein', title: 'Hawayein', artist: 'Arijit Singh', emoji: '🌊', genre: 'Romantic', language: 'Hindi', duration: '4:50', mood: 'Fresh, breezy love', theme: 'Love like wind - everywhere', singingTips: 'Light and airy vocals, feel the gentle breeze of love' },
  { id: 'bekhayali', title: 'Bekhayali', artist: 'Sachet Tandon', emoji: '🔥', genre: 'Intense', language: 'Hindi', duration: '3:55', mood: 'Raw, passionate', theme: 'Obsessive love, sleepless nights', singingTips: 'Start intense, build to explosion, let raw emotion take over' },
  { id: 'kesariya', title: 'Kesariya', artist: 'Arijit Singh', emoji: '🌸', genre: 'Romantic', language: 'Hindi', duration: '4:28', mood: 'Warm, precious', theme: 'Love as sacred as saffron', singingTips: 'Warm honey tones, let the melody flow like the song name' },
  { id: 'dil-diyan-gallan', title: 'Dil Diyan Gallan', artist: 'Atif Aslam', emoji: '💗', genre: 'Romantic', language: 'Hindi', duration: '4:40', mood: 'Heart conversations', theme: 'Heart-to-heart talks', singingTips: 'Intimate like a whisper, build to declaration' },
  { id: 'janam-janam', title: 'Janam Janam', artist: 'Arijit Singh', emoji: '♾️', genre: 'Romantic', language: 'Hindi', duration: '5:16', mood: 'Eternal, timeless', theme: 'Love across lifetimes', singingTips: 'Feel the weight of eternal love, powerful on the chorus' },
  { id: 'lag-ja-gale', title: 'Lag Ja Gale', artist: 'Lata Mangeshkar', emoji: '🌹', genre: 'Classic', language: 'Hindi', duration: '4:05', mood: 'Timeless romance', theme: 'Embrace before parting', singingTips: 'Channel Lata ji\'s grace, every note is precious' },
  { id: 'tera-hone-laga', title: 'Tera Hone Laga Hoon', artist: 'Atif Aslam', emoji: '🌟', genre: 'Romantic', language: 'Hindi', duration: '4:27', mood: 'Falling in love', theme: 'Becoming yours', singingTips: 'Feel the transformation, voice should show the change' },
  { id: 'tum-se-hi', title: 'Tum Se Hi', artist: 'Mohit Chauhan', emoji: '🌈', genre: 'Romantic', language: 'Hindi', duration: '5:28', mood: 'Complete, whole', theme: 'Day starts and ends with you', singingTips: 'Mohit\'s rustic voice style - genuine and earthy' },
  { id: 'agar-tum-saath-ho', title: 'Agar Tum Saath Ho', artist: 'Arijit & Alka', emoji: '🥺', genre: 'Emotional', language: 'Hindi', duration: '5:41', mood: 'Pleading, desperate', theme: 'Begging for togetherness', singingTips: 'Beautiful duet - feel the desperation, the need' },
  { id: 'tum-mile', title: 'Tum Mile', artist: 'Neeraj Shridhar', emoji: '✨', genre: 'Romantic', language: 'Hindi', duration: '4:35', mood: 'Reunion joy', theme: 'Meeting after longing', singingTips: 'Joy of finding love, let happiness burst through' },
  { id: 'jeena-jeena', title: 'Jeena Jeena', artist: 'Atif Aslam', emoji: '🎵', genre: 'Romantic', language: 'Hindi', duration: '3:28', mood: 'Living for love', theme: 'Life means loving you', singingTips: 'Simple and heartfelt, don\'t over-complicate' },
  { id: 'pee-loon', title: 'Pee Loon', artist: 'Mohit Chauhan', emoji: '🍷', genre: 'Romantic', language: 'Hindi', duration: '4:53', mood: 'Intoxicated by love', theme: 'Drinking in beloved\'s essence', singingTips: 'Dreamy, intoxicated voice, slightly husky works great' },
  { id: 'sun-mere-humsafar', title: 'Sun Mere Humsafar', artist: 'Arijit Singh', emoji: '🛤️', genre: 'Romantic', language: 'Hindi', duration: '4:12', mood: 'Companionship', theme: 'Life partner, travel together', singingTips: 'Sweet call to your partner, sincere and warm' },
  { id: 'phir-bhi-tumko', title: 'Phir Bhi Tumko Chaahunga', artist: 'Arijit Singh', emoji: '💓', genre: 'Romantic', language: 'Hindi', duration: '4:45', mood: 'Persistent love', theme: 'Will love you anyway', singingTips: 'Build determination in voice, unwavering commitment' },
  { id: 'roke-na-ruke', title: 'Roke Na Ruke Naina', artist: 'Arijit Singh', emoji: '😢', genre: 'Emotional', language: 'Hindi', duration: '4:22', mood: 'Tears of love', theme: 'Eyes won\'t stop crying', singingTips: 'Let real emotion come through, break in voice is okay' },
  { id: 'bolna', title: 'Bolna', artist: 'Arijit & Asees', emoji: '💭', genre: 'Romantic', language: 'Hindi', duration: '4:08', mood: 'Gentle request', theme: 'Speak to me, I\'m listening', singingTips: 'Tender and gentle, perfect for intimate setting' },
  { id: 'soch-na-sake', title: 'Soch Na Sake', artist: 'Arijit & Tulsi', emoji: '💘', genre: 'Romantic', language: 'Hindi', duration: '5:00', mood: 'Cannot stop thinking', theme: 'Consumed by thoughts of you', singingTips: 'Duet chemistry is key, respond to each other' },
  { id: 'galliyan', title: 'Galliyan', artist: 'Ankit Tiwari', emoji: '🏠', genre: 'Romantic', language: 'Hindi', duration: '4:52', mood: 'Coming home to love', theme: 'Love is home', singingTips: 'Feeling of homecoming, warmth in every word' },
  { id: 'ilahi', title: 'Ilahi', artist: 'Arijit Singh', emoji: '🏔️', genre: 'Upbeat', language: 'Hindi', duration: '3:40', mood: 'Wanderlust, freedom', theme: 'Divine moments of joy', singingTips: 'Upbeat and free, feel the mountain air!' },
  { id: 'mere-naam-tu', title: 'Mere Naam Tu', artist: 'Abhay Jodhpurkar', emoji: '💍', genre: 'Romantic', language: 'Hindi', duration: '4:35', mood: 'Complete belonging', theme: 'You are my everything', singingTips: 'Wedding song vibes, pure joy and belonging' },
  { id: 'pal-pal-dil-ke', title: 'Pal Pal Dil Ke Paas', artist: 'Arijit Singh', emoji: '💖', genre: 'Romantic', language: 'Hindi', duration: '4:28', mood: 'Heart belongs to you', theme: 'Close to heart always', singingTips: 'Keep beloved close to heart while singing' },
  { id: 'kaun-tujhe', title: 'Kaun Tujhe', artist: 'Palak Muchhal', emoji: '🌺', genre: 'Romantic', language: 'Hindi', duration: '4:12', mood: 'Soft admiration', theme: 'Who loves you like I do', singingTips: 'Palak\'s sweet voice style, innocent and pure' },
  { id: 'mast-magan', title: 'Mast Magan', artist: 'Arijit Singh', emoji: '😍', genre: 'Romantic', language: 'Hindi', duration: '4:22', mood: 'Lost in love', theme: 'Happily lost in you', singingTips: 'Dreamy and lost, float on the melody' },
  { id: 'raataan-lambiyan', title: 'Raataan Lambiyan', artist: 'Jubin & Asees', emoji: '🌃', genre: 'Romantic', language: 'Hindi', duration: '3:50', mood: 'Long romantic nights', theme: 'Nights feel long without you', singingTips: 'Perfect duet, Punjabi flavor, playful chemistry' },
  { id: 'mann-bharrya', title: 'Mann Bharrya', artist: 'B Praak', emoji: '💔', genre: 'Emotional', language: 'Hindi', duration: '4:15', mood: 'Deep hurt, regret', theme: 'Heart is full of pain', singingTips: 'B Praak\'s raw emotional style, let pain surface' },
  { id: 'o-sanam', title: 'O Sanam', artist: 'Lucky Ali', emoji: '🎸', genre: 'Classic', language: 'Hindi', duration: '5:30', mood: 'Soulful calling', theme: 'Calling out to beloved', singingTips: 'Lucky Ali\'s unique style - soulful and meditative' },
  { id: 'sanam-teri-kasam', title: 'Sanam Teri Kasam', artist: 'Ankit Tiwari', emoji: '🙏', genre: 'Romantic', language: 'Hindi', duration: '5:15', mood: 'Sworn devotion', theme: 'I swear by your name', singingTips: 'Devotional love, like a prayer to beloved' },
];

// English Songs with rich descriptions
const englishSongs: Song[] = [
  { id: 'perfect', title: 'Perfect', artist: 'Ed Sheeran', emoji: '💍', genre: 'Romantic', language: 'English', duration: '4:23', mood: 'Wedding bliss', theme: 'Finding your perfect person', singingTips: 'Gentle guitar feel, build to emotional chorus, perfect for slow dance' },
  { id: 'thinking-out-loud', title: 'Thinking Out Loud', artist: 'Ed Sheeran', emoji: '💭', genre: 'Romantic', language: 'English', duration: '4:41', mood: 'Timeless devotion', theme: 'Loving at 70 like at 23', singingTips: 'Smooth and soulful, let the promise of forever flow' },
  { id: 'all-of-me', title: 'All of Me', artist: 'John Legend', emoji: '💕', genre: 'Romantic', language: 'English', duration: '4:29', mood: 'Unconditional love', theme: 'Loving every imperfection', singingTips: 'Piano ballad - build emotion, powerful on "all of me loves all of you"' },
  { id: 'a-thousand-years', title: 'A Thousand Years', artist: 'Christina Perri', emoji: '⏳', genre: 'Romantic', language: 'English', duration: '4:45', mood: 'Eternal waiting', theme: 'Love that waited lifetimes', singingTips: 'Delicate on verses, soaring on chorus, Twilight wedding vibes' },
  { id: 'say-you-wont-let-go', title: "Say You Won't Let Go", artist: 'James Arthur', emoji: '🤝', genre: 'Romantic', language: 'English', duration: '3:31', mood: 'Holding on forever', theme: 'Never letting go', singingTips: 'Raw and honest vocals, tell your love story through it' },
  { id: 'love-me-like-you-do', title: 'Love Me Like You Do', artist: 'Ellie Goulding', emoji: '💗', genre: 'Romantic', language: 'English', duration: '4:10', mood: 'Passionate need', theme: 'Touch me, love me', singingTips: 'Breathy verses, powerful chorus, feel the electricity' },
  { id: 'cant-help-falling', title: "Can't Help Falling in Love", artist: 'Elvis Presley', emoji: '👑', genre: 'Classic', language: 'English', duration: '3:00', mood: 'Helpless romance', theme: 'Falling despite yourself', singingTips: 'Elvis classic - smooth, romantic, timeless crooning style' },
  { id: 'my-heart-will-go-on', title: 'My Heart Will Go On', artist: 'Celine Dion', emoji: '🚢', genre: 'Romantic', language: 'English', duration: '4:40', mood: 'Epic eternal love', theme: 'Love survives everything', singingTips: 'Titanic power ballad - build to the legendary key change!' },
  { id: 'i-will-always-love-you', title: 'I Will Always Love You', artist: 'Whitney Houston', emoji: '💝', genre: 'Emotional', language: 'English', duration: '4:31', mood: 'Eternal promise', theme: 'Forever love declaration', singingTips: 'Whitney\'s legendary vocals - start quiet, EXPLODE on chorus' },
  { id: 'unchained-melody', title: 'Unchained Melody', artist: 'Righteous Brothers', emoji: '👻', genre: 'Classic', language: 'English', duration: '3:36', mood: 'Longing, hunger', theme: 'Time goes by so slowly without you', singingTips: 'Ghost movie pottery scene vibes - pure yearning' },
  { id: 'endless-love', title: 'Endless Love', artist: 'Diana Ross', emoji: '♾️', genre: 'Romantic', language: 'English', duration: '4:27', mood: 'Infinite devotion', theme: 'Two hearts as one', singingTips: 'Classic duet - harmonize, look into each other\'s eyes' },
  { id: 'amazed', title: 'Amazed', artist: 'Lonestar', emoji: '🌟', genre: 'Country', language: 'English', duration: '4:00', mood: 'Constant wonder', theme: 'Always amazed by you', singingTips: 'Country sweetness, genuine amazement in voice' },
  { id: 'just-the-way-you-are', title: 'Just the Way You Are', artist: 'Bruno Mars', emoji: '😊', genre: 'Pop', language: 'English', duration: '3:40', mood: 'Complete acceptance', theme: 'Perfect as you are', singingTips: 'Fun and genuine, smile while singing, upbeat love' },
  { id: 'marry-you', title: 'Marry You', artist: 'Bruno Mars', emoji: '💒', genre: 'Upbeat', language: 'English', duration: '3:50', mood: 'Spontaneous joy', theme: 'Let\'s get married tonight!', singingTips: 'Fun proposal song, dance while singing, pure joy!' },
  { id: 'beautiful', title: 'Beautiful', artist: 'James Blunt', emoji: '🌸', genre: 'Romantic', language: 'English', duration: '3:33', mood: 'Admiring from afar', theme: 'You\'re beautiful', singingTips: 'Falsetto on chorus, wistful and longing' },
  { id: 'love-story', title: 'Love Story', artist: 'Taylor Swift', emoji: '📖', genre: 'Pop', language: 'English', duration: '3:55', mood: 'Fairytale romance', theme: 'Romeo and Juliet but happy', singingTips: 'Young love energy, storytelling through song' },
  { id: 'youre-beautiful', title: "You're Beautiful", artist: 'James Blunt', emoji: '✨', genre: 'Romantic', language: 'English', duration: '3:29', mood: 'Struck by beauty', theme: 'Moment of pure beauty', singingTips: 'James Blunt falsetto, emotional and honest' },
  { id: 'make-you-feel-my-love', title: 'Make You Feel My Love', artist: 'Adele', emoji: '🌧️', genre: 'Romantic', language: 'English', duration: '3:32', mood: 'Deep devotion', theme: 'I\'d do anything for you', singingTips: 'Adele\'s soulful power, building emotion throughout' },
  { id: 'someone-like-you', title: 'Someone Like You', artist: 'Adele', emoji: '💔', genre: 'Emotional', language: 'English', duration: '4:45', mood: 'Moving on, acceptance', theme: 'Finding peace after love', singingTips: 'Adele\'s signature heartbreak, let it all out on chorus' },
  { id: 'hello', title: 'Hello', artist: 'Adele', emoji: '📞', genre: 'Emotional', language: 'English', duration: '4:55', mood: 'Reaching out', theme: 'Hello from the other side', singingTips: 'THAT key change on "Hello" - legendary moment' },
  { id: 'stay-with-me', title: 'Stay With Me', artist: 'Sam Smith', emoji: '🙏', genre: 'Romantic', language: 'English', duration: '2:52', mood: 'Vulnerable need', theme: 'Please don\'t leave', singingTips: 'Sam Smith vulnerability, gospel-influenced' },
  { id: 'when-i-was-your-man', title: 'When I Was Your Man', artist: 'Bruno Mars', emoji: '🥀', genre: 'Emotional', language: 'English', duration: '3:33', mood: 'Regret, reflection', theme: 'Should have loved you better', singingTips: 'Piano ballad, genuine regret, learn from past' },
  { id: 'photograph', title: 'Photograph', artist: 'Ed Sheeran', emoji: '📷', genre: 'Romantic', language: 'English', duration: '4:19', mood: 'Nostalgic love', theme: 'Keep me in your heart', singingTips: 'Nostalgic, hold onto memories, gentle build' },
  { id: 'shape-of-you', title: 'Shape of You', artist: 'Ed Sheeran', emoji: '💃', genre: 'Pop', language: 'English', duration: '3:53', mood: 'Physical attraction', theme: 'In love with your body', singingTips: 'Rhythmic and fun, dance while singing!' },
  { id: 'let-her-go', title: 'Let Her Go', artist: 'Passenger', emoji: '🍂', genre: 'Emotional', language: 'English', duration: '4:12', mood: 'Loss, realization', theme: 'Only know love when gone', singingTips: 'Folk ballad, build gradually, emotional realization' },
  { id: 'fix-you', title: 'Fix You', artist: 'Coldplay', emoji: '🩹', genre: 'Emotional', language: 'English', duration: '4:55', mood: 'Healing, support', theme: 'I will try to fix you', singingTips: 'Quiet start, EXPLODE at "lights will guide you home"' },
  { id: 'yellow', title: 'Yellow', artist: 'Coldplay', emoji: '💛', genre: 'Romantic', language: 'English', duration: '4:26', mood: 'Starry devotion', theme: 'Look at the stars for you', singingTips: 'Chris Martin\'s falsetto, dreamy and devoted' },
  { id: 'the-scientist', title: 'The Scientist', artist: 'Coldplay', emoji: '🔬', genre: 'Emotional', language: 'English', duration: '5:09', mood: 'Going back to start', theme: 'Questions unanswered', singingTips: 'Melancholic, wish to go back, piano-driven' },
  { id: 'viva-la-vida', title: 'Viva La Vida', artist: 'Coldplay', emoji: '👑', genre: 'Upbeat', language: 'English', duration: '4:01', mood: 'Epic, triumphant', theme: 'Rise and fall', singingTips: 'Anthemic, feel like royalty, strings in your voice' },
  { id: 'chasing-cars', title: 'Chasing Cars', artist: 'Snow Patrol', emoji: '🚗', genre: 'Romantic', language: 'English', duration: '4:27', mood: 'Simple love', theme: 'Lie here with me', singingTips: 'Building crescendo, Grey\'s Anatomy feels' },
  { id: 'hallelujah', title: 'Hallelujah', artist: 'Jeff Buckley', emoji: '🙌', genre: 'Soulful', language: 'English', duration: '6:53', mood: 'Sacred, broken', theme: 'Holy yet broken hallelujah', singingTips: 'Jeff Buckley\'s legendary version - raw, spiritual, powerful' },
  { id: 'we-belong-together', title: 'We Belong Together', artist: 'Mariah Carey', emoji: '💑', genre: 'Romantic', language: 'English', duration: '3:21', mood: 'Destined love', theme: 'We belong together', singingTips: 'Mariah whistle tones optional 😄, R&B smooth' },
  { id: 'with-you', title: 'With You', artist: 'Chris Brown', emoji: '💘', genre: 'R&B', language: 'English', duration: '3:53', mood: 'Sweet R&B love', theme: 'Everything\'s better with you', singingTips: 'R&B smooth, playful, sweet and gentle' },
  { id: 'bleeding-love', title: 'Bleeding Love', artist: 'Leona Lewis', emoji: '❤️‍🩹', genre: 'Romantic', language: 'English', duration: '4:22', mood: 'Overwhelming love', theme: 'Love is pain and joy', singingTips: 'Leona\'s powerful voice, building intensity' },
  { id: 'halo', title: 'Halo', artist: 'Beyoncé', emoji: '😇', genre: 'Romantic', language: 'English', duration: '4:21', mood: 'Divine love', theme: 'You are my angel', singingTips: 'Beyoncé power, feel the walls coming down' },
];

// Nepali Songs with rich descriptions
const nepaliSongs: Song[] = [
  { id: 'timi-bina', title: 'Timi Bina', artist: 'Swoopna Suman', emoji: '💕', genre: 'Romantic', language: 'Nepali', duration: '4:30', mood: 'Incomplete without you', theme: 'Life is empty without you', singingTips: 'Swoopna\'s signature style, gentle and longing' },
  { id: 'maya-ma', title: 'Maya Ma', artist: 'Sushant KC', emoji: '❤️', genre: 'Romantic', language: 'Nepali', duration: '4:15', mood: 'Falling deep', theme: 'Lost in love', singingTips: 'Sushant\'s melodic style, smooth and heartfelt' },
  { id: 'kaha-ho-timi', title: 'Kaha Ho Timi', artist: 'Sajjan Raj Vaidya', emoji: '🔍', genre: 'Romantic', language: 'Nepali', duration: '4:45', mood: 'Searching, missing', theme: 'Where are you?', singingTips: 'Sajjan\'s unique vocals, questioning and yearning' },
  { id: 'hataarindai-bataasindai', title: 'Hataarindai Bataasindai', artist: 'Sajjan Raj Vaidya', emoji: '🌪️', genre: 'Emotional', language: 'Nepali', duration: '5:00', mood: 'Rushing, chaotic love', theme: 'Love in chaos', singingTips: 'Feel the rush, the confusion of intense feelings' },
  { id: 'nachaheko-hoina', title: 'Nachaheko Hoina', artist: 'Samir Shrestha', emoji: '💔', genre: 'Emotional', language: 'Nepali', duration: '4:28', mood: 'Denial of love', theme: 'Not wanting to love, but loving', singingTips: 'Conflicted emotions, fighting love but losing' },
  { id: 'pahilo-prem', title: 'Pahilo Prem', artist: 'The Uglyz', emoji: '🌸', genre: 'Romantic', language: 'Nepali', duration: '4:35', mood: 'First love magic', theme: 'The magic of first love', singingTips: 'Innocence of first love, wide-eyed wonder' },
  { id: 'lakhau-hajarau', title: 'Lakhau Hajarau', artist: 'Rohit Shakya', emoji: '🌟', genre: 'Romantic', language: 'Nepali', duration: '4:20', mood: 'Among millions, only you', theme: 'You\'re one in millions', singingTips: 'Rohit\'s rock-influenced romance, powerful declaration' },
  { id: 'resham', title: 'Resham', artist: 'Robin & The New Revolution', emoji: '🧵', genre: 'Classic', language: 'Nepali', duration: '4:55', mood: 'Classic romance', theme: 'Silk-like love', singingTips: 'Classic Nepali melody, timeless appeal' },
  { id: 'ko-hola-tyo', title: 'Ko Hola Tyo', artist: 'Sajjan Raj Vaidya', emoji: '❓', genre: 'Romantic', language: 'Nepali', duration: '4:10', mood: 'Wondering about soulmate', theme: 'Who is that person for me?', singingTips: 'Dreamy wondering, hoping for love' },
  { id: 'junu', title: 'Junu', artist: 'Bartika Eam Rai', emoji: '🌙', genre: 'Folk', language: 'Nepali', duration: '3:45', mood: 'Moonlit folk', theme: 'Like the moon - beautiful and distant', singingTips: 'Bartika\'s unique folk voice, earthy and real' },
  { id: 'timi-nai-hau', title: 'Timi Nai Hau', artist: '1974 AD', emoji: '💗', genre: 'Rock', language: 'Nepali', duration: '5:10', mood: 'Rock ballad love', theme: 'You are the one', singingTips: '1974 AD rock style, powerful and passionate' },
  { id: 'maya-gardai', title: 'Maya Gardai', artist: 'Sushant KC', emoji: '💘', genre: 'Romantic', language: 'Nepali', duration: '4:00', mood: 'Actively loving', theme: 'Loving you daily', singingTips: 'Sweet and ongoing love, everyday romance' },
  { id: 'parkhai-ma', title: 'Parkhai Ma', artist: 'Swoopna Suman', emoji: '⏰', genre: 'Romantic', language: 'Nepali', duration: '4:25', mood: 'Patient waiting', theme: 'Waiting for you', singingTips: 'Patience and hope in waiting, gentle longing' },
  { id: 'mayalulai', title: 'Mayalulai', artist: 'Rohit Shakya', emoji: '🥰', genre: 'Romantic', language: 'Nepali', duration: '4:38', mood: 'Sweet love', theme: 'To my beloved', singingTips: 'Sweet terms of endearment, tender vocals' },
  { id: 'rato-ra-chandra-surya', title: 'Rato Ra Chandra Surya', artist: 'Robin & The New Revolution', emoji: '🇳🇵', genre: 'Classic', language: 'Nepali', duration: '5:20', mood: 'Patriotic love', theme: 'Nepal in heart', singingTips: 'Pride and love for Nepal, emotional and powerful' },
  { id: 'aakash-ko-tara', title: 'Aakash Ko Tara', artist: 'The Uglyz', emoji: '⭐', genre: 'Romantic', language: 'Nepali', duration: '4:50', mood: 'Starry romance', theme: 'You are my star', singingTips: 'Looking at the sky, romantic and dreamy' },
  { id: 'yo-mann-ta', title: 'Yo Mann Ta Mero Nepali Ho', artist: '1974 AD', emoji: '🏔️', genre: 'Patriotic', language: 'Nepali', duration: '5:30', mood: 'Proud Nepali', theme: 'My heart is Nepali', singingTips: 'National pride, powerful rock anthem' },
  { id: 'saathi', title: 'Saathi', artist: 'Bartika Eam Rai', emoji: '🤝', genre: 'Soulful', language: 'Nepali', duration: '4:15', mood: 'Friendship to love', theme: 'Friend and lover', singingTips: 'Bartika\'s soulful depth, companion love' },
  { id: 'chudaina-timro-maya', title: 'Chudaina Timro Maya', artist: 'Sushant KC', emoji: '🔒', genre: 'Romantic', language: 'Nepali', duration: '4:05', mood: 'Inseparable', theme: 'Can\'t escape your love', singingTips: 'Helplessly in love, can\'t resist' },
  { id: 'asaar', title: 'Asaar', artist: 'Swoopna Suman', emoji: '🌧️', genre: 'Romantic', language: 'Nepali', duration: '4:40', mood: 'Monsoon romance', theme: 'Love like monsoon rain', singingTips: 'Feel the rain, monsoon romance vibes' },
  { id: 'ghumna-jau', title: 'Ghumna Jau', artist: 'Sajjan Raj Vaidya', emoji: '🚶', genre: 'Romantic', language: 'Nepali', duration: '3:55', mood: 'Adventure together', theme: 'Let\'s wander together', singingTips: 'Fun and adventurous, let\'s explore together!' },
  { id: 'ma-ta-timilai', title: 'Ma Ta Timilai', artist: 'Neetesh Jung Kunwar', emoji: '💑', genre: 'Romantic', language: 'Nepali', duration: '4:12', mood: 'Declaration', theme: 'I love you', singingTips: 'Direct love declaration, heartfelt and honest' },
  { id: 'basanta', title: 'Basanta', artist: 'Bipul Chettri', emoji: '🌺', genre: 'Folk', language: 'Nepali', duration: '5:00', mood: 'Spring awakening', theme: 'Spring of love', singingTips: 'Bipul\'s folk fusion, feel the spring breeze' },
  { id: 'syndicate', title: 'Syndicate', artist: 'Bipul Chettri', emoji: '🎸', genre: 'Folk Rock', language: 'Nepali', duration: '4:45', mood: 'Rock energy', theme: 'Together in unity', singingTips: 'Bipul\'s unique folk rock, energetic and unified' },
  { id: 'suna-saili', title: 'Suna Saili', artist: 'Various Artists', emoji: '🏡', genre: 'Folk', language: 'Nepali', duration: '4:30', mood: 'Nostalgic village', theme: 'Golden memories', singingTips: 'Classic folk, village nostalgia, simple love' },
  { id: 'biteka-palaru', title: 'Biteka Palaru', artist: 'Sajjan Raj Vaidya', emoji: '📜', genre: 'Nostalgic', language: 'Nepali', duration: '4:18', mood: 'Past memories', theme: 'Days gone by', singingTips: 'Nostalgic reflection, bittersweet memories' },
  { id: 'timro-mann', title: 'Timro Mann', artist: 'Neetesh Jung Kunwar', emoji: '💖', genre: 'Romantic', language: 'Nepali', duration: '3:58', mood: 'Heart connection', theme: 'Your heart', singingTips: 'Neetesh\'s sweet style, genuine and warm' },
  { id: 'paheli-nazar-ma', title: 'Paheli Nazar Ma', artist: 'Deepak Bajracharya', emoji: '👀', genre: 'Romantic', language: 'Nepali', duration: '4:35', mood: 'Love at first sight', theme: 'First glance magic', singingTips: 'Classic romantic, instant connection' },
  { id: 'malai-maaf-garideu', title: 'Malai Maaf Garideu', artist: 'Sabin Rai', emoji: '🙏', genre: 'Emotional', language: 'Nepali', duration: '5:15', mood: 'Seeking forgiveness', theme: 'Please forgive me', singingTips: 'Sabin Rai\'s emotional depth, genuine apology' },
  { id: 'bistarai', title: 'Bistarai', artist: 'Rohit Shakya', emoji: '🐢', genre: 'Romantic', language: 'Nepali', duration: '4:22', mood: 'Slow and steady', theme: 'Love slowly building', singingTips: 'Take it slow, gentle pace of growing love' },
];

// Combine all songs
export const allSongs: Song[] = [...hindiSongs, ...englishSongs, ...nepaliSongs];

// Get rich song description for display
export const getSongDescription = (song: Song): string[] => {
  const lines: string[] = [
    `🎵 ${song.title} 🎵`,
    `♪ by ${song.artist} ♪`,
    '',
    `💫 Mood: ${song.mood || 'Romantic'}`,
    `💝 Theme: ${song.theme || 'Love and romance'}`,
    '',
    `🎤 Singing Tips:`,
    `${song.singingTips || 'Sing with your heart!'}`,
    '',
    `📝 For lyrics, search:`,
    `"${song.title} ${song.artist} lyrics"`,
    '',
    `💕 ${song.language} ${song.genre} · ${song.duration}`,
  ];
  return lines;
};

// Legacy function for compatibility
export const getLyricsPlaceholder = (song: Song): string[] => {
  return getSongDescription(song);
};

// Get available genres
export const getGenres = (): string[] => {
  return [...new Set(allSongs.map(s => s.genre))];
};

// Get available languages
export const getLanguages = (): ('Hindi' | 'English' | 'Nepali')[] => {
  return ['Hindi', 'English', 'Nepali'];
};
