// Genera public/og-image.jpg (1200x630) — preview premium estilo Apple.
// Uso: node scripts/generate-og.mjs
// sharp se instala on-demand (--no-save); no es dependencia del proyecto.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const W = 1200;
const H = 630;

const photo = path.join(root, "src/assets/Images/Bg/background2.jpg");
const logoPath = path.join(root, "public/logos/MyLogo.png");
const out = path.join(root, "public/og-image.jpg");

// Base: foto del gym recortada a 1200x630
const base = sharp(photo).resize(W, H, { fit: "cover", position: "center" });

// Logo escalado, sobre fondo oscuro
const logoWidth = 360;
const logoBuf = await sharp(logoPath).resize({ width: logoWidth }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();
const logoLeft = 80;
const logoTop = 72;

// Capa de gradiente + tipografía (SVG)
const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lr" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#0A0A0A" stop-opacity="0.94"/>
      <stop offset="42%" stop-color="#0A0A0A" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.12"/>
    </linearGradient>
    <linearGradient id="tb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#0A0A0A" stop-opacity="0.45"/>
      <stop offset="35%" stop-color="#0A0A0A" stop-opacity="0.0"/>
      <stop offset="80%" stop-color="#0A0A0A" stop-opacity="0.0"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.55"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#lr)"/>
  <rect width="${W}" height="${H}" fill="url(#tb)"/>

  <!-- acento rojo de marca -->
  <rect x="82" y="300" width="64" height="6" rx="3" fill="#E53935"/>

  <!-- titular estilo Apple -->
  <text x="80" y="392" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="80" font-weight="700" letter-spacing="-2" fill="#F5F5F5">Despierta tu</text>
  <text x="80" y="478" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="80" font-weight="700" letter-spacing="-2" fill="#F5F5F5">mejor versión.</text>

  <!-- subtítulo -->
  <text x="82" y="548" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="29" font-weight="400" letter-spacing="0.5" fill="#C9C9C9">Gimnasio premium · Las Condes, Santiago</text>
</svg>
`);

await base
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logoBuf, top: logoTop, left: logoLeft },
  ])
  .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
  .toFile(out);

console.log(`OG image generada: ${out}`);
console.log(`logo: ${logoMeta.width}x${logoMeta.height} en (${logoLeft},${logoTop})`);
