## Disney++ Current Site Audit (from local copies, HARs, and recording)

Source artifacts reviewed:
- Recording: `chrome.mov`
- HARs: `disneysolana.com.har`, `disneysolana.com_screenshots.har`
- Site copies: `disneysolana.com/` (wget), `disneysolana-copy/` (HTTrack)

### High-level
- Built with Webflow (markers: `webflow.css`, `webflow.js`, `data-w-id`, `w-*` classes, Webflow slider/interaction structures).
- Two main pages observed: `index.html` (landing) and `home.html` (Netflix-style browsing UI).
- Assets are largely mirrored in `images/` (WebP variants with responsive `srcset`). Fonts: Avenir family. CSS: `normalize.css`, `webflow.css`, `disneyplusplus.webflow.css`.

### Functional observations
- Landing page (`index.html`):
  - Poster wall animation and CTA → `home.html`.
  - “Only on Disney++” marquee uses jQuery bxSlider ticker with different settings for mobile vs desktop.
  - Email form present but appears to be a static Webflow form (no backend captured).
- Home page (`home.html`):
  - Profile overlay and nav with multiple sections.
  - Numerous Webflow `w-slider` carousels for “Recommended”, “Trending”, etc.; individual slide divs like `row-X-slide-Y` are present but not actionable.
  - Category hubs embed Dropbox-hosted MP4s for background videos.
  - Most nav and card links use `href="#"` placeholders, implying incomplete interactions.

### Issues found (from review + HARs)
- Many 404s in HAR logs (both with and without screenshots). Likely missing resources or dynamic endpoints during capture:
  - Multiple repeated 404 responses across entries (see lines matched in HARs).
- Click actions on posters/cards do not open detail pages:
  - Cards are `<div>` backgrounds with no anchors; no `onclick` handler or link target defined.
  - Webflow structure suggests intended CMS collections, but static export contains only styled placeholders.
- Nav links mostly point to `#` anchors or no-op links (e.g., `home.html#`).
- Webflow interactions rely on `webflow.js`; sliders and animations work, but content behaviors (modals/details) are missing.
- External dependencies:
  - jQuery 3.5.1, bxSlider plugin.
  - Dropbox MP4 sources for category hub backgrounds.
- No JSON/CMS data captured; no API feeds present for content.

### Key deltas from Next.js clone
- Your Next.js landing page (`disneysolana-nextjs/src/app/page.tsx`) recreates the hero and sections but does not implement:
  - The bxSlider ticker (you use static scrollable rows instead).
  - Webflow-style sliders; you use static image grids.
  - Email form handling (form is a no-op in both versions).
- Images/branding/fonts are aligned between the copies and the clone.

### Migration/Implementation recommendations
1) Define real routes and link targets:
   - Convert poster/card divs to anchor-wrapped components with routes like `/title/[slug]` or open a detail modal.
   - For MVP, map a subset of cards to a static `/title/[slug]` page; leave others disabled with a tooltip.
2) Replace Webflow sliders:
   - Implement carousels with a React lib (e.g., Keen Slider, Embla) or Framer Motion-based marquee for the ticker section.
   - Use CSS scroll-snap for horizontal lists as a lightweight option.
3) Remove jQuery/bxSlider:
   - Eliminate jQuery and bxSlider dependencies in Next.js; reimplement behaviors with React and CSS.
4) Fix broken assets/endpoints noted in HARs:
   - Validate each 404 path, add missing assets if required, or remove dead references.
   - Mirror the Dropbox MP4s to first-party hosting or replace with local short loops.
5) Interactions:
   - Implement hover states, focus states, and keyboard navigation for accessibility.
   - Add working nav: search route stub, watchlist stub, and section scroll anchors.
6) Buy/Token integration:
   - Add Buy page with embedded Jupiter + Transit deep links and contract display.
   - Add footer/header links that currently point to `#` with real routes.
7) Analytics:
   - Instrument events for card clicks, slider interactions, copy contract, buy clicks.

### Specific broken/missing items to fix (tracked)
- Cards with no link target in `index.html` and `home.html`.
- HAR 404s for assets/endpoints (see `disneysolana.com.har` and `disneysolana.com_screenshots.har`).
- Email form: no action/endpoint.
- Numerous `#` links in navbar and footer.
- External videos served from Dropbox without fallback.

### Next actions
- Update `implementation_plan.md` with an “Audit Findings” section summarizing the above.
- Create a task list to: implement carousels, define routes, wire buy flow, replace jQuery, fix 404s, and add analytics.
- Planned features additions:
  - AI Assistant (Vercel AI SDK) for FAQs/buy guidance with strict disclaimers
  - Web3-readiness: publish static build to IPFS/Arweave, optional wallet-gated content, and keep Web2 as primary for SEO and speed
