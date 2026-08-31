import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_leg_substituted',
  noun: 'Pass Series',
  label: 'Pass Series Pass Substituted',
  description:
    "Triggers when a cancelled date in a season is replaced and one holder is moved onto the replacement. Their season carries on at the same length. was_queued tells you whether they had already tapped their invite link — if you message them yourself, match that split or you will ask half your audience to do something they have already done.",
  event: 'pass_series.leg_substituted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.leg_substituted',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
          plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
          from_window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          from_starts_at: '2026-10-25T18:00:00Z',
          from_ends_at: '2026-10-25T21:00:00Z',
          to_window_id: '8c04e7b2-51d6-4a39-9f80-b3e12d6a5074',
          to_starts_at: '2026-11-01T18:00:00Z',
          to_ends_at: '2026-11-01T21:00:00Z',
          was_queued: true
    },
  },
});
