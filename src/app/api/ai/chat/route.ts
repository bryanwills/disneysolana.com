export const runtime = 'edge';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Placeholder: do not call provider yet
    const { messages } = await req.json();
    const last = messages?.[messages.length - 1]?.content || '';
    const preamble = 'Disclaimer: This is not financial advice. No affiliation with Disney, Netflix, or other trademark owners.\n\n';
    const reply = `${preamble}You asked: ${last}\n\nAI assistant is not enabled in this environment.`;
    return new Response(reply, { headers: { 'Content-Type': 'text/plain' } });
  } catch (e) {
    return new Response('Invalid request', { status: 400 });
  }
}
