import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'broadcast_queued',
  noun: 'Broadcast',
  label: 'Broadcast Queued',
  description:
    'Triggers the moment a broadcast starts sending, with the audience it resolved to and how many members it will reach. Fires for broadcasts started anywhere — the dashboard, the Telegram bot, the API or a Zap.',
  event: 'broadcast.queued',
  sample: {
    id: 'evt_01HXEXAMPLE777777777777777',
    type: 'broadcast.queued',
    created_at: '2026-09-01T10:30:00Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
      audience: 'customer',
      pass_window_id: null,
      recipient_estimate: 128,
    },
  },
});
