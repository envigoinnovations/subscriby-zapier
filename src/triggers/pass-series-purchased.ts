import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_purchased',
  noun: 'Pass Series',
  label: 'Pass Series Purchased',
  description:
    "Triggers when someone buys a season ticket and their whole slate is issued. FIRES IN ADDITION TO Subscription Activated, because a series is a subscription — if you use both, de-duplicate on subscription_id. passes_already_held counts dates the buyer already owned individually; those are not issued or charged twice.",
  event: 'pass_series.purchased',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.purchased',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
          plan_id: 'e07b4a29-51c6-4d83-9f10-2b8ac635d174',
          plan_name: 'Autumn Season Ticket',
          passes_total: 10,
          passes_granted: 9,
          passes_already_held: 1,
          starts_at: '2026-09-20T13:00:00Z',
          ends_at: '2026-11-29T22:00:00Z',
          seat_cap: 50,
          seats_remaining: 13
    },
  },
});
