"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  UserPath,
  DeliveryMethod,
  DiagnosticState,
  DiagnosticAnswers,
} from "@/types/diagnostic";

const STORAGE_KEY = "monpro_diagnostic_state";

const initialState: DiagnosticState = {
  region: "",
  path: null,
  currentStep: 0,
  answers: {},
  // Identity fields
  firstName: "",
  lastName: "",
  brandName: "",
  email: "",
};

export function useDiagnostic() {
  const router = useRouter();
  const [state, setState] = useState<DiagnosticState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState(parsed);
      } catch (e) {
        console.error("Failed to parse stored diagnostic state:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  // Set region (from landing page)
  const setRegion = useCallback((region: string) => {
    setState((prev) => ({ ...prev, region }));
  }, []);

  // Set path
  const setPath = useCallback((path: UserPath) => {
    setState((prev) => ({ ...prev, path, currentStep: 0, answers: {} }));
  }, []);

  // Set answer for current question (single value or array for multi-select)
  const setAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [questionId]: value },
      }));
    },
    []
  );

  // Navigate to next step
  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, []);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  }, []);

  // Set delivery method
  const setDeliveryMethod = useCallback((method: DeliveryMethod) => {
    setState((prev) => ({ ...prev, deliveryMethod: method }));
  }, []);

  // Set contact info
  const setContact = useCallback((contact: string) => {
    setState((prev) => ({ ...prev, contact }));
  }, []);

  // Set identity fields
  const setFirstName = useCallback((firstName: string) => {
    setState((prev) => ({ ...prev, firstName }));
  }, []);

  const setLastName = useCallback((lastName: string) => {
    setState((prev) => ({ ...prev, lastName }));
  }, []);

  const setBrandName = useCallback((brandName: string) => {
    setState((prev) => ({ ...prev, brandName }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setState((prev) => ({ ...prev, email }));
  }, []);

  // Reset entire state
  const reset = useCallback(() => {
    setState(initialState);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  // Submit diagnostic
  const submit = useCallback(async () => {
    if (
      !state.path ||
      !state.firstName ||
      !state.lastName ||
      !state.brandName ||
      !state.email
    ) {
      throw new Error("Missing required fields");
    }

    const payload = {
      region: state.region,
      path: state.path,
      answers: state.answers,
      firstName: state.firstName,
      lastName: state.lastName,
      brandName: state.brandName,
      email: state.email,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch("/api/diagnostic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    // Handle cooldown error (429)
    if (!response.ok) {
      if (response.status === 429 && result.cooldown) {
        // User tried to submit within 7-day window
        throw new Error(
          result.message || "Please wait before submitting again"
        );
      }
      throw new Error("Submission failed");
    }

    if (!result.success) {
      throw new Error(result.message || "Submission failed");
    }

    // Clear state after successful submission
    reset();

    // Navigate to thank you page
    router.push("/diagnostic/thanks");

    return result;
  }, [state, reset, router]);

  return {
    state,
    isLoaded,
    setRegion,
    setPath,
    setAnswer,
    nextStep,
    prevStep,
    setFirstName,
    setLastName,
    setBrandName,
    setEmail,
    reset,
    submit,
  };
}
