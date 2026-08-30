import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_seats_exhausted',
  noun: 'Pass Series',
  label: 'Pass Series Sold Out',
  description:
    "Triggers when a purchase takes the last seat on a series with a seat limit. Sold out is not permanent — a seat is released when a holder cancels or is refunded, so this can fire again later. A series with no seat limit never fires it at all.",
  event: 'pass_series.seats_exhausted',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.seats_exhausted',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          plan_id: 'pln_01HXSERIESSAMPLE000000000',
          plan_name: 'Autumn Season Ticket',
          seat_cap: 50,
          seats_taken: 50,
          last_subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000'
    },
  },
});
