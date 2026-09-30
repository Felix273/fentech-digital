# FenTech Digital — Engineering Review

**Review scope:** repository at commit `68ec9d5` (single shallow checkout), covering code quality, performance, security, UX/accessibility, SEO, missing features, and technical debt.

**Change safety:** no application source files were modified. This is a read-only review with staged recommendations designed to preserve current behavior.

## Executive summary

This is a solid early-stage Next.js 16/React 19 marketing site with a useful CMS/admin foundation, sensible fallback content, server-rendered route pages, and escaped email HTML. The highest-value work is not a visual rewrite; it is production hardening around the public contact endpoint and admin portal, followed by caching/media optimization and a small amount of UX/SEO cleanup.

### Priority snapshot

| Priority | Area | Finding | Impact | Effort |
|---|---|---|---:|---:|
| P0 | Security/reliability | Admin login accepts a plaintext password fallback and has no rate limiting | Critical | S |
| P0 | Security/abuse | Contact API and admin login are unthrottled; honeypot alone will not stop automated abuse | High | M |
| P0 | Security | Admin media upload accepts arbitrary file types and any normalized path, and publishes files publicly | High | M |
| P1 | Reliability | Contact is inserted before email notification; a Resend failure returns 500 after the lead is stored | High | M |
| P1 | Performance | Every public page is forced dynamic and performs a Supabase service-role query; metadata can query again | High | M |
| P1 | Performance | Portfolio uses raw `<img>` and remote `image.thum.io` screenshots, causing slow/fragile image delivery | High | M |
| P1 | SEO/correctness | Sitemap contains `/case-studies` (not a route), omits `software-development` and `ai-automation`, and uses a stale hardcoded URL | Medium/High | S |
| P1 | Quality | No automated tests, no CI workflow, no typecheck script, and no deployment/operations documentation | High | M |
| P2 | UX/accessibility | Mobile menu has no controlled dialog/focus behavior; motion/CTA behavior is not fully reduced-motion or keyboard-friendly | Medium | M |
| P2 | Maintainability | Several legacy client components are unused, and a second contact form duplicates API behavior | Medium | M |
| P2 | Compliance/trust | Analytics/ads load without consent state; privacy copy does not document providers, retention, or Kenya NDPA responsibilities | Medium/High | M |
| P3 | Product | Admin CMS has no audit trail, preview/draft workflow, pagination, search/filtering, or lead export | Medium | M/L |

## 1. Security and reliability

### 1.1 Remove plaintext admin-password support and rate-limit login — P0

**Evidence:** `app/api/admin/login/route.ts:8-22` reads `ADMIN_PASSWORD_HASH` but falls back to `ADMIN_PASSWORD` and compares it directly. There is no attempt counter, IP/user throttling, lockout, or generic timing-safe path for unknown users.

**Why it matters:** a leaked environment variable immediately becomes a usable admin credential. Internet-facing password endpoints without throttling are vulnerable to credential stuffing and brute force. The admin session controls CMS publishing, lead access, and public media.

**Next steps:**

1. Require `ADMIN_PASSWORD_HASH`; fail deployment/startup if it is missing.
2. Remove `ADMIN_PASSWORD` from `.env.example` and deployment configuration.
3. Add a shared rate limiter backed by Redis/Upstash or a provider edge limit. Suggested starting policy: 5 failures per IP/email pair per 15 minutes, then a 429 with `Retry-After`.
4. Validate `ADMIN_JWT_SECRET` length/entropy at startup; reject known placeholders.
5. Add an admin-only `aud`/`iss` claim and explicitly restrict the JWT algorithm (`HS256`).
6. Consider replacing the custom credential flow with Supabase Auth or an identity provider if more than one admin is needed.

Representative shape:

```ts
if (!adminEmail || !adminPasswordHash || !process.env.ADMIN_JWT_SECRET) {
  return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
}

const key = `${request.headers.get("x-forwarded-for") ?? "unknown"}:${String(email).toLowerCase()}`;
if (await loginLimiter.isBlocked(key)) {
  return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
}
const passwordMatches = await bcrypt.compare(String(password), adminPasswordHash);
if (!passwordMatches) {
  await loginLimiter.recordFailure(key);
  return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
}
await loginLimiter.clear(key);
```

### 1.2 Protect contact and admin endpoints from abuse — P0

**Evidence:** `app/api/contact/route.ts:22-36` accepts arbitrary POST volume. The only anti-bot control is a client-side honeypot field checked at line 26. Admin mutations similarly rely only on the JWT cookie.

**Risks:** spam rows, notification/email cost, database growth, and denial of service. A browser can call the endpoint directly without rendering the form.

**Next steps:**

