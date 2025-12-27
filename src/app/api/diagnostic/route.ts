import { NextRequest, NextResponse } from "next/server";
import { DiagnosticSubmission } from "@/types/diagnostic";

// In-memory submission cooldown store (7 days)
// In production: Replace with Redis or database
// Using email as identifier
const emailSubmissions = new Map<string, number>();
const COOLDOWN_PERIOD_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface AdminBattlecard {
  leadId: string;
  region: string;
  path: string;
  answers: Record<string, string | string[]>; // Support multi-select answers
  // Identity fields
  firstName: string;
  lastName: string;
  brandName: string;
  email: string;
  // Delivery fields
  deliveryMethod?: string;
  phone?: string;
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
  rawData: DiagnosticSubmission;
}

/**
 * Sanitize string input to prevent XSS and injection attacks
 */
function sanitizeString(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== "string") return "";

  // #region agent log
  const originalInput = input;
  // #endregion
  const result = input
    .trim()
    .slice(0, maxLength) // Limit length
    .replace(/[<>]/g, "") // Remove HTML tags
    .replace(/[^\w\s@.-]/g, ""); // Allow only safe characters
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/8d12d780-dbc2-41b4-802c-005f9109a648',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:43',message:'sanitizeString execution',data:{input:originalInput,output:result,modified:originalInput!==result,removedChars:originalInput.split('').filter((c,i)=>!result.includes(c)).join('')},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1,H5'})}).catch(()=>{});
  // #endregion
  return result;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321
}

/**
 * Validate region
 */
function isValidRegion(region: string): boolean {
  return ["india", "europe", "uk"].includes(region);
}

/**
 * Validate path
 */
function isValidPath(path: string): boolean {
  return ["scaler", "founder", "operator", "explorer"].includes(path);
}

/**
 * SECURE DIAGNOSTIC API ROUTE
 *
 * Critical Security Rule: The "No-Leak" Safety Lock
 * - User receives immediate success response
 * - LLM processing happens in background AFTER response sent
 * - Frontend NEVER waits for or displays LLM output
 * - All AI-generated content goes to admin logs only
 */

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP (basic)
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const data: DiagnosticSubmission = await request.json();

    // Comprehensive validation
    if (
      !data.region ||
      !data.path ||
      !data.firstName ||
      !data.lastName ||
      !data.brandName ||
      !data.email
    ) {
      console.warn(`[Security] Invalid submission data from IP: ${ip}`);
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    // Validate types
    if (!isValidRegion(data.region)) {
      console.warn(`[Security] Invalid region: ${data.region}`);
      return NextResponse.json(
        { success: false, message: "Invalid region" },
        { status: 400 }
      );
    }

    if (!isValidPath(data.path)) {
      console.warn(`[Security] Invalid path: ${data.path}`);
      return NextResponse.json(
        { success: false, message: "Invalid path" },
        { status: 400 }
      );
    }

    // Sanitize all string inputs
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/8d12d780-dbc2-41b4-802c-005f9109a648',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:127',message:'Before sanitization',data:{originalEmail:data.email,originalPhone:data.phone},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1,H3,H4'})}).catch(()=>{});
    // #endregion
    const sanitizedData = {
      ...data,
      firstName: sanitizeString(data.firstName, 50),
      lastName: sanitizeString(data.lastName, 50),
      brandName: sanitizeString(data.brandName, 100),
      email: sanitizeString(data.email, 254).toLowerCase().trim(),
    };
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/8d12d780-dbc2-41b4-802c-005f9109a648',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:132',message:'After sanitization',data:{sanitizedEmail:sanitizedData.email,originalEmail:data.email,emailChanged:sanitizedData.email!==data.email.toLowerCase().trim()},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1,H2'})}).catch(()=>{});
    // #endregion

    // Validate email format
    // #region agent log
    const emailValidationResult = isValidEmail(sanitizedData.email);
    fetch('http://127.0.0.1:7242/ingest/8d12d780-dbc2-41b4-802c-005f9109a648',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:137',message:'Email validation',data:{sanitizedEmail:sanitizedData.email,originalEmail:data.email,validationPassed:emailValidationResult},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    if (!emailValidationResult) {
      console.warn(`[Security] Invalid email format: ${sanitizedData.email}`);
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for suspiciously short names (potential spam)
    if (
      sanitizedData.firstName.length < 2 ||
      sanitizedData.lastName.length < 2
    ) {
      console.warn(`[Security] Suspicious name length from IP: ${ip}`);
      return NextResponse.json(
        { success: false, message: "Invalid name" },
        { status: 400 }
      );
    }

    // Check email cooldown (7-day enforcement)
    const email = sanitizedData.email;
    const lastSubmission = emailSubmissions.get(email);
    const now = Date.now();

    if (lastSubmission) {
      const timeSinceLastSubmission = now - lastSubmission;
      const daysRemaining = Math.ceil(
        (COOLDOWN_PERIOD_MS - timeSinceLastSubmission) / (24 * 60 * 60 * 1000)
      );

      if (timeSinceLastSubmission < COOLDOWN_PERIOD_MS) {
        return NextResponse.json(
          {
            success: false,
            message: `Please wait ${daysRemaining} more day(s) before submitting again. Your proposal is being prepared.`,
            cooldown: true,
            daysRemaining,
          },
          { status: 429 } // Too Many Requests
        );
      }
    }

    // Record this submission
    emailSubmissions.set(email, now);

    // IMMEDIATE SUCCESS RESPONSE (user sees this instantly)
    const response = NextResponse.json({
      success: true,
      message: "Assessment received",
    });

    // Background processing (non-blocking, happens AFTER response sent)
    // Using setImmediate equivalent in Node.js
    processLLMAnalysis(sanitizedData).catch((error) => {
      // Log error server-side, but don't affect user experience
      console.error("[ADMIN] LLM Processing Error:", error);
      // In production, send alert to admin monitoring system
    });

    return response;
  } catch (error) {
    // Even if parsing fails, return success to user
    // This ensures lead capture is never blocked by technical issues
    console.error("[ADMIN] API Error:", error);

    return NextResponse.json({
      success: true,
      message: "Assessment received",
    });
  }
}

