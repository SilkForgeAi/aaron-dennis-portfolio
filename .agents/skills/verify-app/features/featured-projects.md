# Featured projects

Source: copy in `app/content.tsx` (`projects`), card in `app/components/ProjectCard.tsx` + `.module.css`.

Order and must-show facts:
1. `article#grid-ai` — lead card (larger padding and title). Tag "01 · DESKTOP APP · OPEN SOURCE", stack "Electron · Python · built on openhands-sdk" (never TypeScript), repo link `https://github.com/SilkForgeAi/grid-ai`, prerelease / source-preview note.
2. `article#adom` — "ADOM", subtitle "AI agent security", stack "Python · Docker replay · policy enforcement", repo link `https://github.com/SilkForgeAi/adom-agent-security`, the bounded-reference-implementation caveat. **No benchmark numbers.**
3. `article#rain` — "Rain", subtitle "Scientific reasoning and verification", stack "Python · private research project", the "Private repository · available to discuss" note and **no link**.

Each card: tag / name / stack / link on the left; PROBLEM · WHAT I BUILT · WHY IT MATTERS (`h4`) on the right. Above 1080px the two halves sit side by side; at ≤760px everything stacks.

Accuracy: nothing on a card may be invented (no employers, customers, metrics, numbers).
