"use client";

import { useState } from 'react';
import { track } from '@/lib/analytics';

const CONTRACT = 'mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump';

export default function BuyPage() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    track('copy_contract', { contract: CONTRACT });
    setTimeout(() => setCopied(false), 1500);
  };

  const jupiterLink = `https://jup.ag/swap/SOL-${CONTRACT}`;
  const transitLink = `https://www.transit.finance/#/swap?from=SOL&to=${CONTRACT}`;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-avenir-heavy">Buy Disney++ Token</h1>
          <button onClick={copy} className="text-sm bg-white text-black rounded px-3 py-2 font-avenir-medium hover:bg-gray-200">
            {copied ? 'Copied!' : 'Copy Contract'}
          </button>
        </header>

        <div className="text-white/80 break-all">
          Contract: <span className="text-white">{CONTRACT}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-avenir-heavy">Swap Options</h2>
            <a href={jupiterLink} target="_blank" onClick={() => track('buy_click_jupiter', { contract: CONTRACT })} className="block bg-[#00DCFF] text-black rounded px-4 py-3 text-center font-avenir-medium hover:bg-[#00B8D4]">Open in Jupiter</a>
            <a href={transitLink} target="_blank" onClick={() => track('buy_click_transit', { contract: CONTRACT })} className="block bg-white text-black rounded px-4 py-3 text-center font-avenir-medium hover:bg-gray-200">Open in Transit</a>
          </div>

          <div className="rounded overflow-hidden bg-white">
            <iframe
              title="Jupiter Swap"
              src={`https://jup.ag/swap/${encodeURIComponent(`SOL-${CONTRACT}`)}?hideHeader=true`}
              className="w-full h-[620px]"
            />
          </div>
        </div>

        <section className="text-white/70 space-y-2">
          <h3 className="text-lg font-avenir-heavy text-white">How to Buy</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Install Phantom, Solflare, or Backpack wallet.</li>
            <li>Fund with SOL (use any on-ramp or exchange withdrawal).</li>
            <li>Open Jupiter or Transit using the buttons above.</li>
            <li>Paste the contract if not prefilled, review, and swap.</li>
          </ol>
        </section>

        <footer className="text-xs text-white/50 pt-6 border-t border-white/10">
          Nothing here is financial advice. No affiliation with Disney, Netflix, or other trademark owners.
        </footer>
      </div>
    </main>
  );
}
