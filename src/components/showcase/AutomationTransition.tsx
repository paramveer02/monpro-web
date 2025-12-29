"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AutomationTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function AutomationTransition({ isActive, onComplete }: AutomationTransitionProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }

    // Fast counter animation (1-100 in 1.5 seconds)
    const duration = 1500; // 1.5 seconds
    const steps = 100;
    const stepDuration = duration / steps;

    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount++;
      setCount(currentCount);

      if (currentCount >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]"
        >
          {/* Screen shake container */}
          <motion.div
            animate={{
              x: [0, -2, 2, -2, 2, 0],
              y: [0, 2, -2, 2, -2, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(circle, rgba(0, 242, 255, 0.4) 0%, transparent 70%)",
              }}
            />

            {/* Counter Display */}
            <div className="relative flex flex-col items-center gap-8">
              {/* Digital LED Counter */}
              <motion.div
                className="relative"
                animate={{
                  x: [-1, 1, -1, 1, 0],
                  y: [1, -1, 1, -1, 0],
                }}
                transition={{
                  duration: 0.05,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div
                  className="font-mono font-black text-[120px] leading-none"
                  style={{
                    color: "#00f2ff",
                    textShadow: `
                      0 0 10px #00f2ff,
                      0 0 20px #00f2ff,
                      0 0 30px #00f2ff,
                      0 0 40px #00f2ff,
                      0 0 70px #00f2ff,
                      2px 2px 0 rgba(0, 242, 255, 0.3),
                      -2px -2px 0 rgba(255, 62, 62, 0.3)
                    `,
                    filter: `
                      drop-shadow(0 0 30px rgba(0, 242, 255, 0.8))
                      contrast(1.2)
                      brightness(1.3)
                    `,
                  }}
                >
                  {count.toString().padStart(3, "0")}
                </div>

                {/* Glitch lines */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scaleY: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="font-mono font-black text-[120px] leading-none"
                    style={{
                      color: "#ff3e3e",
                      transform: "translateX(3px)",
                    }}
                  >
                    {count.toString().padStart(3, "0")}
                  </div>
                </motion.div>
              </motion.div>

              {/* Status Text */}
              <motion.div
                className="font-mono text-primary uppercase tracking-[0.3em] text-sm"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                INITIALIZING AUTOMATION
              </motion.div>

              {/* Loading bar */}
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  animate={{
                    width: `${count}%`,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Tech indicators */}
              <div className="flex gap-6 font-mono text-xs text-white/40">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  [SYSTEMS_ONLINE]
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  [AI_READY]
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  [PROTOCOL_ACTIVE]
                </motion.span>
              </div>
            </div>

            {/* Corner decorations */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 border-2 border-primary/30"
                style={{
                  top: i < 2 ? 0 : "auto",
                  bottom: i >= 2 ? 0 : "auto",
                  left: i % 2 === 0 ? 0 : "auto",
                  right: i % 2 === 1 ? 0 : "auto",
                  borderTop: i >= 2 ? "none" : undefined,
                  borderBottom: i < 2 ? "none" : undefined,
                  borderLeft: i % 2 === 1 ? "none" : undefined,
                  borderRight: i % 2 === 0 ? "none" : undefined,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>

          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 242, 255, 0.03) 2px, rgba(0, 242, 255, 0.03) 4px)",
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

