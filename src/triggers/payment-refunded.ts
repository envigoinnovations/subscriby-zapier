import { defineWebhookTrigger } from './webhook-trigger-factory';

export default defineWebhookTrigger({
  key: 'payment_refunded',
  noun: 'Payment',
  label: 'Payment Refunded',
  description: 'Triggers when a payment is refunded to the subscriber.',
  event: 'payment.refunded',
  sample: {
    id: 'evt_01HXEXAMPLE000000000000000',
    type: 'payment.refunded',
    created_at: '2026-05-18T10:05:00Z',
    api_version: '2026-05-01',
    project_id: 'prj_01HXPROJECTSAMPLE000000000',
    data: {
      payment: {
        id: 'pay_01HXPAYMENTSAMPLE0000000000',
        subscription_id: 'sub_01HXSUBSCRIPTIONSAMPLE00000',
        amount: '29.00',
        currency_id: 'USD',
        status: 'refunded',
      },
    },
  },
});
