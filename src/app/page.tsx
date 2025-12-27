"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Region } from "@/types";
import RegionCard from "@/components/RegionCard";
import CyanButton from "@/components/CyanButton";
import GlassCard from "@/components/GlassCard";
import Logo from "@/components/Logo";

export default function Home() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const handleContinue = () => {
    if (selectedRegion) {
      router.push(`/diagnostic/start?region=${selectedRegion}`);
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <Logo variant="landing" />
        </motion.div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard className="p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-primary/5">
            {/* Subtle top gradient sheen */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            {/* Inner highlight glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.03] pointer-events-none" />

            {/* PRIMARY HEADLINE (Quiet authority -> reflection) */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.06] tracking-tight mb-5 px-2">
                Revenue leaks <span className="text-primary/90">hide</span> in
                plain sight.
                <br />
                <span className="text-secondary/90">Manual</span> ops{" "}
                <span className="text-primary/90">compound</span> the damage.
              </h2>

              <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-2">
                A short diagnostic designed to reveal operational{" "}
                <span className="text-primary/90">friction</span> most teams
                don’t track — until it costs them.
              </p>

              {/* Keep this, but demote it (not part of the hook) */}
              <p className="mt-4 text-white/35 text-xs md:text-sm max-w-2xl mx-auto font-mono leading-relaxed">
                When meaningful opportunities surface, we follow up with a
                human-reviewed roadmap.
              </p>
            </div>

            {/* What This Reveals */}
            <div className="bg-gradient-to-br from-white/[0.035] to-white/[0.012] border border-white/20 rounded-2xl p-5 sm:p-7 mb-8 max-w-2xl mx-auto shadow-lg shadow-primary/5">
              <h3 className="text-sm font-black text-primary mb-4 uppercase tracking-[0.2em]">
                What This Reveals
              </h3>

              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-white/85 font-medium">
                    Automation signals mapped to real tools and realistic cost
                    ranges
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-white/85 font-medium">
                    Prioritized by impact vs operational effort
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-white/85 font-medium">
                    Delivered privately via email (and optionally WhatsApp) as a
                    concise PDF
                  </p>
                </div>
              </div>
            </div>

            {/* Region selector section (Action) */}
            <div className="space-y-6 mb-8 mt-10">
              <div className="text-center">
                <h3 className="text-xl font-black text-white mb-2 tracking-tight">
                  Select your region
                </h3>
                <p className="text-white/50 text-sm font-medium">
                  Used only to contextualize pricing, tooling, and regulatory
                  considerations.
                </p>

                {/* Diagnostic framing (reduces "form vibe") */}
                <p className="mt-3 text-white/35 text-xs md:text-sm font-medium">
                  Takes ~3 minutes. No calls. No obligation.
                </p>
              </div>

              {/* Region cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <RegionCard
                  region="india"
                  selected={selectedRegion === "india"}
                  onSelect={setSelectedRegion}
                />
                <RegionCard
                  region="europe"
                  selected={selectedRegion === "europe"}
                  onSelect={setSelectedRegion}
                />
                <RegionCard
                  region="uk"
                  selected={selectedRegion === "uk"}
                  onSelect={setSelectedRegion}
                />
              </div>
            </div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedRegion ? 1 : 0.5 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-center text-white/40 text-xs md:text-sm mb-3 font-medium">
                Most teams uncover 2–4 high-impact automation opportunities.
              </p>

              <CyanButton
                onClick={handleContinue}
                disabled={!selectedRegion}
                fullWidth
                size="lg"
                variant="primary"
                className="shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20"
                tooltipLines={[
                  "No payment required.",
                  "No card. No signup.",
                  "Human-reviewed.",
                ]}
              >
                <span>Run Diagnostic</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </CyanButton>

              {/* Optional: place "within 7 days" *after* CTA (quiet + factual) */}
              <p className="mt-3 text-center text-white/30 text-[11px] md:text-xs font-mono">
                If opportunities are strong, your roadmap is typically delivered
                within 7 days.
              </p>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Outcome Indicators Footer Rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-10"
        >
          <div className="bg-white/[0.04] backdrop-blur-sm border-t border-white/20 rounded-lg px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-secondary/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-[11px] md:text-xs text-white/60 font-medium">
                  Recover Lost Revenue
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-primary/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-[11px] md:text-xs text-white/60 font-medium">
                  Reduce Manual Hours
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-primary/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-[11px] md:text-xs text-white/60 font-medium">
                  Improve Operational Clarity
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-[11px] md:text-xs text-white/60 font-medium">
                  Human-Reviewed Decisions
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
