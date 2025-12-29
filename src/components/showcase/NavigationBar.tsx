"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

interface NavigationBarProps {
  isAuditExpanded?: boolean;
}

export default function NavigationBar({ isAuditExpanded = false }: NavigationBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // When The Audit (white background) is expanded, use dark colors
  const brandColor = isAuditExpanded ? "text-[#001A3D]" : "text-white";
  const linkColor = isAuditExpanded ? "text-[#001A3D]/70 hover:text-[#001A3D]" : "text-white/70 hover:text-white";
  const primaryColor = isAuditExpanded ? "text-[#001A3D]" : "text-primary";
  const primaryHoverColor = isAuditExpanded ? "hover:text-[#001A3D]/80" : "hover:text-white";
  const buttonBg = isAuditExpanded ? "bg-[#001A3D]/5 hover:bg-[#001A3D]/10" : "bg-white/5 hover:bg-white/10";
  const mobileMenuColor = isAuditExpanded ? "text-[#001A3D]" : "text-white";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Name */}
        <div className={`font-glitch text-2xl font-black tracking-tight transition-colors duration-300 ${brandColor}`}>
          MonPro-AI
        </div>

        {/* Central Navigation Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <a
            href="#services"
            className={`text-sm font-medium transition-colors duration-300 ${linkColor}`}
          >
            Services
          </a>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') {
                const event = new CustomEvent('startAutomationTransition');
                window.dispatchEvent(event);
              }
            }}
            className={`font-glitch text-lg font-black transition-colors duration-300 hover:animate-glitch ${primaryColor} ${primaryHoverColor}`}
          >
            Automate
          </button>
          <a
            href="https://wa.me/4917643835327"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full backdrop-blur-sm ${linkColor} ${buttonBg}`}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className={`md:hidden transition-colors duration-300 z-50 ${mobileMenuColor}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuditExpanded={isAuditExpanded}
      />
    </motion.nav>
  );
}

