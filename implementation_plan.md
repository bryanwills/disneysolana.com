## Disney++ Website Relaunch — Implementation Plan

This document consolidates the current project context, clarifying Q&A, goals, phased rollout plan, technical choices, and operational steps to relaunch the Disney++ website for the disneysolana memecoin.

### Project Context
- Owner: Jamie (owns `disneysolana.com` and the disneysolana memecoin project)
- Contract address (from notes): `mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump`
- References from notes:
  - Quill AI check: `https://check.quillai.network/solana/mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump`
  - Transit how-to-buy: `https://info.transit.finance/en/how-to-buy/Solana/Disney%2B%2B/27/mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump`
  - Current site: `https://disneysolana.com/`
- Current site background: Appears to use a Netflix-style template with a large library of meme images. The repository `disneysolana-nextjs` already mirrors 400+ images under `public/images` along with custom Avenir fonts and a landing page clone.
- Goal: Launch a new, robust website to market and sell the token while addressing concerns from Jamie’s messages (pending transcription of `data/convo*.png`).

### Clarifying Questions and Answers
1) Branding/IP stance — continue using Disney++ and keep everything as-is?
   - Answer: Yes, continue using Disney++, keep everything as is for now.
2) Token status — launched, contract immutability (mint/freeze), supply, decimals, DEX listings?
   - Answer: Unknown; token likely not launched yet, in steps ready to launch.
3) Buy flow — deep links and embedded widgets?
   - Answer: Use all available options.
4) Hosting/DNS — who controls, and staging?
   - Answer: Friend controls hosting; we can use localhost for now and change later.
5) Content migration — as-is or curated?
   - Answer: Migrate content as-is.
6) Analytics/marketing channels — which to integrate?
   - Answer: All of them for analytics. Will add more later (e.g., Google Analytics).
7) Legal/compliance — disclaimers, no affiliation?
   - Answer: Yes, include those as well.
8) Timeline — target launch date and MVP scope?
   - Answer: TBD; aim to launch as quickly as reasonably possible.

### Goals and Success Criteria
- Non-disruptive rollout: Do not affect the current production site until the new site is approved.
- MVP feature set: Home, Buy, About/Story, Token details, FAQ, Legal/Disclaimer, Socials; responsive, performant, SEO-ready.
- Trust and transparency: Prominent contract address, explorer links, optional LP/mint authority proofs when available.
- Marketing readiness: Analytics, event tracking, OG images, share cards, sitemap, robots, and fast page loads (Lighthouse ≥ 90 mobile).
- Safe fallback: Easy rollback path to the current site snapshot.

### Phased Plan

#### Phase 0 — Access and Alignment
- Confirm token facts once available: address, ticker, supply, decimals, mint authority status, LP lock details, target pair(s) and DEX listings.
- Confirm approved branding direction (continuing Disney++ as per answers) and legal stance (disclaimers and no affiliation notices to be included).
- Obtain or confirm DNS/hosting access to optionally add `staging.disneysolana.com` later; for now, develop on localhost.
- Inventory content from current site; since repo already carries mirrored assets, plan to migrate content as-is.
- Pending action: Transcribe and incorporate key concerns from `data/convo1.png`, `data/convo2.png`, `data/convo3.png`.

#### Phase 1 — Non-Disruptive Staging (Local First)
- Local development: continue using `disneysolana-nextjs` on localhost for all MVP work.
- Optional next step when access exists: deploy staging to `staging.disneysolana.com` (Vercel + Cloudflare DNS). Keep production untouched.
- Enable preview deployments per PR for safe iteration (once staging is in place).

#### Phase 2 — MVP Website (Buy + Marketing-Ready)
- Pages
  - Home: Hero, meme grid, clear CTA (Buy, Join Socials), brief value propositions.
  - Buy: Embed Jupiter swap widget OR Transit, plus deep links to Jupiter/Transit/Phantom; show contract address; guide for new users.
  - Token: Contract address, supply/decimals (when available), explorer links (Solscan/SolanaFM), links to pairs/DEX if listed.
  - About/Story: Narrative, purpose, and meme culture framing.
  - FAQ: How to buy, wallets, risks, contract info, fees, roadmap basics.
  - Legal/Disclaimer: Prominent disclaimers, no affiliation statements.
  - 404/500: Branded error pages.
- Components/Integrations
  - Wallet connect: `@solana/wallet-adapter` (Phantom, Solflare, Backpack, etc.).
  - Swap: Embedded Jupiter widget and deep links to Jupiter + Transit; include fallback instructions.
  - Price/Market data: DexScreener widget or API, fallback to Jupiter quote API. Show price, 24h volume, market cap (if available).
  - Socials: X/Twitter, Telegram, Discord prominent links; “copy contract” button.
  - SEO/OG: OG/Twitter images, meta tags per page, sitemap, robots, canonical URLs.
