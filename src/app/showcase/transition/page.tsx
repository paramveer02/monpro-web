"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function TransitionPage() {
  const router = useRouter();
  const [lightsOn, setLightsOn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasCheckedAuth = useRef(false);
  const hasNavigated = useRef(false);

  // Route guard
  useEffect(() => {
    // Prevent double-execution in dev strict mode
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const marker = sessionStorage.getItem("monpro_submission_success");
    if (!marker) {
      console.warn("[Security] No submission marker - redirecting to home");
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  // Auto-navigate after lights fully on
  useEffect(() => {
    if (lightsOn && !hasNavigated.current) {
      hasNavigated.current = true;
      
      // Short, cinematic delay before showing the showcase
      const delay = shouldReduceMotion ? 400 : 900;
      const timer = setTimeout(() => {
        router.push("/");
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [lightsOn, router, shouldReduceMotion]);

  if (!isAuthorized) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Dark base - store interior */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A]" />
      
      {/* Store structure - always visible */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1f1f1f] to-transparent opacity-40" />
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#1a1a1a] via-[#151515] to-transparent opacity-30" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#1a1a1a] via-[#151515] to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] via-[#121212] to-transparent" />
      </div>

      {/* Lighting layers - smoother, overlapping transitions */}
      <AnimatePresence>
        {lightsOn && (
          <>
            {/* Layer 1: Warm ceiling wash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-amber-600/10 via-orange-500/5 to-transparent"
            />
            
            {/* Layer 2: Spotlight array (overlapping with layer 1) */}
            {[0.25, 0.5, 0.75].map((position, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ 
                  delay: 0.6 + (i * 0.15), 
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute w-80 h-80 rounded-full blur-3xl"
                style={{
                  top: '10%',
                  left: `${position * 100}%`,
                  background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
                  transform: 'translateX(-50%)'
                }}
              />
            ))}
            
            {/* Layer 3: Ambient fill (overlapping) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2, duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7]/80 via-[#F5F3EF]/60 to-[#FAF9F7]/95"
            />
            
            {/* Layer 4: Final bright state (smooth blend) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 bg-[#FAF9F7]"
            />
          </>
        )}
      </AnimatePresence>

      {/* UI Layer: Submitted + Switch */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-8 max-w-2xl px-6">
          
          {/* Submitted Confirmation - only visible before lights are on */}
          <AnimatePresence mode="wait">
            {!lightsOn && (
              <motion.div
                key="submitted-block"
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.5, ease: "easeOut" } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-6"
                >
                  <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                {/* Submitted text */}
                <motion.h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  Submitted.
                </motion.h2>
                <motion.p className="text-lg md:text-xl text-white/80">
                  I'll review your answers and reply with the first opportunities.
                </motion.p>
                <motion.p className="text-sm text-white/60">
                  No spam. No pitch.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Switch section */}
          <motion.div 
            className="flex flex-col items-center gap-6 mt-8"
            animate={{
              y: lightsOn ? -40 : 0,
              opacity: lightsOn ? 0 : 1
            }}
            transition={{ delay: lightsOn ? 0.3 : 0, duration: 0.6, ease: "easeOut" }}
          >
            <motion.p 
              className="text-xl md:text-2xl font-black"
              style={{ color: lightsOn ? "#5C5C5C" : "rgba(255,255,255,0.9)" }}
            >
              Switch on to light up your brand.
            </motion.p>
            
            {/* Professional Toggle Switch */}
            <div className="relative">
              <motion.button
                onClick={() => !lightsOn && setLightsOn(true)}
                disabled={lightsOn}
                className="relative w-32 h-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden disabled:cursor-default"
                whileHover={{ scale: lightsOn ? 1 : 1.02 }}
                whileTap={{ scale: lightsOn ? 1 : 0.98 }}
              >
                <div className="absolute inset-2 bg-gray-950 rounded-xl shadow-inner" />
                
                {/* Toggle Knob */}
                <motion.div
                  animate={{ 
                    x: lightsOn ? 64 : 8,
                    background: lightsOn 
                      ? "linear-gradient(135deg, #00f2ff 0%, #00d4e6 100%)"
                      : "linear-gradient(135deg, #6b7280 0%, #4a5568 100%)"
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-2 w-12 h-12 rounded-xl shadow-lg border border-gray-600"
                >
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white/30 rounded-md blur-sm" />
                </motion.div>
                
                {/* Position Labels */}
                <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                  <span className="text-[10px] text-gray-600 font-mono">OFF</span>
                  <span className="text-[10px] text-primary/60 font-mono">ON</span>
                </div>
              </motion.button>
              
              {/* Switch Glow */}
              {lightsOn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl -z-10"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Affordance Indicator */}
      {lightsOn && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <div className="flex items-center gap-2 text-[#3D3D3D] text-sm font-medium">
            <span>Scroll to discover MonPro-AI</span>
          </div>
          
          {/* Animated mouse icon */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-6 h-10 border-2 border-[#3D3D3D] rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
