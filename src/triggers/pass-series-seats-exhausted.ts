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
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          plan_id: 'e07b4a29-51c6-4d83-9f10-2b8ac635d174',
          plan_name: 'Autumn Season Ticket',
          seat_cap: 50,
          seats_taken: 50,
          last_subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4'
    },
  },
});
