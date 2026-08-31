import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_window_scheduled',
  noun: 'Pass Window',
  label: 'Pass Window Scheduled',
  description:
    "Triggers when a new dated access window is created on a time-limited pass plan — generated from the plan's recurrence or placed by hand. This is the event that lets you mirror a schedule into a calendar or CRM without polling. Note that editing a schedule regenerates windows in bulk, so one plan save can fire this many times at once.",
  event: 'pass.window_scheduled',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.window_scheduled',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
          window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          starts_at: '2026-09-20T13:00:00Z',
          ends_at: '2026-09-21T03:00:00Z',
          timezone: 'America/New_York',
          source: 'generated'
    },
  },
});
