# Changelog

## 4.1.0 — 10 October 2026

Two programmes arrive together, and everything already in the app stays as it was.

The **Referral Program** (Subscriby 5.0.11) turns a project's members into affiliates: each gets a code and a link, a friend who arrives through them is counted for thirty days, and when that friend's first payment settles the affiliate earns free membership days or a cash commission the creator pays out. Bundled with Growth; Free and Starter buy the Referral Program Addon. Everything lives under `/v1/projects/{project}` behind the `project-referral:*` abilities.

The **Partner Program** (Subscriby 5.0.12) is Subscriby's own: a creator who brings other creators to Subscriby earns a share of every platform invoice they pay, for twelve months from each one's first paid plan, settled as Subscriby Credit or paid out in cash. Everything is the token's creator's own, under `/v1/me/partner`, behind `account:read` and `account:write`; applying is done on the dashboard or in the bot, and the destination a payout rail pays to is written but never returned.

### Added

- **Referral Program triggers** (10): **Referral Program Updated**, **New Referral Affiliate**, **Referral Affiliate Approved**, **Referral Affiliate Suspended**, **New Referral**, **Referral Converted**, **Referral Reward Earned**, **Referral Reward Approved**, **Referral Reward Reversed** and **Referral Payout Recorded**, one per `referral.*` event, with the catalogue's payloads as their samples.
- **Referral Program actions** (8): **Update Referral Program** (`PUT /v1/projects/{project}/referral-program`; the first call creates the programme, later calls change only the fields filled in, with Unset Fields for the nullable ones and Count Every Plan for an empty plan list), **Activate Referral Program**, **Deactivate Referral Program**, **Delete Referral Program**, **Add Referral Affiliate** (with the member dropdown), **Approve Referral Affiliate**, **Suspend Referral Affiliate** and **Record Referral Payout**.
- **Referral Program searches** (7): **Get Referral Program** (no rows while the project has none), **Find Referral Affiliates**, **Get Referral Affiliate** (the one read that carries the per-currency balances), **Find Referrals** (with a `since` instant for scheduled Zaps), **Get Referral**, **Find Referral Rewards** and **Find Referral Payouts**.
- **Partner Program triggers** (10): **New Partner Referral**, **Partner Referral Converted**, **Partner Commission Earned**, **Partner Commission Approved**, **Partner Commission Credited**, **Partner Commission Reversed**, **Partner Payout Recorded**, **Partner Application Approved**, **Partner Application Rejected** and **Partner Rate Changed**, one per `partner.*` event, with the catalogue's payloads as their samples; `project_id` is `null` on every one.
- **Partner Program actions** (2): **Update Partner Payout Details** (`PUT /v1/me/partner/payout-details`: the rail, what it pays to and the tax declaration; nothing ever returns the destination) and **Accept Partner Terms**.
- **Partner Program searches** (5): **Get Partner Program** (no rows until you apply; never the payout destination), **Find Partner Referrals** (by status, each creator named by display name alone), **Get Partner Referral**, **Find Partner Rewards** (the commission ledger, by status) and **Find Partner Payouts**.

### Changed

- **Get Me** carries `partner_code` and `partner_link`, set once Subscriby approved you as a partner and `null` before.

## 4.0.1 — 26 September 2026

### Fixed

- The **Create Project** sample output no longer shows a `type`: a project has no platform field, it installs connectors, and the sample now matches what the API answers.

## 4.0.0 — 20 September 2026

Breaking. **Find Subscriber by Telegram ID** is removed: it asked the members endpoint for a `telegram_user_id` that Subscriby 5.0 no longer carries, so since 19 September it returned nothing. **Find Member by Connector Account** replaces it and works for every connector.

### Added

- **Find Member by Connector Account** (search) — `GET /v1/projects/{project}/members?identity=connector:external_id`. Pick the project, the connector (from the live Connectors Marketplace) and the platform's own id for the account, and get the member row with their `identities[]` embedded, or no rows. The lookup that turns the id a bot or a server hands you into a Subscriby member.

### Removed

- **Find Subscriber by Telegram ID** (search). Zaps using it must be re-pointed at **Find Member by Connector Account** with the connector set to the platform the id came from.

