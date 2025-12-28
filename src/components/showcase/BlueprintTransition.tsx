"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface BlueprintTransitionProps {
  children: ReactNode;
}

export default function BlueprintTransition({ children }: BlueprintTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress to avoid “color banding” jumps
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.6 });

  // Global background & text progression (dark → dawn → daylight → warm)
  const backgroundColor = useTransform(
    smooth,
    [0, 0.3, 0.6, 1],
    ["#1A0B2E", "#2D1B69", "#E0F2FE", "#FEF3C7"]
  );
  
  const textColor = useTransform(
    smooth,
    [0, 0.3, 0.6, 1],
    ["#F9FAFB", "#F9FAFB", "#1E293B", "#0F172A"]
  );
  
  // Grid fades out as things become "real world"
  const gridOpacity = useTransform(smooth, [0, 0.5, 1], [0.15, 0.08, 0.03]);
  
  // Grid hue shifts with the journey
  const gridColor = useTransform(smooth, [0, 0.5, 1], [
    "rgba(139, 92, 246, 0.15)",
    "rgba(59, 130, 246, 0.2)",
    "rgba(251, 191, 36, 0.25)",
  ]);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor, color: textColor, willChange: "background-color, color" }}
      className="relative min-h-screen"
    >
      {/* Blueprint grid overlay */}
      <motion.div
        style={{ opacity: gridOpacity, willChange: "opacity" }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <motion.div
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            ["--grid-color" as string]: gridColor,
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* Subtle vignette for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(900px_600px_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
