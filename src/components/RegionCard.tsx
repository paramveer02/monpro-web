"use client";

import { Region } from "@/types";
import { regionNames, regionFlags } from "@/lib/theme";
import { motion } from "framer-motion";

interface RegionCardProps {
  region: Region;
  selected: boolean;
  onSelect: (region: Region) => void;
}

export default function RegionCard({
  region,
  selected,
  onSelect,
}: RegionCardProps) {
  return (
    <motion.button
      onClick={() => onSelect(region)}
      className={`
        relative overflow-hidden rounded-2xl p-8
        border-2 transition-all duration-300
        ${
          selected
            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
            : "border-white/10 bg-glass hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/5"
        }
        w-full min-h-[140px]
        touch-manipulation
        active:scale-95
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Animated scan pulse border on selection */}
      {selected && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/40"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.98, 1, 0.98],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Flag emoji */}
        <motion.div
          className="text-5xl"
          animate={selected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {regionFlags[region]}
        </motion.div>

        {/* Region name */}
        <div className="text-lg font-semibold">{regionNames[region]}</div>

        {/* Selection indicator */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
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

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 242, 255, 0.1), transparent 70%)",
        }}
      />
    </motion.button>
  );
}