/**
 * Background LLM Analysis Function
 * This runs AFTER the user receives their success response
 * The user's experience is completely decoupled from this process
 */
async function processLLMAnalysis(data: DiagnosticSubmission): Promise<void> {
  try {
    const leadId = `LEAD_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Generate admin battlecard using OpenAI
    const battlecard = await generateBattlecard(data, leadId);

    // Store in admin data vault (file system for now, DB later)
    await saveToAdminVault(battlecard);

    // Send to MAKE webhook for PDF generation and delivery
    await sendToMakeWebhook(battlecard);

    // Optional: Send email notification to Paramvir
    await notifyAdmin(battlecard);

    console.log(`[ADMIN] Successfully processed lead: ${leadId}`);
  } catch (error) {
    // Log but don't throw - this is background processing
    console.error("[ADMIN] Background processing failed:", error);
    // In production: alert admin monitoring system
  }
}

/**
 * Generate Admin Battlecard using OpenAI
 */
async function generateBattlecard(
  data: DiagnosticSubmission,
  leadId: string
): Promise<AdminBattlecard> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("[ADMIN] OpenAI API key not configured");
    // Return basic battlecard without AI analysis
    return createFallbackBattlecard(data, leadId);
  }

  try {
    // Load automation catalog for context
    const automationCatalog = await import(
      "@/../../docs/automation-catalog.json"
    );

    // Build prompt for LLM
    const prompt = buildDiagnosticPrompt(data, automationCatalog.default);

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `
You are NOVA, Paramveer's private automation consultant inside MonPro-AI.
You speak TO Paramveer (the operator/consultant), not to the lead/client.
Your output is INTERNAL ONLY, used for Paramveer's decision-making.

Hard rules:
- Output ONLY valid JSON. No markdown. No code fences.
- Never address the client directly. Address Paramveer in second person ("you").
- Prefer the provided automation catalog for e-commerce paths (scaler/founder).
- If you suggest anything not in the catalog, label it as "nonCatalogHypothesis" and include assumptions + confidence.
- For explorer path: avoid firm pricing/ROI; focus on what info you'd need and what a minimal next step would be.
- Never claim you performed web research. Do not cite sources.
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();
    const content: string = result.choices?.[0]?.message?.content ?? "";

    // Strip markdown fences (```json ... ```) if present
    const firstBrace = content.indexOf("{");
    const lastBrace = content.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error("LLM did not return a valid JSON object");
    }

    const jsonText = content.slice(firstBrace, lastBrace + 1);
    const analysis = JSON.parse(jsonText);

    // Extract data from NOVA's internal triage structure
    const revenueLeaks = analysis.diagnosticInsights?.revenueLeaks || [];
    const manualFriction = analysis.diagnosticInsights?.manualFriction || [];

    // Extract automation recommendations
    const catalogAutomations =
      analysis.recommendations?.catalogAutomations || [];
    const nonCatalogHypotheses =
      analysis.recommendations?.nonCatalogHypotheses || [];

    // Combine automations into a single array of names
    const recommendedAutomations = [
      ...catalogAutomations.map(
        (auto: any) => auto.name || "Unnamed automation"
      ),
      ...nonCatalogHypotheses.map(
        (hypo: any) =>
          `${hypo.name || "Hypothesis"} (confidence: ${hypo.confidence || 0})`
      ),
    ];

    // Extract ROI numbers
    const numbers = analysis.numbers || {};
    const estimatedROI = {
      currency:
        numbers.currency ||
        (data.region === "india"
          ? "INR"
          : data.region === "europe"
          ? "EUR"
          : "GBP"),
      monthlyImpact: 0, // Will be parsed from range
      implementationCost: 0, // Will be parsed from range
    };

    // Parse implementation cost range (e.g., "€1,000–€3,000")
    if (numbers.estimatedImplementationCostRange) {
      const match = numbers.estimatedImplementationCostRange.match(/[\d,]+/g);
      if (match && match.length >= 2) {
        const low = parseInt(match[0].replace(/,/g, ""));
        const high = parseInt(match[1].replace(/,/g, ""));
        estimatedROI.implementationCost = Math.floor((low + high) / 2);
      }
    }

    // Parse monthly upside range
    if (numbers.estimatedMonthlyUpsideRange) {
      const match = numbers.estimatedMonthlyUpsideRange.match(/[\d,]+/g);
      if (match && match.length >= 2) {
        const low = parseInt(match[0].replace(/,/g, ""));
        const high = parseInt(match[1].replace(/,/g, ""));
        estimatedROI.monthlyImpact = Math.floor((low + high) / 2);
      }
    }

    // Extract priority score
    const priorityScore = analysis.nextStepsForParamveer?.priorityScore || 50;

    // Build complete battlecard
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/8d12d780-dbc2-41b4-802c-005f9109a648',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:399',message:'Battlecard email storage',data:{storedEmail:data.email,originalFromRequest:data.email,wasEmailModified:'CHECK_IF_SANITIZED_EMAIL_USED'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H3'})}).catch(()=>{});
    // #endregion
    const battlecard: AdminBattlecard = {
      leadId,
      region: data.region,
      path: data.path,
      answers: data.answers,
      firstName: data.firstName,
      lastName: data.lastName,
      brandName: data.brandName,
      email: data.email,
      deliveryMethod: data.deliveryMethod,
      phone: data.phone,
      revenueLeaks,
      manualFriction,
      recommendedAutomations,
      estimatedROI,
      priorityScore,
      generatedAt: new Date().toISOString(),
      rawData: data,
    };

    console.log("[ADMIN] Successfully generated battlecard with AI analysis");
    console.log(`[ADMIN] Revenue leaks found: ${revenueLeaks.length}`);
    console.log(`[ADMIN] Manual friction points: ${manualFriction.length}`);
    console.log(
      `[ADMIN] Recommended automations: ${recommendedAutomations.length}`
    );

    return battlecard;
  } catch (error) {
    console.error("[ADMIN] OpenAI call failed:", error);
    console.error(
      "[ADMIN] Error details:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.error("[ADMIN] API Key configured:", !!process.env.OPENAI_API_KEY);
    console.error(
      "[ADMIN] API Key length:",
      process.env.OPENAI_API_KEY?.length || 0
    );

    if (error instanceof Error && error.message.includes("401")) {
      console.error("[ADMIN] Authentication failed - check API key validity");
    }

    return createFallbackBattlecard(data, leadId);
  }
}

/**
 * Create fallback battlecard if AI fails
 */
function createFallbackBattlecard(
  data: DiagnosticSubmission,
  leadId: string
): AdminBattlecard {
  console.warn("[ADMIN] Using fallback battlecard - AI analysis unavailable");

  return {
    leadId,
    region: data.region,
    path: data.path,
    answers: data.answers,
    firstName: data.firstName,
    lastName: data.lastName,
    brandName: data.brandName,
    email: data.email,
    deliveryMethod: data.deliveryMethod,
    phone: data.phone,
    revenueLeaks: [
      "[AI Analysis Pending] Manual review required",
      "OpenAI API unavailable - consultant will analyze manually",
      "Check raw answers for context",
    ],
    manualFriction: [
      "[AI Analysis Pending] Manual review required",
      "OpenAI API unavailable - consultant will analyze manually",
      "Check raw answers for context",
    ],
    recommendedAutomations: [
      "[Awaiting Manual Review] AI analysis unavailable",
      "Consultant will review submission and provide recommendations",
    ],
    estimatedROI: {
      currency:
        data.region === "india"
          ? "INR"
          : data.region === "europe"
          ? "EUR"
          : "GBP",
      monthlyImpact: 0,
      implementationCost: 0,
    },
    priorityScore: 50,
    generatedAt: new Date().toISOString(),
    rawData: data,
  };
}

/**
 * Build diagnostic prompt for LLM
 */
function buildDiagnosticPrompt(
  data: DiagnosticSubmission,
  catalog: any
): string {
  const currencySymbol =
    data.region === "india" ? "₹" : data.region === "europe" ? "€" : "£";
  const currencyCode =
    data.region === "india" ? "INR" : data.region === "europe" ? "EUR" : "GBP";

  return `
You are NOVA — Paramveer's private consultant.
Your job: turn the lead's diagnostic into an INTERNAL battlecard that helps Paramveer decide:
- Is this lead worth time?
- What automations are most plausible?
- What pricing range is plausible (rough)?
- What follow-up info is needed?
This is NOT client-facing.

LEAD:
- Region: ${data.region}
- Path: ${data.path}
- Name: ${data.firstName} ${data.lastName}
- Brand: ${data.brandName}
- Email: ${data.email}${
    data.deliveryMethod ? `\n- Preferred Delivery: ${data.deliveryMethod}` : ""
  }${data.phone ? `\n- WhatsApp: ${data.phone}` : ""}

RAW ANSWERS:
${JSON.stringify(data.answers, null, 2)}

CATALOG (authoritative for scaler/founder):
${JSON.stringify(catalog, null, 2)}

PATH RULES:
- If path is "scaler" or "founder":
  - Choose "catalogAutomations" ONLY from the catalog. Do not invent catalog entries.
  - If something is useful but missing, put it under "nonCatalogHypotheses" with low confidence + assumptions.
- If path is "operator":
  - Use catalog only if relevant; otherwise propose ops automations as hypotheses.
- If path is "explorer":
  - No hard pricing/ROI. Keep it educational + qualification-focused.
  - Priority score should usually be low unless answers show urgency.

OUTPUT: STRICT JSON ONLY. Match this schema EXACTLY:

{
  "mode": "internal_triage_for_paramveer",
  "narrativeToParamveer": {
    "oneLine": "Say what's going on in plain English TO Paramveer",
    "whyThisMatters": "1-2 lines explaining why this lead is/ isn't valuable",
    "yourLikelyWin": "What you can realistically sell (implementation only; no DIY)",
    "riskFlags": ["..."],
    "missingClarity": ["..."]
  },
  "leadProfile": {
    "pathRationale": "Why they match this path based on answers",
    "urgencyLevel": "low|medium|high",
    "budgetSignal": "low|medium|high|unknown",
    "complexity": "low|medium|high"
  },
  "diagnosticInsights": {
    "revenueLeaks": ["3-5 plausible leaks tied to answers"],
    "manualFriction": ["3-5 plausible frictions tied to answers"],
    "constraints": ["team/tools/compliance constraints inferred"]
  },
  "recommendations": {
    "catalogAutomations": [
      {
        "catalogId": "MUST match catalog id if available",
        "name": "catalog automation name",
        "whyItFits": "Explain TO Paramveer, tied to their answers",
        "tooling": "tools implied by catalog + their stack",
        "effort": "Low|Medium|High",
        "implementationRange": "${currencySymbol}X–${currencySymbol}Y (rough estimate)",
        "impactLevel": "Low|Medium|High"
      }
    ],
    "nonCatalogHypotheses": [
      {
        "name": "idea NOT in catalog",
        "whyItFits": "Explain TO Paramveer",
        "assumptions": ["..."],
        "confidence": 0.35
      }
    ],
    "phasingSuggestion": {
      "phase1": ["2-3 items by name (quick wins)"],
      "phase2": ["2-3 items by name"],
      "phase3": ["optional"]
    }
  },
  "numbers": {
    "currency": "${currencyCode}",
    "pricingConfidence": "low|medium|high",
    "estimatedImplementationCostRange": "${currencySymbol}X–${currencySymbol}Y",
    "estimatedMonthlyUpsideRange": "${currencySymbol}X–${currencySymbol}Y",
    "notesToParamveer": "Explain uncertainty + what would tighten estimates. Never fake precision."
  },
  "nextStepsForParamveer": {
    "firstFollowUpQuestions": ["max 5 questions you would ask next"],
    "recommendedOffer": "Implementation-only (no DIY). Suggest: Phase 1 pilot → full rollout",
    "priorityScore": 1,
    "suggestedReplyToLead": "1-2 lines Paramveer can send to the lead (neutral, non-salesy)"
  }
}

IMPORTANT:
- Never address the client directly except inside "suggestedReplyToLead".
- Never invent catalog ids.
- If no suitable catalog items exist, keep catalogAutomations empty and use nonCatalogHypotheses.
- Output JSON only.`;
}

/**
 * Save battlecard to admin vault
 */
async function saveToAdminVault(battlecard: AdminBattlecard): Promise<void> {
  // For now, just log to console
  // In production: Save to database or file system
  console.log(
    "[ADMIN VAULT] New Battlecard:",
    JSON.stringify(battlecard, null, 2)
  );

  // TODO: Implement persistent storage
  // - Option 1: Write to /admin-vault/battlecards/${leadId}.json
  // - Option 2: Store in database (PostgreSQL/MongoDB)
  // - Option 3: Send to external CRM via webhook
}

/**
 * Notify admin of new lead
 */
async function notifyAdmin(battlecard: AdminBattlecard): Promise<void> {
  // For now, just log
  // In production: Send email/Slack notification to Paramvir
  console.log(
    `[ADMIN ALERT] New ${battlecard.path} lead from ${battlecard.region} (Priority: ${battlecard.priorityScore})`
  );

  // TODO: Implement notification system
  // - Send email via Resend/SendGrid
  // - Post to Slack webhook
  // - Push notification to admin dashboard
}

/**
 * Send battlecard to MAKE webhook for PDF generation and delivery
 * This is where the magic happens: MAKE receives the JSON and creates the PDF
 */
async function sendToMakeWebhook(battlecard: AdminBattlecard): Promise<void> {
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!makeWebhookUrl) {
    console.warn(
      "[MAKE] Webhook URL not configured - skipping MAKE integration"
    );
    return;
  }

  try {
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...battlecard,
        // Add timestamp for MAKE scenario
        processedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`MAKE webhook failed: ${response.statusText}`);
    }

    console.log(
      `[MAKE] Successfully sent battlecard to webhook for lead: ${battlecard.leadId}`
    );
  } catch (error) {
    console.error("[MAKE] Webhook delivery failed:", error);
    // Don't throw - this is non-critical for user experience
  }
}