- Performance
  - Use Next Image for all assets, lazy-load below-the-fold sections, prefetch critical routes.
  - Lighthouse target: ≥90 mobile. Optimize bundle and animation costs.

#### Audit Findings (from local copies, HARs, and recording)
- The current site is a Webflow export; many interactions are placeholders:
  - Cards/posters are non-clickable (no anchors or handlers), so clicking images does nothing.
  - Multiple 404s surfaced in both HARs for missing assets/endpoints.
  - Nav/footer links often point to `#` and do not route anywhere.
  - Carousels rely on Webflow sliders/bxSlider; behavior works but content clicks do not.
  - Category hubs use Dropbox-hosted MP4s with no local fallback.
- Action items to address in the new build:
  - Implement real routes/modals for titles and wire clickable cards.
  - Replace Webflow/bxSlider with React carousels or CSS scroll-snap lists.
  - Remove jQuery; reimplement ticker/marquee with Framer Motion or a React slider.
  - Fix/replace broken assets and remove dead references found in HARs.
  - Mirror third-party videos or provide fallbacks.
  - Wire analytics events for interactions.

#### Phase 3 — Trust and Transparency
- Display contract address: `mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump` everywhere buy actions appear.
- Add explorer links (Solscan, SolanaFM) and Quill AI link for verification.
- If/when available: show LP lock proof, mint authority revocation proof, and any audits.
- Add a “Risks and Disclosures” page and link it in the footer and Buy page.

#### Phase 4 — Marketing Integration
- Analytics: GA4 + Plausible (or another privacy-friendly option) to cover all channels; configure events for Connect Wallet, Swap, Copy Address, Join Telegram, Buy click.
- Attribution: UTM link templates for X/Twitter, Telegram, Discord posts.
- Social share: Curated OG images/cards for homepage and Buy page; link-in-bio media kit and brand pack.
- Email capture: Activate and wire up the existing email capture component (local storage/placeholder now, real provider later).

#### Phase 5 — QA, SEO, Compliance
- QA: Mobile-first testing across Safari iOS, Chrome Android, Chrome/Firefox/Edge desktop; verify wallet connections and swap links.
- SEO: Page-level metadata, sitemap.xml, robots.txt, canonical tags, schema where helpful.
- Compliance: Prominent disclaimers and “no affiliation” notices; review imagery for potential trademark issues while honoring the current “keep-as-is” directive.
- Security: CSP headers, strict external script policy, no mixed content.

#### Phase 6 — Launch and Rollback
- Option A (recommended when staging exists): cutover DNS of `disneysolana.com` to the new site; retain old site snapshot at `backup.disneysolana.com`.
- Option B (temporary): launch at `www.disneysolana.com` and 301 root to `www`.
- Monitoring: Sentry for error tracking, uptime monitoring, analytics dashboards.
- Rollback: Keep the prior site snapshot for immediate reversion.

#### Phase 7 — Post-Launch Enhancements
- CMS-light: Headless CMS (Sanity/Contentful) or MDX-driven content to allow non-dev edits.
- Listings: Submit metadata to CoinGecko/DexScreener where applicable; enhance token page with on-chain stats when live.
- Growth: Airdrop/referral pages, leaderboard, on-chain engagement campaigns.

##### AI Assistant (Vercel AI SDK) — planned addition
- Objective: Provide an on-site assistant to answer FAQs (how to buy, wallets, risks), guide users, and generate social copy.
- Approach: Add a chat widget/page using Vercel AI SDK (e.g., `useChat`) backed by a provider (OpenAI or compatible) via an Edge route.
- Notes: Keep strict disclaimers; no financial advice; do not expose API keys client-side; add rate-limiting and analytics events.
- Milestones:
  - Add server route `/api/ai/chat` (Edge runtime) + client chat component
  - Initial prompt constrained to site FAQs and buy flow
  - Event tracking for question submit and token link clicks

##### Web3 Readiness and Migration Options — planned addition
- Goal: Prepare a path from current Web2 site to Web3-hosted/static distribution and optional on-chain interactions.
- Options:
  - Static hosting on IPFS/Arweave for immutable builds; DNS gateway via Cloudflare/IPFS (keeps `disneysolana.com` usable).
  - Solana Web3 features: existing wallet adapter for connects, embedded swaps (Jupiter/Transit), optional token gating and on-chain proofs.
  - Dual-run: Keep Web2 site (fast CDN, SEO) and publish IPFS/Arweave version in parallel; link from footer. Both can coexist.
