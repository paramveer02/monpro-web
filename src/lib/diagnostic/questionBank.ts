import { Question, PathInfo, UserPath } from "@/types/diagnostic";
import { Region } from "@/types";
import { getCurrencySymbol } from "@/lib/theme";

// Path information for selection screen
export const pathInfo: Record<UserPath, PathInfo> = {
  scaler: {
    id: "scaler",
    title: "The Scaler",
    subtitle: "Active E-commerce",
    description:
      "You have existing order volume with operational friction points.",
  },
  founder: {
    id: "founder",
    title: "The Founder",
    subtitle: "Launching / Aspirant",
    description:
      "Pre-launch or early-stage with product defined, systems not yet built.",
  },
  operator: {
    id: "operator",
    title: "The Operator",
    subtitle: "Service / Agency / B2B",
    description: "Operations-heavy business with process friction.",
  },
  explorer: {
    id: "explorer",
    title: "The Explorer",
    subtitle: "Curious / Researching",
    description: "Exploring automation trends and future possibilities.",
  },
};

// Question bank based on source-of-truth.md
export const questionBank: Record<UserPath, Question[]> = {
  scaler: [
    {
      id: "platform_stack",
      title: "Which platform(s) do you currently use?",
      multiSelect: true,
      helperText: "Select all that apply.",
      exclusiveOptions: ["not_live"],
      options: [
        { label: "Shopify", value: "shopify" },
        { label: "WooCommerce", value: "woocommerce" },
        { label: "Custom website", value: "custom" },
        {
          label: "Marketplaces only (Amazon, Etsy, etc.)",
          value: "marketplaces",
        },
        { label: "Not live yet", value: "not_live" },
      ],
    },
    {
      id: "order_volume",
      title: "What is your current monthly order volume?",
      options: [
        { label: "<100", value: "under_100" },
        { label: "100–500", value: "100_500" },
        { label: "500–2000", value: "500_2000" },
        { label: "2000+", value: "over_2000" },
      ],
    },
    {
      id: "key_channels",
      title: "Where do most of your orders or leads come from?",
      multiSelect: true,
      maxSelections: 3,
      helperText: "Select your top 2–3 channels.",
      options: [
        { label: "Paid ads (Google, Meta)", value: "paid_ads" },
        { label: "Organic / SEO", value: "organic" },
        { label: "Marketplaces", value: "marketplaces" },
        { label: "Social DMs / WhatsApp", value: "social_dms" },
        { label: "Referrals / word of mouth", value: "referrals" },
      ],
    },
    {
      id: "team_capacity",
      title: "How many people actively touch operations weekly?",
      options: [
        { label: "Solo (just me)", value: "solo" },
        { label: "2–3 people", value: "small" },
        { label: "4–10 people", value: "medium" },
        { label: "10+ people", value: "large" },
      ],
    },
    {
      id: "manual_hours",
      title:
        "How many hours per week are spent on manual data entry or order updates?",
      options: [
        { label: "<5 hours", value: "under_5" },
        { label: "5–15 hours", value: "5_15" },
        { label: "15–40 hours", value: "15_40" },
        { label: "40+ hours", value: "over_40" },
      ],
    },
    {
      id: "automation_priority",
      title: "Which areas need automation most urgently?",
      helperText:
        "Select all that apply—most businesses have 2-3 critical pain points.",
      multiSelect: true,
      exclusiveOptions: ["none"],
      options: [
        { label: "Customer support", value: "support" },
        { label: "Inventory sync", value: "inventory" },
        { label: "Post-purchase revenue", value: "revenue" },
        { label: "Marketing execution", value: "marketing" },
        { label: "None currently", value: "none" },
      ],
    },
    {
      id: "cart_abandonment",
      title: "What is your current abandoned cart rate?",
      options: [
        { label: "I don't know", value: "unknown" },
        { label: "~50%", value: "rate_50" },
        { label: "~70%", value: "rate_70" },
        { label: "Critical", value: "critical" },
      ],
    },
    {
      id: "chaos_scale",
      title:
        "On a scale of 1–10, how much is manual chaos limiting strategic focus?",
      options: [
        { label: "1–3 (Manageable)", value: "low" },
        { label: "4–6 (Noticeable)", value: "medium" },
        { label: "7–8 (Significant)", value: "high" },
        { label: "9–10 (Critical)", value: "critical" },
      ],
    },
    {
      id: "engagement_preference",
      title: "How would you prefer to proceed if the roadmap resonates?",
      options: [
        { label: "Implement everything for me", value: "done_for_you" },
        {
          label: "Review the roadmap first, then decide",
          value: "review_first",
        },
        { label: "Not sure yet - want to see the roadmap", value: "unsure" },
      ],
    },
    {
      id: "investment_range",
      title:
        "If automation clearly saves time or revenue, which investment range feels reasonable?",
      options: [
        { label: "Under €1k", value: "under_1k" },
        { label: "€1k–€3k", value: "1k_3k" },
        { label: "€3k–€10k", value: "3k_10k" },
        { label: "Depends on ROI", value: "roi_based" },
      ],
    },
  ],

  founder: [
    {
      id: "platform_stack",
      title: "Which platform are you planning to use?",
      options: [
        { label: "Shopify", value: "shopify" },
        { label: "WooCommerce", value: "woocommerce" },
        { label: "Custom website", value: "custom" },
        { label: "Marketplaces only", value: "marketplaces" },
        { label: "Not decided yet", value: "undecided" },
      ],
    },
    {
      id: "product_stage",
      title: "Where is your product or idea currently?",
      options: [
        { label: "Concept only", value: "concept" },
        { label: "Prototype ready", value: "prototype" },
        { label: "Manufacturing", value: "manufacturing" },
        { label: "Ready to sell", value: "ready" },
      ],
    },
    {
      id: "launch_worry",
      title: "What concerns you most about launching?",
      helperText: "Select all that apply.",
      multiSelect: true,
      options: [
        { label: "Technical complexity", value: "technical" },
        { label: "Marketing cost", value: "marketing" },
        { label: "Logistics & fulfillment", value: "logistics" },
        { label: "Not knowing where to start", value: "unknown" },
        { label: "Cash flow management", value: "cashflow" },
      ],
    },
    {
      id: "order_handling",
      title: "How do you plan to handle orders?",
      options: [
        { label: "Solo", value: "solo" },
        { label: "Small team", value: "team" },
        { label: "Third-party logistics", value: "third_party" },
      ],
    },
    {
      id: "setup_preference",
      title: "What setup do you want from Day 1?",
      options: [
        { label: "Minimalist launch", value: "minimalist" },
        { label: "Future-proof systems", value: "future_proof" },
        { label: "Full automation", value: "full_automation" },
      ],
    },
    {
      id: "engagement_preference",
      title: "How would you prefer to proceed if the roadmap resonates?",
      options: [
        { label: "Implement everything for me", value: "done_for_you" },
        {
          label: "Review the roadmap first, then decide",
          value: "review_first",
        },
        { label: "Not sure yet - want to see the roadmap", value: "unsure" },
      ],
    },
    {
      id: "investment_range",
      title:
        "If systems clearly support growth, which investment range feels realistic?",
      options: [
        { label: "Under €1k", value: "under_1k" },
        { label: "€1k–€3k", value: "1k_3k" },
        { label: "€3k–€10k", value: "3k_10k" },
        { label: "Depends on ROI", value: "roi_based" },
      ],
    },
  ],

  operator: [
    {
      id: "business_type",
      title: "What best describes your business?",
      options: [
        { label: "Service agency", value: "agency" },
        { label: "Professional services", value: "professional" },
        { label: "B2B wholesale", value: "b2b" },
        { label: "SaaS", value: "saas" },
      ],
    },
    {
      id: "communication_breakdown",
      title: "Where does communication typically break down?",
      helperText:
        "Select all that apply—most ops teams face multiple friction points.",
      multiSelect: true,
      options: [
        { label: "Lead intake & qualification", value: "lead_intake" },
        { label: "Client onboarding", value: "onboarding" },
        { label: "Project status updates", value: "reporting" },
        { label: "Billing & invoicing", value: "billing" },
        { label: "Internal team handoffs", value: "handoffs" },
      ],
    },
    {
      id: "tracking_method",
      title: "How are tasks and data currently tracked?",
      helperText: "Select all that apply.",
      multiSelect: true,
      options: [
        { label: "Sticky notes & chat messages", value: "manual" },
        { label: "Basic spreadsheets", value: "spreadsheets" },
        { label: "Multiple disconnected tools", value: "disconnected" },
        { label: "Custom ERP or CRM", value: "erp" },
      ],
    },
    {
      id: "founder_dependency",
      title:
        "On a scale of 1–10, how stuck is the business if the founder takes a 2-week vacation?",
      options: [
        { label: "1–3 (Fine)", value: "low" },
        { label: "4–6 (Some issues)", value: "medium" },
        { label: "7–8 (Major issues)", value: "high" },
        { label: "9–10 (Critical)", value: "critical" },
      ],
    },
  ],

  explorer: [
    {
      id: "motivation",
      title: "What brings you to MonPro-AI today?",
      options: [
        { label: "Researching AI trends", value: "research" },
        { label: "Planning a future project", value: "planning" },
        { label: "Career inspiration", value: "career" },
      ],
    },
    {
      id: "interest_area",
      title: "Which area of AI interests you most?",
      options: [
        { label: "Workflow automation", value: "workflow" },
        { label: "Generative content", value: "generative" },
        { label: "Data analysis", value: "data" },
      ],
    },
    {
      id: "timeline",
      title: "When do you realistically see yourself investing in automation?",
      options: [
        { label: "Just browsing", value: "browsing" },
        { label: "3–6 months", value: "3_6_months" },
        { label: "Later this year", value: "this_year" },
      ],
    },
  ],
};

