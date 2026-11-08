#!/usr/bin/env node
/**
 * Regenerate the README's three catalogue tables from the source files.
 *
 * `src/triggers`, `src/creates` and `src/searches` are what the app offers,
 * and `scripts/data/webhook-events.json` is the event catalogue Subscriby
 * exports, so the README's tables are written from them rather than typed:
 * one row per event family with every event it carries and a link to its
 * page of the event reference, one row per resource with its actions, and
 * one per resource with its searches. The counts in the headings follow.
 *
 * Run with `npm run sync:readme`. It rewrites each "## Supported …" section
 * from its heading to the next "## " heading and leaves everything else alone.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { scanOperations } from "./lib/scan-operations.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const readmeFile = join(root, "README.md");
const eventsFile = join(root, "scripts", "data", "webhook-events.json");
const docs = "https://docs.subscriby.net/webhooks/v1/events";

const catalogue = JSON.parse(readFileSync(eventsFile, "utf8"));
const familyOf = new Map(catalogue.items.map((item) => [item.name, item.family]));
const { triggers, creates, searches } = scanOperations(join(root, "src"));

const LABELS = { link: "Smart Link" };

/** `pass_series` → "Pass Series", `link` → "Smart Link". */
function familyLabel(family) {
  return (
    LABELS[family] ??
    family
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ")
  );
}

const eventTriggers = triggers.filter((trigger) => trigger.event);
const byFamily = new Map();

for (const trigger of eventTriggers) {
  const family = familyOf.get(trigger.event);

  if (family === undefined) {
    console.error(`sync-readme: ${trigger.file} triggers on ${trigger.event}, which the event catalogue does not list.`);
    process.exit(1);
  }

  if (!byFamily.has(family)) {
    byFamily.set(family, []);
  }

  byFamily.get(family).push(trigger.event);
}

const familyRows = [...byFamily.entries()]
  .sort((a, b) => familyLabel(a[0]).localeCompare(familyLabel(b[0]), "en"))
  .map(([family, events]) => {
    const list = events
      .sort((a, b) => a.localeCompare(b, "en"))
      .map((event) => `\`${event}\``)
      .join(", ");
    return `| [${familyLabel(family)}](${docs}/${family.replace(/_/g, "-")}) | ${events.length} | ${list} |`;
  });

const triggerTable = [
  "| Family | Count | Events |",
  "| ------ | ----- | ------ |",
  ...familyRows,
  `| **Total** | **${eventTriggers.length}** | |`,
].join("\n");

/** One row per resource in alphabetical order, its operations alphabetical too. */
function resourceTable(operations, column) {
  const byNoun = new Map();

  for (const operation of operations) {
    if (!byNoun.has(operation.noun)) {
      byNoun.set(operation.noun, []);
    }

    byNoun.get(operation.noun).push(operation.label);
  }

  const rows = [...byNoun.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], "en"))
    .map(([noun, labels]) => `| ${noun} | ${labels.sort((a, b) => a.localeCompare(b, "en")).join(", ")} |`);

  return [`| Resource | ${column} |`, "| -------- | ------- |", ...rows].join("\n");
}

const sections = [
  {
    heading: "## Supported triggers",
    title: `## Supported triggers (${eventTriggers.length})`,
    body: [
      `One trigger per webhook event, every event in the catalogue Subscriby publishes at \`https://api.subscriby.net/webhook-events.json\`; the family links open the [event reference](${docs}), where each event's payload and required token ability are listed. A trigger's event is registered as a webhook endpoint when the Zap is turned on and removed when it is turned off.`,
      "",
      triggerTable,
    ].join("\n"),
  },
  {
    heading: "## Supported actions",
    title: `## Supported actions (${creates.length})`,
    body: [
      "One action per write of the REST API, each sending a fresh `Idempotency-Key` so a retried Zap step never double-fires.",
      "",
      resourceTable(creates, "Actions"),
    ].join("\n"),
  },
  {
    heading: "## Supported searches",
    title: `## Supported searches (${searches.length})`,
    body: [
      "One search per list or lookup of the REST API, returning the matching records the way Zapier expects them.",
      "",
      resourceTable(searches, "Searches"),
    ].join("\n"),
  },
];

let readme = readFileSync(readmeFile, "utf8");

for (const section of sections) {
  const headingAt = readme.indexOf(section.heading);
  const nextHeadingAt = readme.indexOf("\n## ", headingAt + 1);

  if (headingAt === -1 || nextHeadingAt === -1) {
    console.error(`sync-readme: could not locate the "${section.heading}" section in README.md.`);
    process.exit(1);
  }

  readme = `${readme.slice(0, headingAt)}${section.title}\n\n${section.body}\n${readme.slice(nextHeadingAt)}`;
}

writeFileSync(readmeFile, readme);
console.log(`README.md: ${eventTriggers.length} triggers in ${byFamily.size} families, ${creates.length} actions, ${searches.length} searches.`);
