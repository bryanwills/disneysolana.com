import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, '');
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/home`, lastModified: new Date() },
    { url: `${base}/buy`, lastModified: new Date() },
  ];
}
