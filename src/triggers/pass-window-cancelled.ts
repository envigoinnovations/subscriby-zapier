import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_window_cancelled',
  noun: 'Pass Window',
  label: 'Pass Window Cancelled',
  description:
    'Triggers when a creator cancels a time-limited pass access window. Every holder has already been resettled by the time this fires — `rebound` were moved to another window on the same plan, `refund_due` had their pass ended and are owed money. Use Pass Holder Stranded for who those people are. Timestamps are UTC.',
  event: 'pass.window_cancelled',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.window_cancelled',
    created_at: '2026-09-18T09:14:22Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      starts_at: '2026-09-20T13:00:00Z',
      ends_at: '2026-09-20T19:00:00Z',
      rebound: 38,
      refund_due: 3,
      subscribers_affected: 41,
    },
  },
});
