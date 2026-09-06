import { defineRpcCreate } from '../utils/rpc-create';

export default defineRpcCreate({
  key: 'cancel_pass_window',
  noun: 'Pass Window',
  label: 'Cancel Pass Window',
  description:
    "Cancel a dated access window and resettle everyone holding it: each holder is moved to the plan's next window on sale, has the date dropped from their season ticket, or has their pass ended and flagged for a refund when nothing is left. Holders are messaged and money may be owed, so confirm the window first. The tallies come back under meta: rebound, refund_due and legs_dropped. Subscriby never moves the refunds itself. An already-cancelled window answers with zero tallies.",
  inputFields: [
    { key: 'project_id', label: 'Project ID', type: 'string', required: true, dynamic: 'dropdown_projects.id.name', altersDynamicFields: true },
    { key: 'window_id', label: 'Window ID', type: 'string', required: true, helpText: 'UUID of the pass window; find it with Find Pass Windows.' },
  ],
  path: (input) => `/projects/${input.project_id}/pass-windows/${input.window_id}/cancel`,
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
    meta: { rebound: 2, refund_due: 1, legs_dropped: 0 },
  },
});
