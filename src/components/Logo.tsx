"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "landing" | "header" | "centered";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Logo({
  variant = "header",
  className = "",
  onClick,
}: LogoProps) {
  if (variant === "landing") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-center relative ${className}`}
      >
        {/* Premium brand name with enhanced gradient */}
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary mb-2 tracking-tight relative">
          MonPro‑AI
        </h1>
        {/* Premium tagline with letter spacing */}
        <p className="text-xs md:text-sm text-white/70 font-bold tracking-[0.2em] uppercase">
          AI Automation & Web Systems for E‑Commerce Growth
        </p>
      </motion.div>
    );
  }

  if (variant === "centered") {
    return (
      <Link href="/" className="block" onClick={onClick}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className={`text-center cursor-pointer relative ${className}`}
        >
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary mb-1 tracking-tight">
            MonPro‑AI
          </h2>
          <p className="text-[10px] md:text-xs text-white/60 font-bold tracking-[0.15em] uppercase">
            AI Automation & Web Systems for E‑Commerce Growth
          </p>
        </motion.div>
      </Link>
    );
  }

  // Header variant (compact, top-left)
  return (
    <Link href="/" className="block">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className={`${className}`}
      >
        <h3 className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-white tracking-tight">
          MonPro‑AI
        </h3>
        <p className="text-[9px] md:text-[10px] text-white/60 font-bold tracking-[0.1em] uppercase">
          AI Automation & Web
        </p>
      </motion.div>
    </Link>
  );
}
