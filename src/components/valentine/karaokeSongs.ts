// Karaoke Song Database - 100+ songs across Hindi, English, and Nepali

export interface Song {
  id: string;
  title: string;
  artist: string;
  emoji: string;
  genre: string;
  language: 'Hindi' | 'English' | 'Nepali';
  duration: string;
}

const defaultLyrics = [
  "🎵 Search for lyrics online 🎵",
  "♪ Sing along with your heart ♪",
  "💕 Feel the music flow through you 💕",
  "",
  "🎤 Record your beautiful voice! 🎤",
];

// Hindi Songs (Bollywood)
const hindiSongs: Song[] = [
  { id: 'tum-hi-ho', title: 'Tum Hi Ho', artist: 'Arijit Singh', emoji: '💕', genre: 'Romantic', language: 'Hindi', duration: '4:22' },
  { id: 'raabta', title: 'Raabta', artist: 'Arijit Singh', emoji: '🌙', genre: 'Romantic', language: 'Hindi', duration: '4:45' },
  { id: 'kal-ho-naa-ho', title: 'Kal Ho Naa Ho', artist: 'Sonu Nigam', emoji: '⭐', genre: 'Emotional', language: 'Hindi', duration: '5:20' },
  { id: 'tujhe-dekha', title: 'Tujhe Dekha To', artist: 'Kumar Sanu & Lata', emoji: '🎬', genre: 'Classic', language: 'Hindi', duration: '5:45' },
  { id: 'pehla-nasha', title: 'Pehla Nasha', artist: 'Udit Narayan', emoji: '🦋', genre: 'Classic', language: 'Hindi', duration: '5:10' },
  { id: 'channa-mereya', title: 'Channa Mereya', artist: 'Arijit Singh', emoji: '💔', genre: 'Emotional', language: 'Hindi', duration: '4:49' },
  { id: 'mere-haath-mein', title: 'Mere Haath Mein', artist: 'Sonu Nigam', emoji: '🤝', genre: 'Romantic', language: 'Hindi', duration: '5:15' },
  { id: 'kabira', title: 'Kabira', artist: 'Arijit Singh', emoji: '🎭', genre: 'Soulful', language: 'Hindi', duration: '3:42' },
  { id: 'tera-ban-jaunga', title: 'Tera Ban Jaunga', artist: 'Akhil & Tulsi', emoji: '💑', genre: 'Romantic', language: 'Hindi', duration: '3:56' },
  { id: 'tere-sang-yaara', title: 'Tere Sang Yaara', artist: 'Atif Aslam', emoji: '🌅', genre: 'Romantic', language: 'Hindi', duration: '4:31' },
  { id: 'kuch-kuch', title: 'Kuch Kuch Hota Hai', artist: 'Udit & Alka', emoji: '💝', genre: 'Classic', language: 'Hindi', duration: '5:24' },
  { id: 'ae-dil-hai-mushkil', title: 'Ae Dil Hai Mushkil', artist: 'Arijit Singh', emoji: '💫', genre: 'Emotional', language: 'Hindi', duration: '4:29' },
  { id: 'gerua', title: 'Gerua', artist: 'Arijit Singh', emoji: '🧡', genre: 'Romantic', language: 'Hindi', duration: '5:48' },
  { id: 'hawayein', title: 'Hawayein', artist: 'Arijit Singh', emoji: '🌊', genre: 'Romantic', language: 'Hindi', duration: '4:50' },
  { id: 'bekhayali', title: 'Bekhayali', artist: 'Sachet Tandon', emoji: '🔥', genre: 'Intense', language: 'Hindi', duration: '3:55' },
  { id: 'kesariya', title: 'Kesariya', artist: 'Arijit Singh', emoji: '🌸', genre: 'Romantic', language: 'Hindi', duration: '4:28' },
  { id: 'dil-diyan-gallan', title: 'Dil Diyan Gallan', artist: 'Atif Aslam', emoji: '💗', genre: 'Romantic', language: 'Hindi', duration: '4:40' },
  { id: 'janam-janam', title: 'Janam Janam', artist: 'Arijit Singh', emoji: '♾️', genre: 'Romantic', language: 'Hindi', duration: '5:16' },
  { id: 'lag-ja-gale', title: 'Lag Ja Gale', artist: 'Lata Mangeshkar', emoji: '🌹', genre: 'Classic', language: 'Hindi', duration: '4:05' },
  { id: 'tera-hone-laga', title: 'Tera Hone Laga Hoon', artist: 'Atif Aslam', emoji: '🌟', genre: 'Romantic', language: 'Hindi', duration: '4:27' },
  { id: 'tum-se-hi', title: 'Tum Se Hi', artist: 'Mohit Chauhan', emoji: '🌈', genre: 'Romantic', language: 'Hindi', duration: '5:28' },
  { id: 'agar-tum-saath-ho', title: 'Agar Tum Saath Ho', artist: 'Arijit & Alka', emoji: '🥺', genre: 'Emotional', language: 'Hindi', duration: '5:41' },
  { id: 'tum-mile', title: 'Tum Mile', artist: 'Neeraj Shridhar', emoji: '✨', genre: 'Romantic', language: 'Hindi', duration: '4:35' },
  { id: 'jeena-jeena', title: 'Jeena Jeena', artist: 'Atif Aslam', emoji: '🎵', genre: 'Romantic', language: 'Hindi', duration: '3:28' },
  { id: 'pee-loon', title: 'Pee Loon', artist: 'Mohit Chauhan', emoji: '🍷', genre: 'Romantic', language: 'Hindi', duration: '4:53' },
  { id: 'sun-mere-humsafar', title: 'Sun Mere Humsafar', artist: 'Arijit Singh', emoji: '🛤️', genre: 'Romantic', language: 'Hindi', duration: '4:12' },
  { id: 'phir-bhi-tumko', title: 'Phir Bhi Tumko Chaahunga', artist: 'Arijit Singh', emoji: '💓', genre: 'Romantic', language: 'Hindi', duration: '4:45' },
  { id: 'roke-na-ruke', title: 'Roke Na Ruke Naina', artist: 'Arijit Singh', emoji: '😢', genre: 'Emotional', language: 'Hindi', duration: '4:22' },
  { id: 'bolna', title: 'Bolna', artist: 'Arijit & Asees', emoji: '💭', genre: 'Romantic', language: 'Hindi', duration: '4:08' },
  { id: 'soch-na-sake', title: 'Soch Na Sake', artist: 'Arijit & Tulsi', emoji: '💘', genre: 'Romantic', language: 'Hindi', duration: '5:00' },
  { id: 'galliyan', title: 'Galliyan', artist: 'Ankit Tiwari', emoji: '🏠', genre: 'Romantic', language: 'Hindi', duration: '4:52' },
  { id: 'ilahi', title: 'Ilahi', artist: 'Arijit Singh', emoji: '🏔️', genre: 'Upbeat', language: 'Hindi', duration: '3:40' },
  { id: 'mere-naam-tu', title: 'Mere Naam Tu', artist: 'Abhay Jodhpurkar', emoji: '💍', genre: 'Romantic', language: 'Hindi', duration: '4:35' },
  { id: 'pal-pal-dil-ke', title: 'Pal Pal Dil Ke Paas', artist: 'Arijit Singh', emoji: '💖', genre: 'Romantic', language: 'Hindi', duration: '4:28' },
  { id: 'kaun-tujhe', title: 'Kaun Tujhe', artist: 'Palak Muchhal', emoji: '🌺', genre: 'Romantic', language: 'Hindi', duration: '4:12' },
  { id: 'mast-magan', title: 'Mast Magan', artist: 'Arijit Singh', emoji: '😍', genre: 'Romantic', language: 'Hindi', duration: '4:22' },
  { id: 'raataan-lambiyan', title: 'Raataan Lambiyan', artist: 'Jubin & Asees', emoji: '🌃', genre: 'Romantic', language: 'Hindi', duration: '3:50' },
  { id: 'mann-bharrya', title: 'Mann Bharrya', artist: 'B Praak', emoji: '💔', genre: 'Emotional', language: 'Hindi', duration: '4:15' },
  { id: 'o-sanam', title: 'O Sanam', artist: 'Lucky Ali', emoji: '🎸', genre: 'Classic', language: 'Hindi', duration: '5:30' },
  { id: 'sanam-teri-kasam', title: 'Sanam Teri Kasam', artist: 'Ankit Tiwari', emoji: '🙏', genre: 'Romantic', language: 'Hindi', duration: '5:15' },
];