### Changed

- **Find Member by ID**'s sample row shows `identities[]` in place of the `telegram_user_id` field that no longer exists.

## 3.0.0 — 19 September 2026

Breaking. The bot-family aliases Subscriby deprecated in 4.x are gone with Subscriby 5.0, so this release is a major; the neutral connector family replaces them one for one (see Removed). Members can now connect more than one platform account to a membership, and the integration follows. Resources speak kinds and places rather than Telegram types and chat ids (see Changed).

### Changed — resources speak kinds

- Every resource row (**Get Resource**, **List Resources**, **Create Resource**, **Update Resource**, **Activate Resource**, **Deactivate Resource**, **Unlink Resource**, and the `resource` object on **Project Resource Created**, **Resource Updated**, **Project Resource Deleted** and **Project Resource Unlinked**) is `{id, project_id, kind, connector, space, title, description, active, created_at, updated_at}`. `kind` is `manual` for a perk the creator hands over by hand, otherwise the connector's kind spelled `connector:kind` (`telegram:channel`, `telegram:group`, `telegram:supergroup`); `connector` names the platform (`null` for a perk); `space` is the place the resource is bound to (`id`, the platform's `external_id`, `title`) or `null` for a perk and for an unlinked row. `type` and `chat_id` are gone.
- **Project Resource Linked** carries `connector`, `kind` and `space_id`. **Member Added to Resource**, **Member Access Pending**, **Member Access Reissued**, **Member Removed From Resource**, **Creator Task Opened** and **Creator Task Completed** carry `resource_kind` (`telegram:channel`, `manual`) in place of `resource_type`. A recovery swap's **Resource Updated** carries `changes.space_id` (and `changes.kind` when the platform upgraded the place, a Telegram group that became a supergroup) instead of `changes.chat_id`.
- **Request Resource Link** takes **Kind** as `connector:kind` from a dropdown of the kinds the project's connected connectors gate, fed by the live Connectors Marketplace; `channel` alone is refused. **List Resources** gains optional **Kind** and **Connector** filters. **Create Resource** sends no type: it only ever creates a manual perk.
- **Find Plan by ID**, **Find Plan by Name** and **List Plans** rows' `resources[]` carry `kind` and `connector` instead of `type`.
- **List Connectors** and **Get Connector** rows' `resource_kinds[]` gain `upgrades_from` (the kind of the same connector a place can be an in-place upgrade of) and `plan_kinds` (the plan shapes the kind sells: `one_time`, `recurring`, `pass`, `pass_series`).

### Removed — bot-family aliases

- Triggers **Project Bot Connected** (`project.bot.connected`), **Project Bot Disconnected** (`project.bot.disconnected`) and **Bot Status Changed** (`project.bot.status_changed`). Use **Connector Connected**, **Connector Disconnected** and **Connector Status Changed**; Subscriby's 5.0 migration re-points every existing subscription to the twin, so a Zap on the old trigger keeps receiving the fact under the new name and payload (`connector`, `installation_id` instead of `bot_id`).
- Action **Disconnect Bot** (`DELETE /v1/projects/{project}/bot`). Use **Disconnect Connector**. A token minted with `bot:manage` was rewritten to `project-connector:delete`.
- Searches **Get Bot Status** (`GET /v1/projects/{project}/bot`) and **Get Bot Link** (`GET …/distribution/bot-link`). Use **Get Connector Installation** (`display_name`, `handle`, `state`, health) and **Get Deep Link** (`bot_url`, `deep_link`).
- The `bot_id` field on **Create Project** and **Update Project**; a project installs connectors with **Install Connector**.

### Added — member identities

- **List Member Identities** (search) reads `GET /v1/projects/{project}/members/{member}/identities`: the accounts a member has connected, with `connector`, the platform's `external_id`, `display_name` and `username`, how the link was proven (`source`) and which one the project reaches first (`preferred`).
- **Unlink Member Identity** (action) calls `DELETE …/identities/{link}`. Pass the link `id` from List Member Identities, not the platform's account id. The API refuses to remove a member's last way to sign in, which surfaces as a `422`.
- Triggers **Member Connected Account** (`member.identity_linked`) and **Member Disconnected Account** (`member.identity_unlinked`), taking the catalogue to 120 events.

