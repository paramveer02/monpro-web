"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import DiagnosticShell from "@/components/diagnostic/DiagnosticShell";
import DeliverySelector from "@/components/diagnostic/DeliverySelector";
import ContactInput from "@/components/diagnostic/ContactInput";
import ThankYouScreen from "@/components/ThankYouScreen";
import { motion } from "framer-motion";

export default function DeliveryPage() {
  const router = useRouter();
  const {
    state,
    setFirstName,
    setLastName,
    setBrandName,
    setEmail,
    setDeliveryMethod,
    setPhone,
    submit,
    isLoaded,
  } = useDiagnostic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Redirect if no path/answers (but NOT if already submitted)
  useEffect(() => {
    if (isLoaded && !isSubmitted && (!state.path || Object.keys(state.answers).length === 0)) {
      router.push("/diagnostic/start");
    }
  }, [state.path, state.answers, isLoaded, isSubmitted, router]);

  const validateEmail = useCallback((): boolean => {
    if (!state.email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
  }, [state.email]);

  const validatePhone = useCallback((): boolean => {
    if (!state.phone) return false;
    const regex = /^\+\d{10,}$/;
    return regex.test(state.phone.replace(/\s/g, ""));
  }, [state.phone]);

  const validateIdentity = useCallback((): boolean => {
    return !!(state.firstName && state.lastName && state.brandName);
  }, [state.firstName, state.lastName, state.brandName]);

  const validateDelivery = useCallback((): boolean => {
    if (!state.deliveryMethod) return false;
    if (state.deliveryMethod === "email") return validateEmail();
    if (state.deliveryMethod === "whatsapp") return validatePhone();
    return false;
  }, [state.deliveryMethod, validateEmail, validatePhone]);

  const handleSubmit = useCallback(async () => {
    if (!validateIdentity()) {
      setError("Please fill in all required fields");
      return;
    }

    if (!state.deliveryMethod) {
      setError("Please select a delivery method");
      return;
    }

    if (!validateDelivery()) {
      if (state.deliveryMethod === "email") {
        setError("Please enter a valid email address");
      } else {
        setError("Please enter a valid WhatsApp number with country code");
      }
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await submit();
      // Show thank you screen inline instead of navigating
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.";
      setError(errorMessage);
      setIsSubmitting(false);
    }
  }, [validateIdentity, state.deliveryMethod, validateDelivery, submit]);

  const handleBack = useCallback(() => {
    if (state.path) {
      // Go back to the last question
      router.push(`/diagnostic/${state.path}`);
    }
  }, [state.path, router]);

  if (!isLoaded) {
    return null;
  }

  // Render Thank You Screen inline after submission
  if (isSubmitted) {
    return <ThankYouScreen />;
  }

  const canSubmit = validateIdentity() && validateDelivery();

  return (
    <DiagnosticShell
      currentStep={100} // Special step for delivery
      totalSteps={100}
      onBack={handleBack}
      onNext={handleSubmit}
      nextDisabled={!canSubmit || isSubmitting}
      nextLabel={isSubmitting ? "Submitting..." : "Submit Assessment"}
      showProgress={false}
    >
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Almost Done!
          </h1>
          <p className="text-white/60 text-sm md:text-base mb-4">
            Just need a few details to send you your personalized recommendations.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
            <p className="text-sm text-white/70 mb-2">
              <span className="text-primary font-semibold">
                Here's what you'll receive:
              </span>
            </p>
            <ul className="text-xs md:text-sm text-white/60 space-y-2">
              <li className="flex flex-col">
                <span>
                  • 3–7 practical solutions tailored to your specific needs
                </span>
              </li>
              <li className="flex flex-col">
                <span>
                  • Cost estimates matched to your budget and location
                </span>
                <span className="text-[10px] md:text-xs text-white/40 italic ml-4 mt-0.5">
                  (Your budget helps us recommend the right level of tools and support)
                </span>
              </li>
              <li className="flex flex-col">
                <span>
                  • Simple next steps: how to get started or learn more
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Identity Fields */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/70">
                First Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={state.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                autoComplete="given-name"
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/[0.05] border-2 border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors duration-200 text-base"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/70">
                Last Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={state.lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                autoComplete="family-name"
                className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/[0.05] border-2 border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors duration-200 text-base"
              />
            </div>
          </div>

          {/* Brand Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">
              Brand Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={state.brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Your Brand Name or 'Soon-to-be Brand'"
              autoComplete="organization"
              className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/[0.05] border-2 border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors duration-200 text-base"
            />
          </div>

          {/* Email (Required) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              value={state.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              inputMode="email"
              className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/[0.05] border-2 border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors duration-200 font-mono text-sm"
            />
            <p className="text-xs text-white/40">
              Primary contact for all communications
            </p>
          </div>
        </motion.div>

        {/* Delivery Method Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DeliverySelector
            selected={state.deliveryMethod || null}
            onSelect={setDeliveryMethod}
          />
        </motion.div>

        {/* WhatsApp Number (if WhatsApp selected) */}
        {state.deliveryMethod === "whatsapp" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ContactInput
              deliveryMethod="whatsapp"
              value={state.phone || ""}
              onChange={setPhone}
            />
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-lg bg-accent/10 border border-accent/30"
          >
            <p className="text-sm text-accent text-center">{error}</p>
          </motion.div>
        )}

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-white/40 text-center pt-4"
        >
          Your personalized report will be ready within 14-17 days.
        </motion.p>
      </div>
    </DiagnosticShell>
  );
}
