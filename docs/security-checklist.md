# Basic security checklist

Checked items describe this foundation. Unchecked items are release gates for later live functionality, not claims of production readiness.

## Secrets and privacy

- [x] `.env*` is ignored except the blank `.env.example`; `.vercel` is ignored.
- [x] `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` are only read in a module importing `server-only`.
- [x] No secret uses `NEXT_PUBLIC_`, appears in React props, or is put in a prompt/response.
- [x] No exchange keys are accepted or required. No wallet is connected.
- [x] Request bodies and credentials are not logged by application code.
- [x] Conversation UI uses React memory only; no localStorage or persisted history.
- [x] Risk cookie is HttpOnly, SameSite=Lax, Secure in production, limited to an allowlisted enum, and expires in 7 days.
- [ ] Before real sessions: authenticated identity, user-scoped persistent storage, retention/deletion rules, and access-control tests.
- [ ] Before model use: confirm provider retention terms and minimize the context sent.

## Input and output boundaries

- [x] Chat accepts only JSON, checks origin when present, caps actual body size at 8 KiB, limits text to 1,000 characters, and rejects unknown fields.
- [x] A client cannot submit `system` roles, arbitrary tool names, or model configuration to the endpoint.
- [x] Form values and direct Server Action arguments are validated on the server.
- [x] Proposal review accepts only the known fixture ID and explicit approve/reject enum. Approval requires acknowledgement.
- [x] No trade execution route or exchange adapter is implemented.
- [x] React renders text without `dangerouslySetInnerHTML`; model-like text does not become executable markup.
- [x] Error messages returned to users do not expose stack traces or provider internals.
- [x] Response metadata explicitly marks sample provenance and unassessed confidence.
- [x] Security headers disable MIME sniffing, framing, camera, microphone, and geolocation.
- [ ] Before a paid model endpoint: real authentication, durable distributed rate limits and spending quotas. Origin checks are not authentication, and non-browser callers can omit Origin.
- [ ] Before live tools: allowlisted tool schemas, timestamp freshness checks, timeouts, bounded outputs, and prompt-injection defenses. Model output is untrusted.
- [ ] Before trading: exact proposal binding, server-side risk checks, expiring single-use approval tokens, idempotency, audit records, and re-authentication where needed.
- [x] Fonts are bundled locally; no third-party font requests are needed at runtime.
- [ ] Before production hardening: nonce-based Content Security Policy compatible with Next.js.

## Verification

- [x] Boundary tests cover invalid roles/fields, oversized and malformed requests, wrong origins/content types, forged proposal IDs, missing approval acknowledgement, and outage labeling.
- [x] Strict TypeScript is enabled; build and lint commands are provided.
- [x] Public demo never invokes the paid provider even when a key is configured.
- [ ] Production model calls and exchange execution are not tested or enabled in this phase.

Dependency versions are locked in `package-lock.json`. Run `npm audit` as part of dependency maintenance. Do not treat any lockfile or checklist as a permanent security guarantee.
