import { FloatingPetals } from "./FloatingPetals";
import { AuroraGlow } from "./AuroraGlow";
import { MagicalParticles } from "./MagicalParticles";
import { GlowingOrbs } from "./GlowingOrbs";
import { HeartRain } from "./HeartRain";
import { SparkleTrail } from "./SparkleTrail";
import { Fireflies } from "./Fireflies";
import { ParallaxStars } from "./ParallaxStars";
import { HeartCursor } from "./HeartCursor";

interface RomanticAmbienceProps {
  variant?: "full" | "subtle" | "intense";
  showCursor?: boolean;
}

export const RomanticAmbience = ({ 
  variant = "full", 
  showCursor = true 
}: RomanticAmbienceProps) => {
  return (
    <>
      {/* Base layers - always present */}
      <AuroraGlow />
      <GlowingOrbs />
      
      {/* Variant-based effects */}
      {variant === "subtle" && (
        <>
          <Fireflies />
          <ParallaxStars />
        </>
      )}

      {variant === "full" && (
        <>
          <FloatingPetals />
          <MagicalParticles />
          <Fireflies />
          <ParallaxStars />
        </>
      )}

      {variant === "intense" && (
        <>
          <FloatingPetals />
          <HeartRain />
          <MagicalParticles />
          <Fireflies />
          <ParallaxStars />
        </>
      )}

      {/* Interactive effects */}
      <SparkleTrail />
      {showCursor && <HeartCursor />}
    </>
  );
};
