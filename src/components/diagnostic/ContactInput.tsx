"use client";

import { useState, useMemo, memo } from "react";
import { DeliveryMethod } from "@/types/diagnostic";

interface ContactInputProps {
  deliveryMethod: DeliveryMethod;
  value: string;
  onChange: (value: string) => void;
}

// Popular country codes for quick selection
const COUNTRY_CODES = [
  { code: "+1", country: "US/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
];

function ContactInputComponent({
  deliveryMethod,
  value,
  onChange,
}: ContactInputProps) {
  const [error, setError] = useState("");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Must start with + and have at least 10 digits
    const regex = /^\+\d{10,}$/;
    return regex.test(phone.replace(/\s/g, ""));
  };

  const handleChange = (val: string) => {
    onChange(val);
    setError("");
  };

  const handleCountrySelect = (code: string) => {
    setSelectedCode(code);
    // If user has typed a number without country code, prepend it
    const currentValue = value.replace(/^\+\d+\s?/, "").trim();
    if (currentValue) {
      onChange(`${code} ${currentValue}`);
    } else {
      onChange(`${code} `);
    }
    setShowCountryCodes(false);
  };

  const handleBlur = () => {
    // Delay to allow country code selection to complete
    setTimeout(() => {
      if (!value) {
        setError("This field is required");
        return;
      }

      if (deliveryMethod === "email" && !validateEmail(value)) {
        setError("Please enter a valid email address");
      } else if (deliveryMethod === "whatsapp" && !validatePhone(value)) {
        setError(
          "Please enter a valid phone number with country code (e.g., +91...)"
        );
      }
    }, 200);
  };

  const isValid = useMemo(() => {
    return deliveryMethod === "email" ? validateEmail(value) : validatePhone(value);
  }, [deliveryMethod, value]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/70">
        {deliveryMethod === "email" ? "Email Address" : "WhatsApp Number"}
        <span className="text-accent ml-1">*</span>
      </label>

      <div className="relative">
        {/* Country code selector for WhatsApp */}
        {deliveryMethod === "whatsapp" && (
          <div className="relative z-10">
            <button
              type="button"
              onClick={() => setShowCountryCodes(!showCountryCodes)}
              onBlur={() => setTimeout(() => setShowCountryCodes(false), 200)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors text-white/90 text-sm font-mono border border-white/10"
            >
              <span>{COUNTRY_CODES.find(c => c.code === selectedCode)?.flag || "🌍"}</span>
              <span>{selectedCode}</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {showCountryCodes && (
              <div className="absolute left-0 top-full mt-1 w-56 max-h-60 overflow-y-auto bg-[#0a0a0a] border border-white/20 rounded-lg shadow-xl z-50">
                {COUNTRY_CODES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleCountrySelect(item.code)}
                    className="w-full px-3 py-2 text-left hover:bg-primary/10 transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="text-lg">{item.flag}</span>
                    <span className="text-white/90 font-mono">{item.code}</span>
                    <span className="text-white/50 text-xs">{item.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <input
          type={deliveryMethod === "email" ? "email" : "tel"}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={
            deliveryMethod === "email" ? "your@email.com" : "98765 43210"
          }
          autoComplete={deliveryMethod === "email" ? "email" : "tel"}
          inputMode={deliveryMethod === "email" ? "email" : "tel"}
          className={`
            w-full ${deliveryMethod === "whatsapp" ? "pl-[110px]" : "px-4"} pr-12 py-3 sm:py-3.5 rounded-lg
            bg-white/[0.05] border-2 
            ${
              error
                ? "border-accent"
                : isValid
                ? "border-secondary/50"
                : "border-white/10"
            }
            text-white placeholder-white/30
            focus:outline-none focus:border-primary
            transition-colors duration-200
            font-mono text-sm
          `}
        />

        {isValid && value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}

      {deliveryMethod === "whatsapp" && !error && (
        <p className="text-xs text-white/40">
          Select country code or enter with + (e.g., +1 for US, +91 for India)
        </p>
      )}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(ContactInputComponent);
