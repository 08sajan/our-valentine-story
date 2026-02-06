import { FloatingPetals } from "./FloatingPetals";
import { AuroraGlow } from "./AuroraGlow";
import { GlowingOrbs } from "./GlowingOrbs";
import { Fireflies } from "./Fireflies";
import { ParallaxStars } from "./ParallaxStars";

interface RomanticAmbienceProps {
  variant?: "full" | "subtle" | "intense";
  showCursor?: boolean;
}

export const RomanticAmbience = ({ 
  variant = "subtle", 
}: RomanticAmbienceProps) => {
  // Simplified ambience - only essential effects for performance
  return (
    <>
      {/* Base layer */}
      <AuroraGlow />
      
      {variant === "subtle" && (
        <ParallaxStars />
      )}

      {variant === "full" && (
        <>
          <ParallaxStars />
          <GlowingOrbs />
        </>
      )}

      {variant === "intense" && (
        <>
          <FloatingPetals />
          <Fireflies />
          <ParallaxStars />
        </>
      )}
    </>
  );
};
