# Contact + footer

Source: `EMAIL` / `GITHUB_PROFILE` in `app/content.tsx`; `section#contact` and `footer` in `app/page.tsx`.

- Email link: `href` is exactly `mailto:Aaron@vexaai.app`, text "Aaron@vexaai.app".
- GitHub link: `https://github.com/SilkForgeAi`, text "github.com/SilkForgeAi".
- Links open in the same tab (no `target="_blank"`).
- Footer reads "© Aaron Dennis".
- At 320px the email and GitHub text wrap instead of overflowing (`overflow-wrap: anywhere`).

`npm run verify:links` checks the mailto and the GitHub URL.
