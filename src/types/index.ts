// Region types
export type Region = 'india' | 'europe' | 'uk';

// User path types based on personas
export type UserPath = 'scaler' | 'founder' | 'operator' | 'explorer';

// Diagnostic data structure
export interface DiagnosticData {
  region: Region;
  path: UserPath;
  answers: Record<string, any>;
  timestamp: string;
  email?: string;
  name?: string;
  phone?: string;
}

// Admin Battlecard structure (internal only, never sent to client)
export interface AdminBattlecard {
  leadId: string;
  region: Region;
  path: UserPath;
  revenueLeaks: string[];
  manualFriction: string[];
  recommendedAutomations: string[];
  estimatedROI: {
    currency: string;
    monthlyImpact: number;
    implementationCost: number;
  };
  priorityScore: number;
  generatedAt: string;
  rawData: DiagnosticData;
}

// Currency configuration
export interface CurrencyConfig {
  symbol: string;
  code: string;
  locale: string;
}

// Automation catalog types
export interface Automation {
  id: string;
  name: string;
  desc: string;
}

export interface AutomationCategory {
  id: string;
  name: string;
  automations: Automation[];
}

