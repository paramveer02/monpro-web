"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "../GlassCard";
import CyanButton from "../CyanButton";
import Logo from "../Logo";
import PageHeader from "../PageHeader";

interface DiagnosticShellProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  showProgress?: boolean;
}

export default function DiagnosticShell({
  children,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = "Continue",
  showProgress = true,
}: DiagnosticShellProps) {
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
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-4xl">
          {/* Progress indicator */}
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="flex items-center justify-between text-sm font-mono text-white/50 mb-2">
                <span>
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span>
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                </span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / totalSteps) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <GlassCard className="p-5 sm:p-6 md:p-8">{children}</GlassCard>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 flex gap-4"
          >
            {onBack && (
              <CyanButton
                onClick={onBack}
                variant="ghost"
                size="lg"
                className="flex-shrink-0"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </CyanButton>
            )}

            {onNext && (
              <CyanButton
                onClick={onNext}
                disabled={nextDisabled}
                variant="primary"
                size="lg"
                fullWidth
              >
                <span>{nextLabel}</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </CyanButton>
            )}
          </motion.div>
        </div>
      </div>
    </PageHeader>
  );
}
