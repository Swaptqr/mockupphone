// Prepend "use client" to the compiled output. tsup/esbuild strip bare
// directive expressions during bundling, so we re-inject them here. Idempotent.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const targets = ['dist/index.js', 'dist/index.mjs'];
const directive = '"use client";\n';

for (const file of targets) {
  if (!existsSync(file)) continue;
  const contents = readFileSync(file, 'utf8');
  if (contents.startsWith('"use client"') || contents.startsWith("'use client'")) {
    continue;
  }
  writeFileSync(file, directive + contents);
  console.log(`✓ Prepended "use client" to ${file}`);
}
