export type AnalyticsPayload = Record<string, unknown> | undefined;

export function track(eventName: string, payload?: AnalyticsPayload) {
  try {
    // Google Analytics (gtag)
    // @ts-expect-error window.gtag added by GA snippet
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // @ts-expect-error window.gtag added by GA snippet
      window.gtag('event', eventName, payload || {});
    }
  } catch {}

  try {
    // Plausible
    // @ts-expect-error window.plausible added by Plausible snippet
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      // @ts-expect-error window.plausible added by Plausible snippet
      window.plausible(eventName, { props: payload || {} });
    }
  } catch {}

  if (typeof window !== 'undefined') {
    // Fallback debug
    console.debug('[analytics]', eventName, payload || {});
  }
}
