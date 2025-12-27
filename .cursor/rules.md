MonPro-AI Master Build Rules (v2.3)

1. IDENTITY & POSITIONING (MANDATORY)

NO MARKETING FLUFF:
Ban the words: Premium, Leading, World-class, Revolutionary, Operating System, Next-gen, Futuristic.

PERSONA:
The website behaves like a structured diagnostic interface, not a marketing site or SaaS onboarding flow.

THE DIGITAL ASSISTANT:
Introduce the MonPro Digital Analyst (NOVA).

Role: Observe inputs, take notes, and structure signals.

Boundaries: NEVER makes decisions or recommendations.

Tone: Observational, professional, restrained, calm.

HUMAN OVERSIGHT:
All evaluations, prioritization, and recommendations are reviewed by a human consultant.
The assistant exists to support analysis, not replace judgment.

THE VALUE:
We sell clarity and friction removal, not software, tools, or platforms.

ENTITY:
MonPro-AI is a platform-agnostic automation consultancy focused on operational clarity.

MISSION:
Identifying revenue leaks and manual friction to provide clear, actionable automation insights.

USER PATHS:

Path A: The Scaler (Active E-commerce)

Path B: The Founder (E-commerce Aspirant / Launching)

Path C: The Operator (B2B / Service / Agency)

Path D: The Explorer (AI Curious / Low Immediacy)

2. TECH STACK & VISUAL GUARDRAILS

Framework: Next.js 15 (App Router), TypeScript, Tailwind CSS.

Motion: Framer Motion — subtle transitions only (slide, fade, light blur).

Theme: Atmospheric Dark Mode.

Background: #010409 (Deep Obsidian)

Primary Accent: #00F2FF (Cyan)

Success / Positive Signal: #00FF88 (Emerald)

Borders: 1px rgba(255, 255, 255, 0.1)

Typography:

Primary UI: Plus Jakarta Sans

Technical / Assistant Text: JetBrains Mono (use sparingly)

3. CORE DIAGNOSTIC LOGIC

Entry Gate:
User MUST select a region first (India / Europe / United Kingdom).

Region Usage:
Region selection is used ONLY for:

Regulatory context

Tooling availability

Cost and pricing ranges

Branching Logic:
Implement a deterministic state machine for Paths A, B, C, D based on /docs/source-of-truth.md

NO GAMIFICATION:
This is an assessment, not a quiz. Avoid progress gimmicks or celebratory language.

4. AUTOMATION SOURCE OF TRUTH (STRICT)

For E-commerce (Path A / B):
Recommendations must be derived from /docs/automation-catalog.json.

For Non-E-commerce (Path C / D):
Enable Consultant Mode.
The LLM may generate bespoke workflow ideas (e.g., lead intake, CRM sync, reporting) ONLY based on verified pain points.

INTERNAL AI ONLY:
The LLM exists solely to generate the Internal Diagnostic / Sales Battlecard for the admin.

5. WORKFLOW & EXECUTION CONSTRAINTS

Mobile-First:
All interactive elements must be highly tappable.
No horizontal scroll. Minimum 44–48px touch targets.

ZERO CREDIT WASTE:

Implement one feature at a time.

No broad brainstorming.

Restate the exact task before coding.

If logic is ambiguous, ask one clarifying question only.

NO HALLUCINATIONS:
Internal summaries must use only:

Collected MCQ answers

Verified automation catalog entries

Region-specific constraints

6. PROMPTING PATTERNS (FOR CURSOR)

Component Prompt:
“Build [ComponentName] following the Visual Guardrails.
Ensure it respects region context and diagnostic tone.”

Logic Prompt:
“Map MCQ answers for Path [A/B/C/D] into a structured internal diagnostic summary.
Do not invent services or promises.”

7. SECURITY & API HANDLING (NON-NEGOTIABLE)

NEVER hardcode API keys.

Use process.env.OPENAI_API_KEY server-side only.

All LLM calls must be handled inside Next.js Route Handlers (src/app/api/...).

.env.local must remain git-ignored.

8. THE “NO-LEAK” SAFETY LOCK (MANDATORY)

Zero Client Visibility:
LLM output is NEVER rendered on the client.

Data Flow:
User Input → Backend API → LLM → Internal Admin Channel (Email / Dashboard).

Client Output (Hard-coded only):

Thank you for sharing your details. Your assessment is now under review.
You will receive your evaluated automation roadmap within the next 14–17 days via your chosen channel.

Failure Mode:
If the LLM fails, the user experience must remain successful and uninterrupted.

9. FINAL PRINCIPLE

This project is a consultant-grade diagnostic system, not a product demo.
If a design or copy choice feels impressive but unclear, remove it.

Clarity always wins.