### Added — access grants

- **List Subscription Grants** (search) reads `GET /v1/subscriptions/{subscription}/grants`: the access ledger for one purchase, one row per resource (and per pass window) with `connector`, `mode` (`bearer_link`, `membership`, `role`, `creator_task`), `state` (`pending_identity`, `pending`, `held`, `granted`, `revoked`, `failed`), the connector's `reference` (the invite link on Telegram) and, for a failure, `failure_kind` and `failure_detail`. Use it to branch on whether a member actually got in, instead of inferring it from the payment status. **Find Subscription by ID** now returns the same rows as `grants`.
- The **Member Added to Resource** trigger (`member.resource_added`) now carries `connector`, `grant_id` and `mode` alongside the resource, so a Zap can branch by platform or look the grant up; **Member Removed From Resource** (`member.resource_removed`) carries the same three, naming the ledger row that ended.
- **Reissue Subscription Grants** (action) calls `POST /v1/subscriptions/{subscription}/grants/reissue`: revokes the grants a member holds — every resource, or the one named in **Resource ID** — and has fresh ones issued, which the bot sends to the member. The members page's "Refresh invite links", for Zaps. Answers `reissued` (how many grants were revoked) and `status: reissue_queued`.
- Trigger **Member Access Reissued** (`member.resource_reissued`): raised per resource by that action, the members page and the member's own refresh in the bot; **Member Added to Resource** follows for each fresh grant. Takes the catalogue to 122 events.
- Trigger **Member Access Pending** (`member.resource_pending`): a purchase entitles a member to a resource on a connector they hold no account on (an email-only portal buyer, a plan spanning a connector they have not linked), so the ledger records a `pending_identity` grant and access is issued the moment they connect one — **Member Added to Resource** then fires with the same `grant_id`.

### Added — account

- **Get Me** (search) reads `GET /v1/me`: the creator the token belongs to, the team it is scoped to (`current_team`, the id every other step acts in), every team they hold, the platform `plan` and its `capabilities`, the accounts linked on the connectors (`identities`) and where alerts go (`alert_destinations`, with `alert_destinations_default` true while nothing has been written). Use it as the first step of a Zap that branches on plan capabilities or needs the team id.

## 2.3.0 — 7 September 2026

Additive. Every creator operation the Subscriby dashboard offers now has a Zapier action, search or trigger, and the one search that pointed at the wrong endpoint is fixed.

### Added — coupons

Zapier had no coupon operations at all. **Create Coupon**, **Update Coupon**, **Activate Coupon**, **Deactivate Coupon** and **Delete Coupon** join **Find Coupons** and **Get Coupon**. The field help carries the two traps the API documents: a discount applies to the first payment only, and an empty **Plan IDs** covers every plan in the project, including ones added later — name the plan when you mean one plan.

### Added — the rest of the dashboard's verbs

- **Support inbox** — Reopen Support Conversation, Block Support Contact, Unblock Support Contact; Create / Update / Delete Canned Reply with Find Canned Replies and Get Canned Reply; Update Support Settings and Get Support Settings. Blocking silences the member behind a thread without touching their paid access.
- **Resources** — Update Resource (partial: a title-only update leaves the description as stored), Activate Resource, Deactivate Resource.
- **Bot** — Disconnect Bot. Connecting a bot stays in the dashboard, where the token is typed.
- **Pass windows** — Create Pass Window, Cancel Pass Window (the resettlement tallies come back under `meta`), Remind Pass Window Queue, Get Pass Window. **Remind Pass Holder** nudges one subscriber and answers `reminded: false` when there was nothing to send, which is a normal answer rather than an error.
- **Plans** — Start Next Season creates the successor of a pass series.
- **Payment methods** — Activate, Deactivate, Sync Plans and Delete. Activating a Stripe method whose Connect onboarding never finished is refused; finish onboarding in the dashboard.
- **Webhooks** — Pause / Resume Webhook Endpoint and Get Webhook Endpoint; Get Webhook Delivery, Retry Webhook Delivery and Retry Dead Webhook Deliveries.