// English Songs
const englishSongs: Song[] = [
  { id: 'perfect', title: 'Perfect', artist: 'Ed Sheeran', emoji: '💍', genre: 'Romantic', language: 'English', duration: '4:23' },
  { id: 'thinking-out-loud', title: 'Thinking Out Loud', artist: 'Ed Sheeran', emoji: '💭', genre: 'Romantic', language: 'English', duration: '4:41' },
  { id: 'all-of-me', title: 'All of Me', artist: 'John Legend', emoji: '💕', genre: 'Romantic', language: 'English', duration: '4:29' },
  { id: 'a-thousand-years', title: 'A Thousand Years', artist: 'Christina Perri', emoji: '⏳', genre: 'Romantic', language: 'English', duration: '4:45' },
  { id: 'say-you-wont-let-go', title: "Say You Won't Let Go", artist: 'James Arthur', emoji: '🤝', genre: 'Romantic', language: 'English', duration: '3:31' },
  { id: 'love-me-like-you-do', title: 'Love Me Like You Do', artist: 'Ellie Goulding', emoji: '💗', genre: 'Romantic', language: 'English', duration: '4:10' },
  { id: 'cant-help-falling', title: "Can't Help Falling in Love", artist: 'Elvis Presley', emoji: '👑', genre: 'Classic', language: 'English', duration: '3:00' },
  { id: 'my-heart-will-go-on', title: 'My Heart Will Go On', artist: 'Celine Dion', emoji: '🚢', genre: 'Romantic', language: 'English', duration: '4:40' },
  { id: 'i-will-always-love-you', title: 'I Will Always Love You', artist: 'Whitney Houston', emoji: '💝', genre: 'Emotional', language: 'English', duration: '4:31' },
  { id: 'unchained-melody', title: 'Unchained Melody', artist: 'Righteous Brothers', emoji: '👻', genre: 'Classic', language: 'English', duration: '3:36' },
  { id: 'endless-love', title: 'Endless Love', artist: 'Diana Ross', emoji: '♾️', genre: 'Romantic', language: 'English', duration: '4:27' },
  { id: 'amazed', title: 'Amazed', artist: 'Lonestar', emoji: '🌟', genre: 'Country', language: 'English', duration: '4:00' },
  { id: 'just-the-way-you-are', title: 'Just the Way You Are', artist: 'Bruno Mars', emoji: '😊', genre: 'Pop', language: 'English', duration: '3:40' },
  { id: 'marry-you', title: 'Marry You', artist: 'Bruno Mars', emoji: '💒', genre: 'Upbeat', language: 'English', duration: '3:50' },
  { id: 'beautiful', title: 'Beautiful', artist: 'James Blunt', emoji: '🌸', genre: 'Romantic', language: 'English', duration: '3:33' },
  { id: 'love-story', title: 'Love Story', artist: 'Taylor Swift', emoji: '📖', genre: 'Pop', language: 'English', duration: '3:55' },
  { id: 'youre-beautiful', title: "You're Beautiful", artist: 'James Blunt', emoji: '✨', genre: 'Romantic', language: 'English', duration: '3:29' },
  { id: 'make-you-feel-my-love', title: 'Make You Feel My Love', artist: 'Adele', emoji: '🌧️', genre: 'Romantic', language: 'English', duration: '3:32' },
  { id: 'someone-like-you', title: 'Someone Like You', artist: 'Adele', emoji: '💔', genre: 'Emotional', language: 'English', duration: '4:45' },
  { id: 'hello', title: 'Hello', artist: 'Adele', emoji: '📞', genre: 'Emotional', language: 'English', duration: '4:55' },
  { id: 'stay-with-me', title: 'Stay With Me', artist: 'Sam Smith', emoji: '🙏', genre: 'Romantic', language: 'English', duration: '2:52' },
  { id: 'when-i-was-your-man', title: 'When I Was Your Man', artist: 'Bruno Mars', emoji: '🥀', genre: 'Emotional', language: 'English', duration: '3:33' },
  { id: 'photograph', title: 'Photograph', artist: 'Ed Sheeran', emoji: '📷', genre: 'Romantic', language: 'English', duration: '4:19' },
  { id: 'shape-of-you', title: 'Shape of You', artist: 'Ed Sheeran', emoji: '💃', genre: 'Pop', language: 'English', duration: '3:53' },
  { id: 'let-her-go', title: 'Let Her Go', artist: 'Passenger', emoji: '🍂', genre: 'Emotional', language: 'English', duration: '4:12' },
  { id: 'fix-you', title: 'Fix You', artist: 'Coldplay', emoji: '🩹', genre: 'Emotional', language: 'English', duration: '4:55' },
  { id: 'yellow', title: 'Yellow', artist: 'Coldplay', emoji: '💛', genre: 'Romantic', language: 'English', duration: '4:26' },
  { id: 'the-scientist', title: 'The Scientist', artist: 'Coldplay', emoji: '🔬', genre: 'Emotional', language: 'English', duration: '5:09' },
  { id: 'viva-la-vida', title: 'Viva La Vida', artist: 'Coldplay', emoji: '👑', genre: 'Upbeat', language: 'English', duration: '4:01' },
  { id: 'chasing-cars', title: 'Chasing Cars', artist: 'Snow Patrol', emoji: '🚗', genre: 'Romantic', language: 'English', duration: '4:27' },
  { id: 'hallelujah', title: 'Hallelujah', artist: 'Jeff Buckley', emoji: '🙌', genre: 'Soulful', language: 'English', duration: '6:53' },
  { id: 'we-belong-together', title: 'We Belong Together', artist: 'Mariah Carey', emoji: '💑', genre: 'Romantic', language: 'English', duration: '3:21' },
  { id: 'with-you', title: 'With You', artist: 'Chris Brown', emoji: '💘', genre: 'R&B', language: 'English', duration: '3:53' },
  { id: 'bleeding-love', title: 'Bleeding Love', artist: 'Leona Lewis', emoji: '❤️‍🩹', genre: 'Romantic', language: 'English', duration: '4:22' },
  { id: 'halo', title: 'Halo', artist: 'Beyoncé', emoji: '😇', genre: 'Romantic', language: 'English', duration: '4:21' },
];

