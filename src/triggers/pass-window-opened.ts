import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_window_opened',
  noun: 'Pass Window',
  label: 'Pass Window Opened',
  description:
    'Triggers when a time-limited pass access window starts and everyone holding it is admitted to the linked Telegram resources. Timestamps are UTC — convert to the plan schedule timezone before displaying them.',
  event: 'pass.window_opened',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.window_opened',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      starts_at: '2026-09-20T13:00:00Z',
      ends_at: '2026-09-21T03:00:00Z',
      subscribers_affected: 47,
    },
  },
});
