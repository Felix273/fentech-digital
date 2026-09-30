# FenTech Digital — Production Performance and Analytics Review

**Review date:** 2026-09-30
**Target:** `https://fentech.co.ke/`
**Scope:** Newly deployed Linear-styled public dashboard, public secondary routes, admin entry view, Vercel response behavior, and visual-regression coverage.

## Measurement summary

A fresh Lighthouse run against the production homepage produced the following scores:

| Category | Score |
| --- | ---: |
| Performance | 79 |
| Accessibility | 96 |
| Best practices | 100 |
| SEO | 100 |

These are a controlled lab result from one run, not a replacement for field data. Repeat runs may vary with Vercel region, cache state, network, and external image hosts.

### Key metrics

| Metric | Result | Interpretation |
| --- | ---: | --- |
| First Contentful Paint | 2.9s | Above the 1.8s “good” target; the first meaningful paint can be faster. |
| Largest Contentful Paint | 2.9s | Close to the 2.5s target; hero rendering and document response are the main opportunities. |
| Speed Index | 11.4s | The largest lab weakness; the long visual completion window should be investigated. |
| Total Blocking Time | 140ms | Healthy; JavaScript is not currently blocking the main thread heavily. |
| Cumulative Layout Shift | 0 | Excellent layout stability. |
| Time to Interactive | 3.6s | Acceptable, but can improve with earlier content delivery. |
| Root document response | 1,490ms | Primary server-side opportunity despite the subsequent cache hit. |
| Unused JavaScript | ~65KiB estimated | Moderate bundle-cleanup opportunity. |

## Vercel response and caching observations

The checked public routes returned HTTP 200 and were served by Vercel with:

- `x-vercel-cache: HIT`
- `x-nextjs-prerender: 1` on brochure pages
- `x-nextjs-stale-time: 300`
- Vercel CDN responses from the production deployment

This confirms that the static/public route cache is active. The root document was approximately 82KB compressed/served in the inspected response, with smaller secondary pages. The 1.49s document-response figure suggests that cache misses, origin work, or CMS data retrieval still deserve measurement even though the sampled request was a cache hit.

## Analytics instrumentation review

The codebase currently has:

- A conditional Google Analytics component in `app/layout.tsx`.
- Analytics only loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.
- A placeholder measurement ID is documented in `.env.example`.
- `@vercel/speed-insights` is installed as a dependency, but no `SpeedInsights` component was found in the application tree.

No Vercel dashboard/GA account data was available through the connected repository session, so this review does not invent users, sessions, conversion rates, or field Core Web Vitals. The next analytics step is to configure a real measurement ID or wire Vercel Speed Insights, then observe 7–14 days of real traffic before making further performance decisions.

## Recommended priorities

### 1. Reduce document response and CMS work — high impact / medium effort

- Capture server timing around `getPublicCmsContent()` and its Supabase reads.
- Measure cold versus warm cache behavior by route and region.
- Keep public CMS reads behind the existing cache tag and avoid repeated reads across nested components.
- Consider a short-lived edge/API cache for content that changes infrequently.

### 2. Improve hero visual completion — high impact / medium effort

- Inspect the hero visual and above-the-fold image request waterfall.
- Keep the primary visual `next/image` request prioritized and correctly sized.
- Defer below-the-fold screenshots and non-critical decorative effects.
- Avoid loading portfolio screenshots before the first viewport needs them.

### 3. Reduce unused client JavaScript — medium impact / medium effort

- Audit the client components that import Framer Motion and Supabase.
- Keep interactive behavior in client islands and render static sections as server components where possible.
- Load analytics and advertising integrations after interaction or after the page becomes idle.

### 4. Establish field observability — high impact / low effort

- Configure GA4 with `NEXT_PUBLIC_GA_MEASUREMENT_ID`, or add `SpeedInsights` from `@vercel/speed-insights/next`.
- Track contact CTA clicks, completed contact forms, menu opens, and service-detail CTA clicks.
- Define a privacy/consent policy appropriate for the analytics provider.
- Review real-user LCP, INP, CLS, route latency, and conversion events weekly.

## Visual regression automation

Playwright visual regression now covers Chromium desktop and mobile baselines for:

- Homepage
- Services page
- Contact page
- Admin login view
- Open menu state

The suite stores 10 committed PNG baselines and runs on every push to `main` and every pull request. It builds the production app, starts it locally, runs Chromium at fixed desktop/mobile viewports, disables animations, and uploads Playwright traces/reports when a run fails.

Commands:

```bash
npm run test:e2e
npm run test:e2e:update
```

Baseline changes should be reviewed visually and committed intentionally with the corresponding UI change.