### Added — nine triggers

One per new event: Resource Updated, Payment Method Updated, Payment Method Deleted, Support Contact Blocked, Support Contact Unblocked, New Canned Reply, Canned Reply Updated, Canned Reply Deleted and Support Settings Updated. Update payloads carry a `changes` map naming only what moved; payment-method payloads name changed credential keys and never a value.

### Fixed

- **List Webhook Deliveries** called `/webhook-events` with an event-type filter, which is the polling feed and not the delivery log. It now reads `GET /v1/webhook-deliveries`, filters by delivery status (`pending`, `delivered`, `failed`, `dead`) and returns the delivery rows the dashboard shows, including what the endpoint answered.

## 2.2.0 — 2026-09-03

Additive. The audience a broadcast addresses stops being a description of a member's status and becomes a description of their subscription.

### Added — four subscription-state segments

The five original segments answered a member's *status*, which cannot express most of what a creator writes to people about. Someone who cancelled but has three weeks left is a Customer — the same segment as someone renewing happily — and until now the two could only be messaged together.

- **Expiring Soon** — access runs out within the horizon you set.
- **Cancelled, Still Inside Their Period** — renewal is off but they have not gone yet. Still reachable, still winnable.
- **Paused Subscriptions** — paused rather than ended.
- **Trialing Without a Card** — on trial with no card on file, so they will not convert on their own.

**An auto-renewing subscription is never Expiring Soon**, and that is the one thing to know before wiring a renewal nudge. A subscription's end date is rewritten to the new period end on every renewal, so a date alone describes the next *invoice* rather than an expiry — treating it as one would sweep every monthly subscriber into the segment once a month. A member appears only once their access genuinely lapses: they turned renewal off, or the plan does not renew at all.

### Added — Narrow to a Plan

A new optional field on **Broadcast Message** that composes with the audience above it rather than replacing it. *Customers* plus a plan reaches people paying for that plan right now; *Churned* plus a plan reaches people who held it and left.

The plan and the state always describe the **same** subscription. Someone paying for Silver who once tried Gold is not a Gold customer and will not receive a Gold-only announcement.

It is refused, not ignored, for the audiences that cannot use it — *Leads*, who never subscribed, and the pass segments, whose plan is already implied by the window. A silently dropped filter would return a recipient count for a different audience than the Zap described.

Retired plans stay in the dropdown on purpose: the audiences most worth a plan filter are the ones who have already left, and a churned cohort very often churned from a plan that has since been withdrawn.

### Added — Running Out Within (Days)

Sets the **Expiring Soon** horizon, 1–90, default 7. Ignored by every other audience.

### Changed — broadcast trigger payloads

**Broadcast Queued** and **Broadcast Completed** now also carry `plan_id` and `expiring_within_days`, so a workflow can tell two broadcasts to the same segment apart. Both are `null` where they do not apply. Existing Zaps are unaffected — no field was renamed or removed.

## 2.1.0 — 2026-09-01

Supersedes the `2.1.0 — never released` entry further down this file; that number was freed when its detail was folded into 2.0.0.

### Added — message broadcasting

Broadcasting existed in the Subscriby dashboard and the Telegram bot and on no integration surface at all. A Zap could react to 106 events but could not send the one message a creator most wants to automate: telling their members something happened.

- **Broadcast Message** (action) — send a Telegram message to an audience segment. The send is queued, so the action returns the resolved audience and the recipient count rather than a delivery result.
- **Broadcast Queued** (trigger) — fires as a broadcast starts, with the segment it resolved to and how many members it will reach. Fires for broadcasts started anywhere, including the dashboard and the bot.
- **Broadcast Completed** (trigger) — fires when the send finishes, carrying `sent` and `failed`. Failures are overwhelmingly members who blocked or deleted the bot.

Pair them: **Broadcast Message** to send, **Broadcast Completed** to log the outcome or alert on a failure spike.

The two single-window pass segments (`pass_holders`, `pass_holders_not_in_queue`) additionally require a Pass Window ID; the API refuses the send without one rather than silently addressing nobody.

## 2.0.0 — 2026-08-31