- Add edge/IP rate limiting to `/api/contact`, `/api/admin/login`, `/api/admin/media`, and CMS mutation routes.
- Add a server-side origin check for state-changing browser requests (`Origin`/`Host` allowlist); keep `SameSite=Lax`, but do not treat it as the sole CSRF control.
- Add a CAPTCHA/Turnstile challenge only after the rate limit or when risk is high; do not make legitimate Kenyan mobile users solve a challenge on every request.
- Validate `Content-Type`, reject malformed/oversized JSON, and reject overlong values instead of silently truncating them.
- Add structured request IDs and log only metadata, not full lead messages or secrets.

### 1.3 Harden media uploads — P0

**Evidence:** `app/api/admin/media/route.ts:5-9, 23-37` allows images, videos, PDFs, or any other MIME type supplied by the browser, accepts arbitrary caller-provided paths, uses `upsert: true`, and returns a public URL.

**Risks:** public active content such as SVG/HTML, unwanted large media, overwriting existing assets, path collisions, and storage abuse. The `..` replacement is not a robust path policy.

**Next steps:**

- Restrict to an allowlist such as JPEG/PNG/WebP/AVIF; reject SVG unless it is sanitized.
- Validate magic bytes server-side, not only `file.type` or extension.
- Use generated object keys, e.g. `uploads/${uuid}.${safeExtension}`; do not allow a user-supplied path to overwrite an existing object.
- Enforce per-user/admin quota and separate image/document buckets if documents must be supported.
- If uploads are intended to be public, set a safe `Content-Disposition` and `X-Content-Type-Options: nosniff` at the serving layer.
- Add image dimension/pixel-count limits to prevent decompression bombs.

### 1.4 Make lead capture durable and idempotent — P1

**Evidence:** `app/api/contact/route.ts:50-66` inserts into Supabase, then `:72-92` sends email. If Resend fails, the catch at `:99-101` returns 500 even though the database row already exists.

**User impact:** visitors retry, creating duplicate leads; the team may receive a lead but the visitor sees failure.

**Recommended design:** treat database insertion as the successful source of truth, store `notification_status`/`notification_error`, and send notification asynchronously. At minimum:

```ts
// insert lead with notification_status: "pending"
// return 202/200 after the insert succeeds
try {
  await sendNotification(submission);
  await markNotificationSent(submission.id);
} catch (error) {
  await markNotificationFailed(submission.id, safeErrorCode(error));
  console.error("Lead notification failed", { submissionId: submission.id });
}
```

Add an idempotency key from the client (or a short-lived hash of normalized fields) and a unique/indexed `created_at`/status strategy for retries. Add `priority` and `user_agent` to the inserted record because the schema already supports them but the route currently ignores them.

### 1.5 Tighten Supabase authorization policy — P1

**Evidence:** `supabase-schema.sql` grants all authenticated users `for all` on `site_content` and grants authenticated users broad read/update access to submissions/storage. The application currently uses a separate admin JWT, but the database policies do not encode an admin role.

**Next steps:**

- Use a dedicated `app_metadata.role = 'admin'` claim, not merely `auth.role() = 'authenticated'`.
- Restrict content writes and submission reads/updates to that role.
- Keep public read/insert policies narrowly scoped to exact tables/operations.
- Add explicit checks for allowed `status`, `priority`, and content shapes at the database boundary.
- Add a migration test or documented policy verification query to deployment checks.

## 2. Performance and scalability

### 2.1 Replace unconditional dynamic rendering with bounded revalidation — P1

**Evidence:** public pages export `dynamic = "force-dynamic"` (`app/page.tsx:14`, and similarly services/about/work/contact/legal pages). `lib/cms-content.ts:290-309` performs a service-role Supabase query on each render and silently catches every failure.

**Impact:** slower first byte, more Supabase/Vercel invocations, less CDN reuse, and harder-to-diagnose outages. The site is mostly brochure content and does not need per-request freshness.

**Safer migration:**

1. Add a cached `getPublicCmsContent` using `unstable_cache` or `fetch`-style caching with a short `revalidate` (e.g. 60–300 seconds).
2. Invalidate the tag after a successful admin publish using `revalidateTag("public-cms")`.
3. Remove `force-dynamic` from public pages once the CMS read is cached.
4. Keep admin/API routes dynamic.
5. Distinguish “Supabase unavailable” from “empty content” in logs/metrics; do not swallow all errors silently.
6. Avoid fetching the same content separately for page render and `generateMetadata`; pass the cached result or share the cache key.

### 2.2 Optimize images and remote screenshots — P1

**Evidence:** `app/work/page.tsx:43-49` and `components/WorkShowcaseSection.tsx` use raw `<img>`. Many default case studies use `https://image.thum.io/...` screenshots (`lib/data/case-studies.ts`), which creates a runtime dependency on a third-party screenshot service.