// Nepali Songs
const nepaliSongs: Song[] = [
  { id: 'timi-bina', title: 'Timi Bina', artist: 'Swoopna Suman', emoji: '💕', genre: 'Romantic', language: 'Nepali', duration: '4:30' },
  { id: 'maya-ma', title: 'Maya Ma', artist: 'Sushant KC', emoji: '❤️', genre: 'Romantic', language: 'Nepali', duration: '4:15' },
  { id: 'kaha-ho-timi', title: 'Kaha Ho Timi', artist: 'Sajjan Raj Vaidya', emoji: '🔍', genre: 'Romantic', language: 'Nepali', duration: '4:45' },
  { id: 'hataarindai-bataasindai', title: 'Hataarindai Bataasindai', artist: 'Sajjan Raj Vaidya', emoji: '🌪️', genre: 'Emotional', language: 'Nepali', duration: '5:00' },
  { id: 'nachaheko-hoina', title: 'Nachaheko Hoina', artist: 'Samir Shrestha', emoji: '💔', genre: 'Emotional', language: 'Nepali', duration: '4:28' },
  { id: 'pahilo-prem', title: 'Pahilo Prem', artist: 'The Uglyz', emoji: '🌸', genre: 'Romantic', language: 'Nepali', duration: '4:35' },
  { id: 'lakhau-hajarau', title: 'Lakhau Hajarau', artist: 'Rohit Shakya', emoji: '🌟', genre: 'Romantic', language: 'Nepali', duration: '4:20' },
  { id: 'resham', title: 'Resham', artist: 'Robin & The New Revolution', emoji: '🧵', genre: 'Classic', language: 'Nepali', duration: '4:55' },
  { id: 'ko-hola-tyo', title: 'Ko Hola Tyo', artist: 'Sajjan Raj Vaidya', emoji: '❓', genre: 'Romantic', language: 'Nepali', duration: '4:10' },
  { id: 'junu', title: 'Junu', artist: 'Bartika Eam Rai', emoji: '🌙', genre: 'Folk', language: 'Nepali', duration: '3:45' },
  { id: 'timi-nai-hau', title: 'Timi Nai Hau', artist: '1974 AD', emoji: '💗', genre: 'Rock', language: 'Nepali', duration: '5:10' },
  { id: 'maya-gardai', title: 'Maya Gardai', artist: 'Sushant KC', emoji: '💘', genre: 'Romantic', language: 'Nepali', duration: '4:00' },
  { id: 'parkhai-ma', title: 'Parkhai Ma', artist: 'Swoopna Suman', emoji: '⏰', genre: 'Romantic', language: 'Nepali', duration: '4:25' },
  { id: 'mayalulai', title: 'Mayalulai', artist: 'Rohit Shakya', emoji: '🥰', genre: 'Romantic', language: 'Nepali', duration: '4:38' },
  { id: 'rato-ra-chandra-surya', title: 'Rato Ra Chandra Surya', artist: 'Robin & The New Revolution', emoji: '🇳🇵', genre: 'Classic', language: 'Nepali', duration: '5:20' },
  { id: 'aakash-ko-tara', title: 'Aakash Ko Tara', artist: 'The Uglyz', emoji: '⭐', genre: 'Romantic', language: 'Nepali', duration: '4:50' },
  { id: 'yo-mann-ta', title: 'Yo Mann Ta Mero Nepali Ho', artist: '1974 AD', emoji: '🏔️', genre: 'Patriotic', language: 'Nepali', duration: '5:30' },
  { id: 'saathi', title: 'Saathi', artist: 'Bartika Eam Rai', emoji: '🤝', genre: 'Soulful', language: 'Nepali', duration: '4:15' },
  { id: 'chudaina-timro-maya', title: 'Chudaina Timro Maya', artist: 'Sushant KC', emoji: '🔒', genre: 'Romantic', language: 'Nepali', duration: '4:05' },
  { id: 'asaar', title: 'Asaar', artist: 'Swoopna Suman', emoji: '🌧️', genre: 'Romantic', language: 'Nepali', duration: '4:40' },
  { id: 'ghumna-jau', title: 'Ghumna Jau', artist: 'Sajjan Raj Vaidya', emoji: '🚶', genre: 'Romantic', language: 'Nepali', duration: '3:55' },
  { id: 'ma-ta-timilai', title: 'Ma Ta Timilai', artist: 'Neetesh Jung Kunwar', emoji: '💑', genre: 'Romantic', language: 'Nepali', duration: '4:12' },
  { id: 'basanta', title: 'Basanta', artist: 'Bipul Chettri', emoji: '🌺', genre: 'Folk', language: 'Nepali', duration: '5:00' },
  { id: 'syndicate', title: 'Syndicate', artist: 'Bipul Chettri', emoji: '🎸', genre: 'Folk Rock', language: 'Nepali', duration: '4:45' },
  { id: 'suna-saili', title: 'Suna Saili', artist: 'Various Artists', emoji: '🏡', genre: 'Folk', language: 'Nepali', duration: '4:30' },
  { id: 'biteka-palaru', title: 'Biteka Palaru', artist: 'Sajjan Raj Vaidya', emoji: '📜', genre: 'Nostalgic', language: 'Nepali', duration: '4:18' },
  { id: 'timro-mann', title: 'Timro Mann', artist: 'Neetesh Jung Kunwar', emoji: '💖', genre: 'Romantic', language: 'Nepali', duration: '3:58' },
  { id: 'paheli-nazar-ma', title: 'Paheli Nazar Ma', artist: 'Deepak Bajracharya', emoji: '👀', genre: 'Romantic', language: 'Nepali', duration: '4:35' },
  { id: 'malai-maaf-garideu', title: 'Malai Maaf Garideu', artist: 'Sabin Rai', emoji: '🙏', genre: 'Emotional', language: 'Nepali', duration: '5:15' },
  { id: 'bistarai', title: 'Bistarai', artist: 'Rohit Shakya', emoji: '🐢', genre: 'Romantic', language: 'Nepali', duration: '4:22' },
];

// Combine all songs
export const allSongs: Song[] = [...hindiSongs, ...englishSongs, ...nepaliSongs];

// Get lyrics placeholder (since we can't include actual lyrics)
export const getLyricsPlaceholder = (song: Song): string[] => {
  return [
    `🎵 ${song.title} 🎵`,
    `♪ by ${song.artist} ♪`,
    `🌐 Search "${song.title} lyrics" online 🌐`,
    "",
    `🎤 Sing your heart out! 🎤`,
    `💕 ${song.language} ${song.genre} song 💕`,
  ];
};

// Get available genres
export const getGenres = (): string[] => {
  return [...new Set(allSongs.map(s => s.genre))];
};

// Get available languages
export const getLanguages = (): ('Hindi' | 'English' | 'Nepali')[] => {
  return ['Hindi', 'English', 'Nepali'];
};
