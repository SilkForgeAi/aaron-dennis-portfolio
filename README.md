# aaron-dennis-portfolio

Aaron Dennis's one-page portfolio for his application to Fredrin's Forward Deployed
Engineer role. It answers three questions: who I am, what I've actually built
(Grid AI, ADOM, Rain) and how to reach me.

It is a static Next.js site (App Router, React, strict TypeScript). This project runs
on local git with no remote.

## Setup

Requires Node.js 20.9 or newer.

```sh
npm ci && npm run dev
```

Then open http://localhost:3000.

## Build and preview

```sh
npm run build      # static export to out/
npm run start      # serves out/ at http://127.0.0.1:3000 (zero-dependency Node server)
```

The build downloads the fonts once (via `next/font`) and bundles them into `out/`, so
`npm run build` needs network access. The built site makes no runtime requests to Google.

Other scripts: `npm run lint`, `npm run typecheck`.

## Verification

Dev-only scripts drive the real built site in headless Chromium (Playwright). Serve
`out/` first (`PORT=4317 npm run start`), then:

```sh
npx playwright install chromium   # once
npm run verify:links    # external links return 200, mailto is exact, every #anchor resolves
npm run verify:a11y     # axe-core at 1440px and 390px; fails on serious/critical violations
npm run verify:screens  # screenshots at 1440/768/390/320, horizontal-overflow and keyboard tab-order checks
```

Output lands in `evidence/` (git-ignored). The full procedure (doctor, launch, drive,
evidence, cleanup) is the `verify-app` skill in `.claude/skills/verify-app/`.

## Deployment (instructions only — not done yet)

Nothing has been deployed. Do not deploy without Aaron's approval.

**Vercel via Fredrin's Vercel app**

1. Add a git remote and push the repository to GitHub.
2. In Fredrin, open the project's Vercel app and link the repository to a Vercel project.
3. Vercel detects Next.js. Keep the defaults: build command `next build`, Node 20+. With
   `output: "export"` the build emits static files; no server or environment variables
   are needed.
4. Each branch then gets a preview deployment, and merging to `main` deploys production.

**Any static host**

Run `npm run build` and upload the contents of `out/` to the host (Netlify, Cloudflare
Pages, GitHub Pages, S3 + CloudFront, nginx …). Serve `index.html` at `/` and `404.html`
for unknown paths.

## Implementation decisions

- **Static Next.js.** The site is one page of fixed content. `output: "export"` gives
  plain HTML/CSS with almost no JavaScript, works on any static host and still uses the
  standard `next build`, so Vercel previews work with no custom server.
- **No database.** The site stores nothing, so there is no database and no
  docker-compose. If one is ever needed: Docker Postgres when `docker info` exits 0,
  otherwise SQLite.
- **Fonts.** Newsreader (serif headings), Inter (body) and JetBrains Mono (labels), all
  self-hosted with `next/font` at build time.
- **Styling.** One global stylesheet of CSS custom properties plus CSS Modules. No UI kit,
  CSS-in-JS runtime or animation library.
- **Accessibility.** Semantic landmarks, one `h1` and an ordered heading outline, a
  skip-to-content link, an accent-colored `:focus-visible` outline, AA contrast, and
  motion (smooth scroll, hover transitions) turned off under
  `prefers-reduced-motion: reduce`. On narrow screens the nav becomes an in-page link
  row, so it needs no JavaScript and stays keyboard-reachable. External links open in
  the same tab.
- **Content accuracy.** All copy lives in `app/content.tsx`. Nothing is invented: no
  degree, employer, customers, revenue, team size, endorsements, metrics or benchmark
  numbers, and independent projects are never described as employment. Grid AI's stack
  is "Electron · Python · built on openhands-sdk" (never TypeScript) and is labeled a prerelease source
  preview. ADOM carries no benchmark numbers and says it is a bounded reference
  implementation. Rain is private: it shows "Private repository · available to discuss"
  and has no link.
