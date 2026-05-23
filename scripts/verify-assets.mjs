import fs from "fs";
import path from "path";

const publicDir = path.join("public");
const content = fs.readFileSync("src/lib/site-content.ts", "utf8");
const localPaths = [
  ...content.matchAll(/"(\/(?:images|homepage|atlas|downloads)[^"]+)"/g),
].map((m) => m[1]);

const missing = [];
for (const p of [...new Set(localPaths)]) {
  const file = path.join(publicDir, p.replace(/^\//, ""));
  if (!fs.existsSync(file)) missing.push(p);
}

if (missing.length) {
  console.error("Missing assets:");
  missing.forEach((p) => console.error(" ", p));
  process.exit(1);
}

console.log(`OK: ${localPaths.length} local asset references verified`);
