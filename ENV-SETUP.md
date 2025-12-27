# Environment Variables Setup Guide

## Local Development (.env.local)

Create a `.env.local` file in the root directory:

```env
# OpenAI API Key (required for AI-powered battlecard generation)
# Get your key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Environment
NODE_ENV=development
```

## Production Deployment

### Option 1: Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: production

### Option 2: Other Platforms (Netlify, Railway, etc.)

Add these environment variables in your platform's dashboard:

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NODE_ENV=production
```

## Environment Variable Security

### ✅ Safe Practices

- Store API keys in `.env.local` (gitignored)
- Use environment variables in server-side code only
- Never expose keys in client-side JavaScript
- Rotate keys regularly
- Use different keys for dev/staging/production

### ❌ Never Do This

```javascript
// DON'T: Hardcode keys in source code
const apiKey = "sk-proj-xxxxx";

// DON'T: Use keys in client components
export function ClientComponent() {
  const key = process.env.OPENAI_API_KEY; // This won't work and is insecure
}

// DON'T: Commit .env.local to git
// It's already in .gitignore - keep it that way!
```

## Testing Without OpenAI Key

The application is designed to work even without an OpenAI API key:

1. **With API Key:** Full AI-powered battlecard generation
2. **Without API Key:** Fallback battlecard with placeholder data

This ensures lead capture is never blocked by API issues.

## Verifying Environment Variables

```bash
# Check if .env.local is loaded
npm run dev

# You should see in terminal:
# - Environments: .env.local

# Test API endpoint
curl -X POST http://localhost:3000/api/diagnostic \
  -H "Content-Type: application/json" \
  -d '{"region":"india","path":"scaler","answers":{},"timestamp":"2025-12-27T00:00:00Z"}'

# Check server logs for:
# [ADMIN VAULT] New Battlecard: {...}
```

## Common Issues

### Issue: "OpenAI API key not configured"

**Solution:** Add `OPENAI_API_KEY` to `.env.local` and restart dev server

### Issue: API key exposed in browser

**Solution:** Ensure you're only using `process.env.OPENAI_API_KEY` in:

- API routes (`src/app/api/**/route.ts`)
- Server Components
- NEVER in Client Components (marked with 'use client')

### Issue: .env.local not loading

**Solution:**

1. Ensure file is named exactly `.env.local` (not `.env.local.txt`)
2. Restart the dev server
3. Check file is in root directory (same level as `package.json`)

## Additional Environment Variables (Future)

As the project grows, you may add:

```env
# Database
DATABASE_URL=postgresql://...

# Email Service
RESEND_API_KEY=re_...
ADMIN_EMAIL=paramvir@monpro.ai

# Slack Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry Error Tracking
SENTRY_DSN=https://...
```

Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Only use this prefix for non-sensitive data like analytics IDs.
