import type { NextRequest } from 'next/server';
import { SITE_URL } from '@/config/constants';

export const dynamic = 'force-static';

export function GET(_req: NextRequest) {
  const body = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL.replace(/\/$/, '')}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
