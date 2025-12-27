"use client";

import { PathInfo } from "@/types/diagnostic";
import { motion } from "framer-motion";

interface PathCardProps {
  path: PathInfo;
  selected: boolean;
  onSelect: () => void;
}

export default function PathCard({ path, selected, onSelect }: PathCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={`
        w-full p-6 rounded-xl border-2 transition-all duration-300 text-left
        ${
          selected
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
            : "border-white/10 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/5"
        }
        touch-manipulation
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Selection indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 text-background"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}

      <div className="space-y-2">
        <h3
          className={`text-xl font-bold ${
            selected ? "text-primary" : "text-white"
          }`}
        >
          {path.title}
        </h3>
        <p className="text-sm text-primary/70 font-mono">{path.subtitle}</p>
        <p className="text-white/60 text-sm leading-relaxed">
          {path.description}
        </p>
      </div>
    </motion.button>
  );
}
