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
  price: string;
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

// Realistic items with shopping website style
const items: Record<Category, Item[]> = {
  dresses: [
    { id: 'red-velvet-gown', name: 'Red Velvet Evening Gown', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600', color: '#dc2626', description: 'Luxurious floor-length velvet with sweetheart neckline, perfect for romantic dinner dates', price: '₹12,999', brand: 'Sabyasachi' },
    { id: 'blush-tulle', name: 'Blush Tulle Princess Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', color: '#fda4af', description: 'Romantic layered tulle ballgown with delicate beading', price: '₹18,499', brand: 'Manish Malhotra' },
    { id: 'gold-sequin', name: 'Gold Sequin Mermaid Gown', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600', color: '#fbbf24', description: 'Stunning all-over sequin mermaid dress that catches every light', price: '₹25,999', brand: 'Tarun Tahiliani' },
    { id: 'emerald-satin', name: 'Emerald Satin Slip Dress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', color: '#10b981', description: 'Elegant bias-cut silk satin for understated glamour', price: '₹8,999', brand: 'Anita Dongre' },
    { id: 'burgundy-lace', name: 'Burgundy French Lace Gown', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600', color: '#7f1d1d', description: 'Intricate French lace overlay with romantic details', price: '₹22,500', brand: 'Ritu Kumar' },
    { id: 'champagne-beaded', name: 'Champagne Beaded Gown', image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600', color: '#fef3c7', description: 'Hand-beaded bodice with flowing organza skirt', price: '₹35,000', brand: 'Falguni Shane' },
    { id: 'black-velvet', name: 'Black Velvet Drama Dress', image: 'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?w=600', color: '#1f2937', description: 'Classic old Hollywood glamour with modern edge', price: '₹15,999', brand: 'Rohit Bal' },
    { id: 'pink-lehenga', name: 'Pink Bridal Lehenga Set', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600', color: '#ec4899', description: 'Traditional embroidered bridal lehenga with heavy work', price: '₹1,25,000', brand: 'Sabyasachi' },
  ],
  earrings: [
    { id: 'diamond-drops', name: 'Diamond Teardrop Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', color: '#e0f2fe', description: 'Elegant VS1 clarity diamond teardrops in 18k white gold', price: '₹85,000', brand: 'Tanishq' },
    { id: 'gold-chandeliers', name: 'Gold Chandelier Earrings', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#fcd34d', description: 'Statement 22k gold chandelier earrings with intricate filigree', price: '₹45,000', brand: 'Kalyan Jewellers' },
    { id: 'pearl-studs', name: 'Akoya Pearl Studs', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', color: '#faf5ff', description: 'Classic AAA grade Akoya pearl studs in platinum setting', price: '₹28,000', brand: 'Mikimoto' },
    { id: 'ruby-dangles', name: 'Burma Ruby Dangles', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', color: '#ef4444', description: 'Pigeon blood Burma ruby drops with diamond halo', price: '₹1,50,000', brand: 'Cartier' },
    { id: 'emerald-hoops', name: 'Emerald Encrusted Hoops', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600', color: '#34d399', description: 'Zambian emerald-encrusted 18k gold hoops', price: '₹65,000', brand: 'Bulgari' },
    { id: 'kundan-jhumkas', name: 'Royal Kundan Jhumkas', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600', color: '#f59e0b', description: 'Traditional Rajasthani kundan polki jhumka earrings', price: '₹55,000', brand: 'Amrapali' },
  ],
  necklaces: [
    { id: 'diamond-choker', name: 'Diamond Tennis Choker', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600', color: '#f0f9ff', description: '10 carat brilliant-cut diamond choker in platinum', price: '₹5,00,000', brand: 'Tiffany & Co.' },
    { id: 'gold-layered', name: 'Gold Layered Chain Set', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#fcd34d', description: 'Delicate 22k gold layered chains with pendants', price: '₹75,000', brand: 'Malabar Gold' },
    { id: 'pearl-strand', name: 'South Sea Pearl Strand', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', color: '#fffbeb', description: 'Classic graduated South Sea pearl necklace', price: '₹2,50,000', brand: 'Paspaley' },
    { id: 'statement-bib', name: 'Crystal Statement Bib', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600', color: '#a78bfa', description: 'Swarovski crystal-encrusted statement bib necklace', price: '₹35,000', brand: 'Swarovski' },
    { id: 'kundan-set', name: 'Kundan Bridal Set', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600', color: '#fbbf24', description: 'Traditional kundan polki bridal necklace with matching tikka', price: '₹3,00,000', brand: 'Hazoorilal' },
    { id: 'pendant-chain', name: 'Diamond Heart Pendant', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600', color: '#fb7185', description: 'Romantic diamond heart pendant on 18k rose gold chain', price: '₹45,000', brand: 'Tanishq' },
  ],
  shoes: [
    { id: 'crystal-stilettos', name: 'Crystal Cinderella Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600', color: '#e0f2fe', description: 'Hand-placed Swarovski crystal stilettos, 4" heel', price: '₹85,000', brand: 'Jimmy Choo' },
    { id: 'red-pumps', name: 'Red Satin Pumps', image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600', color: '#dc2626', description: 'Classic red carpet Christian Louboutin style stilettos', price: '₹65,000', brand: 'Louboutin' },
    { id: 'gold-strappy', name: 'Gold Strappy Sandals', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600', color: '#fbbf24', description: 'Elegant metallic gold strappy evening sandals', price: '₹35,000', brand: 'Stuart Weitzman' },
    { id: 'nude-platforms', name: 'Nude Platform Heels', image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600', color: '#fed7aa', description: 'Comfortable nude patent leather platforms, 5" heel', price: '₹28,000', brand: 'Gianvito Rossi' },
    { id: 'silver-sparkle', name: 'Silver Glitter Pumps', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600', color: '#e2e8f0', description: 'Sparkling silver glitter pumps for special occasions', price: '₹42,000', brand: 'Miu Miu' },
    { id: 'rose-gold-sandals', name: 'Rose Gold Sandals', image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600', color: '#fda4af', description: 'Delicate rose gold evening sandals with ankle strap', price: '₹32,000', brand: 'Aquazzura' },
  ],
  hairstyles: [
    { id: 'elegant-updo', name: 'Classic Twisted Chignon', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', color: '#78350f', description: 'Elegant twisted chignon perfect for formal occasions', price: 'Styling', brand: 'Aalim Hakim' },
    { id: 'hollywood-waves', name: 'Hollywood Finger Waves', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600', color: '#92400e', description: 'Old Hollywood glamour with perfectly sculpted waves', price: 'Styling', brand: 'Sapna Bhavnani' },
    { id: 'braided-crown', name: 'Romantic Braided Crown', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600', color: '#451a03', description: 'Romantic Dutch braided crown style with loose tendrils', price: 'Styling', brand: 'Ambika Pillai' },
    { id: 'loose-curls', name: 'Soft Romantic Curls', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600', color: '#78350f', description: 'Soft bouncy curls for a romantic, effortless look', price: 'Styling', brand: 'Adhuna Bhabani' },
    { id: 'sleek-ponytail', name: 'Sleek High Ponytail', image: 'https://images.unsplash.com/photo-1554519515-242161756769?w=600', color: '#1c1917', description: 'Dramatic sleek high ponytail for a powerful look', price: 'Styling', brand: 'Hakim Aalim' },
    { id: 'flower-bun', name: 'Floral Decorated Bun', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600', color: '#be185d', description: 'Traditional low bun adorned with fresh flowers', price: 'Styling', brand: 'Bianca Hartkopf' },
  ],
  extras: [
    { id: 'diamond-ring', name: 'Solitaire Diamond Ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600', color: '#f0f9ff', description: '2 carat D-color flawless solitaire in platinum', price: '₹8,00,000', brand: 'De Beers' },
    { id: 'gold-bangles', name: 'Gold Bangle Stack', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', color: '#fcd34d', description: 'Set of 12 delicate 22k gold bangles with texture', price: '₹1,20,000', brand: 'Senco Gold' },
    { id: 'clutch-rose', name: 'Rose Gold Box Clutch', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', color: '#fda4af', description: 'Elegant rose gold metal box clutch with crystals', price: '₹25,000', brand: 'Judith Leiber' },
    { id: 'tiara', name: 'Crystal Bridal Tiara', image: 'https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=600', color: '#e0f2fe', description: 'Princess-worthy Swarovski crystal tiara', price: '₹35,000', brand: 'Oscar de la Renta' },
    { id: 'maang-tikka', name: 'Kundan Maang Tikka', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600', color: '#fbbf24', description: 'Traditional kundan polki maang tikka with pearls', price: '₹45,000', brand: 'Amrapali' },
    { id: 'silk-wrap', name: 'Silk Evening Shawl', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600', color: '#a78bfa', description: 'Luxurious hand-embroidered silk pashmina shawl', price: '₹18,000', brand: 'Pashmina' },
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

          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            marginBottom: '16px',
          }}>
            <span style={{ color: '#fbbf24', fontSize: '1.5rem', fontWeight: 700 }}>
              {item.price}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              (Worth every penny for you!)
            </span>
          </div>

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
              Product Details
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

// Realistic Item Card Component
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
        
        {/* Item Info */}
        <div className="p-3">
          <p className="text-[10px] text-rose-400 font-medium mb-0.5">{item.brand}</p>
          <p className="text-sm text-white font-medium truncate">{item.name}</p>
          <p className="text-xs text-amber-400 font-bold mt-1">{item.price}</p>
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
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
              />
              <div style={{ padding: '12px' }}>
                <p style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>{item.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginTop: '2px' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Romantic Date Scene */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '24px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)',
            borderRadius: '24px',
            textAlign: 'center',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: '4rem', marginBottom: '16px' }}
          >
            🌙🍷🕯️
          </motion.div>
          <h3 style={{ color: '#fbbf24', fontFamily: 'serif', fontSize: '1.5rem', marginBottom: '12px' }}>
            Our Dream Date Night
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
            A candlelit dinner at our favorite restaurant...
            Soft music playing in the background...
            Your hand in mine across the table...
            This is all I ever dreamed of, Puntuu. 💕
          </p>
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
      navigator.vibrate([50]);
    }
  };

  const completedCount = Object.values(selections).filter(Boolean).length;
  const allSelected = completedCount === categories.length;

  const handleComplete = () => {
    setShowResult(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    onComplete?.();
  };

  const getSelectedItem = (category: Category) => {
    const itemId = selections[category];
    return items[category].find(item => item.id === itemId);
  };

  const activeCategoryIndex = categories.findIndex(c => c.key === activeCategory);

  const goToPrevCategory = () => {
    if (activeCategoryIndex > 0) {
      setActiveCategory(categories[activeCategoryIndex - 1].key);
    }
  };

  const goToNextCategory = () => {
    if (activeCategoryIndex < categories.length - 1) {
      setActiveCategory(categories[activeCategoryIndex + 1].key);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Crown className="w-6 h-6 text-amber-400" />
          </motion.div>
          <h3 className="text-lg font-serif text-rose-300">
            Get Ready for Our Date 💕
          </h3>
          <motion.div
            animate={{ rotateY: [0, -360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Crown className="w-6 h-6 text-amber-400" />
          </motion.div>
        </div>
        <p className="text-white/70 text-xs">
          Choose your perfect look from our collection ✨
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / categories.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-center text-white/50 text-xs mt-2">
          {completedCount} of {categories.length} selected
        </p>
      </div>

      {/* Category Navigation with arrows */}
      <div className="flex items-center gap-2 px-2">
        <motion.button
          onClick={goToPrevCategory}
          disabled={activeCategoryIndex === 0}
          className={`p-2 rounded-full ${
            activeCategoryIndex === 0 
              ? 'bg-white/5 text-white/30' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium 
                  flex items-center gap-2 whitespace-nowrap transition-all
                  ${activeCategory === cat.key
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }
                  ${selections[cat.key] ? 'ring-2 ring-green-400/50' : ''}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-base">{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.label}</span>
                {selections[cat.key] && <Check className="w-3 h-3 text-green-400" />}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.button
          onClick={goToNextCategory}
          disabled={activeCategoryIndex === categories.length - 1}
          className={`p-2 rounded-full ${
            activeCategoryIndex === categories.length - 1 
              ? 'bg-white/5 text-white/30' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Items Grid */}
      <div className="relative bg-gradient-to-br from-black/40 to-purple-900/30 rounded-2xl p-4 border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
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
      </div>

      {/* Selected Preview */}
      <div className="bg-gradient-to-br from-amber-900/30 to-rose-900/30 rounded-2xl p-4 border border-amber-500/30">
        <h4 className="text-center text-rose-300 text-sm mb-3 flex items-center justify-center gap-2">
          <Gem className="w-4 h-4" />
          Your Look
          <Gem className="w-4 h-4" />
        </h4>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => {
            const selected = getSelectedItem(cat.key);
            return (
              <motion.div
                key={cat.key}
                className="flex-shrink-0 w-16 text-center"
                animate={selected ? { y: [0, -3, 0] } : {}}
                transition={{ duration: 2, repeat: selected ? Infinity : 0 }}
              >
                <div 
                  className={`
                    w-14 h-14 mx-auto rounded-xl overflow-hidden
                    ${selected 
                      ? 'ring-2 ring-rose-400 shadow-lg shadow-rose-500/30' 
                      : 'bg-white/10 border border-dashed border-white/30'
                    }
                  `}
                >
                  {selected ? (
                    <img 
                      src={selected.image} 
                      alt={selected.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl opacity-40">
                      {cat.emoji}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-white/60 mt-1 truncate">{cat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Complete Button */}
      <motion.button
        onClick={handleComplete}
        disabled={!allSelected}
        className={`
          w-full py-4 rounded-2xl text-white font-medium
          flex items-center justify-center gap-3
          ${allSelected
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-xl shadow-rose-500/30'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
          }
        `}
        whileHover={allSelected ? { scale: 1.02 } : {}}
        whileTap={allSelected ? { scale: 0.98 } : {}}
        animate={allSelected ? {
          boxShadow: [
            '0 10px 40px rgba(251, 113, 133, 0.3)',
            '0 10px 60px rgba(251, 113, 133, 0.5)',
            '0 10px 40px rgba(251, 113, 133, 0.3)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: allSelected ? Infinity : 0 }}
      >
        {allSelected ? (
          <>
            <Heart className="w-5 h-5" fill="white" />
            Ready for Our Date Night! 💕
            <Sparkles className="w-5 h-5" />
          </>
        ) : (
          <>
            Complete all selections ({completedCount}/{categories.length})
          </>
        )}
      </motion.button>

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
