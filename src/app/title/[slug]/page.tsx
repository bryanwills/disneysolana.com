import Image from 'next/image';
import Link from 'next/link';
import { findItemBySlug, slugify } from '@/data/content';
import { track } from '@/lib/analytics';

export default async function TitlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findItemBySlug(slug);

  if (!item) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-avenir-heavy">Title not found</h1>
          <Link href="/home" className="text-[#00DCFF] underline">Return to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <nav className="flex items-center justify-between mb-8">
        <Link href="/home" className="text-sm text-white/80 hover:text-white">← Back</Link>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-avenir-heavy">Disney</span>
          <span className="text-lg">+</span>
          <span className="text-2xl font-avenir-heavy">+</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-[420px] rounded-lg overflow-hidden">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-avenir-heavy">{item.title}</h1>
          <div className="text-white/70">{item.studio}</div>
          <div className="pt-4">
            <Link href={`https://jup.ag/swap/SOL-${slugify(item.title)}`} target="_blank" className="inline-block bg-[#00DCFF] text-black px-6 py-3 rounded-lg font-avenir-medium hover:bg-[#00B8D4] transition-colors" onClick={() => track('buy_click_jupiter', { title: item.title })}>
              Buy Token
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
