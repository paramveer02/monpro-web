"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative bg-[#010409] border-t border-dashed border-white/10 py-8 md:py-10"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        {/* Desktop: 3-column layout | Mobile: Stacked */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          
          {/* LEFT: Branding + Technical Subtext */}
          <div className="flex flex-col items-center md:items-start gap-2 md:flex-1">
            <div className="font-glitch text-xl md:text-2xl font-black text-white">
              MonPro-AI
            </div>
            <p className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider">
              Intelligent Automation Systems
            </p>
          </div>

          {/* CENTER: Navigation Links with Mechanical Slide */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 md:flex-1">
            <NavLink href="#services" text="Services" />
            <NavLink href="/diagnostic" text="Diagnostic" />
            <NavLink href="https://wa.me/4917643835327" text="Contact" external />
          </div>

          {/* RIGHT: Status Indicators + Copyright */}
          <div className="flex flex-col items-center md:items-end gap-4 md:flex-1">
            {/* LED Status Indicators */}
            <div className="flex items-center gap-6 font-mono text-[10px] text-[#64748B] uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  style={{
                    filter: "blur(1px) drop-shadow(0 0 4px rgba(16, 185, 129, 0.8))",
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span>Systems Online</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  style={{
                    filter: "blur(1px) drop-shadow(0 0 4px rgba(16, 185, 129, 0.8))",
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <span>AI Ready</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="font-mono text-[10px] text-[#64748B] tracking-wider">
              © {new Date().getFullYear()} MonPro-AI. All rights reserved.
            </div>
          </div>
        </div>

        {/* Bottom Tech Seal */}
        <div className="mt-8 pt-6 border-t border-dashed border-white/5 text-center">
          <p className="font-mono text-[10px] text-[#64748B] uppercase tracking-[0.2em]">
            [ Technical Seal of Approval ]
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

// NavLink Component with Mechanical Slide Effect
interface NavLinkProps {
  href: string;
  text: string;
  external?: boolean;
}

function NavLink({ href, text, external }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const linkProps = external
    ? {
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
      }
    : {};

  return (
    <a
      href={href}
      {...linkProps}
      className="relative text-white/70 text-sm font-medium transition-colors hover:text-white py-2 px-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      
      {/* Mechanical Slide Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-primary"
        initial={{ width: "0%" }}
        animate={{
          width: isHovered ? "100%" : "0%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </a>
  );
}
