"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlitchText } from "./GlitchText";

interface Pillar {
  id: number;
  title: string;
  background: string;
  description: string;
  expandedContent: {
    subtitle: string;
    features: string[];
    stats: { label: string; value: string }[];
  };
}

const pillars: Pillar[] = [
  {
    id: 1,
    title: "ARCHITECT",
    background: "#001A3D",
    description: "Blueprint your store's automation DNA. We map friction points, handoffs, and manual loops into a clean systems diagram.",
    expandedContent: {
      subtitle: "We Design Your Automation Blueprint",
      features: [
        "Map all manual processes and friction points",
        "Identify automation opportunities with ROI estimates",
        "Create a visual system architecture",
        "Define integration touchpoints across platforms",
        "Build a phased implementation roadmap"
      ],
      stats: [
        { label: "Average Time Saved", value: "15-25hrs/week" },
        { label: "Typical ROI Timeline", value: "30-45 days" },
        { label: "Systems Integrated", value: "5-12 platforms" }
      ]
    }
  },
  {
    id: 2,
    title: "VISION",
    background: "#0D1117",
    description: "Deploy AI-powered workflows. Orders, support, inventory, and customer journeys run on autopilot with zero-code logic.",
    expandedContent: {
      subtitle: "Your 24/7 Automation Engine",
      features: [
        "AI-powered order processing and fulfillment",
        "Intelligent customer support routing",
        "Real-time inventory synchronization",
        "Automated WhatsApp and email sequences",
        "Dynamic pricing and promotion triggers"
      ],
      stats: [
        { label: "Uptime Guarantee", value: "99.9%" },
        { label: "Orders Processed", value: "500K+/month" },
        { label: "Response Time", value: "<30 seconds" }
      ]
    }
  },
  {
    id: 3,
    title: "THE AUDIT",
    background: "#FFFFFF",
    description: "Prove the ROI. Track hours saved, revenue recovered, and scale capacity gained with transparent performance metrics.",
    expandedContent: {
      subtitle: "Measure Everything That Matters",
      features: [
        "Real-time performance dashboards",
        "Revenue recovery tracking (cart abandonment, upsells)",
        "Time savings calculations per workflow",
        "Cost reduction analysis (staff, subscriptions)",
        "Monthly optimization recommendations"
      ],
      stats: [
        { label: "Avg Revenue Recovery", value: "20-35%" },
        { label: "Cost Reduction", value: "$3K-8K/month" },
        { label: "Efficiency Gain", value: "3-5x capacity" }
      ]
    }
  },
];

interface TriptychHeroProps {
  onExpandedChange?: (pillarId: number | null) => void;
}

