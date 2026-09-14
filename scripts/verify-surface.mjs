#!/usr/bin/env node
/**
 * Fails the build when the Subscriby API has an endpoint this app offers no
 * operation for, or a webhook event it offers no trigger for.
 *
 * Decision 25 of the Connectors program made surface parity a gate: every
 * creator operation lands on the dashboard, REST, MCP, the webhooks, Zapier
 * and n8n in one pass. The Subscriby suite holds the REST and MCP halves
 * (SurfaceParityTest); this script holds this app's half against the same
 * exports, so an endpoint or an event added in Subscriby cannot ship without
 * its Zapier counterpart.
 *
 * scripts/data/api-endpoints.json and scripts/data/webhook-events.json are the
 * answer, refreshed from the Subscriby repo with:
 *
 *   php artisan subscriby:docs:export-metadata --docs
 *
 * Endpoints that deliberately have no operation are listed below with their
 * reason; an entry whose endpoint gains an operation fails as stale, so the
 * list only shrinks.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dataDir = join(root, "scripts/data");
const srcDir = join(root, "src");

/**
 * Endpoints this app deliberately offers no operation for.
 *
 * Keyed `METHOD /path` with `{}` standing for every path parameter, exactly as
 * the checks below spell them, each with the reason it stays off Zapier.
 */