// Get questions for a specific path
export function getQuestionsForPath(
  path: UserPath,
  region?: string
): Question[] {
  const questions = questionBank[path] || [];

  // If no region provided, return as-is with default € symbols
  if (!region) return questions;

  // Get currency symbol for the region
  const currency = getCurrencySymbol(region as Region);

  // Define region-specific budget ranges for investment_range question
  const budgetRanges: Record<string, { label: string; value: string }[]> = {
    india: [
      { label: "Under ₹50k", value: "under_1k" },
      { label: "₹50k–₹150k", value: "1k_3k" },
      { label: "₹150k–₹500k", value: "3k_10k" },
      { label: "Depends on ROI / open to discussion", value: "roi_based" },
    ],
    europe: [
      { label: "Under €3k", value: "under_1k" },
      { label: "€3k–€10k", value: "1k_3k" },
      { label: "€10k–€25k", value: "3k_10k" },
      { label: "Depends on ROI / open to discussion", value: "roi_based" },
    ],
    uk: [
      { label: "Under £3k", value: "under_1k" },
      { label: "£3k–£10k", value: "1k_3k" },
      { label: "£10k–£25k", value: "3k_10k" },
      { label: "Depends on ROI / open to discussion", value: "roi_based" },
    ],
  };

  // Replace € with region-specific currency in all question text and options
  return questions.map((q) => {
    // Special handling for investment_range question
    if (q.id === "investment_range") {
      return {
        ...q,
        title: q.title.replace(/€/g, currency),
        options: budgetRanges[region] || q.options,
      };
    }

    // Default handling for all other questions
    return {
      ...q,
      title: q.title.replace(/€/g, currency),
      options: q.options.map((opt) => ({
        ...opt,
        label: opt.label.replace(/€/g, currency),
      })),
    };
  });
}

// Get total question count for a path
export function getQuestionCount(path: UserPath): number {
  return questionBank[path]?.length || 0;
}
