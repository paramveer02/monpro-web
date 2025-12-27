MoProAI
Final User Classification, Assessment Questionnaire & Delivery Flow (Phase 2)
This document is production-ready. It defines the exact user types, assessment questions, and post-submission
delivery logic used by MoProAI. It is safe to implement directly in the website and to use as canonical context for
Cursor and internal AI prompts.

1. Core Principles
   • AI operates internally only in Phase 2 and never communicates final decisions to clients.
   • All questions are multiple-choice first to ensure clarity, speed, and high completion rates.
   • Optional questions add depth without forcing disclosure.
   • Users are never rejected; they are classified internally for prioritization.
2. User Type: The Scaler (Active E-commerce)
   Target
   • Active e-commerce businesses (Shopify, WooCommerce, custom platforms).
   • Existing order volume with operational friction.
   Assessment Questions
   • What is your current monthly order volume? (<100 / 100–500 / 500–2000 / 2000+)
   • How many hours per week are spent on manual data entry or order updates? (<5 / 5–15 / 15–40 / 40+)
   • If ONE area were automated today, which would have the biggest impact? (Customer support /
   Inventory sync / Post-purchase revenue / Marketing execution)
   • What is your current abandoned cart rate? (I don’t know / ~50% / ~70% / Critical)
   • On a scale of 1–10, how much is manual chaos limiting strategic focus?
   • If automation clearly saves time or revenue, which investment range feels reasonable? (Under €1k /
   €1k–€3k / €3k–€10k / Depends on ROI)
3. User Type: The Founder (Aspirant / Launching)
   Target
   • Pre-launch or early-stage founders.
   • Product or idea defined, systems not yet built.
   Assessment Questions
   • Where is your product or idea currently? (Concept only / Prototype ready / Manufacturing / Ready to
   sell)
   • What worries you most about launching? (Technical complexity / Marketing cost / Logistics / Not
   knowing where to start)
   • How do you plan to handle orders? (Solo / Small team / Third-party logistics)
   • What setup do you want from Day 1? (Minimalist launch / Future-proof systems / Full automation)
   • If systems clearly support growth, which investment range feels realistic? (Under €1k / €1k–€3k /
   €3k–€10k / Depends on ROI)
4. User Type: The Operator (Service / Agency / B2B)
   Target
   • Non-ecommerce, operations-heavy businesses.
   • Founder-led teams with process friction.
   Assessment Questions
   • What best describes your business? (Service agency / Professional services / B2B wholesale / SaaS)
   • Where does the communication loop usually break? (Lead intake / Client onboarding / Project reporting
   / Billing)
   • How are tasks and data currently tracked? (Sticky notes & chat / Basic spreadsheets / Multiple
   disconnected tools / Custom ERP)
   • On a scale of 1–10, how stuck is the business if the founder takes a 2-week vacation?
5. User Type: The Explorer (Curious / Low Immediacy)
   Target
   • Researchers, students, or early-stage curiosity.
   • Low immediate buying intent.
   Assessment Questions
   • What brings you to MoProAI today? (Researching AI trends / Planning a future project / Career
   inspiration)
   • Which area of AI interests you most? (Workflow automation / Generative content / Data analysis)
   • When do you realistically see yourself investing in automation? (Just browsing / 3–6 months / Later this
   year)
6. Post-Assessment Delivery & Contact Preference
   • After completing the questionnaire, users are asked how they would like to receive their evaluated
   automation roadmap.
   • Delivery method options: Email or WhatsApp.
   • If Email is selected, the user is prompted to provide an email address.
   • If WhatsApp is selected, the user is prompted to provide a phone number (with country code).
   Hard■Coded Confirmation Message (Shown to All Users)
   “Thank you for sharing your details. Your assessment is now under review. You will receive your evaluated
   automation roadmap within the next 14–17 days via your chosen channel. If additional clarification is
   needed, we may reach out before that.”
   Implementation Note: This delivery message is intentionally hard■coded to ensure consistency, professionalism, and
   to avoid AI■generated promises during Phase 2.
