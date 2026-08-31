import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_leg_completed',
  noun: 'Pass Series',
  label: 'Pass Series Pass Completed',
  description:
    "Triggers when one date of a holder's season finishes, carrying their running attendance. granted and joined are different questions: granted means access was issued, joined means they actually appeared. Fires per holder per date, so a ten-date season sold to forty people produces four hundred of these across its run.",
  event: 'pass_series.leg_completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.leg_completed',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
          plan_id: 'e07b4a29-51c6-4d83-9f10-2b8ac635d174',
          window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          source_plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
          granted: true,
          joined: true,
          passes_total: 10,
          passes_attended: 4,
          passes_missed: 1,
          passes_remaining: 5
    },
  },
});
