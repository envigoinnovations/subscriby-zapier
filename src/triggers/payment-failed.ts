import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_failed',
  noun: 'Payment',
  label: 'Payment Failed',
  description:
    'Triggers when a subscription renewal or one-off payment fails at the provider (card declined, insufficient funds, crypto reorg, etc.).',
  event: 'payment.failed',
  sample: {
    id: 'evt_01HXEXAMPLE444444444444444',
    type: 'payment.failed',
    created_at: '2026-05-18T10:25:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      payment: {
        id: 'pay_01HXPAYMENTFAILSAMPLE00000',
        subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        failure_reason: 'card_declined',
      },
    },
  },
});