export default function TriptychHero({ onExpandedChange }: TriptychHeroProps) {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePillarClick = (id: number) => {
    const newExpanded = expandedPillar === id ? null : id;
    setExpandedPillar(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  const getPillarFlex = (pillarId: number) => {
    if (expandedPillar === null) {
      return hoveredPillar === pillarId ? 0.45 : 0.33;
    } else {
      return expandedPillar === pillarId ? 0.8 : 0.1;
    }
  };

  const getPillarHeight = (pillarId: number) => {
    if (expandedPillar === null) {
      return "33.33vh";
    } else {
      return expandedPillar === pillarId ? "70vh" : "15vh";
    }
  };

  const getClipPath = (pillarId: number) => {
    if (!isMobile) return undefined;
    
    if (pillarId === 1) {
      return "polygon(0 0, 100% 0, 100% calc(100% - 8px), 98% 100%, 96% calc(100% - 6px), 94% 100%, 92% calc(100% - 8px), 90% 100%, 88% calc(100% - 6px), 86% 100%, 84% calc(100% - 8px), 82% 100%, 80% calc(100% - 6px), 78% 100%, 76% calc(100% - 8px), 74% 100%, 72% calc(100% - 6px), 70% 100%, 68% calc(100% - 8px), 66% 100%, 64% calc(100% - 6px), 62% 100%, 60% calc(100% - 8px), 58% 100%, 56% calc(100% - 6px), 54% 100%, 52% calc(100% - 8px), 50% 100%, 48% calc(100% - 6px), 46% 100%, 44% calc(100% - 8px), 42% 100%, 40% calc(100% - 6px), 38% 100%, 36% calc(100% - 8px), 34% 100%, 32% calc(100% - 6px), 30% 100%, 28% calc(100% - 8px), 26% 100%, 24% calc(100% - 6px), 22% 100%, 20% calc(100% - 8px), 18% 100%, 16% calc(100% - 6px), 14% 100%, 12% calc(100% - 8px), 10% 100%, 8% calc(100% - 6px), 6% 100%, 4% calc(100% - 8px), 2% 100%, 0 calc(100% - 6px))";
    }
    if (pillarId === 2) {
      return "polygon(0 8px, 2% 0, 4% 6px, 6% 0, 8% 8px, 10% 0, 12% 6px, 14% 0, 16% 8px, 18% 0, 20% 6px, 22% 0, 24% 8px, 26% 0, 28% 6px, 30% 0, 32% 8px, 34% 0, 36% 6px, 38% 0, 40% 8px, 42% 0, 44% 6px, 46% 0, 48% 8px, 50% 0, 52% 6px, 54% 0, 56% 8px, 58% 0, 60% 6px, 62% 0, 64% 8px, 66% 0, 68% 6px, 70% 0, 72% 8px, 74% 0, 76% 6px, 78% 0, 80% 8px, 82% 0, 84% 6px, 86% 0, 88% 8px, 90% 0, 92% 6px, 94% 0, 96% 8px, 98% 0, 100% 6px, 100% calc(100% - 8px), 98% 100%, 96% calc(100% - 6px), 94% 100%, 92% calc(100% - 8px), 90% 100%, 88% calc(100% - 6px), 86% 100%, 84% calc(100% - 8px), 82% 100%, 80% calc(100% - 6px), 78% 100%, 76% calc(100% - 8px), 74% 100%, 72% calc(100% - 6px), 70% 100%, 68% calc(100% - 8px), 66% 100%, 64% calc(100% - 6px), 62% 100%, 60% calc(100% - 8px), 58% 100%, 56% calc(100% - 6px), 54% 100%, 52% calc(100% - 8px), 50% 100%, 48% calc(100% - 6px), 46% 100%, 44% calc(100% - 8px), 42% 100%, 40% calc(100% - 6px), 38% 100%, 36% calc(100% - 8px), 34% 100%, 32% calc(100% - 6px), 30% 100%, 28% calc(100% - 8px), 26% 100%, 24% calc(100% - 6px), 22% 100%, 20% calc(100% - 8px), 18% 100%, 16% calc(100% - 6px), 14% 100%, 12% calc(100% - 8px), 10% 100%, 8% calc(100% - 6px), 6% 100%, 4% calc(100% - 8px), 2% 100%, 0 calc(100% - 6px))";
    }
    if (pillarId === 3) {
      return "polygon(0 8px, 2% 0, 4% 6px, 6% 0, 8% 8px, 10% 0, 12% 6px, 14% 0, 16% 8px, 18% 0, 20% 6px, 22% 0, 24% 8px, 26% 0, 28% 6px, 30% 0, 32% 8px, 34% 0, 36% 6px, 38% 0, 40% 8px, 42% 0, 44% 6px, 46% 0, 48% 8px, 50% 0, 52% 6px, 54% 0, 56% 8px, 58% 0, 60% 6px, 62% 0, 64% 8px, 66% 0, 68% 6px, 70% 0, 72% 8px, 74% 0, 76% 6px, 78% 0, 80% 8px, 82% 0, 84% 6px, 86% 0, 88% 8px, 90% 0, 92% 6px, 94% 0, 96% 8px, 98% 0, 100% 6px, 100% 100%, 0 100%)";
    }
  };

  // CRITICAL FIX: Use tween instead of spring for container to prevent oscillation during content render
  const containerTransition = {
    type: "tween" as const,
    duration: 0.5,
    ease: [0.4, 0.0, 0.2, 1] // Material Design easing
  };

  // Content fades faster and completes BEFORE container finishes
  const contentTransition = {
    duration: 0.2,
    ease: "easeOut" as const
  };

  return (
    <section 
      className={`relative w-screen ${isMobile ? 'flex-col h-auto' : 'flex h-screen'}`} 
      style={{ margin: 0, padding: 0, maxWidth: "100vw" }}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10" />

      {pillars.map((pillar) => (
        <React.Fragment key={pillar.id}>
          <motion.div
            className={`relative px-6 md:px-8 py-8 md:py-12 cursor-pointer overflow-hidden ${isMobile ? 'w-full' : 'h-full'}`}
            style={{
              backgroundColor: pillar.background,
              clipPath: getClipPath(pillar.id),
              marginTop: isMobile && pillar.id > 1 ? '-8px' : 0,
              flex: isMobile ? undefined : getPillarFlex(pillar.id),
              // CRITICAL FIX: GPU acceleration
              willChange: expandedPillar === pillar.id || expandedPillar === null && hoveredPillar === pillar.id ? 'flex, height' : 'auto',
            }}
            animate={isMobile ? {
              height: getPillarHeight(pillar.id),
            } : {
              flex: getPillarFlex(pillar.id),
            }}
            transition={containerTransition}
            onMouseEnter={() => !isMobile && expandedPillar === null && setHoveredPillar(pillar.id)}
            onMouseLeave={() => !isMobile && setHoveredPillar(null)}
            onClick={() => handlePillarClick(pillar.id)}
          >
            {/* CRITICAL FIX: Absolute positioning prevents layout reflow */}
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Collapsed Content */}
              <AnimatePresence mode="wait">
                {expandedPillar !== pillar.id && (
                  <motion.div
                    // CRITICAL FIX: Static key - no remounting
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={contentTransition}
                    className="absolute inset-0 flex items-center justify-center px-4"
                  >
                    {/* CRITICAL FIX: Show title consistently, adjust size only */}
                    <div className="text-center">
                      {expandedPillar === null ? (
                        <GlitchText
                          text={pillar.title}
                          intensity={hoveredPillar === pillar.id ? "high" : "normal"}
                          glitchColor={pillar.id === 3 ? "#001A3D" : "#00f2ff"}
                          className={`${pillar.id === 3 ? "text-[#001A3D]" : "text-white"} text-2xl md:text-4xl lg:text-6xl`}
                        />
                      ) : (
                        // CRITICAL FIX: Vertical text WITHOUT rotation or writing-mode change
                        <div className="flex flex-col items-center gap-1">
                          {pillar.title.split('').map((char, i) => (
                            <span
                              key={i}
                              className={`${pillar.id === 3 ? "text-[#001A3D]" : "text-white"} 
                              text-sm md:text-base font-glitch font-black leading-none`}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Description on hover */}
                      {!isMobile && expandedPillar === null && hoveredPillar === pillar.id && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`${pillar.id === 3 ? "text-[#001A3D]/80" : "text-white/80"} 
                          text-sm md:text-base max-w-md mx-auto leading-relaxed mt-6`}
                        >
                          {pillar.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded Content */}
              <AnimatePresence mode="wait">
                {expandedPillar === pillar.id && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={contentTransition}
                    className="absolute inset-0 flex flex-col justify-center max-w-5xl mx-auto py-8 md:py-12 px-4 overflow-y-auto"
                  >
                    {/* Close Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedPillar(null);
                        onExpandedChange?.(null);
                      }}
                      className={`absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-lg ${
                        pillar.id === 3 
                          ? "bg-[#001A3D]/10 hover:bg-[#001A3D]/20 border-[#001A3D]/20" 
                          : "bg-white/10 hover:bg-white/20 border-white/20"
                      } backdrop-blur-sm border flex items-center justify-center transition-all group z-30`}
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={pillar.id === 3 ? "#001A3D" : "white"}
                        strokeWidth="2.5"
                        strokeLinecap="square"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Title */}
                    <div className="mb-6 md:mb-8">
                      <h2
                        className={`font-glitch font-black text-3xl md:text-5xl lg:text-7xl ${
                          pillar.id === 3 ? "text-[#001A3D]" : "text-white"
                        } mb-3 md:mb-4`}
                      >
                        {pillar.title}
                      </h2>
                      <h3 className={`text-base md:text-xl lg:text-2xl ${
                        pillar.id === 3 ? "text-[#001A3D]/80" : "text-white/80"
                      } font-medium`}>
                        {pillar.expandedContent.subtitle}
                      </h3>
                    </div>

                    {/* Features Grid */}
                    <div className="mb-6 md:mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {pillar.expandedContent.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 md:gap-3">
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                              pillar.id === 3 ? "bg-[#001A3D]" : "bg-primary"
                            } flex-shrink-0`} />
                            <p className={`${
                              pillar.id === 3 ? "text-[#001A3D]/90" : "text-white/90"
                            } text-sm md:text-base leading-snug`}>{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                      {pillar.expandedContent.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className={`text-center p-3 md:p-5 rounded-lg md:rounded-xl backdrop-blur-sm border ${
                            pillar.id === 3 
                              ? "bg-[#001A3D]/5 border-[#001A3D]/10" 
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div className={`text-xl md:text-2xl lg:text-3xl font-black mb-1 md:mb-2 ${
                            pillar.id === 3 ? "text-[#001A3D]" : "text-primary"
                          }`}>
                            {stat.value}
                          </div>
                          <div className={`text-[10px] md:text-xs font-medium leading-tight ${
                            pillar.id === 3 ? "text-[#001A3D]/70" : "text-white/70"
                          }`}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button - Only in Factory (pillar 2) */}
                    {pillar.id === 2 && (
                      <div className="text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (typeof window !== 'undefined') {
                              const event = new CustomEvent('startAutomationTransition');
                              window.dispatchEvent(event);
                            }
                          }}
                          className="inline-block px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary to-secondary text-black font-black text-sm md:text-base rounded-full shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        >
                          <span className="font-glitch">Do I Need Automation?</span>
                        </button>
                        <p className="mt-2 md:mt-3 text-white/50 text-xs font-mono">
                          ↑ Take the 2-minute diagnostic
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </React.Fragment>
      ))}
    </section>
  );
}

export { pillars };