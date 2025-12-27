"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import CyanButton from "@/components/CyanButton";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import automationCatalog from "@/../../docs/automation-catalog.json";

export default function ExplorePage() {
  const router = useRouter();

  return (
    <PageHeader>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-20 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-primary">Automation Index</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
              A structured catalog of automation possibilities. No fluff. Just
              capabilities.
            </p>
          </motion.div>

          {/* What is this section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <GlassCard className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">
                What This Diagnostic Does
              </h2>
              <div className="space-y-3 text-white/70">
                <p>• Observes your operational signals and friction points</p>
                <p>• Maps them against proven automation patterns</p>
                <p>• Generates an internal evaluation for human review</p>
                <p>• Delivers a prioritized roadmap within 7 days</p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-white/50 font-mono">
                  Note: All evaluations are reviewed by a human consultant. AI
                  assists internally only.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Automation categories */}
          <div className="max-w-5xl mx-auto space-y-6 mb-12">
            {automationCatalog.categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassCard className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold font-mono">
                        {category.id}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-4">
                        {category.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.automations.map((automation) => (
                          <div
                            key={automation.id}
                            className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
                          >
                            <p className="text-white/80 text-sm font-medium mb-1">
                              {automation.name}
                            </p>
                            <p className="text-white/50 text-xs">
                              {automation.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Identify Your Friction Points?
              </h3>
              <p className="text-white/60 mb-6">
                The diagnostic takes 3–5 minutes and provides a custom
                evaluation within 7 days.
              </p>
              <CyanButton
                onClick={() => router.push("/diagnostic/start")}
                size="lg"
                variant="primary"
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
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageHeader>
  );
}
