# Changelog

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
