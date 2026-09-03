import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'broadcast_completed',
  noun: 'Broadcast',
  label: 'Broadcast Completed',
  description:
    'Triggers when a broadcast has finished sending, carrying the delivered and failed tallies. Failures are mostly members who have blocked or deleted the bot — a persistently high failed count is worth acting on.',
  event: 'broadcast.completed',
  sample: {
    id: 'evt_01HXEXAMPLE888888888888888',
    type: 'broadcast.completed',
    created_at: '2026-09-01T10:31:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      audience: 'customer',
      pass_window_id: null,
      plan_id: null,
      expiring_within_days: null,
      sent: 126,
      failed: 2,
    },
  },
});
