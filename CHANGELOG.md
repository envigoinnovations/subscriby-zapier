# Changelog

## 3.0.0 — 2026-08-31

**Breaking.** Create Plan and Update Plan now take a **Plan Kind** and the fields that belong to it. Existing Zaps using those two actions will need their fields re-mapped; every other trigger, action and search is untouched.

### Changed — Create Plan and Update Plan are kind-scoped

Both actions now open with a **Plan Kind** dropdown — *Recurring Subscription*, *Time-Limited Pass* or *Pass Series* — and the fields below it change to match. Only the fields your chosen kind actually accepts are shown.

This mirrors a breaking change in the Subscriby API, which moved plans to a discriminated union: `kind` names exactly one nested object, and sending a block belonging to another kind is now refused rather than ignored. The old flat shape emitted `billing_cycle` and `trial_days` on passes where they mean nothing, and offered no way to express a third plan shape at all.

**What breaks:** the field keys behind Create Plan and Update Plan changed. A Zap that set *Billing Cycle* still sets a billing cycle — the field is now inside the subscription kind's group — but the mapping has to be re-made. Nothing else in this integration changed its field keys.

### Added — Pass Series, a season ticket

A **Pass Series** sells a curated slate of *other* pass plans' dated windows for one payment. It owns no windows of its own, so:

- **Find Pass Windows** (new search) — lists the dated windows a project's pass plans generate, with their IDs, local times, status and holder counts. **Run this first:** a series points at windows that already exist, so this is where its Pass Window IDs come from.
- Create Plan's Pass Series group takes those IDs, plus a seat limit, a sales cutoff measured against the whole season, a next-season link with a holders-only presale, and **Automatic Inclusion Rules**.
- Rules are the part worth understanding. A rule describes windows rather than naming them, and it keeps matching after the save: a window scheduled later is added to the slate **and granted to everyone already holding the series**, at no charge. Handpicked IDs never grow on their own. The two compose.

### Added — 8 pass series triggers

- **Pass Series Purchased** — a season ticket bought and its whole slate issued. **Fires in addition to Subscription Activated**, because a series is a subscription; if you use both, de-duplicate on `subscription_id`.
- **Pass Series Pass Completed** — one date of a holder's season finished, with running attendance. `granted` and `joined` are separate questions: granted means access was issued, joined means they actually appeared.
- **Pass Series Completed** — a holder reached their last date, with the final tallies. Eight of ten attended is a very different customer from two of ten.
- **Pass Series Pass Added** — a rule absorbed a new window into a live season. Wire a calendar sync to this one.
- **Pass Series Pass Substituted** — a cancelled date was replaced and a holder moved. `was_queued` tells you whether they had already tapped their invite link.
- **Pass Series Pass Dropped** — a cancelled date left a season with no replacement. **`refund_per_holder` is a figure, not an action** — Subscriby never moves the money, so treating it as "already refunded" will double-refund. The amount is per holder: a mid-season buyer paid the same price for fewer dates, so each of theirs is worth more.
- **Pass Series Sold Out** — a capped season sold its last seat. Not permanent; a cancellation releases a seat and it can fire again.
- **Pass Series Presale Opened** — a finished season's holders got first refusal on the next one. Who is invited is worked out at that moment, not at checkout, so linking a next season months later still reaches everyone.

### Added — 3 pass triggers that were missing

- **Pass Window Scheduled** — a window coming into existence. The `pass.*` family reported windows being cancelled, opened and closed but never *created*, so a schedule could not be mirrored outward without polling. Note that editing a schedule regenerates windows in bulk, so one plan save can fire this many times.
- **Pass Holder Queued** — a holder tapped their invite link and their request is held. The moment a buyer stops being a risk, and previously invisible outside the product.
- **Pass Holder Missed a Window** — a window closed and one holder never turned up. Pass Window Closed only reported an aggregate count; this is the half you can act on. A window that never opened, or a purchase that landed too late to use, is deliberately *not* reported as missed.

### Fixed

- The `User-Agent` version was pinned at `2.0.0` while the package was at 2.6.0. It now tracks the real version.
- `pass_series.leg_added` carried the series plan's own timezone, which is always empty — a series has no schedule of its own. It now carries the source plan's zone, so timestamps can be rendered correctly.

### Note on 2.6.0

2.6.0 was published without a changelog entry. It added the five original `pass.*` triggers (window opened / closed / cancelled, holder moved / stranded).

### Catalogue

102 events, 102 triggers — full parity with the `WebhookEvent` enum.

## 2.5.0 — 2026-08-27

### Added — 1 billing trigger

- **Tier Trial Ending** (`billing.trial_ending`) — your own Subscriby trial is about to convert and take its first payment. Until now the trial converted silently and the first thing announcing the charge was Stripe's receipt, so there was nothing a Zap could react to.

  It fires **once per reminder milestone**, not once per trial — 72 hours out and again 24 hours out by default. If your Zap should only run once, filter on `hours_remaining` or de-duplicate on `subscription_id`.

  `amount` is a decimal string with a separate uppercase `currency`, so it can go straight into a spreadsheet or an accounting row without parsing a symbol out of it. Check `amount_estimated` first: when it is `true` the figure is the plan's list price because the upcoming invoice could not be read, and it should not be reconciled against. A creator carrying an account credit will legitimately see `"0.00"`.

