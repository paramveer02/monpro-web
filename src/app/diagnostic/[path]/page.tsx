'use client';

import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { UserPath } from '@/types/diagnostic';
import { getQuestionsForPath, getQuestionCount } from '@/lib/diagnostic/questionBank';
import { useDiagnostic } from '@/hooks/useDiagnostic';
import DiagnosticShell from '@/components/diagnostic/DiagnosticShell';
import MCQOption from '@/components/diagnostic/MCQOption';
import { motion } from 'framer-motion';

interface DiagnosticPathPageProps {
  params: Promise<{
    path: UserPath;
  }>;
}

export default function DiagnosticPathPage({ params }: DiagnosticPathPageProps) {
  const router = useRouter();
  const { state, setAnswer, nextStep, prevStep, isLoaded } = useDiagnostic();
  
  // Unwrap async params
  const { path } = use(params);
  
  const questions = getQuestionsForPath(path, state.region);
  const totalQuestions = getQuestionCount(path);
  const currentQuestion = questions[state.currentStep];
  const currentAnswer = currentQuestion ? state.answers[currentQuestion.id] : null;

  // Redirect if no path selected
  useEffect(() => {
    if (isLoaded && !state.path) {
      router.push('/diagnostic/start');
    }
  }, [state.path, isLoaded, router]);

  // Redirect if wrong path
  useEffect(() => {
    if (isLoaded && state.path && state.path !== path) {
      router.push(`/diagnostic/${state.path}`);
    }
  }, [state.path, path, isLoaded, router]);

  const handleAnswer = (value: string) => {
    if (currentQuestion) {
      if (currentQuestion.multiSelect) {
        // Multi-select: toggle value in array
        const current = state.answers[currentQuestion.id];
        const currentArray = Array.isArray(current) ? current : [];
        const exclusiveOptions = currentQuestion.exclusiveOptions || [];
        const maxSelections = currentQuestion.maxSelections;
        
        // Check if clicking an exclusive option
        const isExclusive = exclusiveOptions.includes(value);
        
        if (currentArray.includes(value)) {
          // Remove if already selected
          const newArray = currentArray.filter(v => v !== value);
          setAnswer(currentQuestion.id, newArray.length > 0 ? newArray : []);
        } else {
          // Adding new selection
          let newArray: string[];
          
          if (isExclusive) {
            // Exclusive option clears all others
            newArray = [value];
          } else {
            // Regular option: clear exclusive options if any, then add
            const filteredArray = currentArray.filter(v => !exclusiveOptions.includes(v));
            newArray = [...filteredArray, value];
            
            // Enforce max selections if set
            if (maxSelections && newArray.length > maxSelections) {
              // Don't add if would exceed max
              return;
            }
          }
          
          setAnswer(currentQuestion.id, newArray);
        }
      } else {
        // Single-select: replace value
        setAnswer(currentQuestion.id, value);
      }
    }
  };

  const handleNext = () => {
    if (state.currentStep < totalQuestions - 1) {
      nextStep();
    } else {
      // Last question - go to delivery page
      router.push('/diagnostic/delivery');
    }
  };

  const handleBack = () => {
    if (state.currentStep > 0) {
      prevStep();
    } else {
      // First question - go back to path selection
      router.push('/diagnostic/start');
    }
  };

  if (!isLoaded || !currentQuestion) {
    return null;
  }

  // Determine if user has answered this question
  const hasAnswer = currentQuestion.multiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : typeof currentAnswer === 'string' && !!currentAnswer;

  return (
    <DiagnosticShell
      currentStep={state.currentStep}
      totalSteps={totalQuestions}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!hasAnswer}
      nextLabel={state.currentStep === totalQuestions - 1 ? 'Continue' : 'Next Question'}
    >
      <div className="space-y-6">
        {/* Question */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {currentQuestion.title}
          </h2>
          
          {currentQuestion.helperText && (
            <p className="text-white/50 text-sm mb-6">
              {currentQuestion.helperText}
              {currentQuestion.maxSelections && currentQuestion.multiSelect && (
                <span className="ml-2 text-primary font-medium">
                  ({Array.isArray(currentAnswer) ? currentAnswer.length : 0} / {currentQuestion.maxSelections})
                </span>
              )}
            </p>
          )}
        </motion.div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MCQOption
                label={option.label}
                value={option.value}
                selected={
                  currentQuestion.multiSelect
                    ? Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
                    : currentAnswer === option.value
                }
                onSelect={handleAnswer}
                multiSelect={currentQuestion.multiSelect}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </DiagnosticShell>
  );
}

