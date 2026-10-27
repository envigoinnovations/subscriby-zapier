import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'cancel_pass_window',
  noun: 'Pass Window',
  label: 'Cancel Pass Window',
  description:
    "Cancel a dated access window and resettle everyone holding it. Single-date holders are moved to the plan's next window on sale, or have their pass ended and flagged for a refund when nothing is left; season-ticket holders are moved too or have the date dropped from their season, as Season-Ticket Holders chooses. Holders are messaged with the amounts and money may be owed, so confirm the window first. Under meta: the tallies rebound, refund_due and legs_dropped, the choice as series_holders, refunds (one row per holder owed a decision with what they paid and what the date was worth) and refund_totals per currency. Subscriby never moves the refunds itself. An already-cancelled window answers with zero tallies.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'window_id', label: 'Window ID', type: 'string', required: true, helpText: 'UUID of the pass window; find it with Find Pass Windows.' },
    {
      key: 'series_holders',
      label: 'Season-Ticket Holders',
      type: 'string',
      required: false,
      choices: { substitute: 'Move them to the next date', drop: 'Drop the date from their season' },
      helpText:
        "What happens to holders who hold the window as one date of a season ticket. Move them to the next date (the default) keeps their season at the same length; Drop the date from their season leaves the rest standing and reports what the date was worth per holder. Single-date holders are always moved where a window is on sale.",
    },
  ],
  path: (input) => `/projects/${input.project_id}/pass-windows/${input.window_id}/cancel`,
  body: (input) => (input.series_holders ? { series_holders: input.series_holders } : undefined),
  sample: {
    id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
    plan_id: '9b7c2e15-4d63-4f80-a2b1-7e5d0c9f3a46',
    plan_name: 'Saturday session',
    starts_at: '2026-10-03T09:00:00+00:00',
    ends_at: '2026-10-03T11:00:00+00:00',
    timezone: 'Europe/London',
    local_range: 'Sat 3 Oct, 10:00–12:00 BST',
    duration_minutes: 120,
    status: 'canceled',
    source: 'manual',
    sellable: false,
    holders: 3,
    meta: {
      rebound: 2,
      refund_due: 1,
      legs_dropped: 0,
      subscribers_affected: 3,
      series_holders: 'substitute',
      refunds: [
        {
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          subscriber_id: '2a91c4e7-6f38-4b52-8e0d-9c1a7b3f5d80',
          member: 'Jane Fox',
          reason: 'stranded',
          amount: '15.00',
          amount_formatted: '£15.00',
          amount_paid: '15.00',
          amount_paid_formatted: '£15.00',
          currency: 'GBP',
          passes_remaining: 0,
        },
      ],
      refund_totals: [{ currency: 'GBP', amount: '15.00', formatted: '£15.00' }],
    },
  },
});
