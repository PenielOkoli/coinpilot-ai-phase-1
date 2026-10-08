# Deploy to Vercel

## GitHub import

1. Push this project to its own GitHub repository.
2. In Vercel, choose **Add New → Project**, import that repository, and select Next.js.
3. Use the repository root, Node.js 22.x, `npm ci`, and `npm run build`. Keep the standard Next.js output directory.
4. Deploy with no environment variables for the public demo. Never add an exchange key.
5. Open the production domain and verify the flows below. Put the actual working URL in the README submission links.

## CLI alternative

```bash
npm ci
npm run check
npx vercel login
npx vercel --prod
```

The first CLI deployment creates/link a project. Keep generated `.vercel` files out of Git. Connect the GitHub repository in Vercel's Git settings to enable automatic deployments after a CLI deployment.

## Environment handling

For later private integration testing, configure `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` in Vercel's environment settings and redeploy. Keep production and preview credentials separate. The current public demo remains scripted regardless of those values; enabling paid inference requires code changes and the release gates in the security checklist.

## Verify the live deployment

1. Open `/` and confirm that the sample-data notice is visible.
2. Ask “Explain the BTC signal”; check the source and unassessed-confidence labels.
3. Enable “Simulate data outage” and submit again; check the explicit verification failure.
4. Try approving without acknowledgement (disabled), then acknowledge and approve. Confirm “No trade was placed.” Reset and reject.
5. Open Preferences, choose a different risk level, save, and refresh. Confirm it survives via the cookie.
6. Open `/architecture`; check its server/client/action explanation.
7. Check a narrow phone layout and keyboard focus. Confirm responses and long messages stay within the viewport.
