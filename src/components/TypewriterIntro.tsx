"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterIntroProps {
  onComplete?: () => void;
}

export default function TypewriterIntro({ onComplete }: TypewriterIntroProps) {
  const fullText =
    "System note:\nI'm NOVA, MonPro's digital analysis assistant.\nI observe inputs and flag automation signals.\nAll evaluations are reviewed by a human consultant.";

  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Skip to end on click
  const handleSkip = () => {
    if (!isComplete) {
      setDisplayedText(fullText);
      setIsComplete(true);
      setShowCursor(false);
      onComplete?.();
    }
  };

  // Typewriter effect
  useEffect(() => {
    if (isComplete) return;

    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 40); // 40ms per character

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      setShowCursor(false);
      onComplete?.();
    }
  }, [displayedText, fullText, isComplete, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!showCursor) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [showCursor]);

  // Shared classes for both layers to ensure exact match
  const containerClasses = `
    font-mono text-[11px] md:text-xs text-white/40 leading-relaxed
    pt-6 mt-6 border-t border-white/10
    bg-white/[0.02] rounded-lg p-4
    box-border
  `;

  return (
    <div className="relative overflow-hidden rounded-lg box-border">
      {/* Height reservation layer - keeps space in document flow */}
      <div
        className={`${containerClasses} opacity-0 pointer-events-none`}
        aria-hidden="true"
      >
        <div className="whitespace-pre-line">{fullText}</div>
      </div>

      {/* Typewriter overlay - absolute positioned on top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={handleSkip}
        className={`
          absolute inset-0
          ${containerClasses}
          ${!isComplete ? "cursor-pointer" : ""}
          overflow-hidden
        `}
      >
        <div className="whitespace-pre-line h-full overflow-hidden">
          {displayedText}
          {!isComplete && (
            <span
              className={`inline-block w-1.5 h-3 ml-1 bg-white/40 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
