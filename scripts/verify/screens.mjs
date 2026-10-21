// Full-page screenshots at 1440/768/390/320 with a horizontal-overflow check,
// plus a keyboard tab-through that records focus order and checks it matches DOM order.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { BASE_URL, ensureEvidenceDir } from "./lib.mjs";

const dir = ensureEvidenceDir();
const widths = [1440, 768, 390, 320];
const browser = await chromium.launch();
const lines = [];
let failed = false;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  const ok = scrollWidth <= clientWidth;
  if (!ok) failed = true;
  const file = join(dir, `page-${width}.png`);
  await page.screenshot({ path: file, fullPage: true });
  lines.push(`${ok ? "ok  " : "FAIL"} ${width}px scrollWidth=${scrollWidth} clientWidth=${clientWidth} -> ${file}`);
  await page.close();
}

// Keyboard tab-through at desktop and mobile widths.
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: "load" });
  const domOrder = await page.$$eval("a[href], button, [tabindex]:not([tabindex='-1'])", (els) =>
    els.map((el) => `${el.tagName.toLowerCase()}[${el.getAttribute("href") ?? ""}] ${el.textContent?.trim().replace(/\s+/g, " ")}`),
  );
  const focusOrder = [];
  for (let i = 0; i < domOrder.length + 2; i += 1) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        label: `${el.tagName.toLowerCase()}[${el.getAttribute("href") ?? ""}] ${el.textContent?.trim().replace(/\s+/g, " ")}`,
        visible: r.width > 0 && r.height > 0,
        outline: style.outlineStyle !== "none" && style.outlineWidth !== "0px",
      };
    });
    if (!info || focusOrder.some((f) => f.label === info.label)) break;
    focusOrder.push(info);
  }
  const matches = JSON.stringify(focusOrder.map((f) => f.label)) === JSON.stringify(domOrder);
  const allVisible = focusOrder.every((f) => f.visible && f.outline);
  if (!matches || !allVisible) failed = true;
  lines.push(`${matches && allVisible ? "ok  " : "FAIL"} ${width}px tab order (${focusOrder.length} stops, matches DOM order: ${matches}, all visible with focus outline: ${allVisible})`);
  focusOrder.forEach((f, i) => lines.push(`     ${String(i + 1).padStart(2)}. ${f.label}${f.visible && f.outline ? "" : "  <-- not visibly focused"}`));

  // Skip link: first Tab focuses it, Enter moves focus into <main>.
  await page.reload({ waitUntil: "load" });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  const afterSkip = await page.evaluate(() => document.activeElement?.id ?? "");
  if (afterSkip !== "main") failed = true;
  lines.push(`${afterSkip === "main" ? "ok  " : "FAIL"} ${width}px skip link moves focus to #${afterSkip}`);

  if (width === 390) {
    // Mobile nav: links are visible and keyboard-reachable without JavaScript.
    const navVisible = await page.$$eval("nav a", (as) => as.every((a) => a.getBoundingClientRect().width > 0));
    if (!navVisible) failed = true;
    lines.push(`${navVisible ? "ok  " : "FAIL"} 390px nav links visible`);
  }
  await page.close();
}
await browser.close();

lines.push(failed ? "SCREENS/KEYBOARD FAILED" : "SCREENS/KEYBOARD PASSED");
const out = lines.join("\n");
console.log(out);
writeFileSync(join(dir, "screens-keyboard.txt"), `${out}\n`);
process.exit(failed ? 1 : 0);
