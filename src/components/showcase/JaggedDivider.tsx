"use client";

import { motion } from "framer-motion";

interface JaggedDividerProps {
  isActive?: boolean;
}

export function JaggedDivider({ isActive = false }: JaggedDividerProps) {
  // Generate a subtly diagonal path (not perfectly vertical)
  const generateJaggedPath = () => {
    const segments = 40;
    const segmentHeight = 100 / segments; // Use percentages for full screen
    const subtleDiagonalDrift = 3; // Very subtle diagonal from left-to-right (not straight)
    let path = "M 12,0"; // Start at center

    for (let i = 1; i <= segments; i++) {
      const y = i * segmentHeight;
      // Create very subtle diagonal drift from top-left to bottom-right
      const diagonalOffset = (i / segments) * subtleDiagonalDrift;
      // Add micro-variations for texture
      const microVariation = Math.sin(i * 0.5) * 0.5;
      const xOffset = 12 + diagonalOffset + microVariation;
      path += ` L ${xOffset},${y}`;
    }

    return path;
  };

  const jaggedPath = generateJaggedPath();

  return (
    <motion.svg
      width="2"
      height="100%"
      viewBox="0 0 24 100"
      preserveAspectRatio="none"
      className="h-full"
      style={{ minWidth: "2px" }}
      animate={{
        x: isActive ? [0, 1, -1, 0.5, -0.5, 0] : 0,
        y: isActive ? [0, -0.5, 0.5, -1, 1, 0] : 0,
      }}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <defs>
        {/* Glow filter for active state */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The diagonal jagged line - only cyan, no magenta */}
      <motion.path
        d={jaggedPath}
        stroke={isActive ? "#00f2ff" : "#30363d"}
        strokeWidth="2"
        fill="none"
        filter={isActive ? "url(#glow)" : undefined}
        vectorEffect="non-scaling-stroke"
        animate={{
          strokeWidth: isActive ? [2, 3, 2] : 2,
          opacity: isActive ? [0.8, 1, 0.8] : 0.5,
        }}
        transition={{
          duration: 0.3,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Additional cyan glow layer when active */}
      {isActive && (
        <motion.path
          d={jaggedPath}
          stroke="#00f2ff"
          strokeWidth="4"
          fill="none"
          opacity="0.3"
          filter="url(#glow)"
          vectorEffect="non-scaling-stroke"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.svg>
  );
}

