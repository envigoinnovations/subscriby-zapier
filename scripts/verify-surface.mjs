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
 * list only shrinks. When the docs repo is checked out beside this one, its
 * copy of this app's operations (`npm run export:operations`) must match the
 * source too, or the Zapier docs page would be generated from yesterday's app.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { operationsIn, scanOperations, walk } from "./lib/scan-operations.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const dataDir = join(root, "scripts/data");
const docsCopy = join(root, "..", "SubscribyDocs", "scripts", "data", "zapier-operations.json");

/**
 * Endpoints this app deliberately offers no operation for.
 *
 * Keyed `METHOD /path` with `{}` standing for every path parameter, exactly as
 * the checks below spell them, each with the reason it stays off Zapier.
 */
const DELIBERATELY_ABSENT = new Map([
  ["GET /me/transaction-fees", "The creator's own Transaction Fees ledger is a report they read on the dashboard, over REST or through an agent; the owner kept it off the automation surfaces."],
  ["GET /me/transaction-fees/summary", "The creator's own Transaction Fees ledger is a report they read on the dashboard, over REST or through an agent; the owner kept it off the automation surfaces."],
  ["POST /me/export", "An archive of the creator's own account is asked for in person, from Settings or the API, and lands in their inbox; it is not an automation step."],
  ["GET /me/export", "An archive of the creator's own account is asked for in person, from Settings or the API, and lands in their inbox; it is not an automation step."],
  ["GET /me/alert-destinations", "Where a creator's own alerts go is set on the dashboard or in the apps; the parity matrix leaves it off Zapier."],
  ["PUT /me/alert-destinations", "Where a creator's own alerts go is set on the dashboard or in the apps; the parity matrix leaves it off Zapier."],
  ["GET /me/identities", "The creator's own linked accounts are account security, managed in person."],
  ["DELETE /me/identities/{}", "The creator's own linked accounts are account security, managed in person."],
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

/** `/api/v1/projects/{project}/members/{member}` → `/projects/{}/members/{}`. */
function normaliseExported(uri) {
  return uri.replace(/^\/api\/v1/, "").replace(/\{[^}]+\}/g, "{}");
}

const scanned = scanOperations(join(root, "src"));
const every = [...scanned.triggers, ...scanned.creates, ...scanned.searches];

/*
 * What the app calls is wider than what it lists as operations: the trigger
 * factory subscribes and unsubscribes REST hooks, and helpers read catalogues.
 * Coverage counts every call in `src`, not only the operation files.
 */
const offered = new Set(walk(join(root, "src")).flatMap((file) => operationsIn(readFileSync(file, "utf8"))));
const triggered = new Set(scanned.triggers.map((trigger) => trigger.event).filter(Boolean));

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

if (existsSync(docsCopy) && readFileSync(docsCopy, "utf8").trim() !== JSON.stringify(scanned, null, 2)) {
  problems.push("the docs repo's copy of this app's operations is behind the source; run: npm run export:operations");
}

if (problems.length > 0) {
  fail(`${problems.length} surface gap(s):\n  - ${problems.join("\n  - ")}`);
}

console.log(
  `verify-surface: ${endpoints.length} endpoints (${DELIBERATELY_ABSENT.size} deliberately absent) and ${eventNames.size} events all have a Zapier counterpart; ${every.length} operations scanned.`,
);
