## AI Assistant (Vercel AI SDK) — Minimal Integration Plan

### Goals
- Answer FAQs (how to buy, wallets, risks) and guide users through the `/buy` flow
- Provide copy ideas for social posts with strict disclaimers
- Log key events (question submitted, link clicked) for insight

### Tech choices
- SDK: Vercel AI SDK (`ai`), Provider client: `openai` (or compatible)
- Runtime: Next.js App Router; Edge runtime for fast streaming responses
- Auth: server-side API route; NEVER expose API keys on the client

### Dependencies
- `npm i ai openai` (or your chosen provider client)

### Environment variables
- `OPENAI_API_KEY` (server)
- Optional: `NEXT_PUBLIC_SITE_URL` (already used)

### Files to add
- `src/app/api/ai/chat/route.ts` (Edge route)
- `src/components/ChatWidget.tsx` (client chat UI)
- `src/app/help/page.tsx` (optional dedicated chat page)

### Server route outline (Edge)
- Validate API key presence, return 500 if missing
- Stream responses using the AI SDK (Chat Completions)
- System prompt must enforce: no financial advice; focus on FAQs and buy guidance; include our disclaimers
- Rate limiting (phase 2): Upstash/Ratelimit or middleware-based per-IP guard

Pseudocode
```
export const runtime = 'edge';
export async function POST(req: Request) {
  // parse { messages }
  // call provider with system prompt + messages
  // stream response back to client
}
```

### Client widget outline
- Client component using `useChat` from `ai/react`
- Input box with submit, streaming display area, collapse/expand toggle
- Track events with `track('ai_ask', { q })` and `track('ai_link_click', {...})`

Pseudocode
```
"use client";
import { useChat } from 'ai/react';
export default function ChatWidget() {
  const { messages, input, setInput, handleSubmit } = useChat({ api: '/api/ai/chat' });
  // render messages + form
}
```

### Placement
- Option A: Floating widget on `/buy` and `/home`
- Option B: Dedicated `/help` page with full-screen chat

### Safety & compliance
- Prominent disclaimers in the UI and as a preamble in the system prompt
- Filter responses to avoid investment/financial advice
- Do not log emails/PII; restrict analytics to event types + generic payloads

### Analytics
- `ai_ask`, `ai_stream_start`, `ai_stream_end`, `ai_link_click`
- Use existing `track()` helper

### Testing
- Local: set `OPENAI_API_KEY` and verify prompt boundaries, streaming, and error handling
- Fallback: mock provider in dev when no key is present

### Rollout
- Phase 1: `/help` page only
- Phase 2: small floating widget on `/buy`
- Phase 3: guardrails + rate limiting + improved prompt + context grounding
