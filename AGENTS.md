# AGENTS.md

Conventions for AI coding agents working in **aaron-dennis-portfolio**. This file is the
canonical entry point under the [AGENTS.md](https://agents.md) standard, and it
is the first thing a Fredrin Worker reads.

## Project

Aaron Dennis's one-page portfolio for his Fredrin Forward Deployed Engineer
application: who he is, what he has built (Grid AI, ADOM, Rain) and how to reach him.
A static Next.js export (App Router, React, strict TypeScript) in an "Editorial" design.
Local git only, no remote.

## Commands

| Task | Command |
|---|---|
| Install | `npm ci` |
| Dev server | `npm run dev` (http://localhost:3000) |
| Build (static export to `out/`) | `npm run build` — needs network once for `next/font` |
| Serve the build | `npm run start` (or `PORT=4317 node scripts/serve.mjs`) |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Verify (needs `out/` served on 4317) | `npm run verify:links`, `npm run verify:a11y`, `npm run verify:screens` |

To verify a change end to end, follow the `verify-app` skill
(`.claude/skills/verify-app/SKILL.md`, mirrored in `.agents/skills/verify-app/`).

## Conventions

- **Never deploy, publish or push without Aaron's approval.** That includes linking
  Vercel or adding a git remote.
- **Content accuracy.** Do not invent facts: no degree, employer, customers, revenue,
  team size, endorsements, metrics or benchmark numbers. Independent projects are not
  employment. Grid AI's stack line is "Electron · Python · built on openhands-sdk" (its desktop shell is plain JavaScript) — never claim TypeScript for it.
  ADOM gets no benchmark numbers. **Rain stays private**: no URL, only the "Private
  repository · available to discuss" note. If a claim isn't supported, leave it out.
- All page copy lives in `app/content.tsx`; layout in `app/page.tsx` and
  `app/components/`.
- Styling is CSS custom properties in `app/globals.css` plus CSS Modules. No UI kit,
  CSS-in-JS runtime or animation library; any motion must be disabled under
  `prefers-reduced-motion: reduce`.
- Keep `output: "export"` and the standard `next build` (no custom server, no API
  routes, no database) so Vercel previews keep working.
- Accessibility is a requirement: one `h1`, logical heading order, landmarks, the skip
  link, visible `:focus-visible` outlines, AA contrast, no horizontal scroll at 320px.
- TypeScript is pinned to 5.x because typescript-eslint does not support TS 7 yet.
