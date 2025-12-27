"use client";

import { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import GlassCard from "@/components/GlassCard";
import CyanButton from "@/components/CyanButton";
import { motion, AnimatePresence } from "framer-motion";

interface PageHeaderProps {
  children: ReactNode;
  showLogo?: boolean;
}

export default function PageHeader({
  children,
  showLogo = true,
}: PageHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showQuitDialog, setShowQuitDialog] = useState(false);

  // Check if we're in the diagnostic flow
  const isInDiagnostic =
    pathname?.startsWith("/diagnostic/") && !pathname?.includes("/thanks");

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isInDiagnostic) {
      e.preventDefault();
      setShowQuitDialog(true);
    }
  };

  const handleQuit = () => {
    setShowQuitDialog(false);
    router.push("/");
  };

  const handleStay = () => {
    setShowQuitDialog(false);
  };

  return (
    <>
      {/* Centered wordmark at top of page */}
      {showLogo && (
        <div className="pt-2 pb-1">
          <Logo variant="centered" onClick={handleLogoClick} />
        </div>
      )}

      {/* Quit confirmation dialog */}
      <AnimatePresence>
        {showQuitDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={handleStay}
            />

            {/* Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md"
              >
                <GlassCard className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <svg
                        className="w-6 h-6 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Exit Assessment?
                      </h3>
                      <p className="text-white/60 text-sm">
                        Your progress will be lost. Are you sure you want to
                        return home?
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <CyanButton
                        onClick={handleStay}
                        variant="ghost"
                        fullWidth
                        size="md"
                      >
                        Continue Assessment
                      </CyanButton>

                      <CyanButton
                        onClick={handleQuit}
                        variant="primary"
                        fullWidth
                        size="md"
                        className="bg-accent/10 border-accent/30 hover:bg-accent/20"
                      >
                        Exit
                      </CyanButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div>{children}</div>
    </>
  );
}
