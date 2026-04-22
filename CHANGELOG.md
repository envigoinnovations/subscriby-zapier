# Changelog

## 1.1.0 — 2026-04-23

Full-parity sync with the live MemberPass REST + webhook surface.

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

- Auth help text updated to reference the new Stripe-style `mpt_live_<id>_<secret>` / `mpt_test_<id>_<secret>` token format.
- `User-Agent` bumped to `MemberPass-Zapier/1.1.0`.
- No breaking changes — every existing trigger / action / search key is preserved, so live Zaps from 1.0.0 keep working.

## 1.0.0

Initial release to public.
