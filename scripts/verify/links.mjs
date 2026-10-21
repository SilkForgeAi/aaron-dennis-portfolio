// Link check: external links return 200, the mailto is exact, every #anchor resolves.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { BASE_URL, ensureEvidenceDir } from "./lib.mjs";

const EXPECTED_MAILTO = "mailto:Aaron@vexaai.app";
const EXPECTED_EXTERNAL = [
  "https://github.com/SilkForgeAi",
  "https://github.com/SilkForgeAi/grid-ai",
  "https://github.com/SilkForgeAi/adom-agent-security",
];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(BASE_URL, { waitUntil: "load" });

const links = await page.$$eval("a[href]", (as) =>
  as.map((a) => ({ href: a.getAttribute("href") ?? "", text: a.textContent?.trim() ?? "", target: a.getAttribute("target"), rel: a.getAttribute("rel") })),
);
const rainLinks = await page.$$eval("article#rain a[href]", (as) => as.length);
const gridText = (await page.textContent("article#grid-ai")) ?? "";
const ids = new Set(await page.$$eval("[id]", (els) => els.map((el) => el.id)));
await browser.close();

const lines = [];
let failed = false;
const fail = (msg) => {
  failed = true;
  lines.push(`FAIL ${msg}`);
};

// In-page anchors
for (const { href, text } of links.filter((l) => l.href.startsWith("#"))) {
  const id = href.slice(1);
  if (ids.has(id)) lines.push(`ok   anchor ${href} -> #${id} ("${text}")`);
  else fail(`anchor ${href} has no matching id ("${text}")`);
}

// mailto
const mailtos = links.filter((l) => l.href.startsWith("mailto:"));
if (mailtos.length === 0) fail("no mailto link found");
for (const { href } of mailtos) {
  if (href === EXPECTED_MAILTO) lines.push(`ok   mailto ${href}`);
  else fail(`mailto is ${href}, expected ${EXPECTED_MAILTO}`);
}

// External links
const external = [...new Set(links.filter((l) => /^https?:/.test(l.href)).map((l) => l.href))];
for (const url of external) {
  if (!EXPECTED_EXTERNAL.includes(url)) fail(`unexpected external link: ${url}`);
}
if (rainLinks > 0) fail(`Rain is private but its card has ${rainLinks} link(s)`);
else lines.push("ok   Rain card has no link (private)");
if (/typescript/i.test(gridText)) fail("Grid AI card mentions TypeScript");
for (const expected of EXPECTED_EXTERNAL) {
  if (!external.includes(expected)) fail(`expected external link missing: ${expected}`);
}
for (const l of links.filter((l) => l.target === "_blank")) {
  if (!/noopener/.test(l.rel ?? "") || !/noreferrer/.test(l.rel ?? "")) fail(`${l.href} opens a new tab without rel="noopener noreferrer"`);
}
for (const url of external) {
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "portfolio-link-check" } });
    if (res.status === 200) lines.push(`ok   ${res.status} ${url}`);
    else fail(`${res.status} ${url}`);
  } catch (error) {
    fail(`network error for ${url}: ${error.message} (inconclusive — no network?)`);
  }
}

const summary = `${failed ? "LINK CHECK FAILED" : "LINK CHECK PASSED"} — ${links.length} links, ${external.length} external, ${mailtos.length} mailto`;
lines.push(summary);
const out = lines.join("\n");
console.log(out);
writeFileSync(join(ensureEvidenceDir(), "link-check.txt"), `${out}\n`);
process.exit(failed ? 1 : 0);
