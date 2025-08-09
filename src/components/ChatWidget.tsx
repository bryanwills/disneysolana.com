"use client";

import { useState } from 'react';
import { ENABLE_AI } from '@/config/constants';
import { track } from '@/lib/analytics';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    const q = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: q }]);
    track('ai_ask', { q });
    try {
      const res = await fetch('/api/ai/chat', { method: 'POST', body: JSON.stringify({ messages: [{ role: 'user', content: q }] }) });
      const text = await res.text();
      setMessages((m) => [...m, { role: 'assistant', content: text }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Error contacting AI.' }]);
    }
  }

  if (!ENABLE_AI) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button onClick={() => setOpen(true)} className="bg-[#00DCFF] text-black px-4 py-2 rounded font-avenir-medium hover:bg-[#00B8D4]">Ask AI</button>
      ) : (
        <div className="w-80 h-96 bg-black/90 text-white rounded shadow-lg flex flex-col border border-white/10">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="font-avenir-medium">Assistant (Beta)</div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-[#00DCFF] text-black' : 'bg-white/10'}`}>{m.content}</div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about buying, wallets, risks..." className="flex-1 bg-white text-black rounded px-2 py-2" />
            <button type="submit" className="bg-white text-black rounded px-3">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
