# Why the AI SDK sits where AI meets the frontend

CoinPilot's interface should work in terms of a question, an explanation, sources, and a proposal. It should not need to understand Anthropic's HTTP request format or hold an API key.

The `ai` package gives the server a common TypeScript generation API. `@ai-sdk/anthropic` translates that call into the selected provider's request and response format. Next.js owns rendering, HTTP routes, and Server Actions; React owns user interaction. Our server sits between those concerns and chooses what can safely cross the boundary.

In `src/lib/server/ai.ts`, the server creates an Anthropic adapter and calls `generateText`. The provider and key stay there. A future authenticated route can convert that result into the same `Message` interface already used by the dashboard. That lets us change interface components without rewriting provider access, and change a provider without teaching every component a new API. It does not make model capabilities, costs, outputs, or safety behavior interchangeable; those still need evaluation.

The SDK does not supply authorization, trustworthy market evidence, or permission to trade. Those remain application responsibilities. For Phase 1, the adapter is installed and typechecked but the public chat endpoint uses clearly labeled scripted responses. A key is therefore optional and reviewers can test the full foundation without incurring model charges.

Reference: [Vercel AI SDK introduction](https://ai-sdk.dev/docs/introduction).
