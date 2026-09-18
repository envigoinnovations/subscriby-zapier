# Subscriby — Zapier Platform Integration

Thin TypeScript wrapper around Subscriby's public REST API (`https://api.subscriby.net/v1`) and outbound-webhook subsystem, packaged for the Zapier App Directory.

## Installation

```bash
npm install
npx zapier login
npx zapier register "Subscriby"
```

## Development

```bash
npm run build
npm run validate
npm run test
npm run push
```

## Architecture

- `src/authentication.ts` — API-key auth. Each user pastes a `sbt_` Sanctum personal access token minted at `https://app.subscriby.net/settings/tokens`. Zapier tests the token against `GET /v1/teams/current`.
- `src/triggers/*` — event-driven triggers. On save, Zapier calls `performSubscribe` which `POST`s to `/v1/webhook-subscriptions` with `{name, url, events[]}`. On delete, `performUnsubscribe` DELETEs the resulting endpoint id.
- `src/creates/*` — one write action per file against the live REST surface (create/update/delete, archive/restore, activate/deactivate, ban, refund, remind, retry, and the body-less verbs through `src/utils/rpc-create.ts`). Each sends an `Idempotency-Key` so a Zapier retry cannot double-apply. Do not keep a count here; `src/index.ts` is the list.
- `src/searches/*` — one search action per file (list and find-by-id) against the same REST surface.
- `src/triggers/dropdown-*.ts` — dynamic dropdowns that populate project/plan/member/token pickers on other steps. These are not event triggers and are hidden from the trigger list.
- `src/utils/http.ts` — shared fetch helpers scoped to the authenticated bearer token.

## Supported triggers

The trigger catalog is generated from Subscriby's `WebhookEvent` enum and covers **every event in it** — one `src/triggers/*.ts` file per event, each registered in `src/index.ts`.

Do not hand-maintain this list against the enum. The canonical, machine-readable catalog is published at `https://api.subscriby.net/webhook-events.json` and mirrored by the `subscriby://enums/webhook-event` MCP resource; the prose version lives at `https://docs.subscriby.net/webhooks/event-reference`. Each event's required token ability is a column in that JSON — read it from there rather than copying abilities into this file, which is how the previous table came to name abilities that did not match the enum.

## Release

`zapier push` uploads a new version; `zapier promote <version>` rolls it out to directory users.

### Releasing a breaking version

3.0.0 removed the bot-family triggers, action and searches that Subscriby 5.0 retired (**Project Bot Connected**, **Project Bot Disconnected**, **Bot Status Changed**, **Disconnect Bot**, **Get Bot Status**, **Get Bot Link**, and `bot_id` on the project actions) and changed the resource row to speak kinds and places (`kind`, `connector`, `space` in place of `type` and `chat_id`). A live Zap on a removed key cannot be carried across automatically; one on a changed row keeps running and sees the new fields. Zapier has a mechanism for exactly this and it must be run in order:

1. `zapier push` — upload 3.0.0 (on Windows, `npm run push:win`, which parks the `.git` folder the CLI trips over).
2. `zapier promote 3.0.0` — make it the version new Zaps are built on.
3. `zapier migrate 2.3.0 3.0.0` — move existing users across.

Step 3 is the one that is easy to forget, and skipping it leaves everyone on 2.3.0 indefinitely. Migrating a percentage first (`zapier migrate 2.3.0 3.0.0 10`) is worth doing when Zaps use the removed keys, because those have to be rebuilt on **Connector Connected**, **Connector Disconnected**, **Connector Status Changed**, **Disconnect Connector**, **Get Connector Installation** and **Get Deep Link** by the person who built them.