import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_completed',
  noun: 'Pass Series',
  label: 'Pass Series Completed',
  description:
    "Triggers when a holder reaches the last date of their season, with the final attendance tallies. This is the renewal signal: eight of ten attended is a very different customer from two of ten. Fires per holder, not per series — two people holding the same season reach its end on different dates when one bought in late.",
  event: 'pass_series.completed',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.completed',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
          plan_id: 'e07b4a29-51c6-4d83-9f10-2b8ac635d174',
          plan_name: 'Autumn Season Ticket',
          passes_total: 10,
          passes_attended: 8,
          passes_missed: 2,
          successor_plan_id: '1d6c93f8-a204-4e71-b58c-7f03e2a91d46'
    },
  },
});
