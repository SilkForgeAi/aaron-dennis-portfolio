// Automated accessibility pass with axe-core at desktop and mobile widths.
// Fails on any serious or critical violation.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { BASE_URL, ensureEvidenceDir } from "./lib.mjs";

const widths = [1440, 390];
const browser = await chromium.launch();
const report = [];
let blocking = 0;

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "load" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  for (const v of results.violations) {
    const isBlocking = v.impact === "serious" || v.impact === "critical";
    if (isBlocking) blocking += 1;
    report.push(`${width}px ${v.impact?.toUpperCase()} ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
    for (const node of v.nodes.slice(0, 5)) report.push(`    ${node.target.join(" ")}`);
  }
  report.push(`${width}px: ${results.violations.length} violation(s), ${results.passes.length} rule(s) passed, ${results.incomplete.length} need review`);
  await context.close();
}
await browser.close();

report.push(blocking === 0 ? "A11Y PASSED — no serious or critical violations" : `A11Y FAILED — ${blocking} serious/critical violation(s)`);
const out = report.join("\n");
console.log(out);
writeFileSync(join(ensureEvidenceDir(), "a11y.txt"), `${out}\n`);
process.exit(blocking === 0 ? 0 : 1);