- TLDs: Web3 naming varies by chain and provider (e.g., `.sol` via Solana Name Service, `.eth` via ENS, Unstoppable Domains `.crypto`, etc.). Not required; standard DNS + gateways work fine.
- Conversion scope:
  - Minimal: publish static build to IPFS/Arweave; verify gateway, add link.
  - Moderate: wallet-gated sections, NFT/holder checks, and on-chain read-only data (price, supply) via APIs.
  - Advanced: on-chain content publishing, decentralized storage for media and user-generated items, and fully decentralized auth.
- Risks/Complexity:
  - Web3 auth/UX can increase friction; keep Web2 paths as default.
  - Asset pinning/persistence needed for IPFS; budget for a pinning service.
  - Compliance and moderation considerations for UGC if added.

### Technical Stack and Architecture
- Framework: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion.
- Wallet: `@solana/wallet-adapter` (Phantom, Solflare, Backpack, etc.).
- Swap: Embedded Jupiter widget + Transit deep links; keep a direct “Copy Contract” action as a fallback.
- Data: DexScreener (price/volume/MC) with fallback to Jupiter Quote API.
- Hosting: Localhost for development; later Vercel for staging/production with Cloudflare DNS.
- Content: Start static using mirrored assets already in `disneysolana-nextjs/public/images` and fonts in `public/fonts`.

### Content Migration Plan
- Use existing mirrored assets in the repo to reconstruct the visual experience.
- Maintain current structure and styling (Disney++/Netflix style) per direction, while including visible disclaimers and no-affiliation notices.
- Validate image licensing and remove/replace any assets if later advised by counsel.

### Buy Flow Details
- Deep links: Provide Jupiter and Transit deep links prefilled with the contract address.
- Embedded: Render a Jupiter inline swap for convenience; fall back to deep links if rate or pool data is unavailable.
- Guides: Add a short “How to buy” walkthrough with wallet recommendations (Phantom/Solflare) and fiat on-ramp pointers.

### Analytics and Event Tracking
- Integrate GA4; optionally Plausible for lighter-weight tracking.
- Events: `connect_wallet`, `swap_submit`, `buy_click_jupiter`, `buy_click_transit`, `copy_contract`, `join_telegram`, `join_twitter`, `join_discord`, `email_submit`.
- Dashboards: Build a simple overview for traffic, conversion, and funnel tracking.

### Risks, Legal, and Compliance
- Prominent disclaimers: Not financial advice, high risk, no guarantees.
- No affiliation: Clearly state no affiliation with Disney, Netflix, or any trademark owners.
- Imagery/look-and-feel: Continue “as-is” for now per directive; reassess post-launch to reduce risk if needed.

### Environments and Deployment
- Development: Localhost (`npm run dev` from `disneysolana-nextjs`).
- Staging (when possible): `staging.disneysolana.com` on Vercel with preview deployments per PR.
- Production: `disneysolana.com` via Vercel; DNS on Cloudflare (or current provider) with fast rollback to `backup.disneysolana.com`.

### Operational Task List (MVP)
- Implement pages: Home, Buy (embedded Jupiter + deep links), Token, About/Story, FAQ, Legal.
- Add wallet adapter provider and connect button.
- Add price/ticker widget and integrate data polling with graceful fallback.
- Wire analytics and key events; add OG images and SEO metadata per page.
- Add disclaimers and no-affiliation notices site-wide (footer + Buy/Legal pages).
- QA mobile/desktop; verify links and flows.

### Dependencies and Open Items
- Token details pending (ticker, supply, decimals, mint/LP status, DEX pair links).
- Hosting/DNS access (for staging and production cutover) — not required for local development.
- Transcription of `data/convo1.png`, `data/convo2.png`, `data/convo3.png` to address every specific concern from Jamie in detail.

### Useful Links
- Contract address: `mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump`
- Quill AI check: `https://check.quillai.network/solana/mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump`
- Transit how-to-buy: `https://info.transit.finance/en/how-to-buy/Solana/Disney%2B%2B/27/mThpsDfZszxnjFZxZJphygpvoGEKtxae1xcpVpqpump`
- Current site: `https://disneysolana.com/`
- Local dev command: `cd disneysolana-nextjs && npm install && npm run dev`

### Repository Notes
- Key app code: `disneysolana-nextjs/src/app` with `page.tsx`, `layout.tsx`, and `globals.css`.
- Assets: `disneysolana-nextjs/public/images` (400+ images), `disneysolana-nextjs/public/fonts` (Avenir family), `disneysolana-nextjs/public/Disney-Whitepaper.pdf`.
- Original site backup: `disneysolana-nextjs/disneysolana_site/` (if present).

---

If any of the above assumptions change (branding, legal posture, token launch details, hosting), update this plan and proceed accordingly. Once token specifics and hosting access are confirmed, we can finalize the Buy page integrations and staging/production deployment steps.

### References
- AI Assistant plan: `docs/ai_assistant.md`
