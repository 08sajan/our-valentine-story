import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = "",
  onComplete 
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    timeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-current ml-0.5 align-middle"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </span>
  );
};

// Self-typing love letter component
export const SelfTypingLoveLetter = ({ isVisible }: { isVisible: boolean }) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  
  const paragraphs = [
    "My Dearest Anjali,",
    "From the first moment I saw you, I knew you were special. Your smile lights up my darkest days, your laughter is my favorite melody, and your love is the greatest gift I've ever received.",
    "This Valentine's Week, I wanted to remind you of how much you mean to me. Every day with you is a blessing, and I fall more in love with you with each passing moment.",
    "You're not just my Valentine—you're my best friend, my confidant, my partner in everything. I can't imagine my life without you.",
    "Forever and Always Yours, ❤️ Your Love"
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 shadow-2xl max-w-lg mx-auto text-left space-y-4 border border-pink-100"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(236, 72, 153, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(236, 72, 153, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "20px 28px",
      }}
    >
      {paragraphs.slice(0, currentParagraph + 1).map((para, index) => (
        <p 
          key={index} 
          className={`leading-relaxed ${
            index === 0 ? "text-red-700 font-serif text-lg" : 
            index === paragraphs.length - 1 ? "text-red-600 font-serif text-lg italic" :
            "text-gray-700"
          }`}
        >
          {index === currentParagraph ? (
            <TypewriterText 
              text={para}
              speed={30}
              onComplete={() => {
                if (currentParagraph < paragraphs.length - 1) {
                  setTimeout(() => setCurrentParagraph(prev => prev + 1), 500);
                }
              }}
            />
          ) : (
            para
          )}
        </p>
      ))}
    </motion.div>
  );
};
