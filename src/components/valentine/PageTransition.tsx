import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  transitionKey: string | number;
  variant?: "slide" | "fade" | "scale" | "flip" | "romantic";
}

const variants = {
  slide: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  },
  romantic: {
    initial: { scale: 0.9, opacity: 0, y: 30, filter: "blur(10px)" },
    animate: { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { scale: 0.9, opacity: 0, y: -30, filter: "blur(10px)" },
  },
};

export const PageTransition = ({ 
  children, 
  transitionKey, 
  variant = "romantic" 
}: PageTransitionProps) => {
  const selectedVariant = variants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
          duration: 0.5,
        }}
        style={{ perspective: "1000px" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// 3D Card effect wrapper
export const Card3D = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ 
        rotateX: 5, 
        rotateY: 5, 
        scale: 1.02,
        z: 50,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth section transition
export const SectionTransition = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};
