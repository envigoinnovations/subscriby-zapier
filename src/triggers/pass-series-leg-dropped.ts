import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_series_leg_dropped',
  noun: 'Pass Series',
  label: 'Pass Series Pass Dropped',
  description:
    "Triggers when a cancelled date leaves a holder's season with no replacement. refund_per_holder IS A FIGURE, NOT AN ACTION — Subscriby never moves the money, the creator does, so treating this as 'already refunded' will double-refund. The amount is per holder: a mid-season buyer paid the same price for fewer dates, so each of theirs is worth more.",
  event: 'pass_series.leg_dropped',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass_series.leg_dropped',
    created_at: '2026-09-20T13:00:04Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
          subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
          subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
          plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
          from_window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
          from_starts_at: '2026-11-29T18:00:00Z',
          from_ends_at: '2026-11-29T21:00:00Z',
          passes_remaining: 3,
          refund_per_holder: '9.90',
          currency: 'USD',
          amount_paid: '99.00',
          series_ended: false
    },
  },
});