## 2.4.0 — 2026-08-20

Added the member support inbox, and closed a gap that had left one event unexposed since it was introduced.

### Added — 7 support triggers

- **Support Conversation Opened** (`support.conversation.opened`) — the first time a member messages your bot with something it does not recognise. Fires once per member per channel; their later messages raise Support Message Received instead.
- **Support Message Received** (`support.message.received`) — the workhorse. Routes member questions into a helpdesk, an ops channel or an on-call rota. **The message body is deliberately not in the payload**: fetch it with List Support Messages so member text never lands in webhook delivery logs.
- **Support Message Sent** (`support.message.sent`) — your side of the exchange, for response-time reporting. Internal notes never raise it; they are private and are not delivered to the member.
- **Support Conversation Assigned** (`support.conversation.assigned`) — handed to a team member, or cleared. `data.assigned_to_user_id` is null on a clear.
- **Support Conversation Resolved** / **Reopened** (`support.conversation.resolved`, `support.conversation.reopened`) — resolving is not final: a conversation reopens by itself when the member writes again, which raises the reopened event.

### Added — 1 missing trigger

- **Bot Status Changed** (`project.bot.status_changed`) — present in Subscriby since the event was introduced but never exposed here, so no Zap could react to a bot losing admin rights or having its token revoked. A bot that cannot reach Telegram silently stops granting and revoking access, which is worth alerting on.

### Added — 3 actions, 3 searches

- **Reply to Support Conversation**, **Resolve Support Conversation**, **Assign Support Conversation** — replies reach a real person on Telegram, attributed to the creator rather than the bot.
- **List Support Conversations**, **Find Support Conversation**, **List Support Messages**.

### Notes

- The catalogue is now at full parity with `WebhookEvent`: 87 events, 87 triggers.
- Internal notes are returned by List Support Messages only when the token also holds `support-conversation:update`. Reading a private remark about a member takes the same permission as writing one.

## 2.3.0 — 2026-08-19

Added the `coupon.*` event family, so every `WebhookEvent` Subscriby emits is exposed again.

### Added — 7 coupon triggers

- **New Coupon** (`coupon.created`), **Coupon Updated** (`coupon.updated`), **Coupon Activated** (`coupon.activated`), **Coupon Deactivated** (`coupon.deactivated`), **Coupon Deleted** (`coupon.deleted`) — the authoring lifecycle, payload nested under `data.coupon` exactly as the `plan.*` family does. `coupon.updated` also carries `data.changes`, naming only the fields that moved with their previous and new values.
- **Coupon Redeemed** (`coupon.redeemed`) — fires on settlement, not when a code is applied, so an abandoned checkout never triggers it. Carries `original_amount`, `discount_amount` and `final_amount` as strings; `final_amount` is what was charged and is the figure to use for revenue reporting.
- **Coupon Exhausted** (`coupon.exhausted`) — the last use of a capped code being claimed. Never fires for an uncapped code, and rides on the same settlement as Coupon Redeemed, so the final redemption produces both.

### Notes

- A coupon is one code many subscribers can redeem for money off. It is not an access code, which is one code for one person and grants access outright — the two have separate triggers and separate payload shapes.
- Switching a code on or off fires Coupon Activated / Coupon Deactivated rather than Coupon Updated, so an automation reacting to a code being pulled does not have to diff payloads to notice.

## 2.1.0 — 2026-08-12

Corrected every trigger sample payload against the live `WebhookEvent` emission sites. The previous samples described a payload shape Subscriby has never sent, so fields mapped in the Zap editor arrived empty at runtime.

### Fixed — sample payload shapes (66 triggers)

