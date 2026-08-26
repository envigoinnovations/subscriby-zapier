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

The trigger catalog is generated from Subscriby's `WebhookEvent` enum and currently covers **all 88 events** across 13 families — one `src/triggers/*.ts` file per event, each registered in `src/index.ts`.

| Family           | Triggers |
| ---------------- | -------- |
| subscription     | 16       |
| project          | 12       |
| member           | 10       |
| billing          | 10       |
| coupon           | 7        |
| plan             | 6        |
| support          | 6        |
| team             | 6        |
| payment          | 4        |
| access_code      | 3        |
| group            | 3        |
| role             | 3        |
| pass             | 2        |
| **Total**        | **88**   |

Do not hand-maintain this list against the enum. The canonical, machine-readable catalog is published at `https://api.subscriby.net/webhook-events.json` and mirrored by the `subscriby://enums/webhook-event` MCP resource; the prose version lives at `https://docs.subscriby.net/webhooks/event-reference`. Each event's required token ability is a column in that JSON — read it from there rather than copying abilities into this file, which is how the previous table came to name abilities that did not match the enum.

## Release

`zapier push` uploads a new version; `zapier promote <version>` rolls it out to directory users.
