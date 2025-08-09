"use client";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-4xl font-avenir-heavy mb-2">Something went wrong</h1>
        <p className="text-white/70 break-all">{error.message}</p>
      </div>
    </main>
  );
}
