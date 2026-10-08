import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, ShieldCheck } from "lucide-react";
export const metadata = { title: "Architecture — CoinPilot AI" };
export default function ArchitecturePage() {
  return (
    <main id="main" className="architecture-page">
      <Link href="/" className="back-link">
        <ArrowLeft size={16} /> Back to workspace
      </Link>
      <div className="brand-mark">
        <Compass />
      </div>
      <span className="eyebrow">PHASE 1 · TECHNICAL FOUNDATION</span>
      <h1>
        Clear boundaries.
        <br />
        Safer foundations.
      </h1>
      <p className="architecture-intro">
        CoinPilot brings the Module 1 product brief into a typed Next.js
        application. Each layer has a deliberate responsibility.
      </p>
      <div className="boundary-flow">
        <div>
          <span>01</span>
          <h2>Browser</h2>
          <p>Inputs, navigation, chat display, and explicit demo review.</p>
        </div>
        <ArrowRight />
        <div>
          <span>02</span>
          <h2>Next.js server</h2>
          <p>
            Initial rendering, input validation, preferences, and response
            contracts.
          </p>
        </div>
        <ArrowRight />
        <div>
          <span>03</span>
          <h2>AI provider</h2>
          <p>
            A server-only Anthropic adapter, ready for a later authenticated
            integration.
          </p>
        </div>
      </div>
      <section>
        <h2>Three concepts, applied</h2>
        <dl>
          <dt>Server Components</dt>
          <dd>
            The home page reads validated preferences on the server and passes
            safe, serializable data to the dashboard. This architecture page is
            also a Server Component.
          </dd>
          <dt>Client Components</dt>
          <dd>
            The dashboard uses React state for tabs, drafts, pending states, and
            displayed messages. The “use client” boundary enables browser
            interaction; initial HTML may still be rendered on the server.
          </dd>
          <dt>Server Actions</dt>
          <dd>
            Saving a preference and reviewing a sample proposal run on the
            server. Both validate their inputs. A server action is an externally
            callable endpoint, not an authorization mechanism.
          </dd>
        </dl>
      </section>
      <section>
        <h2>Where AI meets the frontend</h2>
        <p>
          The AI SDK translates a common TypeScript generation call into a
          provider-specific request. Our server chooses Anthropic and holds its
          key; React consumes our own message contract. Changing the provider
          should mainly affect the server adapter, while changing the interface
          should mainly affect React. Provider behavior and model capabilities
          still need testing when switching.
        </p>
      </section>
      <section>
        <h2>Honest about the current scope</h2>
        <p>
          This public foundation uses scripted responses and sample market data.
          No paid model endpoint, exchange connection, authentication, database,
          or persistent conversation history is enabled. A non-sensitive risk
          preference is stored in a validated HttpOnly cookie. Approval is a
          simulation and resets on refresh.
        </p>
        <p>
          Later modules must add authenticated server sessions, durable per-user
          storage, market-data tools, rate limits, and single-use approval
          tokens bound to the exact proposal before trading can be considered.
        </p>
      </section>
      <div className="architecture-callout">
        <ShieldCheck />
        <p>
          Secrets stay in server-only modules. Inputs are untrusted at every
          server boundary. No path in this application can place a trade.
        </p>
      </div>
    </main>
  );
}
