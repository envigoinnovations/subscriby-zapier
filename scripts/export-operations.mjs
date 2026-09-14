#!/usr/bin/env node
/**
 * Hand the docs site what this app offers, so its Zapier page is generated
 * rather than typed.
 *
 * Writes `scripts/data/zapier-operations.json` into the sibling SubscribyDocs
 * checkout, where `scripts/generate-integration-pages.mjs` turns it into the
 * trigger, action and search lists of `content/integrations/zapier.mdx` on
 * every build. Run it after adding, renaming or removing an operation:
 *
 *   npm run export:operations
 *
 * `verify-surface.mjs` fails the build while the docs copy is behind the
 * source, so forgetting this step is caught rather than published.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { scanOperations } from "./lib/scan-operations.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const target = join(root, "..", "SubscribyDocs", "scripts", "data", "zapier-operations.json");

if (!existsSync(dirname(target))) {
  console.error(`export-operations: SubscribyDocs is not checked out beside this repo (looked for ${dirname(target)}).`);
  process.exit(1);
}

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, `${JSON.stringify(scanOperations(join(root, "src")), null, 2)}\n`);
console.log(`export-operations: wrote ${target}`);
