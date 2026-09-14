/**
 * What this app offers, read from its source files.
 *
 * One scan feeds two consumers: `verify-surface.mjs`, which compares it with
 * the catalogues Subscriby exports, and `export-operations.mjs`, which hands
 * it to the docs site so the Zapier page lists what exists rather than what
 * someone typed. Each trigger, create and search file declares its `key`,
 * `noun`, `label` and `description` before its input fields, so the first
 * match of each property is the operation's own; a trigger built by
 * `defineWebhookTrigger` also names its `event`, and a dropdown trigger says
 * `hidden: true`; only what follows `export default` is read, so a factory's
 * own fields never pass for an operation. The API calls are the `z.request({ url, method })` blocks
 * and the `path: (input) => ...` of a create built by `defineRpcCreate`
 * (POST unless the file says DELETE). Paths are spelt with `{}` for every
 * parameter, the way the exported endpoints are normalised, so the two sides
 * join on `METHOD /path`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const KINDS = { triggers: "trigger", creates: "create", searches: "search" };

export function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (full.endsWith(".ts")) {
      out.push(full);
    }
  }
  return out;
}

/** `${apiBaseUrl()}/projects/${projectId}/members?status=x` → `/projects/{}/members`. */
export function normaliseSourcePath(template) {
  return template
    .replace(/^\$\{apiBaseUrl\(\)\}/, "")
    .replace(/\$\{[^}]*\}/g, "{}")
    .replace(/\?.*$/, "")
    .replace(/\/$/, "");
}

/** The first quoted value of a property, with its escaped quotes unescaped. */
function firstString(source, property) {
  const match = new RegExp(`\\b${property}:\\s*(['"])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1`).exec(source);
  return match ? match[2].replace(/\\(['"])/g, "$1") : null;
}

/**
 * The part of a file from its default export on.
 *
 * An operation file's own `key`, `noun`, `label` and `description` open the
 * object it exports; anything declared above (a shared factory's output
 * fields, a helper's constants) is not the operation's. A file with no
 * default export is not an operation at all.
 */
function exportedObject(source) {
  const at = source.indexOf("export default");
  return at === -1 ? null : source.slice(at);
}

/** Every `METHOD /path` one source file calls. */
export function operationsIn(source) {
  const found = new Set();

  for (const block of source.matchAll(/z\.request\(\{([\s\S]*?)\}\)/g)) {
    const url = block[1].match(/url:\s*`([^`]*)`/);
    if (!url || !url[1].startsWith("${apiBaseUrl()}")) {
      continue;
    }
    const path = normaliseSourcePath(url[1]);
    if (!path.startsWith("/")) {
      continue;
    }
    const method = block[1].match(/method:\s*['"]([A-Z]+)['"]/);
    found.add(`${method ? method[1] : "GET"} ${path}`);
  }

  const rpcPath = source.match(/path:\s*\([^)]*\)\s*=>\s*(['"`])((?:(?!\1)[^\\]|\\.)*)\1/);
  if (rpcPath) {
    const method = source.match(/^\s*method:\s*['"]([A-Z]+)['"]/m);
    found.add(`${method ? method[1] : "POST"} ${normaliseSourcePath(rpcPath[2])}`);
  }

  return [...found].sort();
}

/**
 * Every operation under `src/{triggers,creates,searches}`, sorted by key.
 *
 * Files that declare no `key` (the trigger factory, the RPC factory, shared
 * helpers) are not operations and are left out.
 */
export function scanOperations(srcDir) {
  const operations = { triggers: [], creates: [], searches: [] };

  for (const [folder, kind] of Object.entries(KINDS)) {
    const dir = join(srcDir, folder);
    for (const file of walk(dir)) {
      const source = readFileSync(file, "utf8");
      const exported = exportedObject(source);
      const key = exported === null ? null : firstString(exported, "key");
      if (key === null) {
        continue;
      }
      operations[folder].push({
        kind,
        file: relative(srcDir, file).replace(/\\/g, "/"),
        key,
        noun: firstString(exported, "noun"),
        label: firstString(exported, "label"),
        description: firstString(exported, "description"),
        event: kind === "trigger" ? firstString(exported, "event") : null,
        hidden: /\bhidden:\s*true\b/.test(exported),
        operations: operationsIn(source),
      });
    }
    operations[folder].sort((a, b) => a.key.localeCompare(b.key));
  }

  return operations;
}
