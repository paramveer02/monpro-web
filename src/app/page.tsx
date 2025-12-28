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

            {/* PRIMARY HEADLINE (Direct pain recognition) */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.15] tracking-tight mb-5 px-2">
                Smarter setup.<span className="text-primary/90"> Bigger sales.</span>
              </h2>

              <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-2 mb-6">
                You're doing everything manually. <span className="text-secondary/90">Every. Single. Day.</span>
              </p>

              {/* Pain recognition bullets */}
              <div className="max-w-2xl mx-auto space-y-3 text-left mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-0.5">•</span>
                  <p className="text-white/75 text-sm md:text-base">Processing orders at midnight?</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-0.5">•</span>
                  <p className="text-white/75 text-sm md:text-base">Copy-pasting tracking numbers into spreadsheets?</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-0.5">•</span>
                  <p className="text-white/75 text-sm md:text-base">Answering "Where's my order?" 50 times a day?</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-0.5">•</span>
                  <p className="text-white/75 text-sm md:text-base">Juggling Instagram DMs, Etsy, Emails, and WhatsApp?</p>
                </div>
              </div>

              {/* Transformation promise */}
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-bold leading-relaxed px-2 mb-6">
                What if all that... <span className="text-secondary/90">just happened automatically</span>?
              </p>

              {/* Outcome Indicators - Compact */}
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-secondary/70"
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
                    <p className="text-[10px] md:text-xs text-white/50 font-medium text-center">
                      Find Lost Revenue
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-primary/70"
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
                    <p className="text-[10px] md:text-xs text-white/50 font-medium text-center">
                      Save Time on Tasks
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-accent/70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <p className="text-[10px] md:text-xs text-white/50 font-medium text-center">
                      Social Media Syncs 
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white/60"
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
                    <p className="text-[10px] md:text-xs text-white/50 font-medium text-center">
                      Expert-Analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Prop Box */}
            <div className="bg-gradient-to-br from-white/[0.035] to-white/[0.012] border border-white/20 rounded-2xl p-5 sm:p-7 mb-8 max-w-2xl mx-auto shadow-lg shadow-primary/5">
              <p className="text-white/90 text-base md:text-lg font-semibold mb-3 text-center">
                Take 3 minutes. Tell me about your store.
              </p>
              <p className="text-white/85 text-base md:text-lg font-medium mb-4 text-center">
                I'll show you which tasks you can <span className="text-secondary">automate first</span>.
              </p>

              {/* Reassurance */}
              <div className="space-y-2 text-sm md:text-base">
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary flex-shrink-0"
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
                  <p className="text-white/75 font-medium">No sales calls</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary flex-shrink-0"
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
                  <p className="text-white/75 font-medium">No payment</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary flex-shrink-0"
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
                  <p className="text-white/75 font-medium">No pushy pitch</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary flex-shrink-0"
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
                  <p className="text-white/75 font-medium">Just a clear plan</p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center mb-6">
              <p className="text-white/60 text-sm md:text-base font-medium">
                <span className="text-secondary font-bold">50+ store owners</span> already saved hours every week
              </p>
            </div>

            {/* Region selector section (Action) */}
            <div className="space-y-6 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-black text-white mb-2 tracking-tight">
                  Where's your store?
                </h3>
                <p className="text-white/50 text-sm font-medium">
                  Helps us provide accurate pricing and tool recommendations for your region.
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
                <span>Show Me What I Can Automate</span>
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

              <p className="mt-3 text-center">
              <span
                className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/5 px-4 py-1
                          text-[11px] md:text-xs text-primary/80 font-medium
                          shadow-[0_0_12px_rgba(56,189,248,0.35)]"
              >
                Available 7 days a week · Human-reviewed · No spam
              </span>
            </p>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