- **Flattened the nested objects.** Samples advertised `data.subscription{}`, `data.subscriber{}`, `data.member{}`, `data.payment{}`, `data.invoice{}`, `data.tier{}`. Subscriby actually sends flat sibling keys — `subscription_id`, `plan_id`, `subscriber_id`. Every affected trigger now matches.
- **Removed fabricated fields.** No webhook payload has ever carried a subscriber `name` or `email`; 16 triggers advertised one. Also removed `status`, `renews_at`, `failure_reason`, `changed`, and `reason` where the emitter does not send them.
- **`role.*` / `group.*`** now use the real flat keys (`role_id`, `group_id`, `code`, `name`) instead of a nested object.
- **`team.created` / `team.deleted`** now use flat `team_id` / `name` / `owner_id`.
- **`team.member.*`** now carry the real fields — `email` + `role_id` + `role_code` on invite, `user_id` on join/remove, `user_id` + `role_id` on role change — instead of nested team and member objects.
- **`project.resource.created` / `.deleted` / `.unlinked`** nest a `resource` snapshot (`id`, `title`, `type`, `chat_id`, `active`); `.linked` stays flat. These were inverted.
- **`plan.*`** samples now send `price` as a string, `currency_id` as a currency row id (not an ISO code), and `billing_cycle` from the real enum (`day` / `week` / `month` / `year` / `lifetime`, not `monthly` / `yearly`). Dropped `trial_days`, which is not in the payload.
- **`project.*`** snapshots corrected to `id` / `name` / `handle` / `active` / `team_id`; `description` is not emitted.
- **`billing.*`** invoice samples now include `hosted_invoice_url` and `attempt_count`; `from_tier` / `to_tier` are plan UUIDs, not slugs like `starter`.
- **`project_id` is now `null`** on the envelope for all `team.*`, `role.*`, `group.*`, and `billing.*` samples, matching the account-level events.
- **`subscription.upgraded` / `.downgraded`** show `proration_amount: null` — it is reserved and never populated.

### Fixed — trigger descriptions

- **New Subscription** (`subscription.created`) no longer claims to fire on paid checkout. It fires only for access-code redemptions and cardless trials.
- **Subscription Activated** is now correctly described as the paid-acquisition event, firing once on the first successful payment — not as a follow-on to New Subscription.
- **Member Joined** and **Member Trial Joined** no longer claim to cover paid checkouts.
- **Member Converted**, **Subscription Past Due**, and **Subscription Unpaid** now state their provider coverage (Stripe-only, or Stripe + Razorpay).
- **Billing Tier Cancelled** notes that it fires twice per cancellation with a different field set each time.
- **Payment Pending** notes that correlation fields vary by provider, and that PayPal sends none.
- **Subscription Refunded** and **Payment Refunded** are flagged as not yet emitted by Subscriby.

## 1.1.0 — 2026-04-23

Full-parity sync with the live Subscriby REST + webhook surface.

### New triggers (+52)

All 71 events from the `WebhookEvent` catalog are now exposed as instant (REST Hook) triggers.

- **project.*** (6): `project.updated`, `.archived`, `.restored`, `.deleted`, `.bot.connected`, `.bot.disconnected`
- **project.resource.*** (4): `.created`, `.linked`, `.unlinked`, `.deleted`
- **plan.*** (3): `plan.activated`, `.deleted`, `.sync_completed`
- **subscription.*** (11): `.trial_started`, `.trial_converting`, `.trial_expired`, `.reactivated`, `.paused`, `.unpaused`, `.past_due`, `.unpaid`, `.refunded`, `.upgraded`, `.downgraded`
- **payment.*** (2): `payment.pending`, `.refunded`
- **member.*** (5): `.converted`, `.churned`, `.removed`, `.resource_added`, `.resource_removed`
- **team.*** (6): `team.created`, `.deleted`, `.member.invited`, `.member.joined`, `.member.removed`, `.member.role_changed`
- **role.*** (3): `role.created`, `.updated`, `.deleted`
- **group.*** (3): `group.created`, `.updated`, `.deleted`
- **billing.*** (9): `billing.invoice_created`, `.invoice_paid`, `.invoice_overdue`, `.payment_failed`, `.grace_period_warning`, `.account_locked`, `.tier_upgraded`, `.tier_downgraded`, `.tier_cancelled`

### New actions (+10)

- `delete_project`, `delete_plan`, `delete_access_code`
- `unlink_resource`, `delete_resource`
- `create_webhook_endpoint`, `delete_webhook_endpoint`, `rotate_webhook_secret`, `test_webhook_endpoint`
- `revoke_token`

### New searches (+29)

Lists, gets, and the full Analytics API.

- Resources: `list_projects`, `get_project`, `list_plans`, `list_subscriptions`, `list_members`, `list_access_codes`, `preview_access_code_cost`, `list_resources`, `get_resource`
- Payments: `list_payment_methods`, `get_payment_method`
- Webhooks: `list_webhook_endpoints`, `list_webhook_deliveries`
- Tokens: `list_tokens`, `get_token`
- Teams / RBAC: `list_teams`, `get_team`, `get_current_team`, `list_team_members`, `get_team_member`, `list_roles`, `get_role`, `list_groups`, `get_group`
- Ops: `list_activity`, `get_bot_status`, `get_bot_link`, `get_portal_url`, `get_deep_link`
- Analytics (via `/v1/analytics/*`): `get_dashboard_metrics`, `get_earnings_report`, `get_subscriber_analytics`, `get_transaction_breakdown`, `get_plan_performance`, `list_transactions`

### Other

- Auth help text updated to reference the new Stripe-style `sbt_live_<id>_<secret>` / `sbt_test_<id>_<secret>` token format.
- `User-Agent` bumped to `Subscriby-Zapier/1.1.0`.
- No breaking changes — every existing trigger / action / search key is preserved, so live Zaps from 1.0.0 keep working.

## 1.0.0

Initial release to public.
