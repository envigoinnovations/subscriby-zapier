import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_leg_added',
  noun: 'Pass Series',
  label: 'Pass Series Pass Added',
  description:
    "Triggers when an automatic rule absorbs a newly-scheduled window into a live season and grants it to everyone already holding it, at no charge. This is the one to wire a calendar sync to — a season composed with rules is not fixed at the point it sold. timezone is the SOURCE plan's zone; a series has none of its own.",
  event: 'pass_series.leg_added',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.leg_added',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          plan_id: 'e07b4a29-51c6-4d83-9f10-2b8ac635d174',
          plan_name: 'Autumn Season Ticket',
          window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          source_plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
          starts_at: '2026-11-08T18:00:00Z',
          ends_at: '2026-11-08T21:00:00Z',
          timezone: 'America/New_York',
          window_count: 12
    },
  },
});
