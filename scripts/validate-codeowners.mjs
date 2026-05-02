import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const CODEOWNERS_PATH = path.join(ROOT, ".github", "CODEOWNERS");
const REQUIRED_PATTERNS = [
  "/.github/workflows/**",
  "/content/**",
  "/components/mdx-components.tsx",
  "/app/api/og/route.tsx",
  "/proxy.ts",
  "/lib/security-controls.ts",
];

async function main() {
  const source = await fs.readFile(CODEOWNERS_PATH, "utf8");
  const lines = source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  const missing = REQUIRED_PATTERNS.filter((pattern) =>
    !lines.some((line) => line.split(/\s+/)[0] === pattern),
  );

  if (missing.length > 0) {
    for (const pattern of missing) {
      console.error(`CODEOWNERS missing required ownership rule: ${pattern}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`CODEOWNERS policy validated (${REQUIRED_PATTERNS.length} required rules present).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
