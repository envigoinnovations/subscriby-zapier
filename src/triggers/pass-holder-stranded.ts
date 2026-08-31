import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'pass_holder_stranded',
  noun: 'Pass Holder',
  label: 'Pass Holder Stranded',
  description:
    'Triggers when a pass holder has their access window cancelled with no replacement available, so their pass ends. Fires once per holder. They have paid and received nothing, and Subscriby does not refund automatically — this event carries the amount, currency and gateway payment reference precisely because nothing in the dashboard records who is owed money. Timestamps are UTC.',
  event: 'pass.holder_stranded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'pass.holder_stranded',
    created_at: '2026-09-18T09:14:22Z',
    api_version: '2026-05-01',
    project_id: '7f3d1c92-8b45-4e6a-9d21-5c8e0a4b6f13',
    data: {
      subscription_id: '5b7e2d40-1a86-4c39-97f2-e83d0b16c5a4',
      subscriber_id: '6f9b2e37-c184-4a05-8d72-30e16bc9f458',
      plan_id: 'c4e82f16-93a7-4d5b-b81c-6e0f27a94d3b',
      from_window_id: '3d5a8c72-b016-4e94-8fa7-61c209d4e738',
      from_starts_at: '2026-09-20T13:00:00Z',
      from_ends_at: '2026-09-20T19:00:00Z',
      refund_due: true,
      amount_paid: '15.000',
      currency: 'GBP',
      payment_id: 'pi_3U9Jan4m40lWsKma0f3ntmnl',
    },
  },
});
