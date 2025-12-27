# MAKE Integration Guide for MonPro-AI Roadmap Delivery

## Overview

This guide explains how to set up MAKE.com to receive diagnostic results, generate a PDF roadmap, and deliver it via WhatsApp or Email.

---

## Architecture Flow

```
User completes diagnostic
    ↓
Next.js API generates LLM battlecard
    ↓
POST to MAKE webhook (JSON payload)
    ↓
MAKE scenario:
  1. Receives JSON
  2. Formats HTML for PDF
  3. PDF.co converts HTML → PDF
  4. Routes to WhatsApp OR Email
    ↓
You receive the PDF roadmap
```

---

## Step 1: Set Up Environment Variable

In your `.env.local` file, add:

```env
MAKE_WEBHOOK_URL=https://hook.make.com/your-scenario-webhook-id
OPENAI_API_KEY=sk-...your-key-here
```

**How to get the MAKE webhook URL:**
1. Create a new scenario in MAKE.com
2. Add "Custom Webhook" as the first module
3. Click "Add" → Copy the webhook URL
4. Paste it into your `.env.local`

---

## Step 2: MAKE Scenario Structure

### Module 1: Custom Webhook (Trigger)
- **Type:** Custom webhook
- **Data structure:** See `docs/make-webhook-payload-example.json`
- **Output:** Receives the entire battlecard JSON

### Module 2: Set Variables (Optional)
Extract commonly used fields:
- `leadId`
- `region`
- `path`
- `contact`
- `deliveryMethod`
- `recommendedAutomations` (iterate this later)

