"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DigitalFactoryHero() {
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0B2E 0%, #2D1B69 50%, #1E293B 100%)' }}>
      {/* Large animated circular diagram background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main large circle with gradient */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
          style={{ width: '85vh', height: '85vh', maxWidth: '90vw', maxHeight: '90vw' }}
        >
          {/* Outer glow ring */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.08), transparent 70%)',
              filter: 'blur(30px)'
            }}
          />
          
          {/* Main circle with gradient border */}
          <div 
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: 'rgba(99, 102, 241, 0.3)',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05), transparent 60%)'
            }}
          />
          
          {/* Inner concentric circles */}
          {[70, 50, 30].map((percent, i) => (
            <motion.div
              key={i}
              animate={{ rotate: -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border"
              style={{
                width: `${percent}%`,
                height: `${percent}%`,
                top: `${(100 - percent) / 2}%`,
                left: `${(100 - percent) / 2}%`,
                borderColor: `rgba(139, 92, 246, ${0.2 - i * 0.05})`,
                borderStyle: 'dashed',
                borderWidth: '1px'
              }}
            />
          ))}
          
          {/* Animated orbital dots */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const radius = 42; // percentage
            return (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut"
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: '#6366F1',
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)',
                  left: `calc(50% + ${Math.cos(angle) * radius}% - 4px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}% - 4px)`
                }}
              />
            );
          })}
          
          {/* Center core with pulse effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{
              width: '15%',
              height: '15%',
              top: '42.5%',
              left: '42.5%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(99, 102, 241, 0.2))',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)'
            }}
          />
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          {/* Status badge - fixed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{ 
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-xs text-cyan-300 tracking-wider uppercase">System Online</span>
          </motion.div>

          {/* Main heading - with subtle glitch effect */}
          <div className="relative">
            {/* Glitch layers */}
            <motion.h1
              animate={{
                opacity: [0, 0.7, 0],
                x: [-2, 2, -2],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{ color: '#06B6D4', mixBlendMode: 'screen' }}
            >
              <span className="whitespace-nowrap">MONPRO</span>
              <span className="whitespace-nowrap">-AI</span>
            </motion.h1>
            
            <motion.h1
              animate={{
                opacity: [0, 0.7, 0],
                x: [2, -2, 2],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 4,
                delay: 0.05,
                ease: "easeInOut"
              }}
              className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{ color: '#EC4899', mixBlendMode: 'screen' }}
            >
              <span className="whitespace-nowrap">MONPRO</span>
              <span className="whitespace-nowrap">-AI</span>
            </motion.h1>

            {/* Main text with smooth pulse */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                textShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 30px rgba(6, 182, 212, 0.5)',
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                ]
              }}
              transition={{ 
                opacity: { delay: 0.4 },
                y: { delay: 0.4 },
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
            >
              <span className="text-white whitespace-nowrap">MONPRO</span>
              <span className="text-cyan-400 whitespace-nowrap">-AI</span>
            </motion.h1>
          </div>

          {/* Subheading - centered */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-white/90 max-w-3xl mx-auto"
          >
            Building Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Digital Factory</span>
          </motion.h2>

          {/* Description - centered */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Automate operations. Scale effortlessly. Transform manual chaos into precision workflows.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <div className="text-[10px] font-mono text-white/80 tracking-widest">SCROLL</div>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
      </motion.div>
    </div>
  );
}