**This is everything since 1.3.0, which is the last version anyone has actually run.** The sections below marked _never released_ were written and versioned locally but never pushed to Zapier — 2.1.0 through 2.6.0 exist only in this file. Their detail is part of this release; read them as continuations of this entry rather than as separate upgrades.

The number is 2.0.0 rather than 3.0.0 because relative to 1.3.0 this is one major step, and Zapier requires every intervening version to exist on the platform before it will accept a higher one.

**Breaking.** Create Plan and Update Plan now take a **Plan Kind** and the fields that belong to it. Existing Zaps using those two actions will need their fields re-mapped; every other trigger, action and search is untouched.

### Changed — Create Plan and Update Plan are kind-scoped

Both actions now open with a **Plan Kind** dropdown — _Recurring Subscription_, _Time-Limited Pass_ or _Pass Series_ — and the fields below it change to match. Only the fields your chosen kind actually accepts are shown.

This mirrors a breaking change in the Subscriby API, which moved plans to a discriminated union: `kind` names exactly one nested object, and sending a block belonging to another kind is now refused rather than ignored. The old flat shape emitted `billing_cycle` and `trial_days` on passes where they mean nothing, and offered no way to express a third plan shape at all.

**What breaks:** the field keys behind Create Plan and Update Plan changed. A Zap that set _Billing Cycle_ still sets a billing cycle — the field is now inside the subscription kind's group — but the mapping has to be re-made. Nothing else in this integration changed its field keys.

### Added — Pass Series, a season ticket

A **Pass Series** sells a curated slate of _other_ pass plans' dated windows for one payment. It owns no windows of its own, so:

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

- **Pass Window Scheduled** — a window coming into existence. The `pass.*` family reported windows being cancelled, opened and closed but never _created_, so a schedule could not be mirrored outward without polling. Note that editing a schedule regenerates windows in bulk, so one plan save can fire this many times.
- **Pass Holder Queued** — a holder tapped their invite link and their request is held. The moment a buyer stops being a risk, and previously invisible outside the product.
- **Pass Holder Missed a Window** — a window closed and one holder never turned up. Pass Window Closed only reported an aggregate count; this is the half you can act on. A window that never opened, or a purchase that landed too late to use, is deliberately _not_ reported as missed.

### Added — Teams, roles and groups are writable

Every one of these existed as a trigger and a search already: you could be told a role changed and read what it granted, but not change one. Fourteen actions close that.

- **Teams** — Create Team, Update Team, Delete Team.
- **Team members** — Invite Team Member, Change Team Member Role, Remove Team Member, Cancel Team Invitation. Inviting is addressed by **email**, because the invitee may not have a Subscriby account yet; the role is a role **code** that must already exist on the team.
- **Roles** — Create Role, Update Role, Delete Role.
- **Groups** — Create Group, Update Group, Delete Group, Sync Group Members.

Two things worth knowing before you build with them:

- **Permissions replace, they do not merge.** Setting the permission field on Update Role or Update Group makes that list the whole set. Leave it empty to keep what is there.
- **Sync Group Members is a sync, not an add.** Anyone left out of the list is removed from the group, and an empty list empties it.

Creating and re-permissioning require the Growth plan. Deleting and removing do not — a creator whose plan lapsed still has collaborators attached, and has to be able to take access away.

### Added — 2 triggers

- **Team Updated** — a team is renamed. `name` is the only mutable field on a team.
- **Group Members Synced** — the people in a group changed. Carries `added_ids` and `removed_ids` as well as the final list, so an access-control mirror does not have to diff two snapshots to work out who moved.

Both events are new in Subscriby. **Change Team Member Role also makes an existing trigger reachable:** `team.member.role_changed` was in the catalogue and offered here, but nothing in Subscriby could raise it until this release.

### Fixed

- Sample records advertised ids like `prj_01HXPROJECTSAMPLE000000000`. Subscriby has never issued a prefixed id — every id is a plain UUID — so the samples in the Zap editor showed a shape no real record has. All 418 of them now show UUIDs.
- The `User-Agent` version was pinned at `2.0.0` while the package was at 2.6.0. It now tracks the real version.
- `pass_series.leg_added` carried the series plan's own timezone, which is always empty — a series has no schedule of its own. It now carries the source plan's zone, so timestamps can be rendered correctly.

