# Subscriby — Zapier Platform Integration

The official Subscriby app for Zapier: one trigger per webhook event, one action per write and one search per read of the public REST API (`https://api.subscriby.net/v1`), packaged for the Zapier App Directory on Zapier Platform Core in TypeScript. The three catalogues below are generated from the source files and the event catalogue Subscriby publishes, so they list what the app offers rather than what someone typed.

## Installation

The app is listed privately. The [Zapier guide](https://docs.subscriby.net/integrations/zapier) in the documentation has the invite, the walkthrough and a worked Zap for every common recipe. Once invited, add **Subscriby** as an app in the Zap editor and connect it with an API token.

## Setup

1. Mint an API token at `https://app.subscriby.net/settings/tokens`. Every token is bound to a team; you pick the abilities it carries. See the [ability catalogue](https://docs.subscriby.net/api/v1/abilities) for the full list. Minimums per use-case:
   - **Triggers** — `webhook-endpoint:manage`. Restrict to a single project by also scoping the token to that project.
   - **Searches** — the matching `*:view` / `*:view-any` abilities for the resources you list or look up.
   - **Actions** — the matching `*:create` / `*:update` / `*:delete` abilities for the writes the Zap performs.
2. In Zapier, connect the **Subscriby** app and paste the `sbt_...` token. Zapier tests the connection against `GET /v1/me`.
3. Pick a trigger, an action or a search. Turning a Zap on registers the trigger's event as a webhook endpoint with Subscriby; turning it off removes the endpoint.

## Supported triggers (191)

One trigger per webhook event, every event in the catalogue Subscriby publishes at `https://api.subscriby.net/webhook-events.json`; the family links open the [event reference](https://docs.subscriby.net/webhooks/v1/events), where each event's payload and required token ability are listed. A trigger's event is registered as a webhook endpoint when the Zap is turned on and removed when it is turned off.

| Family | Count | Events |
| ------ | ----- | ------ |
| [Subscription](https://docs.subscriby.net/webhooks/v1/events/subscription) | 21 | `subscription.access_restored`, `subscription.access_suspended`, `subscription.activated`, `subscription.cancellation_feedback`, `subscription.cancelled`, `subscription.created`, `subscription.downgraded`, `subscription.expired`, `subscription.offer_taken`, `subscription.past_due`, `subscription.paused`, `subscription.payment_recovered`, `subscription.reactivated`, `subscription.refunded`, `subscription.renewed`, `subscription.trial_converting`, `subscription.trial_expired`, `subscription.trial_started`, `subscription.unpaid`, `subscription.unpaused`, `subscription.upgraded` |
| [Member](https://docs.subscriby.net/webhooks/v1/events/member) | 16 | `member.access_extended`, `member.banned`, `member.churned`, `member.converted`, `member.identity_linked`, `member.identity_unlinked`, `member.joined`, `member.kicked`, `member.lead_created`, `member.removed`, `member.resource_added`, `member.resource_pending`, `member.resource_reissued`, `member.resource_removed`, `member.trial_joined`, `member.unbanned` |
| [Project](https://docs.subscriby.net/webhooks/v1/events/project) | 14 | `project.archived`, `project.created`, `project.deleted`, `project.design_published`, `project.payment_method.deleted`, `project.payment_method.updated`, `project.resource.created`, `project.resource.deleted`, `project.resource.linked`, `project.resource.status_changed`, `project.resource.unlinked`, `project.resource.updated`, `project.restored`, `project.updated` |
| [Recovery](https://docs.subscriby.net/webhooks/v1/events/recovery) | 13 | `recovery.identity_relinked`, `recovery.incident_opened`, `recovery.incident_resolved`, `recovery.installation_failed_over`, `recovery.operation_completed`, `recovery.operation_failed`, `recovery.operation_reverted`, `recovery.operation_started`, `recovery.readiness_changed`, `recovery.resource_failed_over`, `recovery.resource_replaced`, `recovery.standby_registered`, `recovery.standby_removed` |
| [Support](https://docs.subscriby.net/webhooks/v1/events/support) | 12 | `support.canned_reply.created`, `support.canned_reply.deleted`, `support.canned_reply.updated`, `support.conversation.assigned`, `support.conversation.blocked`, `support.conversation.opened`, `support.conversation.reopened`, `support.conversation.resolved`, `support.conversation.unblocked`, `support.message.received`, `support.message.sent`, `support.settings.updated` |
| [Billing](https://docs.subscriby.net/webhooks/v1/events/billing) | 10 | `billing.account_locked`, `billing.grace_period_warning`, `billing.invoice_created`, `billing.invoice_overdue`, `billing.invoice_paid`, `billing.payment_failed`, `billing.tier_cancelled`, `billing.tier_downgraded`, `billing.tier_upgraded`, `billing.trial_ending` |
| [Connector](https://docs.subscriby.net/webhooks/v1/events/connector) | 10 | `connector.connected`, `connector.disconnected`, `connector.doctor_completed`, `connector.installed`, `connector.outage_closed`, `connector.outage_compensated`, `connector.outage_opened`, `connector.settings_updated`, `connector.status_changed`, `connector.uninstalled` |
| [Partner](https://docs.subscriby.net/webhooks/v1/events/partner) | 10 | `partner.application_approved`, `partner.application_rejected`, `partner.payout_recorded`, `partner.rate_changed`, `partner.referral_converted`, `partner.referral_signed_up`, `partner.reward_approved`, `partner.reward_credited`, `partner.reward_earned`, `partner.reward_reversed` |
| [Referral](https://docs.subscriby.net/webhooks/v1/events/referral) | 10 | `referral.affiliate_approved`, `referral.affiliate_joined`, `referral.affiliate_suspended`, `referral.captured`, `referral.converted`, `referral.payout_recorded`, `referral.program_updated`, `referral.reward_approved`, `referral.reward_earned`, `referral.reward_reversed` |
| [Pass](https://docs.subscriby.net/webhooks/v1/events/pass) | 8 | `pass.holder_missed`, `pass.holder_moved`, `pass.holder_queued`, `pass.holder_stranded`, `pass.window_cancelled`, `pass.window_closed`, `pass.window_opened`, `pass.window_scheduled` |
| [Pass Series](https://docs.subscriby.net/webhooks/v1/events/pass-series) | 8 | `pass_series.completed`, `pass_series.leg_added`, `pass_series.leg_completed`, `pass_series.leg_dropped`, `pass_series.leg_substituted`, `pass_series.presale_opened`, `pass_series.purchased`, `pass_series.seats_exhausted` |
| [Plan](https://docs.subscriby.net/webhooks/v1/events/plan) | 8 | `plan.activated`, `plan.created`, `plan.deactivated`, `plan.deleted`, `plan.order_changed`, `plan.sold_out`, `plan.sync_completed`, `plan.updated` |
| [Coupon](https://docs.subscriby.net/webhooks/v1/events/coupon) | 7 | `coupon.activated`, `coupon.created`, `coupon.deactivated`, `coupon.deleted`, `coupon.exhausted`, `coupon.redeemed`, `coupon.updated` |
| [Sequence](https://docs.subscriby.net/webhooks/v1/events/sequence) | 7 | `sequence.converted`, `sequence.created`, `sequence.deleted`, `sequence.enrolled`, `sequence.exited`, `sequence.step_sent`, `sequence.updated` |
| [Team](https://docs.subscriby.net/webhooks/v1/events/team) | 7 | `team.created`, `team.deleted`, `team.member.invited`, `team.member.joined`, `team.member.removed`, `team.member.role_changed`, `team.updated` |
| [Copilot Credit](https://docs.subscriby.net/webhooks/v1/events/copilot-credit) | 4 | `copilot_credit.granted`, `copilot_credit.low`, `copilot_credit.purchased`, `copilot_credit.refunded` |
| [Group](https://docs.subscriby.net/webhooks/v1/events/group) | 4 | `group.created`, `group.deleted`, `group.members_synced`, `group.updated` |
| [Payment](https://docs.subscriby.net/webhooks/v1/events/payment) | 4 | `payment.failed`, `payment.pending`, `payment.refunded`, `payment.succeeded` |
| [Access Code](https://docs.subscriby.net/webhooks/v1/events/access-code) | 3 | `access_code.expired`, `access_code.generated`, `access_code.redeemed` |
| [Knowledge](https://docs.subscriby.net/webhooks/v1/events/knowledge) | 3 | `knowledge.created`, `knowledge.deleted`, `knowledge.updated` |
| [Smart Link](https://docs.subscriby.net/webhooks/v1/events/link) | 3 | `link.archived`, `link.created`, `link.updated` |
| [Role](https://docs.subscriby.net/webhooks/v1/events/role) | 3 | `role.created`, `role.deleted`, `role.updated` |
| [Broadcast](https://docs.subscriby.net/webhooks/v1/events/broadcast) | 2 | `broadcast.completed`, `broadcast.queued` |
| [Checkout](https://docs.subscriby.net/webhooks/v1/events/checkout) | 2 | `checkout.recovered`, `checkout.stalled` |
| [Creator Task](https://docs.subscriby.net/webhooks/v1/events/creator-task) | 2 | `creator_task.completed`, `creator_task.opened` |
| **Total** | **191** | |

## Supported actions (126)

One action per write of the REST API, each sending a fresh `Idempotency-Key` so a retried Zap step never double-fires.

| Resource | Actions |
| -------- | ------- |
| Connector Installation | Disconnect Connector, Install Connector, Restore Connector Access, Run Connector Doctor, Uninstall Connector, Update Connector Installation Settings, Verify Connector Installation |
| Resource | Activate Resource, Create Resource, Create Resource From Space, Deactivate Resource, Delete Resource, Unlink Resource, Update Resource |
| Subscription | Cancel Subscription, Pause Subscription Access, Reactivate Subscription, Reissue Subscription Grants, Remind Member to Connect, Remind Pass Holder, Unpause Subscription Access |
| Plan | Create Plan, Delete Plan, Publish Plan, Start Next Season, Unpublish Plan, Update Plan |
| Webhook Endpoint | Create Webhook Endpoint, Delete Webhook Endpoint, Pause Webhook Endpoint, Resume Webhook Endpoint, Rotate Webhook Secret, Test Webhook Endpoint |
| Coupon | Activate Coupon, Create Coupon, Deactivate Coupon, Delete Coupon, Update Coupon |
| Project | Archive Project, Create Project, Delete Project, Restore Project, Update Project |
| Resource Standby | Remove Resource Standby, Request Resource Standby, Set Resource Standby Mirror, Use Resource Standby, Withdraw Resource Standby Request |
| Support Conversation | Assign Support Conversation, Block Support Contact, Reopen Support Conversation, Resolve Support Conversation, Unblock Support Contact |
| Group | Create Group, Delete Group, Sync Group Members, Update Group |
| Payment Method | Activate Payment Method, Deactivate Payment Method, Delete Payment Method, Sync Payment Method Plans |
| Referral Program | Activate Referral Program, Deactivate Referral Program, Delete Referral Program, Update Referral Program |
| Team Member | Cancel Team Invitation, Change Team Member Role, Invite Team Member, Remove Team Member |
| Canned Reply | Create Canned Reply, Delete Canned Reply, Update Canned Reply |
| Knowledge Entry | Create Knowledge Entry, Delete Knowledge Entry, Update Knowledge Entry |
| Member | Ban Member, Kick Member, Unban Member |
| Pass Window | Cancel Pass Window, Create Pass Window, Remind Pass Window Queue |
| Portal Design | Discard Portal Design Draft, Publish Portal Design, Update Portal Design |
| Recovery Operation | Notify Members Of Recovery, Nudge Pending Readmissions, Revert Recovery Operation |
| Referral Affiliate | Add Referral Affiliate, Approve Referral Affiliate, Suspend Referral Affiliate |
| Role | Create Role, Delete Role, Update Role |
| Sequence | Create Sequence, Delete Sequence, Update Sequence |
| Smart Link | Archive Smart Link, Create Smart Link, Update Smart Link |
| Team | Create Team, Delete Team, Update Team |
| Broadcast | Broadcast Message, Retry Broadcast |
| Notification | Mark All Notifications Read, Mark Notification Read |
| Partner Program | Accept Partner Terms, Update Partner Payout Details |
| Resource Replacement | Request Resource Replacement, Withdraw Resource Replacement Request |
| Webhook Delivery | Retry Dead Webhook Deliveries, Retry Webhook Delivery |
| Access Code | Delete Access Code |
| Access Code Batch | Bulk Generate Access Codes |
| Copilot Credits Settings | Update Copilot Credits Settings |
| Creator Task | Complete Creator Task |
| Installation Action | Run Connector Installation Action |
| Member Identity | Unlink Member Identity |
| Recovery Settings | Update Recovery Settings |
| Referral Payout | Record Referral Payout |
| Resource Link Request | Request Resource Link |
| Retention Settings | Update Retention Settings |
| Standby Installation | Remove Standby Installation |
| Support Message | Reply to Support Conversation |
| Support Settings | Update Support Settings |
| Token | Revoke Token |

## Supported searches (105)

One search per list or lookup of the REST API, returning the matching records the way Zapier expects them.

| Resource | Searches |
| -------- | ------- |
| Member | Find Member by Connector Account, Find Member by ID, List Members |
| Plan | Find Plan by ID, Find Plan by Name, List Plans |
| Project | Find Project by Handle, Get Project, List Projects |
| Team | Get Current Team, Get Team, List Teams |
| Broadcast | Find Broadcasts, Get Broadcast |
| Canned Reply | Find Canned Replies, Get Canned Reply |
| Connector | Get Connector, List Connectors |
| Connector Installation | Get Connector Installation, List Connector Installations |
| Coupon | Find Coupons, Get Coupon |
| Group | Get Group, List Groups |
| Knowledge Entry | Find Knowledge Entries, Get Knowledge Entry |
| Partner Referral | Find Partner Referrals, Get Partner Referral |
| Pass Window | Find Pass Windows, Get Pass Window |
| Payment Method | Get Payment Method, List Payment Methods |
| Referral | Find Referrals, Get Referral |
| Referral Affiliate | Find Referral Affiliates, Get Referral Affiliate |
| Resource | Get Resource, List Resources |
| Role | Get Role, List Roles |
| Sequence | Find Sequences, Get Sequence |
| Smart Link | Find Smart Links, Get Smart Link |
| Subscription | Find Subscription by ID, List Subscriptions |
| Support Conversation | Find Support Conversation, List Support Conversations |
| Team Member | Get Team Member, List Team Members |
| Token | Get Token, List Tokens |
| Webhook Delivery | Get Webhook Delivery, List Webhook Deliveries |
| Webhook Endpoint | Get Webhook Endpoint, List Webhook Endpoints |
| Access Code | List Access Codes |
| Access Code Cost Preview | Preview Access Code Cost |
| Account | Get Me |
| Activity Entry | List Activity |
| Broadcast Failure | List Broadcast Failures |
| Cancellation Record | Find Cancellation Feedback |
| Checkout | Find Checkouts |
| Connector Analytics | Get Connector Analytics |
| Connector Space | List Connector Spaces |
| Connector Uninstall Preview | Get Connector Uninstall Preview |
| Copilot Credits | Get Copilot Credits |
| Copilot Credits Statement Line | Find Copilot Credits Statement |
| Creator Task | List Creator Tasks |
| Dashboard Metric | Get Dashboard Metrics |
| Deep Link | Get Deep Link |
| Earnings Report | Get Earnings Report |
| Grant | List Subscription Grants |
| Installation Action | List Connector Installation Actions |
| Member Identity | List Member Identities |
| Notification | List Notifications |
| Partner Payout | Find Partner Payouts |
| Partner Program | Get Partner Program |
| Partner Reward | Find Partner Rewards |
| Pass Move | Find Pass Moves |
| Pass Roster Row | Find Pass Roster Rows |
| Plan Performance Row | Get Plan Performance |
| Portal Design | Get Portal Design |
| Portal URL | Get Portal URL |
| Recovery Allowance | Get Recovery Allowances |
| Recovery Incident | List Recovery Incidents |
| Recovery Operation | List Recovery Operations |
| Recovery Readiness | Get Recovery Readiness |
| Recovery Roll Call | Get Recovery Roll Call |
| Recovery Settings | Get Recovery Settings |
| Referral Payout | Find Referral Payouts |
| Referral Program | Get Referral Program |
| Referral Reward | Find Referral Rewards |
| Resource Standby | Get Resource Standby |
| Retention Activity | Find Retention Activity |
| Retention Settings | Get Retention Settings |
| Retention Stats | Get Retention Stats |
| Revenue Composition | Get Revenue Composition |
| Sequence Enrollment | Find Sequence Enrollments |
| Smart Link Funnel | Get Smart Link Funnel |
| Subscriber Analytics | Get Subscriber Analytics |
| Support Message | List Support Messages |
| Support Settings | Get Support Settings |
| Transaction | List Transactions |
| Transaction Breakdown | Get Transaction Breakdown |

## Development

```bash
npm install
npx zapier login
npm run build
npm run validate
npm run test
```

- `npm run sync:readme` regenerates the three catalogue tables above from `src/` and `scripts/data/webhook-events.json`. Run it after adding, renaming or removing an operation.
- `npm run export:operations` hands the same scan to the documentation site beside this repo, where the Zapier page is generated from it.
- `npm run verify:surface` fails the build while the app's triggers, actions and searches disagree with the catalogues Subscriby exports or with the documentation's copy of them.

## Architecture

- `src/authentication.ts` — API-key auth. Each user pastes a `sbt_` personal access token minted at `https://app.subscriby.net/settings/tokens`. Zapier tests the connection against `GET /v1/me`.
- `src/triggers/*` — one webhook trigger per event, each registered in `src/index.ts`. On save, Zapier registers the event as a webhook endpoint through the REST API; on delete it removes the endpoint again.
- `src/triggers/dropdown-*.ts` — dynamic dropdowns that populate project, plan, member and token pickers on other steps. These are not event triggers and are hidden from the trigger list.
- `src/creates/*` — one write action per file against the live REST surface (create, update, delete, archive and restore, activate and deactivate, ban, refund, remind, retry and the rest), each sending a fresh `Idempotency-Key`.
- `src/searches/*` — one search action per file (lists and lookups) against the same REST surface.
- `src/utils/http.ts` — shared fetch helpers scoped to the authenticated bearer token; the `User-Agent` carries the app's version.
- `scripts/lib/scan-operations.mjs` — reads every operation's `key`, `noun`, `label`, `description` and API call from the source files; `sync-readme.mjs`, `export-operations.mjs` and `verify-surface.mjs` all run on it.

The machine-readable event catalogue is published at `https://api.subscriby.net/webhook-events.json` and mirrored by the `subscriby://enums/webhook-event` MCP resource; the prose version is the [event reference](https://docs.subscriby.net/webhooks/v1/events). Each event's required token ability is a column of that JSON.

## Release

`zapier push` uploads a new version; `zapier promote <version>` rolls it out to directory users. On Windows, `npm run push:win` parks the `.git` folder the CLI trips over, builds and pushes.

### Releasing a breaking version

3.0.0 removed the bot-family triggers, action and searches that Subscriby 5.0 retired (**Project Bot Connected**, **Project Bot Disconnected**, **Bot Status Changed**, **Disconnect Bot**, **Get Bot Status**, **Get Bot Link**, and `bot_id` on the project actions) and changed the resource row to speak kinds and places (`kind`, `connector`, `space` in place of `type` and `chat_id`). A live Zap on a removed key cannot be carried across automatically; one on a changed row keeps running and sees the new fields. Zapier has a mechanism for exactly this and it must be run in order:

1. `zapier push` — upload 3.0.0 (on Windows, `npm run push:win`, which parks the `.git` folder the CLI trips over).
2. `zapier promote 3.0.0` — make it the version new Zaps are built on.
3. `zapier migrate 2.3.0 3.0.0` — move existing users across.

Step 3 is the one that is easy to forget, and skipping it leaves everyone on 2.3.0 indefinitely. Migrating a percentage first (`zapier migrate 2.3.0 3.0.0 10`) is worth doing when Zaps use the removed keys, because those have to be rebuilt on **Connector Connected**, **Connector Disconnected**, **Connector Status Changed**, **Disconnect Connector**, **Get Connector Installation** and **Get Deep Link** by the person who built them.

## Links

- [Subscriby documentation](https://docs.subscriby.net)
- [Zapier integration guide](https://docs.subscriby.net/integrations/zapier)
- [API reference](https://docs.subscriby.net/api/v1)
- [Event reference](https://docs.subscriby.net/webhooks/v1/events)
