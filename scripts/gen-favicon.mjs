import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const BG = "#080808";
const ACCENT = "#C8FF00";
const FONT = "Helvetica, Arial, sans-serif";

function iconSvg(s) {
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${s}" height="${s}" rx="${s * 0.18}" fill="${BG}"/>
    <text x="50%" y="53%" dominant-baseline="central" text-anchor="middle"
      font-family="${FONT}" font-size="${s * 0.56}" font-weight="800" letter-spacing="${-s * 0.035}" fill="${ACCENT}">GM</text>
  </svg>`;
}

// Build a multi-size ICO (PNG-encoded entries: 16, 32, 48)
function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  pngs.forEach((p, i) => {
    const d = i * 16;
    dir.writeUInt8(p.size >= 256 ? 0 : p.size, d + 0);
    dir.writeUInt8(p.size >= 256 ? 0 : p.size, d + 1);
    dir.writeUInt8(0, d + 2); // palette
    dir.writeUInt8(0, d + 3); // reserved
    dir.writeUInt16LE(1, d + 4); // planes
    dir.writeUInt16LE(32, d + 6); // bpp
    dir.writeUInt32LE(p.buf.length, d + 8);
    dir.writeUInt32LE(offset, d + 12);
    offset += p.buf.length;
  });

  return Buffer.concat([header, dir, ...pngs.map((p) => p.buf)]);
}

async function main() {
  const sizes = [16, 32, 48];
  const pngs = [];
  for (const size of sizes) {
    const buf = await sharp(Buffer.from(iconSvg(size))).resize(size, size).png().toBuffer();
    pngs.push({ size, buf });
  }
  writeFileSync(join(root, "app/favicon.ico"), buildIco(pngs));
  console.log("favicon.ico generated:", sizes.join(", "));
}

main().catch((e) => { console.error(e); process.exit(1); });
