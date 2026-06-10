import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "app", "fonts");
mkdirSync(outDir, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

const cssUrl =
  "https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=cabinet-grotesk@400,500&display=swap";

const slug = (f) => f.toLowerCase().replace(/[^a-z0-9]+/g, "-");

async function main() {
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text();
  const blocks = css.split("@font-face").slice(1);
  const files = [];
  for (const b of blocks) {
    const family = (b.match(/font-family:\s*'([^']+)'/) || [])[1];
    const weight = (b.match(/font-weight:\s*(\d+)/) || [])[1];
    const woff2 = (b.match(/url\('(\/\/[^']+\.woff2)'\)/) || [])[1];
    if (!family || !weight || !woff2) continue;
    const url = "https:" + woff2;
    const name = `${slug(family)}-${weight}.woff2`;
    const buf = Buffer.from(await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer());
    writeFileSync(join(outDir, name), buf);
    files.push({ family, weight, name, bytes: buf.length });
  }
  console.log(JSON.stringify(files, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