### Module 3: Build HTML Template
Create an HTML variable with the roadmap structure:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 40px;
      background: #ffffff;
      color: #1a1a1a;
    }
    .header {
      border-bottom: 3px solid #00d4ff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .brand {
      font-size: 28px;
      font-weight: bold;
      color: #00d4ff;
      margin: 0;
    }
    .tagline {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
    }
    .section {
      margin: 30px 0;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #00d4ff;
      margin-bottom: 12px;
      border-left: 4px solid #00d4ff;
      padding-left: 12px;
    }
    .context {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
      font-size: 14px;
      line-height: 1.6;
    }
    .list-item {
      margin: 10px 0;
      padding-left: 20px;
      position: relative;
    }
    .list-item:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #00d4ff;
      font-weight: bold;
    }
    .automation-card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
      background: #fafafa;
    }
    .automation-card h4 {
      margin: 0 0 8px 0;
      color: #1a1a1a;
      font-size: 16px;
    }
    .automation-card .label {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #666;
      margin-right: 8px;
    }
    .automation-card .value {
      font-size: 13px;
      color: #333;
      margin-bottom: 6px;
    }
    .phase-box {
      background: #f0f9ff;
      border-left: 4px solid #0ea5e9;
      padding: 15px;
      margin: 10px 0;
    }
    .roi-summary {
      background: #ecfdf5;
      border: 2px solid #10b981;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .roi-summary .big-number {
      font-size: 32px;
      font-weight: bold;
      color: #059669;
    }
    .cta {
      background: #00d4ff;
      color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
      text-align: center;
      font-weight: 600;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="brand">MonPro‑AI</h1>
    <p class="tagline">AI Automation & Web Systems for E‑Commerce Growth</p>
    <h2 style="margin-top: 20px; color: #333;">Automation Roadmap – {{path}} ({{region}})</h2>
  </div>

  <div class="context">
    {{contextSnapshot}}
  </div>

  <div class="section">
    <h3 class="section-title">Revenue Leaks Identified</h3>
    {{#each revenueLeaks}}
    <div class="list-item">{{this}}</div>
    {{/each}}
  </div>

  <div class="section">
    <h3 class="section-title">Manual Friction Points</h3>
    {{#each manualFriction}}
    <div class="list-item">{{this}}</div>
    {{/each}}
  </div>

  <div class="section">
    <h3 class="section-title">Top Automation Opportunities</h3>
    {{#each recommendedAutomations}}
    <div class="automation-card">
      <h4>{{area}}</h4>
      <div class="value">{{what}}</div>
      <div style="margin-top: 12px;">
        <span class="label">Tools:</span> <span class="value">{{tooling}}</span><br>
        <span class="label">Impact:</span> <span class="value">{{impact}}</span><br>
        <span class="label">Effort:</span> <span class="value">{{effort}}</span><br>
        <span class="label">Investment:</span> <span class="value">{{implementationRange}}</span>
      </div>
    </div>
    {{/each}}
  </div>

  <div class="section">
    <h3 class="section-title">Phased Implementation Roadmap</h3>
    
    <div class="phase-box">
      <strong>Phase 1 (Weeks 1-2): Quick Wins</strong>
      {{#each phasedRoadmap.phase1}}
      <div class="list-item">{{this}}</div>
      {{/each}}
    </div>

    <div class="phase-box">
      <strong>Phase 2 (Month 1-2): Deeper Integrations</strong>
      {{#each phasedRoadmap.phase2}}
      <div class="list-item">{{this}}</div>
      {{/each}}
    </div>

    <div class="phase-box">
      <strong>Phase 3 (Later): Advanced Automations</strong>
      {{#each phasedRoadmap.phase3}}
      <div class="list-item">{{this}}</div>
      {{/each}}
    </div>
  </div>

  <div class="roi-summary">
    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Estimated Monthly Impact</p>
    <div class="big-number">{{estimatedROI.currency}} {{estimatedROI.monthlyImpact}}</div>
    <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">
      Implementation: {{estimatedROI.currency}} {{estimatedROI.implementationCost}} 
      (Payback: ~{{estimatedROI.paybackMonths}} months)
    </p>
  </div>

  <div class="cta">
    {{nextStepsCTA}}
  </div>

  <div class="footer">
    Generated on {{generatedAt}} | Lead ID: {{leadId}}
  </div>
</body>
</html>
```

**In MAKE:**
- Use the "Text aggregator" or "Set variable" module
- Replace `{{fieldName}}` with actual webhook data using MAKE's mapping
- For arrays like `recommendedAutomations`, use an **Iterator** module before building HTML

### Module 4: PDF.co – HTML to PDF
- **Service:** PDF.co
- **Action:** HTML to PDF
- **Input:** The HTML string from Module 3
- **Output:** PDF URL or file

**Configuration:**
- Page size: A4
- Margins: 20px all sides
- Orientation: Portrait

### Module 5: Router (Split by Delivery Method)
- **Condition 1:** `deliveryMethod = "whatsapp"` → Route to WhatsApp module
- **Condition 2:** `deliveryMethod = "email"` → Route to Email module

### Module 6a: WhatsApp Delivery
**Option A: Twilio WhatsApp**
- Service: Twilio
- Action: Send WhatsApp message
- To: `{{contact}}`
- Body: 
  ```
  Hi! Your automation roadmap is ready 🚀
  
  Priority Score: {{priorityScore}}/100
  Estimated Impact: {{estimatedROI.currency}} {{estimatedROI.monthlyImpact}}/month
  
  PDF: {{pdfUrl}}
  
  {{nextStepsCTA}}
  ```

**Option B: WhatsApp Business Cloud API**
- Use HTTP module with Meta's Graph API
- Requires WhatsApp Business Account

### Module 6b: Email Delivery
- **Service:** Gmail / SendGrid / SMTP
- **To:** Your email (for now; later can be to client)
- **Subject:** `MonPro‑AI Roadmap – {{path}} lead from {{region}} (Priority: {{priorityScore}})`
- **Body:**
  ```
  New lead diagnostic completed!
  
  Lead ID: {{leadId}}
  Contact: {{contact}}
  Delivery: {{deliveryMethod}}
  Priority Score: {{priorityScore}}/100
  
  See attached PDF roadmap.
  ```
- **Attachment:** PDF from Module 4

---

## Step 3: Test the Integration

1. **Test webhook manually in MAKE:**
   - Use the example payload from `docs/make-webhook-payload-example.json`
   - Click "Run once" in MAKE
   - Check that PDF is generated correctly

2. **Test from your website:**
   - Complete the diagnostic flow
   - Check Next.js console logs for `[MAKE] Successfully sent...`
   - Check your WhatsApp/Email for the PDF

---

## Step 4: Production Checklist

- [ ] Add `MAKE_WEBHOOK_URL` to `.env.local`
- [ ] Add `OPENAI_API_KEY` to `.env.local`
- [ ] Test MAKE scenario with sample data
- [ ] Verify PDF formatting looks professional
- [ ] Test both WhatsApp AND Email delivery routes
- [ ] Set up error notifications in MAKE (if webhook fails)
- [ ] Configure MAKE to run automatically (not manual trigger)

---

## Troubleshooting

**PDF not generating:**
- Check that HTML is valid (no syntax errors)
- Ensure PDF.co has sufficient credits
- Try a simpler HTML template first

**Webhook not receiving data:**
- Check that `MAKE_WEBHOOK_URL` is correct in `.env.local`
- Restart your Next.js dev server after adding env variable
- Check MAKE scenario history for incoming requests

**WhatsApp not sending:**
- Verify phone number format (with country code, no spaces)
- Check Twilio account has WhatsApp enabled
- Ensure sender WhatsApp number is verified

---

## Future Enhancements

1. **Store PDFs in cloud storage** (S3, Cloudinary) instead of just URLs
2. **Add email to client** (not just to you) after manual review
3. **Create admin dashboard** in MAKE to view all leads
4. **Integrate with CRM** (Pipedrive, HubSpot) for lead tracking
5. **A/B test different PDF templates** per path (scaler vs founder)

---

## Cost Estimates

- **MAKE.com:** Free tier covers ~1000 operations/month (sufficient for MVP)
- **PDF.co:** Free tier covers 100 PDFs/month
- **Twilio WhatsApp:** ~$0.005/message
- **OpenAI GPT-4:** ~$0.03/diagnostic (1500 tokens)

**Total cost per lead:** ~₹5-10 (~$0.06-0.12)

---

Your webhook is ready! 🚀

Every time someone completes the diagnostic, you'll receive a professional PDF roadmap within seconds.
