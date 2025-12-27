"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    }

    // In production, you could send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full"
          >
            <GlassCard className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6"
              >
                <svg
                  className="w-8 h-8 text-accent"
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
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Something went wrong
              </h2>

              <p className="text-white/60 mb-6">
                We encountered an unexpected error. Don't worry, your data is
                safe.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <summary className="text-sm font-mono text-accent cursor-pointer mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs text-white/70 overflow-x-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}

              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.href = "/";
                }}
                className="px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-xl font-semibold hover:bg-primary/20 transition-all duration-300"
              >
                Return to Home
              </button>
            </GlassCard>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