**Next steps:**

- Capture and store portfolio screenshots in the project/CDN at build/content-publish time.
- Use `next/image` with explicit dimensions, `sizes`, and a tightly scoped `remotePatterns` list only if remote images must remain.
- Add low-quality placeholders and lazy loading for below-the-fold cards.
- Avoid inline duplicated sizing styles; centralize the media component.
- Set a stable aspect ratio to prevent layout shift.

### 2.3 Reduce client JavaScript and duplicated implementations — P2

**Evidence:** many mostly-presentational components are marked `use client`, and the repository contains unused legacy-looking components such as `About.tsx`, `Contact.tsx`, `Industries.tsx`, `Services.tsx`, `Testimonials.tsx`, `SuccessStories.tsx`, and `HomeSections.tsx`. There are also two contact form implementations (`ContactForm.tsx` and `ContactPageClient.tsx`).

**Next steps:**

- Keep data display and links as Server Components; isolate only the form, menu, and animation islands as client components.
- Prefer CSS transitions/IntersectionObserver over importing Framer Motion for simple reveal/hover effects.
- Remove unused components only after confirming no external route/import references; use a deprecation commit first if the project is actively edited.
- Centralize the contact form schema and submit hook so validation and behavior cannot drift.

## 3. SEO and correctness

### 3.1 Fix sitemap route coverage — P1

**Evidence:** `app/sitemap.ts:27` emits `/case-studies`, but the actual route is `/work`. It lists six services but omits `software-development` and `ai-automation`, both present in `lib/data/services.ts`.

**Next steps:** generate sitemap entries from the same service/case-study data used by the pages. Include `/work` and every featured service/case study. Use a stable `lastModified` from CMS `updated_at`, not `new Date()` on every request.

### 3.2 Make canonical domain and OG image real — P1

**Evidence:** `lib/seo/metadata.ts:5-6` hardcodes `https://fentech.digital` and `/og-image.jpg`, while the project has a generated `app/opengraph-image.tsx`. The comment says the domain/asset still need updating.

**Next steps:** set `NEXT_PUBLIC_SITE_URL` (validated at startup), use it for `metadataBase`, sitemap, robots, canonical URLs, and external links; set the OG image to the generated `/opengraph-image` route or a real static asset. Verify the production domain and social preview with an external crawler.

### 3.3 Add structured data and content governance — P2

- Add `Organization`/`LocalBusiness`, `WebSite`, `Service`, and `BreadcrumbList` JSON-LD where accurate.
- Replace unsupported claims such as “24/7 expert support”, “3x increase”, “HIPAA/Data”, “bank-grade”, and “100% compliance” unless they are documented and approved. This protects credibility and reduces legal/marketing risk.
- Use CMS-controlled social URLs instead of `https://linkedin.com` (`components/Footer.tsx`).
- Add a visible, descriptive focus state and validate heading order on each route.

## 4. UX and accessibility

### 4.1 Improve mobile navigation semantics — P2

**Evidence:** `components/Navbar.tsx:73-122` exposes `aria-expanded` but does not provide `aria-controls`; the menu panel is a plain `div`, with no focus trap, focus return, or inert background. Escape closes it, but keyboard users can tab into the page behind it.

**Next steps:** give the panel an ID, use `aria-controls`, `role="dialog"`/`aria-modal="true"` when open, move focus to the close button, trap focus, return focus to the trigger, and prevent background interaction. Add a backdrop click target with an accessible label.

### 4.2 Make CTAs functional and motion respectful — P2

- `components/Industries.tsx:37-44` has a “View All Industries” button with no action.
- The “Schedule a Free Consultation” control in the legacy contact component is also a button without an action.
- `components/FloatingCTA.tsx:52-105` uses hover-only tooltips and repeated `animate-ping`; respect `prefers-reduced-motion`, use links for phone/WhatsApp, and expose text on focus/touch.
- Add `aria-live="polite"` to contact submission status and focus the error/success summary after submit.
- Add `autocomplete` tokens (`given-name`, `family-name`, `organization`, `tel`, `email`) and `maxLength` to form controls.
- Replace raw `<img>` and CSS background-image content where meaningful alt text is needed; the about story image is currently a role=img background (`app/about/page.tsx:35-40`).

### 4.3 Validate mobile/slow-network behavior

The visual design is animation-heavy and contains several large media assets. Add Playwright smoke tests for navigation, form success/error, admin guard, and 404; run Lighthouse/mobile checks on a throttled connection. Do not optimize solely from desktop scores.

## 5. Privacy and compliance

