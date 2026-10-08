# Phase 1 assessment evidence

| Requirement | Evidence |
| --- | --- |
| Next.js App Router with TypeScript | `src/app`, strict `tsconfig.json`, Next.js/React dependencies and production build |
| Server Components | `src/app/page.tsx` reads preferences; architecture route renders static educational content |
| Client Components | `src/components/dashboard.tsx` owns drafts, navigation, and pending/result UI |
| Server Actions | `src/app/actions.ts`: validated preference mutation and simulated proposal review |
| Shared messages, tools, sources | `src/types/domain.ts`, used in the route, UI, and fixture contracts |
| Environment variables / secret boundary | `.env.example`, ignored local env files, `server-only` AI adapter |
| Security checklist | `docs/security-checklist.md`, with current controls and later release gates |
| Brief mapped to server vs client | `docs/architecture.md`, covering each Module 1 capability and current scope |
| Vercel AI SDK and provider adapter installed | `ai` and `@ai-sdk/anthropic` in package manifest/lockfile; typed adapter |
| AI / frontend boundary explained | `docs/ai-sdk-boundary.md` and `/architecture` |
| GitHub and live Vercel links | README submission links, updated after successful publication |

## Review walkthrough

Use the three suggested questions. Inspect the explicit source labels. Switch on the outage simulation and ask again. Approve and reject the demo card. Save a preference and refresh. The workflows demonstrate client interaction crossing validated server boundaries without pretending to implement a live trading system.

## Verification record

Verified 8 October 2026:

- Production build succeeds locally and on Vercel.
- ESLint and strict TypeScript checks pass.
- All 7 automated boundary tests pass.
- Desktop and phone browser tests pass: normal chat, outage fallback, guarded approval, rejection, preference persistence, portfolio display, architecture navigation, and a 390px viewport with no horizontal overflow.
- `npm audit` reports zero vulnerabilities across production and development dependencies at verification time.
- [Live deployment](https://coinpilot-ai-phase-1.vercel.app) responds successfully.

No live model, financial action, or original Module 1 latency/accuracy target is claimed as tested. Accessibility checks cover semantic labels, visible focus styles, and exercised navigation; this is not a full WCAG audit.
