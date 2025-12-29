"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuditExpanded: boolean;
}

export default function MobileMenu({ isOpen, onClose, isAuditExpanded }: MobileMenuProps) {
  const textColor = isAuditExpanded ? "#001A3D" : "white";
  const bgColor = isAuditExpanded ? "rgba(255, 255, 255, 0.95)" : "rgba(10, 10, 10, 0.95)";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Slide-in drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="fixed left-0 top-0 bottom-0 w-[280px] z-50 md:hidden backdrop-blur-xl border-r"
            style={{
              backgroundColor: bgColor,
              borderColor: isAuditExpanded ? "rgba(0, 26, 61, 0.2)" : "rgba(255, 255, 255, 0.1)"
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-4 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ color: textColor }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu content */}
            <div className="flex flex-col h-full pt-20 px-6">
              {/* Brand */}
              <div className="font-glitch text-2xl font-black mb-12" style={{ color: textColor }}>
                MonPro-AI
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col gap-6">
                <a
                  href="#services"
                  onClick={onClose}
                  className="text-lg font-medium transition-opacity hover:opacity-70"
                  style={{ color: textColor }}
                >
                  Services
                </a>
                <button
                  onClick={() => {
                    onClose();
                    if (typeof window !== 'undefined') {
                      const event = new CustomEvent('startAutomationTransition');
                      window.dispatchEvent(event);
                    }
                  }}
                  className="text-left font-glitch text-xl font-black text-primary hover:text-primary/80 transition-colors"
                >
                  Automate
                </button>
                <a
                  href="https://wa.me/4917643835327"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="text-lg font-medium transition-opacity hover:opacity-70"
                  style={{ color: textColor }}
                >
                  Get in Touch
                </a>
              </nav>

              {/* Tech status indicators */}
              <div className="mt-auto mb-8 pt-8 border-t" style={{ borderColor: isAuditExpanded ? "rgba(0, 26, 61, 0.1)" : "rgba(255, 255, 255, 0.1)" }}>
                <div className="flex flex-col gap-2 font-mono text-xs" style={{ color: isAuditExpanded ? "rgba(0, 26, 61, 0.5)" : "rgba(255, 255, 255, 0.5)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span>SYSTEMS ONLINE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    <span>AI READY</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

