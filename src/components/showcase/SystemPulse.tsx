"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function SystemPulse() {
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {/* Desktop: Horizontal Layout */}
      <div className="hidden sm:flex items-center justify-between gap-8">
        {/* Shopify Node */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm shadow-lg">
              <span className="text-3xl">🛍️</span>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-mono font-semibold opacity-70">INPUT</p>
              <p className="text-sm font-medium mt-1">Shopify</p>
            </div>
          </div>
        </motion.div>

        {/* Connector 1 with Pulse */}
        <motion.div className="flex-1 relative h-0.5 bg-gradient-to-r from-primary/30 via-secondary/50 to-primary/30">
          <motion.div
            animate={{
              x: ["-100%", "200%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>

        {/* Logic Node (Center) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 242, 255, 0.3)",
                  "0 0 40px rgba(0, 242, 255, 0.6)",
                  "0 0 20px rgba(0, 242, 255, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-secondary/50 flex items-center justify-center backdrop-blur-sm"
            >
              <span className="text-4xl">⚡</span>
            </motion.div>
            <div className="mt-3 text-center">
              <p className="text-xs font-mono font-semibold opacity-70">LOGIC</p>
              <p className="text-sm font-medium mt-1">Sync Engine</p>
            </div>
          </div>
        </motion.div>

        {/* Connector 2 with Pulse */}
        <motion.div className="flex-1 relative h-0.5 bg-gradient-to-r from-primary/30 via-secondary/50 to-primary/30">
          <motion.div
            animate={{
              x: ["-100%", "200%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
            className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>

        {/* WhatsApp Node */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-xl border flex items-center justify-center backdrop-blur-sm shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.2), rgba(37, 211, 102, 0.1))',
                borderColor: 'rgba(37, 211, 102, 0.3)'
              }}
            >
              <MessageCircle className="text-white" size={32} />
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-mono font-semibold opacity-70">OUTPUT</p>
              <p className="text-sm font-medium mt-1" style={{ color: '#25D366' }}>WhatsApp</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="sm:hidden flex flex-col items-center gap-6">
        {/* Shopify Node */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm shadow-lg">
            <span className="text-2xl">🛍️</span>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] font-mono font-semibold opacity-70">INPUT</p>
            <p className="text-xs font-medium mt-0.5">Shopify</p>
          </div>
        </motion.div>

        {/* Connector with Pulse */}
        <motion.div className="relative w-0.5 h-12 bg-gradient-to-b from-primary/30 via-secondary/50 to-primary/30">
          <motion.div
            animate={{
              y: ["-100%", "200%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-0 top-0 h-8 w-full bg-gradient-to-b from-transparent via-secondary to-transparent"
          />
        </motion.div>

        {/* Logic Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 15px rgba(0, 242, 255, 0.3)",
                "0 0 30px rgba(0, 242, 255, 0.6)",
                "0 0 15px rgba(0, 242, 255, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-secondary/50 flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-3xl">⚡</span>
          </motion.div>
          <div className="mt-2 text-center">
            <p className="text-[10px] font-mono font-semibold opacity-70">LOGIC</p>
            <p className="text-xs font-medium mt-0.5">Sync Engine</p>
          </div>
        </motion.div>

        {/* Connector with Pulse */}
        <motion.div className="relative w-0.5 h-12 bg-gradient-to-b from-primary/30 via-secondary/50 to-primary/30">
          <motion.div
            animate={{
              y: ["-100%", "200%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
            className="absolute left-0 top-0 h-8 w-full bg-gradient-to-b from-transparent via-secondary to-transparent"
          />
        </motion.div>

        {/* WhatsApp Node */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-xl border flex items-center justify-center backdrop-blur-sm shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.2), rgba(37, 211, 102, 0.1))',
              borderColor: 'rgba(37, 211, 102, 0.3)'
            }}
          >
            <MessageCircle className="text-white" size={24} />
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] font-mono font-semibold opacity-70">OUTPUT</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#25D366' }}>WhatsApp</p>
          </div>
        </motion.div>
      </div>

      {/* Supporting Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-center space-y-2"
      >
        <p className="text-xs sm:text-sm font-mono opacity-60">
          ARCHITECTURE • CALIBRATE • SYNC
        </p>
        <p className="text-sm sm:text-base font-medium max-w-md mx-auto">
          Every paid click routed through intelligent logic → synced order → instant customer update
        </p>
      </motion.div>
    </div>
  );
}