**Evidence:** Google Analytics is loaded whenever `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present (`app/layout.tsx:95-97`), and AdSense/AfriAds components can load third-party scripts. The privacy page is generic and does not identify analytics/advertising vendors, purposes, retention, international transfers, consent choices, or a clear controller/complaints path.

**Recommended product change:** implement an explicit consent state before non-essential analytics/advertising scripts load, with a persistent preferences control. Update the privacy notice with the actual providers, categories, legal basis/consent language, retention, rights request process, and Kenyan Data Protection Act/NDPA responsibilities after legal review. This is a business/legal review item, not a substitute for counsel.

## 6. Quality and technical debt

### Confirmed repository gaps

- `package.json` has `lint`, but no `typecheck`, `test`, `test:e2e`, or `format` scripts.
- No `.github` workflow or CI configuration was present.
- `tsconfig.json` has `strict: false`; `allowJs: true` is unnecessary for this TypeScript codebase.
- `@types/bcryptjs` is deprecated/stubbed because bcryptjs ships its own types.
- `npm audit --omit=dev --audit-level=moderate` reported 9 vulnerabilities in the installed lockfile tree (4 moderate, 4 high, 1 critical), including the pinned Next.js 16.1.2 dependency chain. The audit suggested updates including Next 16.3.7, but the update should be reviewed and tested rather than applying `--force` blindly.
- The README is still the create-next-app template and does not document environment setup, Supabase migrations/policies, admin bootstrap, deployment, rate limiting, or incident recovery.
- All public CMS errors are swallowed in `lib/cms-content.ts:305-307`; add observable logging with redacted context.

### Recommended baseline CI

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "build": "next build"
  }
}
```

CI should run `npm ci`, lint, typecheck, unit tests, build, and dependency audit. Add a preview smoke test that checks `/`, `/services`, `/work`, `/contact`, `/robots.txt`, `/sitemap.xml`, and an invalid route.

## 7. Missing features worth prioritizing

1. **Lead operations:** pagination/search/filtering, CSV export, notification retry state, assignment/owner, notes, and audit history.
2. **CMS safety:** draft/preview, publish confirmation, optimistic concurrency (`updated_at`), revision history, rollback, and content schema validation (Zod or equivalent).
3. **Observability:** error tracking, uptime check, route latency, contact conversion/error metrics, email-delivery status, and storage usage alerts.
4. **Trust/conversion:** testimonials only when verified, service-specific proof/results, clear response-time expectation, case-study source/date, and a working calendar/consultation CTA.
5. **Resilience:** backup/restore procedure for Supabase, documented secret rotation, and a tested admin recovery path.

## Suggested implementation sequence

### Sprint 1 — protect production (1–2 days)

- Remove plaintext password fallback; rotate admin/JWT secrets if they have ever been exposed.
- Add login/contact/admin rate limits and origin checks.
- Restrict upload MIME types, dimensions, extensions, object keys, and overwrite behavior.
- Add tests for auth guard, contact validation, honeypot, rate-limit responses, upload rejection, and status allowlist.

### Sprint 2 — preserve leads and speed up public pages (2–4 days)

- Make lead insert authoritative and notification retryable/idempotent.
- Cache CMS reads with tag invalidation after publish; remove `force-dynamic` from brochure routes.
- Replace remote screenshot/raw image usage with optimized managed assets.
- Add request IDs, error tracking, and safe operational logs.

### Sprint 3 — correctness, access, and discoverability (2–4 days)

- Generate sitemap from route data and fix canonical/OG configuration.
- Implement accessible mobile navigation and form live-region behavior.
- Replace dead CTAs and hardcoded contact/social values.
- Add consent-gated analytics/ads and revise privacy documentation.

### Sprint 4 — maintainability and product depth (1–2 weeks)

- Consolidate contact forms and remove confirmed dead components.
- Add strict TypeScript incrementally, CI, unit/e2e tests, and a real README/runbook.
- Add CMS revisions/preview and lead inbox workflow features.

## Validation note

`npm ci`, followed by lint/typecheck/build, could not complete in this sandbox because the npm registry connection reset twice with `ECONNRESET`. Therefore, no clean-build claim is made. The repository was statically inspected, the lockfile was read successfully, and `npm audit --omit=dev --audit-level=moderate` completed with the vulnerability results above. Re-run the full validation in CI or a network-stable environment before merging any changes.

## Overall assessment

**Good foundation, not yet production-hardened.** The architecture is appropriately small for a marketing/CMS site and has useful fallback behavior, but the custom admin/auth/upload/contact boundaries need hardening before the site should be treated as a low-maintenance production system. The safest high-return path is to fix those boundaries without changing page structure, then add caching and optimized media, then simplify the client/UI layer.
