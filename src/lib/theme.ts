import { Region, CurrencyConfig } from '@/types';

// Theme colors from branding.json
export const theme = {
  colors: {
    background: '#010409',
    glass: 'rgba(13, 17, 23, 0.7)',
    primary: '#00f2ff',
    secondary: '#00ff88',
    accent: '#ff3e3e',
    border: 'rgba(48, 54, 61, 0.8)',
  },
  fonts: {
    headings: 'Plus Jakarta Sans',
    data: 'JetBrains Mono',
  },
} as const;

// Currency configuration by region
export const currencyConfig: Record<Region, CurrencyConfig> = {
  india: {
    symbol: '₹',
    code: 'INR',
    locale: 'en-IN',
  },
  europe: {
    symbol: '€',
    code: 'EUR',
    locale: 'en-IE',
  },
  uk: {
    symbol: '£',
    code: 'GBP',
    locale: 'en-GB',
  },
};

// Get currency symbol for a region
export function getCurrencySymbol(region: Region): string {
  return currencyConfig[region].symbol;
}

// Format currency value based on region
export function formatCurrency(amount: number, region: Region): string {
  const config = currencyConfig[region];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Region display names
export const regionNames: Record<Region, string> = {
  india: 'India',
  europe: 'Europe',
  uk: 'United Kingdom',
};

// Region flags (emoji)
export const regionFlags: Record<Region, string> = {
  india: '🇮🇳',
  europe: '🇪🇺',
  uk: '🇬🇧',
};

