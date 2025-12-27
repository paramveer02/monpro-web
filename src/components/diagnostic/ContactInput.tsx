'use client';

import { useState } from 'react';
import { DeliveryMethod } from '@/types/diagnostic';

interface ContactInputProps {
  deliveryMethod: DeliveryMethod;
  value: string;
  onChange: (value: string) => void;
}

export default function ContactInput({ deliveryMethod, value, onChange }: ContactInputProps) {
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Simple validation: must start with + and have at least 10 digits
    const regex = /^\+\d{10,}$/;
    return regex.test(phone.replace(/\s/g, ''));
  };

  const handleChange = (val: string) => {
    onChange(val);
    setError('');
  };

  const handleBlur = () => {
    if (!value) {
      setError('This field is required');
      return;
    }

    if (deliveryMethod === 'email' && !validateEmail(value)) {
      setError('Please enter a valid email address');
    } else if (deliveryMethod === 'whatsapp' && !validatePhone(value)) {
      setError('Please enter a valid phone number with country code (e.g., +91...)');
    }
  };

  const isValid = deliveryMethod === 'email' 
    ? validateEmail(value) 
    : validatePhone(value);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/70">
        {deliveryMethod === 'email' ? 'Email Address' : 'WhatsApp Number (with country code)'}
      </label>
      
      <div className="relative">
        <input
          type={deliveryMethod === 'email' ? 'email' : 'tel'}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={deliveryMethod === 'email' ? 'your@email.com' : '+91 98765 43210'}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-white/[0.05] border-2 
            ${error ? 'border-accent' : isValid ? 'border-secondary/50' : 'border-white/10'}
            text-white placeholder-white/30
            focus:outline-none focus:border-primary
            transition-colors duration-200
            font-mono text-sm
          `}
        />
        
        {isValid && value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-accent">{error}</p>
      )}

      {deliveryMethod === 'whatsapp' && !error && (
        <p className="text-xs text-white/40">Include country code (e.g., +1 for US, +91 for India)</p>
      )}
    </div>
  );
}

