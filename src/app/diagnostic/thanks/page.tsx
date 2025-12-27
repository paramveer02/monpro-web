"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import CyanButton from "@/components/CyanButton";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";

export default function ThanksPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Security guard: Check if user actually submitted
  useEffect(() => {
    const submissionTimestamp = sessionStorage.getItem(
      "monpro_submission_success"
    );

    if (!submissionTimestamp) {
      // No submission found, redirect to home
      console.warn("[Security] Unauthorized access to thanks page");
      router.push("/");
      return;
    }

    // Check if submission is recent (within 30 seconds)
    const timestamp = parseInt(submissionTimestamp, 10);
    const now = Date.now();
    const timeDiff = now - timestamp;

    if (timeDiff > 30000) {
      // 30 seconds
      // Submission too old, redirect to home
      console.warn("[Security] Expired submission token");
      sessionStorage.removeItem("monpro_submission_success");
      router.push("/");
      return;
    }

    // Valid submission, show page
    setIsAuthorized(true);
    setIsChecking(false);

    // Clear flag after 10 seconds to prevent refresh access
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("monpro_submission_success");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [router]);

  // Show nothing while checking authorization
  if (isChecking || !isAuthorized) {
    return null;
  }

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
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-20 max-w-4xl">
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-6 sm:p-8 md:p-12 text-center">
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="mx-auto w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-12 h-12 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary"
              >
                Assessment Received
              </motion.h1>

              {/* Confirmation message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <p className="text-lg text-white/80 leading-relaxed">
                  Thank you. Your diagnostic has been submitted.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Our team is now reviewing your inputs.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  You will receive your evaluated automation proposal{" "}
                  <span className="text-primary font-semibold">
                    within 7 days
                  </span>
                  .
                </p>
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 text-left">
                  <p className="text-sm text-white/70 mb-2 font-semibold">
                    What to expect in your proposal:
                  </p>
                  <ul className="text-xs md:text-sm text-white/60 space-y-2">
                    <li className="flex flex-col">
                      <span>
                        • 3–7 automation opportunities selected from your inputs
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span>
                        • Estimated monthly impact in your region's currency
                        (₹/€/£)
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span>
                        • Implementation ranges adjusted to your stated budget
                      </span>
                      <span className="text-[10px] text-white/40 italic ml-4 mt-0.5">
                        Range reflects scope, tooling tier, and delivery speed
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span>
                        • Phased rollout strategy (quick wins → long-term
                        leverage)
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span>
                        • Next steps: review, refine, or begin implementation
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Additional info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 text-sm text-white/50 mb-8"
              >
                <p className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Analysis in progress
                </p>
                <p className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
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
                  Human-reviewed evaluation
                </p>
              </motion.div>

              {/* Return home button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <CyanButton
                  onClick={() => router.push("/")}
                  variant="ghost"
                  size="lg"
                >
                  Return to Home
                </CyanButton>
              </motion.div>

              {/* Decorative pulse effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none"
              />
            </GlassCard>
          </div>
        </div>
      </div>
    </PageHeader>
  );
}
