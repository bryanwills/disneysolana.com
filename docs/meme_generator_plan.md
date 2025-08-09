## Meme Generator Project — Technical and Product Plan (Standalone)

This document defines a separate project to generate meme “poster” assets similar to what the site displays. It is intentionally brand‑agnostic for IP risk control.

### Goals
- Generate consistent, high-quality meme/poster images with text overlays (title, subhead, badges).
- Provide simple API + web UI to create, preview, and export assets for the main site or social channels.
- Keep legal risk low: avoid using protected logos/marks; include “no affiliation” notices in the UI.

### Architecture Overview
- web/ (Next.js or React): Prompt builder, template selection, live preview, download/export.
- api/ (Node/Express or Python/FastAPI): REST endpoints `POST /generate`, `POST /batch`, `GET /jobs/:id`.
- worker/: Provider adapters to call image‑gen (Replicate/Fal/Stability) or self‑hosted ComfyUI; compositor for text overlays.
- storage/: Local in dev; S3/R2 + CDN in prod. Metadata stored with image URL + prompt/seed.
- templates/: Canvas overlay templates, fonts, and presets.

### Generation Options
- Phase 1 (fastest): Cloud providers
  - Replicate (SDXL/Juggernaut), Fal, or Stability SDK.
  - Pros: No GPU ops, scalable; Cons: Per‑image cost.
  - Cost: ~$0.02–$0.08 per 1024×1024 image (varies).
- Phase 2 (scale later): Self‑host GPU
  - ComfyUI/Automatic1111 on RunPod/AWS/GCP (A10/A100). Cost ~$0.50–$1.20/hr; ~100–300 imgs/hr @ 768–1024px.

### API Design (MVP)
- POST /generate
  - Body: { prompt: string, stylePreset?: string, seed?: number, aspect?: '1:1'|'2:3'|'3:2'|'16:9', guidance?: number }
  - Result: { id, status: 'completed', imageUrl, meta: { prompt, seed, model } }
- POST /batch: array of prompts → array of job IDs
- GET /jobs/:id: { status, imageUrl?, error? }

### Worker Adapters
- replicate.ts / fal.ts / stability.ts: call provider, retrieve image.
- comfy.ts: call a self‑hosted ComfyUI server when available.
- Safety filter: optional NSFW/profanity check on prompts.

### Compositing & Templates
- Node canvas (skia‑canvas/canvas) or sharp + satori to overlay text (title/subhead/badges) with stroke/glow/shadow.
- Export: WebP/PNG in multiple sizes (e.g., 480w, 768w, 1024w, 1600w) for responsive usage.
- Optional: generate a 2–4s WebM/MP4 loop based on subtle zoom/pan (client‑side via CSS/JS or offline render).

### Style Consistency (Phase 2)
- Train a LoRA on your best outputs for a signature style (not IP‑infringing).
- 20–60 curated images; caption set; train with Kohya/ComfyUI LoRA nodes.
- Cost: a few GPU hours ($2–$10) + manual curation.

### Control/Layout (Optional)
- ControlNet with lineart/scribble poses for consistent framing.
- Upload a rough grid/silhouette → generate within template constraints.

### Web UI (MVP)
- Prompt input, preset selector, seed control, aspect ratio.
- Template selection: “Poster A/B/C”, “Badge: NEW/ORIGINAL/STAR”.
- Preview pane with text overlays; export button to download or save to bucket.
- Optional auth (simple passcode) to prevent abuse until rate limits are in place.

### Storage and Delivery
- Dev: save to /public and local disk.
- Prod: push to S3/R2; serve via CDN with long TTL immutable URLs; metadata JSON alongside image.

### Rate Limiting & Logging
- Basic: per‑IP rate limit (e.g., 30 req/hr) via middleware (Upstash Ratelimit, Redis, or in‑memory token bucket).
- Logs: prompt, seed, model, generation time, image URL. Avoid storing PII.

### Legal & IP
- Do not use protected logos/marks; avoid confusingly similar trade dress.
- UI disclaimer: “No affiliation with Disney, Netflix, or trademark owners. For memes only.”
- Train only on your own outputs or permissive datasets; avoid third‑party copyrighted training sets.

### Costs (Indicative)
- Phase 1 (provider API): $20–$150/mo depending on volume.
- Hosting (Vercel for web + serverless API): $20–$40/mo.
- Storage/CDN (R2/S3 + Cloudflare): $5–$20/mo initially.
- Phase 2 (GPU self‑host): $0.5–$1.2/hr for generation windows; autoscale.

### Roadmap
- Week 0–1: New repo, Replicate integration, POST /generate, canvas overlays, web UI preview/export.
- Week 1–2: Batch jobs, job status polling, S3/R2 storage; preset library; rate limit.
- Week 2–4: LoRA training for style cohesiveness; ControlNet for layout; WebM loop generation.

### Repo Scaffold (example)
```
disneysolana-meme-gen/
  web/ (Next.js)
  api/ (Express/FastAPI)
  worker/
    providers/ (replicate.ts, fal.ts, comfy.ts)
    compositor/ (canvas.ts)
  storage/ (s3.ts, r2.ts)
  templates/ (fonts/, overlays/, presets.json)
  scripts/ (lora-train/, batch-generate/)
```

### Getting Started (Fast Path)
1) Create new repo and Vercel project (web) + serverless API or small Node service.
2) Implement `POST /generate` with Replicate SDXL 1024 + default prompts; return image.
3) Add Node canvas overlays; export WebP/PNG multiple sizes.
4) Save to local `/public` in dev; switch to S3/R2 in prod.
5) Add rate limiting; add basic auth if public.
6) (Optional) Add LoRA after 20–60 good samples.
