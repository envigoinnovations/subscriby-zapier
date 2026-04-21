# MemberPass — Zapier Platform Integration

Thin TypeScript wrapper around MemberPass's public REST API (`https://api.memberpass.net/v1`) and outbound-webhook subsystem, packaged for the Zapier App Directory.

## Installation

```bash
npm install
npx zapier login
npx zapier register "MemberPass"
```

## Development

```bash
npm run build
npm run validate
npm run test
npm run push
```

## Architecture

- `src/authentication.ts` — API-key auth. Each user pastes a `mpt_` Sanctum personal access token minted at `https://app.memberpass.net/settings/tokens`. Zapier tests the token against `GET /v1/teams/current`.
- `src/triggers/*` — event-driven triggers. On save, Zapier calls `performSubscribe` which `POST`s to `/v1/webhook-subscriptions` with `{target_url, events[]}`. On delete, `performUnsubscribe` DELETEs the resulting endpoint id.
- `src/creates/*` — placeholder create actions. Backing REST endpoints land after the Laravel `app/Actions/*` extraction (tracked in MemberPass repo).
- `src/searches/*` — placeholder search actions. Wait on the same REST coverage.
- `src/utils/http.ts` — shared fetch helpers scoped to the authenticated bearer token.

## Supported triggers (v0.1)

| Trigger                | Event                    | MemberPass ability              |
| ---------------------- | ------------------------ | ------------------------------- |
| New Subscription       | `subscription.created`   | `project-subscription:view-any` |
| Subscription Cancelled | `subscription.cancelled` | `project-subscription:view-any` |
| Subscription Expired   | `subscription.expired`   | `project-subscription:view-any` |
| Payment Succeeded      | `payment.succeeded`      | `project-subscription:view-any` |
| Payment Failed         | `payment.failed`         | `project-subscription:view-any` |
| Access Code Redeemed   | `access_code.redeemed`   | `project-access-code:view-any`  |
| Member Joined          | `member.joined`          | `project-user:view-any`         |
| Member Banned          | `member.banned`          | `project-user:view-any`         |

Full catalog: `memberpass://enums/webhook-event` (MCP resource) or `https://docs.memberpass.net/webhooks/event-reference`.

## Release

`zapier push` uploads a new version; `zapier promote <version>` rolls it out to directory users.
