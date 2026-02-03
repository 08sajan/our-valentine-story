import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check, Crown, Gem, Star, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
import ReactDOM from "react-dom";

interface DressUpGameProps {
  onComplete?: () => void;
}

type Category = 'dresses' | 'earrings' | 'necklaces' | 'shoes' | 'hairstyles' | 'extras';

interface Item {
  id: string;
  name: string;
  image: string;
  color: string;
  description: string;
  brand: string;
}

const categories: { key: Category; label: string; emoji: string }[] = [
  { key: 'dresses', label: 'Dresses', emoji: '👗' },
  { key: 'earrings', label: 'Earrings', emoji: '💎' },
  { key: 'necklaces', label: 'Necklaces', emoji: '📿' },
  { key: 'shoes', label: 'Shoes', emoji: '👠' },
  { key: 'hairstyles', label: 'Hair', emoji: '💇‍♀️' },
  { key: 'extras', label: 'Extras', emoji: '✨' },
];

// Comprehensive girl dress collection - ALL UNIQUE IMAGES - romantic dresses for date nights
const items: Record<Category, Item[]> = {
  dresses: [
    // UPLOADED SPECIAL COLLECTION - Your Chosen Dresses
    { id: 'floral-midi-lace', name: 'Floral Lace Midi', image: '/src/assets/dresses/dress-1.jpg', color: '#fffbeb', description: 'Romantic off-shoulder floral lace midi - absolutely stunning for special dates!', brand: 'Chosen For You' },
    { id: 'teal-chain-mini', name: 'Teal Satin Mini', image: '/src/assets/dresses/dress-2.webp', color: '#14b8a6', description: 'Sexy cowl neck satin mini with chain straps - irresistible!', brand: 'Chosen For You' },
    { id: 'white-ruffle-lace', name: 'White Lace Ruffle', image: '/src/assets/dresses/dress-3.webp', color: '#ffffff', description: 'Angelic white lace ruffle dress - pure elegance!', brand: 'Chosen For You' },
    { id: 'black-mesh-sleeve', name: 'Black Mesh Sleeves', image: '/src/assets/dresses/dress-4.jpg', color: '#000000', description: 'Seductive black mini with sheer mesh sleeves - mysterious!', brand: 'Chosen For You' },
    { id: 'red-bodycon-lace', name: 'Red Lace Up Bodycon', image: '/src/assets/dresses/dress-5.webp', color: '#dc2626', description: 'Bold red ruched bodycon with lace-up back - head turner!', brand: 'Chosen For You' },
    { id: 'pink-floral-princess', name: 'Pink Floral Princess', image: '/src/assets/dresses/dress-6.webp', color: '#fda4af', description: 'Sweet pink floral princess dress with bow - fairy tale vibes!', brand: 'Chosen For You' },
    { id: 'brown-ruched-mini', name: 'Brown Ruched Mini', image: '/src/assets/dresses/dress-7.jpg', color: '#78350f', description: 'Sophisticated brown ruched mini - effortlessly sexy!', brand: 'Chosen For You' },
    { id: 'purple-slit-gown', name: 'Purple Slit Gown', image: '/src/assets/dresses/dress-8.jpg', color: '#8b5cf6', description: 'Dramatic purple satin gown with high slit - showstopper!', brand: 'Chosen For You' },
    { id: 'cream-ruffle-romper', name: 'Cream Ruffle Romper', image: '/src/assets/dresses/dress-9.jpg', color: '#fef3c7', description: 'Adorable cream ruffle romper with rosette - summer perfect!', brand: 'Chosen For You' },
    { id: 'burgundy-halter-gown', name: 'Burgundy Halter Gown', image: '/src/assets/dresses/dress-10.webp', color: '#7f1d1d', description: 'Elegant burgundy halter gown with dramatic slit - red carpet ready!', brand: 'Chosen For You' },
    
    // Red & Romantic Collection
    { id: 'red-slit-gown', name: 'Red Slit Evening Gown', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', color: '#dc2626', description: 'Stunning red gown with thigh-high slit', brand: 'Date Night' },
    { id: 'wine-bodycon', name: 'Wine Bodycon', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', color: '#7f1d1d', description: 'Figure-hugging wine dress', brand: 'Seductive' },
    { id: 'scarlet-velvet', name: 'Scarlet Velvet', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600', color: '#ef4444', description: 'Luxurious velvet beauty', brand: 'Romantic' },
    { id: 'cherry-wrap', name: 'Cherry Wrap Dress', image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600', color: '#b91c1c', description: 'Flattering wrap in cherry red', brand: 'Wrap Romance' },
    { id: 'crimson-mermaid', name: 'Crimson Mermaid', image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=600', color: '#dc2626', description: 'Dramatic mermaid silhouette', brand: 'Hollywood' },
    
    // Pink Collection
    { id: 'blush-princess', name: 'Blush Princess Gown', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600', color: '#fda4af', description: 'Fairytale princess vibes', brand: 'Sweet Dreams' },
    { id: 'hot-pink-mini', name: 'Hot Pink Mini', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600', color: '#ec4899', description: 'Flirty mini dress', brand: 'Cute & Flirty' },
    { id: 'rose-gold-shimmer', name: 'Rose Gold Shimmer', image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600', color: '#fbbf24', description: 'Shimmering elegance', brand: 'Glamour Queen' },
    { id: 'baby-pink-satin', name: 'Baby Pink Satin', image: 'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?w=600', color: '#fbcfe8', description: 'Soft angelic pink', brand: 'Angel Vibes' },
    { id: 'fuchsia-cocktail', name: 'Fuchsia Cocktail', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', color: '#db2777', description: 'Bold fuchsia beauty', brand: 'Bold Beauty' },
    
    // Black Collection
    { id: 'little-black-dress', name: 'Classic LBD', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600', color: '#1f2937', description: 'Timeless irresistible', brand: 'Midnight Allure' },
    { id: 'black-lace-bodycon', name: 'Black Lace', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', color: '#000000', description: 'Seductive lace mystery', brand: 'Dark Romance' },
    { id: 'black-backless', name: 'Backless Black', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', color: '#111827', description: 'Dramatic backless gown', brand: 'Show Stopper' },
    { id: 'noir-cutout', name: 'Noir Cutout', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600', color: '#18181b', description: 'Strategic bold cutouts', brand: 'Edge Fashion' },
    
    // Gold & Glamour
    { id: 'gold-sequin-mini', name: 'Gold Sequin Party', image: 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600', color: '#fbbf24', description: 'Sparkle like a star', brand: 'Party Princess' },
    { id: 'champagne-silk', name: 'Champagne Silk', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600', color: '#fef3c7', description: 'Effortlessly sexy silk', brand: 'Silk Dreams' },
    
    // Green Collection
    { id: 'emerald-goddess', name: 'Emerald Goddess', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600', color: '#10b981', description: 'Majestic emerald beauty', brand: 'Royal' },
    { id: 'teal-cocktail', name: 'Teal Cocktail', image: 'https://images.unsplash.com/photo-1475180429745-84e35c348071?w=600', color: '#14b8a6', description: 'Sophisticated evening', brand: 'Elegant' },
    
    // Blue Collection
    { id: 'royal-blue-gown', name: 'Royal Blue Ball Gown', image: 'https://images.unsplash.com/photo-1519657814959-e2e98c6f7b44?w=600', color: '#1d4ed8', description: 'Cinderella worthy', brand: 'Fairytale' },
    { id: 'sky-blue-chiffon', name: 'Sky Blue Chiffon', image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600', color: '#38bdf8', description: 'Ethereal floating beauty', brand: 'Cloud Nine' },
    
    // White & Ivory
    { id: 'white-angel', name: 'White Angel Dress', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600', color: '#ffffff', description: 'Pure heavenly white', brand: 'Heavenly' },
    { id: 'ivory-lace', name: 'Ivory Lace Romance', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', color: '#fffbeb', description: 'Delicate lace dream', brand: 'Bridal Dreams' },
    
    // Purple Collection
    { id: 'purple-velvet', name: 'Purple Velvet Drama', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600', color: '#7c3aed', description: 'Mysterious royal', brand: 'Midnight Purple' },
    { id: 'lavender-fairy', name: 'Lavender Fairy', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600', color: '#c4b5fd', description: 'Whimsical princess', brand: 'Fantasy Wear' },
    { id: 'violet-mermaid', name: 'Violet Mermaid', image: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600', color: '#8b5cf6', description: 'Stunning mermaid tail', brand: 'Mystical' },
    
    // Floral Collection
    { id: 'floral-maxi', name: 'Romantic Floral Maxi', image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600', color: '#f472b6', description: 'Garden party perfect', brand: 'Garden Romance' },
    { id: 'rose-print', name: 'Rose Print Dress', image: 'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?w=600', color: '#f43f5e', description: 'Romantic roses dreamy', brand: 'Rose Garden' },
    
    // Traditional Sarees
    { id: 'red-banarasi', name: 'Red Banarasi Saree', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', color: '#dc2626', description: 'Royal Banarasi silk', brand: 'Saree Palace' },
    { id: 'pink-kanjivaram', name: 'Pink Kanjivaram', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600', color: '#ec4899', description: 'South Indian beauty', brand: 'Silk Heritage' },
    
    // Lehengas
    { id: 'pink-bridal-lehenga', name: 'Pink Bridal Lehenga', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', color: '#ec4899', description: 'Bride-to-be vibes', brand: 'Bridal Couture' },
    { id: 'red-bridal-lehenga', name: 'Red Bridal Lehenga', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', color: '#dc2626', description: 'Traditional perfection', brand: 'Wedding' },
    
    // Honeymoon Collection
    { id: 'white-lace-bridal', name: 'White Lace Bridal', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', color: '#ffffff', description: 'Honeymoon nights', brand: 'Bridal Intimate' },
    { id: 'silk-champagne-slip', name: 'Champagne Night', image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=600', color: '#fef3c7', description: 'Romantic evenings', brand: 'Honeymoon Suite' },
    { id: 'red-satin-romance', name: 'Red Satin Romance', image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=600', color: '#dc2626', description: 'Passion nights', brand: 'Romance Collection' },
  ],
  earrings: [
    { id: 'diamond-drops', name: 'Diamond Teardrop', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', color: '#e0f2fe', description: 'Elegant VS1 clarity diamond teardrops', brand: 'Luxury Gems' },
    { id: 'gold-chandeliers', name: 'Gold Chandeliers', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#fcd34d', description: 'Statement gold chandelier earrings', brand: 'Gold Dreams' },
    { id: 'pearl-studs', name: 'Pearl Studs', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', color: '#faf5ff', description: 'Classic pearl studs - timeless elegance', brand: 'Pearl Paradise' },
    { id: 'ruby-dangles', name: 'Ruby Dangles', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', color: '#ef4444', description: 'Gorgeous ruby drops with diamond halo', brand: 'Ruby Romance' },
    { id: 'emerald-hoops', name: 'Emerald Hoops', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600', color: '#34d399', description: 'Emerald-encrusted gold hoops', brand: 'Green Glory' },
    { id: 'kundan-jhumkas', name: 'Kundan Jhumkas', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600', color: '#f59e0b', description: 'Traditional Rajasthani kundan jhumkas', brand: 'Royal Heritage' },
    { id: 'heart-studs', name: 'Heart Shaped Studs', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', color: '#f43f5e', description: 'Cute heart-shaped diamond studs', brand: 'Love Collection' },
    { id: 'butterfly-dangles', name: 'Butterfly Dangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#a78bfa', description: 'Delicate butterfly earrings - so pretty!', brand: 'Flutter By' },
  ],
  necklaces: [
    { id: 'diamond-choker', name: 'Diamond Choker', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600', color: '#f0f9ff', description: 'Stunning diamond choker', brand: 'Diamond Dreams' },
    { id: 'gold-layered', name: 'Layered Gold Chains', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#fcd34d', description: 'Trendy layered gold chains', brand: 'Layer Love' },
    { id: 'pearl-strand', name: 'Pearl Strand', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', color: '#fffbeb', description: 'Classic pearl strand necklace', brand: 'Pearl Elegance' },
    { id: 'heart-pendant', name: 'Heart Pendant', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600', color: '#fb7185', description: 'Romantic heart pendant - my heart for you!', brand: 'Heart to Heart' },
    { id: 'kundan-set', name: 'Kundan Bridal Set', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600', color: '#fbbf24', description: 'Traditional kundan bridal set', brand: 'Bridal Treasure' },
    { id: 'infinity-pendant', name: 'Infinity Pendant', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600', color: '#a78bfa', description: 'Infinity symbol - our forever love!', brand: 'Forever Yours' },
  ],
  shoes: [
    { id: 'crystal-stilettos', name: 'Crystal Stilettos', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600', color: '#e0f2fe', description: 'Cinderella-worthy crystal heels', brand: 'Fairy Tale' },
    { id: 'red-pumps', name: 'Red Stiletto Pumps', image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600', color: '#dc2626', description: 'Sexy red heels - instant confidence boost!', brand: 'Red Hot' },
    { id: 'gold-strappy', name: 'Gold Strappy Heels', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600', color: '#fbbf24', description: 'Elegant gold strappy sandals', brand: 'Golden Steps' },
    { id: 'nude-platforms', name: 'Nude Platform Heels', image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600', color: '#fed7aa', description: 'Comfortable nude platforms', brand: 'Nude Elegance' },
    { id: 'pink-heels', name: 'Pink Princess Heels', image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600', color: '#f472b6', description: 'Pretty pink heels for a princess', brand: 'Pink Dreams' },
    { id: 'black-stilettos', name: 'Black Stilettos', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600', color: '#1f2937', description: 'Classic black stilettos - always sexy', brand: 'Night Out' },
    { id: 'rose-gold-sandals', name: 'Rose Gold Sandals', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600', color: '#fda4af', description: 'Delicate rose gold sandals', brand: 'Rose Dreams' },
  ],
  hairstyles: [
    { id: 'elegant-updo', name: 'Elegant Chignon', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', color: '#78350f', description: 'Classic twisted chignon - so elegant!', brand: 'Updo Queen' },
    { id: 'hollywood-waves', name: 'Hollywood Waves', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600', color: '#92400e', description: 'Old Hollywood glamour waves', brand: 'Vintage Glam' },
    { id: 'braided-crown', name: 'Braided Crown', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600', color: '#451a03', description: 'Romantic braided crown style', brand: 'Boho Beauty' },
    { id: 'loose-curls', name: 'Soft Romantic Curls', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600', color: '#78350f', description: 'Soft bouncy curls - effortlessly pretty', brand: 'Curl Crush' },
    { id: 'sleek-ponytail', name: 'Sleek Ponytail', image: 'https://images.unsplash.com/photo-1554519515-242161756769?w=600', color: '#1c1917', description: 'Dramatic high ponytail', brand: 'Power Pony' },
    { id: 'flower-bun', name: 'Floral Decorated Bun', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600', color: '#be185d', description: 'Beautiful bun with fresh flowers', brand: 'Flower Girl' },
    { id: 'messy-bun', name: 'Cute Messy Bun', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', color: '#92400e', description: 'Adorably messy bun - casually cute', brand: 'Effortless' },
  ],
  extras: [
    { id: 'diamond-ring', name: 'Solitaire Ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600', color: '#f0f9ff', description: 'Beautiful solitaire diamond ring', brand: 'Forever Yours' },
    { id: 'gold-bangles', name: 'Gold Bangle Stack', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#fcd34d', description: 'Stack of delicate gold bangles', brand: 'Bangle Beauty' },
    { id: 'clutch-rose', name: 'Rose Gold Clutch', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', color: '#fda4af', description: 'Elegant rose gold evening clutch', brand: 'Clutch Queen' },
    { id: 'tiara', name: 'Crystal Tiara', image: 'https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=600', color: '#e0f2fe', description: 'Princess-worthy crystal tiara', brand: 'Crown Jewels' },
    { id: 'maang-tikka', name: 'Kundan Maang Tikka', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600', color: '#fbbf24', description: 'Traditional kundan tikka', brand: 'Royal Touch' },
    { id: 'silk-wrap', name: 'Silk Evening Shawl', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600', color: '#a78bfa', description: 'Luxurious silk pashmina', brand: 'Silk Whispers' },
    { id: 'statement-bracelet', name: 'Statement Bracelet', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#f43f5e', description: 'Bold statement bracelet', brand: 'Wrist Candy' },
  ],
};

// Full Item Preview Modal (Shopping Website Style)
const ItemPreviewModal = ({
  item,
  category,
  onClose,
  onSelect
}: {
  item: Item;
  category: string;
  onClose: () => void;
  onSelect: () => void;
}) => {
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
      <div
        style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          padding: '16px',
          paddingTop: 'max(16px, env(safe-area-inset-top))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <motion.button
          onClick={onClose}
          style={{
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} />
        </motion.button>
        <span style={{ color: 'white', fontFamily: 'serif', fontSize: '1rem' }}>
          {item.brand}
        </span>
        <motion.button
          onClick={onClose}
          style={{
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Main Content - Scrollable */}
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 'max(100px, env(safe-area-inset-bottom))' }}>
        {/* Large Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: '100%',
            aspectRatio: '1',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '9999px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-rose-400" fill="#fb7185" />
            <span style={{ color: 'white', fontSize: '12px' }}>For My Puntuu</span>
          </motion.div>
        </motion.div>

        {/* Product Details */}
        <div style={{ padding: '20px' }}>
          {/* Brand & Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)', 
              color: 'white',
              fontSize: '10px',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontWeight: 600,
            }}>
              {item.brand}
            </span>
            <span style={{ 
              background: 'rgba(255,255,255,0.1)', 
              color: 'white',
              fontSize: '10px',
              padding: '4px 10px',
              borderRadius: '9999px',
            }}>
              {category}
            </span>
          </div>

          {/* Product Name */}
          <h2 style={{
            color: 'white',
            fontFamily: 'serif',
            fontSize: '1.5rem',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}>
            {item.name}
          </h2>

          {/* Color Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Color:</span>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: item.color,
              border: '2px solid white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }} />
          </div>

          {/* Description */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <h3 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Why You'll Love It
            </h3>
            <p style={{ color: 'white', fontSize: '14px', lineHeight: 1.6 }}>
              {item.description}
            </p>
          </div>

          {/* Romantic Note */}
          <motion.div
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center',
              border: '1px solid rgba(236, 72, 153, 0.3)',
            }}
            animate={{ boxShadow: ['0 0 20px rgba(236,72,153,0.2)', '0 0 40px rgba(236,72,153,0.4)', '0 0 20px rgba(236,72,153,0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💕
            </motion.span>
            <p style={{ color: 'white', fontFamily: 'serif', fontSize: '14px', fontStyle: 'italic' }}>
              "You'd look absolutely stunning in this, my love!"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.8))',
        backdropFilter: 'blur(20px)',
      }}>
        <motion.button
          onClick={() => { onSelect(); onClose(); }}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Check className="w-5 h-5" />
          Select This For Our Date 💕
        </motion.button>
      </div>
    </motion.div>,
    document.body
  );
};

// Realistic Item Card Component - NO PRICE SHOWN
const ItemCard = ({ 
  item, 
  isSelected, 
  onSelect,
  onPreview,
  index 
}: { 
  item: Item; 
  isSelected: boolean; 
  onSelect: () => void;
  onPreview: () => void;
  index: number;
}) => {
  return (
    <motion.div
      className="relative cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <div 
        className={`
          relative rounded-2xl overflow-hidden
          ${isSelected 
            ? 'ring-3 ring-rose-400 shadow-xl shadow-rose-500/30' 
            : 'ring-1 ring-white/20'
          }
        `}
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Quick View Button */}
          <motion.button
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-white" />
          </motion.button>
          
          {/* Selection indicator */}
          {isSelected && (
            <motion.div
              className="absolute top-2 left-2 w-7 h-7 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              style={{
                boxShadow: "0 4px 15px rgba(251, 113, 133, 0.5)",
              }}
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
          
          {/* Sparkle effects when selected */}
          {isSelected && (
            <>
              <motion.div
                className="absolute bottom-14 left-2"
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </motion.div>
              <motion.div
                className="absolute bottom-14 right-2"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
              </motion.div>
            </>
          )}
        </div>
        
        {/* Item Info - NO PRICE */}
        <div className="p-3">
          <p className="text-[10px] text-rose-400 font-medium mb-0.5">{item.brand}</p>
          <p className="text-sm text-white font-medium truncate">{item.name}</p>
        </div>
        
        {/* Selection glow */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              boxShadow: 'inset 0 0 30px rgba(251, 113, 133, 0.3)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Date Night Result Modal
const DateNightModal = ({
  selections,
  onClose
}: {
  selections: Record<Category, string | null>;
  onClose: () => void;
}) => {
  const getSelectedItems = () => {
    const selected: { category: string; item: Item }[] = [];
    Object.entries(selections).forEach(([cat, itemId]) => {
      if (itemId) {
        const item = items[cat as Category].find(i => i.id === itemId);
        if (item) {
          selected.push({ category: cat, item });
        }
      }
    });
    return selected;
  };

  const selectedItems = getSelectedItems();

  const modalContent = (
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
      {/* Romantic particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '1.5rem',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['✨', '💕', '💎', '🌟', '💗'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div 
        style={{
          flexShrink: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
          paddingTop: 'max(16px, env(safe-area-inset-top))',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <Crown className="w-6 h-6 text-amber-400" />
          <span style={{ color: 'white', fontFamily: 'serif', fontSize: '1.25rem' }}>
            Ready for Our Date! 💕
          </span>
          <Crown className="w-6 h-6 text-amber-400" />
        </motion.div>
        <motion.button
          onClick={onClose}
          style={{
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px', paddingBottom: 'max(40px, env(safe-area-inset-bottom))' }}>
        {/* Romantic message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.2) 0%, rgba(217, 70, 239, 0.2) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(251, 113, 133, 0.3)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '3rem', marginBottom: '16px' }}
          >
            👸✨
          </motion.div>
          <p style={{ color: 'white', fontFamily: 'serif', fontSize: '1.1rem', lineHeight: 1.6 }}>
            My beautiful Puntuu, you look absolutely stunning! 
            I can't wait for our romantic dinner date. 
            You're the most gorgeous person in the world to me! 💕
          </p>
        </motion.div>

        {/* Selected Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {selectedItems.map(({ category, item }, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ aspectRatio: '1', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '12px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', textTransform: 'uppercase' }}>
                  {category}
                </p>
                <p style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>
                  {item.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final romantic note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            textAlign: 'center',
            marginTop: '24px',
            padding: '20px',
          }}
        >
          <motion.p
            style={{ color: 'white', fontFamily: 'serif', fontSize: '1rem', fontStyle: 'italic' }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            "Can't wait to see you wearing all this on our date night... You're going to take my breath away! 💕"
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export const DressUpGame = ({ onComplete }: DressUpGameProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>('dresses');
  const [selections, setSelections] = useState<Record<Category, string | null>>({
    dresses: null,
    earrings: null,
    necklaces: null,
    shoes: null,
    hairstyles: null,
    extras: null,
  });
  const [showResult, setShowResult] = useState(false);
  const [previewItem, setPreviewItem] = useState<{ item: Item; category: Category } | null>(null);

  const handleSelect = (category: Category, itemId: string) => {
    setSelections(prev => ({ ...prev, [category]: itemId }));
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const isComplete = Object.values(selections).filter(Boolean).length >= 3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-serif text-rose-300">
            Date Night Wardrobe 👗
          </h3>
          <Crown className="w-6 h-6 text-amber-400" />
        </motion.div>
        <p className="text-white/60 text-sm">
          Pick your perfect outfit for our romantic dinner date! 💕
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              activeCategory === cat.key
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            {selections[cat.key] && (
              <Check className="w-3 h-3 ml-0.5" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Items Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {items[activeCategory].map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              isSelected={selections[activeCategory] === item.id}
              onSelect={() => handleSelect(activeCategory, item.id)}
              onPreview={() => setPreviewItem({ item, category: activeCategory })}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Complete Button */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center"
          >
            <motion.button
              onClick={() => {
                setShowResult(true);
                onComplete?.();
              }}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-medium shadow-xl shadow-pink-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 10px 40px rgba(236, 72, 153, 0.3)',
                  '0 10px 60px rgba(236, 72, 153, 0.5)',
                  '0 10px 40px rgba(236, 72, 153, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                See My Date Night Look! 💕
                <Sparkles className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && (
          <DateNightModal
            selections={selections}
            onClose={() => setShowResult(false)}
          />
        )}
      </AnimatePresence>

      {/* Item Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <ItemPreviewModal
            item={previewItem.item}
            category={categories.find(c => c.key === previewItem.category)?.label || previewItem.category}
            onClose={() => setPreviewItem(null)}
            onSelect={() => handleSelect(previewItem.category, previewItem.item.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