const DELIBERATELY_ABSENT = new Map([
  ["GET /me/alert-destinations", "Where a creator's own alerts go is set on the dashboard or in the apps; the parity matrix leaves it off Zapier."],
  ["PUT /me/alert-destinations", "Where a creator's own alerts go is set on the dashboard or in the apps; the parity matrix leaves it off Zapier."],
  ["GET /me/identities", "The creator's own linked accounts are account security, managed in person."],
  ["DELETE /me/identities/{}", "The creator's own linked accounts are account security, managed in person."],
  ["POST /me/notifications/read-all", "Zapier reads the inbox through the New Notification polling trigger; marking it read is the reader's act on the dashboard."],
  ["GET /me/recovery", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["POST /me/recovery/backup-identity", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["POST /me/recovery/backup-identity/switch", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["DELETE /me/recovery/backup-identity", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["POST /me/recovery/handshakes", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["GET /me/recovery/handshakes/{}", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["DELETE /me/recovery/handshakes/{}", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["POST /me/recovery/handshakes/{}/confirm", "Relinking the creator's own account is a human act at the connector; the dashboard's recovery steps drive it."],
  ["GET /ping", "The health probe, not an operation."],
  ["GET /projects/{}/broadcasts/audiences", "The composer's audience list for the dashboard; Broadcast Message takes the same audience fields and reports what it queued."],
  ["GET /projects/{}/broadcasts/preview", "The composer's recipient estimate for the dashboard; Broadcast Message reports what it queued."],
  ["POST /projects/{}/plans/order", "Drag ordering of the plan list on the dashboard; a Zap has nothing to order."],
  ["GET /projects/{}/recovery/members/export", "A CSV download; a Zap step cannot consume a file stream."],
  ["GET /recovery/incidents/{}", "List Recovery Incidents returns every field of each incident; a Zap filters by id."],
  ["GET /recovery/operations/{}", "List Recovery Operations returns every field of each operation; a Zap filters by id."],
  ["POST /tokens", "Minting API tokens is the creator's act on the dashboard; a token never mints tokens."],
  ["GET /webhook-subscriptions", "Bookkeeping of Zapier's own REST hooks; the trigger factory subscribes and unsubscribes without listing."],
]);

function fail(message) {
  console.error(`\nverify-surface: ${message}\n`);
  process.exit(1);
}

function readCatalog(name) {
  const file = join(dataDir, name);
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    fail(
      `Missing ${relative(root, file)}.\n` +
        "Regenerate it from the Subscriby repo:\n" +
        "  php artisan subscriby:docs:export-metadata --docs",
    );
  }
  return JSON.parse(raw).items;
}

function walk(dir) {
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

/** `/api/v1/projects/{project}/members/{member}` → `/projects/{}/members/{}`. */
function normaliseExported(uri) {
  return uri.replace(/^\/api\/v1/, "").replace(/\{[^}]+\}/g, "{}");
}

/** `${apiBaseUrl()}/projects/${projectId}/members?status=x` → `/projects/{}/members`. */
function normaliseSource(template) {
  return template
    .replace(/^\$\{apiBaseUrl\(\)\}/, "")
    .replace(/\$\{[^}]*\}/g, "{}")
    .replace(/\?.*$/, "")
    .replace(/\/$/, "");
}

/**
 * Every `METHOD /path` one source file calls: the `z.request({ url, method })`
 * blocks, and the `path: (input) => ...` of a create built by `defineRpcCreate`
 * (POST unless the file says DELETE).
 */
function operationsIn(source) {
  const found = new Set();

  for (const block of source.matchAll(/z\.request\(\{([\s\S]*?)\}\)/g)) {
    const url = block[1].match(/url:\s*`([^`]*)`/);
    if (!url || !url[1].startsWith("${apiBaseUrl()}")) {
      continue;
    }
    const path = normaliseSource(url[1]);
    if (!path.startsWith("/")) {
      continue;
    }
    const method = block[1].match(/method:\s*['"]([A-Z]+)['"]/);
    found.add(`${method ? method[1] : "GET"} ${path}`);
  }

  const rpcPath = source.match(/path:\s*\([^)]*\)\s*=>\s*`([^`]*)`/);
  if (rpcPath) {
    const method = source.match(/^\s*method:\s*['"]([A-Z]+)['"]/m);
    found.add(`${method ? method[1] : "POST"} ${normaliseSource(rpcPath[1])}`);
  }

  return found;
}

const sources = walk(srcDir).map((file) => readFileSync(file, "utf8"));

const offered = new Set();
for (const source of sources) {
  for (const operation of operationsIn(source)) {
    offered.add(operation);
  }
}

const triggered = new Set();
for (const source of sources) {
  for (const match of source.matchAll(/^\s*event:\s*'([^']+)'/gm)) {
    triggered.add(match[1]);
  }
}

const problems = [];

const endpoints = readCatalog("api-endpoints.json");
for (const endpoint of endpoints) {
  const key = `${endpoint.method} ${normaliseExported(endpoint.uri)}`;
  const covered = offered.has(key);
  const excused = DELIBERATELY_ABSENT.has(key);
  if (!covered && !excused) {
    problems.push(`no operation for ${key} (${endpoint.name})`);
  }
  if (covered && excused) {
    problems.push(`stale exception: ${key} now has an operation; remove it from DELIBERATELY_ABSENT`);
  }
}
const exported = new Set(endpoints.map((endpoint) => `${endpoint.method} ${normaliseExported(endpoint.uri)}`));
for (const key of DELIBERATELY_ABSENT.keys()) {
  if (!exported.has(key)) {
    problems.push(`stale exception: ${key} is no longer an endpoint; remove it from DELIBERATELY_ABSENT`);
  }
}

const events = readCatalog("webhook-events.json");
const eventNames = new Set(events.map((event) => event.name));
for (const name of eventNames) {
  if (!triggered.has(name)) {
    problems.push(`no trigger for the ${name} event`);
  }
}
for (const name of triggered) {
  if (!eventNames.has(name)) {
    problems.push(`trigger for ${name}, which is not an event Subscriby emits`);
  }
}

if (problems.length > 0) {
  fail(`${problems.length} surface gap(s):\n  - ${problems.join("\n  - ")}`);
}

console.log(
  `verify-surface: ${endpoints.length} endpoints (${DELIBERATELY_ABSENT.size} deliberately absent) and ${eventNames.size} events all have a Zapier counterpart.`,
);
