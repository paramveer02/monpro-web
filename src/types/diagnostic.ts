// Diagnostic type definitions

export type UserPath = "scaler" | "founder" | "operator" | "explorer";

export type DeliveryMethod = "email" | "whatsapp";

export interface MCQOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  options: MCQOption[];
  helperText?: string;
  multiSelect?: boolean; // Enable multi-select for this question
  exclusiveOptions?: string[]; // Option values that are mutually exclusive with others
  maxSelections?: number; // Maximum number of selections allowed
}

export interface DiagnosticAnswers {
  [questionId: string]: string | string[]; // Single value or array for multi-select
}

export interface DiagnosticState {
  region: string;
  path: UserPath | null;
  currentStep: number;
  answers: DiagnosticAnswers;
  // Identity fields
  firstName: string;
  lastName: string;
  brandName: string;
  email: string;
}

export interface DiagnosticSubmission {
  region: string;
  path: UserPath;
  answers: DiagnosticAnswers;
  // Identity fields
  firstName: string;
  lastName: string;
  brandName: string;
  email: string;
  timestamp: string;
}

export interface PathInfo {
  id: UserPath;
  title: string;
  subtitle: string;
  description: string;
}
