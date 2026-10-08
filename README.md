# CoinPilot AI — Phase 1

**Next.js App Router, server/client boundaries, and TypeScript · Weeks 2–3**

A working technical foundation for the chat-first crypto copilot defined in [Module 1](https://github.com/PenielOkoli/coinpilot-ai). Explore sample signals, inspect a sample portfolio, review a simulated proposal, and save a risk preference. The original planning repository remains separate.

## Submission links

- Repository: https://github.com/PenielOkoli/coinpilot-ai-phase-1
- Live Vercel app: https://coinpilot-ai-phase-1.vercel.app
- [Architecture and Module 1 boundary mapping](docs/architecture.md)
- [Security checklist](docs/security-checklist.md)
- [AI SDK boundary note](docs/ai-sdk-boundary.md)
- [Deployment guide](docs/deployment.md)
- [Assessment evidence](docs/assessment.md)

## Run locally

Use Node.js 22 or later.

```bash
npm ci
npm run dev
```

Visit http://localhost:3000. No credentials are needed for the demo.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm start
```

Browser tests use a dedicated local port (3147). Windows uses installed Microsoft Edge; on Linux, first run `npx playwright install --with-deps chromium`.

An optional GitHub Actions workflow is provided at `docs/ci-example.yml`. To enable it later, place it at `.github/workflows/ci.yml` using a GitHub authorization that permits workflow changes. Vercel deployment is already connected to this repository.

## What works

- Responsive overview, copilot conversation, portfolio, preferences, and architecture page.
- `POST /api/chat` accepts a bounded, validated question and returns a typed scripted response with sample-source metadata.
- A data-outage switch exercises the degraded state: “AI couldn't verify this.”
- A Server Action validates sample proposal review. Approving requires an explicit simulation acknowledgement; rejecting does not. No trade endpoint exists.
- A separate Server Action validates and saves a non-sensitive risk preference in an HttpOnly cookie. The Server Component reads it on the next load.
- `ai` and `@ai-sdk/anthropic` are installed. A server-only adapter uses `generateText`; it is intentionally not reachable from the unauthenticated demo.

## Scope and limitations

This is a Phase 1 foundation, not the final trading product. All prices, balances, signals, and responses are illustrative. The public demo does not call a model, fetch market data, connect a wallet, or execute orders. Proposal reviews and displayed messages reset on refresh; messages are held only in React memory, not localStorage. The demo endpoint processes one question at a time and has no persistent conversation memory.

Authentication, durable server-side sessions/history/preferences, grounded tool use, streaming model responses, production quotas, and audited single-use approval tokens belong to later modules. The original Module 1 performance and accuracy targets are future targets, not measured achievements of this scaffold.

## Environment variables

Copy `.env.example` to `.env.local` if working on the optional provider adapter. Set `ANTHROPIC_API_KEY` and an `ANTHROPIC_MODEL` available in your account. Neither variable has the `NEXT_PUBLIC_` prefix. Do not put secrets in React props, source files, logs, or Git. The public foundation runs without these values.

## Structure

```text
src/app/page.tsx                 Server Component: initial data and preferences
src/app/architecture/page.tsx    Server Component: readable boundary explanation
src/components/dashboard.tsx    Client Component: interaction and transient UI state
src/app/actions.ts              Server Actions: validated demo review/preferences
src/app/api/chat/route.ts        Route Handler: bounded request and typed response
src/lib/server/ai.ts             server-only Anthropic / AI SDK adapter
src/lib/server/preferences.ts    server-only cookie access and validation
src/lib/validation.ts            Runtime schemas for untrusted input
src/types/domain.ts              Shared messages, sources, tools, proposals, results
tests/boundaries.test.ts         Input, route, approval, and fallback checks
docs/                           Assessment and architecture evidence
```

The UI uses Lucide icons and locally bundled DM Sans and Manrope variable fonts, with system-font fallbacks. No third-party font request is needed at runtime.
