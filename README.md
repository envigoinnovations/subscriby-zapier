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
- `src/creates/*` — 27 write actions against the live REST surface (create/update/archive/ban/refund/…). Each sends an `Idempotency-Key` so a Zapier retry cannot double-apply.
- `src/searches/*` — 44 search actions (list and find-by-id) against the same REST surface.
- `src/triggers/dropdown-*.ts` — dynamic dropdowns that populate project/plan/member/token pickers on other steps. These are not event triggers and are hidden from the trigger list.
- `src/utils/http.ts` — shared fetch helpers scoped to the authenticated bearer token.

## Supported triggers

The trigger catalog is generated from Subscriby's `WebhookEvent` enum and covers **every event in it** — one `src/triggers/*.ts` file per event, each registered in `src/index.ts`.

Do not hand-maintain this list against the enum. The canonical, machine-readable catalog is published at `https://api.subscriby.net/webhook-events.json` and mirrored by the `subscriby://enums/webhook-event` MCP resource; the prose version lives at `https://docs.subscriby.net/webhooks/event-reference`. Each event's required token ability is a column in that JSON — read it from there rather than copying abilities into this file, which is how the previous table came to name abilities that did not match the enum.

## Release

`zapier push` uploads a new version; `zapier promote <version>` rolls it out to directory users.

### Releasing a breaking version

3.0.0 changed the field keys behind **Create Plan** and **Update Plan**, which breaks live Zaps using those two actions. Zapier has a mechanism for exactly this and it must be run in order:

1. `zapier push` — upload 3.0.0.
2. `zapier promote 3.0.0` — make it the version new Zaps are built on.
3. `zapier migrate 2.6.0 3.0.0` — move existing users across.

Step 3 is the one that is easy to forget, and skipping it leaves everyone on 2.6.0 indefinitely. Migrating a percentage first (`zapier migrate 2.6.0 3.0.0 10`) is worth doing here, because the two changed actions cannot be auto-remapped — a Zap that set *Billing Cycle* will need its field re-mapped by the person who built it.
