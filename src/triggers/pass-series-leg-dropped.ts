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
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
          subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE0000',
          subscriber_id: 'usr_01HXSUBSCRIBERSAMPLE000000',
          plan_id: 'pln_01HXPLANSAMPLE0000000000000',
          from_window_id: 'psw_01HXWINDOWSAMPLE00000000000',
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
