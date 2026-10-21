---
name: verify-app
description: Launch, health-check, drive and capture evidence for the Aaron Dennis portfolio (a static Next.js export). Use when asked to verify, run, screenshot or prove a change to the portfolio page works, or before finishing any ticket that touches `app/`.
---

# verify-app — Aaron Dennis portfolio

The site is a single static page built by `next build` into `out/`. Verification
serves that real build and drives it with Playwright (Chromium). Nothing here
deploys or publishes anything.

Defaults: port **4317**, base URL `http://127.0.0.1:4317`, evidence in `evidence/`
(git-ignored). Override with `PORT`, `BASE_URL` and `EVIDENCE_DIR`.

## 1. Doctor (read-only)

Run before launching. It changes nothing.

```sh
node -v                                   # must be >= 20.9 (Next.js 16 requirement)
test -f out/index.html && echo "out/ ok" || echo "out/ missing — run the Launch build"
lsof -nP -iTCP:4317 -sTCP:LISTEN || echo "port 4317 free"
node -e 'const fs=require("fs");const p=require("playwright").chromium.executablePath();console.log(fs.existsSync(p)?"chromium ok":"chromium missing — run: npx playwright install chromium")' 2>/dev/null || echo "playwright not installed — run: npm ci"
```

If port 4317 is taken by something you did not start, pick another `PORT` — never
kill a process you did not start.

## 2. Launch (from a clean checkout)

```sh
npm ci
npx playwright install chromium            # once per machine; no-op when already installed
npm run build                              # writes out/; fonts are fetched at build time, so it needs network
PORT=4317 node scripts/serve.mjs > evidence-server.log 2>&1 &
echo $! > .verify-app.pid                  # remember exactly which process we started
```

**Ready means usable**, not "the process is up". Poll until both hold (give up after ~15s):

```sh
page=$(mktemp)
for i in $(seq 1 30); do
  code=$(curl -s -o "$page" -w '%{http_code}' http://127.0.0.1:4317/)
  [ "$code" = 200 ] && grep -q "I build tools that let people direct AI agents" "$page" && echo READY && break
  sleep 0.5
done
rm -f "$page"
```

## 3. Drive

One route: `/` (`out/index.html`). Unknown paths return `out/404.html` with a 404.

| What | Selector / anchor |
|---|---|
| Skip link (first Tab stop) | `a.skip-link[href="#main"]` → focuses `main#main` |
| Header name | `header#top > div > a[href="#top"]` |
| Primary nav | `nav[aria-label="Primary"] a` → `#work`, `#how-i-work`, `#contact` |
| Hero | `section[aria-labelledby="hero-title"]`, `h1#hero-title`, facts `dl` |
| Hero buttons | `a[href="#work"]` ("See what I've built ↓"), `a[href="https://github.com/SilkForgeAi"]` ("GitHub ↗") |
| Featured work | `section#work`, cards `article#grid-ai`, `article#adom`, `article#rain` |
| How I work | `section#how-i-work ol li` (5 steps) |
| Forward deployed engineering | `section#forward-deployed` |
| Contact | `section#contact a[href^="mailto:"]`, `section#contact a[href="https://github.com/SilkForgeAi"]` |

The feature files below say what each section must show.

Scripted drives (each exits non-zero on failure and writes to `evidence/`):

```sh
npm run verify:links     # external links 200, mailto exact, every #anchor resolves → evidence/link-check.txt
npm run verify:a11y      # axe at 1440 and 390px, fails on serious/critical → evidence/a11y.txt
npm run verify:screens   # screenshots 1440/768/390/320 + overflow + keyboard tab order → evidence/page-*.png, screens-keyboard.txt
```

`verify:links` needs network to reach GitHub. A network error is **inconclusive**, not a pass.

## 4. Evidence

Keep, at minimum:

- `evidence/page-1440.png` (desktop) and `evidence/page-390.png` (mobile) — also 768 and 320 from `verify:screens`
- `evidence/link-check.txt` — the link-check output
- `evidence/a11y.txt` and `evidence/screens-keyboard.txt`

In a Fredrin ticket, upload screenshots with `./.fredrin/fredrin ticket upload <file> --kind after --pair <slug>`.

## 5. Cleanup

Kill only the server this skill started, and keep `evidence/`:

```sh
kill "$(cat .verify-app.pid)" && rm .verify-app.pid evidence-server.log
```

## Feature map

- [features/hero.md](features/hero.md)
- [features/featured-projects.md](features/featured-projects.md)
- [features/how-i-work-fde.md](features/how-i-work-fde.md)
- [features/contact.md](features/contact.md)
