"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CyanButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  tooltipLines?: string[];
}

export default function CyanButton({
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  size = "md",
  variant = "primary",
  className = "",
  tooltipLines,
}: CyanButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-primary/10 border-primary text-primary hover:bg-primary/20 hover:shadow-primary/40",
    secondary:
      "bg-secondary/10 border-secondary text-secondary hover:bg-secondary/20 hover:shadow-secondary/40",
    ghost:
      "bg-transparent border-white/20 text-white hover:border-primary hover:text-primary",
  };

  const baseClasses = `
    btn-premium
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <div className="relative">
      <motion.button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`${baseClasses} ${className}`}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onMouseEnter={() => !disabled && tooltipLines && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => !disabled && tooltipLines && setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && tooltipLines && tooltipLines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 pointer-events-none"
          >
            <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-lg px-4 py-2.5">
              <div className="font-mono text-xs text-white/70 text-center space-y-0.5">
                {tooltipLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
