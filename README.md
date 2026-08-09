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
- `src/triggers/*` — event-driven triggers. On save, Zapier calls `performSubscribe` which `POST`s to `/v1/webhook-subscriptions` with `{target_url, events[]}`. On delete, `performUnsubscribe` DELETEs the resulting endpoint id.
- `src/creates/*` — placeholder create actions. Backing REST endpoints land after the Laravel `app/Actions/*` extraction (tracked in Subscriby repo).
- `src/searches/*` — placeholder search actions. Wait on the same REST coverage.
- `src/utils/http.ts` — shared fetch helpers scoped to the authenticated bearer token.

## Supported triggers (v0.1)

| Trigger                | Event                    | Subscriby ability              |
| ---------------------- | ------------------------ | ------------------------------- |
| New Subscription       | `subscription.created`   | `project-subscription:view-any` |
| Subscription Cancelled | `subscription.cancelled` | `project-subscription:view-any` |
| Subscription Expired   | `subscription.expired`   | `project-subscription:view-any` |
| Payment Succeeded      | `payment.succeeded`      | `project-subscription:view-any` |
| Payment Failed         | `payment.failed`         | `project-subscription:view-any` |
| Access Code Redeemed   | `access_code.redeemed`   | `project-access-code:view-any`  |
| Member Joined          | `member.joined`          | `project-user:view-any`         |
| Member Banned          | `member.banned`          | `project-user:view-any`         |

Full catalog: `subscriby://enums/webhook-event` (MCP resource) or `https://docs.subscriby.net/webhooks/event-reference`.

## Release

`zapier push` uploads a new version; `zapier promote <version>` rolls it out to directory users.