### Note on 2.6.0

2.6.0 was never pushed to Zapier and had no changelog entry of its own. It added the five original `pass.*` triggers (window opened / closed / cancelled, holder moved / stranded), which ship here.

### Catalogue

104 events, 104 triggers, 41 actions, 45 searches — full parity with the `WebhookEvent` enum.

## 2.5.0 — never released — 2026-08-27

### Added — 1 billing trigger

- **Tier Trial Ending** (`billing.trial_ending`) — your own Subscriby trial is about to convert and take its first payment. Until now the trial converted silently and the first thing announcing the charge was Stripe's receipt, so there was nothing a Zap could react to.

  It fires **once per reminder milestone**, not once per trial — 72 hours out and again 24 hours out by default. If your Zap should only run once, filter on `hours_remaining` or de-duplicate on `subscription_id`.

  `amount` is a decimal string with a separate uppercase `currency`, so it can go straight into a spreadsheet or an accounting row without parsing a symbol out of it. Check `amount_estimated` first: when it is `true` the figure is the plan's list price because the upcoming invoice could not be read, and it should not be reconciled against. A creator carrying an account credit will legitimately see `"0.00"`.

## 2.4.0 — never released — 2026-08-20

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

## 2.3.0 — never released — 2026-08-19

Added the `coupon.*` event family, so every `WebhookEvent` Subscriby emits is exposed again.

### Added — 7 coupon triggers

- **New Coupon** (`coupon.created`), **Coupon Updated** (`coupon.updated`), **Coupon Activated** (`coupon.activated`), **Coupon Deactivated** (`coupon.deactivated`), **Coupon Deleted** (`coupon.deleted`) — the authoring lifecycle, payload nested under `data.coupon` exactly as the `plan.*` family does. `coupon.updated` also carries `data.changes`, naming only the fields that moved with their previous and new values.
- **Coupon Redeemed** (`coupon.redeemed`) — fires on settlement, not when a code is applied, so an abandoned checkout never triggers it. Carries `original_amount`, `discount_amount` and `final_amount` as strings; `final_amount` is what was charged and is the figure to use for revenue reporting.
- **Coupon Exhausted** (`coupon.exhausted`) — the last use of a capped code being claimed. Never fires for an uncapped code, and rides on the same settlement as Coupon Redeemed, so the final redemption produces both.

### Notes

- A coupon is one code many subscribers can redeem for money off. It is not an access code, which is one code for one person and grants access outright — the two have separate triggers and separate payload shapes.
- Switching a code on or off fires Coupon Activated / Coupon Deactivated rather than Coupon Updated, so an automation reacting to a code being pulled does not have to diff payloads to notice.

## 2.1.0 — never released — 2026-08-12

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

- **project.\*** (6): `project.updated`, `.archived`, `.restored`, `.deleted`, `.bot.connected`, `.bot.disconnected`
- **project.resource.\*** (4): `.created`, `.linked`, `.unlinked`, `.deleted`
- **plan.\*** (3): `plan.activated`, `.deleted`, `.sync_completed`
- **subscription.\*** (11): `.trial_started`, `.trial_converting`, `.trial_expired`, `.reactivated`, `.paused`, `.unpaused`, `.past_due`, `.unpaid`, `.refunded`, `.upgraded`, `.downgraded`
- **payment.\*** (2): `payment.pending`, `.refunded`
- **member.\*** (5): `.converted`, `.churned`, `.removed`, `.resource_added`, `.resource_removed`
- **team.\*** (6): `team.created`, `.deleted`, `.member.invited`, `.member.joined`, `.member.removed`, `.member.role_changed`
- **role.\*** (3): `role.created`, `.updated`, `.deleted`
- **group.\*** (3): `group.created`, `.updated`, `.deleted`
- **billing.\*** (9): `billing.invoice_created`, `.invoice_paid`, `.invoice_overdue`, `.payment_failed`, `.grace_period_warning`, `.account_locked`, `.tier_upgraded`, `.tier_downgraded`, `.tier_cancelled`

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
