import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const width = 1584;
const height = 396;
const svgPath = new URL("../public/social/jl-policy-linkedin-banner.svg", import.meta.url);
const pngPath = new URL("../public/social/jl-policy-linkedin-banner.png", import.meta.url);

const svg = await readFile(svgPath);

await writeFile(
  pngPath,
  await sharp(svg)
    .resize(width, height, { fit: "fill" })
    .png()
    .toBuffer(),
);
