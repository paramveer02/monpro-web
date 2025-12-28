"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPath } from "@/types/diagnostic";
import { pathInfo } from "@/lib/diagnostic/questionBank";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import DiagnosticShell from "@/components/diagnostic/DiagnosticShell";
import PathCard from "@/components/diagnostic/PathCard";
import { motion } from "framer-motion";

function DiagnosticStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, setRegion, setPath, isLoaded } = useDiagnostic();
  const [selectedPath, setSelectedPath] = useState<UserPath | null>(null);

  // Security guard: Check if region is selected
  useEffect(() => {
    const region = searchParams.get("region");

    if (!region && isLoaded) {
      // No region selected, redirect to landing
      console.warn("[Security] No region selected, redirecting to landing");
      router.push("/");
      return;
    }

    if (region && isLoaded) {
      setRegion(region);
    }
  }, [searchParams, setRegion, isLoaded, router]);

  const handleContinue = () => {
    if (selectedPath) {
      setPath(selectedPath);
      router.push(`/diagnostic/${selectedPath}`);
    }
  };

  if (!isLoaded) {
    return null; // Or loading spinner
  }

  const paths: UserPath[] = ["scaler", "founder", "operator", "explorer"];

  return (
    <DiagnosticShell
      currentStep={0}
      totalSteps={1}
      onNext={handleContinue}
      nextDisabled={!selectedPath}
      nextLabel="Next"
      showProgress={false}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Select Your Path
          </h1>
          <p className="text-white/60 text-sm md:text-base mb-2">
            Choose the option that best fits where you are right now.
          </p>
          <p className="text-white/40 text-xs md:text-sm">
            Takes about 4–6 minutes · Your personalized report within 7 days
          </p>
        </div>

        {/* Path selection grid */}
        <div className="space-y-4">
          {paths.map((path, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PathCard
                path={pathInfo[path]}
                selected={selectedPath === path}
                onSelect={() => setSelectedPath(path)}
              />
            </motion.div>
          ))}
        </div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-white/40 pt-4"
        >
          This helps us ask questions that match your situation.
        </motion.p>
      </div>
    </DiagnosticShell>
  );
}

export default function DiagnosticStartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <DiagnosticStartContent />
    </Suspense>
  );
}
