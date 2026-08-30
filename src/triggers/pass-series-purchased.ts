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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
          subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE000000',
          plan_id: 'pln_01HXSERIESSAMPLE000000000',
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
