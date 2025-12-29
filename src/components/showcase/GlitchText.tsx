"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
  text: string;
  intensity?: "normal" | "high";
  className?: string;
  glitchColor?: string;
}

export function GlitchText({ 
  text, 
  intensity = "normal", 
  className = "",
  glitchColor = "#00f2ff" 
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative inline-block font-glitch font-black ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.2 : 1.0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      {/* Main text */}
      <span
        className={`relative z-10 ${
          isHovered || intensity === "high"
            ? "animate-glitch-intense"
            : "animate-glitch"
        }`}
        style={{
          textShadow: isHovered
            ? `-3px 0 ${glitchColor}, 3px 0 ${glitchColor}`
            : `-2px 0 ${glitchColor}, 2px 0 ${glitchColor}`,
        }}
      >
        {text}
      </span>

      {/* Pseudo-element effects via absolutely positioned duplicates */}
      <span
        className="absolute top-0 left-0 opacity-70 pointer-events-none"
        style={{
          color: glitchColor,
          transform: "translate(-2px, 0)",
          mixBlendMode: "screen",
        }}
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 opacity-70 pointer-events-none"
        style={{
          color: glitchColor,
          transform: "translate(2px, 0)",
          mixBlendMode: "screen",
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

