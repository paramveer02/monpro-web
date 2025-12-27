"use client";

import { motion } from "framer-motion";

interface MCQOptionProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  multiSelect?: boolean; // Enable checkbox-style UI for multi-select
}

export default function MCQOption({
  label,
  value,
  selected,
  onSelect,
  multiSelect = false,
}: MCQOptionProps) {
  return (
    <motion.button
      onClick={() => onSelect(value)}
      className={`
        w-full min-h-[48px] md:min-h-[56px] px-6 py-4
        rounded-xl border-2 transition-all duration-300
        ${
          selected
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
            : "border-white/10 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/5"
        }
        text-left
        touch-manipulation
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-base md:text-lg ${
            selected ? "text-white font-medium" : "text-white/80"
          }`}
        >
          {label}
        </span>

        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={
              multiSelect
                ? "w-5 h-5 rounded-sm bg-primary flex items-center justify-center flex-shrink-0"
                : "w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
            }
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
      </div>
    </motion.button>
  );
}
