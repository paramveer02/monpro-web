'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDiagnostic } from '@/hooks/useDiagnostic';
import DiagnosticShell from '@/components/diagnostic/DiagnosticShell';
import DeliverySelector from '@/components/diagnostic/DeliverySelector';
import ContactInput from '@/components/diagnostic/ContactInput';
import { motion } from 'framer-motion';

export default function DeliveryPage() {
  const router = useRouter();
  const { 
    state, 
    setFirstName, 
    setLastName, 
    setBrandName,
    setEmail, 
    submit, 
    isLoaded 
  } = useDiagnostic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if no path/answers
  useEffect(() => {
    if (isLoaded && (!state.path || Object.keys(state.answers).length === 0)) {
      router.push('/diagnostic/start');
    }
  }, [state.path, state.answers, isLoaded, router]);

  const validateEmail = (): boolean => {
    if (!state.email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
  };

  const validateIdentity = (): boolean => {
    return !!(state.firstName && state.lastName && state.brandName);
  };

  const handleSubmit = async () => {
    if (!validateIdentity()) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!validateEmail()) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submit();
      // Navigation to thanks page happens in the submit function
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (state.path) {
      // Go back to the last question
      router.push(`/diagnostic/${state.path}`);
    }
  };

  if (!isLoaded) {
    return null;
  }

  const canSubmit = validateIdentity() && validateEmail();

  return (
    <DiagnosticShell
      currentStep={100} // Special step for delivery
      totalSteps={100}
      onBack={handleBack}
      onNext={handleSubmit}
      nextDisabled={!canSubmit || isSubmitting}
      nextLabel={isSubmitting ? 'Submitting...' : 'Submit Assessment'}
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
            One Last Step
          </h1>
          <p className="text-white/60 text-sm md:text-base mb-4">
            Tell us who you are to receive your automation roadmap.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
            <p className="text-sm text-white/70 mb-2"><span className="text-primary font-semibold">You'll receive:</span></p>
            <ul className="text-xs md:text-sm text-white/60 space-y-1.5 list-disc list-inside">
              <li>PDF roadmap with 3–7 automations</li>
              <li>Approximate implementation ranges</li>
              <li>Clear options to implement or discuss further</li>
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
            <p className="text-xs text-white/40">We'll use this to send you the roadmap PDF</p>
          </div>
        </motion.div>

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
          Your roadmap will be prepared and made available within 7 days.
        </motion.p>
      </div>
    </DiagnosticShell>
  );
}

