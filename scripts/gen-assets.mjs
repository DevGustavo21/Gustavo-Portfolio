import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const BG = "#080808";
const ACCENT = "#C8FF00";
const PRIMARY = "#E8E8E0";
const MUTED = "#606058";
const SECONDARY = "#A8A8A0";
const FONT = "Helvetica, Arial, sans-serif";

// --- App icon (square, used for icon.png fallback + apple-icon) ---
function iconSvg(s, radius) {
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${s}" height="${s}" rx="${radius}" fill="${BG}"/>
    <text x="50%" y="52%" dominant-baseline="central" text-anchor="middle"
      font-family="${FONT}" font-size="${s * 0.52}" font-weight="800" letter-spacing="${-s * 0.03}" fill="${ACCENT}">GM</text>
  </svg>`;
}

// --- Open Graph card 1200x630 ---
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${ACCENT}"/>
  <!-- GM badge -->
  <rect x="80" y="72" width="92" height="92" rx="18" fill="none" stroke="${ACCENT}" stroke-opacity="0.5" stroke-width="2"/>
  <text x="126" y="118" dominant-baseline="central" text-anchor="middle" font-family="${FONT}" font-size="42" font-weight="800" letter-spacing="-3" fill="${ACCENT}">GM</text>
  <text x="1120" y="118" dominant-baseline="central" text-anchor="end" font-family="${FONT}" font-size="22" font-weight="600" letter-spacing="4" fill="${MUTED}">FRONTEND · WORDPRESS · NEXT.JS</text>
  <!-- Name -->
  <text x="76" y="320" font-family="${FONT}" font-size="138" font-weight="800" letter-spacing="-6" fill="${PRIMARY}">GUSTAVO</text>
  <text x="76" y="446" font-family="${FONT}" font-size="138" font-weight="800" letter-spacing="-6" fill="${PRIMARY}">MEJIA</text>
  <!-- Bottom -->
  <text x="80" y="540" font-family="${FONT}" font-size="30" font-weight="700" fill="${ACCENT}">Frontend Developer &amp; WordPress Expert</text>
  <text x="80" y="578" font-family="${FONT}" font-size="24" font-weight="400" fill="${SECONDARY}">Co-fundador, Crafted Code Hub · Managua, Nicaragua</text>
  <rect x="1010" y="520" width="110" height="48" rx="24" fill="${ACCENT}"/>
  <text x="1065" y="545" dominant-baseline="central" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="700" fill="${BG}">6+ años</text>
</svg>`;

async function main() {
  // Favicon PNG fallback (modern browsers use icon.svg; this covers the rest)
  await sharp(Buffer.from(iconSvg(48, 10))).png().toFile(join(root, "app/icon.png"));
  // Apple touch icon (iOS masks corners, keep square)
  await sharp(Buffer.from(iconSvg(180, 0))).png().toFile(join(root, "app/apple-icon.png"));
  // Open Graph / Twitter card
  await sharp(Buffer.from(ogSvg)).png().toFile(join(root, "app/opengraph-image.png"));
  await sharp(Buffer.from(ogSvg)).png().toFile(join(root, "app/twitter-image.png"));

  // Compress oversized photo (displayed at max ~340px; export 760px webp)
  const src = join(root, "public/wordcamp.webp");
  const out = join(root, "public/wordcamp.webp");
  const tmp = join(root, "public/_wordcamp_tmp.webp");
  await sharp(src).resize({ width: 760, withoutEnlargement: true }).webp({ quality: 82 }).toFile(tmp);
  const { renameSync } = await import("node:fs");
  renameSync(tmp, out);

  console.log("Assets generated.");
}

main().catch((e) => { console.error(e); process.exit(1); });
